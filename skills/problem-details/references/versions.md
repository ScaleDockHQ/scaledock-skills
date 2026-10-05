# Versions and upgrades

Read this when choosing a target version, reading an API or document that cites RFC 7807, or upgrading one. Sources: RFC 9457 (Appendix D lists its changes), RFC 7807, and the RFC Editor entries for both, listed in [Sources](../SKILL.md#sources).

## Version lines

| Id        | Line     | Status  | Revision                                  | Posture | Summary                                                                    |
| --------- | -------- | ------- | ----------------------------------------- | ------- | -------------------------------------------------------------------------- |
| `rfc9457` | RFC 9457 | current | RFC 9457, Proposed Standard (August 2023) |         | The default target. Obsoletes RFC 7807; the RFC Editor lists no successor. |
| `rfc7807` | RFC 7807 | legacy  | RFC 7807, Proposed Standard (April 2016)  |         | Obsoleted by RFC 9457. Same media types and members.                       |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

## Which version to use

- Default to RFC 9457, and cite it rather than RFC 7807 in new API documentation.
- No other line is supported. An RFC 7807 implementation is input to an upgrade; it does not need a new wire format.
- A client written for RFC 7807 reads RFC 9457 responses unchanged, because the media types, the five members and the XML namespace are the same (Appendix D, § 6, Appendix B).

## What changed

### RFC 9457

Appendix D lists the changes from RFC 7807:

- A registry of common problem type URIs, the IANA HTTP Problem Types registry, with `about:blank` as its first entry (§ 4.2, § 4.2.1).
- Guidance on multiple problems: when problems do not share a type, return the most relevant or urgent one (§ 3).
- Guidance on type URIs that cannot be dereferenced, such as `tag:` URIs, while still encouraging resolvable ones (§ 3.1.1).

Comparing the two texts also shows these clarifications, which Appendix D does not list separately:

- A member whose value has the wrong JSON type is ignored, as if absent (§ 3.1). RFC 7807 only required ignoring unknown extensions (RFC 7807 § 3.2).
- Relative `type` URIs are resolved against the document's base URI, and absolute URIs are recommended (§ 3.1.1).
- The `errors` example shows field-level validation errors with `detail` and `pointer` (§ 3).

Neither the media types `application/problem+json` and `application/problem+xml` nor the XML namespace `urn:ietf:rfc:7807` changed; § 6 only updates the registrations to point at RFC 9457. RFC 9457 has no updating or obsoleting RFC at the RFC Editor.

## Upgrading

### RFC 7807 to RFC 9457

1. Change the version marker: replace references to RFC 7807 with RFC 9457 in documentation, code comments and type documentation. Keep the media types and the XML namespace `urn:ietf:rfc:7807` exactly as they are (§ 6, Appendix B).
2. Replace removed or renamed fields: none. The five members and their types are unchanged. Check the IANA HTTP Problem Types registry for a registered type that matches a type you minted, and consider adopting it (§ 4.2).
3. Validate against the target: bodies validate against the Appendix A JSON Schema; responses with several problems of different types return the most relevant one (§ 3); consumers ignore wrongly typed members (§ 3.1).
4. Keep behaviour unchanged: keep every existing `type` URI. Changing a type URI, even from an unresolvable to a resolvable one, creates a new problem type and is a breaking change (§ 3.1.1).

## Preview

No preview line is listed. The RFC Editor entry for RFC 9457 shows no RFC that updates or obsoletes it, so there is no next line to preview. New problem types are added through the IANA registry, not through new versions of the RFC.
