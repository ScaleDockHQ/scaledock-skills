# hsts

An agent skill for RFC 6797 HTTP Strict Transport Security (HSTS): sending, rolling out and enforcing the `Strict-Transport-Security` header.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill hsts
```

Then ask your agent to "add HSTS to our site and plan the rollout" or "review our Strict-Transport-Security header and HTTP redirects".

## What it covers

- The `Strict-Transport-Security` header: `max-age`, `includeSubDomains`, and the non-RFC `preload` token.
- Server processing: the header only over HTTPS, one per response, and a permanent redirect from HTTP to HTTPS.
- User agent processing: Known HSTS Hosts, congruent and superdomain matching, the `http` to `https` upgrade with port mapping, and no click-through on transport errors.
- Removing a policy with `max-age=0`, a staged `max-age` rollout, and preload list requirements and removal.
- Security considerations: the first-visit bootstrap problem, network time attacks, domain cookies, denial of service and tracking.
- How HTTPS DNS records (RFC 9460) give an HSTS-like upgrade signal.

## Versions

| Line     | Status  |
| -------- | ------- |
| RFC 6797 | current |

`references/versions.md` explains why the preload list and HTTPS DNS records are not version lines, and how to refresh the pins.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [RFC 6797](https://www.rfc-editor.org/rfc/rfc6797.html): RFC (Proposed Standard), RFC 6797.
- [RFC 6797 errata](https://www.rfc-editor.org/errata/rfc6797): 5 reports, all rejected.
- [HSTS Preload List Submission](https://hstspreload.org/): web page, current requirements.
- [RFC 9460](https://www.rfc-editor.org/rfc/rfc9460.html): RFC (Proposed Standard), RFC 9460.

## License

MIT
