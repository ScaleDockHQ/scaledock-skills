# dmarc

An agent skill for DMARC as revised by DMARCbis (RFC 9989, with RFC 9990 aggregate reporting and RFC 9991 failure reporting): publishing `_dmarc` records, rolling out to enforcement, evaluating mail at a receiver, and producing or parsing reports, with upgrades from RFC 7489 and RFC 9091.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill dmarc
```

Then ask your agent to "add a DMARC record for our domain and plan the move to p=reject" or "upgrade our DMARC records from RFC 7489 to RFC 9989".

## What it covers

- The DMARC Policy Record at `_dmarc.<domain>`: every tag (`v`, `p`, `sp`, `np`, `t`, `psd`, `adkim`, `aspf`, `rua`, `ruf`, `fo`), its ABNF and defaults, and the historic `pct`, `rf` and `ri`.
- Relaxed and strict alignment of SPF and DKIM identifiers with the Author Domain.
- The DNS Tree Walk for policy discovery and Organizational Domains, replacing the Public Suffix List, and PSD records with `psd=y`.
- Mail Receiver evaluation, policy application and enforcement limits.
- The rollout from `p=none` through `quarantine` to `reject`, with `t=y` test mode.
- External report destination verification, the RFC 9990 aggregate report XML, RFC 9991 failure reports, and privacy considerations.

## Versions

| Line     | Status                |
| -------- | --------------------- |
| RFC 9989 | current               |
| RFC 7489 | legacy (upgrade from) |
| RFC 9091 | legacy (upgrade from) |

RFC 9990 and RFC 9991 are part of the RFC 9989 line. `references/versions.md` says what DMARCbis changed and how to upgrade.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [RFC 9989](https://www.rfc-editor.org/rfc/rfc9989): RFC (Proposed Standard), May 2026.
- [RFC 9990](https://www.rfc-editor.org/rfc/rfc9990): RFC (Proposed Standard), May 2026.
- [RFC 9991](https://www.rfc-editor.org/rfc/rfc9991): RFC (Proposed Standard), May 2026.
- [RFC 7489](https://www.rfc-editor.org/rfc/rfc7489): RFC (Informational), obsoleted by RFC 9989, RFC 9990 and RFC 9991.
- [RFC 9091](https://www.rfc-editor.org/rfc/rfc9091): RFC (Experimental), obsoleted by RFC 9989.
- [RFC 9989 errata](https://www.rfc-editor.org/errata/rfc9989): two verified editorial errata.
- [IANA DMARC parameters registry](https://www.iana.org/assignments/dmarc-parameters/): last updated 2026-05-22.
- [IETF dmarc WG documents](https://datatracker.ietf.org/wg/dmarc/documents/) and the [RFC Editor index](https://www.rfc-editor.org/rfc-index.txt).

## License

MIT
