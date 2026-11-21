# THE UNIVERSE — Gói 03 Decision Log

**Version:** 1.0
**Date:** 2026-11-19
**Authority:** Gói 03 owner authorization; decisions are limited to the package scope.

## P03-D01 — 3D engine prototype

- **Status:** OPEN — NOT LOCKED.
- **Prototype candidate:** Three.js + React Three Fiber.
- **Alternatives to compare:** Babylon.js and PlayCanvas.
- **Reason:** The Master Spec requires real-device comparison before selecting an engine. This package supplies the first runnable candidate prototype and a structured test protocol; it does not claim a completed comparative benchmark.
- **Approval condition:** Comparable measurements and owner review across representative mobile devices.

## P03-D12 — language foundation

- **Status:** IMPLEMENTED AS PACKAGE DIRECTION; OWNER CONFIRMATION STILL OPEN.
- **Initial language:** English.
- **Additional language:** Vietnamese.
- **Persistence:** Not included; language state is in-memory only in Gói 03. Durable preferences belong to the relevant later data/account scope.

## P03-D04 — homepage art direction

- **Status:** PROVISIONAL FOR HOMEPAGE ONLY.
- **Direction:** Deep-space navy/indigo, restrained violet/cyan atmosphere, luminous Earth focal point, calm typography and minimal calls to action.
- **Boundary:** This does not approve the complete visual system or production asset library in Gói 07.

## Change record

| ID | Date | Change | Status |
|---|---|---|---|
| P03-CH-01 | 2026-11-19 | Opened Gói 03 following the owner's explicit authorization; defined homepage, language and mobile 3D prototype scope. | Authorized; implementation in progress |


## P03-CH-02 — Owner-approved integration into the unified game

- **Date:** 2026-11-20.
- **Owner decision:** All existing packages Gói 01–06 are provisionally accepted for consolidation into one game.
- **Implementation:** The R3F Earth scene is integrated into the homepage. A procedural 3D humanoid avatar uses the saved guest avatar ID and nickname, walks on the spherical Earth surface via keyboard/touch controls, and is accompanied by slow planetary rotation and an orbiting Moon.
- **D01 remains OPEN:** R3F is used for the current playable slice because the prototype and dependencies already exist; this is not a final engine lock. Babylon.js and PlayCanvas comparison on real devices remains required.
- **Verification:** GitHub Actions run 44701342791 passed 23/23 tests, ESLint, TypeScript, static build and GitHub Pages deployment. Manual browser/device review remains pending.
