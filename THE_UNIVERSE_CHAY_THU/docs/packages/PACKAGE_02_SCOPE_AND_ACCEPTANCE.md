# THE UNIVERSE — PACKAGE 02 SCOPE & ACCEPTANCE

**Document:** `docs/packages/PACKAGE_02_SCOPE_AND_ACCEPTANCE.md`
**Version:** 1.1
**Created:** 2026-11-19
**Package:** 02 — Website Foundation
**Status:** PROVISIONALLY APPROVED FOR TRANSITION — FINAL TECHNICAL VERIFICATION PENDING
**Authority:** Owner's explicit authorization in the project conversation dated 2026-11-19, following approval of Master Spec v1.1.

## 1. Objective

Create a clean, reproducible web application foundation for THE UNIVERSE. Establish the repository layout, application runtime, minimal app shell, environment conventions, baseline security headers, quality checks, CI workflow, container deployment recipe, and operational documentation.

This package is infrastructure and application foundation only. It does not deliver the actual exploration homepage or any downstream product system.

## 2. Inputs and prerequisites

- `AGENTS.md` v1.0 — project-wide constraints.
- `AI_SESSION_START.md` v1.0 — mandatory session-start procedure.
- `docs/architecture/THE_UNIVERSE_MASTER_SPEC.md` v1.1 — Approved Gói 01 baseline.
- Owner's explicit Gói 02 authorization and permission to author this scope document and make relevant technical decisions.
- No earlier accepted code package exists in the supplied project workspace.

## 3. In scope

1. Initialize a clean Git repository and a web application workspace.
2. Establish Next.js App Router + React + TypeScript baseline.
3. Create a minimal responsive, accessible application shell that communicates foundation status only.
4. Provide loading, not-found, and error boundaries.
5. Provide a minimal health endpoint that reveals no secrets and is not cacheable.
6. Establish environment variable conventions and safe example configuration.
7. Configure baseline HTTP security headers and disable framework fingerprint header.
8. Configure lint, typecheck, foundation tests, production build scripts, and CI workflow.
9. Provide a Docker deployment recipe using Next.js standalone output.
10. Document local development, checks, production startup, scope boundaries, and decisions.
11. Preserve the approved product invariants and include mandatory project instructions in the repository.

## 4. Explicitly out of scope

- Product homepage, onboarding, language selector or localization implementation (Gói 03).
- Mobile 3D prototype or 3D engine selection (Gói 03; D01 remains pending).
- Avatar, nickname, guest session lifecycle or account identity features (Gói 04 and Gói 13).
- Celestial data, real/fictional celestial catalog (Gói 05).
- Cosmic map and navigation implementation (Gói 06).
- 3D visual system and assets (Gói 07).
- Flight, camera and mobile controls (Gói 08 and Gói 09).
- AI world generation (Gói 10).
- Rest, wishes and audio (Gói 11 and Gói 12).
- Database schema, Supabase Auth, storage, guest persistence or account merge (Gói 13).
- Colyseus, realtime rooms, room assignment, presence or player synchronization (Gói 14).
- Production release qualification, device performance certification, full security audit and integrated QA (Gói 15).
- Admin application and realtime-server application. Their repository boundaries remain reserved by the Master Spec; they are not bootstrapped in this package.

## 5. Technical decisions and rationale

### 5.1 D02 — web/backend direction (package-level decision)

**Decision:** Use Next.js App Router + React + TypeScript as the web application platform. Retain Supabase + PostgreSQL as the selected backend direction for later data-service packages, without connecting or provisioning them in Package 02.

**Rationale:** This follows the Master Spec's proposed stack, gives a single integrated web framework with server/client boundaries and route handlers, supports standalone deployment, and avoids creating a premature data/auth dependency before the relevant account/data package.

**Consequences:**
- Next.js is the web runtime baseline for subsequent web packages.
- PostgreSQL/Supabase remain the intended persistence/backend direction, but schema, project provisioning, RLS, authentication, storage and secrets are deferred to their relevant package specifications.
- The real-time service remains a separate authoritative service; no database-backed movement loop is introduced.

### 5.2 Decisions intentionally not made here

| Decision | Package 02 treatment | Reason |
|---|---|---|
| D01 — 3D engine | Pending | Must be compared in the real-device prototype in Gói 03. |
| D03 — multiplayer engine | Pending | Gói 02 does not implement realtime rooms; retain Colyseus as candidate only. |
| D04 — visual direction | Pending | Product visual system is downstream; shell styling is deliberately restrained and provisional. |
| D05 — default camera | Pending | No 3D camera in this package. |
| D06 — touch controls | Pending | No movement controls in this package. |
| D07 — gravity behavior | Pending | No world physics in this package. |
| D08 — rest locations | Pending | Rest system is downstream. |
| D09 — wish lifecycle | Pending | No wish system or wish data in this package. |
| D10 — avatar library | Pending | No avatar system in this package. |
| D11 — AI location approval | Pending | No AI generation or publication in this package. |
| D12 — languages | Pending | Language foundation is part of Gói 03; no language contract is prematurely locked. |
| D13 — room capacity presentation | Product invariant retained; implementation deferred | No rooms or player presence in this package. |
| D14 — full-room behavior | Pending | No room allocation in this package. |

## 6. Repository structure and allowed changes

