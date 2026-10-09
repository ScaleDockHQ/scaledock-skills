# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published RFC text, quoted as written (only line breaks and page breaks from the plain-text layout were joined). Apply the ones that match the role. Each is labelled with the RFC and section it comes from. RFC 3986 states its requirements with lowercase "must" and "should" and does not cite BCP 14, so its rules are quoted with the lowercase wording as published.

## RFC 3986 Uniform Resource Identifier (URI): Generic Syntax

Source: https://www.rfc-editor.org/rfc/rfc3986.html

- **RFC 3986 § 2.2.** If data for a URI component would conflict with a reserved character's purpose as a delimiter, then the conflicting data must be percent-encoded before the URI is formed.
- **RFC 3986 § 2.4.** Because the percent ("%") character serves as the indicator for percent-encoded octets, it must be percent-encoded as "%25" for that octet to be used as data within a URI.
- **RFC 3986 § 2.4.** Implementations must not percent-encode or decode the same string more than once, as decoding an already decoded string might lead to misinterpreting a percent data octet as the beginning of a percent-encoding, or vice versa in the case of percent-encoding an already percent-encoded string.
- **RFC 3986 § 3.** When authority is present, the path must either be empty or begin with a slash ("/") character.
- **RFC 3986 § 3.1.** An implementation should accept uppercase letters as equivalent to lowercase in scheme names (e.g., allow "HTTP" as well as "http") for the sake of robustness but should only produce lowercase scheme names for consistency.
- **RFC 3986 § 3.2.1.** Applications should not render as clear text any data after the first colon (":") character found within a userinfo subcomponent unless the data after the colon is the empty string (indicating no password).
- **RFC 3986 § 3.2.2.** URI producing applications must not use percent-encoding in host unless it is used to represent a UTF-8 character sequence.
- **RFC 3986 § 3.2.2.** When a non-ASCII registered name represents an internationalized domain name intended for resolution via the DNS, the name must be transformed to the IDNA encoding [RFC3490] prior to name lookup.
- **RFC 3986 § 5.1.** A base URI must be established by the parser prior to parsing URI references that might be relative.
- **RFC 3986 § 5.1.** If the base URI is obtained from a URI reference, then that reference must be converted to absolute form and stripped of any fragment component prior to its use as a base URI.
- **RFC 3986 § 6.1.** In testing for equivalence, applications should not directly compare relative references; the references should be converted to their respective target URIs before comparison.
- **RFC 3986 § 6.2.2.1.** When a URI uses components of the generic syntax, the component syntax equivalence rules always apply; namely, that the scheme and host are case-insensitive and therefore should be normalized to lowercase.
- **RFC 3986 § 6.2.2.3.** URI normalizers should remove dot-segments by applying the remove_dot_segments algorithm to the path, as described in Section 5.2.4.

## RFC 3987 Internationalized Resource Identifiers (IRIs)

Source: https://www.rfc-editor.org/rfc/rfc3987.html

- **RFC 3987 § 3.2.** Conversions from URIs to IRIs MUST NOT use any character encoding other than UTF-8 in steps 3 and 4, even if it might be possible to guess from the context that another character encoding than UTF-8 was used in the URI.
- **RFC 3987 § 4.1.** IRIs MUST NOT contain bidirectional formatting characters (LRM, RLM, LRE, RLE, LRO, RLO, and PDF).
- **RFC 3987 § 5.1.** Applications using IRIs as identity tokens with no relationship to a protocol MUST use the Simple String Comparison (see section 5.3.1).
- **RFC 3987 § 5.3.2.2.** Equivalence of IRIs MUST rely on the assumption that IRIs are appropriately pre-character-normalized rather than apply character normalization when comparing two IRIs.
- **RFC 3987 § 6.2.** Intermediate software interfaces between IRI-capable components and URI-only components MUST map the IRIs per section 3.1, when transferring from IRI-capable to URI-only components.

## RFC 8141 Uniform Resource Names (URNs)

Source: https://www.rfc-editor.org/rfc/rfc8141.html

- **RFC 8141 § 2.2.** In particular, with regard to characters outside the ASCII range, URNs that appear in protocols or that are passed between systems MUST use only Unicode characters encoded in UTF-8 and further encoded as required by RFC 3986.
- **RFC 8141 § 2.3.2.** Namespace-specific and more generic resolution systems MUST NOT require that q-component information be passed to them for processing.
- **RFC 8141 § 3.1.** If an r-component, q-component, or f-component (or any combination thereof) is included in a URN, it MUST be ignored for purposes of determining URN-equivalence.

## RFC 6570 URI Template

Source: https://www.rfc-editor.org/rfc/rfc6570.html

- **RFC 6570 § 1.6.** Likewise, when non-ASCII data that represents readable strings is pct-encoded for use in a URI reference, a template processor MUST first encode the string as UTF-8 [RFC3629] and then pct-encode any octets that are not allowed in a URI reference.
- **RFC 6570 § 3.** Each variable's value MUST be formed prior to template expansion.
- **RFC 6570 § 3.2.1.** If a variable appears more than once in an expression or within multiple expressions of a URI Template, the value of that variable MUST remain static throughout the expansion process (i.e., the variable must have the same value for the purpose of calculating each expansion).
