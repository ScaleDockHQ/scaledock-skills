# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published text, quoted as written (only line breaks and hyphenation from PDF layout were joined). Apply the ones that match the role. Each is labelled with the nearest section, clause or article in the published document.

## XS2A API Implementation Guidelines 2.4.2

Source: https://berlin-group.org/wp-content/uploads/2026/09/11b.-Berlin-Group-openFinance-API-Framework-Core-PSD2-Compliance-V2-Suite-Compliance-Services-XS2A-API-Implementation-Guidelines-V2.4.2-20260731.pdf

- **§ 3.5.** If the PSU does not complete a required SCA within the required timeframe the payment resource's status must be set to "RJCT".
- **§ 3.7.** According to item 40 of [EBA-OP2] the payment resource shall contain the debtorAccount after the payment has been initiated successfully, even if it was not provided by the TPP within the initial call.
- **§ 3.4.3.1.** Please note that the optional batchBookingPreferred flag shall be ignored by the ASPSP if batch booking is not supported.
- **§ 4.4.1.** In case, no account is accessible, the ASPSP shall return an empty array.As this is also considered a positive response, the Response code must still be 200.
- **§ 4.4.4.** "booked" shall be supported by the ASPSP.
- **§ 3.4.1.** If not available, the TPP shall use the IP Address used by the TPP when submitting this request.

## Protocol Functions and Security Measures 2.4.1

Source: https://berlin-group.org/wp-content/uploads/2026/09/11c.-Berlin-Group-openFinance-API-Framework-Core-PSD2-Compliance-V2-Suite-Protocol-Functions-and-Security-Measures-V2.4.1-20260731.pdf

- **§ 3.4.** The addressed transaction resource must exist already and must be accessible by the requesting API Client via the API.
- **§ 3.4.** Any immutable fields of the resource must be provided in the request, carrying the same value as in the original resource, else this request will be rejected.
- **§ 3.11.1.** Each changed version must obtain its own specific ETag.
- **§ 5.2.** The ASPSP shall use the same certificate for his authentication as TLS-client as he will use for his authentication as TLS-server as described in section 5.1.
- **§ 6.2.2.1.** When an API Client includes a signature according to this signature profile, it must also include a "Digest" header as defined in [RFC3230].
- **§ 6.2.2.1.** If the message does not contain a body, the "Digest" header must contain the hash of an empty byte list.
- **§ 6.2.2.2.** The first certificate must contain the public key used to sign this JWS.
- **§ 7.1.4.** The recipient MUST validate the certificate chain according to RFC 5280 and consider the certificate or certificate chain to be invalid if any validation failure occurs.
- **§ 7.2.1.** For the current version of this specification the CEK shall be a 256-bit AES key.
- **§ 9.4.** For this reason, the same Client-Redirect-URI as used when creating the related resource shall be provided by the TPP.
- **§ 9.4.** This applies also to multilevel SCA, where the Client-Redirect-URI for all authorisation processes for one transaction shall be equal.
- **§ 9.8.2.2.** As a consequence of this requirement, it follows that ASPSPs shall not include a query parameter named "state" in their "scaRedirect" links.
- **§ 9.8.3.** The TPP must check whether the state parameter is linked to the current session as described in Section 9.8.2.
- **§ 9.8.3.** If the check fails, the transaction must be stopped by the TPP and the above defined request messages shall not be used.
- **§ 11.2.** The body shall contain at least one entry.
