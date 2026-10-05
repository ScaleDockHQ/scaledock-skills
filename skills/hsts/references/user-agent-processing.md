# User agent processing

Section numbers refer to RFC 6797 unless another document is named. The processing model assumes domain names are already IDNA-canonicalized (§ 8, § 10).

## Receiving the header (§ 8.1)

If a response received over secure transport carries a header that conforms to § 6.1, and there are no secure transport errors or warnings (§ 8.4), the user agent MUST either:

- note the host as a Known HSTS Host, if not already noted (§ 8.1.1); or
- update the cached information when `max-age` or `includeSubDomains` convey information different from what is stored. `max-age` is a time to live relative to receipt, so each receipt moves the expiry even when the value is unchanged (§ 8.1, § 11.2; errata 5372).

Then:

- `max-age=0`: the user agent MUST remove the cached policy, including `includeSubDomains`, if the host is known, and MUST NOT note the host if it is not (§ 8.1).
- More than one header in a response: process only the first (§ 8.1).
- Header received over insecure transport: ignore it (§ 8.1).
- Header that does not conform to the grammar: ignore it (§ 8.1, § 6.1).
- `<meta http-equiv="Strict-Transport-Security">`: never heed it (§ 8.5).

## Storage model (§ 8.1.1, § 5.3)

- If the request URI's host is an IP literal or IPv4 address, the user agent MUST NOT note it (§ 8.1.1). HSTS Hosts are identified only by domain names (Appendix A item 4).
- Otherwise, if the host does not congruently match an existing Known HSTS Host, the user agent MUST note it, storing the domain name, the expiry time from `max-age`, and whether `includeSubDomains` is asserted (§ 8.1.1).
- The user agent MUST NOT modify the expiry or `includeSubDomains` of any superdomain-matched Known HSTS Host (§ 8.1.1). Policies are stored and indexed strictly by the issuing host's domain name, separate from superdomain and subdomain policies, and only the issuing host can update or delete its own (§ 5.3).
- An entry whose expiry is in the past is expired; the user agent MUST evict expired entries (§ 8.1.1).
- A missing header on later secure responses does not remove the policy; the host stays known until `max-age` runs out (§ 8.6). Preloaded entries may never age out (§ 8.6).

RFC 6797 has no `localhost` exception; a proposal to let user agents skip noting `localhost` was rejected as an erratum because it changes the normative text (errata 8153).

## Domain name matching (§ 8.2)

Compare the given domain name with each unexpired Known HSTS Host label by label, ASCII case-insensitively, from the rightmost label leftwards.

- **Superdomain match**: the whole Known HSTS Host name matches a right-hand portion of the given name. For `qaz.bar.foo.example.com`, both `bar.foo.example.com` and `foo.example.com` are superdomain matches. There can be several.
- **Congruent match**: the labels match with none left over. `foo.example.com` congruently matches `foo.example.com`.
- Otherwise there is no match.

A host can set policy for itself and its subdomains, never for a parent or a sibling: neither `foo.example.com` nor `bar.foo.example.com` can set policy for `example.com`, and `foo.example.com` cannot set it for `sibling.example.com` (§ 2.4.1.1).

## Loading URIs and port mapping (§ 8.3)

Before loading any `http` URI, including when following redirects, the user agent MUST:

1. Take the host component of the URI's authority.
2. If it is null, there is no match.
3. If it is an IP literal or IPv4 address, there is no match.
4. Otherwise, match the domain name against the Known HSTS Hosts (§ 8.2).
5. If a superdomain match with `includeSubDomains` asserted is found, or, failing that, a congruent match (with or without `includeSubDomains`), then before loading:
   - replace the scheme with `https`;
   - change an explicit port `80` to `443`;
   - keep any other explicit port;
   - add no port if none is given.

