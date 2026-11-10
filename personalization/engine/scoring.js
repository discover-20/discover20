/* ============================================================
   Discover20 Personalization Engine — scoring.js
   ------------------------------------------------------------
   Turns a parent's answers into a child profile:
     • a 0–100 score and a status for each of the four domains
     • flags for key milestones marked "not yet"
     • the order of focus (which domain needs attention first)
     • referrals to the right specialist
     • the parent's own check-in (time, energy, stress), which
       shapes the plan as much as the child's scores do
   Pure functions, no network, no storage: child data never
   leaves the device in this demo.
   ============================================================ */
(function (root) {
  'use strict';
  const D20 = (root.D20 = root.D20 || {});

  /** Short check-in for the parent. This is not a clinical screen. */
  const CAREGIVER_QUESTIONS = [
    {
      id: 'minutes',
      text: { en: 'How much time do you have together today?', ar: 'كم من الوقت لديكم معًا اليوم؟' },
      options: [
        { value: 10, label: { en: '10 minutes', ar: '10 دقائق' } },
        { value: 20, label: { en: '20 minutes', ar: '20 دقيقة' } },
        { value: 30, label: { en: '30 minutes', ar: '30 دقيقة' } },
      ],
      default: 20,
    },
    {
      id: 'energy',
      text: { en: 'How is your energy right now?', ar: 'كيف طاقتكم الآن؟' },
      options: [
        { value: 'high', label: { en: 'Full of energy', ar: 'طاقتي عالية' } },
        { value: 'ok',   label: { en: 'Okay', ar: 'متوسطة' } },
        { value: 'low',  label: { en: 'Tired', ar: 'متعب/ة' } },
      ],
      default: 'ok',
    },
    {
      id: 'overwhelmed',
      text: { en: 'This week, how often did you feel overwhelmed?', ar: 'هذا الأسبوع، كم مرة شعرتم بالضغط الشديد؟' },
      options: [
        { value: 'rarely',    label: { en: 'Rarely', ar: 'نادرًا' } },
        { value: 'sometimes', label: { en: 'Sometimes', ar: 'أحيانًا' } },
        { value: 'often',     label: { en: 'Often', ar: 'كثيرًا' } },
      ],
      default: 'rarely',
    },
  ];

  const STATUS = {
    onTrack: { en: 'On track', ar: 'على المسار' },
    emerging: { en: 'Growing — keep practising', ar: 'ينمو — استمروا في التدريب' },
    support: { en: 'Needs extra support', ar: 'يحتاج دعمًا إضافيًا' },
  };

  /** How much each status pulls the daily plan toward that domain. */
  const NEED_WEIGHT = { support: 1.0, emerging: 0.6, onTrack: 0.25 };

  function statusFor(pct, thresholds) {
    if (pct >= thresholds.onTrack) return 'onTrack';
    if (pct >= thresholds.emerging) return 'emerging';
    return 'support';
  }

  function addDays(date, days) {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
  }

  /**
   * Score one assessment.
   * @param {object} input
   * @param {number} input.ageMonths
   * @param {object} input.answers       { [itemId]: number }
   * @param {object} [input.caregiver]   { minutes, energy, overwhelmed }
   * @param {string} [input.instrumentId]
   * @param {Date|string} [input.date]
   */
  function scoreAssessment(input) {
    const instrument = D20.instruments[input.instrumentId || D20.DEFAULT_INSTRUMENT];
    if (!instrument) throw new Error('Unknown instrument: ' + input.instrumentId);

    const ageMonths = Math.max(0, Math.floor(Number(input.ageMonths) || 0));
    const answers = input.answers || {};
    const items = instrument.itemsFor(ageMonths);
    const maxValue = Math.max.apply(null, instrument.answers.map((a) => a.value));
    const date = input.date ? new Date(input.date) : new Date();

    const domains = {};
    D20.DOMAINS.forEach((d) => {
      domains[d.id] = { score: 0, max: 0, answered: 0, pct: null, status: null, flags: [] };
    });

    const missing = [];
    items.forEach((it) => {
      const dom = domains[it.domain];
      const v = answers[it.id];
      if (v === undefined || v === null || v === '') {
        missing.push(it.id);
        return;
      }
      dom.score += Number(v);
      dom.max += maxValue;
      dom.answered += 1;
      if (it.key && Number(v) === 0) dom.flags.push(it.id);
    });

    D20.DOMAINS.forEach((d) => {
      const dom = domains[d.id];
      if (dom.max > 0) {
        dom.pct = Math.round((dom.score / dom.max) * 100);
        dom.status = statusFor(dom.pct, instrument.thresholds);
        // A key milestone marked "not yet" never reads as "on track".
        if (dom.flags.length && dom.status === 'onTrack') dom.status = 'emerging';
      }
      dom.need = dom.status ? NEED_WEIGHT[dom.status] + (dom.flags.length ? 0.15 : 0) : 0.4;
    });

    // Focus order: highest need first, lowest score breaks ties.
    const focus = D20.DOMAINS.map((d) => d.id).sort((a, b) => {
      const dn = domains[b].need - domains[a].need;
      if (dn !== 0) return dn;
      return (domains[a].pct ?? 100) - (domains[b].pct ?? 100);
    });

    const caregiver = normaliseCaregiver(input.caregiver);

    const referrals = [];
    D20.DOMAINS.forEach((d) => {
      const dom = domains[d.id];
      if (dom.status === 'support' || dom.flags.length) {
        referrals.push({
          domain: d.id,
          specialist: D20.SPECIALISTS[d.id],
          reason: dom.flags.length ? 'keyMilestone' : 'lowScore',
        });
      }
    });
    if (caregiver.overwhelmed === 'often') {
      referrals.push({ domain: 'caregiver', specialist: D20.SPECIALISTS.caregiver, reason: 'caregiverStress' });
    }

    return {
      instrumentId: instrument.id,
      date: date.toISOString(),
      ageMonths,
      band: D20.bandForAge(ageMonths).id,
      domains,
      focus,
      caregiver,
      referrals,
      missing,
      complete: missing.length === 0,
      nextAssessmentDate: addDays(date, D20.REASSESS_DAYS).toISOString(),
    };
  }

  function normaliseCaregiver(c) {
    const out = {};
    CAREGIVER_QUESTIONS.forEach((q) => {
      const v = c && c[q.id];
      out[q.id] = q.options.some((o) => o.value === v) ? v : q.default;
    });
    return out;
  }

  Object.assign(D20, { CAREGIVER_QUESTIONS, STATUS, NEED_WEIGHT, scoreAssessment, normaliseCaregiver });
  if (typeof module === 'object' && module.exports) module.exports = D20;
})(typeof globalThis !== 'undefined' ? globalThis : this);
