# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **Next.js version note**: This project uses Next.js 16, which has breaking changes from older versions. Read `node_modules/next/dist/docs/` before writing Next.js-specific code.

## Commands

```bash
npm run dev      # start dev server on localhost:3000 (Turbopack)
npm run build    # production build + type check
npm run lint     # ESLint
npx tsc --noEmit # type check without building
```

No test suite is configured.

## Architecture

**Framework**: Next.js 16 (App Router) + React 19 + TypeScript + Tailwind v4.

**Pages**:
- `/` — landing page assembled from `components/landing/*`
- `/swipe` — Tinder-style swipe deck assembled from `components/swipe/*`

**Component layout**:
- `components/landing/` — seven server components (default exports): `Nav`, `Hero`, `Manifesto`, `HowItWorks`, `Stories`, `CTA`, `Footer`. `Nav` and `Hero` are client components (scroll listener + Motion animations).
- `components/swipe/` — five client components (named + default exports): `CardStack` (deck manager), `ProfileCard` (draggable card with swipe physics), `ActionBar`, `MatchModal`, `SwipeNav`.
- `components/ui/` — `Wordmark` and `Ornament` primitives (named exports).
- `lib/profiles.ts` — seeded `Profile[]` with Unsplash photo URLs. This is the only data source; there is no backend.

## Design system

All tokens are defined in `app/globals.css` via Tailwind v4's `@theme` block. Use Tailwind token names directly in className — do not use hardcoded hex values.

| Role | Token |
|---|---|
| Primary text | `text-ink` / `bg-ink` |
| Canvas background | `bg-cream` (set on `body`) |
| Card surface | `bg-cream-pale` |
| Primary accent (CTAs, like) | `text-terracotta` / `bg-terracotta` |
| Dark accent (modals, manifesto) | `bg-oxblood` |

**Typography**: `font-display` → Fraunces (headlines, pull-quotes, italic weight 500 for italic). `font-body` / default → Inter Tight. The `.eyebrow` CSS class produces small-caps tracked labels (used throughout). Do not use `font-sans` or other Tailwind defaults — the theme overrides these.

**Images**: all remote images must be from `images.unsplash.com` (the only whitelisted domain). Use `next/image` with `fill` + a positioned parent, or explicit `width`/`height`. Profile photo URLs are constructed via the `u()` helper in `lib/profiles.ts`.

## Swipe deck mechanics

`ProfileCard` uses `@use-gesture/react` `useDrag` bound to an outer `<div>` (not the `motion.div`) to avoid type conflicts with Motion's own drag API. Motion values `x`, `y`, `rotate`, `opacity` drive the card. The imperative `swipe(direction)` handle is exposed via `forwardRef` + `useImperativeHandle` so `CardStack` and `ActionBar` can trigger programmatic swipes. A `swipingRef` inside each card prevents double-fires.

`CardStack` renders up to 3 cards from `profiles[index..index+2]`, reversed in DOM so the top card renders last. Match modal fires when `likeCount` first hits 3.

## Fonts

Fraunces is loaded as a variable font with axes `["opsz", "SOFT"]` — **do not add a `weight` array** alongside `axes` or Next.js will throw a build error. Inter Tight is loaded without specifying axes.
