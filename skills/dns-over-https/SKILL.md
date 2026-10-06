---
name: dns-over-https
description: >-
  DNS Queries over HTTPS (DoH): DNS Queries over HTTPS (DoH) Covers RFC 8484 DNS Queries over HTTPS (DoH), RFC 9460 Service Binding and Parameter Specification via the DNS (SVCB and HTTPS Resource Records). Use when resolving DNS over HTTPS. Triggers: DoH, RFC 8484, SVCB.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# DNS Queries over HTTPS (DoH)

DNS Queries over HTTPS (DoH)

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when resolving DNS over HTTPS.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: RFC 8484 DNS Queries over HTTPS (DoH) (default); RFC 9460 Service Binding and Parameter Specification via the DNS (SVCB and HTTPS Resource Records) (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **document.** "The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here."
2. **document.** "A DoH client MUST NOT use a different URI simply because it was discovered outside of the client's configuration (such as through HTTP/2 server push) or because a server offers an unsolicited response that appears to be a valid answer to a DNS query."
3. **document.** "Future specifications for new media types for DoH MUST define the variables used for URI Template processing with this protocol."
4. **document.** "DoH servers MUST implement both the POST and GET methods."
5. **document.** "The DoH client SHOULD include an HTTP Accept request header field to indicate what type of content can be understood in response."
6. **document.** "Irrespective of the value of the Accept request header field, the client MUST be prepared to process "application/dns-message" (as described in Section 6 ) responses but MAY also process other DNS- related media types it receives."
7. **document.** "In order to maximize HTTP cache friendliness, DoH clients using media formats that include the ID field from the DNS message header, such as "application/dns-message", SHOULD use a DNS ID of 0 in every DNS request."
8. **document.** "A DoH server MUST be able to process "application/dns-message" request messages."

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

- [RFC 8484 DNS Queries over HTTPS (DoH)](https://www.rfc-editor.org/rfc/rfc8484.html): PROPOSED STANDARD, RFC 8484 (PROPOSED STANDARD, October 20), checked 2026-10-06.
- [RFC 9460 Service Binding and Parameter Specification via the DNS (SVCB and HTTPS Resource Records)](https://www.rfc-editor.org/rfc/rfc9460.html): PROPOSED STANDARD, RFC 9460 (PROPOSED STANDARD, November 2), checked 2026-10-06.
