# THE UNIVERSE — MASTER SOFTWARE SPECIFICATION

**Document ID:** TU-ARCH-MASTER-001
**Version:** 1.6
**Document date:** 2026-11-19
**Last updated:** 2026-11-20
**Status:** **APPROVED — GÓI 01 ACCEPTED BY PROJECT OWNER**
**Baseline source:** Gói 01 — Master Software Architecture, Version 1.1 (review draft)
**Authority:** Gói 01 Version 1.1 remains the owner-approved product and architecture baseline. Version 1.2 records Gói 02 authorization and delegated D02 direction. Version 1.3 records the owner’s provisional Gói 02 approval for transition and explicit Gói 03 authorization. Version 1.4 records the Gói 03 implementation handover and verification limitations. Version 1.5 aligns the Gói 03 scope references with the current governing document versions; it does not close Gói 02 technical verification or accept Gói 03. Version 1.6 records the owner-approved delivery-sequence adjustment: defer Gói 04, execute Gói 05 then Gói 06, with package acceptance gates preserved.

> **Approval record:** The project owner explicitly approved Gói 01 Version 1.1 on 2026-11-19. This establishes the Gói 01 product and architecture baseline. It does **not** automatically approve individually pending decisions (D01–D14) or validate proposed performance targets. The owner subsequently authorized Gói 02, provisionally approved it for transition, and explicitly authorized Gói 03 on 2026-11-19; see Change History 1.2–1.3 and the corresponding package records.

## 1. Purpose and scope

This document consolidates the product definition, architectural principles, domain/data model, module boundaries, technology candidates, operational constraints, risk controls, and 15-package delivery roadmap for THE UNIVERSE.

It is the central reference for work from Gói 02 through Gói 15. Each package must also maintain its own detailed scope, inputs, outputs, implementation notes, test evidence, and acceptance record.

This document does not authorize implementation of any package by itself. Work must be explicitly authorized package by package.

## 2. Product definition

THE UNIVERSE is a 3D universe-exploration experience. Its intended identity is mysterious, tranquil, contemplative, and spiritually evocative. Users explore celestial environments through free flight, observe galaxies and worlds, pause to rest, and may create symbolic wishes.

The product is not a combat game, competitive game, mission-based progression system, or social network.

### 2.1 Six product pillars

1. **EARTH IS HOME** — Earth is the default starting world and primary return destination.
2. **FREE FLIGHT** — Users move freely in six directions without requiring a spacecraft.
3. **INFINITE EXPLORATION** — Users can discover real celestial bodies and fictional/AI-created environments, clearly distinguished.
4. **SPIRITUAL ATMOSPHERE** — Visuals, sound, light, and environments create a calm, mysterious, reflective experience without imposing a religion or making supernatural claims.
5. **REST & WISHES** — Users can sit, pause, rest, and create symbolic wishes.
6. **QUIET SHARED PRESENCE** — Users may see avatars and nicknames of other real users in the same space, without social-network or messaging features.

### 2.2 Product exclusions

The following are outside the product scope unless the owner formally changes the specification:

- Combat, weapons, competition, leaderboards, missions, or achievement pressure.
- Chat, DMs, friend systems, following, player lists, online counts, invitations, comments, public social profiles, or equivalent social-network mechanics.
- Mandatory account creation before exploration.
- Mandatory spacecraft or vehicle-based flight.
- Unreviewed AI publication.
- Presenting fictional celestial content as real astronomy.

AI-proposed names or destinations (including examples previously discussed such as MILKY WAY OBSERVATORY, AMETHYST PLANET, and ROSE QUARTZ MOON) are inspiration/proposals only. They are not mandatory product locations unless the owner approves them.

## 3. Binding product requirements

### 3.1 Earth as Home World

- `EARTH` is the default spawn location.
- `EARTH` is the primary return destination.
- No other place may replace Earth as Home World.
- A persistent and discoverable `RETURN TO EARTH` action must be available during exploration.
- `FIND MY WAY BACK` provides orientation and route-finding assistance.
- The overall map/navigation hierarchy must allow users to locate the Solar System and Earth.
- A failed connection, failed sector load, invalid position, or interrupted session must not strand the player. Restore the last valid checkpoint or a safe fallback.

