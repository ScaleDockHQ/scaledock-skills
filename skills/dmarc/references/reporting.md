# Aggregate and failure reporting

Read this when requesting reports (`rua`, `ruf`, `fo`), authorizing a third-party Report Consumer, generating reports at a Mail Receiver, or parsing them. Aggregate reports are RFC 9990, failure reports RFC 9991; RFC 9989 sections are cited as "RFC 9989 § n".

## Who does what

- **Domain Owner**: publishes `rua` (and optionally `ruf` and `fo`) and reads the reports (RFC 9989 § 5.1.3, § 5.1.5). Aggregate reports are meant to be machine-parsed (RFC 9989 § 5.1.5).
- **Mail Receiver / report generator**: SHOULD send aggregate reports at least every 24 hours (RFC 9989 § 5.3.8); MAY send failure reports (RFC 9989 § 5.3.9). Without `rua` it MUST NOT send aggregate reports; without `ruf` it MUST NOT send failure reports (RFC 9989 § 4.7).
- **Report Consumer**: receives reports for its own or other domains, and authorizes the latter in DNS (RFC 9989 § 3.2.18; RFC 9990 § 4).

## Verifying external destinations (RFC 9990 § 4, RFC 9991 § 5)

When the Organizational Domain of the record differs from the Organizational Domain of a `rua` URI's host, the receiver MUST:

1. Take the URI's host (the destination host).
2. Prepend `_report._dmarc`.
3. Prepend the domain the policy came from, as an A-label.
4. If the name exceeds DNS limits, stop: not authorized.
5. Query TXT at that name. On a temporary DNS error it MAY defer.
6. Keep records that parse as tag-value lists starting with `v=DMARC1` (trailing `;` optional).
7. None left: not authorized; the URI MUST be ignored.
8. At least one left: authorized.
9. A `rua` in that record replaces the original, but it MUST use the same destination host. If the override's host differs from the publishing domain, the receiver MUST NOT report to either URI.

Failure reports use the same procedure with `ruf` in place of `rua` (RFC 9991 § 5).

```dns
; Domain Owner, zone example.com
_dmarc  IN TXT ( "v=DMARC1; p=none; "
                 "rua=mailto:dmarc-feedback@example.com; "
                 "ruf=mailto:auth-reports@thirdparty.example.net" )

; Report Consumer, zone thirdparty.example.net: accept reports for example.com
example.com._report._dmarc   IN   TXT    "v=DMARC1;"

; Optional override to another mailbox at the same host
example.com._report._dmarc   IN   TXT    (
        "v=DMARC1; "
        "rua=mailto:aggregate-reports@thirdparty.example.net; "
        "ruf=mailto:failure-reports@thirdparty.example.net" )
```

(RFC 9989 § B.2.3, § B.2.4). A consumer that accepts reports for any domain can publish `*._report._dmarc.<its domain>` with `v=DMARC1` (RFC 9990 § 4). Removing the record stops reports after its TTL. Where possible, a mailbox inside your own domain that forwards to the external destination avoids the extra DNS load (RFC 9989 § 11.6).

## Aggregate reports (RFC 9990)

Content rules (§ 3.1):

- One report per DMARC Policy Domain per period, and one policy configuration per report. If the policy changed, either send several reports or report the final configuration (§ 3.1, § 3.3).
- Subdomains without their own record go into the report of the domain whose record applied, one `record` per `RFC5322.From` domain (§ 3.1.2).
- The XML MUST follow the Appendix A schema, namespace `urn:ietf:params:xml:ns:dmarc-2.0`. A report that does not match SHOULD be discarded by the evaluator (§ 3.1.1, § 6.1).

Structure (elements in the listed order where § 3.1.1 says so):

```text
feedback (xmlns="urn:ietf:params:xml:ns:dmarc-2.0")
├── version            O  "1.0"
├── report_metadata    R  org_name, email, extra_contact_info?, report_id,
│                         date_range{begin,end} (UTC epoch seconds), error?, generator?
├── policy_published   R  domain, discovery_method? (psl|treewalk), p, sp?, np?,
│                         fo?, adkim?, aspf?, testing? (n|y)
├── extension          O  namespaced elements
└── record             +  row{source_ip, count,
                              policy_evaluated{disposition (none|pass|quarantine|reject),
                                               dkim (pass|fail), spf (pass|fail), reason*{type, comment?}}}
                          identifiers{header_from, envelope_from?, envelope_to?}
                          auth_results{dkim*{domain, selector, result, human_result?},
                                       spf?{domain, scope? (mfrom), result, human_result?}}
                          namespaced extension elements*
```

Field rules:

- `date_range` is the reporting period, not first and last message; periods SHOULD NOT overlap and are typically one UTC day (§ 3.1.1.4).
- `policy_evaluated` `dkim` and `spf` are the DMARC-aligned results; `auth_results` holds the raw results (§ 3.1.1.9, § 3.1.1.11).
- When alignment fails and the applied policy differs from the published one, `reason` MUST be present (§ 3.1.1.9). Types: `local_policy`, `mailing_list`, `other`, `policy_test_mode`, `trusted_forwarder` (§ 3.1.6).
- Every DKIM signature validation attempted MUST be reported, with `selector`; SHOULD be at most 100 per row, in order: strict aligned pass, relaxed aligned pass, other pass, fail (§ 3.1.1.11, § 3.1.3).
- DKIM `result` uses RFC 8601 § 2.7.1 values; SPF `result` uses § 2.7.2 values, lowercase (§ 3.1.1.12, § 3.1.1.13).
- `envelope_from` MAY be empty for a null reverse-path (§ 3.1.1.10).
- `error` carries record evaluation problems, such as an invalid `rua` or multiple records (§ 3.1.5).
- Extensions MUST be namespaced and point to their definition; processors SHOULD skip ones they do not know (§ 3.2, § 5).

