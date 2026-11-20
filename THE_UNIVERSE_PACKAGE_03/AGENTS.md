# THE UNIVERSE — AGENT INSTRUCTIONS

**Document:** `AGENTS.md`
**Version:** 1.2
**Created:** 2026-11-19
**Status:** Project-wide working instructions
**Applies to:** All AI agents, developers, contributors, and work packages (Gói 01–15)

This file is the mandatory entry point for anyone or any AI system working on THE UNIVERSE. It is a durable project instruction file, not a substitute for the approved Master Specification or package-specific acceptance records.

## 1. Product identity and non-negotiable principles

1. THE UNIVERSE is a 3D universe-exploration experience with a mysterious, tranquil atmosphere and spiritual depth.
2. **EARTH is always the Home World**: the default starting point and the primary return destination. No observatory, station, planet, or AI-generated location may replace Earth as Home World.
3. Preserve both navigation capabilities throughout the product:
   - `RETURN TO EARTH`: direct return to Earth.
   - `FIND MY WAY BACK`: orientation and navigation assistance to recover the route back.
4. The player can fly freely in six directions without requiring a spacecraft.
5. Do not build social-network features. Prohibited features include chat, direct messages (DMs), friend requests/lists, following, player lists, online/player counts, invitations, comments, public social profiles, and equivalent social mechanics.
6. In shared spaces, the only permitted information about another real player is their visible avatar and nickname. Do not expose additional player information or create social interaction systems.
7. A room for a given planet may contain at most **three real users**. The fourth user must be assigned to a separate, independent room on the same planet. Never exceed the limit, including during concurrent joins or reconnects.
8. Account registration must not be mandatory for initial exploration. Guest access is a supported product path.
9. **Mobile-first** is a binding design and engineering priority. Validate touch interaction, performance, memory, loading, thermal/battery impact, and recovery on real mobile devices.
10. Wishes are **private by default**. A wish becomes visible to other avatars only when its owner explicitly writes it for sharing and performs the deliberate action to release it into the universe. A released wish is represented as a visible, gently glowing object that drifts through space for other avatars to see. Never publish a private wish automatically or share it without clear user intent.
11. Clearly distinguish real astronomical objects and evidence-based astronomical information from fictional, imagined, AI-generated, or speculative worlds. Never present invented content as an established real celestial object.
12. AI-generated worlds, names, descriptions, imagery, audio, and other publishable content must pass the project's quality, safety, provenance, and human-approval process before publication.
13. Do not use models, textures, audio, fonts, code, or other assets until their source and applicable license/usage rights have been checked and recorded.
14. Do not independently change approved architecture, technology choices, data contracts, product invariants, or the order/dependency structure of the 15 work packages.
15. Do not claim that a test passed unless it was actually run and its result is available. Distinguish proposed targets, designed tests, executed tests, and accepted results.

## 2. Mandatory session-start gate — every new AI coding session

**This is a mandatory gate, not an optional recommendation. It applies at the beginning of every new session, conversation, task context, or resumed work period—not merely once per project.**

Before answering implementation questions, inspecting code for a requested change, planning, editing files, running commands, or making commits, the AI coding agent MUST:

1. Locate and read this root `AGENTS.md` in full.
2. Locate and read `docs/architecture/THE_UNIVERSE_MASTER_SPEC.md` in full.
3. Read `AI_SESSION_START.md` in full and execute its checklist.
4. Read the current package's scope, requirements, implementation notes, and acceptance criteria relevant to the requested task.
5. Inspect the latest Git state, checkpoints, and package acceptance records.

The agent must not rely on summaries, remembered context, prior chat messages, cached assumptions, or a previous session's claim that these files were read. It must re-open the current files from the project workspace at the start of each new session so it sees the latest versions.

**Read-verification requirement:** Before doing project work, the agent must state which of the required files it actually located and read, identify their current document versions/statuses, and report any missing or unreadable file. Do not claim a file was read if it was not actually opened and read.

**Fail-closed rule:** If `AGENTS.md`, `AI_SESSION_START.md`, or `docs/architecture/THE_UNIVERSE_MASTER_SPEC.md` is missing, inaccessible, or unreadable, stop project work. Do not implement, modify, generate project code, or infer missing requirements. Report the exact missing file and ask the owner to restore/provide it. The only permitted work is helping restore the required instruction/specification files.

This requirement is repeated in `AI_SESSION_START.md` so that an agent entering through either instruction file encounters the same gate.

## 3. Mandatory pre-work procedure

After passing the session-start gate, before starting any task in any work package:

1. Read this `AGENTS.md`.
2. Read `docs/architecture/THE_UNIVERSE_MASTER_SPEC.md`.
3. Read the current work package's scope, requirements, implementation notes, and acceptance criteria.
4. Inspect the project's Git history/checkpoints and acceptance records to identify what has already been completed and formally accepted.
5. Define the exact scope permitted for the current task, including files/modules that may and may not be changed.
6. Preserve accepted functionality. Do not modify accepted behavior unless the owner explicitly requests it or approves a documented change.
7. Check dependencies and compatibility with previously accepted packages.
8. Do not automatically start the next package after finishing the current one. Stop and request owner review/acceptance.

If a required document or acceptance record is missing, do not invent its contents or assume approval. Report the missing artifact and ask for direction before making consequential changes.

## 4. Conflict and change control