Suggested Earth-related data attributes:
- `earth_world_id`
- `solar_system_id`
- `home_spawn_position`
- `home_spawn_rotation`
- `home_region_id`
- `home_sector_id`
- `is_default_home`
- `is_return_destination`

### 3.2 Navigation hierarchy

Conceptual hierarchy:

`Universe → Galaxy → Solar System → Earth / other celestial bodies`

The map must support orientation at an appropriate scale and navigation back to Earth. Exact map interaction and presentation are package-level design decisions.

### 3.3 Free flight and player states

Flight requirements:
- Six-direction movement: forward/backward, left/right, up/down.
- View orientation supports yaw and pitch; roll may be included if approved and ergonomically suitable.
- Movement direction is based on the player's view/orientation.
- Users can hover and fly around a planet and descend toward exploration areas.
- No spacecraft is required.

Player states:
- Flying
- Hovering
- Standing
- Sitting
- Resting (may be represented as a sitting/resting sub-state in implementation)

Camera concepts:
- Free Flight Camera
- Relaxation Camera for sitting/resting

The exact default camera and control mapping remain owner decisions unless separately approved.

### 3.4 Mobile-first requirement

Mobile is the primary design constraint. Desktop support must not undermine mobile usability.

The mobile prototype must test:
- Touch movement and camera controls.
- Six-direction movement and mode switching.
- Avatar/world rendering and asset loading.
- Memory and GPU usage.
- Frame rate and thermal/battery behavior.
- Network interruption and world-load recovery.
- WebGL context loss and tab/background transitions.
- Discoverability and reachability of `RETURN TO EARTH` and `FIND MY WAY BACK`.

Proposed performance targets from the review draft (not yet validated):
- Approximately 30 FPS on ordinary supported phones.
- Up to 60 FPS on capable devices.
- Sector loading target under five seconds under a defined test network/device profile.
- No persistent memory growth across repeated sector transitions.
- Reliable checkpoint recovery after failed loading or connection interruption.

These are proposed targets, not achieved results. Device classes, test conditions, and final thresholds must be approved in the relevant package.

### 3.5 Spiritual visual and audio identity

The spiritual identity should be expressed through the total experience:
- Color palettes may include indigo, purple, deep night blue, gentle gold, pearl, and cyan.
- Nebulae, stars, luminous dust, soft gradients, gentle glow, and slow transitions.
- Mystical landscapes and contemplative resting environments.
- Ambient space, wind, subtle crystal/chime textures, and environmental audio.
- Luminous stones and symbolic wish experiences.

Guardrails:
- Do not impose a religion, doctrine, or ritual.
- Do not claim that wishes cause real-world outcomes, grant supernatural powers, or provide medical/psychological treatment.
- Avoid manipulative urgency, fear, or pressure.
- Specific visual style, palette, sound design, and symbolism require owner approval where listed as pending decisions.

### 3.6 Wishes privacy

- A wish is **private by default**.
- The owner may explicitly choose to share a wish so other users can see it.
- Sharing must be an affirmative, understandable user action; no implicit/public-by-default behavior.
- The product must preserve the distinction between private and shared wishes in the data model and UI.
- No chat, DM, comments, reactions, follower, or friend mechanics may be introduced around wishes.

The owner-directed sharing interaction is: the user writes a wish and deliberately releases it into the universe. Once released, the wish is represented as a visible, gently glowing object that drifts through space and can be seen by other avatars. Private wishes remain invisible to other users. The exact persistence duration, visibility radius, moderation/reporting behavior, and lifecycle of released wishes still require detailed design before implementation.

### 3.7 Quiet shared presence and room capacity

- Only nearby avatar and nickname may be displayed for other real users in the same space.
- No social-network features or player directory.
- Maximum three real users per room for a planet.
- The fourth user is assigned to another independent room on the same planet.
- Capacity must be enforced authoritatively on the server, including simultaneous join attempts, reconnects, and race conditions.
- The UI must not expose room counts or player counts.

## 4. Real astronomy and fictional universe content

