# Discover20 personalization engine

How Discover20 turns a short development check into a **personalised 20-minute daily plan** for a parent and child.

This folder holds the core logic, written as small, dependency-free JavaScript, plus an interactive bilingual (Arabic/English) demo. It shows the concept behind the live platform at [discover20.com](https://discover20.com).

**Try it:** open [`demo/index.html`](demo/index.html) in a browser and pick a sample family.

## The idea in one paragraph

Every child is different, and so is every parent's day. Parents answer eight quick questions about what their child usually does. The engine scores four areas of development and works out which one needs attention first. It then filters the content library down to what suits this child's age and this parent's time, and ranks it by the child's needs and the parent's energy today. The result is one activity, one story and one toy that together fit in 20 minutes, each with a plain-language reason it was chosen. If a key milestone is missing, the parent is pointed to the right specialist. If the parent is struggling, the plan gets lighter and a session for them is suggested. Three months later, the child is checked again and progress is shown.

## How it works

```
 Parent answers            Engine                                         Parent sees
 ─────────────            ──────                                         ───────────
 8 milestone questions ─► 1. SCORE    4 domains, 0–100, status, flags ─► Development profile
 3 check-in questions  ─►             focus order, referrals             When to see a specialist
                          2. FILTER   age range, minutes, materials,
                                      type, domain, calm/active
                          3. RANK     need-weighted fit + parent energy ─► Library ranked for this child
                                      + stress + variety                   with "why" on every card
                          4. PLAN     best activity + story + toy        ─► Today's 20 minutes
                                      within the time budget,
                                      covering the top 2 focus areas
                          5. TRACK    re-check every 90 days, compare    ─► Progress since last check
```

### 1. Score: `engine/scoring.js`

| Domain | Arabic | Specialist if support is needed |
|---|---|---|
| Body & movement (physical) | الحركة والجسم | Physiotherapist / occupational therapist |
| Thinking & learning (cognitive) | التفكير والتعلّم | Developmental paediatrician |
| Language & communication | اللغة والتواصل | Speech and language therapist |
| Feelings & relationships (social-emotional) | المشاعر والعلاقات | Child psychologist |

- Answers are scored *Yes 2 · Sometimes 1 · Not yet 0* and each domain becomes a percentage.
- **On track** ≥ 75%, **growing** 50–74%, **needs extra support** < 50%.
- Each domain has one **key milestone**. "Not yet" on a key milestone raises a flag and a referral even if the total looks fine.
- The parent's **check-in** (time today, energy, how often they felt overwhelmed this week) is part of the profile. Discover20 supports the parent as well as the child.

### 2. Filter and 3. Rank: `engine/recommend.js`

Filtering is strict: an item is never shown outside its age range or over the parent's time. Parents can add filters for type, domain, time, "nothing to buy" and "calm only".

Ranking is transparent and rule-based:

```
score = Σ over domains ( item weight ÷ 3 × child's need in that domain )
      + calm bonus if the parent is tired   (active items are penalised)
      + connection bonus if the parent had a hard week
      + small bonus near the middle of the item's age range
      − penalty if the item was used recently
      + tiny daily rotation so the plan feels fresh
```

Each domain's *need* comes from its status (support 1.0, growing 0.6, on track 0.25, +0.15 for a key-milestone flag), so the plan leans toward weaker areas without dropping strengths.

### 4. Plan

The planner tries every combination of the top activities, stories and toys and picks the one with the highest total score that **fits the time budget** and **covers the child's top two focus areas**. When time is short (10 minutes), it builds a two-part plan.

### 5. Track

`compareAssessments(previous, current)` returns the change in each domain. The demo shows it as arrows and a marker on each bar. The next check is scheduled 90 days later.

## Responsible design

- **Not a diagnosis.** Results tell parents what to practise and when to talk to a specialist. They never label a child.
- **Licensed instruments stay private.** The live platform uses validated tools under licence (SWYC from Boston Medical Center, PSC-17 from Massachusetts General Hospital). Those items are **not** in this repository. The questions here are original, illustrative Discover20 items. Licensed instruments plug in through the same adapter (`engine/instruments/`) from a private package.
- **Privacy by default.** The engine is pure functions with no network calls and no storage. In the demo, no child data leaves the browser.
- **Explainable.** Every recommendation carries its reasons, so parents and reviewers can see why it was picked.
- **Bilingual and local.** All questions, content and reasons exist in Arabic and English, with RTL layout, and the content reflects Arab family life (date palms, Ramadan lanterns, grandparents).

## Files

| Path | What it does |
|---|---|
| `engine/domains.js` | The four domains, age bands (birth–10 years), specialist map |
| `engine/instruments/discover20-milestones.js` | Original illustrative milestone check: 2 items × 4 domains × 7 age bands, plus the instrument adapter shape |
| `engine/scoring.js` | Answers → domain scores, statuses, flags, focus order, referrals, parent check-in |
| `engine/library.js` | Sample of the tagged content library (activities, stories, toys, Connection Cards) |
| `engine/recommend.js` | Filter, rank, build the daily plan, compare progress, reason text |
| `engine/index.js` | Node entry point |
| `demo/index.html` | Interactive bilingual demo using the Discover20 design system |
| `tests/engine.test.js` | Tests for scoring, filtering, plan budget, targeting and safety rules |

## Run the tests

```bash
cd personalization
npm test          # or: node --test tests/engine.test.js
```

Node 18 or later, no dependencies.

## Use in the website

The engine files work as plain `<script>` tags (they share a `D20` namespace) or from Node:

```js
const D20 = require('./personalization/engine');

const profile = D20.scoreAssessment({
  ageMonths: 20,
  answers,                                   // { [itemId]: 0 | 1 | 2 }
  caregiver: { minutes: 20, energy: 'low', overwhelmed: 'sometimes' },
});
const plan = D20.buildDailyPlan(profile);      // today's activity + story + toy
const library = D20.rankLibrary(profile, { types: ['story'], noPurchase: true });
```

## What comes next

1. Connect the engine to the full library (440+ activities, 38+ stories, 50+ toys) through the platform API.
2. Log which plans families complete and enjoy, with consent and anonymised.
3. Train a machine-learning ranker on that data. It replaces only `scoreItem()`. Filtering, safety rules, the time budget and the explanations stay rule-based.
4. Measure developmental change between three-month checks in a structured pilot with partner nurseries and paediatric clinics.
