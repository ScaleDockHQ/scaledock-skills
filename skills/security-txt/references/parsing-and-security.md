# Parsing and security considerations

Section numbers refer to RFC 9116 unless another document is named.

## Grammar (§ 4)

The file MUST follow the § 4 ABNF, which uses the RFC 5234 core rules and RFC 7405 case-sensitive strings. The parts a parser needs:

```abnf
body             =  signed / unsigned

unsigned       =  *line (contact-field eol) ; one or more required
                  *line (expires-field eol) ; exactly one required
                  *line [lang-field eol] *line ; exactly one optional
                  ; order of fields within the file is not important
                  ; except that if contact-field appears more
                  ; than once, the order of those indicates
                  ; priority (see Section 2.5.3)

line             =  [ (field / comment) ] eol
eol              =  *WSP [CR] LF
fs               =  ":"
comment          =  "#" *(WSP / VCHAR / %x80-FFFFF)

contact-field    =  "Contact" fs SP uri
expires-field    =  "Expires" fs SP date-time
lang-field       =  "Preferred-Languages" fs SP lang-values
ack-field        =  "Acknowledgments" fs SP uri
can-field        =  "Canonical" fs SP uri
encryption-field =  "Encryption" fs SP uri
hiring-field     =  "Hiring" fs SP uri
policy-field     =  "Policy" fs SP uri
ext-field        =  field-name fs SP unstructured

lang-values      =  lang-tag *(*WSP "," *WSP lang-tag)
date-time        =  < imported from Section 5.6 of [RFC3339] >
uri              =  < URI as per Section 3 of [RFC3986] >
```

The comment on `unsigned` is shown with erratum 6946 applied (§ 2.5.3, not "Section 3.5.3"). The `signed` production wraps the same content in an OpenPGP cleartext signature; see [`serving-and-signing.md`](serving-and-signing.md).

## Parsing rules

- Split lines on LF, with an optional CR before it (§ 2.2, § 4 `eol`). Erratum 7743 (Reported) points out that the ABNF `CRLF` rule, used in the signature parts, conflicts with § 2.2; accept LF there too.
- A line that starts with `#` is a comment (§ 2.1). Blank lines are allowed (§ 2).
- Split a field at the first colon. The name is case-insensitive (§ 2); the grammar expects one space after the colon (§ 4 `fs SP`).
- Ignore fields you do not support (§ 2.4), and be liberal in what you accept (§ 2.4).
- Count Contact (one or more), Expires (exactly one) and Preferred-Languages (at most one) (§ 2.5.3, § 2.5.5, § 2.5.8, § 4). Treat Bug-Bounty as at most one, per the registry.
- Keep Contact values in file order; that order is the preference (§ 2.5.3).
- Expires values are RFC 3339 `date-time`; accept a lower-case `t` and `z` (RFC 3339 § 5.6).
- If the file is signed, strip the cleartext framework and undo dash-escaping (`- ` at line start) before parsing the fields (§ 4; RFC 9580 § 7.2).
- If both `/.well-known/security.txt` and `/security.txt` exist, use the `/.well-known/` one (§ 3).

## Limits (§ 5.4)

Compromised or malicious sites may serve huge or malformed files to attack parsers. Parsers should be robust, and may refuse to parse:

- files larger than 32 KB;
- fields longer than 2,048 characters;
- files with more than 1,000 lines.

The ABNF can be used to validate files. The same caution applies to resources the file references and to reports received because of it.

## Consumer checklist

For a researcher or a tool that fetches the file:

