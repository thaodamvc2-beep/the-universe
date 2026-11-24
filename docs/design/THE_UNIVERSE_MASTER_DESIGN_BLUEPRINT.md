# THE UNIVERSE — MASTER DESIGN BLUEPRINT

**Document ID:** TU-DESIGN-BLUEPRINT-001  
**Version:** 1.0-draft  
**Date:** 2026-11-24  
**Status:** DRAFT — FOR OWNER REVIEW; NOT AN APPROVED CHANGE TO THE PRODUCT BASELINE  
**Audit baseline:** GitHub repository `thaodamvc2-beep/the-universe`, branch `main`, as inspected 2026-11-24  
**Purpose:** Consolidate the owner-approved product intent, compare it with repository evidence, expose gaps/conflicts, and define a safe decision point before any implementation changes.

> This document is an audit and design map. It does not authorize code changes, production deployment, a new feature, a technology migration, or acceptance of any package. GitHub Pages remains the official website. Vercel is intended to be an isolated preview environment only. No production files or deployment settings are changed by this document.

## 1. How to read status

| Status | Meaning |
|---|---|
| **ĐÃ CÓ — hồ sơ/mã nguồn có dấu vết** | The repository contains documentation or code indicating the capability exists. This does not automatically mean the live behavior is correct or accepted. |
| **THIẾU** | Required capability, evidence, implementation, or documentation is absent or incomplete. |
| **ĐANG LỖI / CẦN XÁC MINH** | A defect has been reported, evidence conflicts, or the implementation has not been verified sufficiently. |
| **CHƯA ĐƯỢC PHÉP TRIỂN KHAI** | The item is outside current authorization, gated by an unresolved decision, or requires separate owner approval. |
| **MÂU THUẪN HỒ SƠ** | Two repository documents make incompatible claims. This must be resolved before an agent relies on either claim. |

Evidence is deliberately separated into (a) owner direction recorded in the project documents, (b) code/configuration found on `main`, (c) automated CI evidence recorded in documents, and (d) manual browser/device acceptance. One type of evidence must not be presented as another.

## 2. Product definition — the intended experience

THE UNIVERSE is a calm, mysterious, contemplative 3D universe-exploration website/game. It is not a combat game, competitive game, mission/achievement game, or social network.

### Six product pillars

1. **EARTH IS HOME** — Earth is the default spawn and primary return destination.
2. **FREE FLIGHT** — The avatar can move freely in six axes without requiring a spacecraft.
3. **INFINITE EXPLORATION** — Explore real astronomical destinations and clearly labelled fictional/procedural worlds.
4. **SPIRITUAL ATMOSPHERE** — A peaceful, mysterious, reflective visual/audio identity without imposing religion or making supernatural, medical, or healing claims.
5. **REST & WISHES** — The avatar can sit/rest; wishes are private by default and only become visible after an explicit release/share action.
6. **QUIET SHARED PRESENCE** — Nearby real users may appear as avatar + nickname only, without social-network features.

### Non-negotiable product rules

- Guest-first: visitors can begin exploring without mandatory registration.
- Earth remains the home world. Preserve both **RETURN TO EARTH** and **FIND MY WAY BACK**.
- No spacecraft requirement for flight.
- No combat, weapons, competition, leaderboards, missions, chat, DM, friend/follow systems, player directory/count, invitations, comments, public social profiles, or equivalent social mechanics.
- In a future shared planet room, maximum three real users; a fourth must be allocated to a separate room on the same planet. Do not show room/player counts.
- Only avatar and nickname may identify another real player in the shared space.
- Wishes remain private unless the owner deliberately releases them into space as visible, softly glowing, drifting objects.
- Real astronomical objects and fictional/procedural content must remain clearly distinguished.
- No paid AI API or remote AI world-generation call. Fictional regions are generated locally and deterministically from spatial coordinates.
- Mobile-first is a binding product and engineering constraint.
- Asset provenance and license checks are required before release.

## 3. Player journey and core experience

