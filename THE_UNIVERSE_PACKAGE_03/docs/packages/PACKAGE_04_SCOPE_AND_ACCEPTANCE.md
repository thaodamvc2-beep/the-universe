# THE UNIVERSE — PACKAGE 04 SCOPE & ACCEPTANCE

**Document ID:** TU-PKG-04-001  
**Version:** 1.1  
**Date:** 2026-11-20  
**Status:** READY FOR OWNER REVIEW — DEPLOYED; MANUAL BROWSER REVIEW PENDING  
**Package:** 04 — Avatar & Nickname  
**Authority:** The project owner explicitly instructed on 2026-11-20 to execute Gói 04 now and then integrate the available packages into the public website. This supersedes the prior temporary deferral of Gói 04.

## 1. Objective

Give every visitor a personal, lightweight identity from the first guest visit: an automatically created avatar and nickname that the visitor can freely change. Keep exploration guest-first and make optional sign-in discoverable without pretending that account authentication or cloud synchronization exists before its later package is implemented.

## 2. Governing inputs and current limitations

- `AGENTS.md` v1.1 and `AI_SESSION_START.md` v1.0.
- Master Spec v1.8 records the owner's latest delivery instruction.
- Earth remains the sole Home World and default return destination.
- Gói 03 provides the homepage, language foundation and isolated 3D prototype; its physical-device review and formal owner acceptance remain open.
- Gói 05 provides the real Solar System catalogue; its manual browser review and formal owner acceptance remain open.
- This package is explicitly authorized by the owner despite those earlier review items. This authorization does not silently mark Gói 02, 03 or 05 as accepted.

## 3. Confirmed owner requirements

1. Automatically create a guest avatar when a visitor enters the experience.
2. Allow the guest to change the avatar freely.
3. Allow the guest to choose and change a nickname freely.
4. Do not require a real name or mandatory registration.
5. Always make optional sign-in discoverable.
6. Preserve avatar and nickname on the visitor's device.
7. Keep the experience calm, personal and spiritual in atmosphere; do not force social interaction.
8. In any future shared space, only the avatar and nickname may be visible to other real users.
9. Do not add chat, DMs, friends, following, invitations, comments, player lists/counts, or public social profiles.

## 4. In scope

- A versioned guest identity contract with a stable local guest ID.
- Automatic first-visit identity creation with a default avatar and generated guest nickname.
- A responsive avatar selection and nickname editing page.
- A small set of distinct, source-authored/procedural avatar appearances; no external image, font, model, texture or audio dependency.
- Local-device persistence using browser localStorage, with defensive parsing and safe fallback for invalid or unavailable storage.
- EN/VI interface strings using the existing language provider.
- A visible optional sign-in entry point and an honest account information page.
- Clear UI disclosure that cloud sign-in and cross-device synchronization are not active in this release.
- Automated tests for identity defaults, nickname validation, local persistence contract, localization parity, and prohibited social features.
- Integration into the shared site navigation and guest entry path.

## 5. Out of scope

- Real authentication, OAuth, Supabase provisioning, database schema, cloud backup or cross-device synchronization.
- Avatar marketplace, paid items, uploads, user-generated avatar assets or external asset libraries.
- Multiplayer avatar synchronization, room assignment or room capacity (Gói 14).
- Chat, DMs, friends, follows, invitations, comments, public profiles, player directories or player counts.
- Mandatory real names, email collection, or mandatory account creation.
- Avatar animation/rigging or final production 3D avatar assets (subject to later visual/runtime packages).

## 6. Data contract

Local guest identity v1:

- `version`: literal schema version `1`.
- `guestId`: stable, locally generated identifier; not a real-world identity.
- `nickname`: user-selected display label or generated guest nickname.
- `avatarId`: stable ID from the approved in-app avatar set.
- `createdAt`: ISO timestamp for local record creation.
- `updatedAt`: ISO timestamp for the latest local edit.

Storage key: `the-universe:guest-identity:v1`.

