# THE UNIVERSE — 15-Package Status Register

**Last audited:** 2026-11-24  
**Repository:** `thaodamvc2-beep/the-universe`  
**Baseline branch:** `main`  
**Baseline commit at audit:** `2a7c48e9e176aea7da3cb70439bd7e7ccee2e2ca`  
**Authority:** `docs/architecture/THE_UNIVERSE_MASTER_SPEC.md` (Version 2.9) and package scope/decision records.

This is a tracking aid, not a replacement for the Master Specification or package acceptance records. “Implemented”, “deployed”, “provisionally accepted”, and “accepted” are different states. A passing CI build is not proof of visual/device acceptance.

## 1. Canonical 15-package roadmap

| No. | Package | Current status at audit | Remaining gate / truth |
|---:|---|---|---|
| 01 | Analysis & Architecture | **APPROVED** | Gói 01 Version 1.1 was explicitly approved by the owner on 2026-11-19. Individual decisions D01–D14 retain their own statuses. |
| 02 | Website Foundation | **PROVISIONALLY ACCEPTED — TECHNICAL GAPS OPEN** | Owner provisionally accepted the integrated foundation. Legacy dependency/lint/typecheck/build/browser/device and HTTP-header verification gaps must not be silently marked closed. |
| 03 | Homepage & Language | **PROVISIONALLY ACCEPTED — DEVICE QUALIFICATION / D01 OPEN** | Guest-first homepage and language foundation are integrated. D01 (3D engine choice) remains open pending comparative real-device evaluation. |
| 04 | Avatar & Nickname | **IMPLEMENTED + DEPLOYED; OWNER REVIEW PARTLY OPEN** | Guest avatar/nickname, six original cute human avatar portraits, homepage identity display and local persistence are implemented. Visual/device review and persistence edge cases remain to be checked. Real sign-in/cloud sync are not implemented. |
| 05 | Celestial Data | **IMPLEMENTED + DEPLOYED; PROVISIONALLY ACCEPTED** | Canonical Solar System catalogue, real/fictional classification and bilingual detail UI are integrated. Owner allowed corrections; manual browser/device review remains pending. |
| 06 | Cosmic Travel Map | **IMPLEMENTED + DEPLOYED; PROVISIONALLY ACCEPTED FOR INTEGRATION** | Solar System map at `/map/`, catalogue at `/worlds/`, and Earth recovery/navigation are integrated. Route preview is simulated, not a verified live route service. Manual visual/device review remains open. |
| 07 | 3D Universe Visual System | **NUMBERING / SCOPE RECORD CONFLICT — SEE NOTE BELOW** | The current package scope file is named “Gói 07: Spaceflight & Open Universe” and records six-axis flight, landing, local procedural sectors and optional ambience as implemented/in progress. The Master Spec roadmap table, however, labels package 07 “3D Universe Visual System”. Do not silently choose one numbering interpretation. |
| 08 | Free Flight & Camera | **NOT FORMALLY STARTED AS A SEPARATE ROADMAP PACKAGE / NUMBERING CONFLICT** | The actual flight implementation and camera fixes are already in the codebase under the Gói 07 Spaceflight scope. The Master Spec roadmap labels this work Gói 08. Reconcile the package numbering before opening/closing package records. |
| 09 | Mobile Experience | **NOT ACCEPTED / DEVICE QUALIFICATION OPEN** | Mobile controls exist in the current game, but comprehensive device performance, memory, thermal, recovery and real-device qualification have not been evidenced. |
| 10 | AI Universe Generation | **PAID AI API GENERATION EXPLICITLY OUT OF SCOPE** | Owner chose local coordinate-seeded procedural generation instead. Do not add paid AI API calls or treat procedural generation as an AI service. Any alternative AI use requires separate approval. |
| 11 | Rest & Wish System | **PARTLY IMPLEMENTED IN CLIENT; PACKAGE ACCEPTANCE NOT RECORDED** | Sitting/resting and wish-related prototype/UI elements exist in project history/current experience. Privacy-by-default, explicit sharing, persistence, moderation and lifecycle must be verified before calling the package complete. |
| 12 | Audio Experience | **BASIC AMBIENCE IMPLEMENTED; PACKAGE ACCEPTANCE NOT RECORDED** | Optional synthesized ambient audio exists. Full environmental/spatial audio behavior and controls are not evidenced as complete. |
| 13 | Account & Data Storage | **NOT COMPLETE** | Guest avatar/nickname persistence is local-device only. Real authentication, cloud profile/storage, guest-to-account merge and recovery are not implemented/verified. |
| 14 | Realtime Planet Rooms | **BLOCKED / NOT LIVE** | A client adapter/contract exists, but no secure realtime WebSocket server is provisioned. No real multiplayer presence or authoritative max-three room enforcement may be claimed. |
| 15 | Quality Assurance & Release | **ONGOING; NOT ACCEPTED** | Automated CI, lint, typecheck and static build have passed for recorded commits. Full browser/device, performance, security, multiplayer and release-handover evidence remains incomplete. |

## 2. Landing-camera correction currently under review

- PR #9: https://github.com/thaodamvc2-beep/the-universe/pull/9
- Branch: `fix/visible-avatar-landing`
- Commit: `f6b49b916a08e5cddf1d04caa0da205ced6b20ff`
- Status at audit: **OPEN DRAFT; NOT MERGED TO main; NOT ON PUBLIC GITHUB PAGES**.
- Automated GitHub Actions run 45184677251 completed successfully for the PR commit.
- The PR changes only the flight scene, landing-camera helper/type declaration and focused regression tests.
- The public GitHub Pages URL is `https://thaodamvc2-beep.github.io/the-universe/`. It is built from the deployed branch, not from an open PR branch. Therefore it must not be assumed to contain PR #9.
- Direct live-page retrieval from the audit environment was unavailable. Do not claim the public URL was visually/browser-tested by the assistant.
- Publishing this exact PR build to the public GitHub Pages URL requires merging the PR to `main` and confirming the Pages deployment succeeds. Do not merge/deploy without explicit authorization.

## 3. Historical prototype work — do not double-count

An earlier 10-step MVP/prototype plan predates the current 15-package roadmap. Its frontend prototype included a welcome scene, night prairie, eight avatar choices, anonymous nickname, keyboard/mobile movement, fire on/off, quartz messages, wishes and a donate UI.

These were prototype/UI features, not proof that the corresponding production systems were complete. In particular:
- A donate UI is not a payment integration.
- A wishes UI is not proof of private-by-default storage/sharing governance.
- An avatar picker and nickname are not real account authentication or cloud sync.
- A mobile control UI is not mobile performance/device qualification.
- A multiplayer-looking UI or client adapter is not live multiplayer.

Map prior work into the current 15-package records; never restart or count the same delivered feature as new work merely because the older plan used different step numbers.

## 4. Non-negotiable tracking rules

1. Keep the 15 package names and canonical order above unless the owner explicitly approves a change.
2. Before starting a task, check this register, the Master Spec, the relevant package scope and decision log, and the current Git diff.
3. Record the exact package(s) a change belongs to; a single feature may satisfy part of more than one package, but that does not automatically close either package.
4. Mark a package accepted only with explicit owner acceptance and its required evidence.
5. Separate code implementation, CI pass, deployment, manual desktop review, manual mobile review and owner acceptance.
6. Do not start packages 08+ merely because related code exists; first resolve the Gói 07/Gói 08 numbering conflict and obtain the required authorization.
7. Preserve protected artwork, avatar scale, interface, controls, content, and previously accepted behavior unless the owner explicitly requests a change.
