# THE UNIVERSE

**Website:** https://thaodamvc2-beep.github.io/the-universe/

The public website is built and deployed automatically from the Package 03 application by GitHub Actions whenever files under `THE_UNIVERSE_PACKAGE_03/` change on `main`.

## Current publishing source

- **Active website source:** `THE_UNIVERSE_PACKAGE_03/`
- **Web application:** `THE_UNIVERSE_PACKAGE_03/apps/web/`
- **Deployment workflow:** `.github/workflows/deploy-pages.yml`

The other top-level project folders are retained as historical/run-test copies. They are not used by the public website workflow.

## Current release scope

This is the public Package 03 homepage and interactive 3D prototype. It is not yet the complete THE UNIVERSE product. Server-backed features (accounts, persistent saves, AI generation, and other backend-dependent services) are not part of this static GitHub Pages release.

## Build and test locally

Use Node.js 22 or later and npm 10 or later. From `THE_UNIVERSE_PACKAGE_03/`:

```bash
npm install
npm run check
npm run build
```

See `THE_UNIVERSE_PACKAGE_03/README.md` and its `AGENTS.md` for project instructions and acceptance status.
