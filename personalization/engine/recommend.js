/* ============================================================
   Discover20 Personalization Engine — recommend.js
   ------------------------------------------------------------
   1. FILTER  the library down to what is safe and practical:
              the child's age, the time the parent has, and any
              filters the parent picks (type, domain, materials…)
   2. RANK    what is left by how well it matches the child's
              profile, weighted toward the domains that need the
              most support, and adjusted for the parent's energy
   3. PLAN    today's 20 minutes: one activity + one story + one
              toy that fit the time budget and cover the child's
              top focus areas between them
   Every recommendation carries plain-language reasons, so a
   parent (or a reviewer) can see why it was chosen.

   The rule-based ranker below is the baseline. The planned ML
   model replaces scoreItem() only; filtering, the plan builder
   and the explanations stay the same.
   ============================================================ */
(function (root) {
  'use strict';
  const D20 = (root.D20 = root.D20 || {});

  /* ---------- helpers ---------- */

  /** Small deterministic hash → [0,1). Gives a different-but-stable plan each day. */
  function seeded(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return ((h >>> 0) % 10000) / 10000;
  }

  function dayKey(date) {
    return new Date(date || Date.now()).toISOString().slice(0, 10);
  }

  /* ---------- 1. FILTER ---------- */

  /**
   * @param {object[]} library
   * @param {object}   f
   * @param {number}   f.ageMonths       required: hard filter
   * @param {string[]} [f.types]         activity | story | toy
   * @param {string[]} [f.domains]       keep items that build any of these (weight ≥ 2)
   * @param {number}   [f.maxMinutes]
   * @param {boolean}  [f.noPurchase]    only things families already have (none | household)
   * @param {string}   [f.energy]        calm | active
   * @param {string}   [f.query]         free text in title/how (either language)
   */
  function filterLibrary(library, f) {
    const age = Number(f.ageMonths);
    const q = (f.query || '').trim().toLowerCase();
    return library.filter((it) => {
      if (age < it.ageMin || age > it.ageMax) return false;
      if (f.types && f.types.length && !f.types.includes(it.type)) return false;
      if (f.domains && f.domains.length && !f.domains.some((d) => (it.domains[d] || 0) >= 2)) return false;
      if (f.maxMinutes && it.minutes > f.maxMinutes) return false;
      if (f.noPurchase && !(it.materials === 'none' || it.materials === 'household')) return false;
      if (f.energy && it.energy !== f.energy) return false;
      if (q) {
        const hay = [it.title.en, it.title.ar, it.how.en, it.how.ar, it.value && it.value.en, it.value && it.value.ar]
          .filter(Boolean).join(' ').toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }

  /* ---------- 2. RANK ---------- */

  /**
   * Score one item for one child. Higher = better match.
   * @param {object} item
   * @param {object} profile  result of D20.scoreAssessment()
   * @param {object} [ctx]    { date, recentIds: string[] }
   */
  function scoreItem(item, profile, ctx) {
    ctx = ctx || {};
    const reasons = [];
    let score = 0;

    // Development fit: each domain's weight in the item × how much the child needs it.
    D20.DOMAINS.forEach((d) => {
      const w = item.domains[d.id] || 0;
      const dom = profile.domains[d.id];
      score += (w / 3) * dom.need;
      if (w >= 2) {
        if (dom.status === 'support' || dom.flags.length || profile.focus[0] === d.id) {
          reasons.push({ kind: 'focus', domain: d.id });
        } else if (dom.status === 'emerging') {
          reasons.push({ kind: 'practice', domain: d.id });
        } else if (dom.status === 'onTrack') {
          reasons.push({ kind: 'strength', domain: d.id });
        }
      }
    });

    // Parent's energy today.
    const energy = profile.caregiver.energy;
    if (energy === 'low') {
      if (item.energy === 'calm') { score += 0.35; reasons.push({ kind: 'calm' }); }
      else score -= 0.35;
    } else if (energy === 'high' && item.energy === 'active') {
      score += 0.15;
      reasons.push({ kind: 'active' });
    }

    // A stressful week: favour easy, connecting moments over effortful ones.
    if (profile.caregiver.overwhelmed === 'often') {
      if (item.connection) { score += 0.3; reasons.push({ kind: 'connection' }); }
      if (item.minutes <= 5) score += 0.15;
    }

    // Practical: no shopping needed.
    if (item.materials === 'none' || item.materials === 'household') reasons.push({ kind: 'household' });
    if (item.minutes <= 5) reasons.push({ kind: 'quick' });

    // Best fit near the middle of the item's age range.
    const mid = (item.ageMin + item.ageMax) / 2;
    const half = Math.max(1, (item.ageMax - item.ageMin) / 2);
    score += 0.1 * (1 - Math.min(1, Math.abs(profile.ageMonths - mid) / half));

    // Variety: avoid repeating yesterday's items; small daily rotation.
    if (ctx.recentIds && ctx.recentIds.includes(item.id)) score -= 0.5;
    score += (seeded(dayKey(ctx.date) + item.id) - 0.5) * 0.08;

    // Most important reason first.
    const ORDER = ['focus', 'connection', 'calm', 'practice', 'active', 'household', 'quick', 'strength'];
    reasons.sort((a, b) => ORDER.indexOf(a.kind) - ORDER.indexOf(b.kind));

    return { score, reasons };
  }

  /** Filter, score and sort. `match` is 0–100, relative to the best item for this child. */
  function rankLibrary(profile, filters, ctx, library) {
    const lib = library || D20.LIBRARY;
    const pool = filterLibrary(lib, Object.assign({}, filters, { ageMonths: profile.ageMonths }));
    const scored = pool.map((item) => Object.assign({ item }, scoreItem(item, profile, ctx)));
    // Reference = best score among everything age-appropriate, so % stays stable while filtering.
    const all = filterLibrary(lib, { ageMonths: profile.ageMonths }).map((it) => scoreItem(it, profile, ctx).score);
    const best = Math.max.apply(null, all.concat([0.0001]));
    const worst = Math.min.apply(null, all.concat([0]));
    scored.forEach((s) => {
      s.match = Math.round(40 + 59 * ((s.score - worst) / Math.max(0.0001, best - worst)));
    });
    return scored.sort((a, b) => b.score - a.score);
  }

  /* ---------- 3. PLAN ---------- */

  /**
   * Today's plan: the best activity + story + toy within the parent's time,
   * with a bonus for covering the child's top two focus domains between them.
   */
  function buildDailyPlan(profile, ctx, library) {
    ctx = ctx || {};
    const budget = profile.caregiver.minutes;
    const top = profile.focus.slice(0, 2);
    const pick = (type) => rankLibrary(profile, { types: [type], maxMinutes: budget }, ctx, library).slice(0, 6);
    const pools = { activity: pick('activity'), story: pick('story'), toy: pick('toy') };

    function value(combo) {
      let v = combo.reduce((s, c) => s + c.score, 0);
      const covered = top.filter((d) => combo.some((c) => (c.item.domains[d] || 0) >= 2));
      v += 0.3 * covered.length;
      return { v, covered };
    }

    let best = null;
    const consider = (combo) => {
      const minutes = combo.reduce((s, c) => s + c.item.minutes, 0);
      if (minutes > budget) return;
      const { v, covered } = value(combo);
      // Prefer fuller plans: a 3-part plan beats a 2-part plan of similar value.
      const total = v + combo.length * 0.5;
      if (!best || total > best.total) best = { combo, minutes, covered, total };
    };

    const A = pools.activity, S = pools.story, T = pools.toy;
    A.forEach((a) => S.forEach((s) => T.forEach((t) => consider([a, s, t]))));
    if (!best) {
      // Short on time: two parts, then one.
      A.forEach((a) => S.forEach((s) => consider([a, s])));
      S.forEach((s) => T.forEach((t) => consider([s, t])));
      A.forEach((a) => T.forEach((t) => consider([a, t])));
    }
    if (!best) [].concat(A, S, T).forEach((x) => consider([x]));

    if (!best) return { parts: [], totalMinutes: 0, budget, covered: [], focus: top };

    // Display order: activity, story, toy.
    const order = { activity: 0, story: 1, toy: 2 };
    const parts = best.combo.slice().sort((a, b) => order[a.item.type] - order[b.item.type]);
    return { parts, totalMinutes: best.minutes, budget, covered: best.covered, focus: top };
  }

  /* ---------- progress between assessments ---------- */

  function compareAssessments(prev, curr) {
    const out = {};
    D20.DOMAINS.forEach((d) => {
      const a = prev && prev.domains[d.id] ? prev.domains[d.id].pct : null;
      const b = curr.domains[d.id].pct;
      const delta = a == null || b == null ? null : b - a;
      out[d.id] = { from: a, to: b, delta, trend: delta == null ? 'new' : delta > 4 ? 'up' : delta < -4 ? 'down' : 'steady' };
    });
    return out;
  }

  /** Plain-language reason text for the UI. */
  const REASON_TEXT = {
    focus:      { en: 'Builds {d} — today\'s focus', ar: 'يقوّي {d} — تركيز اليوم' },
    practice:   { en: 'Practises {d}', ar: 'يدرّب {d}' },
    strength:   { en: 'Keeps {d} strong', ar: 'يحافظ على قوة {d}' },
    calm:       { en: 'Calm — fits a tired day', ar: 'هادئ — يناسب يومًا متعبًا' },
    active:     { en: 'Active — uses your energy', ar: 'حركي — يستفيد من طاقتكم' },
    connection: { en: 'Easy, connecting moment', ar: 'لحظة تواصل سهلة' },
    household:  { en: 'Nothing to buy', ar: 'لا يحتاج شراء شيء' },
    quick:      { en: '5 minutes or less', ar: '5 دقائق أو أقل' },
  };

  function reasonText(r, lang) {
    const tpl = D20.t(REASON_TEXT[r.kind], lang);
    if (!r.domain) return tpl;
    return tpl.replace('{d}', D20.t(D20.domainById(r.domain).short, lang));
  }

  Object.assign(D20, { filterLibrary, scoreItem, rankLibrary, buildDailyPlan, compareAssessments, reasonText, REASON_TEXT });
  if (typeof module === 'object' && module.exports) module.exports = D20;
})(typeof globalThis !== 'undefined' ? globalThis : this);
