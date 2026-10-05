# Alignment, the DNS Tree Walk and receiver evaluation

Read this when implementing or debugging DMARC evaluation at a Mail Receiver, working out which record applies to an Author Domain, or checking whether an SPF or DKIM identifier aligns. Section numbers refer to RFC 9989 unless another RFC is named.

## Identifiers

- **Author Domain**: the domain of the `RFC5322.From` header field (§ 3.2.2). U-labels are converted to A-labels first (§ 5.3.1).
- **SPF-Authenticated Identifier**: the SPF-validated MAIL FROM domain. DMARC never uses the HELO identity; with a null reverse-path, the MAIL FROM identity is `postmaster@<HELO domain>` (§ 3.2.4, § 4.4.2).
- **DKIM-Authenticated Identifier**: the `d=` domain of a DKIM-Signature that validates (§ 3.2.3, § 4.4.1). Any validating signature whose `d=` aligns is enough (§ 4.4.1).
- DMARC does not validate the local-part or the display name (§ 4.1, § 11.4).

## Alignment

- **Strict**: the Author Domain and the identifier are identical (§ 3.2.10.2).
- **Relaxed**: they have the same Organizational Domain (§ 3.2.10.1).
- Comparisons are case-insensitive (§ 4.4). `adkim` and `aspf` choose the mode per mechanism; both default to relaxed (§ 4.7).
- Alignment needs a passing mechanism: a failed SPF check or an invalid DKIM signature cannot align (§ B.1.1, § B.1.2).

| Authenticated Identifier | Author Domain      | Alignment                            |
| ------------------------ | ------------------ | ------------------------------------ |
| `foo.example.com`        | `news.example.com` | relaxed (same Organizational Domain) |
| `news.example.com`       | `news.example.com` | strict (identical)                   |
| `foo.example.net`        | `news.example.com` | none                                 |

(§ 4.4, Table 1)

## The DNS Tree Walk

RFC 9989 replaces the Public Suffix List with a walk up the DNS (§ 4.10). Generic steps:

1. Query `_dmarc.<start>` for TXT. Discard records not starting with `v=DMARC1`; if several remain, discard them all. If one remains with `psd=y` or `psd=n`, stop.
2. Number the labels right to left; `x` is the count.
3. If `x < 8`, remove the left-most label. If `x >= 8`, remove left-most labels until 7 remain. That is the next target.
4. Query `_dmarc.<target>`, filter as in step 1, and stop on a single record with `psd=y` or `psd=n`.
5. Remove the left-most label and repeat step 4 until stopped or no labels remain.

This caps the walk at eight queries. For `a.b.c.d.e.f.g.h.i.j.mail.example.com` the queries are `_dmarc.a.b.c.d.e.f.g.h.i.j.mail.example.com`, then `_dmarc.g.h.i.j.mail.example.com`, `_dmarc.h.i.j.mail.example.com`, `_dmarc.i.j.mail.example.com`, `_dmarc.j.mail.example.com`, `_dmarc.mail.example.com`, `_dmarc.example.com` and `_dmarc.com` (§ 4.10).

### Policy discovery (§ 4.10.1)

The record that applies is, in order of preference, the one at the Author Domain, at its Organizational Domain, or at its PSD.

1. Query `_dmarc.<Author Domain>`. A valid record there is the policy record (it is not necessarily the Organizational Domain for alignment).
2. Otherwise, walk from the parent of the Author Domain (or, above eight labels, from the shortened name of § 4.10 step 3).
3. Which tag gives the policy:
   - record at the Author Domain: `p`;
   - record at the Organizational Domain or PSD, Author Domain is a subdomain that exists: `sp`, else `p`;
   - same, Author Domain does not exist (NXDOMAIN): `np`, else `sp`, else `p`.
4. Missing or invalid `p`, or invalid `sp` or `np`: act as `p=none` if `rua` has a valid URI, else no DMARC processing.
5. No record found (not a transient error): receivers MUST NOT apply DMARC.
6. DNS errors are left to the receiver: deliver ("fail open") or answer 4yx ("fail closed").

A PSD record is never used when the Organizational Domain has its own record, and it is not a way to get `rua` or `ruf` for an Organizational Domain that declined to publish them (§ 4.10.1 note).

Domain existence for `np` (§ A.4): NXDOMAIN means the name and everything below it does not exist (RFC 8020). NODATA means the name exists. Any RR type makes a name exist; no MX, A or AAAA is required.

### Organizational Domain selection (§ 4.10.2)

Skip the walks when the Author Domain and every identifier are the same domain with a record there (that domain is the Organizational Domain), when no policy record applies, or when the mode is strict (string comparison).

