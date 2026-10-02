# Security schemes and requirements

Read this when describing authentication and authorization. Section numbers are from OAS 3.2.1; OAS 3.1.2 numbers are given where they differ.

## Security Scheme Object (§ 4.27; 3.1.2 § 4.8.27)

| Field               | Applies to           | Rule                                                                                       |
| ------------------- | -------------------- | ------------------------------------------------------------------------------------------ |
| `type`              | any                  | REQUIRED: `apiKey`, `http`, `mutualTLS`, `oauth2` or `openIdConnect`.                      |
| `description`       | any                  | CommonMark allowed.                                                                        |
| `name`, `in`        | `apiKey`             | REQUIRED. `in` is `query`, `header` or `cookie`.                                           |
| `scheme`            | `http`               | REQUIRED. An HTTP authentication scheme name, SHOULD be IANA-registered, case-insensitive. |
| `bearerFormat`      | `http` with `bearer` | Documentation hint, for example `JWT`.                                                     |
| `flows`             | `oauth2`             | REQUIRED. OAuth Flows Object.                                                              |
| `openIdConnectUrl`  | `openIdConnect`      | REQUIRED. The OpenID Connect discovery URL.                                                |
| `oauth2MetadataUrl` | `oauth2`             | 3.2 only. The RFC 8414 authorization server metadata URL; TLS is required.                 |
| `deprecated`        | any                  | 3.2 only. Consumers SHOULD stop using the scheme; default `false`.                         |

The specification notes that the implicit flow is about to be deprecated by the OAuth 2.0 Security Best Current Practice and recommends the authorization code grant with PKCE for most use cases (§ 4.27). It also says that including basic auth or the implicit flow is not an endorsement (§ 6.3).

## OAuth Flows and OAuth Flow Objects (§ 4.28, § 4.29)

Flows: `implicit`, `password`, `clientCredentials`, `authorizationCode`, and in 3.2 `deviceAuthorization` (RFC 8628).

| Field                    | Required for                                                                |
| ------------------------ | --------------------------------------------------------------------------- |
| `authorizationUrl`       | `implicit`, `authorizationCode`                                             |
| `deviceAuthorizationUrl` | `deviceAuthorization` (3.2)                                                 |
| `tokenUrl`               | `password`, `clientCredentials`, `authorizationCode`, `deviceAuthorization` |
| `refreshUrl`             | optional                                                                    |
| `scopes`                 | every flow; the map MAY be empty                                            |

All URLs MUST be URLs, and OAuth 2.0 requires TLS (§ 4.29.1).

## Security Requirement Object (§ 4.30; 3.1.2 § 4.8.30)

- Each property name MUST be a scheme declared under `components.securitySchemes` or, in 3.2, the URI of a Security Scheme Object. A name identical to a component name MUST be treated as the component name; reach a colliding relative URI with `./foo` (§ 4.30).
- Several schemes in one object: all MUST be satisfied (AND). Several objects in a `security` list: any one is enough (OR). `{}` means anonymous access is supported (§ 4.30).
- For `oauth2` and `openIdConnect` the value lists the required scopes and MAY be empty; for other types it MAY list role names that are not exchanged in-band (§ 4.30.1).
- The root `security` applies to every operation. An operation's `security` replaces it, and `security: []` removes it for that operation (§ 4.1.1, § 4.10.1).

```yaml
security:
  - oauth: [orders:read]
  - apiKey: []
paths:
  /orders:
    post:
      operationId: createOrder
      security:
        - oauth: [orders:write]
          mtls: []
      responses:
        "201":
          description: Created.
```

`GET` operations under this root accept an OAuth token with `orders:read` or an API key. `createOrder` requires an OAuth token with `orders:write` and a client certificate.

## 3.2 features on a 3.1 target

The Extension Registry defines fallbacks for 3.1 and earlier:

```yaml
openapi: 3.1.2
components:
  securitySchemes:
    legacyKey:
      type: apiKey
      name: X-Api-Key
      in: header
      x-oai-deprecated: true
    oauth:
      type: oauth2
      flows:
        authorizationCode:
          authorizationUrl: https://auth.example.com/authorize
          tokenUrl: https://auth.example.com/token
          scopes:
            orders:read: Read orders
        x-oai-deviceAuthorization:
          x-oai-deviceAuthorizationUrl: https://auth.example.com/device
          tokenUrl: https://auth.example.com/token
          scopes:
            orders:read: Read orders
```

The registry has no fallback for `oauth2MetadataUrl` or for schemes referenced by URI. On a 3.1 target, mention the metadata URL in `description`, and inline referenced schemes into `components.securitySchemes`.

## Security considerations (§ 6)

- **Choose schemes by risk.** Data sensitivity and breach impact should drive the scheme (§ 6.3).
- **Ambiguous name resolution.** Whether a component name in a referenced document resolves from the entry document (RECOMMENDED) or the referenced document is implementation-defined. A component named like a URI hijacks URI resolution, because names take precedence (§ 6.3). Keep all schemes in the entry document and never give a component a URI-like name.
- **Filtering.** Paths and Path Items MAY be empty to hide documentation behind access control (§ 6.4). Do not mistake an empty path item for a public one.
- **External resources.** References may point at untrusted domains; tooling that dereferences automatically must account for that (§ 6.5).
- **Reference cycles.** Tooling must detect cycles to avoid resource exhaustion (§ 6.6).
- **Markdown and HTML.** CommonMark fields can contain HTML and script; tooling must sanitize (§ 6.7).
- **Usage scenarios.** The same OAD feeds code generators, routers, test tools and documentation; authors must consider the risks of each (§ 6.2).
