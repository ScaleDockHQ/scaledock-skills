---
name: mta-sts
description: >-
  MTA-STS (RFC 8461) and TLS-RPT (RFC 8460): enforce TLS for inbound SMTP and receive TLS failure reports. Covers RFC 8461 SMTP MTA Strict Transport Security (MTA-STS), RFC 8460 SMTP TLS Reporting. Use when publishing an MTA-STS policy. Triggers: MTA-STS, TLS-RPT, RFC 8461.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.1"
  kind: standard
---

# SMTP MTA Strict Transport Security (MTA-STS)

SMTP MTA Strict Transport Security (MTA-STS)

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when publishing an MTA-STS policy.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: RFC 8461 SMTP MTA Strict Transport Security (MTA-STS) (default); RFC 8460 SMTP TLS Reporting (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **document.** "Terminology The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here."
2. **document.** "However, MTA-STS is designed not to interfere with DANE deployments when the two overlap; in particular, senders who implement MTA-STS validation MUST NOT allow MTA-STS Policy validation to override a failing DANE validation."
3. **document.** "MTA-STS TXT records MUST be US-ASCII, semicolon-separated key/value pairs containing the following fields: o "v" (plaintext, required): Currently, only "STSv1" is supported."
4. **document.** "This string MUST uniquely identify a given instance of a policy, such that senders can determine when the policy has been updated by comparing to the "id" of a previously seen policy."
5. **document.** "sts-extension = sts-ext-name "=" sts-ext-value ; name=value sts-ext-name = (ALPHA / DIGIT) _31(ALPHA / DIGIT / "\_" / "-" / ".") sts-ext-value = 1_(%x21-3A / %x3C / %x3E-7E) ; chars excluding "=", ";", SP, and CTLs The TXT record MUST begin with the sts-version field; the order of other fields is not significant."
6. **document.** "If the number of resulting records is not one, or if the resulting record is syntactically invalid, senders MUST assume the recipient domain does not have an available MTA-STS Margolis, et al."
7. **document.** "(Note that the absence of a usable TXT record is not by itself sufficient to remove a sender's previously cached policy for the Policy Domain, as discussed in Section 5.1 , "Policy Application Control Flow".) If the resulting TXT record contains multiple strings, then the record MUST be treated as if those strings are concatenated without adding spaces."
8. **document.** "The "_mta-sts" record MAY return a CNAME that points (directly or via other CNAMEs) to a TXT record, in which case senders MUST follow the CNAME pointers."

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

- [RFC 8461 SMTP MTA Strict Transport Security (MTA-STS)](https://www.rfc-editor.org/rfc/rfc8461.html): PROPOSED STANDARD, RFC 8461 (PROPOSED STANDARD, September ), checked 2026-10-06.
- [RFC 8460 SMTP TLS Reporting](https://www.rfc-editor.org/rfc/rfc8460.html): PROPOSED STANDARD, RFC 8460 (PROPOSED STANDARD, September ), checked 2026-10-06.