Otherwise walk from each domain needed: the Author Domain, the SPF identifier if SPF passed, each DKIM identifier that passed. Among the names where valid records were found, from longest to shortest:

1. A record with `psd=n`: that name is the Organizational Domain.
2. A record with `psd=y`, other than at the walk's starting name: the Organizational Domain is the name one label below it.
3. Otherwise, the name with the fewest labels that has a record.

If none of these applies, the starting name is its own Organizational Domain.

Examples (§ 4.10.2, § B.4):

- Start `a.mail.example.com`; records at `mail.example.com` and `example.com`, none at `com`: Organizational Domain `example.com`.
- Same start; `_dmarc.mail.example.com` has `psd=n`: `mail.example.com`.
- Same start; only `_dmarc.com`, with `psd=y`: `example.com`.
- Author `giant.bank.example` (record without `psd`), `_dmarc.bank.example` has `psd=y`: Organizational Domain `giant.bank.example`. MAIL FROM `mail.giant.bank.example` aligns with it; DKIM `d=mail.mega.bank.example` has Organizational Domain `mega.bank.example` and does not (§ B.4.3).

## Receiver evaluation (§ 5.3)

1. **Extract the Author Domain** from `RFC5322.From`. Zero or more than one domain: DMARC cannot run and stops, though a receiver MAY go on with several (§ 5.3.1). For a multi-valued From, one approach is to evaluate each domain and apply the strictest failing policy, with a limit on how many domains to process (§ 11.5).
2. **Discover the policy** (§ 5.3.2, § 4.10.1). No record: DMARC does not apply.
3. **Collect authenticated identifiers** (§ 5.3.3). For SPF keep `pass` or `fail`, the reason if available and the domain checked. For each DKIM signature keep `pass` or `fail`, the reason, and `d=` and `s=`.
4. **Check alignment** for each identifier (§ 5.3.4, § 4.10.2).
5. **Decide** (§ 5.3.5): any aligned identifier means `pass`; none means `fail`.
6. **Apply policy** (§ 5.3.6, § 5.4). DNS errors during evaluation mean neither pass nor fail; the assessment policy cannot be applied.
7. **Store results** if any reports will be sent (§ 5.3.7), and send them (§ 5.3.8, § 5.3.9); see [`reporting.md`](reporting.md).

Evaluation SHOULD happen during the SMTP transaction when the receiver honours enforcement policies (§ 5.3). Record the result in `Authentication-Results` with method `dmarc` and result `pass`, `fail`, `none`, `temperror` or `permerror` (§ 9.2).

## Enforcement at the receiver

- Final handling is local policy (§ 5.4). A pass carries no value judgment and MAY still be rejected or quarantined (§ 5.4).
- Receivers MAY accept mail that fails under `p=reject`, and MUST NOT reject solely because of `p=reject`. Without other knowledge and analysis, they MUST treat such mail as `p=quarantine` (§ 5.4, § 7.4, § 8).
- A receiver that does not honour the published policy SHOULD at minimum add `Authentication-Results` (RFC 8601), and doing so is RECOMMENDED when delivering mail that fails DMARC (§ 5.4).
- Report any deviation from the published policy with a `reason` in the aggregate report (§ 5.4; RFC 9990 § 3.1.6).
- `p=none` MUST NOT change existing handling (§ 5.4). `t=y` lowers the policy by one level (§ 4.7).
- Rejecting: a 5xy reply to DATA is a full rejection; a 2xy and discard is a silent discard. A reply text containing "DMARC" helps, for example `550 5.7.1 Email rejected per DMARC policy for example.com`. Defer with 4xy when the policy cannot be retrieved or applied (§ 7.2).

## Conformance checklist for receivers (§ 8)

- MUST look for a DMARC record for the Author Domain.
- MUST determine authenticated identifiers and keep the results for reporting.
- MUST check alignment and decide pass or fail from it.
- MUST support `mailto:` for reports; SHOULD send aggregate reports at least daily.
- MUST NOT reject solely on `p=reject`.

## Security notes

- Relaxed alignment lets anyone who controls a subdomain's SPF or DKIM records pass DMARC for the Organizational Domain; use strict alignment or keep subdomain control tight (§ 11.8).
- A wrong Organizational Domain (a parent of the right one) can let an attacker pass under relaxed alignment. Avoid it with strict alignment and explicit records for every Author Domain, or watch PSD records above you and add `psd=n` if a PSD publishes without `psd=y` (§ 11.8).
- DNS spoofing can make aligned mail look unaligned or the reverse; DNSSEC, DNS over TLS or DNS over HTTPS mitigate it (§ 11.3).
- A permissive SPF source can be excluded from DMARC with the `?` qualifier on its mechanism (§ 11.1).
- Display-name and look-alike domain attacks are out of scope (§ 2.2, § 11.4).