The product may contain:
1. Real astronomical objects and factual descriptions.
2. Fictional or imagined worlds.
3. AI-generated/procedurally generated environments.
4. Hybrid experiences inspired by astronomy but altered for artistic purposes.

Each published object/world must carry an explicit content classification, such as:
- `REAL_ASTRONOMICAL`
- `FICTIONAL`
- `AI_GENERATED_FICTION`
- `INSPIRED_BY_REAL_OBJECT`

The exact enum names may be refined during implementation, but the distinction must remain explicit in data, editorial workflows, and user-facing presentation where confusion could arise.

Real-world factual claims require appropriate source/verification. Fictional and AI-generated content must not be described as scientifically established fact.

## 5. AI generation and publication governance

AI may assist with:
- World concepts and environment descriptions.
- Procedural parameters and generation seeds.
- Asset creation and variation.
- Names, lore, ambient audio concepts, and environmental details.

AI must not:
- Publish generated content without review.
- Replace or modify Earth as Home World.
- Change approved locations or canonical data without authorization.
- Change approved architecture or package scope.
- Present fictional content as real astronomical fact.

Suggested pipeline:

`Concept → Parameters → Procedural Generation → Asset Pipeline → Quality/Safety/Provenance/License Validation → Human Review → Owner/Authorized Approval → Publication`

Store generation seed, generator/model version where available, parameter version, asset provenance, review status, and publication version so content can be reproduced and audited.

## 6. Proposed technical architecture

**Important:** The following is the Gói 01 Version 1.1 proposal. It remains unapproved until the owner explicitly approves the technology decisions.

### 6.1 Candidate technology stack

| Layer | Proposed candidate | Status |
|---|---|---|
| Web application | Next.js + React | Proposed |
| Language | TypeScript | Proposed |
| 3D engine | Three.js + React Three Fiber | First prototype candidate; not locked |
| Alternative 3D engines | Babylon.js, PlayCanvas | To compare during prototype |
| Database | PostgreSQL | Proposed |
| Backend services/auth/storage | Supabase | Proposed |
| Real-time multiplayer | Colyseus | Proposed |
| Guest/local persistence | IndexedDB | Proposed |
| 3D asset format | glTF/GLB | Proposed |
| Texture compression | KTX2 | Proposed |
| Unit/integration tests | Vitest or equivalent | Proposed |
| Browser E2E tests | Playwright or equivalent | Proposed |

The 3D engine must be selected only after the mobile prototype compares touch ergonomics, rendering performance, asset loading, memory, recovery, developer workflow, and long-term maintainability. Supabase does not replace the authoritative real-time room server.

### 6.2 Logical architecture layers

1. **Client application** — responsive web shell, input, accessibility, loading and error states.
2. **Web UI layer** — menus, map UI, settings, language, onboarding, account entry points.
3. **3D runtime** — scene lifecycle, rendering, camera, asset loading, animation, performance budgets.
4. **World and navigation** — universe hierarchy, sectors, streaming, map, routes, checkpoints.
5. **Player experience** — avatar, identity presentation, flight, rest, wishes, audio.
6. **Backend/data services** — profiles, content metadata, persistence, account merge, moderation/approval metadata.
7. **Real-time service** — room assignment and authoritative shared player state.
8. **Asset delivery and operations** — object storage, CDN, monitoring, logging, deployment.

### 6.3 Architecture principles

- 3D runtime must not access the database directly.
- Map/navigation must not depend on account identity.
- Avatar rendering must not be coupled to authentication.
- Server owns room capacity and authoritative room assignment.
- Persist meaningful checkpoints, not every render-frame movement update.
- Load the current sector and selectively preload adjacent/likely next sectors; do not load the entire universe.
- Use LOD, frustum/occlusion culling, instancing, texture compression, and asset budgets as appropriate.
- AI generation is separated from publication.
- Assets must have provenance and license records.
- Preserve versioned interfaces and shared types across client/server modules.

## 7. World streaming and recovery

