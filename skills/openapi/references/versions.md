# Versions, compatibility and upgrades

Read this when choosing the `openapi` value or upgrading a description. Sources: OAS 3.2.1, the OAS 3.2.0 and 3.2.1 release notes, OAS 3.1.2, the OAI upgrade guide, and the Extension Registry.

## Version numbers

- `major.minor` designates the feature set; `.patch` versions fix or clarify the text, and tooling SHOULD NOT distinguish them (3.2.1 § 2.1).
- Deprecated fields stay part of the specification and can still be used, but authors should prefer their replacements (§ 2.1).
- A minor version may occasionally include a non-backwards-compatible change where the impact is believed to be low (§ 2.1). The OAI upgrade guide states that 3.2 introduces no breaking changes for 3.1 documents.

Published versions, from the OAI index and the revision history (Appendix A):

| Version | Date       | Notes                        |
| ------- | ---------- | ---------------------------- |
| 3.2.1   | 2026-09-10 | Patch: text corrections only |
| 3.2.0   | 2025-09-19 | Minor release                |
| 3.1.2   | 2025-09-19 | Patch                        |
| 3.1.1   | 2024-10-24 | Patch                        |
| 3.1.0   | 2021-02-15 | Minor release                |
| 3.0.4   | 2024-10-24 | Patch                        |

## What 3.2.0 added

From the 3.2.0 release notes, with the 3.2.1 section that defines each field:

| Area              | Change                                                                                                                                                         | Section          |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| Tags              | `summary`, `parent` (nesting) and `kind` on the Tag Object; a Tag Kind registry for `kind` values                                                              | § 4.22           |
| HTTP methods      | `query` operation; `additionalOperations` map for other methods (never for a method that has its own field)                                                    | § 4.9.1          |
| Document identity | `$self` as the document's URI and base URI                                                                                                                     | § 4.1.1          |
| Streaming         | Sequential media types such as `text/event-stream`, `application/jsonl` and `application/json-seq`; `itemSchema` describes each item                           | § 4.14           |
| Parameters        | `in: querystring` for the whole query string, described with `content`                                                                                         | § 4.12.1         |
| Cookies           | `style: cookie`                                                                                                                                                | § 4.12.3         |
| Multipart         | `prefixEncoding` and `itemEncoding` as alternatives to `encoding`                                                                                              | § 4.14.1         |
| XML               | `nodeType`; `attribute: true` and `wrapped: true` deprecated in its favour                                                                                     | § 4.26           |
| Examples          | `dataValue` and `serializedValue` on the Example Object                                                                                                        | § 4.19           |
| Security          | OAuth 2.0 device authorization flow (`deviceAuthorization`, `deviceAuthorizationUrl`), `oauth2MetadataUrl`, `deprecated` on schemes, schemes referenced by URI | § 4.27 to § 4.30 |
| Servers           | `name` on the Server Object                                                                                                                                    | § 4.5            |
| Discriminator     | optional `propertyName`, `defaultMapping`                                                                                                                      | § 4.25           |
| Responses         | `description` optional; `summary` added                                                                                                                        | § 4.17           |
| Components        | `mediaTypes` for reusable Media Type Objects                                                                                                                   | § 4.7.1          |

## What 3.2.1 changed

The 3.2.1 release notes list no significant changes, only text corrections: the Style Examples table, prohibited `in`/`style`/`explode` combinations (for example `in: cookie, style: form, explode: false` with arrays or objects), Encoding Object usage, path matching when a template value contains `/`, and an ABNF for `encoding/<name>/contentType`. It also cites RFC 10008 for the QUERY method (§ 4.9.1), where 3.2.0 cited the IETF draft.

## Section numbers differ between 3.1 and 3.2

OAS 3.1.2 nests the objects under § 4.8 (for example Operation Object § 4.8.10, Security Scheme Object § 4.8.27, Security Requirement Object § 4.8.30) and puts Specification Extensions in § 4.9. OAS 3.2.1 lists the objects under § 4 (Operation Object § 4.10, Security Scheme Object § 4.27) and Specification Extensions in § 5. Cite the section of the version the document targets.

## Writing for 3.1 consumers

When a consumer cannot read 3.2, target 3.1 and carry 3.2 information through extensions registered for exactly that purpose. The Extension Registry lists these fallbacks "used when targeting OpenAPI versions prior to 3.2":

| 3.2 field                        | Fallback                                     | Allowed on                                                       |
| -------------------------------- | -------------------------------------------- | ---------------------------------------------------------------- |
| `$self`                          | `x-oai-$self`                                | OpenAPI Object                                                   |
| `additionalOperations`           | `x-oai-additionalOperations`                 | Path Item Object                                                 |
| `dataValue`, `serializedValue`   | `x-oai-dataValue`, `x-oai-serializedValue`   | Example Object                                                   |
| `deprecated` on a scheme         | `x-oai-deprecated`                           | Security Scheme Object                                           |
| `deviceAuthorization` flow       | `x-oai-deviceAuthorization`                  | OAuth Flows Object                                               |
| `deviceAuthorizationUrl`         | `x-oai-deviceAuthorizationUrl`               | OAuth Flow Object                                                |
| `itemSchema`                     | `x-oai-itemSchema`                           | Media Type Object                                                |
| `prefixEncoding`, `itemEncoding` | `x-oai-prefixEncoding`, `x-oai-itemEncoding` | Media Type Object (and Encoding Object for `x-oai-itemEncoding`) |
| nested `encoding`                | `x-oai-encoding`                             | Encoding Object                                                  |
| Server `name`                    | `x-oai-name`                                 | Server Object                                                    |
| Response `summary`               | `x-oai-summary`                              | Response Object                                                  |

The registry has no fallback for `oauth2MetadataUrl`, Tag `summary`/`parent`/`kind`, the `query` operation, `querystring` parameters or URI-referenced security schemes. On a 3.1 target, inline a URI-referenced scheme into `components.securitySchemes`, and carry anything else in your own namespace ([`registries.md`](registries.md)), never as a new `x-oai-*` name.

## Upgrading 3.1 to 3.2

The OAI upgrade guide's essential steps:

1. Change `openapi` to a 3.2 version, for example `openapi: 3.2.1`.
2. Validate with 3.2 tooling against the 3.2 schema ([`validation.md`](validation.md)).

Then adopt features as needed, one change per commit:

- Replace `x-displayName` on tags with `summary`, and `x-tagGroups` with `parent` plus `kind: nav` (guide examples).
- Replace the `x-oai-*` fallbacks in the table above with the native fields.
- Add `name` to servers, `defaultMapping` to discriminators that should fall back to a default schema, and `dataValue`/`serializedValue` to examples.
- Consider the device authorization flow for limited-input clients, and sequential media types for streaming responses.

Keep the API itself unchanged during an upgrade: an upgraded document that validates but describes different operations is a regression.
