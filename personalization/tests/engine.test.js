/* Run with: node --test personalization/tests/ */
const test = require('node:test');
const assert = require('node:assert/strict');
const D20 = require('../engine');

const inst = D20.instruments[D20.DEFAULT_INSTRUMENT];
const AGES = [2, 8, 15, 20, 30, 40, 55, 80, 120];

function answers(age, perDomain) {
  const a = {};
  inst.itemsFor(age).forEach((it) => { a[it.id] = perDomain && it.domain in perDomain ? perDomain[it.domain] : 2; });
  return a;
}
const profile = (age, perDomain, caregiver) =>
  D20.scoreAssessment({ ageMonths: age, answers: answers(age, perDomain), caregiver, date: '2026-11-10' });

test('every age band has 2 questions per domain, one of them a key milestone', () => {
  D20.AGE_BANDS.forEach((b) => {
    const items = inst.itemsFor(b.min);
    assert.equal(items.length, 8, b.id);
    D20.DOMAINS.forEach((d) => {
      const di = items.filter((i) => i.domain === d.id);
      assert.equal(di.length, 2, `${b.id} ${d.id}`);
      assert.equal(di.filter((i) => i.key).length, 1, `${b.id} ${d.id} key`);
    });
  });
});

test('scores and statuses follow the thresholds', () => {
  const p = profile(30, { language: 0, cognitive: 1 });
  assert.equal(p.domains.physical.pct, 100);
  assert.equal(p.domains.physical.status, 'onTrack');
  assert.equal(p.domains.cognitive.status, 'emerging');
  assert.equal(p.domains.language.status, 'support');
  assert.equal(p.focus[0], 'language');
  assert.ok(p.complete);
});

test('a key milestone marked "not yet" raises a flag and a referral', () => {
  const items = inst.itemsFor(20);
  const a = answers(20);
  const key = items.find((i) => i.domain === 'language' && i.key);
  a[key.id] = 0; // 75% overall, but the key milestone is missing
  const p = D20.scoreAssessment({ ageMonths: 20, answers: a });
  assert.equal(p.domains.language.pct, 50);
  assert.deepEqual(p.domains.language.flags, [key.id]);
  assert.ok(p.referrals.some((r) => r.domain === 'language' && r.reason === 'keyMilestone'));
});

test('re-assessment is scheduled 3 months later', () => {
  const p = profile(20);
  const days = (new Date(p.nextAssessmentDate) - new Date(p.date)) / 86400000;
  assert.equal(Math.round(days), 90);
});

test('a parent who is often overwhelmed is offered support for themselves', () => {
  const p = profile(50, {}, { overwhelmed: 'often' });
  assert.ok(p.referrals.some((r) => r.domain === 'caregiver'));
});

test('filtering never returns items outside the child\'s age or time', () => {
  AGES.forEach((age) => {
    const out = D20.filterLibrary(D20.LIBRARY, { ageMonths: age, maxMinutes: 10 });
    assert.ok(out.length > 0, `age ${age}`);
    out.forEach((it) => {
      assert.ok(age >= it.ageMin && age <= it.ageMax);
      assert.ok(it.minutes <= 10);
    });
  });
  const noBuy = D20.filterLibrary(D20.LIBRARY, { ageMonths: 40, noPurchase: true });
  noBuy.forEach((it) => assert.ok(['none', 'household'].includes(it.materials)));
});

test('daily plan fits the parent\'s time at every age and budget', () => {
  AGES.forEach((age) => [10, 20, 30].forEach((minutes) => {
    const plan = D20.buildDailyPlan(profile(age, { language: 0 }, { minutes }), { date: '2026-11-10' });
    assert.ok(plan.parts.length >= 2, `age ${age}, ${minutes} min`);
    assert.ok(plan.totalMinutes <= minutes);
    if (minutes >= 20) assert.deepEqual(plan.parts.map((p) => p.item.type), ['activity', 'story', 'toy']);
  }));
});

test('the plan targets the domain that needs support', () => {
  AGES.forEach((age) => ['language', 'physical', 'socialEmotional', 'cognitive'].forEach((weak) => {
    const plan = D20.buildDailyPlan(profile(age, { [weak]: 0 }, { minutes: 20 }), { date: '2026-11-10' });
    assert.ok(plan.parts.some((p) => p.item.domains[weak] >= 2), `age ${age}, weak ${weak}`);
  }));
});

test('a tired parent gets calm items', () => {
  AGES.forEach((age) => {
    const plan = D20.buildDailyPlan(profile(age, {}, { energy: 'low' }), { date: '2026-11-10' });
    assert.ok(plan.parts.every((p) => p.item.energy === 'calm'), `age ${age}`);
  });
});

test('every recommendation explains itself', () => {
  const ranked = D20.rankLibrary(profile(40, { language: 0 }), {}, { date: '2026-11-10' });
  ranked.forEach((r) => {
    assert.ok(r.reasons.length > 0, r.item.id);
    r.reasons.forEach((x) => assert.ok(D20.reasonText(x, 'en') && D20.reasonText(x, 'ar')));
    assert.ok(r.match >= 40 && r.match <= 99);
  });
});

test('progress compares two checks domain by domain', () => {
  const before = profile(17, { language: 0 });
  const after = profile(20, { language: 1 });
  const c = D20.compareAssessments(before, after);
  assert.equal(c.language.delta, 50);
  assert.equal(c.language.trend, 'up');
  assert.equal(c.physical.trend, 'steady');
});

test('the public instrument contains no licensed content', () => {
  assert.match(inst.licence, /Not a validated screening instrument/);
  assert.equal(Object.keys(D20.instruments).length, 1);
});
