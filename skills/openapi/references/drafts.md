# OpenAPI 3.3 development line and Security Profiles

Read this when a user asks about OpenAPI 3.3, about describing security profiles such as FAPI 2.0, or about what comes after 3.2. Nothing here is released. Both items have draft posture **track**: follow them, and do not build or name anything that depends on them.

## The `v3.3-dev` branch

- **Pin:** `src/oas.md` on the `v3.3-dev` branch of `OAI/OpenAPI-Specification`, commit aa2f6c0 (2026-09-24). The text is headed "Version 3.3.0", and its revision history lists 3.3.0 with date "TBD".
- **No schema:** the OAI index publishes no 3.3 schema iteration ([`validation.md`](validation.md)).
- **Direction:** the OAI newsletter of June 2026 says the 3.3 work focuses on API security, with investigations into FAPI 2.0 and GNAP.

Differences from 3.2.1 present in the branch text at the pin:

| Change               | What the branch text says                                                                                                                                                         |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Path Item `security` | A Path Item can declare `security`. It overrides the top-level `security`, an operation's `security` overrides it in turn, and an empty array removes a higher-level declaration. |
| Schema dialect       | The OAS dialect URI takes the form `https://spec.openapis.org/oas/3.3/dialect/YYYY-MM-DD`.                                                                                        |
| Multipart            | More guidance on deserializing multipart content types and on safe `style`/`explode` combinations.                                                                                |

What to do today:

- Do not emit `openapi: 3.3.0`. No 3.3 tooling or schema exists to validate it.
- To express per-path security in 3.2, repeat the `security` field on each operation of the Path Item.
- When refreshing this skill, compare the branch head with the pin and update the table. Re-pin to a released 3.3 version as soon as one is published on the OAI index.

## Security Profiles proposal

- **Pin:** OAI Security SIG discussion #50, "Proposal: Supporting Loose-Coupling in Security Schemes and Security Requirements Objects", opened 2026-04-23, with expanded design notes posted 2026-05-05. It was moved from OpenAPI-Specification discussion #5304, which now returns 404. Use the sig-security URL.
- **Problem stated:** Security Scheme Objects, OAuth flows in particular, copy a point-in-time snapshot of settings whose source of truth lives elsewhere (for example OAuth authorization server metadata). That duplication drifts, and it does not fit profile-based specifications such as FAPI 2.0.
- **Shape proposed (not adopted):**
  - A Security Scheme with `type: profile`, plus `profileMetadata` that names a profile (for example `fapi-20-security-profile`), points to a schema of supported parameters, optionally to an OpenAPI description of the authorization server's operations, and lists servers.
  - Security Profile Requirement Objects under a new `components` key, which select an operation, token endpoint authentication methods, grant types and scopes.
  - A registry of profile names.
- **Open objections in the thread:** a redesign needs new names; restricting values through JSON Schema is questioned; JSON Pointer is preferred over JSONPath; OAS 3.2 cannot fully describe authorization servers; GNAP and Rich Authorization Requests also need to be considered.
- **State at the pin:** the last design activity is from May 2026. None of it appears in the `v3.3-dev` text.

What to do today:

- Do not emit `type: profile`, `profileMetadata` or `securityProfileRequirements`, even as a guess. The field names are contested.
- To reduce drift with 3.2, set `oauth2MetadataUrl` on OAuth 2.0 schemes so consumers can read the live metadata ([`security.md`](security.md)), and keep the flows and scopes in the OAD in sync with it.
- If you need to record a profile name now, use your own registered extension namespace ([`registries.md`](registries.md)), not an `x-oai-` name.
