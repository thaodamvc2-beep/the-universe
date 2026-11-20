# THE UNIVERSE — Multiplayer Backend Contract

**Version:** 1.1  
**Status:** Multiplayer interface contract only; no live realtime endpoint has been provisioned.

The public website remains a static GitHub Pages export. The current universe and fictional world generation run locally in the browser using deterministic procedural algorithms. No AI provider endpoint, API key, paid generation service or AI-connection UI is used for exploration.

## Realtime multiplayer WebSocket endpoint

Environment variable: NEXT_PUBLIC_UNIVERSE_REALTIME_URL

Client messages:
- join: guest ID, nickname and avatar ID
- state: guest ID, nickname, avatar ID and world position

Server broadcast:
- players: array of players with ID, nickname, avatar ID and 3D position

Server responsibilities: validate every field, cap movement speed and coordinate ranges, assign planet rooms, enforce a maximum of three real users per planet room, rate-limit state updates, remove disconnected clients, prevent spoofing other player IDs, and keep presence data ephemeral unless persistence is explicitly approved. Do not expose player lists, counts, chat, friends, invitations or public profiles; only nearby avatar and nickname may be rendered in the shared world.

## Hosting constraint

GitHub Pages cannot host a WebSocket service. Keep the game client static and connect it to a separately provisioned secure realtime service only when multiplayer is explicitly implemented and tested. Never represent a disconnected client adapter as live multiplayer.