| Journey stage | Intended behavior | Audit status |
|---|---|---|
| Open website | Root route opens directly into the integrated game; no forced registration | **ĐÃ CÓ theo hồ sơ G07**; verify actual preview/browser |
| Guest identity | Automatically assign an avatar and nickname; allow changes; persist locally | **ĐÃ CÓ theo P04**; manual browser/storage edge review pending |
| Start at Earth | Spawn at Earth; selected avatar is visible in the main game | **ĐÃ CÓ theo Master Spec change history**; visual acceptance not established here |
| Explore locally | Walk, look around, stand/sit/rest where supported | **ĐÃ CÓ theo G07 scope**; current live behavior needs browser verification |
| Take off and fly | Six-axis free flight, hover, boost, view-relative steering | **ĐÃ CÓ in documented G07 slice**; owner has reported a regression with directional controls during continuous flight |
| Choose destination | Discover/select real celestial bodies and navigate toward them | **ĐÃ CÓ in G05/G06/G07 records**; confirm current UI and actual navigation |
| Approach and land | Stable approach and landing on supported worlds; no avatar/planet/camera jump | **ĐANG LỖI / CẦN XÁC MINH**; repeated landing and intermittent camera/position failures were reported |
| Explore after landing | Walk and sit normally on the destination surface/experience | **CẦN XÁC MINH**; landing regressions must not break this |
| Fly again/re-land | Repeat flight → landing → flight → landing many times | **CHƯA ĐƯỢC NGHIỆM THU**; critical regression test |
| Return home | Return to Earth and recover orientation at any time | **ĐÃ CÓ theo tài liệu và G07 scope**; manual test pending |
| Rest and wishes | Sit/rest; private wish; deliberate release for sharing | Rest is documented in G07; full wish flow is **THIẾU / CHƯA ĐƯỢC PHÉP TRIỂN KHAI nếu chưa có G11 authorization** |
| Shared presence | See nearby avatars/nicknames only; room cap enforced | **THIẾU**: realtime service is explicitly blocked; no live multiplayer claim |
| Optional account | Optional sign-in and safe guest-data merge | **CHƯA ĐƯỢC PHÉP TRIỂN KHAI** until G13 is separately authorized and designed |

## 4. Product design and interface requirements

### Main game composition

The current owner-directed G07 visual refinement records the following main-game composition:

- Immersive panoramic 3D scene remains the dominant area.
- Live location/coordinates appear at upper-left.
- Camera-relative compass appears at upper-right.
- Movement controls appear at lower-left.
- Compact action dock appears at lower-right for relevant actions such as land, sit, walk, and fly.
- Menu retains access to destinations, avatar selection, language, local procedural region discovery, and Earth return.
- Obstructive status panels and all online/player-count UI are removed.
- The selected avatar presentation and camera framing must remain consistent with the approved visual reference.
- Desktop and mobile must both preserve the scene and essential controls without overlap or hidden navigation.

**Status:** These are recorded as owner-directed design decisions in `docs/decisions/P07-DECISION-LOG.md` (P07-CH-04). This audit did not capture or compare live screenshots on desktop and mobile; visual conformity is therefore **CẦN XÁC MINH**, not accepted.

### UI invariants

- Do not redesign unrelated UI while fixing flight, landing, rendering, or memory defects.
- Do not enlarge or shrink the avatar, replace its art, or change its presentation without explicit approval.
- Preserve compact placement of return-home and feedback controls on mobile as previously directed.
- Keep touch controls reachable and avoid blocking the main scene.
- Language choice: English default and Vietnamese option are recorded as implemented in earlier package documentation; persistence and exact current behavior require verification.
- Do not introduce online status/player count indicators while multiplayer is unavailable.

## 5. Universe, celestial data, and world rules

### Universe hierarchy

`Universe → Galaxy → Solar System → Earth / other celestial bodies`

Earth must always be discoverable and reachable. Map scale may be artistically compressed for legibility, but the interface must not imply that the display is a scientifically to-scale ephemeris unless it is one.

### Content classification

Every destination must be explicitly classified as one of:

- `REAL_ASTRONOMICAL`
- `FICTIONAL`
- `PROCEDURAL_FICTION`
- `INSPIRED_BY_REAL_OBJECT`

Real astronomical descriptions require credible source references. Fictional worlds must not be presented as established astronomy.

### Landing and exploration suitability

The approved G07 scope says only supported landable bodies can be landed on; gas/ice giants and the Sun are observation destinations. However, the owner has subsequently clarified a product-specific creative rule: **all fictional planets, including fictional water planets, must permit landing regardless of realistic physical constraints**. This rule must be treated as an owner-directed acceptance requirement for fictional planets; it does not silently change the classification or physical treatment of real astronomical objects.

