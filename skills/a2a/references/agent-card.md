# Agent Card

The Agent Card is a JSON document an A2A server publishes to describe its identity, capabilities, skills, service endpoints and authentication requirements (A2A specification § 2.2, § 8.1). Field names below are the JSON (camelCase) names of the `AgentCard` message in `a2a.proto` v1.0.1 (§ 5.5).

## Discovery

- Well-known URI: `https://{server_domain}/.well-known/agent-card.json` (§ 8.2). The registration in § 14.3 says the resource at this URI must return an `AgentCard` object.
- Clients can also find cards through registries or catalogs, or through direct configuration (§ 8.2).

## Fields

REQUIRED in the proto: `name`, `description`, `supportedInterfaces`, `version`, `capabilities`, `defaultInputModes`, `defaultOutputModes`, `skills`.

| Field                  | Type                            | Notes                                                                                                 |
| ---------------------- | ------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `name`                 | string                          | Required.                                                                                             |
| `description`          | string                          | Required.                                                                                             |
| `supportedInterfaces`  | `AgentInterface[]`              | Required. Ordered; the first entry is preferred (§ 8.3.1).                                            |
| `provider`             | `AgentProvider`                 | `organization` and `url`, both required when present.                                                 |
| `version`              | string                          | Required. The agent's own version, not the protocol version.                                          |
| `documentationUrl`     | string                          | Optional.                                                                                             |
| `capabilities`         | `AgentCapabilities`             | Required. `streaming`, `pushNotifications`, `extendedAgentCard` (optional booleans) and `extensions`. |
| `securitySchemes`      | map of name to `SecurityScheme` | How callers authenticate.                                                                             |
| `securityRequirements` | `SecurityRequirement[]`         | Requirements for contacting the agent.                                                                |
| `defaultInputModes`    | string[]                        | Required. Media types accepted across all skills.                                                     |
| `defaultOutputModes`   | string[]                        | Required. Media types produced across all skills.                                                     |
| `skills`               | `AgentSkill[]`                  | Required.                                                                                             |
| `signatures`           | `AgentCardSignature[]`          | JWS signatures over the card (§ 8.4).                                                                 |
| `iconUrl`              | string                          | Optional.                                                                                             |

Version 1.0 moved the extended card flag into `capabilities.extendedAgentCard` and renamed `supportsAuthenticatedExtendedCard` to `supportsExtendedAgentCard` on the way (v1.0.0 release notes). Do not use either old top-level name. Upgrading a 0.3 card: [`versions.md`](versions.md).

### AgentInterface

| Field             | Notes                                                                                                                  |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `url`             | Required.                                                                                                              |
| `protocolBinding` | Required. Open string; the core values are `JSONRPC`, `GRPC` and `HTTP+JSON` (proto comment).                          |
| `protocolVersion` | Required. `Major.Minor`, for example `"1.0"`; patch versions are not used (§ 3.6).                                     |
| `tenant`          | Optional. When set, clients put exactly this value in the `tenant` field of every request to this interface (§ 8.3.2). |

Client selection rules (§ 8.3.2): parse `supportedInterfaces`, pick the first supported transport, prefer earlier entries, use that entry's URL, and set `tenant` as declared.

### AgentSkill

| Field                       | Notes                                      |
| --------------------------- | ------------------------------------------ |
| `id`                        | Required.                                  |
| `name`                      | Required.                                  |
| `description`               | Required.                                  |
| `tags`                      | Required, string[].                        |
| `examples`                  | Example prompts or inputs.                 |
| `inputModes`, `outputModes` | Override the card defaults for this skill. |
| `securityRequirements`      | Per-skill security requirements.           |

### Extensions

`capabilities.extensions` lists `AgentExtension` objects: `uri`, `description`, `required`, `params` (§ 4.6.1). A client activates extensions per request with the `A2A-Extensions` service parameter (§ 3.2.6). If an extension is `required: true` and the client does not declare it, the server returns `ExtensionSupportRequiredError` (§ 3.3.4).

## Security schemes and requirements

`SecurityScheme` is a oneof; in JSON exactly one of these keys is set (proto, JSON Schema):

| JSON key                      | Fields                                                            |
| ----------------------------- | ----------------------------------------------------------------- |
| `apiKeySecurityScheme`        | `location` (`query`, `header` or `cookie`), `name`, `description` |
| `httpAuthSecurityScheme`      | `scheme` (for example `Bearer`), `bearerFormat`, `description`    |
| `oauth2SecurityScheme`        | `flows` (`OAuthFlows`), `oauth2MetadataUrl`, `description`        |
| `openIdConnectSecurityScheme` | `openIdConnectUrl`, `description`                                 |
| `mtlsSecurityScheme`          | `description`                                                     |

