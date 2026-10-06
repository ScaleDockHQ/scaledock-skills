# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## RFC 8461 SMTP MTA Strict Transport Security (MTA-STS)

Source: https://www.rfc-editor.org/rfc/rfc8461.html

- **document.** Terminology The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **document.** However, MTA-STS is designed not to interfere with DANE deployments when the two overlap; in particular, senders who implement MTA-STS validation MUST NOT allow MTA-STS Policy validation to override a failing DANE validation.
- **document.** MTA-STS TXT records MUST be US-ASCII, semicolon-separated key/value pairs containing the following fields: o "v" (plaintext, required): Currently, only "STSv1" is supported.
- **document.** This string MUST uniquely identify a given instance of a policy, such that senders can determine when the policy has been updated by comparing to the "id" of a previously seen policy.
- **document.** sts-extension = sts-ext-name "=" sts-ext-value ; name=value sts-ext-name = (ALPHA / DIGIT) _31(ALPHA / DIGIT / "\_" / "-" / ".") sts-ext-value = 1_(%x21-3A / %x3C / %x3E-7E) ; chars excluding "=", ";", SP, and CTLs The TXT record MUST begin with the sts-version field; the order of other fields is not significant.
- **document.** If the number of resulting records is not one, or if the resulting record is syntactically invalid, senders MUST assume the recipient domain does not have an available MTA-STS Margolis, et al.
- **document.** (Note that the absence of a usable TXT record is not by itself sufficient to remove a sender's previously cached policy for the Policy Domain, as discussed in Section 5.1 , "Policy Application Control Flow".) If the resulting TXT record contains multiple strings, then the record MUST be treated as if those strings are concatenated without adding spaces.
- **document.** The "_mta-sts" record MAY return a CNAME that points (directly or via other CNAMEs) to a TXT record, in which case senders MUST follow the CNAME pointers.

## RFC 8460 SMTP TLS Reporting

Source: https://www.rfc-editor.org/rfc/rfc8460.html

- **document.** Terminology The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **document.** Policies consist of the following directives: o "v": This document defines version 1 of TLSRPT, for which this value MUST be equal to "TLSRPTv1".
- **document.** When sending failure reports via SMTP, Sending MTAs MUST deliver reports despite any TLS- related failures and SHOULD NOT include this SMTP session in the next report.
- **document.** Reports sent via SMTP MUST contain a valid DomainKeys Identified Mail (DKIM) [ RFC6376 ] signature by the reporting domain.
- **document.** Reports lacking such a signature MUST be ignored by the recipient.
- **document.** DKIM signatures MUST NOT use the "l=" attribute to limit the body length used in the signature.
- **document.** The DKIM TXT record SHOULD contain the appropriate service type declaration, "s=tlsrpt".
- **document.** tlsrpt-uri *(*WSP "," *WSP tlsrpt-uri) tlsrpt-uri = URI ; "URI" is imported from [ RFC3986 ]; ; commas (ASCII 0x2C), exclamation ; points (ASCII 0x21), and semicolons ; (ASCII 0x3B) MUST be encoded tlsrpt-extension = tlsrpt-ext-name "=" tlsrpt-ext-value tlsrpt-ext-name = (ALPHA / DIGIT) _31(ALPHA / DIGIT / "\_" / "-" / ".") tlsrpt-ext-value = 1_(%x21-3A / %x3C / %x3E-7E) ; chars excluding "=",…
