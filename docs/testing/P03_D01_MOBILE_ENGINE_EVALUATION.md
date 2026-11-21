# Gói 03 — D01 Mobile 3D Engine Evaluation Record

**Status:** Awaiting owner/device test evidence
**Purpose:** Compare Three.js + React Three Fiber, Babylon.js and PlayCanvas before locking D01.

## 1. Test environment record

| Field | Value |
|---|---|
| Tester | |
| Date/time | |
| Device model | |
| Device class (low/mid/high) | |
| OS/version | |
| Browser/version | |
| Screen resolution / DPR | |
| Network | |
| Battery / thermal state at start | |
| Build/commit | |

## 2. Candidate comparison

Use equivalent scene complexity, camera framing, lighting, star count, geometry, render resolution and interaction behavior. Do not compare dissimilar scenes as if they were equivalent.

| Metric | Three.js + R3F | Babylon.js | PlayCanvas |
|---|---:|---:|---:|
| Scene first visible (seconds) | | | |
| Median FPS after 60s | | | |
| 1% low FPS / worst sustained frame time | | | |
| Memory/GPU observation | | | |
| Touch orbit ergonomics (1–5) | | | |
| Zoom/pinch behavior (1–5) | | | |
| Orientation change recovery | | | |
| Background/foreground recovery | | | |
| WebGL context-loss recovery | | | |
| Thermal/battery impact after 10 min | | | |
| Integration/developer workflow notes | | | |

## 3. Repeatable procedure

1. Use the same device, browser, power mode and network for all candidates.
2. Clear browser cache between cold-load runs; perform at least three cold loads per candidate.
3. Run each scene for at least 60 seconds after load; record median FPS and visible stutter.
4. Rotate with one finger, zoom with pinch, change orientation and background/foreground the browser tab.
5. Where possible, trigger or simulate WebGL context loss and record recovery.
6. Run each candidate for ten minutes and record heat/battery observations.
7. Repeat on a low-end Android, mid-range Android and iPhone where available.
8. Attach screenshots, browser console errors and measurements. Do not infer memory or FPS from visual smoothness alone.

## 4. Current evidence

| Candidate | Prototype included in this delivery | Device evidence | Status |
|---|---|---|---|
| Three.js + React Three Fiber | Yes — `/prototype` | Not yet supplied | Candidate only |
| Babylon.js | No | Not yet supplied | Not evaluated |
| PlayCanvas | No | Not yet supplied | Not evaluated |

## 5. Decision

**D01 remains OPEN.** Do not select an engine based solely on this initial prototype. Record the evidence above, compare trade-offs, then request owner confirmation before locking the engine.
