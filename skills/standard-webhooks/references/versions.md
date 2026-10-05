# Versions and upgrades

Read this when choosing a target version, reading a webhook implementation written against an older copy of the specification, migrating a bespoke webhook scheme, or checking for a newer line. Sources: the specification at tag v1.0.2, its git history on `main`, the repository releases and the README, listed in [Sources](../SKILL.md#sources).

## Version lines

| Id    | Line                  | Status  | Revision                                                                                | Posture | Summary                                                                           |
| ----- | --------------------- | ------- | --------------------------------------------------------------------------------------- | ------- | --------------------------------------------------------------------------------- |
| `1.0` | Standard Webhooks 1.0 | current | Specification "Version: 1.0.0" at tag v1.0.2 (2026-02-18); text last changed 2025-02-16 |         | The default and only line. Headers and signature identifiers fixed at `v1`/`v1a`. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

## Which version to use

- Target Standard Webhooks 1.0. There is no other line.
- The repository tags `v1.0.0` (published 2025-12-31), `v1.0.1` and `v1.0.2` (both 2026-02-18) are library releases: the v1.0.0 release notes say version 1.0.0 of the libraries had shipped about a year earlier but was never tagged, and v1.0.1 lists library fixes only. The specification file itself has carried "Version: 1.0.0" since its first commit (2023-08-27) and did not change between the three tags.
- Individual libraries have their own package versions (for example the JavaScript package `standardwebhooks` is 1.1.1 on `main`). A library version is not a specification version.
- The README says the specification file on `main` is "the latest draft specification" and "the source of truth". Pin a tag for reproducibility, and diff `spec/` on `main` against it when refreshing.

## What changed

### Standard Webhooks 1.0

No pre-1.0 draft with different headers exists: the first committed text (2023-08-27) already used `webhook-id`, `webhook-timestamp`, `webhook-signature`, `v1`, `v1a`, `whsec_`, `whsk_` and `whpk_`. Edits since then, all under "Version: 1.0.0", are worth knowing when reading older implementations or blog posts:

- **2023-12-07, signature schemes.** The symmetric secret changed from "at least 24 bytes" to "between 24 bytes (192 bits) and 64 bytes (512 bits)". The advice flipped from "almost always … choose symmetric signatures" to "Prefer asymmetric signature schemes over symmetric ones", and added key distribution and the public-key trust list (Signature scheme, Additional considerations). Verification advice now says to use a battle-tested library for asymmetric signatures (Verifying signatures).
- **2023-12-13, header case.** `Retry-After` was written in lowercase, `retry-after`, matching HTTP/2 header names (Delivery success and failure).
- **2024, editorial.** The signed-content notation changed from `{msg_id}.{timestamp}.{payload}` to `msg_id.timestamp.payload` with the same meaning; the OWASP API7:2023 SSRF reference was added (Server side request forgery).
- **2025-02-16, payload timestamp.** The payload `timestamp` "should be ISO 8601 formatted" (Payload structure). The `webhook-timestamp` header stays integer Unix seconds.

The reference libraries implement only the symmetric `v1` scheme; none implements `v1a` verification as of `main` at 7537d2a. Since tag v1.0.2, the JavaScript and Python libraries gained an option to skip JSON parsing in `verify`, and libraries reject empty secrets.

## Upgrading

### Bespoke webhook scheme to Standard Webhooks 1.0

The specification's "Migrating to Standard Webhooks" section allows running both side by side:

1. Change the version marker: add the three Standard Webhooks headers next to your existing signature headers; do not remove the old ones, so existing consumers are not disrupted (Migrating to Standard Webhooks).
2. Replace removed or renamed fields: none need removing. Sign `msg_id.timestamp.payload` as in [`signing-and-verifying.md`](signing-and-verifying.md). An existing signing secret may be reused for both schemes; present it as `whsec_` plus base64 for Standard Webhooks (Migrating to Standard Webhooks, Signature scheme).
3. Validate against the target: verify a produced request with a reference library, and check that `webhook-id` is stable across retries and `webhook-timestamp` is updated per attempt.
4. Keep behaviour unchanged: payload migration is optional. If you do it, pick one strategy (Migrating the payload): add the new-format fields to existing payloads (easy and backwards compatible, but redundant); do that only for endpoints created before a switch-over date; or create a new event type per existing type that uses the new format.

### Older copy of the specification to the pinned revision

1. Treat any code that recommends symmetric over asymmetric signatures, or accepts symmetric secrets above 64 bytes, as written against the 2023 text; review it against the current Signature scheme section.
2. Format the payload `timestamp` as ISO 8601.
3. No header, signature identifier or secret prefix changes are needed.

## Preview

No preview line is published. The repository has no specification branch, tag or draft for a next version, and the specification's `Version:` line has not moved from 1.0.0. Watch the releases page and the `spec/` history on `main`; a new `Version:` value or a new signature identifier would start a new line.
