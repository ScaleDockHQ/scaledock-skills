# HTTP Message Signatures and mutual TLS

Read this when choosing a binding, signing or verifying WIMSE HTTP messages, or authenticating workloads with mutual TLS. Sources: `draft-ietf-wimse-http-signature-07` (`httpsig`), `draft-ietf-wimse-mutual-tls-02` (`mtls`) and `draft-ietf-wimse-workload-creds-02` (`creds`), all posture build, and RFC 9421. For RFC 9421 mechanics (signature base, component serialization, Structured Fields), use the `http-message-signatures` skill.

## Choosing a binding

| Binding                       | Use when                                                                                                                        | Source                      |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| Mutual TLS with a WIC         | TLS runs end to end between the two workloads and a CA infrastructure exists.                                                   | mtls § 1                    |
| WIT + WPT                     | TLS is terminated on the way, you want a JWT-only stack, or the proof must be adaptable to non-HTTP and asynchronous protocols. | httpsig Appendix B, wpt § 1 |
| WIT + HTTP Message Signatures | TLS is terminated on the way and you want integrity of method, path, query, headers and body, or signed responses.              | httpsig Appendix B, § 5.2   |
| Layered                       | A proxy or sidecar authenticates the transport, and the destination authenticates the application caller.                       | arch § 3.4.3                |

Appendix B of httpsig compares the two application-layer options: the WPT is simpler and less HTTP-specific; message signatures reuse an existing RFC, give stronger integrity against middleboxes, and can sign responses.

## WIMSE HTTP Message Signatures profile (httpsig § 3)

The caller signs the request with the private key of its WIT, so the signature is the proof of possession. The server MAY sign the response with its own WIT.

### Request

Covered components:

- MUST: `@method`, `@path`, `@query`. `@query` is covered even when empty (its value is then `?`, RFC 9421 § 2.2.7). `@request-target` is not used; it is NOT RECOMMENDED outside HTTP/1.1 (RFC 9421 § 2.2.5).
- `@authority` is not covered, because TLS-terminating proxies rewrite it; the audience goes in `wimse-aud` instead.
- MUST, when present: `Content-Type`, `Content-Digest`, `Authorization`, `Txn-Token`, `Workload-Identity-Token`.
- With a body, the sender MUST send `Content-Digest` and the receiver MUST recompute and compare it.

Signature parameters:

| Parameter             | Rule                                                                                                                                                                                                              |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `created`             | MUST.                                                                                                                                                                                                             |
| `expires`             | MUST, short (minutes), allowing for clock skew (httpsig § 5.1). Distinct from, and much shorter than, the WIT's `exp`.                                                                                            |
| `nonce`               | MUST. Random, with negligible collision probability across everything a recipient might see in the signature lifetime.                                                                                            |
| `tag`                 | MUST, `wimse-workload-to-workload`.                                                                                                                                                                               |
| `wimse-aud`           | MUST on requests. A String naming the intended recipient: by default the target URI without query or fragment as the sender knows it, or a deployment-specific value when intermediaries rewrite the URI (§ 3.2). |
| `wimse-sign-response` | MAY on requests. Boolean; `true` requires a signed response (§ 3.3).                                                                                                                                              |
| `keyid`, `alg`        | MUST NOT. The key is in the WIT; the algorithm is `cnf.jwk.alg` (§ 3.1).                                                                                                                                          |

Example request (httpsig § 3.7.1, wrapped and shortened):

```http
GET /gimme-ice-cream?flavor=vanilla HTTP/1.1
Host: svcb.example.com
Signature: sig1=:wfnk8T0ysp3a6bvqZAoeBoa2dFgRHooSel8jIAbKnbIP13cpy/O1J6xAYkziiUnVQ+NlMoR+ANDBHRwoB7ZIAA==:
Signature-Input: sig1=("@method" "@path" "@query" "workload-identity-token");created=1789405135;expires=1789405435;nonce="abcd1111";tag="wimse-workload-to-workload";wimse-aud="https://svcb.example.com/gimme-ice-cream";wimse-sign-response
Workload-Identity-Token: eyJhbGciOiJFZDI1NTE5Iiwia2lkIjoiaXNzdWVyLWtleSIsInR5cCI6IndpdCtqd3QifQ...
```

### Response (httpsig § 3.4, § 3.5)

