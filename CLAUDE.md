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
- `components/landing/` — seven components (default exports): `Nav`, `Hero`, `Manifesto`, `HowItWorks`, `Stories`, `CTA`, `Footer`. `Nav` and `Hero` are `"use client"` (scroll listener and Motion animations respectively); the rest are server components.
- `components/swipe/` — five client components (named + default exports): `CardStack` (deck manager), `ProfileCard` (draggable card with swipe physics), `ActionBar`, `MatchModal`, `SwipeNav`.
- `components/ui/` — `Wordmark` and `Ornament` primitives (named exports).
- `lib/profiles.ts` — seeded `Profile[]` with Unsplash photo URLs. This is the only data source; there is no backend.

**Animation library**: The package is `motion` (v12), not `framer-motion`. All imports come from `motion/react`. Do not use `framer-motion` imports.

## Design system

All tokens are defined in `app/globals.css` via Tailwind v4's `@theme` block — there is no `tailwind.config.js`. Use Tailwind token names directly in `className`; do not use hardcoded hex values.

| Role | Token |
|---|---|
| Primary text | `text-ink` / `bg-ink` |
| Muted text | `text-ink-soft` |
| Canvas background | `bg-cream` (set on `body`) |
| Card surface | `bg-cream-pale` |
| Primary accent (CTAs, like) | `text-terracotta` / `bg-terracotta` |
| Dark accent (modals, manifesto) | `bg-oxblood` |
| Card shadow (resting) | `shadow-card` |
| Card shadow (lifted/dragging) | `shadow-card-lift` |

**Typography**: `font-display` → Fraunces (headlines, pull-quotes; use `italic` + `style={{ fontWeight: 500 }}` for italic weight). `font-body` / default → Inter Tight. Do not use `font-sans` or other Tailwind defaults — the theme overrides these.

**CSS utility classes** (defined in `globals.css`, not Tailwind plugins):
- `.eyebrow` — small-caps tracked uppercase label, used for section numbers and attributions
- `.grain` — adds a subtle noise texture via `::after` pseudo-element; requires `position: relative` on the element
- `.paper` — cream panel with radial highlight; used for card-like surfaces
- `.hairline` — thin border using `--color-ink`
- `.mask-fade-bottom` — gradient mask that fades image to transparent at the bottom (used by `ProfileCard` photo overlay)
- `.cursor-grab` / active state — grab cursor for draggable elements

**Images**: All remote images must be from `images.unsplash.com` (the only whitelisted domain in `next.config.ts`). Use `next/image` with `fill` + a positioned parent, or explicit `width`/`height`. Profile photo URLs are constructed via the `u()` helper in `lib/profiles.ts` — this helper already appends `?w=900&q=80&auto=format&fit=crop`, so do not add query params manually.

## Swipe deck mechanics

`ProfileCard` uses `@use-gesture/react` `useDrag` bound to an outer `<div>` (not the `motion.div`) to avoid type conflicts with Motion's own drag API. The card body is **two stacked `motion.div`s**: the outer (`key={`pose-${index}`}`) animates stack pose (scale/y/opacity) via `animate={stackPose}`; the inner binds motion values `x`, `y`, `rotate`, `opacity` via `style` for drag. Do not collapse these into one motion.div — see gotcha below. The imperative `swipe(direction)` handle is exposed via `forwardRef` + `useImperativeHandle` so `CardStack` and `ActionBar` can trigger programmatic swipes. A `swipingRef` inside each card prevents double-fires.

`CardStack` renders up to 3 cards from `profiles[index..index+2]`, reversed in DOM so the top card renders last. Match modal fires when `likeCount` first hits 3.

**Known gotchas**:
- **Motion `style` + `animate` double-binding**: a single `motion.div` with motion values in `style` AND target props in `animate` will cache the previous animate state and silently ignore prop updates when the role flips (e.g. ghost → top). Either separate concerns into two layered motion.divs, or use a `key` that changes with the role to force a remount.
- **`topCardRef` must use a callback ref that ignores `null` calls**: when index advances, the outgoing top card unmounts and the previously-ghost card promotes in the same React commit. React doesn't guarantee the unmount cleanup runs before the new top's setup, so a plain `ref={isTop ? topCardRef : undefined}` on a `useImperativeHandle`-exposed handle ends up null after the swap. `CardStack` uses `setTopCardRef` (callback ref that only writes non-null handles) to avoid this.
- `document.querySelector('h2')` returns the bottom ghost card's name, not the top card's, because cards are rendered in reverse DOM order.
- Action-bar clicks are debounced via `isSwipingRef` for 350 ms (the throw animation duration). Clicks faster than that are silently dropped — when verifying via Playwright, wait >400 ms between clicks.
- `npm run lint` reports one pre-existing warning (`likeCount` unused in `CardStack.tsx`). The variable is kept for documentation; the match modal computes via the `setLikeCount` callback's `prev` parameter. Don't "fix" by removing it unless you're also adding a likeCount display.

## Fonts

Fraunces is loaded as a variable font with axes `["opsz", "SOFT"]` — **do not add a `weight` array** alongside `axes` or Next.js will throw a build error. Inter Tight is loaded without specifying axes.
