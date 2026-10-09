# dns-aid

An agent skill for DNS-AID (DNS for AI Discovery), draft-mozleywilliams-dnsop-dnsaid-02: publish AI agents in DNS as SVCB records and discover them, with DNSSEC and DANE.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill dns-aid
```

Then ask your agent to "publish our MCP server and A2A agent in DNS with DNS-AID" or "discover the agents example.com publishes in DNS".

## What it covers

- Agent records: one ServiceMode SVCB RRset at the agent's own name, one record per agent protocol, hosted agents, and AliasMode for `_agents` and DNS-SD names.
- The `_index._agents.<domain>` organization index.
- DANE TLSA at `_443._tcp`, DNSSEC, `mandatory=` downgrade rules and the TLS postures for consumers.
- The proposed `cap`, `cap-sha256`, `bap`, `policy`, `realm` and `well-known` keys, and why they stay private-use for now.
- Consumer rules: agent name first, records as transport not trust, `cap-sha256` checks, encrypted DNS.
- Upgrading -00 and -01 records that used `_name._proto._agents` names.

## Draft posture

DNS-AID is an individual Internet-Draft aimed at the IETF dnsop working group, not adopted, and it expires on 28 November 2026. The skill takes the **name** posture: publish the owner names -02 defines with registered SVCB keys and TLSA only, so records work with any SVCB client, and treat the unassigned DNS-AID keys and placeholder ALPN ids as private agreements nothing public depends on.

## Versions

| Line                                 | Status                |
| ------------------------------------ | --------------------- |
| draft-mozleywilliams-dnsop-dnsaid-02 | current (name)        |
| draft-mozleywilliams-dnsop-dnsaid-01 | legacy (upgrade from) |

`references/versions.md` explains the naming change between -01 and -02 and how to migrate.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [draft-mozleywilliams-dnsop-dnsaid-02](https://www.ietf.org/archive/id/draft-mozleywilliams-dnsop-dnsaid-02.txt): individual Internet-Draft, -02 (27 May 2026), and its [datatracker page](https://datatracker.ietf.org/doc/draft-mozleywilliams-dnsop-dnsaid/).
- The -01 and -00 revisions for the legacy line, and the BANDAID -00 predecessor for history.
- [dns-aid.org](https://dns-aid.org/) and [dns-aid/dns-aid-core](https://github.com/dns-aid/dns-aid-core) v0.28.1 (main at c4944f51): informative.
- RFC 9460 (SVCB), RFC 6698 and RFC 7671 (DANE), RFC 9364 (DNSSEC), RFC 8552 (underscored names) and RFC 8484 (DoH).

## License

MIT
