# P09 — Decision Log

- **2026-11-24 — Owner authorization:** Implement Gói 09 Mobile Experience and integrate with Gói 08 on an isolated branch. Assistant may run automated and browser/emulated verification; owner performs real-device validation afterward.
- **Architecture:** Reuse existing responsive Next.js client and R3F canvas; no engine migration.
- **Performance policy:** Do not reduce visual quality blindly. Measure first; device-tier budgets require reproducible evidence.
- **Acceptance:** `PACKAGE_09_MOBILE_EXPERIENCE_SCOPE.md`. No production merge/deploy without later explicit instruction.
- **2026-11-24 — Verification checkpoint:** Chromium emulation passed at 390×844, 1280×800 and 1280×600. Simulated WebGL context loss/restoration kept the canvas mounted and cleared the recovery overlay after restoration. Physical-device performance profiling remains pending.

- **Integration handoff:** PR #10 is open and mergeable; preview deployment `dpl_FaGMs5tA7YPwmGtcgwE4iTcEh5QZ` is READY. Code integration commit `aaa346c50f2511f004e189c2881f92de4f2b26fa` (later commits only record project status). Owner real-phone acceptance pending.


- **2026-11-24 — Owner runtime findings:** Owner reported 3D scene initialization/WebGL errors in the preview. The deployment used the domain root while avatar image paths still pointed to `/the-universe/avatars`, which could fail texture loading.
- **Runtime correction PR #11:** Avatar paths now use a build-aware base path (Vercel root; GitHub Pages `/the-universe`). Planet labels retain their 512×96 texture quality but allocate only within 72 game-space units and dispose when distant. Telemetry refresh is isolated to 250 ms and the 3D scene is memoized to avoid scene-tree rerenders from HUD refreshes.
- **Data policy:** The full live NASA TAP exoplanet request is removed. Eleven curated NASA-catalog names are used as game landmarks; in-game positions, sizes, palettes and appearance are artistic values, not scientific simulation. The NASA catalog remains a source reference, not a runtime data dependency.
- **Verification:** 100/100 automated tests, lint, TypeScript and Vercel-mode static build pass locally. Physical-phone WebGL/GPU/thermal qualification remains pending.
