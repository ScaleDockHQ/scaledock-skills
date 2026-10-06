---
name: idna
description: >-
  IDNA (UTS #46): One of the great strengths of domain names is universality. Covers UTS #46, RFC 5890 IDNA, RFC 5891 IDNA protocol. Use when mapping internationalized domain names. Triggers: IDNA, UTS 46, RFC 5890.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# IDNA (UTS #46)

One of the great strengths of domain names is universality. The URL https://Apple.com goes to Apple's

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when mapping internationalized domain names.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: UTS #46 (default); RFC 5890 IDNA (default); RFC 5891 IDNA protocol (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **Unicode IDNA Compatibility Processing.** "Nontransitional Processing, which is fully compatible with IDNA2008, should be used in all cases."
2. **Unicode IDNA Compatibility Processing.** "These tactics can be described as follows: Bundling : If two or more labels are different, but confusable, and more than one is registered, the registrant for each must be the same."
3. **Unicode IDNA Compatibility Processing.** "However, such unprocessed labels must be handled carefully: Storing the unprocessed label as the sequence of characters that the registrant really wanted to apply for."
4. **Unicode IDNA Compatibility Processing.** "4.1 Validity Criteria Each of the following criteria must be satisfied for a non-empty label: The label must be in Unicode Normalization Form NFC."
5. **Unicode IDNA Compatibility Processing.** "If CheckHyphens , the label must not contain a U+002D HYPHEN-MINUS character in both the third and fourth positions."
6. **Unicode IDNA Compatibility Processing.** "If CheckHyphens , the label must neither begin nor end with a U+002D HYPHEN-MINUS character."
7. **Unicode IDNA Compatibility Processing.** "If not CheckHyphens , the label must not begin with “xn--”."
8. **Unicode IDNA Compatibility Processing.** "The label must not begin with a combining mark, that is: General_Category=Mark."

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

- [UTS #46](https://www.unicode.org/reports/tr46/): Unicode Technical Standard, UTS #46 (Unicode Technical Standard, 2026-10-06), checked 2026-10-06.
- [RFC 5890 IDNA](https://www.rfc-editor.org/rfc/rfc5890.html): RFC, RFC 5890 (RFC, 2010-08), checked 2026-10-06.
- [RFC 5891 IDNA protocol](https://www.rfc-editor.org/rfc/rfc5891.html): RFC, RFC 5891 (RFC, 2010-08), checked 2026-10-06.