- If a new request conflicts with an approved Master Spec, an accepted package, or a non-negotiable product principle, stop the conflicting work.
- Explain the conflict, affected modules/packages, risks, and possible resolution paths.
- Wait for an explicit owner decision before changing the baseline.
- A suggestion, prototype, AI-generated idea, or unaccepted proposal is not an approved product decision.
- Record approved changes in the change history, including date, decision owner/authority, rationale, affected requirements, affected packages, migration/compatibility impact, and rollback considerations.
- Never silently rewrite an approved document. Preserve prior versions through Git history and a dated change record.

## 5. Versioning, decisions, and Git checkpoints

Maintain, at minimum:

- Document version and last-updated date.
- Current approval status: Draft, Pending Owner Approval, Approved, Superseded, or Rejected.
- Approved decisions and their approval record.
- Open decisions awaiting owner approval.
- Change history.
- Per-package status: Not Started, In Progress, Ready for Review, Accepted, or Rework Required.

For each accepted work package:

1. Run the package's agreed acceptance checks.
2. Record actual commands/procedures, environment, results, and known limitations.
3. Obtain explicit owner acceptance.
4. Create a Git checkpoint/tag or commit that clearly identifies the accepted package and version.
5. Record the checkpoint identifier in the package acceptance record.

A Git checkpoint does not itself mean that the owner accepted the package. Do not delete or overwrite accepted documents or checkpoints without a traceable, owner-approved change.

## 6. Work-package governance

- Follow the approved 15-package roadmap and its dependency order.
- A package may not be marked Accepted merely because implementation is complete.
- Acceptance requires evidence against the package's acceptance criteria and explicit owner approval.
- If a package fails acceptance, fix it within that package or return to the affected earlier package. Do not proceed as if the failure were accepted.
- Do not expand scope opportunistically. Log new ideas as proposals for owner review.
- Do not implement product code when the task is documentation-only.

## 7. Architecture and engineering guardrails

- Keep the 3D runtime separate from persistence and backend concerns. The 3D engine must not directly access the database.
- Keep navigation/map responsibilities separate from account identity.
- Keep avatar presentation separate from authentication.
- Keep high-frequency movement/state synchronization in the real-time layer; persist meaningful checkpoints rather than every render-frame position.
- Enforce room capacity on the authoritative server, including race conditions.
- Use world/sector streaming, level of detail, frustum/occlusion culling, instancing, compressed textures, and asset budgets where appropriate.
- Do not load the entire universe at once.
- AI may propose or generate content, but may not silently publish it, replace Earth, or modify approved content.
- Preserve reproducibility through generation seeds and versioned generation parameters where procedural generation is used.
- Maintain asset provenance and license records.
- Treat mobile performance and recovery as architecture constraints, not late-stage polish.

Technology choices in the Master Spec remain proposals until explicitly approved. Once approved, do not replace them without formal change control.

## 7. Product-specific safeguards

### Earth and navigation
- Earth remains the default spawn and primary return destination.
- `RETURN TO EARTH` must remain easy to find and usable from exploration states.
- `FIND MY WAY BACK` must help recover orientation and route.
- Provide an overall map/navigation hierarchy sufficient to locate the Solar System and Earth.
- On connection loss, failed world loading, or invalid position, recover to the last valid checkpoint or a safe fallback without leaving the player stranded.

### Flight and player state
- Support six-axis free flight, view-direction movement, hovering, and appropriate orientation controls.
- Support standing, sitting, and resting states.
- Do not introduce a spacecraft as a required movement vehicle.
- Provide a flight camera and a relaxation/sitting camera mode, subject to approved design decisions.

### Celestial bodies
- Distinguish rocky/surface-bearing planets from gas giants and other body types.
- Do not force a physically impossible solid surface onto a gas giant. Rest/exploration locations may instead use a suitable moon, observation point, floating environment, or clearly fictional setting.
- Do not imply that the experience is a scientifically exact simulation unless a specific feature has been validated and approved as such.

### Wishes and quiet shared presence
- Wishes are private by default.
- To share, the user writes the wish and deliberately releases it into the universe. The released wish appears as a gently glowing, drifting object that other avatars can see.
- Only wishes explicitly released by their owners are visible to others; private wishes remain private.
- This visual sharing mechanic is not a chat, DM, comment, reaction, social feed, or other social-network feature.
- Shared presence is limited to seeing nearby avatars and nicknames in the same space, subject to privacy and moderation rules approved for the project.

## 8. Required reporting format

At the end of a task, report:

1. Package and scope worked on.
2. Documents/files read.
3. Files changed or created.
4. Requirements and decisions relied upon, including approval status.
5. Tests actually run and their results; list tests not run.
6. Acceptance status and evidence.
7. Git checkpoint identifier, if created.
8. Risks, unresolved conflicts, and decisions needed from the owner.
9. Explicit confirmation that no later package was started without authorization.

## 9. Project baseline and authorization note

Gói 01 Version 1.1 was explicitly approved by the project owner on 2026-11-19. The companion Master Spec is therefore the **APPROVED GÓI 01 BASELINE**. That approval did not automatically approve individually pending decisions (D01–D14) or validate proposed performance targets. The owner authorized Gói 02 on 2026-11-19 and delegated the technical decisions relevant to that package. On 2026-11-19 the owner provisionally approved Gói 02 for transition to Gói 03 and explicitly authorized Gói 03. On 2026-11-20 the owner provisionally accepted all existing packages (Gói 01–06) for consolidation into one integrated game experience. This is provisional acceptance, not a waiver of recorded verification gaps: Gói 02 legacy HTTP-header checks and real-device/browser review remain open; Gói 03 D01 engine comparison and device qualification remain open; Gói 04 avatar review and local-storage edge checks remain open; Gói 05/06 visual review remains open. The owner authorized cross-package integration of the current game baseline. Do not start Gói 07 or later without a separate authorization.