Landing acceptance must include:
- The planet remains visually stable while the avatar visibly descends to its surface.
- The landing must not unpredictably throw the avatar off-screen.
- Camera/player reference frames remain coherent through approach, touchdown, and control handoff.
- Repeated landings on the same or different worlds do not reuse stale camera anchors or stale positions.
- After touchdown, walking and sitting work normally.
- The player can take off and land repeatedly without accumulated drift, snap, jitter, or loss of view.
- Desktop and mobile behavior both require verification.

### Procedural universe

- Generate local fictional regions deterministically from spatial coordinates.
- Do not use paid AI APIs or require AI-provider credentials.
- Stream nearby regions; do not load an unbounded universe at once.
- Preserve generation seed/version where needed for reproducibility.
- Release distant resources safely and keep the current valid sector until a replacement loads.
- On load failure, invalid position, or interrupted session, recover to a valid checkpoint/safe fallback.

## 6. Technical architecture — documented target versus current repository

### Current code/configuration evidence found on `main`

| Area | Evidence observed | Assessment |
|---|---|---|
| Web framework | Root `package.json` and `apps/web/package.json` use Next.js 15, React 19, TypeScript | **ĐÃ CÓ** |
| 3D runtime | Dependencies include `three` and `@react-three/fiber` | **ĐÃ CÓ**, but engine decision D01 remains open |
| Workspace | npm workspaces currently list only `apps/web` | **ĐÃ CÓ** as a single web workspace |
| Root page | `apps/web/src/app/page.tsx` renders `UniverseGame` from `@/features/game/universe-game` | **ĐÃ CÓ** |
| Static export | `apps/web/next.config.ts` has `output: 'export'`, `trailingSlash: true`, default `basePath: '/the-universe'` | **ĐÃ CÓ** for GitHub Pages configuration |
| Vercel-specific base path | The current `main` config does not contain the previously discussed `process.env.VERCEL ? '' : ...` conditional | **THIẾU on main**; preview deployment must be separately configured/tested on a non-production branch |
| Modular packages | Proposed architecture lists many packages, but workspace currently declares only `apps/web` | **THIẾU as separate workspaces**; do not split packages without an approved refactor plan |
| Realtime server | G07 scope says a client adapter exists but requires a secure WebSocket endpoint | **THIẾU / BLOCKED** |
| Database/auth | Supabase/PostgreSQL direction is recorded, but provisioning and auth are deferred | **CHƯA ĐƯỢC PHÉP TRIỂN KHAI** before G13 authorization |
| Asset governance | Master Spec and AGENTS require asset provenance/license records | **THIẾU** if a complete asset registry/evidence set is not present; audit required |
| Test scripts | Root scripts expose lint, typecheck, node tests, build/check | **ĐÃ CÓ** as scripts; no fresh execution was performed for this document |
| Mobile/device qualification | Package docs repeatedly state manual device review is pending | **THIẾU evidence** |
| GPU/memory lifecycle | User has reported a WebGL/graphics-memory failure on the prior preview | **ĐANG LỖI / CẦN XÁC MINH**; do not mask by arbitrarily reducing quality |

### Proposed logical boundaries (not a mandate to create packages now)

1. App shell and responsive UI.
2. 3D runtime lifecycle and resource management.
3. Universe/world generation and sector streaming.
4. Celestial catalogue and classification.
5. Map, navigation, Earth return and checkpoints.
6. Flight state machine and movement input.
7. Camera and landing/handoff behavior.
8. Avatar appearance, identity and guest persistence.
9. Rest and wish experience.
10. Audio.
11. Realtime room service (future authorized package).
12. Asset registry, license provenance, observability and deployment.

These are responsibility boundaries for reasoning and testing. They do not authorize restructuring the current application into a monorepo of packages.

## 7. Package roadmap and authorization map

The Master Spec defines a 15-package roadmap. The currently available package records and change history do not establish all later package scope documents. A missing scope file is not permission to invent one.

