---
name: acme
description: >-
  ACME (RFC 8555): automate certificate issuance, renewal and revocation with an ACME server. Covers RFC 8555 Automatic Certificate Management Environment (ACME), RFC 9773 ACME Renewal Information (ARI) Extension. Use when issuing certificates with ACME. Triggers: ACME, RFC 8555.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.1.0"
  kind: standard
---

# Automatic Certificate Management Environment (ACME)

Automatic Certificate Management Environment (ACME)

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when issuing certificates with ACME.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: RFC 8555 Automatic Certificate Management Environment (ACME) (default); RFC 9773 ACME Renewal Information (ARI) Extension (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **RFC 8555 § 6.2.** "All ACME requests with a non-empty body MUST encapsulate their payload in a JSON Web Signature (JWS) [RFC7515] object, signed using the account's private key unless otherwise specified."
2. **RFC 8555 § 6.2.** "An ACME server MUST implement the "ES256" signature algorithm [RFC7518] and SHOULD implement the "EdDSA" signature algorithm using the "Ed25519" variant (indicated by "crv") [RFC8037]."
3. **RFC 8555 § 6.5.** "Every JWS sent by an ACME client MUST include, in its protected header, the "nonce" header parameter, with contents as defined in Section 6.5.2."
4. **RFC 8555 § 6.5.** "Once a nonce value has appeared in an ACME request, the server MUST consider it invalid, in the same way as a value it had never issued."
5. **RFC 8555 § 7.1.** "The server MUST provide "directory" and "newNonce" resources."
6. **RFC 8555 § 7.4.** "The CSR MUST indicate the exact same set of requested identifiers as the initial newOrder request."
7. **RFC 8555 § 11.1.** "Clients MUST generate a fresh account key for every account creation or rollover operation."
8. **RFC 8555 § 11.1.** "In particular, when a server receives a finalize request, it MUST verify that the public key in a CSR is not the same as the public key of the account key pair used to authenticate that request."
9. **RFC 9773 § 4.2.** "Clients MUST attempt renewal at a time of their choosing based on the suggested renewal window."
10. **RFC 9773 § 5.** "Clients SHOULD include this field in newOrder requests if there is a clear predecessor certificate, as is the case for most certificate renewals."

## Workflow

1. **Pick the version.** Use the current line unless a named consumer needs a supported one. Do not author a legacy line. Emit a preview only when its posture is build and the user asked for that draft.
   -> [`references/versions.md`](references/versions.md)
   ✓ The target version is recorded, and it is not a legacy line.
2. **Apply the pinned requirements.** Walk the quotes in [`references/requirements.md`](references/requirements.md) and implement each one that applies to the role.
   -> [`references/requirements.md`](references/requirements.md)
   ✓ Each applicable quote is either implemented or recorded as out of scope for the role, with the section it came from.
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

- [RFC 8555 Automatic Certificate Management Environment (ACME)](https://www.rfc-editor.org/rfc/rfc8555.html): PROPOSED STANDARD, RFC 8555 (PROPOSED STANDARD, March 2019), checked 2026-10-06.
- [RFC 9773 ACME Renewal Information (ARI) Extension](https://www.rfc-editor.org/rfc/rfc9773.html): PROPOSED STANDARD, RFC 9773 (PROPOSED STANDARD, June 2025), checked 2026-10-06.