Conceptual streaming behavior:
1. Load the current sector and required dependencies.
2. Preload likely next/adjacent sectors within a device-specific memory budget.
3. Retain nearby sectors only while useful and affordable.
4. Release distant sectors safely.
5. Do not unload the current valid sector before the target sector has loaded successfully.
6. On failure, retain or restore the last valid sector/checkpoint.
7. On reconnect, restore a valid state without exceeding room capacity.

A sector should have stable identity and version metadata. Procedural content should use deterministic seeds and generation versions where reproducibility is required.

## 8. Celestial body model and exploration suitability

Suggested body categories:
- Rocky Planet
- Gas Giant
- Ice Planet
- Ocean Planet
- Moon / Natural Satellite
- Star
- Other approved celestial or fictional body types

Suggested attributes:
- `planet_type`
- `surface_type`
- `exploration_mode`
- `atmosphere_profile`
- `gravity_profile`
- `rest_suitability`
- `rest_location_type`
- `generation_seed`
- `generation_version`
- `content_approval_status`
- `content_classification`

A gas giant must not be forced to have a conventional solid surface. Rest/exploration experiences may be located on a suitable moon, observation point, floating platform, or clearly fictional environment. The experience need not be a scientifically exact simulation, but must not misrepresent factual astronomy.

## 9. Data architecture — conceptual entities

The following is a conceptual domain inventory, not a final physical database schema. Tables may be combined or split during detailed design while preserving domain responsibilities and referential integrity.

### 9.1 Identity and guest lifecycle
- `users`
- `player_profiles`
- `avatars`
- `avatar_appearances`
- `nicknames`
- `guest_sessions`
- `account_merges`

Guest exploration should work without mandatory registration. Guest data may be stored locally in IndexedDB and later synchronized/merged after sign-in, subject to conflict and duplicate-prevention rules.

### 9.2 Universe and celestial content
- `galaxies`
- `space_regions`
- `universe_maps`
- `map_sectors`
- `sector_connections`
- `stars`
- `planets`
- `moons`
- `celestial_bodies`
- `world_generations`
- `world_seeds`

### 9.3 Player location and navigation
- `player_positions`
- `home_locations`
- `safe_checkpoints`
- `navigation_bookmarks`

High-frequency movement belongs in the real-time runtime. Persist stable checkpoints and relevant user-selected navigation state.

### 9.4 Rest and wishes
- `rest_areas`
- `wish_stones`
- `wish_records`

Wish records must encode privacy/sharing state and ownership. Default privacy is private; sharing requires explicit user choice.

### 9.5 Audio and assets
- `audio_tracks`
- `environment_audio`
- `asset_registry`
- `asset_versions`
- `asset_licenses`

### 9.6 Multiplayer
- `multiplayer_rooms`
- `room_assignments`

Room runtime state may be ephemeral. Do not retain player social history or create a player directory.

## 10. Guest access and account merge

- Guest users can enter and explore from Earth without registering.
- Create a guest session identifier and local profile state.
- Preserve guest avatar, nickname, and supported progress/preferences locally.
- On account creation/sign-in, merge eligible guest data without duplication or unauthorized takeover.
- Define conflict resolution and ownership verification before implementation.
- Do not make account registration a prerequisite for basic exploration.

## 11. Multiplayer architecture

Proposed candidate: server-authoritative Colyseus rooms (subject to approval).

Requirements:
- Room assignment is scoped to a planet.
- Each room has a hard capacity of three real users.
- A fourth user is assigned to another independent room on the same planet.
- Capacity is enforced atomically/server-side.
- UI does not show room identifiers, room counts, or player counts.
- Other users are represented only by avatar and nickname in the shared space.
- Disconnect/reconnect and room cleanup must preserve capacity invariants.
- No chat, DMs, friend, follow, invite, comments, or social-profile features.

Required test scenarios include 1–6 concurrent users, simultaneous attempts to occupy the final slot, disconnect/reconnect, room cleanup, and verification that a fourth user cannot enter a full room.

## 12. Module and repository organization

Proposed monorepo structure (subject to approval and refinement):

