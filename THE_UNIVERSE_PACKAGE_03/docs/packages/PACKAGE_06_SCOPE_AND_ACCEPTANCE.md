# THE UNIVERSE — PACKAGE 06 SCOPE & ACCEPTANCE

**Document ID:** TU-PKG-06-001  
**Version:** 1.0  
**Date:** 2026-11-20  
**Status:** AUTHORIZED — BLOCKED ON GÓI 05 ACCEPTANCE  
**Package:** 06 — Cosmic Travel Map  
**Authority:** Owner explicitly approved Gói 06 as the next package after Gói 05 on 2026-11-20.

## 1. Objective
Turn the accepted celestial catalogue into an understandable universe map, beginning with the Solar System. Help users orient themselves, select a destination, understand its relationship to Earth and return to Earth at any time.

## 2. Prerequisites
- Gói 05 must be explicitly accepted by the owner.
- Gói 05 canonical celestial IDs and classification contract are the source of truth.
- D01 3D engine remains open; map presentation must not silently lock an engine.

## 3. In scope
- Hierarchy: Universe → Milky Way → Solar System → celestial body.
- Solar System overview with Sun, eight planets and Moon.
- Clear map scale disclaimer: schematic distances/orbits are illustrative and not to scale.
- Selectable destination cards/markers linked to canonical celestial IDs.
- Destination detail and a simulated destination-selection/route-preview state.
- Persistent, discoverable RETURN TO EARTH action and FIND MY WAY BACK orientation affordance in the map experience.
- Mobile-first map navigation and accessible keyboard/touch selection.
- Recovery behavior if a selected destination is unavailable: retain the last valid selection and offer Earth as safe destination.

## 4. Out of scope
- Six-axis flight, camera physics, planetary surface exploration (Gói 08/09).
- Full production 3D universe rendering (Gói 07).
- Real-time astronomical ephemerides or physically accurate orbital simulation.
- Multiplayer, accounts, avatars, AI universe generation, or social systems.

## 5. Acceptance criteria
- All map markers resolve to canonical Gói 05 IDs.
- Earth is always visibly identified as Home World and the primary return destination.
- Selecting a body updates the destination details without implying arrival or actual flight.
- RETURN TO EARTH returns map focus to Earth.
- FIND MY WAY BACK restores Solar System/Earth orientation.
- Map is usable at phone and desktop widths.
- Real/fictional classification remains visible and unambiguous.
- Tests and production build pass; browser review completed.

## 6. Handover
This scope is authorized but implementation is gated until Gói 05 is accepted. Do not start Gói 07 or any later package automatically.
