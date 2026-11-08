# Discover20 — Design System

> **Young Secrets… Great Solutions.**
> An early-childhood platform for mothers and their children (ages 0–6),
> built on child-development science and rooted in Arab culture.

This design system codifies the Discover20 brand: colors, type, iconography,
imagery, components, and a UI kit recreation of the marketing site.

---

## 1. Company Context

Discover20 is a bilingual (English / Arabic, RTL-first) early-childhood
platform for the first six years of a child's life. Its proposition:

- **+500 Activities** — purposeful play mapped to a child's exact developmental stage.
- **+200 Developmental Toys** — curated toy suggestions per age window.
- **+300 Moral Stories** — identity- and values-building bedtime content.
- **+5 Assessment Tests** — CDC / AAP-aligned developmental screening.
- **Expert connections** — Psychological experts, parenting coaches, development consultants, pediatricians, nutrition consultants.

Tagline: **"Young Secrets… Great Solutions"** — referring to the hidden potential
of the early-childhood neuroplasticity window (the first 20% of a child's growing
years), hence the "20" in the name.

### Product surfaces represented in this system

| Surface | Notes |
|---|---|
| **Marketing website** (discover20.com) | English + Arabic (RTL). About / Toys / Stories / Activities / Develop / Chatbot / Contact. Primary product surface in this kit. |
| **Launch campaigns** | Instagram / LinkedIn cards (Ramadan card, "Young Secrets" launch, expert intro cards). |
| **Brand collateral** | Letterhead, business stationery, footer strips. |

### Source materials

The system was built from the Discover20 brand book and existing website assets. The source files (brand book, logo master files and other internal documents) are kept privately and are not part of this repository; the logos, illustrations and photos needed to use the system are in `assets/`.

---

## 2. Content Fundamentals

**Voice.** Warm, reassuring, expert-but-friendly. Discover20 talks to mothers
the way a trusted pediatrician-friend would — never preachy, never clinical
without translation. The brand makes complex developmental science feel
doable in 20 minutes a day.

**Pronouns.** Direct second person — "**your child**", "**your baby**" — almost never "we" for the child. Brand uses "**we**" for itself.

**Casing.** **Sentence case** for headlines and UI labels. Section eyebrows
are the only place ALL-CAPS shows up. Never title case.

**Sentence shape.** Headlines are short, declarative, often two lines with a
contrast pivot:
- *"Your child's first 6 years"* / *"are everything."*
- *"Personalised for your child's exact age & stage"*
- *"Resources you can actually trust"*

**Numbers come first.** Stats lead with a plus sign and a confident number:
*+500 Activities · +200 Developmental Toys · +300 Moral Stories · +5 Assessment Tests · +10 Psychological Experts*.

**Authority signals.** When making a developmental claim, the brand cites:
*"CDC & American Academy of Pediatrics (AAP) milestones"*, *"reviewed by Pediatric Consultants"*, *"timed to your baby's neuroplasticity window"*. Bold the institution names inline.

**Imperative CTAs.**
- "Start for free →"
- "Join Discover20"
- "Discover more"
The arrow → is a recurring motif on primary CTAs.

**Bilingual.** English copy and Arabic copy live side-by-side as equals. Both are written, never one translated through the other. Arabic uses **Tajawal** (sub for Filson Soft Arabic) and the layout flips to `dir="rtl"`. Cards often display both languages stacked, e.g. as `Young Secrets / يحكي`.

**Emoji.** **No emoji in product copy.** The brand expresses warmth through illustration and color, not emoji. (The supplied About page does use a couple of unicode symbols — `◎` / `✦` — as decorative bullets in Vision/Mission tiles; treat these as legacy and prefer the rounded line-icon set.)

**Vibe.** Caring, optimistic, science-grounded. Never anxious or guilt-trippy
("you should…"). Always supportive ("you've got this; we'll walk it with you").

### Example phrasings (lift these patterns)

- *"We believe early childhood is the foundation when your child's personality, abilities, and character take their shape."*
- *"This is where your child's Young Secrets live."*
- *"Everything on Discover20 is free, science-backed, and designed for the most important window of your child's life."*
- *"We walk alongside every mother so she never feels alone in her parenting journey."*

---

## 3. Visual Foundations

### Colors

Five brand colors. Per the brand book, use **one as primary (40% of surface) and
each of the remaining four at 15%** for a 100% balanced composition. Don't let
any single accent dominate beyond its share.

| Token | Hex | Role |
|---|---|---|
| `--d20-teal` | `#1ABBBC` | **Primary.** Hero surfaces, primary buttons, subtitles, brand mark. |
| `--d20-yellow` | `#FFD545` | Accent — warmth, sun, energy. Used in "why" strips, accent number ribbons. |
| `--d20-purple` | `#5A30CE` | **Stories** category, "Clinical" / scientific surfaces. |
| `--d20-coral` | `#F05E5E` | **Activities** category, headline color, errors only when necessary. |
| `--d20-green` | `#86C559` | **Toys** category, growth / development cues. |