| Known HSTS Host                        | Requested URI               | Result                          |
| -------------------------------------- | --------------------------- | ------------------------------- |
| `example.com`                          | `http://example.com/a`      | `https://example.com/a`         |
| `example.com`                          | `http://example.com:80/a`   | `https://example.com:443/a`     |
| `example.com`                          | `http://example.com:8080/a` | `https://example.com:8080/a`    |
| `example.com` (no `includeSubDomains`) | `http://www.example.com/a`  | not upgraded                    |
| `example.com` with `includeSubDomains` | `http://www.example.com/a`  | `https://www.example.com/a`     |
| `www.example.com`                      | `http://example.com/a`      | not upgraded (no parent policy) |
| any                                    | `http://192.0.2.1/a`        | not upgraded (IP literal)       |

The policy covers HTTP over every TCP port of the host (§ 8.3 note, Appendix B). With an explicit port, a plain-HTTP server may be running there and the HTTPS request may fail; the design accepts that cost (§ 8.3 note, Appendix A item 6).

## Transport errors (§ 8.4, § 12.1)

- When connecting to a Known HSTS Host, the user agent MUST terminate the connection on any secure transport error, whether warning, fatal or another level. This includes certificate validity errors (for example through CRLs or OCSP) and TLS server identity errors (§ 8.4).
- Fail with no user recourse: no dialog that lets the user proceed. Treat it like a server error where the user can only wait and retry (§ 12.1). "Any warnings or errors" means anything that would make the user agent tell the user something is wrong with connection establishment (§ 12.1).

## Optional features (§ 12)

Section 12 is non-normative implementation advice:

- **User-declared policy**: let users mark a domain as an HSTS Host before any visit, which helps against the bootstrap MITM attack (§ 12.2).
- **Preloaded list**: ship policies for sites with the user agent, much like built-in root CA certificates (§ 12.3). See [`deployment-and-preload.md`](deployment-and-preload.md).
- **Block mixed security context loads**: secure pages that fetch resources without secure transport (§ 12.4).
- **Per-host deletion**: let users delete a cached policy, deliberately, and guard against scripts that remove entries silently (§ 12.5).

## IDNA (§ 10, § 13, § 14.10)

- User agents SHOULD implement IDNA2008 and MAY implement RFC 5895 or UTS 46; a user agent that does not implement IDNA2008 MUST implement IDNA2003 (§ 13).
- Canonicalize each label (IDNA2008: RFC 5891 § 5.3 to § 5.5; IDNA2003: ToASCII), join with `.`, and use the result for all § 8 processing; on errors, the name was not canonicalized (§ 10).
- Inconsistent Unicode or IDNA validation can produce false-positive or false-negative matches (§ 14.10).

## HTTPS DNS records (RFC 9460)

An HTTPS resource record gives an upgrade signal similar to HSTS, from DNS instead of a response header. Section numbers below are RFC 9460.

- Before making an `http` request, a client SHOULD look up HTTPS RRs for the origin, building the `https` URL by replacing the scheme, changing explicit port 80 to 443, and changing nothing else. This is equivalent to RFC 6797 § 8.3 step 5 (§ 9.5).
- If the lookup returns any AliasMode RR or a compatible ServiceMode RR, the client SHOULD behave as if it received a 307 (Temporary Redirect) to that `https` URL. An incompatible ServiceMode RR does not trigger it (§ 9.5).
- Because DNS is often insecure, clients MUST NOT trust this signal more than a 307 received over cleartext HTTP (§ 9.5). It does not make the host a Known HSTS Host.
- When an `https` request goes to an origin with an HTTPS RR, a client MAY remove the user recourse on transport errors; origins that publish HTTPS RRs therefore MUST NOT rely on user recourse for access (§ 9.5, citing RFC 6797 § 8.4 and § 12.1).
- Clients always convert `http` URLs to `https` before the HTTPS RR query, so domain owners MUST NOT publish HTTPS RRs with a `_http` prefix (§ 9.1).
- Where URLs or redirects do not apply, such as connections to an HTTP proxy, clients that find an HTTPS RR SHOULD implement equivalent upgrade behaviour (§ 9.6).
- An attacker who prevents SVCB resolution can block the upgrade (§ 12). See [`security.md`](security.md).
