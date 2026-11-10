/* ============================================================
   Discover20 Personalization Engine — instruments/discover20-milestones.js
   ------------------------------------------------------------
   An ORIGINAL, illustrative milestone check written for this
   open demo. It is NOT a validated screening tool and it does
   NOT contain items from any licensed instrument.

   The production platform plugs licensed instruments (SWYC,
   PSC-17) in through the same adapter shape, from a private
   package that is never committed to this repository.

   Instrument adapter shape
   ------------------------
   {
     id, name, version, licence,
     answers: [{ value, label }],          // ordered, scored by value
     itemsFor(ageMonths) -> Item[],
     thresholds: { onTrack, emerging },    // % of max score per domain
   }
   Item: { id, domain, key, text: {en, ar} }
     key = a milestone most children reach by this age; "not yet"
           on a key item raises a flag even if the domain total is fine.
   ============================================================ */
(function (root) {
  'use strict';
  const D20 = (root.D20 = root.D20 || {});

  // Two items per domain per age band (8 questions, ~2 minutes for a parent).
  // [bandId, domain, key, en, ar]
  const RAW = [
    // 0–6 months
    ['0-6m', 'physical', true,  'Holds their head steady when you hold them upright', 'يرفع رأسه ويثبّته عندما تحملونه مستقيمًا'],
    ['0-6m', 'physical', false, 'Brings hands to mouth or reaches for a toy', 'يضع يديه في فمه أو يمدّ يده نحو لعبة'],
    ['0-6m', 'cognitive', true, 'Follows a moving face or toy with their eyes', 'يتابع بعينيه وجهًا أو لعبة تتحرك'],
    ['0-6m', 'cognitive', false, 'Looks at their own hands with interest', 'ينظر إلى يديه باهتمام'],
    ['0-6m', 'language', true,  'Makes cooing sounds like "ooh" and "aah"', 'يصدر أصواتًا مثل "آه" و"أوه"'],
    ['0-6m', 'language', false, 'Turns toward your voice', 'يلتفت نحو صوتكم'],
    ['0-6m', 'socialEmotional', true,  'Smiles back when you smile at them', 'يبتسم عندما تبتسمون له'],
    ['0-6m', 'socialEmotional', false, 'Calms down when picked up or spoken to softly', 'يهدأ عندما تحملونه أو تكلّمونه بهدوء'],

    // 6–12 months
    ['6-12m', 'physical', true,  'Sits without support', 'يجلس دون مساعدة'],
    ['6-12m', 'physical', false, 'Passes a toy from one hand to the other', 'ينقل اللعبة من يد إلى أخرى'],
    ['6-12m', 'cognitive', true,  'Looks for a toy that drops out of sight', 'يبحث عن لعبة سقطت ولم يعد يراها'],
    ['6-12m', 'cognitive', false, 'Explores objects by shaking or banging them', 'يستكشف الأشياء بهزّها أو الطرق بها'],
    ['6-12m', 'language', true,  'Responds when you call their name', 'يستجيب عندما تنادونه باسمه'],
    ['6-12m', 'language', false, 'Babbles sounds like "ba-ba" or "ma-ma"', 'يردّد مقاطع مثل "با-با" أو "ما-ما"'],
    ['6-12m', 'socialEmotional', true,  'Enjoys back-and-forth games like peekaboo', 'يستمتع بالألعاب المتبادلة مثل "بَخ"'],
    ['6-12m', 'socialEmotional', false, 'Knows familiar people from strangers', 'يميّز الأشخاص المألوفين من الغرباء'],

    // 1–2 years
    ['1-2y', 'physical', true,  'Walks without holding on', 'يمشي دون أن يمسك بشيء'],
    ['1-2y', 'physical', false, 'Scribbles with a crayon', 'يخربش بقلم تلوين'],
    ['1-2y', 'cognitive', true,  'Copies everyday actions like sweeping or talking on the phone', 'يقلّد أفعالًا يومية مثل الكنس أو الكلام في الهاتف'],
    ['1-2y', 'cognitive', false, 'Stacks two or three blocks', 'يرصّ مكعبين أو ثلاثة فوق بعضها'],
    ['1-2y', 'language', true,  'Says several single words', 'يقول عدة كلمات مفردة'],
    ['1-2y', 'language', false, 'Follows a simple request like "give me the ball"', 'ينفّذ طلبًا بسيطًا مثل "أعطني الكرة"'],
    ['1-2y', 'socialEmotional', true,  'Points to show you something interesting', 'يشير ليريكم شيئًا يلفت انتباهه'],
    ['1-2y', 'socialEmotional', false, 'Brings you a toy to share', 'يحضر لكم لعبة ليشارككم بها'],

    // 2–3 years
    ['2-3y', 'physical', true,  'Runs and kicks a ball', 'يجري ويركل الكرة'],
    ['2-3y', 'physical', false, 'Turns book pages one at a time', 'يقلّب صفحات الكتاب صفحة صفحة'],
    ['2-3y', 'cognitive', true,  'Plays simple pretend, like feeding a doll', 'يلعب لعبًا تخيّليًا بسيطًا مثل إطعام دمية'],
    ['2-3y', 'cognitive', false, 'Sorts objects by shape or colour', 'يفرز الأشياء حسب الشكل أو اللون'],
    ['2-3y', 'language', true,  'Puts two words together, like "more milk"', 'يجمع كلمتين معًا مثل "عايز لبن"'],
    ['2-3y', 'language', false, 'Names familiar things in a picture book', 'يسمّي أشياء مألوفة في كتاب مصوّر'],
    ['2-3y', 'socialEmotional', true,  'Plays next to or with other children', 'يلعب بجانب أطفال آخرين أو معهم'],
    ['2-3y', 'socialEmotional', false, 'Notices when someone is hurt or upset', 'يلاحظ عندما يتألم أحد أو يحزن'],

    // 3–4 years
    ['3-4y', 'physical', true,  'Climbs stairs with one foot on each step', 'يصعد الدرج بقدم على كل درجة'],
    ['3-4y', 'physical', false, 'Draws a circle after you show them', 'يرسم دائرة بعد أن تُروه كيف'],
    ['3-4y', 'cognitive', true,  'Completes a simple 3–4 piece puzzle', 'يكمل لغزًا بسيطًا من 3–4 قطع'],
    ['3-4y', 'cognitive', false, 'Understands "same" and "different"', 'يفهم معنى "مثل بعض" و"مختلف"'],
    ['3-4y', 'language', true,  'Speaks in short sentences most people understand', 'يتكلم بجمل قصيرة يفهمها معظم الناس'],
    ['3-4y', 'language', false, 'Asks "why" and "what" questions', 'يسأل "ليه؟" و"إيه ده؟"'],
    ['3-4y', 'socialEmotional', true,  'Takes turns in a simple game', 'ينتظر دوره في لعبة بسيطة'],
    ['3-4y', 'socialEmotional', false, 'Settles within a few minutes after you leave them with a familiar adult', 'يهدأ خلال دقائق عندما تتركونه مع شخص بالغ يعرفه'],

    // 4–6 years
    ['4-6y', 'physical', true,  'Hops on one foot', 'يقفز على قدم واحدة'],
    ['4-6y', 'physical', false, 'Draws a person with a head, body, arms and legs', 'يرسم شخصًا له رأس وجسم وذراعان وساقان'],
    ['4-6y', 'cognitive', true,  'Remembers and retells parts of a story', 'يتذكر أجزاء من قصة ويعيد حكايتها'],
    ['4-6y', 'cognitive', false, 'Counts up to 10 objects', 'يعدّ حتى 10 أشياء'],
    ['4-6y', 'language', true,  'Tells a short story with a beginning and an end', 'يحكي قصة قصيرة لها بداية ونهاية'],
    ['4-6y', 'language', false, 'Uses time words like "yesterday" and "tomorrow"', 'يستخدم كلمات الوقت مثل "أمس" و"بكرة"'],
    ['4-6y', 'socialEmotional', true,  'Names their feelings: happy, sad, angry, scared', 'يسمّي مشاعره: فرحان، حزين، غضبان، خايف'],
    ['4-6y', 'socialEmotional', false, 'Plays with friends and follows simple game rules', 'يلعب مع أصدقائه ويلتزم بقواعد اللعبة البسيطة'],

    // 6–10 years
    ['6-10y', 'physical', true,  'Throws and catches a ball with control', 'يرمي الكرة ويلتقطها بتحكّم'],
    ['6-10y', 'physical', false, 'Writes letters and numbers clearly enough to read', 'يكتب الحروف والأرقام بوضوح يسمح بقراءتها'],
    ['6-10y', 'cognitive', true,  'Stays on a homework task for 15–20 minutes', 'يركّز في واجب مدرسي 15–20 دقيقة'],
    ['6-10y', 'cognitive', false, 'Tries a different way when the first one does not work', 'يجرّب طريقة أخرى عندما لا تنجح الأولى'],
    ['6-10y', 'language', true,  'Explains clearly what happened during their day', 'يشرح بوضوح ما حدث في يومه'],
    ['6-10y', 'language', false, 'Enjoys reading or being read to, and talks about the story', 'يستمتع بالقراءة أو بسماع القصص ويتكلم عنها'],
    ['6-10y', 'socialEmotional', true,  'Calms down after frustration within a reasonable time', 'يهدأ بعد الإحباط في وقت معقول'],
    ['6-10y', 'socialEmotional', false, 'Has at least one friend they enjoy playing with', 'لديه صديق واحد على الأقل يحب اللعب معه'],
  ];

  const ITEMS = RAW.map(([band, domain, key, en, ar], i) => ({
    id: `d20m-${band}-${domain}-${i}`,
    band,
    domain,
    key,
    text: { en, ar },
  }));

  const instrument = {
    id: 'd20-milestones-demo',
    name: { en: 'Discover20 milestone check (demo)', ar: 'فحص مراحل النمو من Discover20 (نسخة تجريبية)' },
    version: '0.1.0',
    licence: 'Original Discover20 content for demonstration. Not a validated screening instrument.',
    answers: [
      { value: 2, label: { en: 'Yes', ar: 'نعم' } },
      { value: 1, label: { en: 'Sometimes', ar: 'أحيانًا' } },
      { value: 0, label: { en: 'Not yet', ar: 'ليس بعد' } },
    ],
    thresholds: { onTrack: 75, emerging: 50 },
    itemsFor(ageMonths) {
      const band = D20.bandForAge(ageMonths);
      return ITEMS.filter((it) => it.band === band.id);
    },
  };

  D20.instruments = D20.instruments || {};
  D20.instruments[instrument.id] = instrument;
  D20.DEFAULT_INSTRUMENT = D20.DEFAULT_INSTRUMENT || instrument.id;

  if (typeof module === 'object' && module.exports) module.exports = instrument;
})(typeof globalThis !== 'undefined' ? globalThis : this);