Per brand book p.18, **type roles by color**:
- Titles → Coral (`#F05E5E`)
- Sub-titles → Teal (`#1ABBBC`)
- Body → 70% Grey
- Data (numbers, KPIs) → Black

A second tier of soft tints (`--d20-teal-light`, `--d20-coral-light`, etc.) provides backgrounds for category cards and notice strips. Every category has a tinted background + a saturated accent stroke or icon — never the saturated brand color as a card background under long body copy.

### Typography

**Brand font: Filson Soft** (Mostardesign — paid). The Discover20 logo is custom Filson Soft. We do not have the font files; **`colors_and_type.css` substitutes Nunito (Google Fonts)** which closely matches Filson Soft's soft, geometric, rounded character. Flagged below in *Caveats*.

| Filson Soft weight | Mapped to (in this system) |
|---|---|
| Black (900) | Titles, hero H1 |
| Bold (700) | Sub-headings, button labels |
| Medium (600) | Sub-titles, eyebrows |
| Book / Regular (400) | Body, paragraph |
| Light (300) | Numbers, data tables (per brand book Data spec) |

Arabic: **Tajawal** (Google Fonts) — substitute for the brand's Arabic weight.

### Backgrounds & Imagery

- **Hero blocks** use the teal `#1ABBBC` as a flat color with subtle white circular blobs (`rgba(255,255,255,0.07)`) drifting in the background — animated with a slow `float` keyframe.
- **Hero corners** are heavily rounded: `border-radius: 0 0 48px 48px;` on a hero, giving the hero block a pillow/lozenge feel.
- **Decorative pattern** is the icon-on-teal pattern from the cover (`assets/cover.png`) — used as section dividers, social banners, and full-bleed brand moments.
- **Photography** is always warm-tone, naturally-lit, of **mothers and babies/toddlers together**. Often cut out and laid over the teal pattern, with brand line-icons composited beside the subjects in the four brand colors (see `assets/hero-home.png`).
- **Category headers** use bold flat fields of the category color split with a yellow/contrasting wedge, plus a white rounded badge holding the category line-icon (see `assets/header-toys.jpg`).
- **No gradients.** Everything is flat color. The only "gradient" you'll see is a soft white blob overlay on a flat field.

### Borders, cards & elevation

- **Card pattern:** white card, 1px `--d20-grey-15` border, `--d20-r-lg` (18px) radius, **frequently with a 5px left accent border in a category color** (`border-left: 5px solid var(--d20-coral)` etc.). This is the brand's signature card vocabulary — keep it.
- **Hero & feature surfaces** use radius `--d20-r-xl` (24px) and no border.
- **Shadows are soft and small.** `--d20-shadow-md` for cards at rest; `--d20-shadow-lg` on hover. Never harsh, never colored except `--d20-shadow-brand` on the primary CTA on teal-on-white moments.

### Hover & press

- **Cards on hover:** `transform: translateY(-3px); box-shadow: var(--d20-shadow-lg);` (test cards also shift their border to the category color on hover).
- **Buttons on hover:** subtle `opacity: 0.9`. Primary CTA (white on teal) doesn't change color, only opacity.
- **Press:** light scale-down (`transform: scale(0.98)`) — implied by the bouncy ease.
- **Easing:** the brand reads "bouncy" — `--d20-ease-bounce` (`cubic-bezier(.34,1.56,.64,1)`) for entries; standard cubic for hovers. Durations ~250ms.

### Animation

- **Entry:** `fadeUp` — 20px translate + opacity, 0.5–0.6s. Sections stagger their children at +0.1s, +0.2s.
- **Hero motion:** white blob shapes drift up/down (~14px) on a 6s infinite ease-in-out loop.
- The provided `animation1_Precise_Proteus.mp4` shows the logo lockup animating in — line-icons enter from the edges and orbit before settling. Use the same idea for splash screens.

### Layout rules

- Content max-width on marketing pages: **900px** (`.container { max-width: 900px; }`). The site reads narrow, with white space around it — kid-app friendly.
- **Generous radius**, **generous gap**: section padding 56–80px vertical, card padding 20–32px, gap 14–24px between siblings.
- **Right-to-left.** Layouts must respect `dir="rtl"`. Use logical CSS properties (`padding-inline-start`, `border-inline-start`) wherever possible.

### Transparency & blur

- Used **sparsely**, only on hero-pill badges (`background: rgba(255,255,255,0.18); border-radius: 14px;` on the teal hero) and decorative blobs (`rgba(255,255,255,0.07)`).
- No frosted-glass / backdrop-filter blur in the existing system. Don't introduce it without a reason.

### Color vibe of imagery

Warm, bright, naturally-lit, **slightly desaturated** — never neon. Photos
of children skew yellow-orange (warm Egyptian afternoon light). Brand
color blocks are saturated and pop against the warm photos.

### Radii recap

- Pills/badges: `--d20-r-pill` (999px) or `--d20-r-lg` (18px) rectangular.
- Buttons: `--d20-r-md` (14px).
- Cards: `--d20-r-lg` (18px).
- Feature cards / hero blocks: `--d20-r-xl` (24px).
- Hero bottom: `--d20-r-hero` (48px).