Package 02 may create or change:

- Root configuration: `package.json`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`, `.gitignore`, `.env.example`, `next-env.d.ts`.
- `apps/web/src/app/**` and `apps/web/src/lib/**` for foundation shell, boundaries and health route only.
- `.github/workflows/**` for CI.
- `infrastructure/deployment/**` for the web deployment recipe.
- `tests/**` for foundation checks.
- `docs/packages/**`, `docs/decisions/**`, and project documentation change records.
- Empty reserved directories matching the approved monorepo proposal.

No downstream domain module may be implemented or preemptively created beyond reserved empty directories.

## 7. Deliverables

- Clean repository initialized with Git.
- Next.js/React/TypeScript application shell.
- Loading, error and not-found states.
- `/api/health` endpoint.
- Environment template and security-header baseline.
- Lint/typecheck/test/build scripts.
- CI workflow and Dockerfile.
- README with Windows and cross-platform run instructions.
- Decision log and updated Master Spec change/status record.

## 8. Acceptance criteria

| ID | Criterion | Evidence / verification |
|---|---|---|
| P02-AC-01 | Repository contains mandatory project instructions and approved Master Spec | File presence and content review |
| P02-AC-02 | Next.js App Router, React and TypeScript dependencies/configuration exist | `package.json`, `tsconfig.json`, app route structure |
| P02-AC-03 | App shell is responsive and has accessible main landmark, heading, skip link and status | Source review; browser review recommended |
| P02-AC-04 | Loading, error and not-found boundaries exist | App Router boundary files |
| P02-AC-05 | Health endpoint returns status metadata and no secrets; response is no-store | Source test; HTTP test after dependencies installed |
| P02-AC-06 | Baseline security headers are configured | `next.config.ts` source test; response-header check after launch |
| P02-AC-07 | Lint, typecheck, test and production build commands are defined | `package.json` |
| P02-AC-08 | CI installs dependencies and runs quality checks and production build | `.github/workflows/ci.yml` review and CI run |
| P02-AC-09 | Docker uses standalone production output and non-root runtime user | Dockerfile review; image build pending dependency installation |
| P02-AC-10 | No prohibited social features or downstream package systems are implemented | Scope/source review |
| P02-AC-11 | No unlicensed third-party media/assets are introduced | Asset directory review |
| P02-AC-12 | README explains install, run, tests, production and Docker | README review |
| P02-AC-13 | Master Spec records Gói 02 authorization, D02 and package status | Master Spec changelog/status + decision log |

## 9. Test plan and actual execution record

### Required local commands

```bash
npm install
npm run lint
npm run typecheck
npm test
npm run build
```

### Actual execution in the preparation environment

| Check | Result | Notes |
|---|---|---|
| `node --version` | PASS | Node.js v22.16.0 available. |
| `npm --version` | PASS | npm 10.9.2 available. |
| `git --version` | PASS | Git 2.47.3 available. |
| `npm view next version` | BLOCKED | Registry request timed out; external package registry unavailable in this environment. |
| `npm install --ignore-scripts --no-audit --no-fund` | BLOCKED | Attempted; command timed out because npm registry access was unavailable. No `node_modules` or lockfile generated. |
| `npm run lint` | NOT RUN | Dependencies not installed. |
| `npm run typecheck` | NOT RUN | Dependencies not installed. |
| `npm run build` | NOT RUN | Dependencies not installed. |
| Foundation tests (`node --test tests/*.test.mjs`) | PASS | 5 tests passed, 0 failed using Node.js v22.16.0. |
| Docker build | NOT RUN | Requires dependency installation and Docker daemon. |
| Browser/device verification | NOT RUN | Requires launched app and real devices. |

The package must not be described as fully runtime-verified until the dependency-based commands and browser checks are run. Source-level tests are supplemental and do not replace Next.js build or browser verification.

## 10. Known limitations and risks

- Dependency installation and Next.js build could not be executed in the authoring environment because the npm registry request timed out.
- No `package-lock.json` is included; generate and commit it after a successful `npm install` in an environment with registry access.
- Hosting provider, production domain, environment secrets, Supabase project and production monitoring are not configured.
- Dockerfile is provided but not built or executed in this environment.
- At Gói 02 handover, the homepage was a technical placeholder; Gói 03 now replaces it with the first entry experience. The Gói 03 visual direction remains provisional.
- Accessibility and responsive behavior have source-level foundations but require browser and device review.

## 11. Handover and acceptance status

**Package status:** PROVISIONALLY APPROVED FOR TRANSITION — FINAL TECHNICAL VERIFICATION PENDING.

**Owner decision (2026-11-19):** “Tạm thời phê duyệt Gói 02 để mở tiếp Gói 03 có giao diện trực quan rồi tôi chạy kiểm tra một thể.” This is explicit provisional approval to proceed to Gói 03. It does not mean the outstanding dependency installation, lint, typecheck, production build, Docker or browser/device checks have passed. Those checks remain open for the owner’s combined review.

No Gói 02 acceptance tag is created at this provisional stage. Final technical acceptance and checkpoint can be recorded after the outstanding checks are run and reviewed. Gói 03 is separately authorized by the same owner instruction and is scoped in `PACKAGE_03_SCOPE_AND_ACCEPTANCE.md`.
