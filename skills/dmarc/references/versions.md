# Versions and upgrades

Read this when choosing a target version, reading a record, implementation or document written for RFC 7489 or RFC 9091, upgrading one, or checking whether a newer DMARC line exists. Sources: RFC 9989 (Appendix C lists its changes), RFC 9990 (Appendix C), RFC 9991, RFC 7489, RFC 9091, the RFC Editor index and the dmarc WG documents page, listed in [Sources](../SKILL.md#sources).

## Version lines

| Id        | Line     | Status  | Revision                                                                      | Posture | Summary                                                                                                                                      |
| --------- | -------- | ------- | ----------------------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `rfc9989` | RFC 9989 | current | RFC 9989, Proposed Standard (May 2026), with RFC 9990 and RFC 9991 (May 2026) |         | DMARCbis. The default target. Obsoletes RFC 7489 and RFC 9091. Aggregate reporting is RFC 9990, failure reporting RFC 9991.                  |
| `rfc7489` | RFC 7489 | legacy  | RFC 7489, Informational (March 2015)                                          |         | The original single-document DMARC, published on the Independent Submission stream. Obsoleted by RFC 9989, RFC 9990 and RFC 9991.            |
| `rfc9091` | RFC 9091 | legacy  | RFC 9091, Experimental (July 2021)                                            |         | The experimental Public Suffix Domain extension to RFC 7489 (`np` tag, PSD DMARC registry). Obsoleted by RFC 9989, which absorbs it (§ C.3). |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

RFC 9990 and RFC 9991 are covered by the `rfc9989` line rather than given their own lines: all three were published together in May 2026 to replace RFC 7489, and the reporting parts of RFC 7489 moved into them (RFC 9989 § C.4). RFC 9990 Appendix C notes that the split lets each document be revised independently later; if one of them is revised on its own, give it a `family` here.

## Which version to use

- Default to RFC 9989 with RFC 9990 and RFC 9991, and cite those in new documentation, records and code.
- No other line is supported. The record version stays `v=DMARC1` (RFC 9989 § 4.7), so a record written for RFC 7489 is still parsed; treat it as input to an upgrade.
- Expect peers on RFC 7489 during the transition. A Mail Receiver on RFC 7489 uses a Public Suffix List and may reach a different Organizational Domain than the DNS Tree Walk (RFC 9989 § C.3). Strict alignment plus an explicit record for every Author Domain avoids the difference (§ C.3, § 11.8).
- Aggregate reports say which method a receiver used: `discovery_method` is `psl` (RFC 7489) or `treewalk` (RFC 9989) (RFC 9990 § 3.1.1.5).

## What changed

### RFC 9989 (with RFC 9990 and RFC 9991)

From RFC 9989 Appendix C and RFC 9990 Appendix C:

- Standards Track instead of Informational (§ C.1). Reporting moved to RFC 9990 (aggregate) and RFC 9991 (failure) (§ C.4).
- Organizational Domain discovery and policy discovery use the DNS Tree Walk (§ 4.10) instead of a Public Suffix List (§ C.3). The walk also finds PSD policy, replacing the RFC 9091 PSD DMARC registry (§ C.3).
- New tags: `np` (from RFC 9091), `psd` and `t` (§ C.5.1). Removed tags: `pct`, `rf`, `ri` (§ C.5.2), now `historic` in the IANA DMARC Tags registry (§ 9.3).
- The `!size` suffix on reporting URIs is obsolete; reporters ignore it (§ 4.8, § C.4).
- `p` is RECOMMENDED rather than REQUIRED; a record without `p` is treated as `p=none` (§ 4.7). In RFC 7489, `v` and `p` had to appear in that order (RFC 7489 § 6.3).
- With an invalid `p` and a valid `rua`, the receiver MUST (was SHOULD) act as if `p=none` (§ 4.10.1; RFC 7489 § 6.6.3).
- With no DMARC record, receivers MUST NOT (was SHOULD NOT) apply DMARC (§ 4.10.1; RFC 7489 § 6.6.3).
- A report SHOULD go to every listed URI; RFC 7489 only required support for two (§ C.7).
- New normative guidance on enforcement: receivers MUST NOT reject solely on `p=reject`; domains with general users SHOULD NOT publish `p=reject`; `p=reject` domains MUST DKIM-sign (§ 7.4, § C.6).
- Domain Owner actions expanded into a rollout path (§ 5.1, § C.6). New terms: Domain Owner Assessment Policy, Enforcement, Monitoring Mode, PSD, PSO; "Report Receiver" renamed "Report Consumer" (§ C.2).
- Aggregate reports: XML namespace `urn:ietf:params:xml:ns:dmarc-2.0` (RFC 9990 § 6.1; RFC 7489 used `http://dmarc.org/dmarc-xml/0.1`), DKIM `selector` required, `np`, `testing` and `discovery_method` in `policy_published`, `pass` as a disposition, override type `policy_test_mode` added and `forwarded` and `sampled_out` dropped, extensions, a structured Report-ID, and one DMARC Policy Domain per report (RFC 9990 § 3.1, Appendix A, Appendix C).
- External destination verification now covers `rua` in RFC 9990 § 4 and `ruf` in RFC 9991 § 5; the override in the third-party record must keep the same destination host (RFC 9990 § 4 step 9).
- Failure reports: report generators MUST rate-limit, MUST NOT use `ruf` from `psd=y` records without agreement (RFC 9991 § 2), and the `rf` tag is gone; the format is AFRF (RFC 6591) as updated by RFC 9991 § 4.

RFC 9989 has two verified editorial errata (IDs 9025 and 9150). Erratum 9150 corrects the external-reporting cross-reference in § 11.6 and Appendices B.2.3 and B.2.4 to RFC 9990 § 4 (not § 3). This skill cites § 4.

## Upgrading

### RFC 7489 to RFC 9989

For a Domain Owner's records:

1. Change the version marker: none. Keep `v=DMARC1` first (§ 4.7). Update documentation and code comments to cite RFC 9989, RFC 9990 and RFC 9991.
2. Replace removed or renamed tags:
   - `pct=0` becomes `t=y`; `pct=100` (or any other value used as "fully on") is dropped, because `t=n` is the default (§ A.6). Values between 1 and 99 have no equivalent: pick `t=y` while still testing, or drop `pct` once ready.
   - Drop `rf` (the format is always AFRF) and `ri` (receivers SHOULD report at least daily, § 5.3.8).
   - Drop `!size` suffixes from `rua` and `ruf` URIs (§ 4.8).
   - Add `np` if non-existent subdomains need a different policy from `sp` or `p` (§ 4.7).
3. Validate against the target: check the record against the § 4.8 ABNF; confirm the Organizational Domain the DNS Tree Walk finds for every Author Domain and sending identifier is the one you expect (§ 4.10.2); publish `psd=n` on the Organizational Domain if a parent zone publishes a record without `psd=y` (§ 11.8); publish a record directly at any Author Domain with more than eight labels (§ 5.1.8).
4. Keep behaviour unchanged: a receiver still on RFC 7489 ignores `t` and `np` as unknown tags, and a receiver on RFC 9989 ignores `pct`. During the transition, expect both behaviours in aggregate reports.

For a Mail Receiver or report generator:

1. Replace PSL lookups with the DNS Tree Walk for policy discovery and alignment (§ 4.10), capped at eight queries.
2. Implement `t`, `np` and `psd`; ignore `pct`, `rf`, `ri` and URI size suffixes as unknown or obsolete (§ 4.7, § 4.8).
3. Stop rejecting solely on `p=reject`; add `Authentication-Results` and report overrides with `reason` (§ 5.4, § 7.4).
4. Emit aggregate reports in the RFC 9990 schema and namespace, with `selector`, `discovery_method` and `testing`, one DMARC Policy Domain per report, and the RFC 9990 filename and Subject (RFC 9990 § 3.1, § 3.5.2). Validate them against RFC 9990 Appendix A.
5. Verify external `rua` and `ruf` destinations per RFC 9990 § 4 and RFC 9991 § 5, and rate-limit failure reports (RFC 9991 § 2).

For a Report Consumer: accept both namespaces while senders migrate, and read `discovery_method` to tell which algorithm a receiver used (RFC 9990 § 3.1.1.5).

### RFC 9091 to RFC 9989

1. Keep `np` in PSO records; its meaning is unchanged (§ 4.7, § C.5.1).
2. Add `psd=y` to every DMARC record a PSO publishes for its PSD (§ 5.2). The tree walk finds the PSD record directly, so no PSD DMARC registry is consulted (§ C.3).
3. Remove `ruf` from records of multi-organizational PSDs (§ 10.2), and expect PSD reporting to be aggregate only (RFC 9990 § 7.3).
4. Receivers drop the PSD registry lookup (RFC 9091 § 3.6 step 3A) and rely on `psd=y` found during the walk (§ 4.10.2).

## Preview

No preview line is listed. The RFC Editor index shows nothing that updates or obsoletes RFC 9989, RFC 9990 or RFC 9991, and the only active dmarc WG Internet-Draft on 2026-10-05 is `draft-ietf-dmarc-arc-to-historic`, which reclassifies ARC rather than revising DMARC. New tags are added through the IANA DMARC Tags registry without a new `v` value (§ 4.8, § 9.3); check that registry when refreshing.
