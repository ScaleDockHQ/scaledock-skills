# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## RFC 8617 The Authenticated Received Chain (ARC) Protocol

Source: https://www.rfc-editor.org/rfc/rfc8617.html

- **document.** The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **document.** The formal ABNF for the AAR header field is: arc-info = instance [CFWS] ";" authres-payload arc-authres-header = "ARC-Authentication-Results:" [CFWS] arc-info Because there is only one AAR allowed per ARC Set, the AAR MUST contain the combined authres-payload with all of the authentication results from within the participating ADMD, regardless of how many Authentication-Results header fields are…
- **document.** As required for undefined tags (in [ RFC6376 ]), if seen, a version tag MUST be ignored; and o the "i" (Agent or User Identifier (AUID)) tag is not imported from DKIM; instead, this tag is replaced by the instance tag as defined in Section 4.2.1 .
- **document.** AMS header fields SHOULD be attached so that any modifications made by the ADMD are included in the signature of the AMS header field.
- **document.** o Authentication-Results header fields MUST NOT be included in AMS signatures as they are likely to be deleted by downstream ADMDs (per [RFC8601], Section 5 ).
- **document.** o ARC-related header fields (ARC-Authentication-Results, ARC- Message-Signature, and ARC-Seal) MUST NOT be included in the list of header fields covered by the signature of the AMS header field.
- **document.** To preserve the ability to verify the integrity of a message, the signature of the AMS header field SHOULD include any DKIM-Signature header fields already present in the message.
- **document.** Note especially that the DKIM "h" tag is NOT allowed and, if found, MUST result in a cv status of "fail" (for more information, see Section 5.1.1 ); and o an additional tag, "cv" ("seal-cv-tag" in the ARC-Seal ABNF definition), is used to communicate the Chain Validation Status to subsequent ADMDs.
