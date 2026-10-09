# Discovering agents

Read this when writing a client that finds agents through DNS-AID, or reviewing one for trust, integrity and privacy. Sources: draft-mozleywilliams-dnsop-dnsaid-02 ("§"), RFC 9460, RFC 6698, RFC 7671, RFC 9364 and RFC 8484, listed in [Sources](../SKILL.md#sources).

## Procedure

1. **Known agent: query the agent name first.** `SVCB agent-name.example.com`. Requestors MUST try this form first (§ 3.1). Follow AliasMode records to the primary owner (RFC 9460 § 2.4.2).
2. **Known organization: query the index.** `SVCB _index._agents.example.com`, connect to its TargetName, authenticate TLS for that host, and fetch the index; the format and protocol are out of scope, so the client must know what the organization serves (§ 3.2).
3. **Select and cache.** Choose an agent from the index, cache its name, and use step 1 for later interactions (§ 1.1, § 3.2).
4. **Unknown organization.** Capability search across organizations is out of scope; use a directory or search service, which may itself be built from `_index._agents` records (§ 3.3, § 5.5).

## Filtering records

For each ServiceMode record in the agent RRset:

- **Mandatory keys.** Skip the record if it lists in `mandatory=` any key you do not implement (§ 6.3; RFC 9460 § 8).
- **ALPN.** Intersect `alpn` with what you support: the agent protocol (for example `mcp` or `a2a`) and a transport (`h2`, `h3`). Do not connect if nothing matches (RFC 9460 § 7.1.2). Negotiate TLS ALPN as usual; the SVCB list does not change the handshake (RFC 9460 § 7.1.2).
- **One protocol per record.** A record whose `alpn` lists two agent protocols violates -02 (§ 3.1.1); treat it as malformed or as -01 input.
- **Priority.** Prefer lower SvcPriority among compatible records (RFC 9460 § 2.4.1).
- **Confirm the protocol.** The agent ids in `alpn` are placeholders (§ 7.3); confirm the protocol from the endpoint or its descriptor before relying on it.
- **Unknown `keyNNNNN`.** Ignore unless you have an out-of-band agreement on its meaning (-01 § 4.4.3).

## Authenticating the endpoint

Consumers SHOULD authenticate the TLS endpoint with DANE TLSA at `_443._tcp.<owner>` (§ 6.2). Pick a posture explicitly:

| Posture              | Behavior                                                                         |
| -------------------- | -------------------------------------------------------------------------------- |
| permissive (default) | Query TLSA; if a record matches, pin to it; if none exists, fall back to WebPKI. |
| preferred            | As permissive, and log the absence of TLSA.                                      |
| strict               | Refuse the connection unless a TLSA record exists and matches.                   |

The draft mandates none of them and says strict-by-default does not suit the general Internet given current DANE adoption (§ 6.2). For hosted agents, the certificate is still validated for the original service name (RFC 9460 § 2.3).

## DNSSEC

- Validate DNSSEC, and refuse to act on bogus or unverifiable records (§ 6.4).
- DNS-AID works without DNSSEC, but its authenticity guarantees then disappear (§ 6.4).
- Never relax validation because a record appears to have no `mandatory=` keys: an unsigned substitute could be steering you to a weaker path (§ 6.4).
- TLSA data is only meaningful when signed; the draft makes signing mandatory for TLSA (§ 1.1).

## Descriptors and trust

- **Records are transport, not trust.** A validated chain only proves the zone's controller published the record. The agent behind it may be malicious or compromised, and the descriptor may contain prompt injection aimed at language-model agents. Consumers MUST NOT treat DNS-AID records as a trust signal; make trust decisions out of band with reputation, attestation or organizational policy (§ 1.2, § 6.1).
- **Integrity.** If the record carries `cap-sha256`, hash the fetched descriptor and refuse it on mismatch. A match proves integrity only, not trust (§ 6.1).
- **Handle descriptors as data.** Parse them with a schema; never pass descriptor text to a model as instructions.
- **Defense in depth.** DNS-AID addresses transport-identity spoofing, capability poisoning and downgrade only; workload-level threats need other controls (§ 6.5).

## Privacy

- Use DNS over TLS or DNS over HTTPS for discovery where available (§ 6.6; RFC 8484).
- Do not send EDNS Client Subnet on queries that reveal user-identifying agent names; operators SHOULD set ECS scope to zero where DNS-AID is the zone's only use (§ 6.6).

## Reading -01 records

When the agent-name query returns nothing, a client may also try -01 names for compatibility: `_<name>._<proto>._agents.<domain>` and the `_agents` leaf. Treat what it finds as legacy data: -01 required DNSSEC on every record and gated custom keys with `mandatory` (-01 § 4.4.1, § 4.4.3). Never prefer a -01 name over a -02 primary owner. dns-aid.org and parts of dns-aid-core still document the -01 pattern and a TXT index, so expect both in the wild.

## Open issues to watch

- The SvcParamKeys and ALPN ids have no assignments; their numbers and spelling may change (§ 7.1, § 7.3).
- -02 queries SVCB at a bare host name with no underscore scheme label. RFC 9460 normally forms SVCB query names with a registered `_scheme` label and expects each protocol to have a mapping document (RFC 9460 § 2.3, § 8, § 10.4.5); DNS-AID does not yet define one.
- The descriptor URI is in `cap` per § 3.1 and in `well-known` per § 6.1.
- The index format, domain control validation and policy keys are all future work (§ 3.2, § 5).