Delivery by email (§ 3.5):

- Evaluate URIs in order, ignore malformed ones (SHOULD), and attempt delivery to every remaining one up to the receiver's limits (MUST). Undeliverable data MAY be cached or discarded.
- SHOULD use TLS (STARTTLS) unless the URI says otherwise.
- The message follows RFC 5322 and MIME. The XML is an attachment, SHOULD be gzip-compressed, as `application/gzip` or `text/xml` (§ 3.5.2).
- Filename: `receiver "!" policy-domain "!" begin "!" end [ "!" unique-id ] "." ("xml" / "xml.gz")`, for example `mail.receiver.example!example.com!1013662812!1013749130.xml.gz`. A re-sent report MUST reuse the filename (§ 3.5.2).
- Subject: `Report Domain: <policy domain> Submitter: <receiver> [Report-ID: <ridtxt>]` (§ 3.5.2).
- Report-ID MUST be unique per destination domain, and Report-ID and unique-id MUST match where both appear (§ 3.1.4, § 3.5.1).
- The report mail stream MUST pass DMARC with alignment (§ 3.5.2).

Minimal valid example (RFC 9990 Appendix B, abbreviated):

```xml
<feedback xmlns="urn:ietf:params:xml:ns:dmarc-2.0">
  <version>1.0</version>
  <report_metadata>
    <org_name>Sample Reporter</org_name>
    <email>report_sender@example-reporter.com</email>
    <report_id>3v98abbp8ya9n3va8yr8oa3ya</report_id>
    <date_range><begin>302832000</begin><end>302918399</end></date_range>
  </report_metadata>
  <policy_published>
    <domain>example.com</domain>
    <p>quarantine</p><sp>none</sp><np>none</np>
    <testing>n</testing>
    <discovery_method>treewalk</discovery_method>
  </policy_published>
  <record>
    <row>
      <source_ip>192.0.2.123</source_ip>
      <count>123</count>
      <policy_evaluated>
        <disposition>pass</disposition><dkim>pass</dkim><spf>fail</spf>
      </policy_evaluated>
    </row>
    <identifiers>
      <envelope_from>example.com</envelope_from>
      <header_from>example.com</header_from>
    </identifiers>
    <auth_results>
      <dkim><domain>example.com</domain><result>pass</result><selector>abc123</selector></dkim>
      <spf><domain>example.com</domain><result>fail</result></spf>
    </auth_results>
  </record>
</feedback>
```

Consuming reports:

- Treat every report as hostile input: guard the decompressor and XML parser against zip bombs and XML bombs (§ 8.1), and expect forged data in volume (§ 8.2; RFC 9989 § 11.2).
- Deduplicate on filename and Report-ID; how to handle duplicates is up to the consumer (§ 3.5.4).
- Accept mixed-policy reports while a record change propagates (§ 3.3).

## Failure reports (RFC 9991)

- Sent soon after a failure, in AFRF (RFC 6591) format, to `ruf`, under the conditions `fo` asks for (§ 2; RFC 9989 § 4.7).
- Report generators MUST attempt every `ruf` URI, MUST verify external ones, MUST rate-limit, and MUST NOT use `ruf` from `psd=y` records without a specific agreement (§ 2).
- ARF fields: `Identity-Alignment` REQUIRED (`none` or a list of `dkim`, `spf`); `Delivery-Result` OPTIONAL; `DKIM-Domain`, `DKIM-Identity`, `DKIM-Selector` REQUIRED for a DKIM failure of an aligned identifier; `DKIM-Canonicalized-Header` and `DKIM-Canonicalized-Body` OPTIONAL; `SPF-DNS` REQUIRED for an SPF failure of an aligned identifier. `Auth-Failure: dmarc` marks a DMARC failure (§ 4).
- A generator MAY send DKIM or SPF failure reports (RFC 6591, RFC 6651, RFC 6652) instead of or as well as DMARC ones (§ 3).
- The report stream SHOULD be DMARC-aligned, to avoid loops (§ 5.1).
- Aggregate incidents and rate-limit to avoid flooding a victim domain (§ 8.1).

## Privacy

- Aggregate reports carry domain-level data and no personal information (RFC 9990 § 7.2), but can still reveal sending patterns of small organizations; protect the `rua` mailbox (RFC 9989 § 10.1).
- PSD reporting can leak data of registrants that have no record of their own; PSD feedback MUST be limited to aggregate reports (RFC 9990 § 7.3), and multi-organizational PSDs MUST NOT publish `ruf` (RFC 9989 § 10.2).
- Failure reports can contain headers or whole messages with PII. Request them only for targeted diagnostics, redact (RFC 6590), send over secure channels, and isolate and sandbox them at the consumer (RFC 9991 § 7, § 7.3; RFC 9989 § 10.2). Most large receivers do not send them (RFC 9989 § 5.3.9, § 10.2).
- Sending reports to a third party may be constrained by the receiver's privacy policy; both sides should check (RFC 9990 § 7.1; RFC 9991 § 7.2).
- Avoid unencrypted transport for reports (SHOULD) (RFC 9989 § 11.7).
- Do not use extensions to disclose inbox or spam placement (RFC 9990 § 8.3).
