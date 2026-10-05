# Client features

Read this when building the client side: declaring capabilities, answering `InputRequiredResult`, sampling, elicitation, roots, caching and pagination. Rules are from MCP 2026-07-28; citations name the page and heading. In 2025-11-25 and earlier, the same `sampling/createMessage`, `elicitation/create` and `roots/list` payloads arrived as server-initiated JSON-RPC requests instead (2026-07-28 Key Changes, Major 7).

## Declaring capabilities

Clients declare capabilities in `_meta["io.modelcontextprotocol/clientCapabilities"]` on every request, not once per connection: `sampling` (with optional `tools` and the deprecated `context`), `elicitation` (with `form` and/or `url`), `roots`, and `extensions` (Sampling, Elicitation and Roots, Capabilities). A server MUST NOT rely on a capability the request did not declare (Base Protocol, General fields: `_meta`).

## Answering `InputRequiredResult` (MRTR)

From the Multi Round-Trip Requests page:

1. When a result has `resultType: "input_required"` and `inputRequests`, build every requested input (ask the user, call the model, list roots) before retrying. Without `inputRequests`, the client MAY retry immediately.
2. Retry the original request with the same parameters plus `inputResponses`, keyed by the same keys as `inputRequests`.
3. Echo `requestState` exactly if it was present; never inspect, parse or change it; never add one that was not sent.
4. Use a new JSON-RPC `id` for the retry.
5. Use `inputRequests` and `requestState` only for that retry, never for parallel requests.
6. If the user declines or an error occurs, the client need not retry; the server is not waiting (Sampling and Roots, Error Handling).

Retries that carry `inputResponses` or `requestState` MUST NOT be cached (Caching, Cache Key).

## Elicitation

From the Elicitation page:

- Modes: `form` (in-band structured data the client sees) and `url` (out-of-band; the client sees only the URL). A missing `mode` MUST be treated as `form`. An empty `elicitation: {}` capability means form only. Clients declaring `elicitation` MUST support at least one mode, and servers MUST NOT send a mode the client did not declare.
- Every request has a `message`. Form requests carry `requestedSchema`: a flat object of primitive properties only (string with `minLength`, `maxLength`, `format` of `email`, `uri`, `date` or `date-time`; number or integer with `minimum` and `maximum`; boolean; single-select enum with `enum` or `oneOf` `const`/`title`; multi-select array of enums), each with an optional `default` that clients SHOULD pre-fill.
- URL requests carry `url`, which MUST be a valid URL. URL mode is not for authorizing the client to the MCP server.
- Responses: `action` is `accept` (form: `content` matches the schema; URL: no `content`, and it means consent, not completion), `decline` or `cancel`. Servers MUST handle decline, cancel and failure.
- Servers MUST NOT request passwords, API keys, access tokens or payment credentials through form mode, and MUST use URL mode for them.

Client obligations:

- MUST show which server is asking, offer decline and cancel, and for form mode let the user review and edit before sending.
- URL mode: MUST NOT pre-fetch the URL or its metadata; MUST NOT open it without explicit consent; MUST show the full URL first; MUST open it so neither the client nor the model can see the page or the user's input. SHOULD highlight the domain, warn on Punycode, and not render other URLs as clickable.
- SHOULD give the user manual retry and cancel controls after accepting a URL elicitation.

Server obligations for URL mode and third-party authorization (Elicitation, Implementation Considerations and Security Considerations):

- MUST bind elicitations to the client and user identity, and MUST verify that the user who opens the URL is the one who started the request (phishing defence).
- MUST NOT put user credentials or PII in the URL, MUST NOT send a pre-authenticated URL, SHOULD use HTTPS.
- Third-party credentials obtained through URL mode MUST NOT transit the client, and MUST NOT be sent to it; the server MUST NOT use the client's own token for the third party (token passthrough). Stored state MUST be protected and keyed to the user derived from MCP authorization (for example `sub`).
- MUST NOT rely on URL elicitation to authorize users to the MCP server itself.

## Sampling (deprecated)

Sampling is Deprecated as of 2026-07-28: new implementations SHOULD NOT add it; integrate directly with LLM provider APIs (Sampling; Deprecated Features). If kept, from the Sampling page:

- There SHOULD be a human in the loop who can deny requests, review and edit prompts, and review responses.
- Request: `messages` (each with `role` `user` or `assistant` and `content`), required `maxTokens` (clients MUST respect it), optional `systemPrompt`, `temperature`, `stopSequences`, `metadata`, `modelPreferences` (`hints` as name substrings, plus `costPriority`, `speedPriority`, `intelligencePriority` from 0 to 1), `includeContext`, `tools` and `toolChoice`.
- Clients MAY modify or ignore `systemPrompt`, `includeContext`, `temperature`, `stopSequences` and `metadata`; hints are advisory and the client picks the model.
- `includeContext` `"thisServer"` and `"allServers"` are deprecated: servers SHOULD omit the field (default `"none"`) and SHOULD NOT use them unless the client declared `sampling.context`.
- Tools in sampling require the client's `sampling.tools` capability; servers MUST NOT send `tools` otherwise. `toolChoice.mode` is `auto` (default), `required` or `none`.
- A user message with `tool_result` content MUST contain only tool results, and every assistant `tool_use` MUST be followed by a user message answering each `id` with a matching `toolUseId`. Both sides SHOULD cap tool-loop iterations.
- Result: `role`, `content` (one block or an array), `model`, `stopReason` (`endTurn`, `stopSequence`, `maxTokens`, `toolUse`, or another value).
- Messages SHOULD NOT be retained between requests. Clients SHOULD rate limit; both sides MUST handle sensitive data appropriately.

## Roots (deprecated)

Roots is Deprecated as of 2026-07-28: pass directories or files through tool parameters, resource URIs or server configuration instead (Roots; Deprecated Features). If kept: declare `roots`; answer a `roots/list` input request with `roots`, each a `file://` `uri` (MUST) and optional `name`. Roots are guidance, not access control. Clients MUST expose only permitted roots, validate URIs against traversal and enforce access controls, and SHOULD ask the user before exposing roots. `notifications/roots/list_changed` no longer exists (Key Changes, Major 5).

## Caching and pagination on the client

From the Caching page:

- The cache key is the method plus the parameters that affect the result (for example `uri` or `cursor`). Never serve a cached response for a different method or parameters.
- Fresh while `now < t_received + ttlMs`. `ttlMs` of 0 means stale; a missing `ttlMs` (older servers) SHOULD be treated as 0; a negative one as 0.
- TTL is not a polling interval: re-fetch on access when stale. Clients that poll anyway MUST apply jitter and backoff. A matching list-changed notification invalidates the cache immediately.
- `"private"` results MUST NOT be shared across authorization contexts; a different token needs a different cache.
- Each page caches on its own; re-fetch from the start for a consistent snapshot, and discard all pages when a cursor becomes invalid.

From the Pagination page: treat a missing `nextCursor` as the end, and an empty-string cursor as a real cursor.

## Handling tool results

- Exclude tools with invalid `x-mcp-header` annotations when using Streamable HTTP, and log why (Tools, `x-mcp-header`).
- Validate `structuredContent` against `outputSchema` (SHOULD), give tool execution errors to the model (SHOULD), and treat annotations from untrusted servers as untrusted (MUST) (Tools).
- Never automatically dereference a network `$ref` in a schema; an opt-in fetch mode MUST be off by default and SHOULD use an allowlist and reject loopback, link-local and private addresses (Base Protocol, `$ref` Resolution).
