# The header and server processing

Section numbers refer to RFC 6797 unless another document is named.

## Grammar

The ABNF is based on the RFC 2616 generic grammar, including implied linear whitespace (§ 6.1):

```abnf
Strict-Transport-Security = "Strict-Transport-Security" ":"
                            [ directive ]  *( ";" [ directive ] )

directive                 = directive-name [ "=" directive-value ]
directive-name            = token
directive-value           = token | quoted-string
```

Rules for directives (§ 6.1):

1. Order is not significant.
2. Each directive MUST appear only once in a header field.
3. Directive names are case-insensitive (`includesubdomains` equals `includeSubDomains`; errata 5204).
4. A user agent MUST ignore a header field whose directives or other value data do not conform to the grammar.
5. A user agent MUST ignore unrecognized directives and, if the field otherwise satisfies rules 1 to 4, process the recognized ones.

New directives may be defined by other specifications, with an IANA registry under IETF Review created at that time (§ 6.1). User agents that implement only RFC 6797 ignore them (§ 6.1).

## Directives

| Directive           | Required | Value                                    | Meaning                                                                          |
| ------------------- | -------- | ---------------------------------------- | -------------------------------------------------------------------------------- |
| `max-age`           | yes      | delta-seconds (`1*DIGIT`), may be quoted | Seconds after receipt during which the host is a Known HSTS Host (§ 6.1.1).      |
| `includeSubDomains` | no       | none (valueless)                         | The policy also applies to every subdomain of the host's domain name (§ 6.1.2).  |
| `preload`           | no       | none                                     | Not in RFC 6797. A request to be included in the preload list (hstspreload.org). |

`max-age=0` tells the user agent to stop treating the host as a Known HSTS Host, including any `includeSubDomains` (§ 6.1.1). The `preload` token has meaning only to the hstspreload.org submission process; to an RFC 6797 user agent it is an unrecognized directive and is ignored (§ 6.1). See [`deployment-and-preload.md`](deployment-and-preload.md).

## Examples

From § 6.2:

```http
Strict-Transport-Security: max-age=31536000
Strict-Transport-Security: max-age=15768000 ; includeSubDomains
Strict-Transport-Security: max-age="31536000"
Strict-Transport-Security: max-age=0
Strict-Transport-Security: max-age=0; includeSubDomains
```

The first applies for about a year to the issuing host only; the second for about six months to the host and all its subdomains; the third shows the quoted form; the last two both delete the policy, because `includeSubDomains` is ignored when `max-age` is zero (§ 6.2).

The example hstspreload.org gives of a header that meets its preload requirements:

```http
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

## Server processing over secure transport (§ 7.1)

- An HSTS Host SHOULD include the header in responses to requests received over secure transport, and the header MUST satisfy the § 6.1 grammar.
- If the header is included, the host MUST include only one.
- The requirement is a SHOULD only to accommodate caches and load balancers that make uniform emission hard (§ 7.1 note). Aim for every HTTPS response anyway: a user agent notes the host from any one valid header (§ 7.1).
- A host can also become known through other means, such as a preloaded list (§ 7.1, § 12.3).

## Server processing over plain HTTP (§ 7.2)

- If an HSTS Host receives a request over non-secure transport, it SHOULD answer with a permanent redirect, such as 301, whose `Location` is the request's effective request URI changed to the `https` scheme, or an `https` URI chosen by local policy.
- It is a SHOULD because of the risks of server-side insecure-to-secure redirects and because some sites with third-party components break when redirected but work when accessed uniformly over HTTPS (§ 7.2 note).
- An HSTS Host MUST NOT send the header in responses over non-secure transport.

hstspreload.org additionally requires, for preload submission, redirecting from HTTP to HTTPS on the same host when listening on port 80, and sending the HSTS header on any redirect served from the HTTPS site (the redirect itself, not only the page it points to).

## The effective request URI (§ 9)

Build the redirect target from the effective request URI:

- If the request-target is an absolute URI, that is the effective request URI (§ 9.2).
- Otherwise, for the origin form or `*` with a `Host` header: scheme (`http` over plain TCP, `https` over TLS), `://`, the host and port from `Host`, and the request-target unless it is `*` (§ 9.2).
- Without a `Host` header, or for the authority form, it is undefined (§ 9.2).

Example 1 in § 9.2.1: `GET /pub/WWW/TheProject.html` with `Host: www.example.org:8080` over plain TCP gives `http://www.example.org:8080/pub/WWW/TheProject.html`. The HTTPS redirect for it changes only the scheme, unless local policy picks another `https` URI (§ 7.2).

## Entry points

A host that only redirects (for example `example.com` to `https://www.example.com/`) may never be contacted directly by many user agents, so a policy sent only there leaves users of `www` unprotected. Send the header directly at every domain or subdomain that is a well-known entry point, whether or not `includeSubDomains` is used (§ 11.4.2).

## Common mistakes

- Sending the header on the HTTP response, or relying on it there. It is forbidden (§ 7.2) and ignored (§ 8.1).
- Two `Strict-Transport-Security` fields on one response, often one from the application and one from a proxy. Only one is allowed (§ 7.1), and user agents process only the first (§ 8.1).
- Repeating a directive, or adding a value to `includeSubDomains`. The user agent ignores the whole header (§ 6.1).
- Omitting `max-age`. It is required (§ 6.1.1), so the header does not conform and is ignored (§ 6.1).
- Setting HSTS through `<meta http-equiv>`. User agents MUST NOT heed it (§ 8.5).
- Treating HSTS as origin-scoped. It applies to every port of the host (§ 8.3, Appendix B).
