# THE UNIVERSE — PROJECT CONTINUITY BRIEF

**Updated:** 2026-11-20  
**Purpose:** Copy this entire document into a new ChatGPT conversation to resume project work without reconstructing decisions from memory.

## 1. Owner's current instruction

The owner explicitly instructed on 2026-11-20:

- Provisionally accept all existing packages Gói 01–06.
- Consolidate everything into one guest-first web game; opening the root page enters the game directly.
- Integrate the previously designed six avatars and saved nickname; add six-axis flight, travel between worlds, landing, and new viewpoints from other worlds.
- Include the spacecraft-explored planets and representative moons, dwarf planets, asteroids and comets; distinguish real objects from fictional worlds.
- Expand the universe continuously using local procedural generation; do not call paid AI APIs or display AI connection notices. Keep optional ambient sound. Multiplayer remains a separate later backend feature.
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
- Real astronomical objects must be distinguished from locally generated fictional worlds.
- Procedural worlds are generated entirely in the browser from spatial coordinates; they must be labelled fictional and must never be presented as real astronomical data.
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
- Gói 04: previously deferred, then explicitly reopened and authorized by the owner on 2026-11-20. The owner clarified that avatars must be cute human characters, not abstract orbs, and that the selected avatar must be integrated into the main website. The six abstract orb placeholders have now been replaced by six original locally bundled 3D animated-film-style human character portraits (Luna, Noah, Rosie, Milo, Ivy, Stella). The selected avatar and nickname appear in the homepage hero and shared site header, while the avatar editor retains selection and nickname editing. Existing stable avatar IDs and local guest data remain compatible. This visual revision is implemented and deployed; current CI remains green.
- Gói 05: implemented and deployed; Solar System catalogue includes Sun, eight planets and Earth's Moon, bilingual details, NASA references and Earth as sole Home World. Provisionally accepted by the owner with corrections allowed; manual browser/device review remains open.
- Gói 06: implemented and deployed as an integrated schematic Solar System navigation map. The map is the guest-first homepage (`/`) and also available at `/map/`; it uses canonical Gói 05 IDs, shows avatar/nickname, supports destination selection/details, simulated route preview and Earth recovery. It does NOT implement actual travel, six-axis flight, planetary surface exploration or production 3D universe rendering. GitHub Actions run 44700029296 passed 23/23 tests, ESLint, TypeScript, production build and GitHub Pages deployment. Manual desktop/mobile visual review remains outstanding. Code verification commit: 0bfbade4a3d3e095c80b78743f1760414fd741ca.
- Unified game homepage: [GitHub Pages](https://thaodamvc2-beep.github.io/the-universe/) — opens directly into the 3D Earth scene. Avatar movement: WASD/arrow keys or on-screen directional buttons; drag to rotate the camera. The player's saved nickname appears in the HUD. The Earth rotates slowly and the Moon orbits nearby.
- Canonical map: `/map/`; celestial catalogue: `/worlds/`; avatar editor: `/avatar/`.
- Gói 07: explicitly authorized on 2026-11-20 and in progress. Current deployed code supports six-axis flight, slow cruise, collision-aware movement, takeoff, destination approach, gentle automatic landing on supported solid bodies, seated rest and walking on curved surfaces, Earth return, 42 real destinations and coordinate-seeded procedural fictional regions generated locally as the player travels. Planet names are readable in-scene; lighting originates at the Sun and camera orientation follows the player's local surface normal. Earth is smaller and the Solar System is compressed for an opening panoramic view; the scale is intentionally not astronomical distance scale. The avatar reuses the six stable IDs and guest nickname; the 3D suit palette follows the selected avatar and the portrait remains in the HUD.
- Owner explicitly rejected paid AI API calls for region generation. The AI button, notices and runtime endpoint calls have been removed. No AI backend is required for procedural exploration. Multiplayer remains an optional WebSocket adapter and is not live until a secure realtime server is provisioned. The backend contract is documented in `docs/architecture/UNIVERSE_BACKEND_CONTRACT.md`.
- Latest confirmed deployed game revision: [GitHub Actions run 44712919413](https://github.com/thaodamvc2-beep/the-universe/actions/runs/44712919413), success; 30 tests, ESLint, TypeScript, static build and GitHub Pages deployment passed at commit `e163ad5537ba8223c9173562b72b9ca2009fbf3e`. This revision removes all AI-generation UI/API calls and implements local procedural sectors, slower collision-aware flight, soft landing, surface rest/walking, celestial labels and Sun-position lighting.
- Gói 08+ is not authorized.

Important: The owner explicitly chose local procedural generation instead of paid AI API calls. Do not reintroduce AI-generation controls, notices or network calls. Six-axis slow flight, collision avoidance, gentle landing, seated rest/walking, in-scene celestial labels and location-dependent lighting are implemented; manual review of this revision is pending. Multiplayer still needs a real realtime server. Real authentication/cloud sync remain deferred.

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
- Optional multiplayer backend contract only: `docs/architecture/UNIVERSE_BACKEND_CONTRACT.md`.

Latest integrated release evidence:
- Unified playable game homepage deployment: [GitHub Actions run 44701854209](https://github.com/thaodamvc2-beep/the-universe/actions/runs/44701854209) — success; 23 tests, ESLint, TypeScript, static production build and GitHub Pages deployment passed. Latest game code commit: `0e8bcf611ce970ac361e6a991898028605ab63e8`.
- The homepage game is live at `https://thaodamvc2-beep.github.io/the-universe/`.
- Latest Gói 07 refinement commit `e163ad5537ba8223c9173562b72b9ca2009fbf3e` is deployed by run 44712919413.
- Previous integrated release commit: `18945ff5845e792c2b69bd901397237ca268d475`.
- Previous GitHub Actions run: [44661753954](https://github.com/thaodamvc2-beep/the-universe/actions/runs/44661753954) — success, 18 tests, lint, typecheck, static build and GitHub Pages deployment.
- - Latest visual revision commit: `90cee727c5afee42362bb873501b62714a1744a3`.
- GitHub Actions run: [44671828808](https://github.com/thaodamvc2-beep/the-universe/actions/runs/44671828808) — success.
- 19 automated tests passed, 0 failed; ESLint, TypeScript, static build and GitHub Pages deployment passed.
- Live site: https://thaodamvc2-beep.github.io/the-universe/ . The browsing tool could not independently load the Pages URL, so owner visual review remains the final check.

Known verification gaps:
- Legacy Gói 02 tests assume dynamic Cache-Control and configurable HTTP security headers; static GitHub Pages cannot provide these response headers. These failures must remain documented, not falsely marked as passing.
- The owner reported the previous version looked acceptable on desktop and mobile. The newly updated flight, landing and panoramic view still need direct owner review on both device types.
- Current public site is a static, locally procedural 3D exploration game. Networked multiplayer and cloud authentication are not live.

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


## 9. Latest owner-directed refinement (2026-11-20)

- No paid AI API calls for universe generation. The UI has no AI creation button or AI connection warning. Procedural generation is local, deterministic and based on spatial coordinates.
- Slow observation-focused flight, collision avoidance, gentle automatic landing, seated idle pose, standing surface movement, readable planetary labels, Sun-position lighting and local camera orientation are included.
- Earth was reduced slightly and planetary display distances compressed for a wider opening view; this is a stylized game scale, not a true-to-scale astronomical chart.
- Confirmed deployment: commit `e163ad5537ba8223c9173562b72b9ca2009fbf3e`, run 44712919413; 30 tests, lint, typecheck, build and Pages deploy passed. Owner visual review of this new revision is pending.
