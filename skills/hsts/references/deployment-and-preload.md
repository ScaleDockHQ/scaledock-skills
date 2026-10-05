# Deployment, rollout and preloading

Sections cited with § refer to RFC 6797, whose § 11 deployment advice is non-normative. Rollout stages and preload rules come from hstspreload.org.

## Plan `includeSubDomains` (§ 11.4, § 14.4, § 14.5)

- Without `includeSubDomains`, domain cookies (cookies sent to every subdomain) are not protected, even with `Secure`: an attacker can lure the user agent to an unused subdomain they control and collect the cookie (§ 14.4).
- With it, every subdomain is treated as a Known HSTS Host, and any subdomain without properly configured secure transport becomes unreachable (§ 14.5).
- Plain-HTTP services under the domain break. The § 11.4.1 example is a CA's CRL and OCSP endpoints at a subdomain of its HTTPS site. The options it lists: leave `includeSubDomains` off, serve those services over TLS too, move plain-HTTP services to a different domain name, or use another way to distribute certificate status, such as OCSP stapling.
- hstspreload.org's first deployment step: examine all subdomains and nested subdomains, including internal ones that are not publicly accessible, and make sure they work over HTTPS.

## Choose an expiry strategy (§ 11.2)

- **Constant into the future**: send the same `max-age` every time. Every receipt pushes the expiry forward. For example, `max-age=7776000` is 90 days.
- **Fixed point in time**: send the remaining seconds until a chosen expiry, recomputed on each response, for example to match the certificate's expiry.
- Server implementers should default `max-age` to zero in configuration systems, so deployers must set it on purpose and do not enable HSTS by accident.

## Roll out in stages (hstspreload.org)

Add the header to all HTTPS responses and raise `max-age` in stages:

| Stage     | Header value                         |
| --------- | ------------------------------------ |
| 5 minutes | `max-age=300; includeSubDomains`     |
| 1 week    | `max-age=604800; includeSubDomains`  |
| 1 month   | `max-age=2592000; includeSubDomains` |

- In each stage, check for broken pages and monitor the site's metrics (for example traffic and revenue), fix any problems, then wait the full `max-age` of the stage before moving on; wait a month in the last stage.
- If a group of employees or users can beta test, try the first stages on them, then go through all stages for all users, starting over.
- If the subdomain inventory showed that `includeSubDomains` cannot be supported, run the same stages without it (§ 11.4.1 lists leaving it off as an option).

User agents honour the freshest policy so that a host can correct an erroneous one, such as a multi-year `max-age` or a wrong `includeSubDomains` (Appendix A item 3). A user agent that does not come back cannot receive the correction and keeps the policy until it expires (§ 8.6), which is why stages start short.

## Preloading (§ 12.3, § 14.6, hstspreload.org)

A preloaded list is a set of HSTS policies built into the user agent, which addresses the bootstrap MITM problem on the first visit (§ 12.3, § 14.6). hstspreload.org describes the list it accepts submissions for as built into Chrome, with Firefox, Safari, IE 11 and Edge having lists based on it.

hstspreload.org also says:

- Many browsers already upgrade HTTP navigations to HTTPS regardless of HSTS, so preloading only adds value when those upgrades fail under an active attacker.
- The benefits of preloading are minimal compared with HSTS itself. HSTS is recommended; preloading is not recommended.
- Preloading should be opt-in. Projects that provide HTTPS configuration or an HSTS option must not include `preload` by default, and must make sure operators understand the long-term consequences.

### Submission requirements

Sending `preload` is a request for inclusion. To be accepted, the site must:

1. Serve a valid certificate.
2. Redirect from HTTP to HTTPS on the same host, if it listens on port 80.
3. Serve all subdomains over HTTPS, including `www` if a DNS record for it exists. Preloading covers every subdomain, including internal ones.
4. Serve an HSTS header on the base domain for HTTPS requests, with:
   - `max-age` of at least `31536000` (one year);
   - `includeSubDomains`;
   - `preload`;
   - on any redirect served from the HTTPS site, the header on the redirect itself.

These apply to domains submitted on or after October 11, 2017. Domains submitted from February 29, 2016 had the same rules with a minimum `max-age` of `10886400`.

The site must keep meeting the requirements. Removing `preload` from the header makes the domain eligible for the removal form, and sites may be removed automatically for failing the requirements. New entries are hardcoded into the browser source and take months to reach stable releases.

### Removal

- Inclusion cannot easily be undone. Removal takes months to reach users through a browser update, with no guarantee for other browsers that copy the list.
- Removal requests are generally honoured when a subdomain cannot be served over HTTPS for strong technical or cost reasons; use the removal form linked from hstspreload.org.
- Do not request inclusion unless the whole site and all subdomains can support HTTPS long term.

Owners of TLDs and other public suffixes can preload all their registrable domains by contacting the list maintainers (hstspreload.org).

## Roll back

1. Keep HTTPS working. A user agent that still holds the policy will refuse plain HTTP and fail on certificate errors (§ 8.3, § 8.4).
2. Send `Strict-Transport-Security: max-age=0` on HTTPS responses from the same host that set the policy; only that host can delete it (§ 5.3, § 6.1.1). `includeSubDomains` with it changes nothing (§ 6.2).
3. Keep sending it at least as long as the longest `max-age` that was sent, since user agents that do not return keep the policy until it expires (§ 8.6).
4. For a preloaded domain, also remove `preload` and request removal (hstspreload.org).

## Self-signed and private CAs (§ 11.3)

If a site uses certificates from its own CA that is not in default trust stores, and no usable TLSA association exists, connections to it fail under HSTS by design. To use HSTS anyway, deploy the root CA (or the end-entity certificates) to users' browsers or operating system trust stores, or deploy TLSA (DANE). Distributing root certificates by email trains users to install attacker certificates (§ 11.3, § 14.8).
