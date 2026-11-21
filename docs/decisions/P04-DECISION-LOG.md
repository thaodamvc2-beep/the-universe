# THE UNIVERSE — GÓI 04 DECISION LOG

**Version:** 1.1  
**Date:** 2026-11-20  
**Authority:** Owner's explicit Package 04 instruction.

## P04-D01 — Guest-first identity creation

- **Status:** DECIDED BY OWNER.
- **Decision:** Automatically create a guest avatar and nickname on first entry. Do not require registration.
- **Rationale:** A visitor should begin exploring immediately and receive a personal identity without an account barrier.

## P04-D02 — Avatar selection

- **Status:** DECIDED FOR INITIAL RELEASE.
- **Decision:** Provide six distinct, friendly, cute human-style animated-film character portraits, each with its own face, hairstyle, outfit and color identity. Guests can switch freely.
- **Visual source:** Original AI-generated artwork is bundled locally in `apps/web/public/avatars/celestial-avatars.webp`; no runtime third-party image request is required.
- **Integration:** The selected character and nickname appear on the main homepage and shared site navigation, not only on the avatar editor page.
- **Boundary:** This is a lightweight 2D portrait identity presentation, not a final rigged/animated 3D avatar system or marketplace.

## P04-D03 — Nickname

- **Status:** DECIDED FOR INITIAL RELEASE.
- **Decision:** The guest chooses and edits a nickname. A generated guest nickname is supplied by default. A real name is never required.
- **Initial validation:** 2–20 Unicode characters after trimming; letters, combining marks, numbers, spaces, underscore and hyphen only.
- **Limitation:** Local prototype cannot guarantee global uniqueness or authoritative moderation.

## P04-D04 — Persistence

- **Status:** DECIDED FOR INITIAL RELEASE.
- **Decision:** Persist the guest ID, avatar ID and nickname locally on the device using a versioned browser storage contract.
- **Deferred:** Cloud account sync, cross-device persistence and account merge remain out of scope until the relevant account/data package.

## P04-D05 — Optional sign-in

- **Status:** OWNER REQUIREMENT; AUTHENTICATION DEFERRED.
- **Decision:** Keep optional sign-in discoverable. Until authentication is implemented, show a transparent account information page stating that sign-in and cloud sync are not yet available. Never display a fake successful login.

## P04-D06 — Shared presence and privacy

- **Status:** FIXED PRODUCT INVARIANT.
- **Decision:** In future shared spaces, only avatar and nickname may be visible for another real user. No social network or messaging features.
- **Deferred:** Actual multiplayer synchronization and room rules belong to Gói 14.

## Change record

| ID | Date | Change | Status |
|---|---|---|---|
| P04-CH-01 | 2026-11-20 | Reopened Gói 04 after the owner superseded the temporary deferral and explicitly requested implementation before overall website integration. | Authorized |
| P04-CH-02 | 2026-11-20 | Owner clarified that avatars must be cute human characters rather than abstract glowing orbs, and that the selected character must be integrated into the main website design. Replaced the six orb placeholders with original locally bundled character portraits and added persistent homepage/header presence. | Implemented; deployment verification pending |