- Signing the response is RECOMMENDED but optional; it can be impractical for large or streamed responses.
- It is required when the request had `wimse-sign-response` set to `true`, or when server policy requires it. A server that must sign but cannot MUST NOT return an unsigned success; it SHOULD return 400 or 501, optionally with an RFC 9457 body (§ 3.6).
- A signed response covers `@status`, `@method;req`, `@path;req`, `@query;req`, `Workload-Identity-Token` (the server's), and `Content-Type` and `Content-Digest` if present, with `created`, `expires`, `nonce` and `tag`.
- Every signed response MUST include `wimse-req-nonce` set to the request's `nonce`.
- The client MUST reject an unsigned response when it set `wimse-sign-response`; MUST validate any signed response it gets, including `wimse-req-nonce`; and MUST accept an unsigned response when it did not ask for one.
- `Accept-Signature` (RFC 9421 § 5) expresses a preference only; `wimse-sign-response` is authoritative. When sent, it MUST list at least the components this profile requires and MUST NOT ask for weaker coverage.

### Verification

1. Find the signature whose `tag` is `wimse-workload-to-workload`. None means no WIMSE signature; more than one MUST reject the message. When several signatures exist, select by tag, never by label (RFC 9421 § 7.2.5, § 7.2.7).
2. Extract and validate the WIT before verifying the signature (creds § 3; see [`tokens.md`](tokens.md)). Do not process the message further until fully validated.
3. Check the covered components and parameters above, including `Content-Digest` against the received body.
4. Verify with `cnf.jwk` using the algorithm `cnf.jwk.alg`, and reject algorithms not allowed for the peer's trust domain (§ 3.1, RFC 9421 § 7.3.6).
5. Check `created` and `expires`; reject outside the validity window (§ 5.1).
6. Check `wimse-aud` refers to this recipient using trusted configuration, not `Host` (§ 3.2).
7. SHOULD reject a seen `nonce`; a replay cache is local policy and need not be shared (§ 3, § 5.1).

### Errors (httpsig § 3.6)

Signature failures typically get 400, optionally with an RFC 9457 body. 401 is NOT RECOMMENDED, because it implies `WWW-Authenticate` and `Authorization` semantics the WIT does not use.

### Intermediaries (httpsig § 5.2, § 6)

- Intermediaries MAY add their own signatures; recipients still pick the WIMSE one by tag.
- An intermediary that changes a covered component breaks verification. Stripping and re-signing is not defined; it would authenticate the intermediary, not the origin.
- Unsigned headers can be changed or removed without detection.
- Deletion of a request and response pair is detected only when the client required a signed response.
- Send over server-authenticated TLS with RFC 9525 host name validation by the client (§ 5.1).

## Mutual TLS binding (mtls § 3, creds § 6.1)

### The Workload Identity Certificate

- An X.509 certificate with the Workload Identifier in exactly one URI SubjectAltName; no second URI SAN with a workload identifier (creds § 6.1, § 4).
- For TLS servers also reached by host name, include DNS SANs (RECOMMENDED). Other SAN types MAY be present, but only the URI SAN is the WIMSE identity (creds § 6.1).
- Servers' certificates SHOULD carry `id-kp-serverAuth`, clients' `id-kp-clientAuth`; both for dual use (mtls § 3.2).
- No requirements beyond RFC 5280 on other content or on the issuing CA (mtls § 3.2).

### Validation (mtls § 3.2, § 3.2.1, § 5)

1. Validate the peer chain with the trust anchors configured for the trust domain in the peer's identifier, plus RFC 5280 path validation.
2. Check the trust domain is the one expected for the other side.
3. Servers that authorize by client identity MUST require a client certificate in the handshake; post-handshake authentication is not specified.
4. Clients that connect by DNS name: the server SHOULD present a matching DNS-ID and the client MUST validate it per RFC 9525 § 6.3. The workload identifier adds a second identity for authorization.
5. Without DNS names, the client MUST be configured with the server's expected identifier and MUST validate it before accepting the connection.
6. The identifier's host part is a trust domain, not a host name. Prefer an exact match of the full identifier; always interpret the path within its trust domain (mtls § 3.2.1, creds § 1.3).
7. Validate chain, extended key usage and identifier before using the identity; accepting any certificate from a trusted CA lets other workloads impersonate the intended one (mtls § 5).

### Authorization (mtls § 3.3, creds § 7)

The server takes the identifier from the client certificate's URI SAN, as obtained from the TLS layer, and uses it for authorization, accounting and audit, for example by matching the full identifier against ACLs. Identity claimed in HTTP headers MUST NOT override the mTLS identity unless protected and authorized by another mechanism (mtls § 5).

### Operations (mtls § 5, creds § 9.3)

- Certificate lifetimes suit the workload; leaf and trust anchor lifetimes are considered together, since a compromised anchor can issue for the whole domain (creds § 9.3.1).
- Private keys MUST be protected and MUST NOT be shared across unrelated workload instances; generate them in the workload runtime or a key protection mechanism where possible (mtls § 5).
- When a gateway, mesh or proxy terminates TLS, the certificate may represent the intermediary. Where end-to-end workload authentication is needed across it, SHOULD add an application-layer WIMSE mechanism (mtls § 5).
- Client certificates reveal the client identifier to the server and to TLS-terminating intermediaries (mtls § 5, creds § 10).

## Common mistakes

- Signing `@request-target` or `@authority` (http-signature-06 and earlier, or s2s-protocol); see [`versions.md`](versions.md).
- Picking the signature by label `wimse` instead of by tag.
- Sending `keyid` or `alg` in `Signature-Input`.
- Treating "chain validates to our CA" as authentication of the intended workload without checking the identifier.
- Authorizing on the URI path without the trust domain.
