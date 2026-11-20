# THE UNIVERSE — PROJECT CONTINUITY BRIEF

**Updated:** 2026-11-20  
**Purpose:** Copy this entire document into a new ChatGPT conversation to resume project work without reconstructing decisions from memory.

## 1. Owner's current instruction

The owner explicitly instructed on 2026-11-20:

- Implement Gói 04 (Avatar & Nickname) now.
- Then integrate the existing project into one coherent, complete-as-currently-authorized website.
- Update the public GitHub Pages site and verify that it builds and runs so the owner can try it.
- Continue doing technical work directly in the GitHub repository. The owner gives direction and does not want to be asked to perform coding, terminal, ZIP, or deployment work.
- Preserve this brief and keep it current whenever important project decisions, package states, commits, or deployments change.

This instruction supersedes the earlier temporary decision to defer Gói 04. Do not treat Gói 04 as cancelled or deferred.

## 2. Repository and public site

- GitHub repository: https://github.com/thaodamvc2-beep/the-universe
- Default branch: `main`
- Public website: https://thaodamvc2-beep.github.io/the-universe/
- Celestial catalogue: https://thaodamvc2-beep.github.io/the-universe/worlds/\n- Avatar and nickname: https://thaodamvc2-beep.github.io/the-universe/avatar/\n- Optional sign-in information: https://thaodamvc2-beep.github.io/the-universe/account/
- Active website source: `THE_UNIVERSE_PACKAGE_03/apps/web/`
- Active GitHub Pages workflow: `.github/workflows/static.yml`
- Build working directory: `THE_UNIVERSE_PACKAGE_03/`
- Static output: `THE_UNIVERSE_PACKAGE_03/apps/web/out/`
- Required base path: `/the-universe`
- Build runtime: Node.js 22
- Do not introduce another hosting platform. Use GitHub and GitHub Pages only.

## 3. Product identity — non-negotiable

THE UNIVERSE is a calm, mysterious, contemplative 3D universe exploration experience.

- EARTH is always the Home World, default starting point and primary return destination.
- Preserve `RETURN TO EARTH` and `FIND MY WAY BACK` in the future exploration experience.
- Free six-direction flight; no spacecraft required.
- Guest exploration without mandatory registration.
- Mobile-first.
- Real astronomical objects must be distinguished from fictional/AI-generated worlds.
- AI-generated content requires review and approval before publication.
- No combat, missions, competitive progression, social network, chat, DMs, friends, follows, invitations, comments, player lists/counts or public social profiles.
- In shared spaces, only another real user's avatar and nickname may be visible.
- Maximum three real users per planet room; a fourth user must be assigned to another room on the same planet. This is a later authoritative multiplayer requirement.
- Wishes are private by default; share only after the owner deliberately releases them.
- Do not use unlicensed external assets.

## 4. Avatar & Nickname — recovered owner requirements

The owner previously specified:

- Automatically create an avatar for every guest on entry.
- Guests may freely change their avatar and nickname.
- No real name is required.
- Always offer optional sign-in, but never force it before exploration.
- Save avatar and nickname on the device.
- Future sign-in should synchronize the data across devices; authentication/cloud sync are not yet implemented and must not be faked.
- Maintain a personal, quiet, spiritual atmosphere without forced social interaction.

Current Package 04 scope and actual verification are documented at:
`THE_UNIVERSE_PACKAGE_03/docs/packages/PACKAGE_04_SCOPE_AND_ACCEPTANCE.md`

Decision record:
`THE_UNIVERSE_PACKAGE_03/docs/decisions/P04-DECISION-LOG.md`

## 5. Package history and current status

- Gói 01 v1.1: owner-approved product/architecture baseline.
- Gói 02: provisionally approved for transition to Gói 03; technical verification gaps remain open. Do not call it fully accepted.
- Gói 03: homepage, EN/VI language foundation and isolated R3F Earth prototype exist. Manual browser/device review and formal owner acceptance remain open. R3F is a prototype candidate only; D01 engine choice remains open pending mobile comparison with Babylon.js and PlayCanvas.
- Gói 04: previously deferred, then explicitly reopened and authorized by the owner on 2026-11-20. Implemented and deployed: automatic guest identity, six built-in cosmic avatar appearances, editable nickname, local persistence, bilingual UI and an honest optional sign-in information route. Status: READY FOR OWNER REVIEW — NOT ACCEPTED.
- Gói 05: implemented and deployed; Solar System catalogue includes Sun, eight planets and Earth's Moon, bilingual details, NASA references and Earth as sole Home World. Manual browser review and explicit owner acceptance remain open.
- Gói 06: Cosmic Travel Map was previously authorized after Gói 05 acceptance; do not silently begin it until its gate is resolved or the owner explicitly changes the instruction.
- Gói 07–15: not implemented as a complete product; follow the Master Spec roadmap and package approvals.