1. Fetch `https://<host>/.well-known/security.txt`; fall back to `https://<host>/security.txt` (§ 3). Validate the TLS certificate per RFC 6125, matching only DNS-ID identifiers and allowing a `*` only as the whole leftmost label; revocation may be checked with OCSP or CRLs (§ 5.7).
2. Record every redirect, for the file and for every resource it references; inspect redirects to other domains or IP addresses before using the information (§ 3, § 5.2).
3. Check the media type is `text/plain` with `charset=utf-8` (§ 3), and apply the size limits above (§ 5.4).
4. Parse against the grammar. Reject a file with no Contact, no Expires, or more than one Expires (§ 2.5.3, § 2.5.5).
5. If Expires is in the past, treat the data as stale and do not use it (§ 2.5.5, § 5.3).
6. If Canonical is present and the URI you fetched is not listed, do not trust the contents (§ 2.5.2). Do not treat the file as applying to the other listed URIs without a further trust mechanism such as the signature (§ 2.5.2).
7. If signed, verify the signature and decide whether you trust the key; check historical records of the file where available (§ 2.3, § 5.1). A suspicious or compromised file should not be used (§ 5.1).
8. Apply the file only to the host it came from, not to subdomains or parent domains (§ 3.1).
9. Pick the first Contact you can use. Encrypt email reports with the Encryption key when one is listed, unless the report goes over HTTPS (§ 2.5.3, § 5.7), and verify that key independently (§ 2.5.4).
10. Write reports in a language from Preferred-Languages, or English if it is absent (§ 2.5.8).
11. Review the whole file before sending automated reports or reports from automated scans (§ 5.8).

## Security considerations (§ 5)

The security considerations of RFC 3986 (URIs) and RFC 8615 (well-known URIs) also apply (§ 5).

### Compromised files and incident response (§ 5.1)

An attacker who compromises a website can change the file or redirect it, so reports go nowhere or to the attacker.

- Organizations should use Canonical, sign the file, and monitor the file and the resources it references for tampering.
- Researchers should validate the file, verify its signature and check available historical records first, and not use a file that looks suspicious.
- Using the file for incident response is not recommended. If it is used that way, take extreme care and verify through other means, such as out-of-band verification of the PGP signature or DNSSEC-based approaches.

### Redirects (§ 5.2)

Redirects, for the file or any resource it names, can lead to a domain or IP address an attacker controls. Record them and inspect them before using the data.

### Incorrect or stale information (§ 5.3)

Wrong or outdated contacts mean reports are lost or reach third parties, exposing the issues. Having no file may be better than a stale one. Organizations must use Expires, and keep every referenced page, mailbox, phone number and key current, accessible, under their control and secure.

### Malformed files, resources and reports (§ 5.4)

Parsers must survive huge and malformed input; see the limits above. Referenced resources and incoming reports can be hostile too.

### No implied permission for testing (§ 5.5)

Researchers should not assume that a file's presence grants, or its absence denies, permission to test the domain, IP address, products or services. Any such permission belongs in the vulnerability disclosure policy linked from Policy (§ 2.5.7) or in a new registered field (§ 2.4).

### Multi-user environments (§ 5.6)

On multi-tenant hosts a user may take over the file's location. Reserve `/security.txt` and `/.well-known/security.txt` at the root.

### Protecting data in transit (§ 5.7)

HTTPS is required for the file and for referenced web URIs. Signing adds another layer. Encryption keys protect reports in transit unless reports are submitted over HTTPS. Key validity is out of scope; researchers must find their own way to verify keys.

### Spam and spurious reports (§ 5.8)

Publishing the file makes spam and automated, unanalysed reports more likely, and an attacker can list someone else's contacts to spam them. Organizations weigh this against the benefit and the cost of handling reports. Researchers review the file before sending automated reports.

## Relationship to a vulnerability disclosure policy

RFC 9116 only describes how to find contacts and disclosure practices. It complements, and does not replace, an organization's other public disclosure resources (§ 1.1). The `Policy` field links to the vulnerability disclosure policy, which carries the scope and details of the process (§ 2.5.7, § 3.1) and any permission to test (§ 5.5). Everything else about disclosure is out of scope; the RFC refers readers to ISO/IEC 29147 and the CERT Guide to Coordinated Vulnerability Disclosure (§ 1.1).
