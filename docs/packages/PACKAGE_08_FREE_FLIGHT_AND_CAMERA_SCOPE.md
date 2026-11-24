# PACKAGE 08 — Free Flight & Camera

**Roadmap authority:** Master Spec §17. **Authorization:** Owner, 2026-11-24. **Status:** IN PROGRESS; owner/device acceptance pending.

## Purpose

Gói 07 introduced the first spaceflight slice. Gói 08 hardens and integrates its six-axis flight state machine, input arbitration, camera handoffs, landing/re-landing and navigation continuity. Extend the existing implementation; do not duplicate or replace it.

## Scope

- Six-axis, view-relative movement: forward/back, strafe left/right, ascend/descend.
- Continuous flight: directional steering adds to forward travel; releasing steering leaves continuous flight active.
- Combined directions and concurrent input sources without premature release.
- Explicit grounded, walking, sitting, flying, approaching and landing transitions.
- Free-look, stable camera orientation, final-descent framing and surface-camera handoff.
- Repeated flight → landing → takeoff → re-landing on same or different bodies without stale camera anchors or off-screen avatar jumps.
- Preserve existing landing rules, Earth return, and owner-directed landability of fictional planets including water worlds.
- Desktop keyboard/pointer and mobile touch share the same state machine.

## Exclusions and invariants

No engine replacement, art/avatar/HUD redesign, paid AI, account, wishes, audio expansion or multiplayer backend. Preserve Earth as Home World, no spacecraft requirement, no combat/social mechanics, selected avatar and `.76` sprite height. Pointer cancel/loss, blur and tab interruption must safely release held inputs.

## Acceptance criteria

1. Six axes work independently and in combinations on desktop and touch.
2. Directional steering never disables active continuous flight; release resumes forward travel.
3. Two pointers can hold different axes; releasing one does not release the other.
4. State transitions clear stale movement flags.
5. During landing, the planet remains visually stable while the avatar visibly descends; no off-screen throw.
6. Repeated same-body/cross-body landing preserves camera framing and grounded movement.
7. Fictional worlds, including water worlds, are landable.
8. Return to Earth restores home position and clears flight/input state.
9. Automated tests, lint, typecheck and production build pass. Physical-device and owner review remain separate gates.

## Evidence

Verification on 2026-11-24: 90/90 Node tests, lint, TypeScript and Next.js static production build passed. Chromium emulation confirmed mobile (390×844) and desktop (1280×800 / 1280×600) canvas/WebGL availability and non-overlapping control rails. Multi-source direction tests confirm one pointer release does not cancel another and continuous flight remains active. Physical phone test remains the owner’s acceptance step.
