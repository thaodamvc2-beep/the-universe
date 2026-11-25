# Gói 07–08 Shared 3D Integration Contract

**Status:** Proposed technical contract for implementation and verification during sequential packages 07 then 08. It does not authorize Package 08 implementation.

## Shared world model
- A single world-coordinate convention must be used for body positions, avatar position, collision/approach calculations, render-relative transforms and navigation references.
- `Body.position` is the authoritative world-space location and `Body.radius` is the canonical body radius used by rendering and flight/landing calculations. Rendering may apply documented visual scale factors; collision/landing must not silently treat visual scale as physical radius.
- The player position is world-space. Scene rendering may subtract the player origin for precision/visual framing, but must not mutate catalogue/procedural world coordinates as a rendering side effect.
- Real astronomical catalogue values and simulated game-space positions must be clearly separated/documented; neither the visual system nor flight code may imply physically accurate scale or distance when the experience is intentionally compressed.

## Rendering and flight integration
- Rendering reads world data and presents it; flight logic owns movement, navigation and state transitions. Package 07 does not redesign flight state or camera controls.
- The camera is a presentation consumer of the shared player orientation/grounded state. Package 08 may refine camera behavior, but must not introduce a second world coordinate system or duplicate authoritative position.
- Body visuals, visual rings, atmospheres and label placement may use render-only multipliers. These must not be used as implicit collision geometry.
- Any landing surface or landing clearance assumption must be recorded explicitly and tested against the canonical body radius; the body renderer and flight solver must not drift independently.

## Labels and GPU resource budgets
- Labels must have bounded visibility behavior and avoid toggling at a single threshold; Package 07 uses an entry/exit hysteresis gate (72/80 world units), with a nearest-body label layer capped at 24 active labels. The cap is a bounded scene-level limit, not a measured GPU budget.
- Texture creation/disposal must remain paired. Changes to label logic must not create per-frame texture churn.
- A bounded 24-label count is implemented; broader renderer resource audit, stress profiling and physical-device GPU/memory qualification remain acceptance evidence gaps until measured.

## Package boundaries and regression obligations
- Package 07 owns visual rendering, materials, lighting, environment composition, label presentation, resource lifecycle and visual fallback.
- Package 08 owns flight controls, flight state machine, camera behavior, approach/braking, landing/takeoff and navigation/recovery.
- Package 08 must preserve the Package 07 rendering/data contract and run visual-system regression tests. Package 07 must not pre-implement the flight/camera package.
- Package 01–06 and `generatedKeys`/infinite procedural-region behavior remain protected.
- This contract must be revised only through documented audit evidence, not ad-hoc incompatible changes.
