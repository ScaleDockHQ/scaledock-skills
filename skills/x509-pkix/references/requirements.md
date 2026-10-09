# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published RFC text, quoted as written (only line breaks and page breaks from the plain-text layout were joined). Apply the ones that match the role. Each is labelled with the RFC and section it comes from.

## RFC 5280 Internet X.509 Public Key Infrastructure Certificate and Certificate Revocation List (CRL) Profile

Source: https://www.rfc-editor.org/rfc/rfc5280.html

- **RFC 5280 § 4.1.2.1.** When extensions are used, as expected in this profile, version MUST be 3 (value is 2).
- **RFC 5280 § 4.1.2.2.** Certificate users MUST be able to handle serialNumber values up to 20 octets.
- **RFC 5280 § 4.1.2.2.** Conforming CAs MUST NOT use serialNumber values longer than 20 octets.
- **RFC 5280 § 4.1.2.5.** CAs conforming to this profile MUST always encode certificate validity dates through the year 2049 as UTCTime; certificate validity dates in 2050 or later MUST be encoded as GeneralizedTime.
- **RFC 5280 § 4.1.2.5.2.** GeneralizedTime values MUST NOT include fractional seconds.
- **RFC 5280 § 4.2.** A certificate-using system MUST reject the certificate if it encounters a critical extension it does not recognize or a critical extension that contains information that it cannot process.
- **RFC 5280 § 4.2.** A certificate MUST NOT include more than one instance of a particular extension.
- **RFC 5280 § 4.2.1.3.** If the keyCertSign bit is asserted, then the cA bit in the basic constraints extension (Section 4.2.1.9) MUST also be asserted.
- **RFC 5280 § 4.2.1.6.** If the subject field contains an empty sequence, then the issuing CA MUST include a subjectAltName extension that is marked as critical.
- **RFC 5280 § 4.2.1.6.** When the subjectAltName extension contains a domain name system label, the domain name MUST be stored in the dNSName (an IA5String).
- **RFC 5280 § 4.2.1.9.** If the basic constraints extension is not present in a version 3 certificate, or the extension is present but the cA boolean is not asserted, then the certified public key MUST NOT be used to verify certificate signatures.
- **RFC 5280 § 4.2.1.12.** If a certificate contains both a key usage extension and an extended key usage extension, then both extensions MUST be processed independently and the certificate MUST only be used for a purpose consistent with both extensions.
- **RFC 5280 § 5.2.** If a CRL contains a critical extension that the application cannot process, then the application MUST NOT use that CRL to determine the status of certificates.
- **RFC 5280 § 5.1.2.5.** Conforming CRL issuers MUST include the nextUpdate field in all CRLs.
- **RFC 5280 § 6.1.** A certificate MUST NOT appear more than once in a prospective certification path.
- **RFC 5280 § 7.2.** When comparing DNS names for equality, conforming implementations MUST perform a case-insensitive exact match on the entire DNS name.

## RFC 6960 X.509 Internet Public Key Infrastructure Online Certificate Status Protocol - OCSP

Source: https://www.rfc-editor.org/rfc/rfc6960.html

- **RFC 6960 § 2.2.** All definitive response messages SHALL be digitally signed.
- **RFC 6960 § 4.2.2.1.** Responses whose nextUpdate value is earlier than the local system time value SHOULD be considered unreliable.
- **RFC 6960 § 4.2.2.2.** Systems or applications that rely on OCSP responses MUST be capable of detecting and enforcing the use of the id-kp-OCSPSigning value as described above.
- **RFC 6960 § 4.2.2.3.** The response MUST include a SingleResponse for each certificate in the request.

## RFC 9162 Certificate Transparency Version 2.0

Source: https://www.rfc-editor.org/rfc/rfc9162.html

- **RFC 9162 § 4.1.** A log MUST NOT use the same keypair as any other log.
- **RFC 9162 § 4.2.1.** The log MUST NOT accommodate misordered CA certificates or use any other source of intermediate CA certificates to attempt certification path construction.
- **RFC 9162 § 8.1.1.** If a TLS server includes the transparency_info TLS extension when resuming a TLS session, the TLS client MUST abort the handshake.
- **RFC 9162 § 8.1.1.** CT-using TLS clients MUST implement all of the three mechanisms by which TLS servers may present SCTs (see Section 6).

## RFC 6962 Certificate Transparency

Source: https://www.rfc-editor.org/rfc/rfc6962.html

- **RFC 6962 § 5.2.** TLS clients MUST reject SCTs whose timestamp is in the future.
