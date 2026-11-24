# P08 — Decision Log

- **2026-11-24 — Owner authorization:** Implement Gói 08 Free Flight & Camera and integrate into the overall web experience on an isolated branch. Assistant may run automated and browser/emulated verification; owner performs real-world validation afterward.
- **Architecture:** Reuse existing Three.js / React Three Fiber scene and flight controller; no engine migration.
- **Boundary:** Gói 07 remains the initial flight slice; Gói 08 hardens state/input/camera behavior. Preserve canonical 15-package numbering.
- **Acceptance:** `PACKAGE_08_FREE_FLIGHT_AND_CAMERA_SCOPE.md`. No production merge/deploy without later explicit instruction.
- **2026-11-24 — Verification checkpoint:** 90/90 automated tests, lint, typecheck and static build pass. Chromium emulation confirms WebGL and non-overlapping controls. Physical-device acceptance remains pending.

- **Integration handoff:** PR #10 is open and mergeable; preview deployment `dpl_FaGMs5tA7YPwmGtcgwE4iTcEh5QZ` is READY. Code integration commit `aaa346c50f2511f004e189c2881f92de4f2b26fa` (later commits only record project status). Owner real-phone acceptance pending.


- **2026-11-24 — Owner runtime findings:** Owner reported that pressing a directional control did not steer while continuous flight was active and that the 3D scene still showed load/WebGL errors. These reports supersede any assumption that earlier unit tests proved real interaction correctness.
- **Runtime correction PR #11:** D-pad events are excluded from the parent canvas drag/pointer-capture handler. Collision bodies are precomputed on body-catalogue changes; movement uses scalar segment projection, squared distances and the existing clearance formula `radius * 1.3 + 0.72`. The scalar solver is compared with the previous Three.js vector implementation across 240 deterministic spatial cases.
- **Preservation:** Infinite procedural-region key tracking (`generatedKeys`) is intentionally unchanged at the owner's explicit direction.
- **Verification:** 100/100 automated tests, TypeScript and static build pass locally. Vercel preview build and owner real-device acceptance are tracked separately; no production merge/deploy.
