# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## RFC 5280 Internet X.509 Public Key Infrastructure Certificate and Certificate Revocation List (CRL) Profile

Source: https://www.rfc-editor.org/rfc/rfc5280.html

- **document.** Implementations are REQUIRED to derive the same results but are not required to use the specified procedures.
- **document.** However, conforming implementations that use the algorithms identified in [ RFC3279 ], [ RFC4055 ], and [ RFC4491 ] MUST identify and encode the public key materials and digital signatures as described in those specifications.
- **document.** The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [ RFC2119 ].
- **document.** An entry MUST NOT be removed from the CRL until it appears on one regularly scheduled CRL issued beyond the revoked certificate's validity period.
- **document.** Standards Track [Page 16] RFC 5280 PKIX Certificate and CRL Profile May 2008 subjectUniqueID [2] IMPLICIT UniqueIdentifier OPTIONAL, -- If present, version MUST be v2 or v3 extensions [3] EXPLICIT Extensions OPTIONAL -- If present, version MUST be v3 } Version ::= INTEGER { v1(0), v2(1), v3(2) } CertificateSerialNumber ::= INTEGER Validity ::= SEQUENCE { notBefore Time, notAfter Time } Time ::=…
- **document.** This field MUST contain the same algorithm identifier as the signature field in the sequence tbsCertificate ( Section 4.1.2.3 ).
- **document.** When extensions are used, as expected in this profile, version MUST be 3 (value is 2).
- **document.** If no extensions are present, but a UniqueIdentifier is present, the version SHOULD be 2 (value is 1); however, the version MAY be 3.

## RFC 6960 X.509 Internet Public Key Infrastructure Online Certificate Status Protocol - OCSP

Source: https://www.rfc-editor.org/rfc/rfc6960.html

- **document.** Requirements Language The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in RFC 2119 [ RFC2119 ].
- **document.** There is one basic type of OCSP response that MUST be supported by all OCSP servers and clients.
- **document.** All definitive response messages SHALL be digitally signed.
- **document.** The key used to sign the response MUST belong to one of the following: - the CA who issued the certificate in question - a Trusted Responder whose public key is trusted by the requestor - a CA Designated Responder (Authorized Responder, defined in Section 4.2.2.2 ) who holds a specially marked certificate issued directly by the CA, indicating that the responder may issue OCSP responses for that…
- **document.** When a responder sends a "revoked" response to a status request for a non-issued certificate, the responder MUST include the extended revoked definition response extension ( Section 4.4.8 ) in the response, indicating that the OCSP responder supports the extended definition of the "revoked" state to also cover non-issued certificates.
- **document.** In addition, the SingleResponse related to this non-issued certificate: - MUST specify the revocation reason certificateHold (6), - MUST specify the revocationTime January 1, 1970, and - MUST NOT include a CRL references extension ( Section 4.4.2 ) or any CRL entry extensions ( Section 4.4.5 ).
- **document.** The time at which the status was known to be correct SHALL be reflected in the thisUpdate field of the response.
- **document.** This certificate MUST be issued directly to the responder by the cognizant CA.

## RFC 9162 Certificate Transparency Version 2.0

Source: https://www.rfc-editor.org/rfc/rfc9162.html

This document describes version 2.0 of the Certificate Transparency (CT) protocol for publicly logging the existence of Transport Layer Security (TLS) server certificates as they are issued or observed, in a manner that allows anyone to audit certification authority (CA) activity and notice the issuance of suspect certificates as well as to audit the certificate logs themselves. The intent is that eventually clients would refuse to honor certificates that do not appear in a log, effectively forcing CAs to add all issued certificates to the logs. ¶ This document obsoletes RFC 6962. It also specifies a new TLS extension that is used to send various CT log artifacts. ¶ Logs are network services

- **abstract.** This document describes version 2.0 of the Certificate Transparency (CT) protocol for publicly logging the existence of Transport Layer Security (TLS) server certificates as they are issued or observed, in a manner that allows anyone to audit certification authority (CA) activity and notice the issuance of suspect certificates as well as to audit the certificate logs themselves. The intent is that eventually clients would refuse to honor certificates that do not appear in a log, effectively forcing CAs to add all issued certificates to the logs. ¶ This document obsoletes RFC 6962. It also specifies a new TLS extension that is used to send various CT log artifacts. ¶ Logs are network services

## RFC 6962 Certificate Transparency

Source: https://www.rfc-editor.org/rfc/rfc6962.html

- **document.** Requirements Language The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in RFC 2119 [ RFC2119 ].
- **document.** A log MUST use either elliptic curve signatures using the NIST P-256 curve (Section D.1.2.3 of the Digital Signature Standard [ DSS ]) or RSA signatures (RSASSA-PKCS1- V1_5 with SHA-256, Section 8.2 of [RFC3447] ) using a key of at least 2048 bits.
- **document.** When a valid certificate is submitted to a log, the log MUST immediately return a Signed Certificate Timestamp (SCT).
- **document.** TLS servers MUST present an SCT from one or more logs to the TLS client together with the certificate.
- **document.** TLS clients MUST reject certificates that do not have a valid SCT for the end-entity certificate.
- **document.** The log MUST incorporate a certificate in its Merkle Tree within the Maximum Merge Delay period after the issuance of the SCT.
- **document.** Log operators MUST NOT impose any conditions on retrieving or sharing data from the log.
- **document.** In order to enable attribution of each logged certificate to its issuer, the log SHALL publish a list of acceptable root certificates (this list might usefully be the union of root certificates trusted by major browser vendors).
