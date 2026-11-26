# THE UNIVERSE — Gói 07: 3D Universe Visual System

**Version:** 1.0  
**Status:** IN PROGRESS — owner-authorized sequential work  
**Owner instruction recorded:** 2026-11-25  
**Sequence authority:** Gói 01–06 are the existing integrated baseline and are frozen against unrelated changes. Complete and review Gói 07 before starting Gói 08, then complete Gói 08 before Gói 09.

## 1. Objective
Establish and stabilize the 3D visual system used throughout THE UNIVERSE: coherent rendering of celestial bodies, environment, lighting, visual materials, scene composition, visual hierarchy, and transitions between astronomical and fictional/procedural worlds. This package is visual foundations, not flight-control/mobile qualification.

## 2. Preserve the existing baseline
- Do not alter accepted/integrated Gói 01–06 except for a necessary compatibility fix explicitly documented and regression-tested.
- Earth remains Home World; guest-first; preserve avatar/nickname, maps and catalogue.
- Preserve six-axis flight and landing behavior already present as a baseline while working on visual-system requirements; flight-state/camera improvements belong primarily to Gói 08.
- Do not change `generatedKeys` or infinite procedural-region behavior.
- No paid AI generation, social features, account/multiplayer scope expansion or Gói 10–15 work.
- No production/main merge or Pages deployment without explicit owner approval.

## 3. In scope
- Audit and establish the scene-rendering/material/lighting/environment architecture.
- Define a consistent visual style and rendering hierarchy for stars, space background, celestial bodies, body labels, local environment, avatar presentation and light sources.
- Ensure real, fictional and procedural bodies are visually distinguishable without misleading scientific claims.
- Check texture/material/resource lifecycle and renderer stability; avoid unbounded GPU allocations.
- Define visual fallback/recovery states where assets or WebGL resources fail.
- Add automated regression coverage for rendering configuration, resource lifecycle helpers and relevant deterministic visual-system logic.
- Verify desktop/browser preview; do not claim physical device qualification.

## 4. Out of scope
- Re-designing flight input/state machine, camera handoff, landing logic or steering (Gói 08).
- Mobile control redesign, device performance/thermal benchmarking or comprehensive phone qualification (Gói 09).
- New wish, account, realtime, audio, AI service, payment or social systems.
- Global graphics-quality reduction as a workaround without root-cause evidence.

## 5. Deliverables
1. Visual-system audit and gap report.
2. Defined scene visual conventions and configuration.
3. Implemented fixes/additions in the 3D rendering layer only, with file scope recorded.
4. Regression tests and build/lint/typecheck evidence.
5. Preview branch/PR and package review checklist.
6. Updated package status, decision log and continuity brief.

## 6. Acceptance gate
- Scene consistently renders celestial objects, ambient environment, lighting and labels without unintended visual regressions.
- No resource leak or unbounded allocation introduced by package changes; relevant lifecycle tests pass.
- Real/procedural classifications remain clear and data integrity is preserved.
- Desktop preview reviewed and automated checks pass.
- Limitations are explicitly recorded. Package 07 is not marked accepted until owner review.
- Stop after Gói 07 review; do not start Gói 08 automatically.

## 7. Files allowed to change
3D scene rendering/material/environment/label/resource management modules and their focused tests; this scope document, package decision/status and continuity records. Any unrelated change requires a documented reason and regression test.


## 8. Owner-directed second audit and hardening (2026-11-25)
- Owner confirmed that live website inspection of space/avatar/body proportions remains the accepted baseline and should be preserved; do not undo tested visual geometry without new evidence.
- The owner directed closure of technical gaps identified in the second audit, with Package 08 requirements consulted for compatibility preparation.
- A separate hardening branch adds an entry/exit threshold helper for planet labels (enter at 72, remain visible through 80), caps the nearest active label sprites at 24, and keeps the label render transforms player-relative. Focused regression tests cover the selection helper.
- A shared Package 07/08 integration contract documents world-coordinate, body-radius/visual-scale, camera-consumer, label/resource and package-boundary expectations. This is architectural preparation only; it does not implement Package 08.
- Still requires further verification: actual texture allocation ceilings across the full scene, stress test with dense near-body scenes, renderer/context recovery test, visual audit of lighting/materials/background/classification, automated/browser preview review and hardware profiling where available. These gaps are not closed merely by the hysteresis helper.
- Do not change `generatedKeys`, procedural region generation or Gói 01–06. No production merge/deployment until owner review and explicit permission.


## 9. Owner art direction — living, colorful game universe (2026-11-25)
- Preserve the owner's successful real-device inspection of 3D scale and space/avatar proportions. This art direction does not authorize resizing or rebuilding that accepted geometry.
- THE UNIVERSE is a discovery game and must not look like a cold, bare scientific visualization. Target a vivid, inviting, magical, polished, living environment while retaining readable navigation and performance.
- Space backdrop: layered colorful nebulae, varied star density and restrained sparkle/glow, depth cues, palette variation and a cohesive atmosphere rather than flat blackness.
- World/planet environments: where surface-scene implementation is available and compatible, include terrain variety and living nature (mountains, water, vegetation, islands, valleys, clouds and atmospheric color). These should be actual environment assets/geometry or appropriately optimized procedural visuals, not only decorative labels or claims.
- Fictional/procedural worlds should have their own artistic identity and may be fantastical; avoid one generic sphere treatment across all worlds. Real-world celestial data/classification remain intact.
- Art effects must be restrained and performance-aware: reusable assets/materials, bounded allocations, graceful fallbacks and responsive behavior. Avoid effects that make navigation/labels unreadable or reduce phone performance.
- This is an art direction and audit target, not evidence that terrain, water, vegetation or new lighting effects are already implemented. A visual implementation should be previewed and owner-reviewed before acceptance.