| Package | Documented purpose | Current evidence/status | Authorization gate |
|---|---|---|---|
| 01 | Analysis & Architecture | Master baseline v1.1 recorded approved by owner | Baseline |
| 02 | Website Foundation | Scope v1.2; provisionally accepted for integration, legacy technical gaps remain | Existing baseline; gaps remain |
| 03 | Homepage & Language / mobile 3D prototype | Scope v1.3; provisionally accepted for integrated baseline; device review and D01 open | Existing baseline; D01 not closed |
| 04 | Avatar & Nickname | Scope v1.4; provisionally accepted for integration; manual review pending | Existing baseline |
| 05 | Celestial Data | Scope v1.2; provisionally accepted with corrections allowed | Existing baseline |
| 06 | Cosmic Travel Map | Scope v1.3; provisionally accepted for integration; visual review pending | Existing baseline |
| 07 | Spaceflight & Open Universe | Scope v1.3 and decision log; explicitly authorized and implemented as a core slice; manual review pending | Authorized; current task limited to reported flight/landing defects and requested documentation |
| 08 | Free Flight & Camera (roadmap name) | No package 08 scope file found at expected path during this audit | **CHƯA ĐƯỢC PHÉP TRIỂN KHAI as a new package**; avoid confusing roadmap label with already implemented G07 flight slice |
| 09 | Mobile Experience | No package 09 scope file found at expected path | **CHƯA ĐƯỢC PHÉP TRIỂN KHAI** |
| 10 | AI Universe Generation | No package 10 scope file found; paid AI generation conflicts with owner direction | **CHƯA ĐƯỢC PHÉP TRIỂN KHAI**; local procedural generation remains current |
| 11 | Rest & Wishes | No package 11 scope file found | **CHƯA ĐƯỢC PHÉP TRIỂN KHAI** as a new package; preserve existing basic sit/rest behavior |
| 12 | Audio Experience | Optional synthesized ambient audio documented in G07 | Existing G07 slice; expansion requires authorization |
| 13 | Account & Data Storage | No package 13 scope file found; backend/auth deferred | **CHƯA ĐƯỢC PHÉP TRIỂN KHAI** |
| 14 | Realtime Planet Rooms | No package 14 scope file found; G07 says realtime endpoint blocked | **CHƯA ĐƯỢC PHÉP TRIỂN KHAI** |
| 15 | QA & Release | Roadmap target; no package 15 scope file found | Do not open as a new package without owner authorization |

**Important roadmap mismatch:** the Master Spec roadmap labels G07 as “3D Universe Visual System” and G08 as “Free Flight & Camera”, while the later G07 scope document is titled “Spaceflight & Open Universe” and records flight as implemented. This naming/scope drift must be reconciled in the package register. Do not renumber historical work or claim G08 is already accepted based on G07 implementation.

## 8. Current reported defects and acceptance tests

These are current defect items from owner reports and recent work context. They are not proof that the defect has been reproduced in a fresh browser session.

| ID | Reported issue / requirement | Required verification | Status |
|---|---|---|---|
| FLT-01 | Direction button/key input cancels continuous flight | Activate continuous flight; press left/right/up/down independently and in combinations; release inputs; continuous flight remains active | **ĐANG LỖI / FIX NEEDS END-TO-END VERIFICATION** |
| LND-01 | Landing intermittently shakes, jitters, shifts, or moves avatar/planet out of view | Repeated takeoff/approach/landing cycles on desktop and mobile; log player, planet, camera transforms across all phases | **ĐANG LỖI / UNVERIFIED** |
| LND-02 | Planet should remain stable while avatar visibly descends | Record visual behavior during approach and touchdown | **LOCKED ACCEPTANCE CRITERION** |
| LND-03 | Landing must never unpredictably throw avatar off-screen | Repeated landing, including same target and different targets | **LOCKED ACCEPTANCE CRITERION** |
| LND-04 | All fictional planets, including water planets, are landable | Test fictional landable metadata and landing interaction independent of realistic physics constraints | **LOCKED ACCEPTANCE CRITERION** |
| LND-05 | Walking and sitting must work normally after landing | Post-touchdown movement and sit/stand regression | **LOCKED ACCEPTANCE CRITERION** |
| LND-06 | Repeated landing must not reuse stale camera anchor/pose | Same-planet repeated landing and target-switch tests; verify anchor refresh uses live camera pose | **PATCH REPORTED ON NON-PRODUCTION BRANCH; NOT VISUALLY ACCEPTED** |
| GPU-01 | Preview showed “Cảnh 3D tạm dừng do thiết bị thiếu bộ nhớ đồ họa” | Capture console, WebGL context events, renderer.info, GPU/device profile, mount/unmount and resource lifecycle; repeat scene transitions | **ĐANG LỖI / ROOT CAUSE NOT ESTABLISHED** |
| UI-01 | Desktop and mobile must preserve avatar visibility and compact controls | Compare current main design against approved reference screenshots at representative viewports | **NEEDS VISUAL REVIEW** |
| DEP-01 | Vercel must be a genuine usable preview, separate from GitHub Pages | Verify root route, static assets, basePath, WebGL scene, input and landing in browser | **NOT YET ACCEPTED AS A WORKING PREVIEW** |
| DEP-02 | GitHub Pages remains official production | Confirm production deployment is unchanged until explicit owner approval | **LOCKED DEPLOYMENT RULE** |

