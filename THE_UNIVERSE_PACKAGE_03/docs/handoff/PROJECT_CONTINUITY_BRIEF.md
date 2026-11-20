# THE UNIVERSE — PROJECT CONTINUITY BRIEF

**Updated:** 2026-11-20  
**Purpose:** Copy this entire document into a new ChatGPT conversation to resume project work without reconstructing decisions from memory.

## 1. Owner's current instruction

The owner explicitly instructed on 2026-11-20:

- Provisionally accept all existing packages Gói 01–06.
- Consolidate everything into one guest-first web game; opening the root page enters the game directly.
- Integrate the previously designed six avatars and saved nickname; add six-axis flight, travel between worlds, landing, and new viewpoints from other worlds.
- Include the spacecraft-explored planets and representative moons, dwarf planets, asteroids and comets; distinguish real objects from fictional worlds.
- Expand the universe continuously, add ambient sound, and deliver real AI generation and networked multiplayer.
- Finish the integrated build and deploy it to GitHub Pages for desktop/mobile testing. The owner gives product direction and does not want technical setup tasks.
- Continue technical work directly in GitHub and keep this brief current.

This explicitly authorizes Gói 07. Gói 01–06 remain provisionally accepted; their recorded technical/device gaps are not erased. Gói 08+ is not authorized.

## 2. Repository and public site

