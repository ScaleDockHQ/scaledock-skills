---
name: notary-project
description: >-
  Notary Project: sign and verify OCI artifacts with Notation signatures and trust policies. Covers Notation signature specification. Use when signing OCI artifacts with Notation. Triggers: Notation, Notary.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.1.0"
  kind: standard
---

# Notary Project

The Notary Project specifications for signing OCI artifacts: the signature specification (envelope, signed and unsigned attributes, signature manifest, certificate requirements), the trust store and trust policy specification, and the signing and verification workflow, read from the notaryproject/specifications repository at release v1.1.0.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text, labelled with the section they come from. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: Signer that produces Notary Project signatures, or verifier (such as Notation or an admission controller) that evaluates them against a trust policy.
- Target version: Notation signature specification (current). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher for a newer revision or version line.

## Invariants

1. **Extended attributes.** "These attributes MAY be marked critical, i.e. the attribute MUST be understood and processed by a verifier, unknown critical attributes MUST cause signature verification to fail."
2. **Unsigned Attributes.** "The certificate chain MUST be authenticated against a trust store as part of signature validation."
3. **Other requirements.** "Any certificate in the certificate chain MUST NOT use SHA1WithRSA and ECDSAWithSHA1 signatures."
4. **Selecting a trust policy to verify a signed OCI artifact.** "If there exists a trust policy whose scope contains the artifact's repository URI then the aforementioned policy MUST be used for signature evaluation."
5. **Verification Prerequisites.** "The user must resolve the `latest` tag to a digest and construct a new artifact reference using the resolved digest `wabbit-networks.io/software@sha256:${digest}`."

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
- [ ] Each verified artifact is referenced by digest, and the trust policy that applies to its repository names a trust store and trusted identities.
- [ ] Nothing from a preview line is emitted unless its posture is build and the user opted in.

## Reference index

- **`references/versions.md`**: every version line, which one to use, and how to upgrade. Load for steps 1 and 3.
- **`references/requirements.md`**: quotes taken from the pinned specification, grouped by source. Load for step 2.

## Related skills

Install related spec skills by name with `npx skills add ScaleDockHQ/scaledock-skills --skill <name>`: `oci`, `x509-pkix`, `cose`, `sigstore`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [Notary Project Signature Specification](https://raw.githubusercontent.com/notaryproject/specifications/v1.1.0/specs/signature-specification.md): Specification, Release v1.1.0 (2024-08-13), checked 2026-10-06.
- [Notary Project Trust Store and Trust Policy Specification](https://raw.githubusercontent.com/notaryproject/specifications/v1.1.0/specs/trust-store-trust-policy.md): Specification, Release v1.1.0 (2024-08-13), checked 2026-10-06.
- [Notary Project Signing and Verification Workflow](https://raw.githubusercontent.com/notaryproject/specifications/v1.1.0/specs/signing-and-verification-workflow.md): Specification, Release v1.1.0 (2024-08-13), checked 2026-10-06.
