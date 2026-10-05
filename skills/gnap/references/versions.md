# Versions and upgrades

Read this when choosing a target version, reading an implementation written against a pre-RFC GNAP draft, or deciding whether a newer GNAP line exists. Sources: RFC 9635, RFC 9767 and the datatracker history of `draft-ietf-gnap-core-protocol`, listed in [Sources](../SKILL.md#sources).

## Version lines

| Id        | Line     | Status  | Revision                                       | Posture | Summary                                                       |
| --------- | -------- | ------- | ---------------------------------------------- | ------- | ------------------------------------------------------------- |
| `rfc9635` | RFC 9635 | current | RFC 9635 (October 2024), with RFC 9767 for RSs |         | The only GNAP line: the core protocol and RS connections RFC. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

RFC 9635 is the first and only published version of GNAP. Before it, the protocol was developed as `draft-ietf-gnap-core-protocol`, whose last revision was `-20` (19 March 2024), the text the RFC Editor turned into RFC 9635. The resource server half was developed as `draft-ietf-gnap-resource-servers`, whose last revision `-09` became RFC 9767. Those drafts are not listed as lines: they are not versions anyone should target, and an implementation built from one is upgraded to RFC 9635.

## Which version to use

- Target RFC 9635 for the client instance and authorization server, and RFC 9767 for the resource server connection. There is no other line to choose.
- Treat an implementation written against a `draft-ietf-gnap-core-protocol` or `draft-ietf-gnap-resource-servers` revision as input to an upgrade, not as a second line to stay compatible with.
- GNAP is not a version of OAuth. It is not an extension of OAuth 2.0 and is not intended to be directly compatible with it (RFC 9635 § 1). Moving from OAuth to GNAP is a redesign, not an upgrade; Appendix A compares the two and Appendix B.5 shows how OAuth 2.0 scopes and client IDs map to GNAP.

## What changed

### RFC 9635

- Published as a Proposed Standard in October 2024 from `draft-ietf-gnap-core-protocol-20`.
- Creates the IANA registries that fix the wire values: grant request parameters (§ 10.3), access token flags (§ 10.4), client instance fields (§ 10.7), interaction start modes (§ 10.9), finish methods (§ 10.10), grant response parameters (§ 10.12), error codes (§ 10.15), key proofing methods (§ 10.16), key formats (§ 10.17) and AS discovery fields (§ 10.18).
- Registers the `GNAP` HTTP authentication scheme (§ 10.1) and the `application/gnap-binding-*` media types for the `jwsd` and `jws` proofing methods (§ 10.2).
- RFC 9767, published from `draft-ietf-gnap-resource-servers-09`, adds the AS-to-RS side: the token model, token formats, RS-facing discovery, introspection, resource registration and derived tokens.

## Upgrading

### Pre-RFC draft to RFC 9635

1. Change the version marker: GNAP messages carry no version field, so record RFC 9635 (and RFC 9767 for RS connections) as the target in configuration and documentation, and publish AS discovery fields only from the RFC 9635 registry (§ 9.2, § 10.18).
2. Replace removed or renamed fields: check every request parameter, response parameter, flag, start mode, finish method, proofing method, key format and error code against the RFC 9635 registries (§ 10.3 to § 10.18), and every token format and RS-facing field against the RFC 9767 registries. Anything not in a registry is a leftover from a draft or a private extension.
3. Validate against the target: run the grant flow, interaction hash, continuation, token management and key proofing checks in [`grant-flow.md`](grant-flow.md), and the RS checks in [`resource-servers.md`](resource-servers.md), against RFC 9635 and RFC 9767.
4. Keep behaviour unchanged: the same client instance gets the same access, tokens stay key-bound unless the `bearer` flag is set (§ 2.1.1), and continuation tokens still work only for continuation (§ 5). An upgrade that validates but grants something different is a regression.

## Preview

No preview is listed. RFC 9635 has no successor: its datatracker page names no document that updates or obsoletes it, and no draft of a next GNAP version exists to track. When one appears, add it here as a preview with a posture, and add the upgrade section when it ships.