- GitHub repository: https://github.com/thaodamvc2-beep/the-universe
- Default branch: `main`
- Public website: https://thaodamvc2-beep.github.io/the-universe/
- Celestial catalogue: https://thaodamvc2-beep.github.io/the-universe/worlds/
- Avatar and nickname: https://thaodamvc2-beep.github.io/the-universe/avatar/
- Main homepage: https://thaodamvc2-beep.github.io/the-universe/
- Optional sign-in information: https://thaodamvc2-beep.github.io/the-universe/account/
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
- Gói 02: provisionally accepted by the owner for the unified baseline; legacy HTTP-header behavior and physical-device verification gaps remain open.
- Gói 03: provisionally accepted for the integrated game baseline. The R3F Earth scene is now the homepage game runtime; D01 engine selection remains open pending comparative real-device testing against Babylon.js and PlayCanvas.
- Gói 04: previously deferred, then explicitly reopened and authorized by the owner on 2026-11-20. The owner clarified that avatars must be cute human characters, not abstract orbs, and that the selected avatar must be integrated into the main website. The six abstract orb placeholders have now been replaced by six original locally bundled 3D animated-film-style human character portraits (Luna, Noah, Rosie, Milo, Ivy, Stella). The selected avatar and nickname appear in the homepage hero and shared site header, while the avatar editor retains selection and nickname editing. Existing stable avatar IDs and local guest data remain compatible. This visual revision is implemented in source; its CI/deployment result is pending.
- Gói 05: implemented and deployed; Solar System catalogue includes Sun, eight planets and Earth's Moon, bilingual details, NASA references and Earth as sole Home World. Provisionally accepted by the owner with corrections allowed; manual browser/device review remains open.
- Gói 06: implemented and deployed as an integrated schematic Solar System navigation map. The map is the guest-first homepage (`/`) and also available at `/map/`; it uses canonical Gói 05 IDs, shows avatar/nickname, supports destination selection/details, simulated route preview and Earth recovery. It does NOT implement actual travel, six-axis flight, planetary surface exploration or production 3D universe rendering. GitHub Actions run 44700029296 passed 23/23 tests, ESLint, TypeScript, production build and GitHub Pages deployment. Manual desktop/mobile visual review remains outstanding. Code verification commit: 0bfbade4a3d3e095c80b78743f1760414fd741ca.
- Unified game homepage: [GitHub Pages](https://thaodamvc2-beep.github.io/the-universe/) — opens directly into the 3D Earth scene. Avatar movement: WASD/arrow keys or on-screen directional buttons; drag to rotate the camera. The player's saved nickname appears in the HUD. The Earth rotates slowly and the Moon orbits nearby.
- Canonical map: `/map/`; celestial catalogue: `/worlds/`; avatar editor: `/avatar/`.
- Gói 07: explicitly authorized on 2026-11-20 and in progress. Current code replaces walk-only movement with six-axis flight, takeoff, destination approach, manual landing on supported solid bodies, Earth return, expanded real destinations, procedural fictional sectors and optional Web Audio ambience. The avatar reuses the existing six stable IDs and guest nickname; the 3D suit palette follows the selected avatar and the portrait remains in the HUD.
- AI generation and global multiplayer are not live: the frontend adapters require a secure AI endpoint and a realtime WebSocket server. The deterministic procedural generator is not AI. No API secrets are embedded in the static site. The backend contract is documented in `docs/architecture/UNIVERSE_BACKEND_CONTRACT.md`.
- Latest confirmed deployed flight slice: [GitHub Actions run 44706080178](https://github.com/thaodamvc2-beep/the-universe/actions/runs/44706080178), success; 23 tests, ESLint, TypeScript, static build and GitHub Pages deployment passed at commit `3df3f351a5c1366ba294b84eb41e24e2ee2fd831`. Later polish commits are being checked; latest source commit in this brief: `f694462c4a5f191b1dec8c3c42cbacf2f6e1df20`.
- Gói 08+ is not authorized.

Important: The owner authorized Gói 07. Six-axis flight and destination landing are implemented in the current code slice. True AI generation and global multiplayer still require secure server services; never fake these capabilities or call procedural generation AI. Real authentication/cloud sync remain deferred.

## 6. Existing implementation

- Next.js App Router + React + TypeScript.
- React Three Fiber powers the current playable 3D spaceflight homepage slice; D01 engine choice remains open and is not locked.
- Static export configured for GitHub Pages.
- Homepage route `/` — playable 3D spaceflight game with Earth as the Home World.
- `/prototype/` remains the earlier isolated camera-orbit prototype.
- Real celestial catalogue route `/worlds/`.
- EN/VI translations.
- Canonical data: `apps/web/src/data/celestial-bodies.json`.
- Site header and language provider under `apps/web/src/components/`.
- GitHub Pages workflow performs package-scoped tests, ESLint, TypeScript typecheck, static build and deploy.
- Flight source: `apps/web/src/features/game/flight-scene.tsx`, `universe-game.tsx`, `universe-data.ts`.
- Secure backend contracts: `docs/architecture/UNIVERSE_BACKEND_CONTRACT.md`.

Latest integrated release evidence:
- Unified playable game homepage deployment: [GitHub Actions run 44701854209](https://github.com/thaodamvc2-beep/the-universe/actions/runs/44701854209) — success; 23 tests, ESLint, TypeScript, static production build and GitHub Pages deployment passed. Latest game code commit: `0e8bcf611ce970ac361e6a991898028605ab63e8`.
- The homepage game is live at `https://thaodamvc2-beep.github.io/the-universe/`.
- Gói 07 flight slice was deployed at commit `3df3f351a5c1366ba294b84eb41e24e2ee2fd831`; subsequent polish commit `f694462c4a5f191b1dec8c3c42cbacf2f6e1df20` awaits its own CI/deployment confirmation.
- Previous integrated release commit: `18945ff5845e792c2b69bd901397237ca268d475`.
- Previous GitHub Actions run: [44661753954](https://github.com/thaodamvc2-beep/the-universe/actions/runs/44661753954) — success, 18 tests, lint, typecheck, static build and GitHub Pages deployment.
- - Latest visual revision commit: `90cee727c5afee42362bb873501b62714a1744a3`.
- GitHub Actions run: [44671828808](https://github.com/thaodamvc2-beep/the-universe/actions/runs/44671828808) — success.
- 19 automated tests passed, 0 failed; ESLint, TypeScript, static build and GitHub Pages deployment passed.
- Live site: https://thaodamvc2-beep.github.io/the-universe/ . The browsing tool could not independently load the Pages URL, so owner visual review remains the final check.

Known verification gaps:
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
10. Explain to the owner in plain Vietnamese what is live, what can be tested, and what remains a prototype.
11. Keep this continuity brief current after each important commit and deployment.

## 8. Resume prompt

Paste this after the document when starting a new conversation:

"Đọc toàn bộ PROJECT_CONTINUITY_BRIEF.md và các tài liệu bắt buộc được nêu trong đó từ repo GitHub hiện tại. Kiểm tra commit main và GitHub Actions mới nhất. Tiếp tục từ trạng thái mới nhất trong brief: kiểm tra commit main và GitHub Actions mới nhất, xác minh bộ avatar nhân vật người dễ thương và phần hiển thị avatar/nickname trên trang chủ đã deploy chưa. Nếu CI lỗi thì sửa trực tiếp. Tiếp tục tích hợp thiết kế vào website chính, không để tính năng nằm tách riêng ở trang avatar. Tự làm toàn bộ phần kỹ thuật qua GitHub; không yêu cầu tôi dùng terminal, sửa code hay tải ZIP. Giữ nguyên các nguyên tắc cốt lõi của THE UNIVERSE."