```text
apps/
  web/
  realtime-server/
  admin/

packages/
  universe-engine/
  universe-visual-system/
  celestial-system/
  galaxy-system/
  world-system/
  map-system/
  navigation-system/
  flight-system/
  camera-system/
  mobile-control-system/
  avatar-system/
  identity-system/
  guest-system/
  account-system/
  rest-system/
  wish-system/
  audio-system/
  multiplayer-room-system/
  ai-world-system/
  asset-system/
  shared-types/
  shared-config/
  shared-utils/

infrastructure/
  database/
  storage/
  cdn/
  monitoring/
  deployment/

assets/
  models/
  textures/
  environments/
  audio/
  avatars/
  licenses/

tests/
  unit/
  integration/
  mobile/
  performance/
  regression/

docs/
  architecture/
  packages/
  database/
  api/
  testing/
  decisions/

scripts/
  asset-validation/
```

There must be no `social-system` module. Wishes belong to `wish-system`; environmental presence/interactions must not evolve into social-network functionality.

### 12.1 Module responsibilities

| Module | Responsibility |
|---|---|
| `universe-engine` | 3D runtime lifecycle and rendering integration |
| `universe-visual-system` | Shared visual language, materials, lighting and effects |
| `celestial-system` | Celestial body types and behavior |
| `galaxy-system` | Galaxy and large-scale universe organization |
| `world-system` | World/sector lifecycle and streaming |
| `map-system` | Overall map and spatial representation |
| `navigation-system` | Routes, orientation, return-to-Earth and recovery |
| `flight-system` | Six-axis flight and movement state |
| `camera-system` | Flight and relaxation camera behavior |
| `mobile-control-system` | Touch-first control surfaces and ergonomics |
| `avatar-system` | Avatar appearance, animation and rendering |
| `identity-system` | Nickname and identity presentation |
| `guest-system` | Guest sessions and local guest state |
| `account-system` | Authenticated account and guest-data merge |
| `rest-system` | Sitting, resting and rest-area behavior |
| `wish-system` | Private-by-default wishes and explicit sharing |
| `audio-system` | Ambient and environmental audio |
| `multiplayer-room-system` | Planet-scoped room allocation and synchronization |
| `ai-world-system` | Generation workflow, seeds, review and publication state |
| `asset-system` | Asset metadata, versioning, provenance and licenses |
| `shared-types` | Shared contracts and type definitions |
| `shared-config` | Shared configuration |
| `shared-utils` | Cross-cutting utilities without domain ownership |

## 13. Asset rights and provenance

No asset may be used in a release until its rights have been checked and recorded.

Track, where applicable:
- Asset ID and version.
- Creator/author.
- Source/provider.
- License identifier and license text/reference.
- Commercial-use permission.
- Modification/derivative permission.
- Attribution requirements.
- Restrictions and expiration/territory limits, if any.
- Review/approval status.

An asset found on the internet is not automatically usable. AI-generated assets are not automatically free of copyright, trademark, likeness, or other rights risks.

## 14. Security, privacy, and content safeguards

- Minimize personal data and avoid exposing player details beyond avatar/nickname in shared spaces.
- Wishes are private by default and shared only by explicit user choice.
- Validate nicknames and user-generated content against project safety rules.
- Protect guest-to-account merge against data takeover and duplication.
- Enforce multiplayer capacity on the server.
- Keep credentials and secrets out of source control.
- Restrict admin publication actions to authorized roles.
- Preserve audit history for content approval and specification changes.

Detailed threat modeling and retention policies must be completed in the relevant packages before release.

## 15. Mobile performance and quality strategy

The mobile prototype must be conducted before locking the 3D engine. It should include:
- A representative avatar.
- A representative planet.
- A star/nebula environment.
- Six-axis flight.
- Touch camera control.
- Hovering and sit/stand.
- Sector load/unload.
- `RETURN TO EARTH`.
- Failed-load and connection-loss recovery.

Test on representative low-end Android, mid-range Android, and iPhone devices. Record device model, OS/browser, viewport, network conditions, frame-time/FPS, memory/GPU observations, load times, thermal behavior, battery impact, and recovery results.

No performance target in this draft is evidence of success until measured and recorded.

## 16. Risk register

