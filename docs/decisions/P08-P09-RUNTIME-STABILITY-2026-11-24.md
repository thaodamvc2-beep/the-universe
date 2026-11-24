# Gói 08/09 — Runtime Stability Follow-up

**Date:** 2026-11-24  
**Scope:** Authorized Gói 08 Free Flight & Camera and Gói 09 Mobile Experience only  
**Branch:** `fix/p08-p09-runtime-stability`  
**PR:** https://github.com/thaodamvc2-beep/the-universe/pull/11  
**Base:** `feat/packages-08-09-integration`  
**Production:** No merge to `main`; no GitHub Pages deployment.

## Owner-reported failures

1. The preview displayed a scene initialization/load error and a WebGL context-loss message.
2. Directional buttons did not steer reliably while continuous flight was enabled.
3. Owner explicitly instructed that the infinite procedural-region key behavior must not be changed.
4. NASA catalogue data is a design reference for a game, not a scientific simulation requirement.

## Root causes and corrections

### Flight input ownership

The D-pad captured a pointer, but its `pointerdown` bubbled to the parent canvas, whose handler could capture the same pointer. The parent now ignores events originating from interactive controls. The child control remains the pointer-capture owner; direction-source tracking and continuous-flight state are preserved.

### Deployment-aware texture paths

GitHub Pages uses `/the-universe`, while Vercel preview serves at the domain root. Avatar URLs now use a shared build-aware helper so texture loading follows the correct deployment path.

### Collision math and frame-loop allocation

Collision sphere centers and clearance radii are precomputed when the body catalogue changes. Per-frame swept collision uses scalar projection, squared-distance tests and tangent deflection without allocating a new Three.js vector for each body. The original clearance rule `radius * 1.3 + 0.72` is preserved. A deterministic regression test compares the new solver with the previous Three.js vector implementation across 240 spatial cases.

### HUD and scene render cost

HUD telemetry updates in its own 250 ms component; the 3D scene is memoized so telemetry updates do not rerender the scene tree. Planet nameplates keep their original 512×96 quality but create GPU textures only within 72 game-space units of the player and dispose them when distant.

### NASA reference data as game content

The runtime bulk NASA Exoplanet Archive TAP request is removed. Eleven selected NASA-catalog names are used as destination seeds. In-game coordinates, radii, palettes and appearance are artistic gameplay choices, not scientific coordinates or scale. The catalog remains a source reference; the game does not depend on NASA being online to start.

## Explicit preservation

- Do not change `generatedKeys` or the infinite procedural-region behavior.
- Do not design or implement Gói 10–15.
- Do not add a paid AI API or turn the game into a scientific simulator.
- Do not change protected avatar artwork, unrelated UI, or production branch behavior.

## Verification and remaining gate

- Local automated tests: 100/100 passed.
- ESLint: no errors; existing root warning about the absence of a Pages directory remains.
- TypeScript: passed.
- Vercel-mode static build: passed locally.
- Vercel preview build: must be checked on the latest commit before owner testing.
- Physical phone: still requires owner testing for touch behavior, repeated landing, WebGL stability, memory, thermal and battery behavior.
