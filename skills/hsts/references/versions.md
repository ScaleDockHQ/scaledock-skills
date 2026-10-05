# Versions and upgrades

Read this when choosing a target version, checking whether RFC 6797 has a successor, or deciding how the preload list and HTTPS DNS records fit in. Sources: RFC 6797, its RFC Editor errata list, hstspreload.org and RFC 9460, listed in [Sources](../SKILL.md#sources).

## Version lines

| Id        | Line     | Status  | Revision                                    | Posture | Summary                                                                          |
| --------- | -------- | ------- | ------------------------------------------- | ------- | -------------------------------------------------------------------------------- |
| `rfc6797` | RFC 6797 | current | RFC 6797, Proposed Standard (November 2012) |         | The default and only target. No RFC updates or obsoletes it; no verified errata. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

## Which version to use

- Use RFC 6797. It is the only published HSTS specification; the RFC Editor and the IETF datatracker list no RFC that updates or obsoletes it.
- RFC 6797 was published from `draft-ietf-websec-strict-transport-sec`. That draft is not a separate line: nothing deployed today targets it.
- The `Strict-Transport-Security` grammar is written against the RFC 2616 generic grammar (§ 6.1). That is a reference inside RFC 6797, not a version choice.

### Why the preload list has no version line

The HSTS preload list is a user agent facility that RFC 6797 describes only as implementation advice (§ 12.3). Its submission rules live on hstspreload.org, a web page with no version number or revision history. Its requirements are dated by submission date only: the current rules apply to domains submitted on or after October 11, 2017, and domains submitted from February 29, 2016 needed a `max-age` of only 10886400 seconds. The skill treats hstspreload.org as a dependency source, re-read on every refresh, without a version line.

### Why HTTPS RRs have no version line

RFC 9460 defines the SVCB and HTTPS DNS resource records. This skill uses only its § 9.5 and § 9.6, where an HTTPS RR gives an HSTS-like upgrade signal. RFC 9460 is a dependency source, not a line of HSTS.

## What changed

### RFC 6797

RFC 6797 is the first and only HSTS RFC. The errata list has five reports and all are rejected; none changes a rule:

- 4075 (rejected 2014-08-11): with `includeSubDomains` on a subdomain, an attacker can still set a cookie through plain-HTTP requests to the parent domain. The verifier called it a valid issue but not an erratum. The reporter's mitigation: have pages on the subdomain fetch a resource from the parent domain, and have that response send HSTS with `includeSubDomains`. See [`security.md`](security.md).
- 5204 (rejected 2024-10-29): rename `includeSubDomains`. Rejected; directive names are already case-insensitive (§ 6.1), so `includesubdomains` is equivalent.
- 5372 (rejected 2024-10-29): § 8.1 versus § 11.2 on updating the cache. Rejected; every receipt of the header updates the expiry, even when `max-age` is unchanged, because the expiry it implies has moved.
- 8153 (rejected 2024-10-29): let user agents skip noting `localhost`. Rejected as a normative change that needs a new document; RFC 6797 as published has no `localhost` exception.
- 8186 (rejected 2024-12-02): use `/` instead of `|` in the ABNF. Rejected; RFC 6797 uses the RFC 2616 grammar, which uses `|`.

## Upgrading

No upgrade path exists, because RFC 6797 has no predecessor line. When refreshing:

1. Open the RFC Editor entry and errata list for RFC 6797. If an RFC now updates or obsoletes it, add that RFC as a new current line, make `rfc6797` supported or legacy, and write an upgrade section here.
2. Re-read the hstspreload.org submission requirements and update [`deployment-and-preload.md`](deployment-and-preload.md) if the thresholds changed.
3. Check whether RFC 9460 § 9.5 has been updated, and update [`user-agent-processing.md`](user-agent-processing.md) if so.
4. Update the `checked` dates in `metadata.json` and the Sources section.

## Preview

No preview line is listed. No Internet-Draft that updates RFC 6797 was found among the documents the RFC Editor and the datatracker relate to it. The rejected errata 4075 and 8153 point at changes (an "include parent" behaviour, a `localhost` exception) that would need a new document; watch for one.
