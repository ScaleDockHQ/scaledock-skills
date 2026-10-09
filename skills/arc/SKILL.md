---
name: arc
description: >-
  ARC (RFC 8617): seal and validate the Authenticated Received Chain so forwarded mail keeps its authentication results. Covers RFC 8617 The Authenticated Received Chain (ARC) Protocol. Use when sealing or validating an authenticated received chain. Triggers: ARC, RFC 8617.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.1.0"
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

1. **RFC 8617 § 4.1.1.** "Because there is only one AAR allowed per ARC Set, the AAR MUST contain the combined authres-payload with all of the authentication results from within the participating ADMD, regardless of how many Authentication-Results header fields are attached to the message."
2. **RFC 8617 § 4.1.2.** "Authentication-Results header fields MUST NOT be included in AMS signatures as they are likely to be deleted by downstream ADMDs (per [RFC8601], Section 5)."
3. **RFC 8617 § 4.1.2.** "ARC-related header fields (ARC-Authentication-Results, ARC-Message-Signature, and ARC-Seal) MUST NOT be included in the list of header fields covered by the signature of the AMS header field."
4. **RFC 8617 § 4.1.3.** "Note especially that the DKIM "h" tag is NOT allowed and, if found, MUST result in a cv status of "fail" (for more information, see Section 5.1.1); and"
5. **RFC 8617 § 5.1.** "All message modifications (including adding a DKIM-Signature header field(s)) MUST be performed before sealing."
6. **RFC 8617 § 5.1.2.** "In the case of a failed Authenticated Received Chain, the header fields included in the signature scope of the AS header field b= value MUST only include the ARC Set header fields created by the MTA that detected the malformed chain, as if this newest ARC Set was the only set present."
7. **RFC 8617 § 5.2.** "Each ARC Set MUST contain exactly one each of the three ARC header fields (AAR, AMS, and AS)."
8. **RFC 8617 § 5.2.** "The instance values of the ARC Sets MUST form a continuous sequence from 1..N with no gaps or repetition."
9. **RFC 8617 § 5.2.** "The "cv" value for all ARC-Seal header fields MUST NOT be "fail"."
10. **RFC 8617 § 5.2.** "As with a DKIM signature ([RFC6376], Section 6.3) that fails verification, a message with an Authenticated Received Chain with a Chain Validation Status of "fail" MUST be treated the same as a message with no Authenticated Received Chain."

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

- [RFC 8617 The Authenticated Received Chain (ARC) Protocol](https://www.rfc-editor.org/rfc/rfc8617.html): EXPERIMENTAL, RFC 8617 (EXPERIMENTAL, July 2019), checked 2026-10-06.