### Minimum flight/landing regression sequence

1. Load the game and confirm avatar and planet render.
2. Take off from Earth.
3. Enable continuous flight.
4. Press each directional control while continuous flight remains active.
5. Press two or more directions together; confirm combined-axis steering.
6. Release all directional inputs; confirm continuous flight continues.
7. Approach a real landable body and land.
8. Confirm the planet remains visually stable and avatar descends to it.
9. Walk, stop, sit, stand, and take off again.
10. Repeat landing on the same planet several times.
11. Repeat on a different real landable body.
12. Repeat on a fictional water planet and another fictional planet.
13. Return to Earth.
14. Repeat on desktop and mobile; monitor WebGL context loss and memory growth.

No test in this list may be marked passed until the procedure has actually been executed and evidence recorded.

## 9. Deployment and source-control policy

### Production
- Official URL: `https://thaodamvc2-beep.github.io/the-universe/`
- Production source: GitHub repository branch `main`.
- Do not merge, deploy, change DNS/basePath, or alter production workflows without explicit owner permission.

### Preview
- Vercel is intended for preview/testing only.
- Use a dedicated non-production branch and verify its build configuration independently.
- Vercel preview must not automatically publish changes to GitHub Pages.
- Do not give the owner a preview URL until the actual 3D game loads and the basic flight/landing smoke tests pass.
- A deployment marked READY by the hosting provider is not sufficient evidence that the game is usable.

### Cross-conversation continuity
Keep this blueprint and a separate current-work status/handover record in the repository. At each meaningful work checkpoint, record:
- current branch and commit SHA;
- files changed;
- tests actually run and exact results;
- preview deployment URL and whether the 3D scene was actually browser-verified;
- open defects and next task;
- production status (must remain unchanged unless owner authorized release).

## 10. Repository documentation conflicts requiring reconciliation

1. **README is stale:** `README.md` still calls the repository “Gói 03 — Homepage & Language”, version 0.3.0, and describes the old `/prototype` Earth prototype as the guest entry. The Master Spec and G07 records describe an integrated root-route flight game. Update README only after this blueprint is reviewed.
2. **AGENTS.md contains stale authorization text:** its final baseline note says “Do not start Gói 07 or later without a separate authorization”, while the Master Spec change history and G07 scope/decision log explicitly record G07 as authorized and in progress on 2026-11-20. This conflict must be corrected with a traceable owner-authorized documentation change; do not silently reinterpret it.
3. **Master Spec roadmap numbering differs from later package records:** the roadmap calls G07 “3D Universe Visual System” and G08 “Free Flight & Camera”, while the actual G07 scope is “Spaceflight & Open Universe”. Reconcile labels and scope boundaries without rewriting historical approvals.
4. **Vercel basePath mismatch:** `apps/web/next.config.ts` on `main` defaults to `/the-universe` and has no Vercel-specific root-path branch. A Vercel-only adjustment was discussed on a separate branch but is not present in current `main`. Keep the production GitHub Pages path unchanged; resolve preview configuration on the preview branch only.
5. **Package scope files 08–15:** expected `docs/packages/PACKAGE_08_SCOPE_AND_ACCEPTANCE.md` through `PACKAGE_15_SCOPE_AND_ACCEPTANCE.md` were not found at those paths during this audit. The roadmap is not a substitute for package-level authorization and acceptance criteria.
6. **Architecture versus actual workspace:** the Master Spec proposes multiple apps and packages; the current npm workspace declares only `apps/web`. Treat the larger structure as a logical target, not as implemented code.

## 11. Decisions register

