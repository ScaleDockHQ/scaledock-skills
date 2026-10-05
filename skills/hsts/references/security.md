# Security considerations

Section numbers refer to RFC 6797 unless another document is named.

## Threat model (§ 2.3)

HSTS addresses:

- **Passive network attackers** who sniff session cookies from plain-HTTP requests, for example on shared wireless networks (§ 2.3.1.1).
- **Active network attackers** who impersonate DNS or spoof network frames, and rely on users clicking through certificate warnings (§ 2.3.1.2).
- **Development and deployment bugs**, such as one insecurely loaded script or stylesheet compromising an otherwise secure site (§ 2.3.1.3).

It does not address phishing (§ 2.3.2.1) or malware and browser vulnerabilities (§ 2.3.2.2).

hstspreload.org adds three concrete benefits against on-path attackers: no browsing history leak from upgraded `http` links, no rewriting of the HTTP-to-HTTPS redirect to keep the browser on plain HTTP, and no cookie hijacking or injection on HTTP requests.

## Bootstrap MITM on the first visit (§ 14.6)

The first visit to an unknown HSTS Host through an `http` URI goes over an insecure channel and can be attacked before any policy is received. Mitigations are on the user agent side: user-declared policy (§ 12.2) and preloaded lists (§ 12.3). For a site, that means preloading, with the costs in [`deployment-and-preload.md`](deployment-and-preload.md).

## Establishment only over error-free transport (§ 14.3)

Policy is noted or updated only over secure transport without errors, so a man in the middle cannot set a policy for a host (a denial of service) or reset its `max-age`, including to zero. The consequence: a user agent behind a TLS-intercepting proxy, such as a corporate one, never notes unknown HSTS Hosts beyond it, even if the user clicks through; once a host is known, connections through the interfering proxy fail.

## Non-conformant user agents (§ 11.1, § 14.2)

User agents that ignore the header get none of the protection. Deployers must take the same care with insecure references and non-`Secure` cookies as without HSTS.

## Domain cookies and `includeSubDomains` (§ 14.4, errata 4075)

- Without `includeSubDomains`, an attacker who points an unused subdomain such as `uxdhbpahpdsf.example.com` at their server can receive `Secure` domain cookies, if the user clicks through any certificate warning (§ 14.4).
- Errata 4075 (rejected as not an erratum, but acknowledged as valid) describes the reverse: a policy with `includeSubDomains` on `sub.example.com` does not cover `example.com`, so an attacker can answer a plain-HTTP request to `example.com` and set a cookie for the whole domain tree. The reporter's mitigation is for pages on the subdomain to fetch a resource from the parent domain whose response carries HSTS with `includeSubDomains`. RFC 6797 has no directive that covers a parent.

## Denial of service (§ 14.5)

An attacker who gets a policy set for a host that does not fully support HTTPS makes it unusable, for example through:

- an HTTP response splitting (header injection) bug;
- a spoofed redirect from `http://example.com/` to an attacker `https://example.com/` with an apparently valid certificate, letting them set policy for the domain and its subdomains;
- persuading users, or scripts, to configure policy in user agents that allow it.

`includeSubDomains` set by mistake makes every subdomain without proper HTTPS unreachable. Fix header injection, and inventory subdomains before asserting it.

## Network time attacks (§ 14.7)

Active attacks on network time protocols such as NTP can make HSTS less effective for clients that trust NTP or lack a real-time clock. RFC 6797 leaves these attacks out of scope and notes that modern operating systems use NTP by default. `max-age` is a relative number of seconds partly so that no clock synchronization between server and client is needed (Appendix A item 5); expiry is still measured on the user agent's clock (§ 8.1.1).

## Bogus root CA plus DNS poisoning (§ 14.8)

An attacker who gets users to install a fake root CA and then poisons their DNS can serve a fake site that HSTS accepts. This is outside HSTS; mitigate with DNSSEC and with defences against phishing and certificate injection.

## Tracking through the policy store (§ 14.9)

A party that controls hosts can encode information in subdomain names, have user agents note them as HSTS Hosts, and later probe which ones upgrade to learn about earlier visits. This is a form of web tracking. User agents should consider it when designing storage and deletion (§ 12.5).

## Internationalized domain names (§ 14.10)

Missing or inconsistent IDNA and Unicode validation can cause processing errors and false-positive or false-negative domain matches, so users reach the wrong host or cannot reach the right one. IDNA2008 and IDNA2003 differ in disallowed characters and mappings.

## Underlying transport (§ 14.1)

The analysis presumes TLS. Using HSTS over another secure transport requires assessing that protocol's security model.

## HTTPS RRs (RFC 9460)

Clients must not trust an HTTPS RR upgrade more than a 307 over cleartext HTTP (RFC 9460 § 9.5), and an attacker who prevents SVCB resolution can block the upgrade (RFC 9460 § 12; § 3.1 recommends abandoning the connection when such an attack is detected). Unlike a Known HSTS Host noted over error-free TLS, the signal arrives over an often-insecure channel, so publishing HTTPS RRs does not replace sending the HSTS header.
