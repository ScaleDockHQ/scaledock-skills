---
name: tls
description: >-
  The Transport Layer Security (TLS) Protocol Version 1.3: The Transport Layer Security (TLS) Protocol Version 1.3 Covers RFC 8446 The Transport Layer Security (TLS) Protocol Version 1.3, RFC 5246 The Transport Layer Security (TLS) Protocol Version 1.2 (supported), RFC 9325 Recommendations for Secure Use of Transport Layer Security (TLS) and Datagram Transport Layer Security (DTLS), RFC 8705 OAuth 2.0 Mutual-TLS Client Authentication and Certificate-Bound Access Tokens, TLS Encrypted Client Hello (track preview). Use when configuring TLS. Triggers: TLS 1.3, TLS 1.2, RFC 8446.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# The Transport Layer Security (TLS) Protocol Version 1.3

The Transport Layer Security (TLS) Protocol Version 1.3

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when configuring TLS.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: RFC 8446 The Transport Layer Security (TLS) Protocol Version 1.3 (default); RFC 5246 The Transport Layer Security (TLS) Protocol Version 1.2 (supported); RFC 9325 Recommendations for Secure Use of Transport Layer Security (TLS) and Datagram Transport Layer Security (DTLS) (default); RFC 8705 OAuth 2.0 Mutual-TLS Client Authentication and Certificate-Bound Access Tokens (default); TLS Encrypted Client Hello (preview, posture track: emit only when the user opts in and the posture is build). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **document.** "Conventions and Terminology The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here."
2. **document.** "If (EC)DHE key establishment is in use, then the ServerHello contains a "key_share" extension with the server's ephemeral Diffie-Hellman share; the server's share MUST be in the same group as one of the client's shares."
3. **document.** "Application Data MUST NOT be sent prior to sending the Finished message, except as specified in Section 2.3 ."
4. **document.** "If no common cryptographic parameters can be negotiated, the server MUST abort the handshake with an appropriate alert."
5. **document.** "When a client offers resumption via a PSK, it SHOULD also supply a "key_share" extension to the server to allow the server to decline resumption and fall back to a full handshake, if needed."
6. **document.** "Rescorla Standards Track [Page 16] RFC 8446 TLS August 2018 When PSKs are provisioned out of band, the PSK identity and the KDF hash algorithm to be used with the PSK MUST also be provisioned."
7. **document.** "A peer which receives a handshake message in an unexpected order MUST abort the handshake with an "unexpected_message" alert."
8. **document.** "If there is no overlap between the received "supported_groups" and the groups supported by the server, then the server MUST abort the handshake with a "handshake_failure" or an "insufficient_security" alert."

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

- [RFC 8446 The Transport Layer Security (TLS) Protocol Version 1.3](https://www.rfc-editor.org/rfc/rfc8446.html): PROPOSED STANDARD, RFC 8446 (PROPOSED STANDARD, August 201), checked 2026-10-06.
- [RFC 5246 The Transport Layer Security (TLS) Protocol Version 1.2](https://www.rfc-editor.org/rfc/rfc5246.html): PROPOSED STANDARD, RFC 5246 (PROPOSED STANDARD, August 200), checked 2026-10-06.
- [RFC 9325 Recommendations for Secure Use of Transport Layer Security (TLS) and Datagram Transport Layer Security (DTLS)](https://www.rfc-editor.org/rfc/rfc9325.html): BEST CURRENT PRACTICE, RFC 9325 (BEST CURRENT PRACTICE, November 2), checked 2026-10-06.
- [RFC 8705 OAuth 2.0 Mutual-TLS Client Authentication and Certificate-Bound Access Tokens](https://www.rfc-editor.org/rfc/rfc8705.html): PROPOSED STANDARD, RFC 8705 (PROPOSED STANDARD, February 2), checked 2026-10-06.
- [TLS Encrypted Client Hello](https://datatracker.ietf.org/doc/html/draft-ietf-tls-esni-25): WG draft, draft-ietf-tls-esni-25 (WG draft, 2026-10-06), checked 2026-10-06.
