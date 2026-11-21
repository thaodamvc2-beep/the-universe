# THE UNIVERSE — Gói 07 Decision Log

**Version:** 1.3  
**Date:** 2026-11-20  
**Authority:** Owner's explicit request to complete flight, interplanetary exploration, expanded destinations, infinite universe, ambient sound and multiplayer.

## P07-D01 — Keep the integrated game at the root route
- **Status:** DECIDED.
- **Decision:** Root route remains the single guest-first game; maps/catalogue/avatar editing remain supporting views linked from the game.

## P07-D02 — Six-axis movement and surface constraints
- **Status:** IMPLEMENTED IN CURRENT FLIGHT SLICE.
- **Decision:** WASD for horizontal movement, Space/C for vertical movement, Shift for boost, E for landing, pointer drag for camera look. Landing is permitted only on bodies marked landable.
- **Scientific constraint:** The Sun and gas/ice giants are not treated as solid walkable surfaces. Suitable moons are separate destinations.

## P07-D03 — Real vs fictional worlds
- **Status:** DECIDED.
- **Decision:** Preserve real astronomical catalogue/source references; procedural fictional worlds carry an explicit fictional label. Never mix them silently.

## P07-D04 — Procedural universe generation is local; no paid AI API
- **Status:** DECIDED AND IMPLEMENTED.
- **Decision:** Generate new regions, stars and fictional planets deterministically in the browser from spatial coordinates. Do not call a paid AI API, do not require an AI server endpoint, and do not show AI connection controls or warnings.
- **Reason:** The owner explicitly requested an endless procedural environment without per-visit AI API charges or external generation dependencies.
- **Classification:** Generated worlds are labelled fictional and remain separate from real astronomical data.

## P07-D05 — Multiplayer must be genuinely networked
- **Status:** BLOCKED ON REALTIME SERVICE.
- **Decision:** Use a secure WebSocket/realtime endpoint with guest identity, room presence, position updates and remote avatar rendering. No false online status.

## P07-D06 — Ambient sound
- **Status:** IMPLEMENTED AS OPTIONAL ORIGINAL SYNTHESIZED AMBIENCE.
- **Decision:** Generate a low-volume ambient drone with Web Audio after user opt-in. No copyrighted soundtrack is embedded.

## P07-D07 — Rendering engine
- **Status:** D01 FROM GÓI 03 REMAINS OPEN.
- **Decision:** Continue using the integrated React Three Fiber stack for this iteration. Do not claim final engine lock until comparative physical-device testing against Babylon.js and PlayCanvas is completed.

## Change record
| ID | Date | Change | Status |
|---|---|---|---|
| P07-CH-01 | 2026-11-20 | Owner authorized integrated spaceflight, planetary landing, expanded explored-body catalogue, infinite world generation, ambient sound and multiplayer. | Authorized |
| P07-CH-02 | 2026-11-20 | Added flight scene, movement controls, destination approach/landing, expanded astronomical targets, procedural fictional sectors and optional audio. | Core flight slice deployed; local procedural generation implemented; manual review pending; realtime backend blocked |


## Deployment update (2026-11-20)
- GitHub Actions run 44713629362 passed 30 tests, ESLint, TypeScript, static build and GitHub Pages deployment at commit `c74269965b6d22c7ddb55ff577694f8e1088f3e9`.
- This is a deployable flight slice, not final full-production art. Paid AI generation is explicitly out of scope. Networked multiplayer remains unavailable until a secure realtime backend is provisioned and tested with separate devices.


## Owner change (2026-11-20)
- Gói 07-CH-03: Remove AI-generation button, notices and API calls. Generate coordinate-seeded procedural regions locally in the browser; automatically stream nearby sectors while flying and allow manual opening of a new region. Also slow cruise speed, avoid celestial-body collisions, auto-land gently, sit when resting/stand when walking, add body labels, and light scenes from the Sun's actual world position. Status: deployed code, manual owner review pending.


## Latest deployment evidence
- Run 44713629362 deployed commit `c74269965b6d22c7ddb55ff577694f8e1088f3e9`; all 30 tests, ESLint, TypeScript, static build and GitHub Pages deployment passed.


## Owner-directed visual integration refinement (2026-11-21)
- **P07-CH-04 — Owner-authorized:** Match the supplied in-game reference through a panoramic composition while retaining the animated celestial scene, world streaming, six-axis flight and navigation. Place live location/coordinates upper-left, a camera-relative compass upper-right, movement controls lower-left and land/sit/walk/fly/menu lower-right. Remove obstructive status panels and all online/player-count UI. Keep destinations, avatar selection, language, local procedural region discovery and Earth return accessible through the menu. Increase the selected local 2D angel sprite and refine the third-person follow-camera framing; do not claim a 3D conversion. **Status:** implementation committed; CI and Pages deployment evidence pending.
