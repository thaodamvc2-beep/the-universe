# THE UNIVERSE — Gói 02 Decision Log

**Version:** 1.1
**Date:** 2026-11-19
**Authority:** Owner delegated technical decisions relevant to Gói 02.

## P02-D02 — Web and backend direction

- **Related Master Spec decision:** D02.
- **Status:** DECIDED FOR THE PLATFORM DIRECTION; data-service implementation deferred.
- **Decision:** Next.js App Router + React + TypeScript for the web application. Supabase + PostgreSQL remain the backend/persistence direction for later packages.
- **Reason:** Matches the approved Gói 01 candidate architecture, supports a unified web application and server route handlers, and avoids premature auth/database coupling in the foundation package.
- **Implemented in Gói 02:** Next.js app scaffold, app shell, route handler, build configuration, quality tooling and deployment recipe.
- **Deferred:** Supabase provisioning, PostgreSQL schema, Row Level Security, authentication, storage, guest persistence, account merge and secrets. These require the appropriate package scope and acceptance gates.
- **Impact:** Later web packages should build on Next.js App Router. Data packages should integrate via typed service boundaries and must not allow the 3D runtime to access the database directly.
- **Rollback/change control:** Any framework/backend replacement requires a documented architecture change, compatibility assessment and owner approval.

## Decisions not made by Gói 02

D01 and D03–D14 remain pending as recorded in Master Spec v1.1, except fixed product invariants that are not open decisions. D01 specifically remains open until Gói 03 compares 3D engines on real mobile devices. D12 remains open until the language foundation is specified in Gói 03.

## Change record

| ID | Date | Change | Status |
|---|---|---|---|
| P02-CH-01 | 2026-11-19 | Created Package 02 scope and acceptance record under owner delegation; recorded Gói 02 authorization and package-level D02 decision. | Recorded |
| P02-CH-02 | 2026-11-19 | Owner provisionally approved Gói 02 for transition to Gói 03; dependency installation, lint, typecheck, production build and browser/device verification remain open for combined review. | PROVISIONAL APPROVAL — TECHNICAL VERIFICATION PENDING |