The browser record is untrusted input. Validate every field when reading it. If malformed or unavailable, create an in-memory guest identity and continue without blocking exploration. Do not store sensitive personal data.

## 7. Nickname rules for this release

- Trim leading/trailing whitespace.
- Required length: 2–20 Unicode characters after trimming.
- Permit letters, combining marks, numbers, spaces, underscore and hyphen.
- Reject control characters and unsupported punctuation.
- Do not request or infer a real name.
- This local prototype does not claim to provide server-side moderation or global uniqueness. Those guarantees require a future authoritative service.

## 8. UX requirements

- Guest entry must never be blocked by the avatar editor or sign-in.
- New visitors receive a default avatar and a generated nickname automatically.
- Provide a clear `MY AVATAR` / `AVATAR CỦA TÔI` entry in site navigation.
- Avatar choices must be visually distinct, keyboard/touch selectable, and expose accessible names and selected state.
- Nickname input must show validation feedback and must not silently truncate.
- Save changes locally and provide clear confirmation.
- Optional sign-in remains visible, but the account page must state that authentication and cloud sync are not yet enabled.
- Earth remains the user's Home World; avatar identity must not affect navigation or starting location.

## 9. Acceptance criteria

| ID | Criterion | Evidence required |
|---|---|---|
| P04-AC-01 | First-time guest identity is created automatically without sign-in | Automated identity test and browser entry review |
| P04-AC-02 | Guest can choose among multiple distinct avatars | Browser/touch interaction review |
| P04-AC-03 | Guest can edit and save a valid nickname | Automated validation test and browser review |
| P04-AC-04 | Identity survives page reload on the same device | Browser persistence test |
| P04-AC-05 | Malformed/unavailable local storage does not block guest entry | Unit tests and browser failure-path review |
| P04-AC-06 | English and Vietnamese have matching translation keys | Automated localization test |
| P04-AC-07 | Optional sign-in is discoverable and account limitations are truthful | Browser review; no fake authentication |
| P04-AC-08 | No real name, mandatory registration or prohibited social feature is introduced | Source/scope review and regression tests |
| P04-AC-09 | Earth remains the Home World and guest entry remains available | Existing product regression tests |
| P04-AC-10 | Lint, typecheck, package tests and static production build pass | GitHub Actions evidence |

## 10. Actual verification record

Environment: GitHub Actions, Node.js 22.23.5, npm 10.9.9. Workflow run: [44661437139](https://github.com/thaodamvc2-beep/the-universe/actions/runs/44661437139), commit `ef66790b2bd2822054f16ba953856d8b5c5812dc`.

| Check | Result | Evidence |
|---|---|---|
| Package 03 + Package 05 + Package 04 automated tests | PASS | 18 tests passed, 0 failed |
| ESLint | PASS | GitHub Actions run 44661437139 |
| TypeScript typecheck | PASS | GitHub Actions run 44661437139 |
| Next.js static production build | PASS | GitHub Actions run 44661437139 |
| GitHub Pages deployment | PASS | GitHub Actions run 44661437139 |
| Manual browser interaction (desktop/mobile) | NOT RUN | Owner visual and interaction review remains pending |

Automated tests cover guest identity creation, six avatar IDs, nickname validation, local persistence, malformed/blocked storage fallback, identity updates and truthful optional sign-in disclosure. Automated checks do not replace real browser/device review.

## 11. Acceptance status

**READY FOR OWNER REVIEW — DEPLOYED; NOT ACCEPTED.** The implementation is live on GitHub Pages. The owner must still review the avatar picker, nickname editor, local persistence across reloads and responsive layout on desktop/mobile. No real authentication, cloud sync or multiplayer avatar synchronization is claimed.

## 12. Handover

After implementation, run the package-specific tests, existing Gói 03/Gói 05 regression tests, ESLint, TypeScript typecheck and production static build. Deploy through the single GitHub Pages workflow. Record the exact commit and workflow run. Do not claim real sign-in, cloud persistence, multiplayer visibility or full 3D avatar functionality.
