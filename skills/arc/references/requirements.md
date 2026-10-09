# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published RFC text, quoted as written (only line breaks and page breaks from the plain-text layout were joined). Apply the ones that match the role. Each is labelled with the RFC and section it comes from.

## RFC 8617 The Authenticated Received Chain (ARC) Protocol

Source: https://www.rfc-editor.org/rfc/rfc8617.html

- **RFC 8617 § 4.1.1.** Because there is only one AAR allowed per ARC Set, the AAR MUST contain the combined authres-payload with all of the authentication results from within the participating ADMD, regardless of how many Authentication-Results header fields are attached to the message.
- **RFC 8617 § 4.1.2.** AMS header fields SHOULD be attached so that any modifications made by the ADMD are included in the signature of the AMS header field.
- **RFC 8617 § 4.1.2.** Authentication-Results header fields MUST NOT be included in AMS signatures as they are likely to be deleted by downstream ADMDs (per [RFC8601], Section 5).
- **RFC 8617 § 4.1.2.** ARC-related header fields (ARC-Authentication-Results, ARC-Message-Signature, and ARC-Seal) MUST NOT be included in the list of header fields covered by the signature of the AMS header field.
- **RFC 8617 § 4.1.2.** To preserve the ability to verify the integrity of a message, the signature of the AMS header field SHOULD include any DKIM-Signature header fields already present in the message.
- **RFC 8617 § 4.1.3.** Note especially that the DKIM "h" tag is NOT allowed and, if found, MUST result in a cv status of "fail" (for more information, see Section 5.1.1); and
- **RFC 8617 § 4.2.1.** Valid ARC Sets MUST have exactly one instance of each ARC header field (AAR, AMS, and AS) for a given instance value and signing algorithm.
- **RFC 8617 § 5.1.** All message modifications (including adding a DKIM-Signature header field(s)) MUST be performed before sealing.
- **RFC 8617 § 5.1.2.** In the case of a failed Authenticated Received Chain, the header fields included in the signature scope of the AS header field b= value MUST only include the ARC Set header fields created by the MTA that detected the malformed chain, as if this newest ARC Set was the only set present.
- **RFC 8617 § 5.2.** Each ARC Set MUST contain exactly one each of the three ARC header fields (AAR, AMS, and AS).
- **RFC 8617 § 5.2.** The instance values of the ARC Sets MUST form a continuous sequence from 1..N with no gaps or repetition.
- **RFC 8617 § 5.2.** The "cv" value for all ARC-Seal header fields MUST NOT be "fail".
- **RFC 8617 § 5.2.** The end result of this validation algorithm SHOULD be included within the Authentication-Results header field for the ADMD.
- **RFC 8617 § 5.2.** As with a DKIM signature ([RFC6376], Section 6.3) that fails verification, a message with an Authenticated Received Chain with a Chain Validation Status of "fail" MUST be treated the same as a message with no Authenticated Received Chain.
