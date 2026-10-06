---
name: subresource-integrity
description: >-
  Subresource Integrity (SRI): This specification defines a mechanism by which user agents may verify that a fetched resource has been delivered without unexpected manipulation. Covers Subresource Integrity Level 1, Subresource Integrity Level 2 (track preview). Use when setting or checking integrity metadata on a fetched subresource. Triggers: SRI, integrity attribute, Subresource Integrity.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# Subresource Integrity (SRI)

This specification defines a mechanism by which user agents may verify that a fetched resource has been delivered without unexpected manipulation.

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when setting or checking integrity metadata on a fetched subresource.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: Subresource Integrity Level 1 (default); Subresource Integrity Level 2 (preview, posture track: emit only when the user opts in and the posture is build). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **3.1. Integrity metadata.** "This metadata consists of the following pieces of information: cryptographic hash function ("alg") digest ("val") options ("opt") The hash function and digest MUST be provided in order to validate a response’s integrity."
2. **3.1. Integrity metadata.** "This metadata MUST be encoded in the same format as the hash-source (without the single quotes) in section 4.2 of the Content Security Policy Level 2 specification ."
3. **3.2. Cryptographic hash functions.** "Conformant user agents MUST support the SHA-256 , SHA-384 , and SHA-512 cryptographic hash functions for use as part of a request’s integrity metadata and MAY support additional hash functions defined in future iterations of this document."
4. **3.2.1. Agility.** "When a hash function is determined to be insecure, user agents SHOULD deprecate and eventually remove support for integrity validation using the insecure hash function."
5. **3.5. The integrity attribute.** "The value of the attribute MUST be either the empty string, or at least one valid metadata as described by the following ABNF grammar: integrity-metadata = * WSP hash-with-options _(1_ WSP hash-with-options ) * WSP / * WSP hash-with-options = hash-expression *("?" option-expression ) option-expression = * VCHAR hash-expression = hash-algorithm "-" base64-value option-expression s are associated…"
6. **3.5. The integrity attribute.** "In order for user agents to remain fully forwards compatible with future options, the user agent MUST ignore all unrecognized option-expression s."
7. **3.6. The integrity link processing option.** "Integrity metadata can also be specified for `link` HTTP response headers as an integrity link parameter which MUST be specified using the same integrity-metadata grammar that applies to integrity attributes on elements."
8. **4. Proxies.** "Optimizing proxies and other intermediate servers which modify the responses MUST ensure that the digest associated with those responses stays in sync with the new content."

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

- [Subresource Integrity](https://www.w3.org/TR/SRI/): Recommendation, sri-1 WD-sri-2-20260320 (Recommendation, 2016-06-23), checked 2026-10-06.
- [Subresource Integrity](https://www.w3.org/TR/sri-2/): Working Draft, sri-2 WD-sri-2-20260320 (Working Draft, 2026-03-20), checked 2026-10-06.
