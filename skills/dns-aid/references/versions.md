# Versions and upgrades

Read this when choosing a target revision, reading records published for -00 or -01, upgrading them, or refreshing the pins. Sources: the dnsaid drafts, the datatracker page, the BANDAID predecessor and the informative project sources, listed in [Sources](../SKILL.md#sources).

## Version lines

| Id          | Line                                 | Status  | Revision                                                    | Posture | Summary                                                                                          |
| ----------- | ------------------------------------ | ------- | ----------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------ |
| `dnsaid-02` | draft-mozleywilliams-dnsop-dnsaid-02 | current | draft-mozleywilliams-dnsop-dnsaid-02 (2026-05-27)           | name    | Agent records at the agent's own name; `_index._agents`; security considerations.                |
| `dnsaid-01` | draft-mozleywilliams-dnsop-dnsaid-01 | legacy  | draft-mozleywilliams-dnsop-dnsaid-01 (2026-03-02), with -00 | (none)  | `_<name>._<proto>._agents` leaves, hashed leaves, mandatory-gated private-use keys, DNSSEC MUST. |

Statuses: **current** is the default target; **legacy** is superseded, read and upgraded from but never published. No preview exists.

The -00 (2026-02-23) and -01 revisions share one line: -01 rewrote the abstract and introduction and added an Operational Considerations placeholder (-01 § 8), but kept the section structure, naming and record model. The BANDAID draft (draft-mozleywilliams-dnsop-bandaid-00, 2025-10-16) is the expired predecessor, replaced by the dnsaid draft according to its datatracker page; it is history, not a line.

### Why name

- The draft is an individual submission aimed at dnsop, not adopted, and expires on 28 November 2026 (datatracker; -02 front matter).
- The DNS-AID SvcParamKeys have no numbers: -02 asks IANA to assign them and defers the values (§ 7.1). Until then, zone files can only carry them as `keyNNNNN`, and only private-use numbers 65280 to 65534 are safe to use (RFC 9460 § 2.1, § 14.3.2). Note that -02 names Standards Action as the policy, while RFC 9460 sets Expert Review and allows an individual Internet-Draft as the reference (RFC 9460 § 14.3.1), so numbers could be assigned before the draft is adopted; check the registry on every refresh.
- The ALPN ids `mcp` and `a2a` are placeholders whose spelling is not yet agreed with the protocol maintainers (§ 7.3).
- Naming changed completely between -01 and -02, and the project's own site still documents the -01 pattern, so the community has not converged.
- Much of -02 is explicitly experimental: `bap`, domain control validation, the TLSA indicator, EDNS(0) hints, policy and realm, connection and zero-trust keys, the JSON index (§ 5).

What the name posture keeps: the owner names -02 defines (the agent's primary owner and `_index._agents.<domain>`, with `_agents` and DNS-SD aliases) are published now, using only registered SVCB keys (`mandatory`, `alpn`, `no-default-alpn`, `port`, `ipv4hint`, `ipv6hint`) and TLSA, with the agent protocol id in `alpn` only next to real transport ids (see `records.md`). Any RFC 9460 client can use them, and when the DNS-AID keys are assigned they can be added without renaming anything.

## Which version to use

- Publish -02 names. Never publish a new ServiceMode record at a -01-style `_<name>._<proto>._agents` name; use AliasMode there if old consumers need it (§ 3.1).
- Treat records found at `_<name>._<proto>._agents.<domain>`, hashed leaves such as `a4k2f9._mcp._agents`, or `_agent-roles` TXT records as -01 input.
- When refreshing, check the datatracker page for -03, dnsop adoption (the name would change to `draft-ietf-dnsop-...`), expiry or replacement; check the IANA SvcParamKeys and Underscored DNS Node Names registries; and re-read dns-aid.org and dns-aid-core for changed conventions. An adopted working-group draft is a new line; a new individual revision updates this one.

## What changed

### -00 and -01 (February to March 2026)

- Agents live in an `_agents` leaf zone, named by service and protocol: `_chat._agents.example.com`, `_data-cleaner._a2a._agents.example.com` (-01 § 3.1, § 3.2).
- Hashed per-agent, per-service leaves such as `a4k2f9._mcp._agents.example.org`, with an AliasMode friendly name such as `billing._mcp._agents` (-01 § 4.4.2).
- A public discovery zone MUST be DNSSEC-signed with a full chain of trust, agents MUST use validating resolvers, and unsigned or bogus data MUST NOT be acted on (-01 § 4.4.1).
- Custom keys MUST use the `keyNNNNN` form, and client behavior depending on them MUST be gated with `mandatory`; the examples use `key65001="cap=..."`, `key65002="cap-sha256=..."` and `key65010="bap=a2a/1,mcp/1"` (-01 § 4.4.3).
- Domain control validation through TXT records such as `_agent-roles._a2a._agents.example.com` with `ai-role=...` (-01 § 3.3), and an `_agents-challenge` token in the example zone file (-01 § 5.2.3).
- Security considerations were a placeholder (-01 § 7).

### -02 (27 May 2026, current)

- **Naming.** The primary entry point is the agent's own name, `agent-name.example.com`, which publishers SHOULD support and requestors MUST try first. `_agents` leaves and DNS-SD labels are optional aliases and MUST be AliasMode to the primary owner (§ 3.1).
- **One protocol per record.** Each agent protocol is its own record; multiple agent protocols in one `alpn` are forbidden (§ 3.1.1).
- **Index.** `_index._agents.<domain>` is an SVCB record with a TargetName that MUST NOT contain underscores; the index content is out of scope (§ 3.2).
- **Keys named.** `cap`, `cap-sha256`, `bap` and `well-known` are described by name for the agent record, with `policy` and `realm` deferred (§ 3.1, § 5.6), and IANA is asked to assign all six (§ 7.1).
- **DNSSEC relaxed.** Records SHOULD be signed; they MUST be only when TLSA is used (§ 1.1). Consumers SHOULD validate (§ 6.4).
- **Security written out.** Records are transport not trust, `cap-sha256` mismatches are refused, DANE postures, `mandatory=` downgrade resistance, DNSSEC pitfalls, OWASP MAESTRO mapping, and privacy (§ 6).
- **Experimental section.** Earlier "future work" is consolidated into § 5, including the `_agents-challenge` TXT format with `token=`, `domain=`, `bnd-req=` and `expiry=` (§ 5.2).
- **Explicit TXT position.** TXT is a possible fallback but not desirable, because it has no TargetName (§ 4).

## Upgrading

### -01 to -02

1. For each agent, choose its primary owner name, for example `billing.example.org`, and move the ServiceMode RRset there (§ 3.1).
2. Replace each old leaf (`_billing._mcp._agents`, `a4k2f9._mcp._agents`, `billing._mcp._agents`) with AliasMode to the primary owner, or delete it once no consumer queries it (§ 3.1).
3. Split any record that lists more than one agent protocol into one record per protocol (§ 3.1.1).
4. Publish `_index._agents.<domain>` as ServiceMode SVCB to an index host whose name has no underscores, with a WebPKI certificate for that host (§ 3.2).
5. Renumber custom keys: the -01 examples `key65001`, `key65002` and `key65010` are outside the private-use range 65280 to 65534 and could collide with a future assignment (RFC 9460 § 14.3.2). Keep private-use `keyNNNNN` values only where every consumer has agreed on them. Remove them from `mandatory=` on publicly consumed records, because RFC 9460 § 8 makes a consumer that does not know them skip the whole record.
6. Keep DNSSEC signing: -02 relaxed it to SHOULD, but it remains MUST for TLSA, and consumers still SHOULD refuse bogus data (§ 1.1, § 6.4).
7. Move domain-control TXT records to the -02 `_agents-challenge` format only if a verifier asks for it; it is experimental (§ 5.2).
8. Leave `_agent-roles` authorization records out: -02 has no equivalent, and records are not trust signals (§ 6.1).

## Preview

No preview line exists. If dnsop adopts the draft, the adopted `draft-ietf-dnsop-...` revision becomes a new line and this posture should be reconsidered.