`OAuthFlows` is also a oneof: `authorizationCode` (`authorizationUrl`, `tokenUrl`, `refreshUrl`, `scopes`, `pkceRequired`), `clientCredentials` (`tokenUrl`, `refreshUrl`, `scopes`) or `deviceCode` (`deviceAuthorizationUrl`, `tokenUrl`, `refreshUrl`, `scopes`). `implicit` and `password` are deprecated in the proto; v1.0.0 removed them from the flows the specification describes and added device code and PKCE (release notes, § 4.5.7 to § 4.5.10; upgrade steps in [`versions.md`](versions.md)).

`SecurityRequirement` is `{ "schemes": { "<scheme name>": { "list": ["<scope>", ...] } } }`: a map from a key of `securitySchemes` to the required scopes (proto, JSON Schema). Put a list on the card for the whole agent and on each skill that needs more.

The sample card in § 8.5 and the prose in § 3.1.11 and § 13.3 still write `security`. The proto field is `security_requirements` (JSON `securityRequirements`) and the JSON Schema rejects unknown properties (`additionalProperties: false`), so use `securityRequirements`.

## Extended Agent Card

- Advertise it with `capabilities.extendedAgentCard: true` (§ 3.1.11).
- Fetch it with the `GetExtendedAgentCard` operation (`GET /extendedAgentCard` on HTTP+JSON), authenticated with a scheme from the public card (§ 3.1.11, § 5.3).
- It may add skills, capabilities or configuration for the authenticated caller; clients replace their cached public card with it for the authenticated session or until the card's version changes (§ 3.1.11).
- Without the capability the server returns `UnsupportedOperationError`; with the capability but no extended card configured, `ExtendedAgentCardNotConfiguredError` (§ 3.3.4).

## Caching

- Server: send `Cache-Control` with `max-age`, and an `ETag` derived from `version` or a hash of the card; `Last-Modified` is optional (§ 8.6.1).
- Client: honor RFC 9111 caching and revalidate with `If-None-Match` or `If-Modified-Since` (§ 8.6.2).

## Example

```json
{
  "name": "Invoice Agent",
  "description": "Reads and summarises invoices.",
  "supportedInterfaces": [
    {
      "url": "https://agent.example.com/a2a",
      "protocolBinding": "HTTP+JSON",
      "protocolVersion": "1.0"
    },
    {
      "url": "https://agent.example.com/a2a/rpc",
      "protocolBinding": "JSONRPC",
      "protocolVersion": "1.0"
    }
  ],
  "provider": { "organization": "Example Inc.", "url": "https://example.com" },
  "version": "2.3.0",
  "capabilities": {
    "streaming": true,
    "pushNotifications": false,
    "extendedAgentCard": true
  },
  "securitySchemes": {
    "oauth": {
      "oauth2SecurityScheme": {
        "flows": {
          "authorizationCode": {
            "authorizationUrl": "https://auth.example.com/authorize",
            "tokenUrl": "https://auth.example.com/token",
            "scopes": {
              "invoices:read": "Read invoices",
              "invoices:approve": "Approve invoices"
            },
            "pkceRequired": true
          }
        }
      }
    }
  },
  "securityRequirements": [
    { "schemes": { "oauth": { "list": ["invoices:read"] } } }
  ],
  "defaultInputModes": ["text/plain"],
  "defaultOutputModes": ["application/json"],
  "skills": [
    {
      "id": "summarise-invoice",
      "name": "Summarise invoice",
      "description": "Returns totals, due date and line items for one invoice.",
      "tags": ["invoices"],
      "examples": ["Summarise invoice INV-1042"]
    },
    {
      "id": "approve-invoice",
      "name": "Approve invoice",
      "description": "Marks an invoice as approved for payment.",
      "tags": ["invoices", "approval"],
      "securityRequirements": [
        { "schemes": { "oauth": { "list": ["invoices:approve"] } } }
      ]
    }
  ]
}
```

Serving it, framework-neutral:

```ts
async function handleAgentCard(
  request: Request,
  card: object,
  cardVersion: string,
): Promise<Response> {
  const etag = `"${cardVersion}"`;
  if (request.headers.get("if-none-match") === etag) {
    return new Response(null, { status: 304, headers: { etag } });
  }
  return new Response(JSON.stringify(card), {
    headers: {
      "content-type": "application/json",
      "cache-control": "public, max-age=300",
      etag,
    },
  });
}
```
