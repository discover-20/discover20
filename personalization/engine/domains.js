/* ============================================================
   Discover20 Personalization Engine — domains.js
   ------------------------------------------------------------
   The four developmental domains every assessment reports on,
   the age bands the platform serves, and the specialist each
   domain refers to when a child needs extra support.

   Works in the browser (<script src>) and in Node (require).
   Everything is attached to the shared `D20` namespace.
   ============================================================ */
(function (root) {
  'use strict';
  const D20 = (root.D20 = root.D20 || {});

  /** The four domains, in display order. Colours map to brand tokens. */
  const DOMAINS = [
    {
      id: 'physical',
      color: 'green',
      label: { en: 'Body & movement', ar: 'الحركة والجسم' },
      short: { en: 'Physical', ar: 'الحركة' },
    },
    {
      id: 'cognitive',
      color: 'purple',
      label: { en: 'Thinking & learning', ar: 'التفكير والتعلّم' },
      short: { en: 'Cognitive', ar: 'التفكير' },
    },
    {
      id: 'language',
      color: 'teal',
      label: { en: 'Language & communication', ar: 'اللغة والتواصل' },
      short: { en: 'Language', ar: 'اللغة' },
    },
    {
      id: 'socialEmotional',
      color: 'coral',
      label: { en: 'Feelings & relationships', ar: 'المشاعر والعلاقات' },
      short: { en: 'Social-emotional', ar: 'المشاعر' },
    },
  ];

  /**
   * Age bands in months [min, max] inclusive. Discover20 serves birth to 10 years.
   * Each assessment instrument provides items per band.
   */
  const AGE_BANDS = [
    { id: '0-6m',  min: 0,  max: 5,   label: { en: '0–6 months',  ar: '0–6 أشهر' } },
    { id: '6-12m', min: 6,  max: 11,  label: { en: '6–12 months', ar: '6–12 شهرًا' } },
    { id: '1-2y',  min: 12, max: 23,  label: { en: '1–2 years',   ar: '1–2 سنة' } },
    { id: '2-3y',  min: 24, max: 35,  label: { en: '2–3 years',   ar: '2–3 سنوات' } },
    { id: '3-4y',  min: 36, max: 47,  label: { en: '3–4 years',   ar: '3–4 سنوات' } },
    { id: '4-6y',  min: 48, max: 71,  label: { en: '4–6 years',   ar: '4–6 سنوات' } },
    { id: '6-10y', min: 72, max: 131, label: { en: '6–10 years',  ar: '6–10 سنوات' } },
  ];

  /** Who to book when a domain needs support. */
  const SPECIALISTS = {
    physical:        { en: 'Physiotherapist or occupational therapist', ar: 'أخصائي علاج طبيعي أو علاج وظيفي' },
    cognitive:       { en: 'Developmental paediatrician',               ar: 'طبيب أطفال متخصص في النمو' },
    language:        { en: 'Speech and language therapist',             ar: 'أخصائي تخاطب ولغة' },
    socialEmotional: { en: 'Child psychologist',                        ar: 'أخصائي نفسي للأطفال' },
    caregiver:       { en: 'Parenting coach (a session for you)',       ar: 'مدرّب تربية (جلسة لكم أنتم)' },
  };

  /** Re-assessment interval used across the platform (every 3 months). */
  const REASSESS_DAYS = 90;

  function bandForAge(months) {
    const m = Math.max(0, Math.floor(Number(months) || 0));
    return AGE_BANDS.find((b) => m >= b.min && m <= b.max) || AGE_BANDS[AGE_BANDS.length - 1];
  }

  function domainById(id) {
    return DOMAINS.find((d) => d.id === id);
  }

  /** Pick a language string from a {en, ar} object (falls back to English). */
  function t(obj, lang) {
    if (obj == null) return '';
    if (typeof obj === 'string') return obj;
    return obj[lang] || obj.en || '';
  }

  Object.assign(D20, { DOMAINS, AGE_BANDS, SPECIALISTS, REASSESS_DAYS, bandForAge, domainById, t });
  if (typeof module === 'object' && module.exports) module.exports = D20;
})(typeof globalThis !== 'undefined' ? globalThis : this);
