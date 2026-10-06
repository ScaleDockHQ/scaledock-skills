---
name: did-methods
description: >-
  DID methods: "@context": ["https://www.w3.org/ns/did/v1", "https://w3id.org/security/suites/secp256k1recovery-2020/v2"], Covers did:web, did:key, did:jwk, did:webvh. Use when resolving did:web, did:key, did:jwk, or did:webvh. Triggers: did:web, did:key, did:jwk, did:webvh.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# DID methods

"@context": ["https://www.w3.org/ns/did/v1", "https://w3id.org/security/suites/secp256k1recovery-2020/v2"],

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when resolving did:web, did:key, did:jwk, or did:webvh.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: did:web (default); did:key (default); did:jwk (default); did:webvh (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **document.** "A DID that uses this method MUST begin with the following prefix: did:web ."
2. **document.** "Per the DID specification, this string MUST be in lowercase."
3. **document.** "The method specific identifier MUST match the common name used in the SSL/TLS certificate, and it MUST NOT include IP addresses."
4. **document.** "A port MAY be included and the colon MUST be percent encoded to prevent a conflict with paths."
5. **document.** "Read (Resolve) The following steps MUST be executed to resolve the DID document from a Web DID: Replace ":" with "/" in the method specific identifier to obtain the fully qualified domain name and optional path."
6. **document.** "When performing the DNS resolution during the HTTP GET request, the client SHOULD utilize [[RFC8484]] in order to prevent tracking of the identity being resolved."
7. **document.** "2 or superceding, MUST be followed for delivery of a `did:web` document."
8. **document.** "TLS configuration MUST use at least SHA256, and SHOULD use SHA384, POLY1305, or stronger, depending on the needs of your operating environment."

## Workflow

1. **Pick the version.** Use the current line unless a named consumer needs a supported one. Do not author a legacy line. Emit a preview only when its posture is build and the user asked for that draft.
   -> [`references/versions.md`](references/versions.md)
   ✓ The target version is recorded, and it is not a legacy line.
2. **Apply the pinned requirements.** Walk the quotes in [`references/requirements.md`](references/requirements.md) and implement each one that applies to the role.
   -> [`references/requirements.md`](references/requirements.md)
   ✓ Each applicable quote is either implemented or recorded as out of scope for the role, with the heading it came from.
3. **Upgrade** (only when asked). Follow the upgrade section from the source line to the target.
   -> [`references/versions.md`](references/versions.md)
   ✓ The result cites the target line and no longer depends on a requirement that only the old line stated.

## Verify before done

- [ ] The artifact cites the target line's revision from [Sources](#sources).
- [ ] Every applicable quoted requirement in [`references/requirements.md`](references/requirements.md) holds.
- [ ] Nothing from a preview line is emitted unless its posture is build and the user opted in.

## Reference index

- **`references/versions.md`**: every version line, which one to use, and how to upgrade. Load for steps 1 and 3.
- **`references/requirements.md`**: quotes taken from the pinned specification. Load for step 2.

## Related skills

Install related spec skills by name with `npx skills add ScaleDockHQ/scaledock-skills --skill <name>`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [did:web](https://w3c-ccg.github.io/did-method-web/): Unofficial draft, did:web method, fetched 2026-10-06 (Unofficial draft, 2026-10-06), checked 2026-10-06.
- [did:key](https://raw.githubusercontent.com/w3c-ccg/did-method-key/main/README.md): Community draft, did:key method, fetched 2026-10-06 (Community draft, 2026-10-06), checked 2026-10-06.
- [did:jwk](https://raw.githubusercontent.com/quartzjer/did-jwk/main/spec.md): Community draft, did:jwk method, fetched 2026-10-06 (Community draft, 2026-10-06), checked 2026-10-06.
- [did:webvh](https://identity.foundation/didwebvh/v1.0/): DIF specification, did:webvh v1.0, fetched 2026-10-06 (DIF specification, 2026-10-06), checked 2026-10-06.
