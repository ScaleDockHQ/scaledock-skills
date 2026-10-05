# Rollout: from monitoring to enforcement

Read this when a Domain Owner deploys DMARC, moves a domain towards `p=quarantine` or `p=reject`, decides whether `p=reject` is appropriate, or plans records for subdomains and delegated zones. Section numbers refer to RFC 9989 unless another RFC is named.

## Terms

- **Monitoring Mode**: the Organizational Domain and everything below it is at `p=none`, and the Domain Owner is reading aggregate reports (§ 3.2.12).
- **Enforcement**: the policy for the Organizational Domain and all subdomains is not `p=none` (§ 3.2.9).

## Steps (§ 5.1)

1. **SPF with an aligned MAIL FROM.** Every stream MUST use an `RFC5321.MailFrom` domain that yields an aligned SPF-Authenticated Identifier (§ 5.1.1, § 8). Review SPF records for overly broad ranges before publishing DMARC, and periodically afterwards (§ 7.1).
2. **DKIM with an aligned `d=`.** Every stream MUST be signed with a domain that aligns with the Author Domain (§ 5.1.2, § 8). Using both SPF and DKIM is RECOMMENDED (§ 4.5).
3. **A mailbox for aggregate reports**, with tooling or a service to parse them (§ 5.1.3, § 5.1.5). See [`reporting.md`](reporting.md).
4. **Publish in Monitoring Mode**: `p=none` with `rua`, at each Author Domain and at the Organizational Domain if it differs (§ 5.1.4).

   ```text
   _dmarc.example.com.  TXT  "v=DMARC1; p=none; rua=mailto:dmarc-feedback@example.com"
   ```

5. **Collect and analyse reports.** Find every server and third-party sender using the domain (§ 5.1.5, § B.5). Depending on sending cadence this can take many months (§ 5.1.7).
6. **Remediate.** Legitimate streams that are unaligned or unauthenticated MUST be fixed before publishing an Enforcement policy (§ 5.1.6).
7. **Decide on Enforcement** once all mail authenticates, weighing the interoperability issues below (§ 5.1.7).

## Moving up the policy ladder

- RFC 9989 replaces `pct` with `t` (§ A.6). `t=y` asks validators to apply one level below the published policy and any special handling they have, such as `From` rewriting; reports are unaffected (§ 4.7).
- For domains whose users may post to mailing lists, the path is `p=none` for at least a month, then `p=quarantine` for an equally long period, comparing disposition results in the reports, before any `p=reject` (§ 7.4).
- The worked example in § B.2.5 goes from `p=quarantine; t=y` to `p=reject` without `t` once reports show all authorized mail passing.

A practical sequence built only from those rules:

| Stage | Record                               | Applied by RFC 9989 validators |
| ----- | ------------------------------------ | ------------------------------ |
| 1     | `v=DMARC1; p=none; rua=…`            | none                           |
| 2     | `v=DMARC1; p=quarantine; t=y; rua=…` | none, plus test-mode handling  |
| 3     | `v=DMARC1; p=quarantine; rua=…`      | quarantine                     |
| 4     | `v=DMARC1; p=reject; t=y; rua=…`     | quarantine                     |
| 5     | `v=DMARC1; p=reject; rua=…`          | reject (subject to § 7.4)      |

Stay at each stage until the aggregate reports show no legitimate mail failing. Receivers still on RFC 7489 ignore `t` and apply the stated `p` in full; check the `discovery_method` in reports to see who is who (RFC 9990 § 3.1.1.5).

## When `p=reject` is appropriate

- Domains that publish `p=reject` MUST NOT rely solely on SPF and MUST apply valid DKIM signatures, because forwarding breaks SPF while DKIM usually survives (§ 7.4, § 8).
- Domains whose users might post to mailing lists SHOULD NOT publish `p=reject`. If they do, they SHOULD follow the none, then quarantine, ladder above, and SHOULD tell users not to post to Internet mailing lists or that participation may be hindered (§ 7.4).
- Indirect flows (alumni forwarders, role aliases, mailing lists) are where `p=reject` breaks mail (§ 7.4; RFC 7960). Mailing list software commonly rewrites `From` to keep alignment (§ 7.4).
- An SPF `-all` can get mail rejected before DMARC runs, even mail that would pass on aligned DKIM, and such mail never appears in aggregate reports (§ 7.1).

## Subdomains and delegated zones

- `sp` sets the policy for existing subdomains and `np` for non-existent ones; `np` lets you reject mail from made-up subdomains while existing ones stay at a softer policy (§ 4.7).
- A subdomain can have its own record and policy, for example a test subdomain at enforcement before the parent (§ B.2.5).
- A delegated subtree can declare itself an Organizational Domain with `psd=n` to get its own policy and reporting (§ 5.1.8).
- An Author Domain with more than eight labels MUST have a record at its own name, because the tree walk skips the intermediate names (§ 5.1.8).
- To avoid differences between Tree Walk and PSL receivers, use strict alignment and publish explicit records for every Author Domain (§ C.3, § 11.8).
- If a parent PSD publishes a record without `psd=y`, add `psd=n` to your Organizational Domain record (§ 11.8).

## Rollout review

- [ ] Every legitimate stream shows an aligned pass in aggregate reports for at least one mechanism, and preferably both (§ 5.1).
- [ ] Streams that will reach `p=reject` are DKIM-signed with an aligned `d=` (§ 7.4).
- [ ] Records exist for the Organizational Domain and every Author Domain that needs its own policy (§ 5.1.4, § 8).
- [ ] No `pct`, `rf` or `ri` remain (§ C.5.2).
- [ ] The users of the domain and the mailing lists they post to have been considered before `p=reject` (§ 7.4).
