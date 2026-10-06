---
name: x509-pkix
description: >-
  X.509 PKIX (RFC 5280): issue and validate certificates and CRLs, with OCSP and Certificate Transparency. Covers RFC 5280 Internet X.509 Public Key Infrastructure Certificate and Certificate Revocation List (CRL) Profile, RFC 6960 X.509 Internet Public Key Infrastructure Online Certificate Status Protocol - OCSP, RFC 9162 Certificate Transparency Version 2.0. Use when issuing or checking X.509 certificates. Triggers: PKIX, RFC 5280, OCSP, Certificate Transparency.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.1"
  kind: standard
---

# Internet X.509 Public Key Infrastructure Certificate and Certificate Revocation List (CRL) Profile

Internet X.509 Public Key Infrastructure Certificate and Certificate Revocation List (CRL) Profile

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when issuing or checking X.509 certificates.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: RFC 5280 Internet X.509 Public Key Infrastructure Certificate and Certificate Revocation List (CRL) Profile (default); RFC 6960 X.509 Internet Public Key Infrastructure Online Certificate Status Protocol - OCSP (default); RFC 9162 Certificate Transparency Version 2.0 (default); RFC 6962 Certificate Transparency (legacy: read and upgrade, never author). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **document.** "Implementations are REQUIRED to derive the same results but are not required to use the specified procedures."
2. **document.** "However, conforming implementations that use the algorithms identified in [ RFC3279 ], [ RFC4055 ], and [ RFC4491 ] MUST identify and encode the public key materials and digital signatures as described in those specifications."
3. **document.** "The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [ RFC2119 ]."
4. **document.** "An entry MUST NOT be removed from the CRL until it appears on one regularly scheduled CRL issued beyond the revoked certificate's validity period."
5. **document.** "Standards Track [Page 16] RFC 5280 PKIX Certificate and CRL Profile May 2008 subjectUniqueID [2] IMPLICIT UniqueIdentifier OPTIONAL, -- If present, version MUST be v2 or v3 extensions [3] EXPLICIT Extensions OPTIONAL -- If present, version MUST be v3 } Version ::= INTEGER { v1(0), v2(1), v3(2) } CertificateSerialNumber ::= INTEGER Validity ::= SEQUENCE { notBefore Time, notAfter Time } Time ::=…"
6. **document.** "This field MUST contain the same algorithm identifier as the signature field in the sequence tbsCertificate ( Section 4.1.2.3 )."
7. **document.** "When extensions are used, as expected in this profile, version MUST be 3 (value is 2)."
8. **document.** "If no extensions are present, but a UniqueIdentifier is present, the version SHOULD be 2 (value is 1); however, the version MAY be 3."

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

- [RFC 5280 Internet X.509 Public Key Infrastructure Certificate and Certificate Revocation List (CRL) Profile](https://www.rfc-editor.org/rfc/rfc5280.html): PROPOSED STANDARD, RFC 5280 (PROPOSED STANDARD, May 2008), checked 2026-10-06.
- [RFC 6960 X.509 Internet Public Key Infrastructure Online Certificate Status Protocol - OCSP](https://www.rfc-editor.org/rfc/rfc6960.html): PROPOSED STANDARD, RFC 6960 (PROPOSED STANDARD, June 2013), checked 2026-10-06.
- [RFC 9162 Certificate Transparency Version 2.0](https://www.rfc-editor.org/rfc/rfc9162.html): EXPERIMENTAL, RFC 9162 (EXPERIMENTAL, December 2), checked 2026-10-06.
- [RFC 6962 Certificate Transparency](https://www.rfc-editor.org/rfc/rfc6962.html): EXPERIMENTAL, RFC 6962 (EXPERIMENTAL, June 2013), checked 2026-10-06.
