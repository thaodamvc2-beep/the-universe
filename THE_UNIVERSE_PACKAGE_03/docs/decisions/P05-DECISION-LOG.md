# THE UNIVERSE — Gói 05 Decision Log

**Version:** 1.1  
**Date:** 2026-11-20  
**Authority:** Owner-approved delivery-sequence adjustment and Gói 05 authorization.

## P05-D01 — Canonical celestial catalogue format

- **Status:** DECIDED FOR Gói 05.
- **Decision:** Store the initial release catalogue as a version-controlled JSON data asset in the web application.
- **Reason:** The current Solar System catalogue is read-only canonical content. A static, typed-at-import data source is sufficient for GitHub Pages and avoids introducing an unapproved database or backend dependency.
- **Deferred:** Database persistence and admin editing belong to later authorized packages.

## P05-D02 — Real/fictional classification

- **Status:** DECIDED FOR INITIAL RELEASE.
- **Decision:** All ten initial records (Sun, eight planets, Earth's Moon) use `REAL_ASTRONOMICAL`.
- **Reason:** The initial catalogue contains only real Solar System bodies. Fictional and AI-generated records must use separate classifications and remain unpublished until the required human review and owner approval process is defined and authorized.

## P05-D03 — Reference precision and sources

- **Status:** DECIDED FOR INITIAL RELEASE.
- **Decision:** Present rounded mean orbital distances in AU and radii relative to Earth, with NASA Solar System Exploration reference links.
- **Limitation:** These values are educational reference values, not real-time ephemerides, navigation coordinates, or a high-precision orbital model.

## P05-D04 — Home World invariant

- **Status:** FIXED PRODUCT INVARIANT.
- **Decision:** Earth is the sole record marked as Home World and is the default selected catalogue entry. No other celestial body may replace it.

## Change record

| ID | Date | Change | Status |
|---|---|---|---|
| P05-CH-01 | 2026-11-20 | Created the initial Solar System catalogue contract and bilingual catalogue presentation under the owner-authorized Gói 05. | Recorded |
| P05-CH-02 | 2026-11-20 | 10 celestial records and bilingual detail data delivered; 11 package-scoped tests, lint, typecheck, production build and GitHub Pages deployment passed. Manual browser/device review remains for owner review. | READY FOR OWNER REVIEW — NOT ACCEPTED |
