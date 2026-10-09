# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06 and are quoted as written. The NLWeb Specification uses BCP 14 keywords only in a few places (SHOULD, MUST); most of its rules are attribute definitions marked required or optional and plain statements of endpoint behaviour, which are quoted as the defining rules. The REST API document describes the reference implementation. Apply the ones that match the role. Each is labelled with the nearest section of the document.

## NLWeb Specification v0.55

Source: https://raw.githubusercontent.com/nlweb-ai/website/9cd2fd6ceb9e23c6257db782e7058c0a1655894e/NLWEBSPEC.md

- **§ 2.4 Authentication and Authorization.** NLWeb agents SHOULD document their authentication requirements separately.
- **§ 2.5 Rate Limiting.** Agents implementing NLWeb over HTTP SHOULD use standard HTTP rate limiting mechanisms (e.g., 429 status codes with Retry-After headers).
- **§ 3.1 Query (Required).** text (string, required): The natural language query string from the user.
- **§ 3.1 Query (Required).** These attributes, and their values, should use schema.org vocabulary or comparable schemas where possible.
- **§ 3.2 Context (Optional).** When omitted, ConversationalContext is assumed.
- **§ 3.3.1 response_format.** NLWeb agents may support additional formats. A client may specify the formats it can accept, and the NLWeb agent chooses the best match.
- **§ 4 Response Structure.** NLWeb responses are always JSON objects with a required metadata field (_meta) and one or more content fields whose structure depends on the response type.
- **§ 4 Response Structure.** Request metadata uses the attribute name meta. Response metadata uses _meta (with a leading underscore) to clearly distinguish request metadata from response metadata.
- **§ 4 Response Structure: \_meta.** response_type (string, required): One of "answer", "elicitation", "promise", or "failure".
- **§ 4.1.1 Answer.** A summary item SHOULD use @type of "SearchSummary" (or a domain-appropriate type) and include a text attribute with the summary content.
- **§ 4.1.2 Promise.** token (string, required): An opaque identifier for the promise, used with the await API.
- **§ 4.1.4 Failure.** code (string, required): A machine-readable error code.
- **§ 4.2 Await.** If the task is still running, it returns another promise (with an updated progress value if available). If complete, it returns an answer. If the task was cancelled, it returns a failure with code "CANCELLED".
- **§ 5 Actions.** protocol (string, required): The protocol used to invoke the action.
- **§ 6.1 Event Types: start.** Clients SHOULD use this event to initialize their response handling.
- **§ 6.1 Event Types: result.** Results may arrive out of order (i.e., index values are not guaranteed to be sequential).
- **§ 6.1 Event Types: complete.** Clients MUST process this event to capture session state for subsequent requests.
- **§ 7.1 Endpoints.** POST /ask — Submit a natural language query.
- **§ 7.4 HTTP Status Codes.** NLWeb agents SHOULD use appropriate HTTP status codes:
- **§ 7.4 HTTP Status Codes.** 202 Accepted: Promise response for long-running tasks.
- **§ 7.4 HTTP Status Codes.** Note that an NLWeb failure response (Section 4.1.4) is an application-level response and is typically returned with HTTP 200, since the HTTP request itself was processed successfully.

## Reference implementation REST API

Source: https://raw.githubusercontent.com/nlweb-ai/NLWeb/b423f15d9aeaa023ce75993ac9deed2354597043/docs/nlweb-rest-api.md

- **NLWeb Rest API.** At this point, NLWeb supports 2 APIs at the endpoints /ask and /mcp. The arguments are the same for both, as is most of the functionality.
- **NLWeb Rest API.** In the included implementation, there is no server side state. So, the context of the conversation thus far has to be passed back as part of the request.
- **NLWeb Rest API.** `decontextualized_query`: the entire decontextualized query. If this is available, no decontextualization is done on the server side