Important: The owner now wants Gói 04 implemented and the currently delivered website integrated for testing. This does not make unimplemented systems (real auth, cloud sync, multiplayer, six-axis flight, full AI world generation) magically available. Clearly label prototypes and limitations.

## 6. Existing implementation

- Next.js App Router + React + TypeScript.
- React Three Fiber is used only for the isolated Earth rendering prototype; engine is not locked.
- Static export configured for GitHub Pages.
- Homepage route `/`.
- 3D prototype route `/prototype/`.
- Real celestial catalogue route `/worlds/`.
- EN/VI translations.
- Canonical data: `apps/web/src/data/celestial-bodies.json`.
- Site header and language provider under `apps/web/src/components/`.
- GitHub Pages workflow performs package-scoped tests, ESLint, TypeScript typecheck, static build and deploy.

Latest integrated release evidence:\n- Commit: `ef66790b2bd2822054f16ba953856d8b5c5812dc`.\n- GitHub Actions run: [44661437139](https://github.com/thaodamvc2-beep/the-universe/actions/runs/44661437139) — success.\n- 18 automated tests passed, 0 failed; ESLint, TypeScript typecheck, static production build and GitHub Pages deployment all passed.\n- The workflow tests the combined current Gói 03/04/05 source. Manual browser/device review remains pending.\n\nKnown verification gaps:
- Legacy Gói 02 tests assume dynamic Cache-Control and configurable HTTP security headers; static GitHub Pages cannot provide these response headers. These failures must remain documented, not falsely marked as passing.
- Manual browser and physical mobile review has not been performed by the owner.
- Current public site is a static prototype, not the complete backend-enabled 3D product.

## 7. Working rules for the next conversation

1. Read `THE_UNIVERSE_PACKAGE_03/AGENTS.md`, `THE_UNIVERSE_PACKAGE_03/AI_SESSION_START.md`, and `THE_UNIVERSE_PACKAGE_03/docs/architecture/THE_UNIVERSE_MASTER_SPEC.md` from the live `main` branch before making project changes. Also read the current package scope and decision log.
2. Inspect latest main commit and GitHub Actions runs; never assume the state in this brief is still current.
3. Treat the latest owner instruction in the current conversation as authoritative; update the Master Spec and this brief so old instructions do not mislead the next session.
4. Make code and documentation changes directly in the repository. Do not ask the owner to use a terminal, edit code, download a ZIP, or manually deploy.
5. Use only GitHub + GitHub Pages for public deployment.
6. Do not ask for passwords or tokens.
7. Run actual tests/build/deployment and report exact evidence. Never claim success before GitHub Actions confirms it.
8. Preserve accepted functionality and all product invariants. Do not delete uncertain/legacy project folders.
9. After important changes, update this file with commit SHA, workflow run, package status and remaining gaps.
10. Explain to the owner in plain Vietnamese what is live, what can be tested, and what remains a prototype.\n11. Keep this continuity brief current after each important commit and deployment.

## 8. Resume prompt

Paste this after the document when starting a new conversation:

"Đọc toàn bộ PROJECT_CONTINUITY_BRIEF.md và các tài liệu bắt buộc được nêu trong đó từ repo GitHub hiện tại. Kiểm tra commit main và GitHub Actions mới nhất. Tiếp tục từ trạng thái mới nhất trong brief: Gói 04 đã triển khai và deploy, hãy đọc tài liệu hiện tại, kiểm tra commit main và GitHub Actions mới nhất, kiểm tra website thật trên desktop/mobile, sửa lỗi thực tế và cập nhật brief. Tự làm toàn bộ phần kỹ thuật qua GitHub; không yêu cầu tôi dùng terminal, sửa code hay tải ZIP. Giữ nguyên các nguyên tắc cốt lõi của THE UNIVERSE."
