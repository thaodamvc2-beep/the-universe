# THE UNIVERSE — Secure AI and Multiplayer Backend Contract

**Version:** 1.0  
**Status:** Interface contract only; no live backend endpoint has been provisioned.

The public website remains a static GitHub Pages export. It may contain public endpoint URLs, but never AI provider API keys, database service-role keys, signing secrets or privileged credentials.

## AI world-generation endpoint

Environment variable: NEXT_PUBLIC_UNIVERSE_AI_ENDPOINT

Request fields:
- language: vi or en
- theme: peaceful cosmic exploration
- seed: numeric generation seed

Expected response fields:
- message: short status message
- worlds: array of fictional world records
- each world requires stable id, name, classification FICTIONAL_AI_GENERATED, description, kind, bounded radius/color/position, landable flag and moderation status approved.

Server responsibilities: call the selected model, validate output schema and numeric bounds, moderate content, assign stable IDs, reject real astronomical misinformation and return only fictional worlds under the fictional classification. Provider credentials are server-side only.

## Realtime multiplayer WebSocket endpoint

Environment variable: NEXT_PUBLIC_UNIVERSE_REALTIME_URL

Client messages:
- join: guest ID, nickname and avatar ID
- state: guest ID, nickname, avatar ID and world position

Server broadcast:
- players: array of players with ID, nickname, avatar ID and 3D position

Server responsibilities: validate every field, cap movement speed and coordinate ranges, assign planet rooms, enforce a maximum of three real users per planet room, rate-limit state updates, remove disconnected clients, prevent spoofing other player IDs, and keep presence data ephemeral unless persistence is explicitly approved. Do not expose player lists, counts, chat, friends, invitations or public profiles; only nearby avatar and nickname may be rendered in the shared world.

## Hosting constraint

GitHub Pages cannot execute server-side API routes or host a WebSocket service. Keep the game client static and connect it to separately provisioned secure services. Do not ship a browser-only mock and label it global multiplayer or AI.
