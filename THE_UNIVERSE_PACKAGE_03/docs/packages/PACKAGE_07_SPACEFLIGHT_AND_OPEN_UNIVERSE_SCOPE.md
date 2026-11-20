# THE UNIVERSE — Gói 07: Spaceflight & Open Universe

**Version:** 1.3  
**Date:** 2026-11-20  
**Status:** CORE FLIGHT SLICE DEPLOYED — LOCAL PROCEDURAL GENERATION; AI API OUT OF SCOPE; MULTIPLAYER BACKEND BLOCKED  
**Owner authorization:** Explicit request on 2026-11-20 to complete six-axis avatar flight, interplanetary travel/landing, expanded explored-body catalogue, infinite universe generation, ambient audio and multiplayer, then integrate as one web game.

## 1. Product outcome

The root route remains a single guest-first game. Existing six avatar IDs and saved guest nickname are preserved. The avatar must depart Earth, fly in six degrees of freedom, navigate to destinations, approach and land on supported solid bodies, and return home. The universe must distinguish real astronomical destinations from fictional generated systems.

## 2. Implemented in the current source slice

- Replaced walk-only Earth movement with a 3D flight scene using the existing React Three Fiber/Three.js stack.
- Six-axis controls: forward/back, strafe left/right, ascend/descend; boost; pointer camera look; keyboard and touch controls.
- Takeoff from a landed body, approach/auto-navigation to selected destinations, and manual landing within range.
- Preserved the six existing guest avatar IDs and nickname in the game HUD and procedural 3D avatar suit palette.
- Expanded destinations to the eight planets, Earth's Moon, selected major moons, dwarf planets, asteroids and comets explored by spacecraft.
- Gas/ice giants and the Sun are observation destinations, not walkable landing surfaces.
- Procedural fictional sectors are generated automatically in the browser from spatial coordinates as the player flies into new regions; a manual control opens another region nearby. No paid AI API or external generation service is called.
- Travel speed is deliberately slow for observation, with collision-aware steering around celestial bodies.
- Arrival at a landable body triggers a gentle landing; the avatar rests seated when idle and stands to walk over the curved surface.
- Planet and moon names are rendered as readable labels. Sunlight is calculated from the Sun's world position and camera orientation follows the player's local surface normal, producing different views from Earth and the Moon.
- Solar-system distances are compressed for a legible panoramic game view; this is an artistic navigation scale, not a to-scale ephemeris.
- Original ambient drone generated with Web Audio; user-controlled on/off.
- Optional WebSocket realtime client contract remains available for a future multiplayer service; no AI world-generation endpoint is used.

## 3. Not yet delivered / external dependencies

### 3.1 Paid AI world generation — OUT OF SCOPE
The owner explicitly rejected paid AI API calls for environment generation. The shipped game uses deterministic, coordinate-seeded procedural generation entirely in the browser. It requires no AI provider, API key, server endpoint or network connection. Generated bodies remain clearly classified as fictional and are not mixed with real astronomical catalogue entries.

### 3.2 Online multiplayer — BLOCKED
NEXT_PUBLIC_UNIVERSE_REALTIME_URL must point to a secure WebSocket/realtime server. The current UI reports disconnected until this endpoint is configured. The client protocol expects join, state, and players messages; no global online presence is claimed without a working server.

Server requirements: stable guest IDs, per-room presence, schema validation, rate limits, disconnect cleanup, server-side bounds validation, abuse controls and no public exposure of secrets.

### 3.3 Full production visuals — IN PROGRESS
Current destination spheres and avatar are procedural geometry. They are functional placeholders, not final high-resolution terrain, rigged character animation, volumetric nebulae or photorealistic planetary surface assets. Real bodies with no solid surface must not be shown as walkable.

### 3.4 Device qualification — PENDING
Owner reported the previous build works similarly on desktop and mobile. This new flight build still requires manual desktop/mobile review after deployment, especially touch-look, WebGL memory, keyboard focus and long-distance travel.

## 4. Controls

| Input | Action |
|---|---|
| W / S | Forward / backward |
| A / D | Strafe left / right |
| Space / C | Ascend / descend; Space also takes off from a surface |
| Shift | Boost |
| E | Land when close to a landable body |
| Drag | Look around |
| Destination panel | Select a body and fly toward it |
| Return to Earth | Reset to the home world |

## 5. Acceptance criteria

- Root route opens directly into the integrated game.
- Guest nickname and selected avatar remain intact.
- All six movement axes work on desktop; touch controls work on mobile.
- A player can take off from Earth, fly through space, reach another destination, and land on a landable body.
- The Sun and gas/ice giants are orbit/observation destinations, not solid landing surfaces.
- Return to Earth always restores the home spawn.
- Every real destination has a source URL and real classification; every invented world is explicitly fictional.
- Ambient sound is opt-in and can be disabled.
- New regions are generated locally from coordinates without paid AI APIs or external calls; generated worlds remain classified as fictional.
- Multiplayer is accepted only after two separate devices can see each other's live avatar position and nickname in the same room.
- CI tests, ESLint, TypeScript and static production build pass; manual owner review is still required.

## 6. Current truthfulness rule

Procedural generation is the intentional production choice for infinite exploration; do not add paid AI calls or AI-connection warnings. A configured WebSocket endpoint is not multiplayer until it is live and tested with two devices.


## 7. Deployment evidence update (2026-11-20)

GitHub Actions run 44713629362 completed successfully for commit `c74269965b6d22c7ddb55ff577694f8e1088f3e9`: 30 automated tests, ESLint, TypeScript, static production build and GitHub Pages deployment all passed. This is the latest code revision, including the correction that keeps the rendered Moon at the same coordinates used by flight and landing physics. This verifies compilation and deployment, not live visual or two-device multiplayer testing. Manual review of the new flight/landing behavior remains pending. Paid AI generation is intentionally excluded; real networked multiplayer still requires a realtime WebSocket service.
