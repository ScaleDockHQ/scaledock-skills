# Versions and upgrades

Read this when choosing a target version, reading a record or implementation written for RFC 4408, upgrading one, or checking whether SPF has a newer line. Sources: RFC 7208 (Appendix B lists its changes), RFC 4408, the RFC 7208 errata list, and the RFCs that update RFC 7208, listed in [Sources](../SKILL.md#sources).

## Version lines

| Id        | Line     | Status  | Revision                                 | Posture | Summary                                                                                                  |
| --------- | -------- | ------- | ---------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------- |
| `rfc7208` | RFC 7208 | current | RFC 7208, Proposed Standard (April 2014) |         | The default target. Obsoletes RFC 4408; updated by RFC 7372, RFC 8553 and RFC 8616; no successor listed. |
| `rfc4408` | RFC 4408 | legacy  | RFC 4408, Experimental (April 2006)      |         | Obsoleted by RFC 7208. Same `v=spf1` record language, plus the SPF RR type 99 and no void lookup limit.  |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

Both lines are SPF version 1 and share the `v=spf1` version tag (RFC 7208 § 4.5, RFC 4408 § 4.5). A record written for RFC 4408 is read by an RFC 7208 verifier; the differences are in DNS record types, processing limits and guidance.

## Which version to use

- Default to RFC 7208, and cite it rather than RFC 4408 in documentation, code and reports.
- No other line is supported. RFC 4408 was published as Experimental; RFC 7208 is on the Standards Track and obsoletes it.
- Treat an RFC 4408 deployment (an SPF type 99 record, a verifier without a void lookup limit, `ptr` in records) as input to an upgrade.

## What changed

### RFC 7208

Appendix B lists the changes in implementation requirements from RFC 4408:

- The SPF RR type 99 is removed. Records are TXT only (§ 3.1, § 14.1). RFC 4408 § 3.1.1 said a domain SHOULD publish both TXT and type 99 with identical content, and RFC 4408 § 4.5 discarded TXT records when type 99 records were present.
- A void lookup limit is added: verifiers SHOULD return `permerror` after more than two DNS-querying terms return NXDOMAIN or an empty answer (§ 4.6.4, § 11.1).
- `ptr` and `%{p}` are strongly discouraged: they SHOULD NOT be published but remain in the protocol, and verifiers MUST support `ptr` (§ 5.5, § 7.2, § 7.3).
- `Authentication-Results` is described as an alternative to `Received-SPF` (§ 9.2).
- The ABNF is corrected (§ 12), and the `x-` names are removed from it. RFC 4408 § 7 allowed `"x-" name` keys in `Received-SPF`.
- The handling of a `<domain-spec>` that is invalid after macro expansion is documented as undefined; do not depend on one behaviour (§ 4.8).
- Operational guidance is expanded (§ 10, Appendices D to G), and the security considerations are revised (§ 11).

Comparing the two texts also shows these changes, which Appendix B does not list separately:

- `mx` and `ptr` limits split: each MX name MUST NOT cause more than 10 address lookups, and exceeding that gives `permerror`; for `ptr` and `%{p}`, names beyond the first 10 are ignored (§ 4.6.4). RFC 4408 § 10.1 had one limit of 10 MX or PTR records for both.
- The elapsed-time limit on `check_host()` becomes a SHOULD, still allowing at least 20 seconds and giving `temperror` (§ 4.6.4). It was a MAY in RFC 4408 § 10.1.
- The lookup uses TXT only, and any server failure or timeout gives `temperror` (§ 4.4). RFC 4408 § 4.4 allowed querying TXT, type 99 or both.
- The reject reply for `fail` keeps 550 with 5.7.1, `temperror` keeps 451 with 4.4.3, and `permerror` gains 550 with 5.5.2 (§ 8.4, § 8.6, § 8.7). RFC 4408 § 2.5.7 gave no reply code for `permerror`.
- Results guidance moves from § 2.5 to § 8, and "non-delivery notifications to forged identities" is reframed as backscatter (§ 2.5).

### Updates to RFC 7208

The RFC Editor lists three RFCs that update RFC 7208:

- **RFC 7372** (September 2014) registers `X.7.23` "SPF validation failed" for use in place of 5.7.1 on `fail` (RFC 7208 § 8.4), and `X.7.24` "SPF validation error" in place of 4.4.3 or 5.5.2 on `temperror` and `permerror` (RFC 7208 § 8.6, § 8.7) (RFC 7372 § 3.2). Use of the codes is optional; an operator that does not want to reveal policy can keep a generic code (RFC 7372 § 5). When several authentication checks fail, a server SHOULD use `X.7.26` rather than only the first failure (RFC 7372 § 4).
- **RFC 8553** (March 2019, BCP 222) lists RFC 7208 among the specifications that use TXT records under underscored names, and expects the global underscored node name to be registered in the IANA "Underscored and Globally Scoped DNS Node Names" registry (RFC 8553 § 2.1). It does not change SPF evaluation.
- **RFC 8616** (2019) requires U-labels to be converted to A-labels before SPF validation, both in the initial lookup name and in macro expansion. An IDN `HELO` name MUST be A-labels; terms using `%{s}` or `%{l}` with a non-ASCII local-part match nothing (RFC 8616 § 4).

### Errata

The RFC 7208 errata list holds 2 verified, 10 reported, 2 held for document update and 3 rejected reports, checked 2026-10-05.

- Verified 5436 (Technical): the `Received-SPF` ABNF becomes `"Received-SPF:" [CFWS] result [ FWS comment ] [ FWS key-value-list ] [FWS] CRLF`, so a result followed by only a comment is valid.
- Verified 6721 (Technical): the multi-line reply example in § 8.4 uses continuation lines, `550-5.7.1 ...` on all but the last line.
- Held 4001: the Appendix A.4 example uses the obsolete SPF RR type; read it as TXT.
- Held 4453: the CIDR length ABNF matches more digits than the 0-32 and 0-128 ranges in its comments; the comments restrict the range.
- Reported, not verified: 4751 and 8596 note that the two descriptions of `ptr` matching in § 5.5 contradict each other; 5843 says the `mechanism=ip4:...` value in a § 9.1 example needs quoting; 6216 says the A.4 `-ptr` example cannot match; 6595 notes that macro-based `exists` terms can trip the void lookup limit. Do not depend on reported text; it is not part of the RFC.
- Rejected 4081 and 4082 asked to change the enhanced status codes in § 8.4 and § 8.7; RFC 7372 registered the SPF-specific codes instead.

### RFC 4408

The first published SPF version 1 specification, Experimental (April 2006). The RFC Editor lists RFC 6652 as updating it and RFC 7208 as obsoleting it.

## Upgrading

### RFC 4408 to RFC 7208

1. Change the version marker: none in the record, which stays `v=spf1` (§ 4.5). Update documentation and code comments to cite RFC 7208.
2. Replace removed or renamed parts:
   - Publisher: delete SPF type 99 records and keep a single TXT record per name with the same content (§ 3.1, § 3.2, § 14.1).
   - Publisher: replace `ptr` with `ip4`, `ip6`, `a` or `mx`, and remove `%{p}` (§ 5.5, § 7.3).
   - Publisher: remove terms whose targets no longer exist, so the void lookup limit is not reached (§ 4.6.4).
   - Verifier: query TXT only and stop selecting type 99 records (§ 4.4, § 4.5).
   - Verifier: add the void lookup limit of two, the split `mx` and `ptr` limits, and an elapsed-time limit of at least 20 seconds (§ 4.6.4).
   - Verifier: stop emitting `x-` keys in `Received-SPF`, and consider `Authentication-Results` (§ 9.1, § 9.2).
   - Verifier: use 550 with 5.5.2 (or `X.7.24`) for a `permerror` rejection (§ 8.7; RFC 7372 § 3.2).
3. Validate against the target: the record parses against the § 12 ABNF, the full tree stays within 10 DNS-querying terms with no void lookups, and verifier tests cover each § 4 and § 5 outcome.
4. Keep behaviour unchanged: the same hosts get `pass` and the same hosts get `fail`. Check the TXT content before deleting a type 99 record, because RFC 4408 verifiers that preferred type 99 may have been reading different content.

## Preview

No preview line is listed. The RFC Editor entry for RFC 7208 shows no obsoleting RFC, the SPFbis working group is concluded, and a search of the IETF Datatracker on 2026-10-05 found no Internet-Draft revising SPF; the latest `draft-ietf-spfbis-4408bis` revision is the one published as RFC 7208. Watch the RFC 7208 entry and the Datatracker for a revision; if one appears, add it as a preview with posture **track**.
