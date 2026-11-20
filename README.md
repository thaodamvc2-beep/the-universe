# THE UNIVERSE

**Website:** https://thaodamvc2-beep.github.io/the-universe/

The public website is built and deployed automatically from the Package 03 application by GitHub Actions whenever files under `THE_UNIVERSE_PACKAGE_03/` change on `main`.

## Current publishing source

- **Active website source:** `THE_UNIVERSE_PACKAGE_03/`
- **Web application:** `THE_UNIVERSE_PACKAGE_03/apps/web/`
- **Deployment workflow:** `.github/workflows/static.yml`

The other top-level project folders are retained as historical/run-test copies. They are not used by the public website workflow.

## Current release scope

This is the integrated public website preview: homepage, guest-first Earth prototype, real Solar System catalogue, and local avatar/nickname identity. It is ready for owner review; automated deployment does not replace manual desktop/mobile testing. It is not yet the complete backend-enabled THE UNIVERSE product. Real authentication/cloud sync, multiplayer, six-axis flight, AI world publishing and other server-backed systems remain outside this static GitHub Pages release.

## Current public routes

- Homepage: https://thaodamvc2-beep.github.io/the-universe/
- Earth prototype: https://thaodamvc2-beep.github.io/the-universe/prototype/
- Celestial catalogue: https://thaodamvc2-beep.github.io/the-universe/worlds/
- Avatar and nickname: https://thaodamvc2-beep.github.io/the-universe/avatar/
- Optional sign-in information: https://thaodamvc2-beep.github.io/the-universe/account/

Portable project handover: `THE_UNIVERSE_PACKAGE_03/docs/handoff/PROJECT_CONTINUITY_BRIEF.md`.

## Build and test locally

Use Node.js 22 or later and npm 10 or later. From `THE_UNIVERSE_PACKAGE_03/`:

```bash
npm install
npm run check
npm run build
```

See `THE_UNIVERSE_PACKAGE_03/README.md` and its `AGENTS.md` for project instructions and acceptance status.
