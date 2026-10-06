---
name: base-encodings
description: >-
  The Base16, Base32, and Base64 Data Encodings: The Base16, Base32, and Base64 Data Encodings Covers RFC 4648 The Base16, Base32, and Base64 Data Encodings. Use when encoding or decoding base16, base32 or base64. Triggers: base64, RFC 4648.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# The Base16, Base32, and Base64 Data Encodings

The Base16, Base32, and Base64 Data Encodings

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when encoding or decoding base16, base32 or base64.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: RFC 4648 The Base16, Base32, and Base64 Data Encodings (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **document.** "Conventions Used in This Document The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [ 2 ]."
2. **document.** "Implementations MUST NOT add line feeds to base-encoded data unless the specification referring to this document explicitly directs base encoders to add line feeds after a specific number of characters."
3. **document.** "Implementations MUST include appropriate pad characters at the end of encoded data unless the specification referring to this document explicitly states otherwise."
4. **document.** "Implementations MUST reject the encoded data if it contains characters outside the base alphabet when interpreting base-encoded"
5. **document.** "These pad bits MUST be set to zero by conforming encoders, which is described in the descriptions on padding below."
6. **document.** "Such specifications may instead state, as MIME does, that characters outside the base encoding alphabet should simply be ignored when interpreting data ("be liberal in what you accept")."
7. **document.** "Here are a few requirements that determine which alphabet should be used: Josefsson Standards Track [Page 4] RFC 4648 Base-N Encodings October 2006 o Handled by humans."
8. **document.** "(However, by default it should not; see previous section.) o Encoded into structures that mandate other requirements."

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

- [RFC 4648 The Base16, Base32, and Base64 Data Encodings](https://www.rfc-editor.org/rfc/rfc4648.html): PROPOSED STANDARD, RFC 4648 (PROPOSED STANDARD, October 20), checked 2026-10-06.