| Decision | Current recorded state | Action |
|---|---|---|
| D01 — 3D engine | Open; R3F is used, alternatives not compared on real devices | Do not lock or migrate engine without evidence and owner decision |
| D02 — Web/backend | Next.js + React + TypeScript direction recorded; Supabase/PostgreSQL deferred | Preserve current implementation; no backend provisioning without authorization |
| D03 — Multiplayer technology | Candidate Colyseus; realtime service not live | No multiplayer claim or deployment |
| D04 — Visual style | Mystical/cinematic direction; G07 visual refinement recorded | Preserve approved composition; verify actual screens |
| D05 — Default camera | Third-person/switchable modes proposed; exact decision remains open in Master Spec | Do not change camera design except targeted bug fix |
| D06 — Mobile controls | Touch-first; exact joystick/camera arrangement decision remains open | Preserve current approved controls; verify ergonomics |
| D07 — Gravity | Pending in Master Spec | Do not introduce physics redesign |
| D08 — Rest location by body | Pending; G07 uses supported landing/rest behavior | Keep body-specific rules explicit |
| D09 — Wish sharing | Private by default; explicit release into space directed; lifecycle details open | No public sharing/persistence implementation without package authorization |
| D10 — Avatar library | Initial six-avatar guest set recorded in P04; advanced 3D avatar library open | Preserve avatar IDs and current appearance |
| D11 — AI publication | Owner approval required; paid AI runtime generation excluded | Keep local procedural generation only |
| D12 — Languages | English default, Vietnamese option recorded | Preserve; verify persistence behavior |
| D13/D14 — Room cap/full room | Three users per room and auto-allocation are product rules; backend unavailable | No UI online status; no room implementation without authorization |

## 12. Immediate work plan after owner review

This order is proposed; it does not itself authorize product-code changes.

1. **Approve/correct this blueprint.** Owner confirms whether this is the correct overall product design and whether any requirement is missing or misstated.
2. **Reconcile documentation conflicts.** Update README, AGENTS authorization note, package roadmap labels, and session handover records in a documentation-only branch. Keep full history and approval trace.
3. **Establish a real Vercel preview.** Work only on the dedicated preview branch; solve root/basePath and deployment configuration without changing GitHub Pages production.
4. **Diagnose WebGL/GPU memory issue.** Collect actual browser/runtime evidence; inspect renderer/context lifecycle, scene remounts, textures/geometries/materials, disposal, sector streaming and duplicate canvases. Do not lower visual quality without evidence.
5. **Fix flight input regression.** Trace all keyboard/touch event paths, including manual-override events and multi-direction/pointer state. Add deterministic tests for continuous flight and combined axes.
6. **Fix landing/camera lifecycle.** Verify live camera pose and anchor refresh across approach, touchdown, handoff, takeoff and repeated landing. Keep planet transform stable while avatar visibly descends.
7. **Run preview acceptance.** Desktop and mobile browser tests; report exactly what was and was not verified.
8. **Stop for owner review.** Do not merge or deploy to official GitHub Pages until the owner explicitly approves.

## 13. Audit scope and limitations

Files read from `main` for this draft include:
- `AGENTS.md` v1.2
- `AI_SESSION_START.md` v1.0
- `README.md`
- `docs/architecture/THE_UNIVERSE_MASTER_SPEC.md` v2.9
- `docs/packages/PACKAGE_02_SCOPE_AND_ACCEPTANCE.md` v1.2
- `docs/packages/PACKAGE_03_SCOPE_AND_ACCEPTANCE.md` v1.3
- `docs/packages/PACKAGE_04_SCOPE_AND_ACCEPTANCE.md` v1.4
- `docs/packages/PACKAGE_05_SCOPE_AND_ACCEPTANCE.md` v1.2
- `docs/packages/PACKAGE_06_SCOPE_AND_ACCEPTANCE.md` v1.3
- `docs/packages/PACKAGE_07_SPACEFLIGHT_AND_OPEN_UNIVERSE_SCOPE.md` v1.3
- `docs/decisions/P07-DECISION-LOG.md` v1.3
- `docs/testing/P03_D01_MOBILE_ENGINE_EVALUATION.md`
- root and web `package.json`
- `apps/web/next.config.ts`
- `apps/web/src/app/page.tsx`

The expected package scope files for G01 and G08–G15 were not found at the expected paths. Some source-code paths previously assumed from an older folder layout returned 404; the actual root page imports `@/features/game/universe-game`. This draft therefore does not claim a complete line-by-line source audit of every feature module.

No local build, test suite, browser session, mobile device, GPU profiler, or production deployment was run or changed while preparing this document. CI results mentioned above are historical evidence recorded in repository documents, not fresh test results from this audit.

## 14. Owner review record

- Owner review status: **PENDING**
- Corrections requested:
- Approved baseline version:
- Approval date:
- Approving message/reference:

**Until this section is explicitly completed by the owner, this blueprint remains a draft and does not supersede the existing approved Master Specification or package decisions.**
