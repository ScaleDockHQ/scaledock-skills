# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published RFC text, quoted as written (only line breaks and page breaks from the plain-text layout were joined). Apply the ones that match the role. Each is labelled with the RFC and section it comes from.

## RFC 8461 SMTP MTA Strict Transport Security (MTA-STS)

Source: https://www.rfc-editor.org/rfc/rfc8461.html

- **RFC 8461 § 2.** However, MTA-STS is designed not to interfere with DANE deployments when the two overlap; in particular, senders who implement MTA-STS validation MUST NOT allow MTA-STS Policy validation to override a failing DANE validation.
- **RFC 8461 § 3.1.** The TXT record MUST begin with the sts-version field; the order of other fields is not significant.
- **RFC 8461 § 3.1.** If the number of resulting records is not one, or if the resulting record is syntactically invalid, senders MUST assume the recipient domain does not have an available MTA-STS Policy and skip the remaining steps of policy discovery.
- **RFC 8461 § 3.1.** The "_mta-sts" record MAY return a CNAME that points (directly or via other CNAMEs) to a TXT record, in which case senders MUST follow the CNAME pointers.
- **RFC 8461 § 3.2.** If a policy specifies more than one MX, each MX MUST have its own "mx:" key, and each MX key/value pair MUST be on its own line in the policy file.
- **RFC 8461 § 3.2.** In the case of Internationalized Domain Names [RFC5891], the "mx" value MUST specify the Punycode-encoded A-label [RFC3492] to match against, and not the Unicode-encoded U-label.
- **RFC 8461 § 3.2.** Parsers MUST accept TXT records and policy files that are syntactically valid (i.e., valid key/value pairs separated by semicolons for TXT records), possibly containing additional key/value pairs not specified in this document, in which case unknown fields SHALL be ignored.
- **RFC 8461 § 3.3.** HTTP 3xx redirects MUST NOT be followed, and HTTP caching (as specified in [RFC7234]) MUST NOT be used.
- **RFC 8461 § 3.3.** If a valid TXT record is found but no policy can be fetched via HTTPS (for any reason), and there is no valid (non-expired) previously cached policy, senders MUST continue with delivery as though the domain has not implemented MTA-STS.
- **RFC 8461 § 3.3.** Conversely, if no "live" policy can be discovered via DNS or fetched via HTTPS, but a valid (non-expired) policy exists in the sender's cache, the sender MUST apply that cached policy.
- **RFC 8461 § 3.3.** Finally, to mitigate the risk of persistent interference with policy refresh, as discussed in-depth in Section 10, MTAs SHOULD proactively refresh cached policies before they expire; a suggested refresh frequency is once per day.
- **RFC 8461 § 3.4.** When sending mail to a mailbox at a subdomain, compliant senders MUST NOT attempt to fetch a policy from the parent zone.
- **RFC 8461 § 4.2.** The certificate MUST have a subject alternative name (SAN) [RFC5280] with a DNS-ID [RFC6125] matching the hostname, per the rules given in [RFC6125].
- **RFC 8461 § 5.1.** A message delivery attempt MUST NOT be permanently failed until the sender has first checked for the presence of a new policy (as indicated by the "id" field in the "_mta-sts" TXT record).
- **RFC 8461 § 7.1.** When connecting to an SMTP server, the SNI extension MUST contain the MX hostname.
- **RFC 8461 § 7.2.** MTAs supporting MTA-STS MUST have support for TLS 1.2 [RFC5246] or TLS 1.3 [RFC8446] or higher.
- **RFC 8461 § 8.1.** Recipients SHOULD also update the HTTPS policy body before updating the TXT record; this ordering avoids the risk that senders, seeing a new TXT record, mistakenly cache the old policy from HTTPS.

## RFC 8460 SMTP TLS Reporting

Source: https://www.rfc-editor.org/rfc/rfc8460.html

- **RFC 8460 § 3.** Reports sent via SMTP MUST contain a valid DomainKeys Identified Mail (DKIM) [RFC6376] signature by the reporting domain.
- **RFC 8460 § 3.** Reports lacking such a signature MUST be ignored by the recipient.
- **RFC 8460 § 3.** DKIM signatures MUST NOT use the "l=" attribute to limit the body length used in the signature.
- **RFC 8460 § 3.** If the number of resulting records is not one, senders MUST assume the recipient domain does not implement TLSRPT.
- **RFC 8460 § 4.** Because of this, even in the case where only a single policy was applied, the "policies" field of the report body MUST be an array and not a singular value.
- **RFC 8460 § 5.3.1.** Note that, when sending failure reports via SMTP, Sending MTAs MUST NOT honor MTA-STS or DANE TLSA failures.
- **RFC 8460 § 5.5.** In the event of a delivery failure, regardless of the delivery method, a sender SHOULD attempt redelivery for up to 24 hours after the initial attempt.
