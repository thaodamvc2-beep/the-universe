# THE UNIVERSE — AI Session Start Gate

**Version:** 1.0  
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
