# Publishing agent records

Read this when writing zone data for agents: the agent RRset, multi-protocol and hosted agents, aliases, the organization index, TLSA, and the DNS-AID keys. Sources: draft-mozleywilliams-dnsop-dnsaid-02 ("§"), RFC 9460, RFC 6698, RFC 7671 and dns-aid-core, listed in [Sources](../SKILL.md#sources). Zone examples use documentation names and addresses.

## The agent RRset

Publish a ServiceMode SVCB RRset at the agent's primary owner name. A requestor that knows the agent and its domain gets everything from that one query: TargetName, transport, agent protocol, port and address hints (§ 3.1).

```dns
; One record per agent protocol, at the agent's own name (§ 3.1, § 3.1.1)
billing.example.com. 3600 IN SVCB 1 billing.example.com. (
    alpn="mcp,h2,h3" port=443
    ipv4hint=192.0.2.10 ipv6hint=2001:db8::10 )
billing.example.com. 3600 IN SVCB 2 billing-a2a.example.com. (
    alpn="a2a,h2" port=443 )
```

- **TargetName** may equal the owner name, or name another host, including a service provider's (§ 3.1).
- **One agent protocol per record.** `alpn="mcp,a2a,h2,h3"` MUST NOT be used; publish two records instead (§ 3.1.1).
- **Keep transport ids next to the agent id.** RFC 9460 clients use only the ALPN ids they support and SHOULD NOT connect when none match (RFC 9460 § 7.1.2). A record with `alpn="a2a"` alone, as in the draft's Figure 1, is unusable to a client that does not know `a2a`; `alpn="a2a,h2"` still works for any HTTP/2 client.
- **The agent ids are placeholders.** `mcp` and `a2a` are not registered ALPN ids yet, and their spelling is unconfirmed (§ 7.3). A consumer should confirm the protocol from the endpoint, not trust `alpn` alone.
- **Priority** orders the records; the client picks among compatible ones (RFC 9460 § 2.4.1).

### Hosted agents

When a provider hosts the agent, keep the owner name in your zone and point TargetName at the provider (§ 3.1, Figure 1):

```dns
support.example.com. 3600 IN SVCB 1 tenant42.agents.provider.example. ( alpn="a2a,h2" port=443 )
```

TLS clients still validate the certificate for the original service name, as with any SVCB alias (RFC 9460 § 2.3).

### Aliases

An agent may also appear under an `_agents` inventory leaf or a DNS-SD name, but those names MUST be AliasMode records pointing at the primary owner (§ 3.1):

```dns
billing._agents.example.com. 3600 IN SVCB 0 billing.example.com.
```

AliasMode has priority 0 and no SvcParams (RFC 9460 § 2.4.2).

## The organization index

Publish `_index._agents.<domain>` when requestors know the organization but not the agent (§ 3.2):

```dns
_index._agents.example.com. 3600 IN SVCB 1 agent-index.example.com. ( alpn="h2,h3" port=443 )
```

- The TargetName MUST be present and MUST NOT contain underscores, because the index is reached with a public X.509 certificate (§ 3.2).
- TLSA for the index is queried at the TargetName, not at `_index._agents` (§ 3.2).
- What the index host serves, and over which protocol, is out of scope for DNS-AID. A JSON index format is future work (§ 3.2, § 5.9).
- Requestors pick an agent from the index, cache it, and use the agent-name query from then on (§ 1.1, § 3.2).

dns-aid-core publishes a different index today: a TXT record such as `_index._agents.example.com. TXT "agents=chat:mcp,billing:a2a"`, with an HTTP index endpoint tried first. That form is an implementation choice, not -02; -02 calls TXT not desirable because it has no TargetName (§ 4). If you need both, publish the SVCB index and treat the TXT record as a compatibility extra.

## TLSA and DNSSEC

- Sign the zone with DNSSEC: SHOULD for all DNS-AID records, MUST when TLSA is published (§ 1.1).
- Publish TLSA at `_443._tcp.<TargetName>` (or the port used) to bind the endpoint's certificate or key (§ 6.2; RFC 6698; RFC 7671).
- Follow DNSSEC operational guidance and avoid algorithms or key sizes the target validators ignore (§ 6.4).

```dns
_443._tcp.billing.example.com. 1800 IN TLSA 3 1 1 ( 0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF )
```

## The DNS-AID keys

-02 describes six new SvcParamKeys and asks IANA to assign them (§ 3.1, § 5.1, § 5.6, § 7.1):

| Key          | Meaning                                                                         | -02 status                          |
| ------------ | ------------------------------------------------------------------------------- | ----------------------------------- |
| `cap`        | Capability descriptor locator or inline identifier (a URN or compact JSON-Ref). | Requested.                          |
| `cap-sha256` | base64url SHA-256 digest of the canonical capability descriptor.                | Requested.                          |
| `well-known` | The `/.well-known/` path of the descriptor, for example `agent-card.json`.      | Requested.                          |
| `bap`        | Agent protocols with versions, for example `mcp=1.0, a2a=1.1`.                  | Requested; experimental (§ 5.1).    |
| `policy`     | URI of a policy bundle.                                                         | Requested; syntax deferred (§ 5.6). |
| `realm`      | Opaque multi-tenant or authorization realm token.                               | Requested; syntax deferred (§ 5.6). |

Under the name posture:

1. **Do not write these names in zone files.** Key names map to numbers through the IANA registry, and a key without a registered number has no wire encoding except through the `keyNNNNN` form (RFC 9460 § 2.1, § 14.3). Provider tools that accept `cap=` by name, such as dns-aid-core, translate it to a number they chose.
2. **Use only private-use numbers.** 65280 to 65534 are reserved for private use (RFC 9460 § 14.3.2). The -01 examples (`key65001`, `key65002`, `key65010`) are outside that range; do not copy them. dns-aid-core writes these keys as `key65400` to `key65409`; if you interoperate with it, use its numbering and record it.
3. **Keep them out of `mandatory=` on public records.** A consumer that does not implement a mandatory key MUST skip the record (§ 6.3; RFC 9460 § 8), so a mandatory private-use key hides the agent from every generic client. Make them mandatory only inside a closed group that has agreed on the numbers.
4. **Meaning is out-of-band.** Consumers must not infer semantics for unknown `keyNNNNN` values without agreement (-01 § 4.4.3).
5. **Prefer the descriptor's own discovery.** A2A agents already publish an agent card at a well-known path; MCP and other protocols define their own metadata. Point to them from the index document rather than from unassigned keys.

The draft is internally inconsistent on where the descriptor URI lives: § 3.1 puts the locator in `cap`, while § 6.1 says the descriptor is fetched from the URI carried in `well-known`. Whichever you use, `cap-sha256` covers the descriptor's canonical form, and the draft does not define the canonicalization.

## TTLs

Use longer TTLs for stable indirection (aliases, the index) and shorter TTLs for volatile endpoint records, and avoid NXDOMAIN flaps during rollouts because of negative caching (-01 § 5.2.2). -02 drops this guidance but does not contradict it.

## Experimental: do not depend on

-02 lists these as prototypes that MAY be tried but are not normative (§ 5): `bap` versions (§ 5.1), domain control validation at `_agents-challenge.<domain>` (§ 5.2), an SVCB key signalling TLSA (§ 5.3), EDNS(0) discovery hints on a private-use option code (§ 5.4), cross-domain search (§ 5.5), `policy` and `realm` payloads (§ 5.6), `connect-class` and `connect-meta` (§ 5.7), `enroll-uri` (§ 5.8) and a JSON index (§ 5.9).