---

## 4. Iconography

Discover20 has a **proprietary line-icon set** (delivered through the brand
book and the launch / category artwork). The set's traits:

- **Rounded line-icons.** Consistent **stroke width** (roughly 4–6 units on a ~80-unit grid). Stroke joins and caps are all `round`.
- **Soft, friendly silhouettes** — rocking horse, train, books, smiling speech bubble, baby blocks, music waves, picture-book, Arabic/Latin letter glyphs ("ABC" / "ABج").
- **One color per icon** drawn from the brand five — never multi-color within a single icon. Compositions use all five colors side-by-side.
- **Filled background discs** are common when an icon is used as a category badge (white icon on a teal/coral/etc. rounded-square chip with `border-radius: 14px`).

**Icon files in this kit:**
- `assets/icon-rocket.svg` — primary "discover/launch" mark.
- `assets/young-secrets.svg` — sub-brand mark.
- `assets/slider-home.svg` — composite homepage hero artwork.
- `assets/asset-1.svg` — composite of the brand icon family.
- `assets/baby-1.svg`, `assets/baby-2.svg`, `assets/baby-3.svg` — mother-and-child illustrations.
- `assets/header-toys-2.svg`, `assets/header-stories-2.svg`, `assets/header-activities-2.svg` — category header strips with embedded line-icons.

**For icons we don't have in the proprietary set** (chevrons, close, plus, search, menu, etc.), substitute **[Phosphor Icons](https://phosphoricons.com/) — "duotone" or "regular" weight** as the nearest visual match (rounded, friendly, geometric stroke). Phosphor is delivered via CDN. **Flag any substitution back to the user** when shipping production work; the goal is to grow the proprietary set, not replace it.

**Logo files:**
- `assets/logo-teal.svg` / `assets/logo-teal.png` — primary teal lockup.
- `assets/logo-white.svg` — white knockout for use on teal/coral/purple surfaces.
- `assets/logo-mark.png` — square mark for favicons / app icons.
- `assets/favicon.ico` — provided favicon.

**Emoji?** No. **Unicode symbols?** Discouraged — only used as bullet decoration in legacy templates (`◎`, `✦`). Prefer the proprietary line-icon, or a Phosphor substitute.

---

## 5. Index — what's in this folder

```
Discover20 Design System/
├─ README.md                  ← you are here
├─ colors_and_type.css        ← all design tokens as CSS vars + semantic classes
├─ assets/                    ← logos, brand patterns, illustrations, photography
├─ preview/                   ← small HTML cards consumed by the Design System tab
├─ ui_kits/
│  └─ website/                ← React/JSX recreation of discover20.com
│     ├─ README.md
│     ├─ index.html           ← interactive home + click-through prototype
│     ├─ Header.jsx
│     ├─ Hero.jsx
│     ├─ CategoryGrid.jsx
│     ├─ AgeStageBar.jsx
│     ├─ ActivityCard.jsx
│     ├─ StoryCard.jsx
│     ├─ ExpertCard.jsx
│     ├─ StatsRow.jsx
│     ├─ TrustedHero.jsx
│     ├─ CTAStrip.jsx
│     ├─ Footer.jsx
│     └─ Primitives.jsx       ← buttons, badges, eyebrow, etc.
```

### Quick start

```html
<link rel="stylesheet" href="colors_and_type.css">

<button class="d20-btn d20-btn-primary">Start for free →</button>
```

Or pull the tokens directly:

```css
.my-thing {
  background: var(--d20-teal);
  color: var(--d20-white);
  border-radius: var(--d20-r-xl);
  padding: var(--d20-s-5) var(--d20-s-6);
  font-family: var(--d20-font-display);
  font-weight: var(--d20-w-black);
}
```

---

## 6. Caveats & open questions

- **Filson Soft is not included.** Brand book specifies Filson Soft (paid Mostardesign font). We substitute **Nunito** (Google) and **Tajawal** for Arabic. Please supply licensed `.woff2` files and we'll drop them into `fonts/` and update `colors_and_type.css`.
- **No proprietary icon font.** The brand has a beautiful proprietary line-icon set scattered across SVG header strips. They are not extracted as single-icon files. For utility icons (chevron / close / search / menu) we substitute Phosphor Icons via CDN. Highest-leverage next step: extract each line-icon from the existing SVGs into its own file under `assets/icons/`.
- **No Figma or codebase URL was provided** — system is reconstructed from the brand book + supplied HTML reference + supplied raster/SVG assets. If a Figma exists, share the link and we'll align variables.
- **Color tints derived, not specified.** The five brand colors are documented; the lighter tints used for surface fills (`--d20-coral-light` etc.) are derivations and should be reviewed.
- **Mobile app surface unknown.** Brand book mentions a Chatbot product but no UI was supplied. UI kit covers the website only.

---

## 7. Where to go next

- Drop into `ui_kits/website/index.html` to see the system applied end-to-end.
