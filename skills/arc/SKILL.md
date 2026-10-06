---
name: arc
description: >-
  ARC (RFC 8617): seal and validate the Authenticated Received Chain so forwarded mail keeps its authentication results. Covers RFC 8617 The Authenticated Received Chain (ARC) Protocol. Use when sealing or validating an authenticated received chain. Triggers: ARC, RFC 8617.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.1"
  kind: standard
---

# The Authenticated Received Chain (ARC) Protocol

The Authenticated Received Chain (ARC) Protocol

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when sealing or validating an authenticated received chain.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: RFC 8617 The Authenticated Received Chain (ARC) Protocol (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **document.** "The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here."
2. **document.** "The formal ABNF for the AAR header field is: arc-info = instance [CFWS] ";" authres-payload arc-authres-header = "ARC-Authentication-Results:" [CFWS] arc-info Because there is only one AAR allowed per ARC Set, the AAR MUST contain the combined authres-payload with all of the authentication results from within the participating ADMD, regardless of how many Authentication-Results header fields are…"
3. **document.** "As required for undefined tags (in [ RFC6376 ]), if seen, a version tag MUST be ignored; and o the "i" (Agent or User Identifier (AUID)) tag is not imported from DKIM; instead, this tag is replaced by the instance tag as defined in Section 4.2.1 ."
4. **document.** "AMS header fields SHOULD be attached so that any modifications made by the ADMD are included in the signature of the AMS header field."
5. **document.** "o Authentication-Results header fields MUST NOT be included in AMS signatures as they are likely to be deleted by downstream ADMDs (per [RFC8601], Section 5 )."
6. **document.** "o ARC-related header fields (ARC-Authentication-Results, ARC- Message-Signature, and ARC-Seal) MUST NOT be included in the list of header fields covered by the signature of the AMS header field."
7. **document.** "To preserve the ability to verify the integrity of a message, the signature of the AMS header field SHOULD include any DKIM-Signature header fields already present in the message."
8. **document.** "Note especially that the DKIM "h" tag is NOT allowed and, if found, MUST result in a cv status of "fail" (for more information, see Section 5.1.1 ); and o an additional tag, "cv" ("seal-cv-tag" in the ARC-Seal ABNF definition), is used to communicate the Chain Validation Status to subsequent ADMDs."

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

- [RFC 8617 The Authenticated Received Chain (ARC) Protocol](https://www.rfc-editor.org/rfc/rfc8617.html): EXPERIMENTAL, RFC 8617 (EXPERIMENTAL, July 2019), checked 2026-10-06.