| Risk | Required mitigation / verification |
|---|---|
| 3D engine underperforms on phones | Compare engines with a representative mobile prototype before lock-in |
| Six-axis touch flight is difficult | Real-device usability tests and iterative control tuning |
| User loses orientation | Persistent Earth return and find-way-back navigation |
| Sector loading fails | Keep valid sector until target is ready; checkpoint fallback |
| Excessive world memory use | Streaming, budgets, LOD, culling, instancing and repeated-transition tests |
| Gas giant modeled as solid surface | Celestial-type rules and rest-location suitability |
| AI-generated content is inconsistent | Seeds, versioning, validation and human approval |
| Room capacity race condition | Authoritative atomic allocation and concurrency tests |
| Guest data lost during sign-in | Merge tests, backup/conflict rules and duplicate prevention |
| Unlicensed assets | Asset registry and mandatory license review |
| Wishes exposed unexpectedly | Private-by-default data and explicit sharing controls |
| Social features creep into product | Prohibited-feature review in design and regression checks |
| AI changes approved content | Approval gates and protected canonical content |
| Regression across packages | Package acceptance suite and Git checkpoints |

## 17. Fifteen-package delivery roadmap

The roadmap below reflects the proposed consolidated sequence from Gói 01 Version 1.1. It is not a license to begin a package. Each package requires explicit authorization and acceptance before the next package begins.

| Package | Name | Primary goal | Key outputs |
|---|---|---|---|
| 01 | Analysis & Architecture | Define product and system baseline | Master specification, architecture, domain model, roadmap |
| 02 | Website Foundation | Establish project/web foundation | Repository, app shell, build/deploy foundation, baseline quality tooling |
| 03 | Homepage & Language | Establish entry experience and validate mobile 3D prototype/engine | Homepage, language foundation, prototype evidence, engine recommendation/decision |
| 04 | Avatar & Nickname | Establish player representation | Avatar selection/generation, nickname rules and persistence contract |
| 05 | Celestial Data | Establish celestial-body domain | Real/fictional classification, body metadata and relationships |
| 06 | Cosmic Travel Map | Establish universe map and navigation structure | Map hierarchy, Solar System/Earth discovery, navigation interfaces |
| 07 | 3D Universe Visual System | Establish visual world rendering | Materials, lighting, environment and representative 3D world assets |
| 08 | Free Flight & Camera | Establish six-axis flight and camera | Flight state machine, camera modes, controls and navigation integration |
| 09 | Mobile Experience | Optimize mobile interaction and runtime | Touch UX, performance budgets, device validation and recovery |
| 10 | AI Universe Generation | Establish governed world generation | Generation pipeline, seeds/versions, validation and approval workflow |
| 11 | Rest & Wish System | Establish rest and wishes | Rest locations, sitting/resting, private-by-default wishes and explicit sharing |
| 12 | Audio Experience | Establish environmental audio | Ambient audio, spatial/environmental audio behavior and controls |
| 13 | Account & Data Storage | Establish optional accounts and persistence | Guest merge, profiles, persistence, data protection and recovery |
| 14 | Realtime Planet Rooms | Establish quiet shared presence | Planet-scoped rooms, max-three enforcement, avatar/nickname synchronization |
| 15 | Quality Assurance & Release | Validate integrated product and release readiness | Regression, performance/security checks, release evidence and operational handover |

### 17.1 Dependency proposal

```text
01 → 02
02 → 03, 04, 05
03 → 07
05 → 06, 07
04 → 08
06 → 08
07 → 08
03, 07, 08 → 09
06, 07, 08, 09 → 10
04, 07, 08 → 11
07, 10, 11 → 12
04, 05, 06 → 13
04, 05, 07, 08, 13 → 14
10, 11, 12, 13, 14 → 15
```

The dependency graph expresses technical prerequisites. Delivery remains gated by explicit package acceptance; no agent may skip ahead simply because a downstream task appears technically possible.

### 17.2 Cross-package invariants

