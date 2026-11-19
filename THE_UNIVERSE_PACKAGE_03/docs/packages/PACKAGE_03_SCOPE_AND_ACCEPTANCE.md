# THE UNIVERSE — PACKAGE 03 SCOPE AND ACCEPTANCE

**Document ID:** TU-PKG-03-001
**Version:** 1.2
**Date:** 2026-11-19
**Status:** READY FOR OWNER REVIEW — RUNTIME/DEVICE VERIFICATION PENDING
**Package:** 03 — Homepage & Language
**Prerequisite:** Gói 02 provisionally approved for transition by the project owner on 2026-11-19; technical verification remains open.

## 1. Authorization and purpose

The project owner explicitly authorized opening Gói 03 after provisionally approving Gói 02 so the owner can review and run the website and prototype checks together. This authorization covers the scope below only.

Gói 03 replaces the technical placeholder with a clear, visually expressive entry experience and establishes the first language foundation. It also provides a small mobile-oriented 3D prototype to collect evidence for D01. This is not the full universe, flight system, map, avatar system, or production 3D visual system.

## 2. Inputs and governing baseline

- `AGENTS.md` v1.1 — mandatory project invariants and session gate.
- `AI_SESSION_START.md` v1.0 — mandatory startup checklist.
- `docs/architecture/THE_UNIVERSE_MASTER_SPEC.md` v1.5 — approved Gói 01 baseline plus recorded Gói 02/Gói 03 authorization updates.
- `docs/packages/PACKAGE_02_SCOPE_AND_ACCEPTANCE.md` v1.1 — Gói 02 scope and verification record.
- `docs/decisions/P02-DECISION-LOG.md` v1.1 — D02 platform direction.

## 3. Objectives

1. Deliver a polished, responsive homepage that communicates the calm, mysterious, contemplative universe-exploration experience.
2. Make the first action clear and support guest exploration without mandatory registration.
3. Establish English as the default UI language and provide a Vietnamese language option, following the D12 direction recorded in the Master Spec while keeping final owner confirmation explicit.
4. Introduce an isolated, lightweight 3D planet/space prototype suitable for initial mobile browser testing.
5. Collect reproducible evidence for D01 engine selection; do not lock the 3D engine without real-device comparison.
6. Preserve all project invariants: Earth remains Home World; no social features; no false claims about real astronomy; no unlicensed assets.

## 4. In scope

- Replace the Gói 02 placeholder homepage with the Gói 03 entry experience.
- Responsive desktop/mobile layout, accessible navigation, keyboard focus, reduced-motion support and clear loading/error states.
- English/Vietnamese UI switch. English is the initial default. This package does not add account-based language preferences or backend persistence.
- Guest-first entry point; no sign-up gate or account requirement.
- A prototype route with one stylized, clearly illustrative planet, procedural star field, ambient lighting and simple pointer/touch orbit interaction.
- A bounded rendering configuration (conservative DPR, low-cost geometry/materials, no external textures/models/audio).
- A graceful fallback message when WebGL is unavailable or the prototype cannot initialize.
- A D01 evaluation protocol and evidence template covering Three.js + React Three Fiber, Babylon.js and PlayCanvas; this delivery supplies the first R3F candidate prototype. Alternative engines remain unselected until comparable real-device evidence is available.
- Unit/source tests for localization dictionaries, key UI invariants and package boundaries.
- Updated documentation, decision log, changelog and Git checkpoint.

## 5. Out of scope

- Final approval/lock-in of D01 3D engine before real-device comparison.
- Full 3D universe, production-quality celestial assets, procedural universe generation or AI publishing.
- Avatar creation, avatar library, nickname or identity persistence (Gói 04).
- Canonical celestial database (Gói 05) or full cosmic map/navigation (Gói 06).
- Final 3D visual system and production asset library (Gói 07).
- Six-axis flight, flight camera, relaxation camera, gravity, movement physics or persistent `RETURN TO EARTH` controls in an active exploration session (Gói 08 and related packages). The prototype's orbit interaction is only a test affordance, not the flight system.
- Full mobile-control system and device certification (Gói 09/Gói 15).
- AI-generated worlds, wishes, rest, audio, accounts, persistence, realtime rooms or multiplayer.
- Social features of any kind.

## 6. Product and design constraints

- Earth is the Home World and the default starting point. Do not invent another canonical home location.
- The homepage may depict Earth as the first point of entry; fictional/celestial art must be presented as illustrative, not factual astronomy.
- Guest entry must be available without account registration.
- The visual treatment is a provisional homepage direction, not final approval of D04 or the complete Gói 07 visual system.
- English is the default; Vietnamese is selectable. Language choice is in-memory for this package and is not represented as persisted account preference.
- No chat, DM, friends, follows, invitations, comments, player directory/counts, public profiles or equivalent features.
- No external images, fonts, textures, models or audio are introduced. Prototype visuals are procedural and source-authored.

## 7. Technical boundaries

