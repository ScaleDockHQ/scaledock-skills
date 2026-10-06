# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id                     | Line                     | Status  | Revision                                                                                         | Posture | Summary                                                                     |
| ---------------------- | ------------------------ | ------- | ------------------------------------------------------------------------------------------------ | ------- | --------------------------------------------------------------------------- |
| `nextgenpsd2-v2-suite` | PSD2 Compliance V2 Suite | current | Implementation Guidelines 2.4.2 and Protocol Functions and Security Measures 2.4.1, 31 July 2026 |         | XS2A under the openFinance API Framework, `/psd2/v2/` paths.                |
| `nextgenpsd2-1-3`      | NextGenPSD2 1.3.x        | legacy  | NextGenPSD2 XS2A Framework 1.3.x (Berlin Group library archive)                                  |         | Original NextGenPSD2 framework with `/v1/` paths; still run by many ASPSPs. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

Berlin Group now publishes NextGenPSD2 inside the openFinance API Framework as the PSD2 Compliance V2 Suite. The 1.3.x framework is in the library archive. Use 1.3.x only to read an ASPSP that has not moved to the V2 suite; build new interfaces against the V2 suite. The OpenAPI files on `gitlab.com/the-berlin-group` are informative: the Implementation Guidelines are normative.

## Upgrading

From 1.3.x to the V2 suite: move to the `/psd2/v2/` paths and the V2 data dictionary, re-check each SCA approach against Protocol Functions and Security Measures § 8 and § 9, and apply the change-resource (ETag, If-Match) rules in § 3.11 if you support resource changes.
