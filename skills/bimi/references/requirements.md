# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published text, quoted as written (only line breaks and hyphenation from PDF layout were joined). Apply the ones that match the role. Each is labelled with the nearest section, clause or article in the published document.

## BIMI draft-14

Source: https://www.ietf.org/archive/id/draft-brand-indicators-for-message-identification-14.txt

- **§ 1.** To participate in BIMI, Domain Owners MUST have a strong [DMARC] policy (quarantine or reject) on both the Organizational Domain, and the RFC5322.From Domain of the message.
- **§ 1.** Quarantine policies MUST NOT have a pct less than pct=100.
- **§ 4.3.** Mail receivers MUST NOT attempt to fix syntactical or capitalization errors.
- **§ 4.3.** Only tags defined in this document or in later extensions, and thus added to the registry, are to be processed; unknown tags MUST be ignored.
- **§ 4.3.** It MUST have the value of "BIMI1" for implementations compliant with this version of BIMI.
- **§ 4.3.** The value of this tag MUST match precisely; if it does not match or it is absent, the entire retrieved record MUST be ignored.
- **§ 4.3.** If present, this tag MUST have an empty value or its value MUST be a single URI.
- **§ 4.3.** The URI, if present, MUST contain a fully qualified domain name (FQDN) and MUST specify HTTPS as the URI scheme ("https").
- **§ 4.3.2.** If an l= tag URI ends with any other image format suffix, or if the document retrievable from the location(s) in the l= tag are of any other format, the evaluation of the record MUST be treated as a permanent error.
- **§ 4.5.** If the lps= tag is present then a supporting MBP MUST perform the following actions.
- **§ 5.3.** The contents of this tag MUST match the SVG Indicator content retrieved from the URI specified in the BIMI-Location header.
- **§ 5.5.** The BIMI-Location, BIMI-Indicator, and BIMI-Logo-Preference headers MUST NOT be DKIM signed.
- **§ 5.6.** When a site is BIMI-aware, the receiving MTA MUST remove the MTA-produced headers (BIMI-Location, BIMI-Indicator, BIMI-Logo-Preference) when those headers originate from outside the current site.
- **§ 6.4.** The BIMI-Location header MUST NOT be set by email senders, and Protocol Clients MUST ignore it.
- **§ 7.1.** Before applying BIMI processing for a message, a receiver MUST verify that the message passed the following BIMI authentication requirements:
- **§ 7.1.** If more than 1 RFC5322.From header is present in the message, or any RFC5322.From header contains more than 1 email address then BIMI processing MUST NOT be performed for this message.
- **§ 7.1.** If the DMARC [RFC7489] result for the Author Domain is not 'pass', and the message could not be authenticated by any additional authentication method, then BIMI processing MUST NOT be performed for this message.
- **§ 7.1.** If the DMARC [RFC7489] policy for the Author Domain or Author Organizational Domain is p=none then BIMI processing MUST NOT be performed for this message.
- **§ 7.1.** If the DMARC [RFC7489] record for the Author Domain or Author Organizational Domain includes a subdomain policy, and that subdomain policy is sp=none then BIMI processing MUST NOT be performed for this message.
- **§ 7.1.** If the DMARC [RFC7489] policy for the Author Domain or Author Organizational Domain is p=quarantine, and the DMARC [RFC7489] record defines a percentage tag, then that tag MUST be pct=100, otherwise BIMI processing MUST NOT be performed for this message.
- **§ 7.2.** Assertion Record Discovery MUST NOT be attempted if the message authentication fails per Receiver policy.
- **§ 7.2.** Clients MUST query the DNS for a BIMI TXT record at the DNS domain constructed by concatenating the selector, the string '_bimi', and the Author Domain.
- **§ 7.7.** If the Authority Evidence presented in the BIMI Assertion Record was checked and found to be valid then this MUST be set to pass.
- **§ 7.7.** If this entry is added then the MTA MUST also add the BIMI-Indicator header.
- **§ 7.8.** Regardless of success of the BIMI lookup, if a BIMI-Location, BIMI-Indicator, or BIMI-Logo-Preference header is already present in a message it MUST be either removed or renamed.
- **§ 7.9.** This header MUST NOT be added if Discovery or Validation steps failed.
- **§ 7.9.** If both a= and l= tags are included then the MTA MUST perform checks to ensure that the SVG Indicator referenced by the bimi-location is identical to the SVG Indicator extracted from the BIMI Evidence Document.
- **§ 7.10.** If the Indicator was compressed with gzip when retrieved then the data MUST be uncompressed before being base64 encoded.
- **§ 7.10.** The MTA MUST fold the header to be within the line length limits of SMTP [RFC5321].
