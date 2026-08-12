# Design System Master File — Supersonic

> Overrides the auto-generated first pass (which matched a generic light
> "Trust & Authority / Accessible & Ethical" corporate template — wrong for a
> dark, gaming-and-wallet app aimed at young Libyan users). This is the
> actual curated direction, synthesized from targeted `--domain style`,
> `--domain product`, `--domain color`, `--domain typography` searches:
> - Style match: **Modern Dark (Cinema Mobile)** — "best for... high-end
>   gaming companion apps" + "fintech/trading dashboards" (exact hybrid fit).
> - Product match: **Gaming** (vibrant/neon/immersive) + **Personal Finance
>   Tracker** (Glassmorphism + Dark OLED, calm-but-premium money display).
> - Explicit anti-pattern flagged by the tool itself: "AI purple/pink
>   gradients" — i.e. stock Tailwind `purple-*` slapped on everything reads
>   as generic/templated. Fix is depth + restraint + a second accent hue for
>   money, not abandoning purple as the brand color.

## Background layers (cinematic depth, not one flat tone)
| Token | Hex | Use |
|---|---|---|
| `void` | `#0A0A18` | Page background (deeper/less saturated than old `#0F0F23`) |
| `surface` | `#15142B` | Cards, sheets |
| `elevated` | `#1D1B3A` | Raised/active cards, modals |
| glass | `bg-white/5 backdrop-blur-xl border-white/10` | Header, bottom nav, sheet chrome |

## Brand primary — indigo-violet (kept, refined)
Existing `purple-400..950` Tailwind scale stays as the interactive/brand
color (recognizable, already the logo). What changes is *how* it's used:
restrained to buttons/links/active-states/glow, not as the default border
color on every single card (that's what reads as "generic AI purple").

## New: gold accent for money
| Token | Hex | Use |
|---|---|---|
| `gold` | `#F2B84B` | Wallet balance figure, prices in checkout, "paid" success amount |
| `gold-soft` | `#FDE9BE` | Rare highlight/glow text on gold |

Rationale: separates "your money" from "app chrome" at a glance — matches
the Fintech/Crypto palette pattern ("gold trust + purple tech").

## Semantic
- Success (paid/verified): `emerald-400` / `emerald-500`
- Destructive/error: keep existing `accent` token (`#F43F5E` rose) — already
  used for notification badges, fine as-is.

## Typography
- Arabic body/UI: **Tajawal** (weights 400/500/700/900) — modern geometric
  Arabic sans, widely used in premium MENA fintech/gaming products, replaces
  the current unstyled system-font fallback.
- Latin/numerals (prices, "Supersonic" wordmark, LTR fields): **Inter**
  (300–700) — per the Modern Dark Cinema pairing, pairs cleanly with Tajawal.
- Load both via Google Fonts `<link>` in `docs/index.html`, extend
  `tailwind.config.theme.extend.fontFamily`.

## Effects
- Glassmorphism extended from the login screen (already done) to: sticky
  header, bottom nav, and all bottom sheets (top-up, product, order).
- Ambient glow blobs: 1–2 large blurred circles (`blur-3xl`, low opacity,
  brand/gold hue) behind the home hero banner and account header — cheap,
  static (no motion cost), reads as premium depth.
- Card radius standardized to `rounded-2xl`/`rounded-3xl` (already mostly
  consistent — audit for stragglers).
- Primary CTA buttons keep+extend the existing glow shadow
  (`box-shadow: 0 0 24px rgba(124,58,237,.45)`), applied consistently.

## Motion
Standard tier (150–300ms), existing `prefers-reduced-motion` guard in
`docs/index.html` stays authoritative — no new animation library, no GSAP
(would need a CDN/bundle addition this project doesn't have); use CSS
transitions only, consistent with the rest of the stack.

## Accessibility (non-negotiable, unchanged from before)
Contrast ≥4.5:1 body text, visible focus rings, 44×44px touch targets,
aria-labels on icon-only buttons (already largely in place — recheck after
color changes since darker backgrounds can shift contrast ratios).
