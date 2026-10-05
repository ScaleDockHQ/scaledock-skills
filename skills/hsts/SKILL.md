---
name: hsts
description: >-
  RFC 6797 HTTP Strict Transport Security (HSTS): set, process and roll out the
  Strict-Transport-Security header. Covers max-age, includeSubDomains and the
  non-RFC preload token; sending the header only over HTTPS and redirecting HTTP
  to HTTPS; user agent processing (Known HSTS Hosts, congruent and superdomain
  matching, upgrading http to https with port 80 to 443, no click-through on
  certificate errors); max-age=0 to remove a policy; a staged max-age rollout;
  preload list submission and removal; and the security considerations
  (bootstrap MITM on the first visit, network time attacks, domain cookies). Use
  when adding, reviewing or debugging HSTS on a web server, CDN, proxy or
  framework, implementing an HSTS-aware HTTP client, planning an
  hstspreload.org submission, or relating HTTPS DNS records (RFC 9460 SVCB and
  HTTPS RR) to HSTS-like upgrades. Targets RFC 6797, the current and only line.
  Triggers: HSTS preload list, force HTTPS, HTTP to HTTPS redirect, protocol
  downgrade.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# HTTP Strict Transport Security (HSTS)

RFC 6797, published by the IETF, defines the `Strict-Transport-Security` response header field: a host declares that user agents must reach it only over secure transport, for a number of seconds, optionally for all its subdomains. With this skill the agent configures the header and the HTTP-to-HTTPS redirect on a server, rolls the policy out safely, decides on preloading, implements the user agent rules, or reviews an existing deployment.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources), with the section it cites. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: deployer (a server, CDN, proxy or framework that sends the header), user agent (an HTTP client that enforces it), or reviewer.
- Target version: RFC 6797 (default, and the only line). No legacy line and no preview exist. See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill or when a rule looks out of date, re-read every URL in [Sources](#sources) first, check the RFC Editor entry for RFC 6797 for an updating or obsoleting RFC and for new errata, re-read the hstspreload.org requirements, and update the pins.
- Host inventory: the apex domain, every subdomain and nested subdomain (including internal ones that are not publicly reachable), and any plain-HTTP service on them, such as CRL or OCSP endpoints.
- Preload intent: none (default), or a deliberate, long-term plan to submit the apex to the preload list.
- HTTPS DNS records: whether the zone publishes, or plans to publish, HTTPS resource records (RFC 9460).

## Invariants

1. **Only over secure transport.** An HSTS Host MUST NOT send `Strict-Transport-Security` in responses over non-secure transport (§ 7.2), and a user agent MUST ignore the header on a response received over insecure transport (§ 8.1).
2. **`max-age` is required.** Its value is delta-seconds, optionally quoted (§ 6.1.1, § 6.2). `includeSubDomains` is optional and valueless (§ 6.1.2).
3. **Well-formed header, one of each.** Every directive appears at most once, names are case-insensitive, and order does not matter (§ 6.1). User agents MUST ignore a header that does not conform to the grammar, and MUST ignore unrecognized directives while processing the recognized ones (§ 6.1).
4. **One header field per response.** If the host sends the header, it MUST send only one (§ 7.1); a user agent that receives several MUST process only the first (§ 8.1).
5. **`max-age=0` deletes the policy**, including `includeSubDomains`, and `includeSubDomains` is ignored when `max-age` is zero (§ 6.1.1, § 6.2, § 8.1). For an unknown host, the user agent MUST NOT note it (§ 8.1).
6. **Error-free transport only.** A user agent notes or updates a Known HSTS Host only when the response came over secure transport with no errors or warnings (§ 8.1, § 14.3).
7. **Domain names only.** A host addressed by an IP literal or IPv4 address MUST NOT be noted (§ 8.1.1), and such URIs never match a Known HSTS Host (§ 8.3).
8. **Policy belongs to the issuing host.** A user agent MUST NOT change the expiry or `includeSubDomains` of a superdomain-matched Known HSTS Host (§ 8.1.1); only the issuing host can update or delete its policy (§ 5.3).
9. **Upgrade before loading.** For a Known HSTS Host, the user agent MUST rewrite `http` to `https` before loading, including when following redirects; explicit port 80 becomes 443, any other explicit port is kept, and no port is added (§ 8.3).
10. **No recourse on transport errors.** When connecting to a Known HSTS Host, the user agent MUST terminate the connection on any secure transport error or warning, including certificate validation errors (§ 8.4); the user should not be offered a way to proceed (§ 12.1).
11. **Header field only.** User agents MUST NOT heed `<meta http-equiv="Strict-Transport-Security">` (§ 8.5).
12. **A missing header does not remove the policy.** The user agent keeps the host as a Known HSTS Host until `max-age` runs out (§ 8.6), and MUST evict expired entries (§ 8.1.1).
13. **`preload` is not part of RFC 6797.** It is a convention of the preload list (hstspreload.org); RFC 6797 user agents ignore it as an unrecognized directive (§ 6.1).

## Workflow

1. **Pick the version.** Use RFC 6797; it is the only line.
   -> [`references/versions.md`](references/versions.md)
   ✓ Documentation and code cite RFC 6797, and nothing claims an RFC defines `preload`.
2. **Inventory hosts and decide on `includeSubDomains`.** List every subdomain and plain-HTTP service. Without `includeSubDomains`, domain cookies are not protected (§ 14.4); with it, any subdomain without working HTTPS becomes unreachable (§ 11.4.1, § 14.5).
   -> [`references/deployment-and-preload.md`](references/deployment-and-preload.md)
   ✓ Every subdomain serves valid HTTPS, or `includeSubDomains` is left off and the reason is recorded.
3. **Send the header on HTTPS responses.** Emit one well-formed header on every HTTPS response, at every entry point users reach directly, such as both the apex and `www` (§ 7.1, § 11.4.2).
   -> [`references/header-and-server.md`](references/header-and-server.md)
   ✓ Each entry point returns exactly one `Strict-Transport-Security` header over HTTPS, including on its redirects.
4. **Redirect HTTP to HTTPS.** Answer plain-HTTP requests with a permanent redirect to the `https` form of the effective request URI, and no HSTS header (§ 7.2, § 9).
   -> [`references/header-and-server.md`](references/header-and-server.md)
   ✓ `http://` requests get a 301 (or another permanent redirect) to `https://`, with no `Strict-Transport-Security` on the HTTP response.
5. **Roll out `max-age` in stages.** Start small (300 seconds), then one week, then one month, waiting out each stage and fixing breakage before raising it; ship configuration defaults of `max-age=0` (hstspreload.org; § 11.2).
   -> [`references/deployment-and-preload.md`](references/deployment-and-preload.md)
   ✓ The current stage, its start date and the date it may advance are recorded.
6. **Decide on preloading** (optional). Preload only after a full rollout, with a long-term commitment to HTTPS on every subdomain; never turn on `preload` by default.
   -> [`references/deployment-and-preload.md`](references/deployment-and-preload.md)
   ✓ Either `preload` is absent, or the apex meets every submission requirement and the owner accepted that removal takes months.
7. **Implement user agent processing** (user agent role). Parse, note, match, upgrade and enforce per § 8, and treat HTTPS RRs as an HSTS-like upgrade signal when supported (RFC 9460 § 9.5).
   -> [`references/user-agent-processing.md`](references/user-agent-processing.md)
   ✓ Tests cover congruent and superdomain matching, port mapping, `max-age=0`, duplicate headers, IP literals and transport errors.
8. **Review security.** Check the deployment against the bootstrap, time, denial-of-service, cookie and tracking considerations.
   -> [`references/security.md`](references/security.md)
   ✓ Every consideration is addressed or knowingly accepted.
9. **Roll back** (only when needed). Send `max-age=0` over HTTPS from the same host; for a preloaded domain, also request removal from the list.
   -> [`references/deployment-and-preload.md`](references/deployment-and-preload.md)
   ✓ The HTTPS responses carry `max-age=0` and HTTPS stays up until clients have seen it.
10. **Upgrade** (only when asked). There is no older line to upgrade from; refresh the pins and check for an RFC that updates RFC 6797.
    -> [`references/versions.md`](references/versions.md)
    ✓ The pins are current and the RFC Editor shows no successor, or the skill is updated to it.

## Verify before done

- [ ] HTTPS responses carry exactly one `Strict-Transport-Security` header with a `max-age` directive, and each directive appears once (§ 6.1, § 7.1).
- [ ] Plain-HTTP responses redirect permanently to `https` and carry no HSTS header (§ 7.2).
- [ ] The header is sent at every well-known entry point, not only on a host that redirects elsewhere (§ 11.4.2).
- [ ] With `includeSubDomains`, every subdomain, including internal ones, serves valid HTTPS (§ 11.4, § 14.5).
- [ ] `max-age` was raised in stages, and configuration defaults are `max-age=0` (§ 11.2).
- [ ] `preload` is sent only with a deliberate preload plan, a `max-age` of at least 31536000 and `includeSubDomains` (hstspreload.org).
- [ ] No `<meta http-equiv>` HSTS is relied on (§ 8.5).
- [ ] User agents: IP literals are never noted, superdomain entries are never modified, and transport errors end the connection with no click-through (§ 8.1.1, § 8.4).

## Reference index

- **`references/versions.md`**: the RFC 6797 line, its errata, why `preload` and HTTPS RRs have no version line, and the refresh steps. Load for steps 1 and 10.
- **`references/header-and-server.md`**: the header grammar, directives, examples, server processing over HTTPS and HTTP, the effective request URI and common mistakes. Load for steps 3 and 4.
- **`references/user-agent-processing.md`**: noting, storing, matching, upgrading and enforcing policy, IDNA, and how HTTPS RRs (RFC 9460) relate. Load for step 7.
- **`references/deployment-and-preload.md`**: `includeSubDomains` planning, expiry strategy, the staged rollout, preload requirements and removal, and rollback. Load for steps 2, 5, 6 and 9.
- **`references/security.md`**: the threat model and every RFC 6797 security consideration, with what to do about each. Load for step 8.

## Related skills

- `content-security-policy` for upgrading or blocking insecure subresource loads on HTTPS pages: `npx skills add ScaleDockHQ/scaledock-skills --skill content-security-policy`.
- `http-cookies` for the `Secure` attribute and domain cookies that HSTS with `includeSubDomains` protects: `npx skills add ScaleDockHQ/scaledock-skills --skill http-cookies`.
- `http-semantics` for redirect status codes, the `Location` field and header field rules: `npx skills add ScaleDockHQ/scaledock-skills --skill http-semantics`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [RFC 6797: HTTP Strict Transport Security (HSTS)](https://www.rfc-editor.org/rfc/rfc6797.html): RFC (Proposed Standard), RFC 6797 (November 2012), checked 2026-10-05.
- [RFC 6797 errata](https://www.rfc-editor.org/errata/rfc6797): RFC Editor errata list, 5 reports, all rejected, checked 2026-10-05.
- [HSTS Preload List Submission](https://hstspreload.org/): web page (no version), requirements for domains submitted on or after 2017-10-11, checked 2026-10-05.
- [RFC 9460: Service Binding and Parameter Specification via the DNS (SVCB and HTTPS Resource Records)](https://www.rfc-editor.org/rfc/rfc9460.html): RFC (Proposed Standard), RFC 9460 (November 2023), checked 2026-10-05.
