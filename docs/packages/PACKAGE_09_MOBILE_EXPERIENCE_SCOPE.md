# PACKAGE 09 — Mobile Experience

**Roadmap authority:** Master Spec §17. **Authorization:** Owner, 2026-11-24. **Status:** IN PROGRESS; physical-device acceptance pending.

## Purpose and scope

Make the integrated 3D experience reliable on touch-first phones without degrading desktop behavior or changing the approved visual identity.

- Responsive HUD and controls across narrow/tall phones, landscape and desktop.
- Touch-look plus simultaneous multi-pointer movement; pointer capture, release, cancellation and lost-focus recovery.
- Compact, reachable controls that do not obscure the scene or conflict. Keep Home and Feedback compact in the right utility rail; never cover directional controls.
- Safe-area/viewport behavior, menu scroll containment and clear gesture boundaries between camera-look and UI controls.
- WebGL context-loss detection/recovery that reports the actual condition, not an unverified claim of insufficient GPU memory.
- Keep the canvas mounted during context loss so browser restoration can occur; provide explicit retry if restoration fails.
- Qualification plan for rendering, memory/GPU stability, frame pacing, thermal/battery impact, tab transitions and repeated flight/landing cycles.

## Exclusions and invariants

No engine replacement, arbitrary quality downgrade, avatar/art redesign, feature removal, paid AI, account or multiplayer backend. Preserve guest-first access, Earth return, approved HUD and desktop controls. Device-tier quality changes require measured evidence and documented thresholds.

## Acceptance criteria

1. Portrait/landscape controls do not overlap or become unreachable.
2. Touch-look works while movement directions are held.
3. Pointer up/cancel/lost capture and app blur never leave movement stuck; one pointer release does not cancel another.
4. Menus scroll independently from camera gestures.
5. Context loss is detected; canvas remains mounted; restoration resumes or offers retry.
6. Error copy distinguishes context loss from confirmed memory exhaustion.
7. Responsive/input regressions, lint, typecheck and production build pass.
8. Real-phone checks record device/browser, viewport, duration, repeated flight/landing, memory/context events and results. Emulation is not physical-device acceptance.

## Evidence

Verification on 2026-11-24: Chromium emulation passed at 390×844, 1280×800 and 1280×600; WebGL was available and control rails did not overlap. Simulated `WEBGL_lose_context` confirmed the canvas stays mounted, the recovery overlay appears, and the overlay clears after restoration on mobile and desktop emulation. 90/90 Node tests, lint, TypeScript and static production build passed. Physical phone profiling (memory, frame pacing, thermals and battery) remains pending owner validation.
