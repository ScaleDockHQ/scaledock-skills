---
name: hotp-totp
description: >-
  HOTP: An HMAC-Based One-Time Password Algorithm: HOTP: An HMAC-Based One-Time Password Algorithm Covers RFC 4226 HOTP: An HMAC-Based One-Time Password Algorithm, RFC 6238 TOTP: Time-Based One-Time Password Algorithm. Use when verifying a one-time password. Triggers: HOTP, TOTP, RFC 4226, RFC 6238.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# HOTP: An HMAC-Based One-Time Password Algorithm

HOTP: An HMAC-Based One-Time Password Algorithm

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when verifying a one-time password.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: RFC 4226 HOTP: An HMAC-Based One-Time Password Algorithm (default); RFC 6238 TOTP: Time-Based One-Time Password Algorithm (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **document.** "Requirements Terminology The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [ RFC2119 ]."
2. **document.** "R1 - The algorithm MUST be sequence- or counter-based: one of the goals is to have the HOTP algorithm embedded in high-volume devices"
3. **document.** "R2 - The algorithm SHOULD be economical to implement in hardware by minimizing requirements on battery, number of buttons, computational horsepower, and size of LCD display."
4. **document.** "R3 - The algorithm MUST work with tokens that do not support any numeric input, but MAY also be used with more sophisticated devices such as secure PIN-pads."
5. **document.** "R4 - The value displayed on the token MUST be easily read and entered by the user: This requires the HOTP value to be of reasonable length."
6. **document.** "R5 - There MUST be user-friendly mechanisms available to resynchronize the counter."
7. **document.** "Section 7.4 and Appendix E.4 details the resynchronization mechanism proposed in this document R6 - The algorithm MUST use a strong shared secret."
8. **document.** "The length of the shared secret MUST be at least 128 bits."

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

- [RFC 4226 HOTP: An HMAC-Based One-Time Password Algorithm](https://www.rfc-editor.org/rfc/rfc4226.html): INFORMATIONAL, RFC 4226 (INFORMATIONAL, December 2), checked 2026-10-06.
- [RFC 6238 TOTP: Time-Based One-Time Password Algorithm](https://www.rfc-editor.org/rfc/rfc6238.html): INFORMATIONAL, RFC 6238 (INFORMATIONAL, May 2011), checked 2026-10-06.
