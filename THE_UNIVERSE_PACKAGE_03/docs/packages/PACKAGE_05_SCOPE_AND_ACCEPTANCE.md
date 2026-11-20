# THE UNIVERSE — PACKAGE 05 SCOPE & ACCEPTANCE

**Document ID:** TU-PKG-05-001  
**Version:** 1.2  
**Date:** 2026-11-20  
**Status:** PROVISIONALLY ACCEPTED BY OWNER — CORRECTIONS REMAIN ALLOWED  
**Package:** 05 — Celestial Data  
**Authority:** Owner explicitly approved the sequence adjustment on 2026-11-20: defer Gói 04 and prioritize Gói 05, followed by Gói 06.

## 1. Objective
Establish the first canonical, typed celestial catalogue for the Solar System and expose it through a clear, responsive catalogue interface. Preserve the distinction between verified real astronomical bodies and future fictional/AI-created content.

## 2. Governing inputs
- AGENTS.md v1.1 and AI_SESSION_START.md v1.0.
- Master Spec v1.6, approved Gói 01 baseline with the owner-approved delivery-sequence adjustment recorded.
- Gói 02 remains provisionally approved for transition; its technical verification is still open.
- Gói 03 remains ready for owner review and is not accepted. Gói 05 is independently listed after Gói 02 in the approved dependency proposal.

## 3. In scope
- Canonical records for the Sun, eight planets, and Earth's Moon.
- Stable IDs, common names, body type, classification, mean orbital distance (AU where applicable), radius relative to Earth, atmosphere summary, factual description, exploration suitability note, and source URL.
- Explicit `REAL_ASTRONOMICAL` classification for every record in this release.
- Earth is explicitly flagged as the one and only Home World.
- Responsive bilingual catalogue view with selection and detail panel.
- Clear gas-giant/ice-giant guidance: no conventional solid walkable surface is implied.
- Source-level tests for catalogue integrity and product invariants.
- No external images, models, textures, fonts, or audio.

## 4. Out of scope
- Cosmic map, route navigation, travel/teleportation, flight and camera systems (Gói 06/08).
- Avatar and nickname systems (Gói 04, deferred).
- AI-generated fictional celestial publication or generation workflow (Gói 10).
- Final 3D engine selection (D01 remains open) or production 3D models (Gói 07).
- Accounts, database, backend, multiplayer, social features.

## 5. Data and factuality rules
- Real astronomical facts must be traceable to the linked NASA Solar System Exploration pages.
- Orbital distances are approximate mean distances in AU; values are rounded and are not navigation coordinates.
- Radius is relative to Earth's mean radius and is rounded for presentation.
- The catalogue is not a high-precision ephemeris or orbital simulator.
- Future fictional/AI-generated records must use a different classification and pass human approval before publication.

## 6. Acceptance criteria
| ID | Criterion | Evidence |
|---|---|---|
| P05-AC-01 | Sun, eight planets and Moon are present exactly once with stable IDs | Automated catalogue test |
| P05-AC-02 | All records are classified as real astronomical objects in this release | Automated catalogue test |
| P05-AC-03 | Earth is the sole Home World and is selected by default | Data and UI test/source review |
| P05-AC-04 | Every record contains body type, description, source and appropriate physical metadata | Automated schema checks |
| P05-AC-05 | Catalogue supports selection and displays a matching detail panel | Browser interaction review |
| P05-AC-06 | English and Vietnamese UI labels are available | Localization/source tests |
| P05-AC-07 | Gas/ice giants are not represented as solid walkable surfaces | Content review/test |
| P05-AC-08 | No unlicensed external assets or prohibited social features are introduced | Source review |
| P05-AC-09 | Lint, typecheck, automated tests and production build pass | Actual CI/local output |

## 7. Test plan
Run workspace commands: `npm run lint`, `npm run typecheck`, `node --test tests/package-03.test.mjs tests/celestial-catalog.test.mjs`, and `npm run build`. Browser review must test desktop and narrow mobile layouts, select all catalogue cards, verify bilingual detail updates, check source links and confirm Earth is the default.

## 8. Actual verification record

Environment: GitHub Actions, Node.js 22, npm 10.9.9.

| Check | Result | Evidence |
|---|---|---|
| Dependency installation | PASS | GitHub Actions run 44659882005 |
| Package 03 + Package 05 automated tests | PASS | 11 tests passed, 0 failed |
| ESLint | PASS | GitHub Actions run 44659882005 |
| TypeScript typecheck | PASS | GitHub Actions run 44659882005 |
| Next.js production static build | PASS | GitHub Actions run 44659882005 |
| GitHub Pages deployment | PASS | GitHub Actions run 44659882005; commit b0ba26e9af57b4e1dfc752fe40edd47340466d19 |
| Manual browser review (desktop/mobile) | NOT RUN | Owner visual review remains pending |

The full legacy `npm test` suite was attempted during verification and exposed two pre-existing Gói 02 foundation assertions: the static health route is expected to contain a dynamic `Cache-Control` header, and the static GitHub Pages host is expected to provide an HTTP `X-Content-Type-Options` header. GitHub Pages does not provide configurable response headers for static exports. These Gói 02 verification gaps remain open and are not represented as passing. The package-scoped test command is used for Gói 05 acceptance evidence.

## 9. Known limitations
- AU distances and radii are rounded reference values, not real-time positions.
- This package does not implement travel, orbit rendering, or 3D planet models.
- The full legacy `npm test` suite also runs Gói 02 foundation checks. Those currently fail on assumptions that a static GitHub Pages host can emit dynamic `Cache-Control` and HTTP security headers. Those Gói 02 limitations remain open and are not represented as passing; Gói 05 runs its package-scoped tests separately.
- Physical-device performance and Gói 03 acceptance remain separate open items.

## 10. Owner review and handover
On 2026-11-20 the owner explicitly granted provisional acceptance of Gói 05 and authorized immediate Gói 06 implementation. This is not a claim that manual browser/device review has occurred. The Gói 06 integration consumes the canonical IDs and does not require freezing the catalogue. Gói 05 remains editable: factual corrections, content improvements, accessibility fixes and integration adjustments may be made without discarding its canonical IDs or Home World invariant. Gói 06 uses the current canonical data and must not imply that the map is a physically accurate orbital simulation. Gói 04 remains implemented and available for owner review.