- Earth spawn/home/return: designed in Gói 01; implemented and validated across the relevant foundation, map, navigation, and QA packages.
- Return-to-Earth and find-way-back: must remain intact from their first implementation onward.
- No social features: applies from Gói 01 through release.
- Six-axis flight: implemented and validated in the flight package and mobile regression.
- Maximum three real users per room: implemented and concurrency-tested in Gói 14.
- Mobile-first: prototype in Gói 03, continued validation in Gói 09 and Gói 15.
- Guest data integrity: implemented in Gói 13 and regression-tested.
- AI seed/version/approval: implemented in Gói 10.
- Wish privacy default: implemented in Gói 11 and regression-tested.
- Asset license checks: required from the first asset introduction through release.

## 18. Package acceptance governance

Every package must define:
- Objective and explicit in-scope/out-of-scope boundaries.
- Inputs and prerequisite accepted packages.
- Deliverables and output contracts.
- Files/modules allowed to change.
- Unit, integration, device, performance, security, and regression tests as applicable.
- Acceptance criteria with measurable evidence.
- Known limitations and unresolved decisions.
- Owner review and explicit acceptance.
- Git checkpoint/tag after acceptance.

A failed acceptance returns the work to the responsible package. Do not mark a package accepted based solely on code completion or an AI assertion.

## 19. Decisions register

### 19.1 Product constraints treated as fixed in the review draft

These reflect explicit owner direction in the project conversation and should not be reopened casually:
- Earth is Home World, default spawn, and primary return destination.
- Preserve `RETURN TO EARTH`, `FIND MY WAY BACK`, and overall map navigation.
- Six-axis free flight; no required spacecraft.
- Support hovering, standing, sitting, and resting.
- Spiritual/mystical atmosphere without religious imposition or real-world healing/magic claims.
- No social network, chat, DM, friends, following, player lists, player counts, invitations, comments, or public profiles.
- Only avatar and nickname for other users in the same space.
- Maximum three real users per room; fourth user goes to another independent room on the same planet.
- Guest exploration; registration is not mandatory.
- Mobile-first.
- AI-created locations are proposals until approved.
- Wishes are private by default; users may explicitly choose to share.

### 19.2 Pending owner decisions

The following decisions remain pending after approval of the Gói 01 baseline. Approval of the package does not constitute approval of each individual decision:

| ID | Decision | Current proposal / question |
|---|---|---|
| D01 | 3D engine | Prototype Three.js + React Three Fiber first; compare alternatives |
| D02 | Backend | Next.js + Supabase + PostgreSQL |
| D03 | Multiplayer | Colyseus |
| D04 | Visual style | Mystical / fantasy / cinematic balance |
| D05 | Default camera | Third-person, with switchable modes |
| D06 | Mobile controls | Movement joystick plus camera touch area |
| D07 | Gravity | Free flight with configurable zone behavior |
| D08 | Rest location by body | Define suitable rest location for each celestial-body class |
| D09 | Wish sharing behavior and scope | Owner-directed behavior: write a wish and deliberately release it into space as a glowing, drifting object visible to other avatars. Private by default. Detailed visibility radius, duration, and lifecycle remain to be specified. |
| D10 | Avatar library | Define available avatar set and guest randomization rules |
| D11 | AI location publication | Owner approval required before publishing generated names/locations |
| D12 | Languages | American English default; Vietnamese support |
| D13 | Room cap/UI | Three users per room; do not display room count |
| D14 | Full-room behavior | Automatically find/create another room on the same planet |

A decision becomes approved only when the owner explicitly confirms it and the decision log is updated.

## 20. Change history

