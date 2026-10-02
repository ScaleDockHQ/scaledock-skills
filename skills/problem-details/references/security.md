# Security considerations

Section numbers refer to RFC 9457 unless another document is named.

## What to keep out of a problem

- Vet the information in each new problem type, and scrutinize the details of each generated problem, however it is serialized (§ 5).
- The risks are leaking information that helps compromise the system, access to it, or the privacy of its users (§ 5).
- Do not expose implementation details such as stack dumps, including through links to occurrence information such as `instance` (§ 5).
- Problem details describe the HTTP interface, not the implementation behind it; they are not a debugging tool (§ 4).
- `detail` ought to help the client correct the problem rather than give debugging information (§ 3.1.4).

Practical checks that follow from these rules:

- Log the internal cause server-side and return only what the client can act on.
- Do not put database errors, query text, file paths, hostnames or internal IDs in `detail`, `instance` or extension members.
- Do not include other users' data in a problem, even in extension members meant for machines.

## Unauthenticated callers

When a request carries no authentication information, RFC 6750 § 3.1 says the resource server SHOULD NOT include an error code or other error information in the Bearer challenge. Keep the problem body equally generic in that case, so the body does not reveal what the header withholds. See [`auth-challenges.md`](auth-challenges.md).

## Hiding existence

An origin server that wishes to hide that a forbidden resource exists MAY answer 404 instead of 403 (RFC 9110 § 15.5.4). When you do, return exactly the problem body a missing resource gets, or the difference reveals what the status code hides.

## Status disagreement

The `status` member duplicates the HTTP status code, so the two can disagree (§ 5). Their precedence is not defined: a mismatch can mean an intermediary changed the code in transit. Proxies, load balancers, firewalls and virus scanners will not read `status` (§ 5). Producers always send the same value in both places (§ 3.1.2); consumers act on the HTTP status code and treat `status` as a hint, for example when a stored body has lost its HTTP context (§ 3.1.2).

## Type URIs

Consumers SHOULD NOT automatically dereference `type` (§ 3.1.1). Fetching attacker-supplied URIs from a client or a gateway turns every error response into an outbound request.
