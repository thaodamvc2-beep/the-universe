# THE UNIVERSE — AI Session Start Gate

**Version:** 1.2  
**Created:** 2026-11-19  
**Applies to:** Every AI coding agent and every new or resumed work session on THE UNIVERSE  
**Priority:** Mandatory project instruction; read together with the root `AGENTS.md`

## Stop before doing any project work

At the beginning of EVERY new session or resumed task context, do not start coding, planning implementation, changing files, running project commands, or making assumptions from chat history.

First, open and read these current workspace files in full:

1. `AGENTS.md`
2. `AI_SESSION_START.md`
3. `docs/architecture/THE_UNIVERSE_MASTER_SPEC.md`

Then open and read the current work package's scope, requirements, implementation notes, and acceptance criteria. Inspect the latest Git status/history and the formal acceptance record for the package.

Do this again at the start of each new session. Reading the files in an earlier session does not satisfy this requirement. Do not substitute a memory, summary, prior assistant response, cached context, or an assumption that another agent already read them.

## Required read-verification report

Before proceeding, report briefly:

- `AGENTS.md`: located and read / missing / unreadable; include its version.
- `AI_SESSION_START.md`: located and read / missing / unreadable; include its version.
- `docs/architecture/THE_UNIVERSE_MASTER_SPEC.md`: located and read / missing / unreadable; include its version and approval status.
- Current work package and its formal status.
- Git state/checkpoint inspected, or why it could not be inspected.
- Any missing, conflicting, or outdated project records.

Only report “read” after actually opening and reading the current file contents.

## Fail-closed behavior

If any of the three mandatory instruction/specification files is missing, inaccessible, or unreadable:

- STOP all project implementation and consequential project changes.
- Do not guess, reconstruct, or rely on remembered requirements.
- Tell the project owner exactly which file is unavailable.
- Ask the owner to restore or provide the file.
- You may help restore the required documentation, but do not proceed with product implementation.

If package acceptance records or required package documents are missing, stop work that depends on them and ask the owner for direction.

## After the gate passes

- Follow all product invariants and change-control rules in `AGENTS.md`.
- Treat the Master Spec's explicit approval status as authoritative. A draft or pending document is not approved.
- Work only within the explicitly authorized package and scope.
- Do not silently decide pending architecture/product decisions.
- Do not begin the next package automatically after completing the current one.
- Stop and request the owner's review and explicit acceptance at the required milestone.

## Important limitation

These files establish a repository-level instruction contract. They make the requirement explicit for coding agents that discover and follow `AGENTS.md` or repository instructions. A plain Markdown file cannot technically force a non-compliant AI tool or a platform that does not load repository instructions to read it. For such tools, configure the equivalent mandatory startup instruction in that tool's project/system instructions and ensure it has workspace access to these files.

## Owner authorization register — 2026-11-24

The project owner explicitly authorized Gói 08 **Free Flight & Camera** and Gói 09 **Mobile Experience** for implementation and integrated verification on an isolated branch. Their scope and decision records are in `docs/packages/PACKAGE_08_FREE_FLIGHT_AND_CAMERA_SCOPE.md`, `docs/decisions/P08-DECISION-LOG.md`, `docs/packages/PACKAGE_09_MOBILE_EXPERIENCE_SCOPE.md` and `docs/decisions/P09-DECISION-LOG.md`. This authorization does not permit production merge or GitHub Pages deployment. Gói 10–15 remain unauthorized.

## Integrated implementation checkpoint — 2026-11-24

- Working branch: `feat/packages-08-09-integration`.
- Pull request: https://github.com/thaodamvc2-beep/the-universe/pull/10 (open; mergeable; not merged).
- Code integration commit: `aaa346c50f2511f004e189c2881f92de4f2b26fa` (later commits only record project status).
- Vercel preview: https://the-universe-git-feat-packages-08-09-integration-thao-002f.vercel.app (deployment READY; Vercel SSO protection may require team sign-in).
- Deployment ID: `dpl_FaGMs5tA7YPwmGtcgwE4iTcEh5QZ`.
- Verification: 90/90 Node tests; lint/typecheck/static build pass; Chromium emulation at 390×844, 1280×800 and 1280×600; WebGL context-loss/restoration simulated successfully.
- Next gate: owner performs real-phone validation and reports findings. Do not merge to `main` or deploy GitHub Pages without a separate explicit instruction.


## Runtime stability follow-up checkpoint — 2026-11-24

- Owner reported the Vercel preview still showed a 3D scene load/WebGL failure and directional steering did not behave correctly.
- Root causes identified in the G08/G09 integration: D-pad pointer events bubbled to the canvas parent, which could take pointer capture away from the child control; avatar URLs were hard-coded to the GitHub Pages subpath although Vercel preview serves at domain root.
- Follow-up branch: `fix/p08-p09-runtime-stability`.
- PR #11: https://github.com/thaodamvc2-beep/the-universe/pull/11 (draft, targets the G08/G09 integration branch; not merged to main).
- Code changes: deployment-aware avatar asset paths; explicit pointer-capture ownership; precomputed collision spheres and scalar swept-sphere collision; telemetry isolated to 250 ms; memoized 3D scene; high-resolution planet labels allocated only within 72 game-space units; 11 curated NASA-named game destinations rather than a live bulk TAP request.
- Explicitly preserved `generatedKeys` and infinite procedural region behavior per owner instruction. Gói 10–15 remain unauthorized and untouched.
- Local verification on the exact implementation checkpoint: 100/100 tests, lint (no errors; the existing root ESLint pages-directory warning remains), TypeScript and Vercel-mode static build pass.
- Vercel preview deployment is created from the branch; check the latest deployment state before sharing a test URL. Physical-phone GPU, memory, thermal and touch qualification remains pending owner testing.
- Production `main`, GitHub Pages and PR #10 were not merged or deployed by this follow-up.
