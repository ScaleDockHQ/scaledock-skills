# Versions and upgrades

Read this when choosing a target version, reading a deployment built for FAPI 1.0, planning a migration, or deciding whether to use a draft. Sources: the FAPI 2.0 Security Profile (SP), Message Signing and Attacker Model, FAPI 1.0 Part 1 and Part 2, and the FAPI WG specifications page, all listed in [Sources](../SKILL.md#sources).

## Version lines

| Id    | Line     | Status  | Revision                                                                                                | Posture | Summary                                                                                               |
| ----- | -------- | ------- | ------------------------------------------------------------------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------- |
| `2.0` | FAPI 2.0 | current | Security Profile and Attacker Model Final (22 February 2025); Message Signing Final (25 September 2025) |         | The default target. PAR, PKCE, sender-constrained tokens, and an attacker model with formal analysis. |
| `1.0` | FAPI 1.0 | legacy  | Part 1 Baseline and Part 2 Advanced Final (12 March 2021)                                               |         | Superseded by 2.0. Read and migrate from it; build it only where an ecosystem still mandates it.      |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

FAPI 1.0 Part 1 and Part 2 are one line: Advanced builds on Baseline. FAPI 2.0 Message Signing is an optional part of the 2.0 line, not a separate line. FAPI-CIBA and Grant Management are separate specifications with their own Implementer's Drafts; see [`ciba-and-grant-management.md`](ciba-and-grant-management.md).

## Which version to use

- Default to FAPI 2.0: the Security Profile, plus Message Signing when non-repudiation is needed. The FAPI WG strongly recommends that all new ecosystems adopt FAPI 2.0, and that existing FAPI 1.0 ecosystems plan a transition (FAPI WG specifications page).
- FAPI 1.0 is legacy. Build or change a FAPI 1.0 deployment only when a named ecosystem profile still mandates it, and record that ecosystem. The rules are in [`fapi-1.md`](fapi-1.md).
- An ecosystem profile on top of FAPI 2.0 may add rules but shall not remove mandatory behaviour (SP §5.1.2).
- Emit nothing from a draft unless its posture allows it; the drafts are listed under [Preview](#preview).

## What changed

### FAPI 2.0

The Security Profile lists the main differences from FAPI 1.0 Advanced in a table (SP §5.5); [`fapi-1.md`](fapi-1.md) reproduces it with the reasons given. In short:

- Pushed authorization requests replace front-channel request objects (SP §5.3.2.2, §5.5).
- `response_type=code` only, with PKCE S256 and the RFC 9207 `iss` response parameter; `code id_token`, the ID token as detached signature and `s_hash` are gone (SP §5.3.2.2, §5.5).
- Sender-constraining with mTLS or DPoP, where FAPI 1.0 Advanced allowed only mTLS (SP §5.3.2.1, §5.5).
- Only confidential clients, authenticated with mTLS or `private_key_jwt`; `client_secret_jwt` and public clients are dropped (SP §5.3.2.1).
- A limited `request_uri` lifetime replaces `nbf` and `exp` in the request object, and authorization codes live at most 60 seconds (SP §5.3.2.1, §5.3.2.2, §5.5).
- Redirect URIs can be sent in PAR instead of being pre-registered (SP §5.5).
- EC keys are at least 224 bits, up from 160, and EdDSA with Ed25519 is allowed next to PS256 and ES256 (SP §5.4.1; FAPI 1.0 Part 1 §5.2.2).
- The `x-fapi-*` headers move to implementation advice (SP §5.5).
- Security goals come from the Attacker Model rather than defences against listed threats (SP §5.5; Attacker Model).
- Signed request objects, JARM, signed introspection responses and ID token verification remain available through Message Signing (Message Signing §5.3 to §5.6).

### FAPI 1.0

The first FAPI line. Part 1 (Baseline) sets PKCE S256, exact redirect URI matching and `x-fapi-interaction-id` (Part 1 §5.2.2, §6.2.1). Part 2 (Advanced) adds signed request objects, the ID token as detached signature or JARM, and mTLS sender-constrained tokens (Part 2 §5.1, §5.2.2, §6.2.1).

## Upgrading

### 1.0 to 2.0

The full migration list, with every difference and its reason, is in [`fapi-1.md`](fapi-1.md) under "Differences from FAPI 2.0" and "Migration checklist". Follow it in this order:

1. Change the version marker: record FAPI 2.0 Security Profile (and Message Signing, if used) as the target in the ecosystem profile, AS metadata documentation and certification plan.
2. Replace removed or renamed parts:
   - Front-channel request objects become PAR (SP §5.3.2.2). Keep JAR at the PAR endpoint only if Message Signing is adopted (Message Signing §5.3).
   - `code id_token` becomes `code` with PKCE S256 and the `iss` check (SP §5.3.2.2, §5.3.3.2).
   - `client_secret_jwt` and public clients are removed; keep `private_key_jwt` or mTLS (SP §5.3.2.1).
   - Codes live at most 60 seconds, and `request_uri` `expires_in` is under 600 seconds (SP §5.3.2.1, §5.3.2.2).
   - EC keys under 224 bits, RS256 and `none` are refused (SP §5.4.1).
3. Validate against the target: run the OpenID conformance suite FAPI 2.0 test plans for each configured variant (see [`certification.md`](certification.md)).
4. Keep behaviour unchanged: the same clients reach the same resources with the same consent. Keep mTLS sender-constraining where it already works, and keep `x-fapi-*` headers where the ecosystem profile still requires them.

## Preview

No preview is listed. No draft of a FAPI line after 2.0 has been published: the FAPI WG specifications page lists FAPI 2.0 and FAPI 1.0 as the two families.

Drafts that are not a next line:

- **FAPI 2.0 Http Signatures** is listed under Drafts on the FAPI WG specifications page. It is an addition to the 2.0 family for signing and verifying messages, not a FAPI 3.0, and this skill does not pin it. Do not emit it.
- **FAPI-CIBA** and **Grant Management** are Implementer's Drafts of separate specifications, with their own posture in [`ciba-and-grant-management.md`](ciba-and-grant-management.md).

When the working group publishes a draft of a next FAPI line, add it here as a preview with its posture. When it ships, make it current, make FAPI 2.0 supported, and add a "2.0 to next" upgrade section.
