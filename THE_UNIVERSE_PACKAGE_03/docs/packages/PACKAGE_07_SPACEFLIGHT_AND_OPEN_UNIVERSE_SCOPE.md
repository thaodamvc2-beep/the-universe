# THE UNIVERSE — Gói 07: Spaceflight & Open Universe

**Version:** 1.1  
**Date:** 2026-11-20  
**Status:** CORE FLIGHT SLICE DEPLOYED — MANUAL REVIEW PENDING; AI AND ONLINE MULTIPLAYER BACKEND BLOCKED  
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
- Procedural fictional sectors can be opened repeatedly; they are explicitly labelled fictional and not confused with real astronomical data.
- Original ambient drone generated with Web Audio; user-controlled on/off.
- Optional AI endpoint and WebSocket realtime client contracts are scaffolded through public endpoint variables; no API keys are embedded in browser code.

## 3. Not yet delivered / external dependencies

### 3.1 Real AI universe generation — BLOCKED
NEXT_PUBLIC_UNIVERSE_AI_ENDPOINT must point to a secure server-side generation service. The static GitHub Pages client must never hold an AI provider secret. The current local procedural sector generator is deterministic algorithmic content, not language-model AI and must not be represented as AI-generated.

The server endpoint must return validated world records, source/classification labels, bounded geometry values and moderation status. Only records explicitly classified as fictional may enter the fictional universe collection.

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
- AI generation is accepted only after a real server-side model call returns valid moderated fictional worlds.
- Multiplayer is accepted only after two separate devices can see each other's live avatar position and nickname in the same room.
- CI tests, ESLint, TypeScript and static production build pass; manual owner review is still required.

## 6. Current truthfulness rule

A procedural world is not AI. A configured WebSocket endpoint is not multiplayer until it is live and tested with two devices. Do not mark this package complete while either service is unavailable.


## 7. Deployment evidence update (2026-11-20)

GitHub Actions run 44706387131 completed successfully for commit `f694462c4a5f191b1dec8c3c42cbacf2f6e1df20`: 23 automated tests, ESLint, TypeScript, static production build and GitHub Pages deployment all passed. This verifies compilation and deployment, not live visual or two-device multiplayer testing. The AI generation endpoint and realtime WebSocket endpoint are not provisioned; those features remain blocked.
