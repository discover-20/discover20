# Discover20 Website — UI Kit

Recreation of the discover20.com marketing site as React/JSX components,
built against the brand guideline and the supplied `discover20_about (1).html`
reference. Cosmetic-only — no real auth, no real CMS — but pixel-faithful
to the brand vocabulary so any combination of these components stays on-brand.

## Files

| File | Purpose |
|---|---|
| `index.html` | Entry — pieces every component together as a clickable site prototype. |
| `Primitives.jsx` | `Button`, `Pill`, `Eyebrow`, `SectionLabel`, `Badge`. |
| `Header.jsx` | Top nav with logo, language toggle, primary CTA. |
| `Hero.jsx` | Teal hero with drifting blobs, hero badge, big H1, two-line headline. |
| `AgeStageBar.jsx` | Age-range pill row (0–6 mo / 6–12 mo / …). |
| `CategoryGrid.jsx` | Toys / Stories / Activities tiles with category color + line-icon. |
| `ActivityCard.jsx`, `StoryCard.jsx`, `ToyCard.jsx` | Three flavors of content card — share the same shell, swap accent color. |
| `StatsRow.jsx` | +500/+200/+300/+5 number-led stat strip. |
| `ExpertCard.jsx` | Expert tile with avatar, title, specialty chips. |
| `TrustedHero.jsx` | Teal "Resources you can actually trust" inner-hero. |
| `ValuesGrid.jsx` | 01/02/03/04 numbered values cards. |
| `CTAStrip.jsx` | "Join Discover20" white-on-teal closing strip. |
| `Footer.jsx` | Footer with icon pattern, addresses, social. |

## How to use

```html
<!-- in your page -->
<script src="https://unpkg.com/react@18.3.1/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js"></script>

<link rel="stylesheet" href="../../colors_and_type.css">

<script type="text/babel" src="Primitives.jsx"></script>
<script type="text/babel" src="Header.jsx"></script>
<!-- … -->
```

Components export themselves to `window` so each Babel-compiled file can use the others.

## Interactive flow in `index.html`

1. Landing — teal hero, "Choose your child's age" age-stage bar.
2. Click an age pill → switches the activity/toy/story feed.
3. Click a category tile → shows the category detail screen with its colored header.
4. Click "Start for free" → opens a faux signup sheet (no backend).

All routing is in-memory React state.
