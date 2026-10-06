# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## UTS #46

Source: https://www.unicode.org/reports/tr46/

One of the great strengths of domain names is universality. The URL https://Apple.com goes to Apple's

- **Unicode IDNA Compatibility Processing.** Nontransitional Processing, which is fully compatible with IDNA2008, should be used in all cases.
- **Unicode IDNA Compatibility Processing.** These tactics can be described as follows: Bundling : If two or more labels are different, but confusable, and more than one is registered, the registrant for each must be the same.
- **Unicode IDNA Compatibility Processing.** However, such unprocessed labels must be handled carefully: Storing the unprocessed label as the sequence of characters that the registrant really wanted to apply for.
- **Unicode IDNA Compatibility Processing.** 4.1 Validity Criteria Each of the following criteria must be satisfied for a non-empty label: The label must be in Unicode Normalization Form NFC.
- **Unicode IDNA Compatibility Processing.** If CheckHyphens , the label must not contain a U+002D HYPHEN-MINUS character in both the third and fourth positions.
- **Unicode IDNA Compatibility Processing.** If CheckHyphens , the label must neither begin nor end with a U+002D HYPHEN-MINUS character.
- **Unicode IDNA Compatibility Processing.** If not CheckHyphens , the label must not begin with “xn--”.
- **Unicode IDNA Compatibility Processing.** The label must not begin with a combining mark, that is: General_Category=Mark.

## RFC 5890 IDNA

Source: https://www.rfc-editor.org/rfc/rfc5890.html

- **document.** Normative Language The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in RFC 2119 [ RFC2119 ].
- **document.** To allow for future use of mechanisms similar to IDNA, those labels MUST NOT be processed as Klensin Standards Track [Page 8] RFC 5890 IDNA Definitions August 2010 ordinary LDH labels by IDNA-conforming programs and SHOULD NOT be mixed with IDNA labels in the same zone.
- **document.** These strings MUST contain only characters specified elsewhere in this document series, and only in the contexts indicated as appropriate.
- **document.** Code Components extracted from this document must include Simplified BSD License text as described in Section 4.e of the Trust Legal Provisions and are provided without warranty as described in the Simplified BSD License.
- **document.** While they may reiterate fundamental DNS rules and requirements for the convenience of the reader, they make no attempt to be comprehensive about DNS principles and should not be considered as a substitute for a thorough understanding of the DNS protocols and specifications.
- **document.** Like all DNS labels, its total length must not exceed 63 octets.
- **document.** Because LDH labels (and, indeed, any DNS label) must not be more than 63 octets in length, the portion of an XN-label derived from the Punycode algorithm is limited to no more than 59 ASCII characters.
- **document.** Therefore, since a valid A-label is the result of Punycode encoding of a U-label, A-labels should be produced only in lowercase, despite matching other (mixed-case or uppercase) potential labels in the DNS.

## RFC 5891 IDNA protocol

Source: https://www.rfc-editor.org/rfc/rfc5891.html

- **document.** The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in BCP 14 , RFC 2119 [ RFC2119 ].
- **document.** Whenever a domain name is put into a domain name slot that is not IDNA-aware (see Section 2.3.2.6 of the Definitions document [ RFC5890 ]), it MUST contain only ASCII characters (i.e., its labels must be either A-labels or NR-LDH labels), unless the DNS application is not subject to historical recommendations for "hostname"-style names (see RFC 1034 [ RFC1034 ] and Section 3.2.1 ).
- **document.** Labels MUST be compared using equivalent forms: either both A-label forms or both U-label forms.
- **document.** A pair of A-labels MUST be compared as case-insensitive ASCII (as with all comparisons of ASCII DNS labels).
- **document.** U-labels MUST be compared as-is, without case folding or other intermediate steps.
- **document.** In many cases, not limited to comparison, validation may be important for other reasons and SHOULD be performed.
- **document.** Labels being registered MUST conform to the requirements of Section 4 .
- **document.** Labels being looked up and the lookup process MUST conform to the requirements of Section 5 .