| Version | Date | Status | Change |
|---|---|---|---|
| 1.1-draft | 2026-11-19 | Submitted for Review | Consolidated Gói 01 Version 1.1 review draft; recorded Earth as Home World, no-social constraints, free flight, mobile-first, 15-package roadmap, and wishes private by default with optional explicit release into space as a visible, glowing, drifting object. |
| 1.1 | 2026-11-19 | **Approved — Gói 01 accepted by project owner** | Formal owner approval of the Gói 01 product and architecture baseline. Individual decisions D01–D14 retain their explicitly listed statuses. |
| 1.2 | 2026-11-19 | **Gói 02 authorized; scope and delegated decision recorded** | Owner explicitly authorized Gói 02 and delegated the relevant technical choices. `PACKAGE_02_SCOPE_AND_ACCEPTANCE.md` was authored. D02 web/backend direction is recorded in `P02-DECISION-LOG.md`: Next.js App Router + React + TypeScript; Supabase + PostgreSQL retained as the backend direction for later packages. Supabase provisioning/schema/auth/storage are deferred. D01 and D03–D14 remain pending where not applicable to Gói 02. A clean Gói 02 foundation implementation was created and awaited owner review. |
| 1.3 | 2026-11-19 | **Gói 02 provisionally approved for transition; Gói 03 authorized** | The owner explicitly stated “Tạm thời phê duyệt Gói 02 để mở tiếp Gói 03 có giao diện trực quan rồi tôi chạy kiểm tra một thể.” Gói 02 is recorded as provisionally approved for transition only; npm install, lint, typecheck, production build and browser/device verification remain outstanding. Gói 03 is explicitly authorized with scope in `docs/packages/PACKAGE_03_SCOPE_AND_ACCEPTANCE.md`. D01 remains open pending real-device comparison; D12 is implemented as English-default/Vietnamese-selectable direction pending owner confirmation. |
| 1.4 | 2026-11-19 | **Gói 03 implementation handover prepared** | Homepage, EN/VI language switch, guest-first prototype entry and an isolated React Three Fiber Earth prototype are implemented. Automated Node tests: 10/10 pass. npm dependency installation is blocked by DNS/network failure (`EAI_AGAIN`); lint, dependency-backed typecheck, production build and browser/device verification remain pending. D01 remains open; Gói 03 is ready for owner review but not accepted. |
| 1.5 | 2026-11-19 | **Gói 03 scope document references aligned** | Updated `PACKAGE_03_SCOPE_AND_ACCEPTANCE.md` to reference the current versions of `AGENTS.md`, Master Spec, and Gói 02 scope/decision records. No product or architecture decision changed. |
| 1.6 | 2026-11-20 | **Owner-approved delivery-sequence adjustment** | The owner explicitly approved deferring Gói 04 and prioritizing Gói 05 (Celestial Data), followed by Gói 06 (Cosmic Travel Map). This changes delivery priority only; it does not waive package dependencies, scope controls, or acceptance gates. Gói 05 is authorized to begin. Gói 06 is authorized as the next package after Gói 05 is reviewed and accepted. Gói 04 remains deferred, not cancelled. |

### 20.1 Change procedure

Any proposed modification must include:
- Change ID and date.
- Current requirement/decision.
- Proposed replacement or addition.
- Reason and owner/request source.
- Impact on architecture, data, APIs, modules, security/privacy, mobile performance, and packages.
- Migration/compatibility and rollback plan.
- Tests and acceptance criteria affected.
- Owner approval status.

Do not overwrite the approved baseline. After approval, increment the document version, preserve the prior version in Git history, and update the decision/change records.

## 21. Current project status

- Gói 01 Version 1.1: approved by the project owner on 2026-11-19.
- Gói 02: provisionally approved by the owner on 2026-11-19 for transition to Gói 03; technical verification remains open. Status: PROVISIONALLY APPROVED FOR TRANSITION — FINAL TECHNICAL VERIFICATION PENDING.
- Gói 02 implementation: dependency installation, lint, typecheck, production build and browser/device verification remain outstanding; the prior authoring environment could not reach the npm registry.
- D02: package-level web/backend direction recorded in `docs/decisions/P02-DECISION-LOG.md`.
- D01 and D03–D14: remain pending unless explicitly resolved in the Gói 02 decision log; no downstream decision is silently approved.
- Gói 03: explicitly authorized by the owner on 2026-11-19; homepage, language foundation and initial R3F prototype are prepared. Status: READY FOR OWNER REVIEW — RUNTIME/DEVICE VERIFICATION PENDING; not accepted.
- Delivery sequence update (2026-11-20): owner approved deferring Gói 04, prioritizing Gói 05 then Gói 06. Gói 05 is authorized/in progress; Gói 06 is authorized but gated on Gói 05 acceptance. Gói 04 remains deferred.

**End of document.**