- Continue the Gói 02 Next.js App Router + React + TypeScript foundation.
- Keep the 3D prototype isolated from persistence/backend code.
- Use React Three Fiber as the first prototype candidate only. D01 remains pending.
- Do not connect Supabase or create data schemas/authentication.
- Do not add external asset dependencies or fetch remote textures.
- Avoid putting 3D rendering code in the homepage shell; isolate it in prototype components.

## 8. Deliverables

- Homepage and shared site navigation.
- EN/VI localization foundation and language switch.
- `/prototype` route with procedural R3F planet scene and mobile-oriented render settings.
- WebGL fallback and reduced-motion/accessibility behavior.
- D01 engine evaluation protocol and device test record template (`docs/testing/P03_D01_MOBILE_ENGINE_EVALUATION.md`).
- Automated tests for localization and key project constraints.
- Updated README with local run and mobile LAN testing instructions.
- Updated Master Spec, Gói 02 provisional approval record, Gói 03 decision log and this scope/acceptance document.

## 9. Acceptance criteria

| ID | Criterion | Evidence required |
|---|---|---|
| P03-AC-01 | Homepage clearly communicates THE UNIVERSE and its quiet exploration identity | Desktop/mobile browser review |
| P03-AC-02 | Homepage is responsive and usable at phone widths | Browser/device screenshots and interaction check |
| P03-AC-03 | English is the default and Vietnamese can be selected | UI interaction and localization tests |
| P03-AC-04 | Guest entry is available without mandatory registration | UI and route review |
| P03-AC-05 | Prototype renders a procedural 3D celestial scene without external media assets | Browser runtime review |
| P03-AC-06 | Prototype supports simple pointer/touch orbit interaction without claiming to implement free flight | Browser/device interaction review |
| P03-AC-07 | Prototype has a graceful WebGL/runtime fallback | Forced-failure or unsupported-browser check |
| P03-AC-08 | Rendering configuration is conservative for mobile and documents its limits | Source review and device measurements |
| P03-AC-09 | D01 evaluation protocol compares candidate engines and records real-device evidence; no premature lock-in | Evaluation report; owner review |
| P03-AC-10 | No social features, account gate, avatar, map, flight, AI, wish or realtime systems are introduced | Source/scope review and regression tests |
| P03-AC-11 | No unlicensed external assets are introduced | Asset/source review |
| P03-AC-12 | Lint, typecheck, tests and production build pass | Actual command output |

## 10. D01 engine evaluation protocol

The first runnable prototype uses Three.js + React Three Fiber. This is a candidate, not a final selection. The owner should run equivalent representative scenes on at least one low-end Android, one mid-range Android and one iPhone where available. Record device model, OS/browser, viewport, network, median frame rate/frame-time, memory/GPU observations, initial load, touch ergonomics, thermal behavior and recovery.

Compare at minimum:
- Three.js + React Three Fiber (prototype supplied in this package).
- Babylon.js.
- PlayCanvas.

A final D01 recommendation must consider rendering performance, touch ergonomics, asset loading, memory, recovery, accessibility/integration, developer workflow and long-term maintainability. If comparable alternatives are not yet implemented or measured, D01 remains pending and no engine lock is claimed.

## 11. Test plan

```bash
npm install
npm run lint
npm run typecheck
npm test
npm run build
npm run dev --workspace @the-universe/web -- --hostname 0.0.0.0
```

Open the local URL on desktop and, using the computer's LAN IP on the same Wi-Fi, on a phone. Test homepage, language switch, guest preview navigation, prototype load, drag/orbit, orientation changes, background/foreground recovery and reduced-motion preference.

## 12. Actual verification record

Environment: Node.js v22.16.0, npm 10.9.2.

| Check | Result | Notes |
|---|---|---|
| `node --test tests/*.test.mjs` | PASS | 10 tests passed, 0 failed. |
| `npm test` | PASS | 10 tests passed, 0 failed. |
| `git diff --check` | PASS | No whitespace errors after cleanup. |
| `npm install --ignore-scripts --no-audit --no-fund` | BLOCKED | Timed out; npm registry DNS lookup returned `EAI_AGAIN`. No `node_modules` or lockfile created. |
| `npm run lint` | NOT RUN | Requires dependencies, which could not be installed. |
| `npm run typecheck` | BLOCKED | Direct global `tsc` attempt reports missing Next.js/React/Three/R3F type packages because dependencies are absent; this is not a passing typecheck. |
| `npm run build` | NOT RUN | Next.js dependency unavailable. |
| Browser and real-device checks | NOT RUN | Requires a successful install and running application on physical devices. |
| D01 comparison (Babylon.js / PlayCanvas) | NOT RUN | Only the first R3F candidate prototype is included. |

No runtime, visual, FPS, memory, thermal or device result is claimed from source-level tests.

## 13. Acceptance status

Gói 03 is ready for owner review, but is not accepted. The owner can review the source and run the delivered checks once npm registry access is available. Real-device evidence remains necessary for D01; no engine has been selected. The package remains subject to owner acceptance after runtime and device review.
