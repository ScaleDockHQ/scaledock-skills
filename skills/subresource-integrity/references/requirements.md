# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Subresource Integrity Level 1

Source: https://www.w3.org/TR/SRI/

This specification defines a mechanism by which user agents may verify that a fetched resource has been delivered without unexpected manipulation.

- **3.1. Integrity metadata.** This metadata consists of the following pieces of information: cryptographic hash function ("alg") digest ("val") options ("opt") The hash function and digest MUST be provided in order to validate a response’s integrity.
- **3.1. Integrity metadata.** This metadata MUST be encoded in the same format as the hash-source (without the single quotes) in section 4.2 of the Content Security Policy Level 2 specification .
- **3.2. Cryptographic hash functions.** Conformant user agents MUST support the SHA-256 , SHA-384 , and SHA-512 cryptographic hash functions for use as part of a request’s integrity metadata and MAY support additional hash functions defined in future iterations of this document.
- **3.2.1. Agility.** When a hash function is determined to be insecure, user agents SHOULD deprecate and eventually remove support for integrity validation using the insecure hash function.
- **3.5. The integrity attribute.** The value of the attribute MUST be either the empty string, or at least one valid metadata as described by the following ABNF grammar: integrity-metadata = * WSP hash-with-options _(1_ WSP hash-with-options ) * WSP / * WSP hash-with-options = hash-expression *("?" option-expression ) option-expression = * VCHAR hash-expression = hash-algorithm "-" base64-value option-expression s are associated…
- **3.5. The integrity attribute.** In order for user agents to remain fully forwards compatible with future options, the user agent MUST ignore all unrecognized option-expression s.
- **3.6. The integrity link processing option.** Integrity metadata can also be specified for `link` HTTP response headers as an integrity link parameter which MUST be specified using the same integrity-metadata grammar that applies to integrity attributes on elements.
- **4. Proxies.** Optimizing proxies and other intermediate servers which modify the responses MUST ensure that the digest associated with those responses stays in sync with the new content.

## Subresource Integrity Level 2

Source: https://www.w3.org/TR/sri-2/

This specification defines a mechanism by which user agents may verify that a fetched resource has been delivered without unexpected manipulation.

- **3.1. Integrity metadata.** This metadata consists of the following pieces of information: cryptographic hash function ("alg") digest ("val") options ("opt") The hash function and digest MUST be provided in order to validate a response’s integrity.
- **3.1. Integrity metadata.** This metadata MUST be encoded in the same format as the hash-source (without the single quotes) in section 4.2 of the Content Security Policy Level 2 specification .
- **3.2. Cryptographic hash functions.** Conformant user agents MUST support the SHA-256 , SHA-384 , and SHA-512 cryptographic hash functions for use as part of a request’s integrity metadata and MAY support additional hash functions defined in future iterations of this document.
- **3.2.1. Agility.** When a hash function is determined to be insecure, user agents SHOULD deprecate and eventually remove support for integrity validation using the insecure hash function.
- **3.5. The integrity attribute.** The value of the attribute MUST be either the empty string, or at least one valid metadata as described by the following ABNF grammar: integrity-metadata = * WSP hash-with-options _(1_ WSP hash-with-options ) * WSP / * WSP hash-with-options = hash-expression *("?" option-expression ) option-expression = * VCHAR hash-expression = hash-algorithm "-" base64-value option-expression s are associated…
- **3.5. The integrity attribute.** In order for user agents to remain fully forwards compatible with future options, the user agent MUST ignore all unrecognized option-expression s.
- **3.6. The integrity link processing option.** Integrity metadata can also be specified for `link` HTTP response headers as an integrity link parameter which MUST be specified using the same integrity-metadata grammar that applies to integrity attributes on elements.
- **4. Proxies.** Optimizing proxies and other intermediate servers which modify the responses MUST ensure that the digest associated with those responses stays in sync with the new content.
