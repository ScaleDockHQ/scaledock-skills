# Delivery

Read this when building the sending side: retries, status handling, timeouts, disabling endpoints, and the features consumers expect around delivery. Section names refer to the Standard Webhooks specification in [Sources](../SKILL.md#sources). These are recommendations, not compatibility requirements, except where noted.

## Request

- Send the payload as the body of an HTTP POST, with the three `webhook-` headers (Webhook headers).
- Use a request timeout between 15 and 30 seconds, so consumers have time to process and acknowledge (Request timeouts).

## Success and failure

A delivery succeeds only on a `2xx` status (200 to 299). Anything else fails, including non-`2xx` statuses such as 404 and 500, request timeouts and connection resets (Delivery success and failure).

Suggested handling (Delivery success and failure):

| Response                                 | Handling                                                                                       |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `2xx`                                    | Success.                                                                                       |
| `3xx`                                    | Failure. Do not follow redirects; the owner should update the webhook URL instead.             |
| `410 Gone`                               | The receiver no longer wants webhooks from this source: disable the endpoint and stop sending. |
| `429 Too Many Requests`                  | Rate limit reached: throttle further requests.                                                 |
| `502 Bad Gateway`, `504 Gateway Timeout` | Usually a server under load: throttle.                                                         |
| Any other status                         | Failure.                                                                                       |

When a response carries `retry-after` (for example with `503 Service Unavailable`), take it into account when scheduling the next attempt (Delivery success and failure).

On the consumer side this means: return `2xx` once the webhook is accepted, and keep processing within the producer's timeout.

## Retries

The producer retries until an attempt succeeds or it decides delivery is not possible (Deliverability and reliability):

- Retry on a schedule spanning multiple days, with exponential backoff.
- Add random jitter, so failures caused by the load of the webhook attempts themselves do not recur in lockstep.
- Keep `webhook-id` the same on every attempt and set a fresh `webhook-timestamp`, then sign again, because the timestamp is part of the signed content (Webhook metadata, Signature scheme).

Example schedule from the specification (Deliverability and reliability):

| Delay       | Time since start |
| ----------- | ---------------- |
| Immediately | 00:00:00         |
| 5 seconds   | 00:00:05         |
| 5 minutes   | 00:05:05         |
| 30 minutes  | 00:35:05         |
| 2 hours     | 02:35:05         |
| 5 hours     | 07:35:05         |
| 10 hours    | 17:35:05         |
| 14 hours    | 31:35:05         |
| 20 hours    | 51:35:05         |
| 24 hours    | 75:35:05         |

## Persistent failure

When delivery fails consistently over a long period, notify the consumer through another channel, such as email, and disable future delivery to the endpoint (Deliverability and reliability). A `410 Gone` disables it straight away (Delivery success and failure).

## Idempotency

Retries, networking issues and malicious replays mean a consumer can receive the same event more than once. `webhook-id` is the idempotency key: process each id once (Webhook metadata, Verifying signatures).

## Event types and filtering

- One event type always has the same payload schema, the way one REST path has one schema (Event types).
- Let consumers choose which event types each endpoint receives, and filter on the producer side, so consumers do not receive events they do not want (Event types).

## Additional functionality

Not core requirements, but recommended (Additional functionality):

- **Multiple endpoints (fanout).** Let a customer register several endpoints that receive the same event, for example a billing system, a CRM and a chat tool all receiving `invoice.paid`.
- **Visibility into failures and manual retries.** Let customers list failed messages with the failure reasons, and replay a specific message or all failures in a time range to recover from long outages.
- **Endpoint management API.** An API to add, remove and list endpoints, so consumers and third parties can automate subscriptions, for example a workflow tool that adds an endpoint when a user creates a trigger.

## Network

- **HTTPS.** Depending on the content, require HTTPS endpoints: the signature gives authenticity and integrity but not confidentiality (Enforcing HTTPS).
- **Static source IPs.** Some consumers only admit traffic from a fixed list of IPs; publishing static source IPs is common, though not required (Static source IPs).
- **SSRF.** Send through a filtering proxy from an isolated subnet; see [`payloads-and-security.md`](payloads-and-security.md).
