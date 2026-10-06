# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## RFC 4226 HOTP: An HMAC-Based One-Time Password Algorithm

Source: https://www.rfc-editor.org/rfc/rfc4226.html

- **document.** Requirements Terminology The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [ RFC2119 ].
- **document.** R1 - The algorithm MUST be sequence- or counter-based: one of the goals is to have the HOTP algorithm embedded in high-volume devices
- **document.** R2 - The algorithm SHOULD be economical to implement in hardware by minimizing requirements on battery, number of buttons, computational horsepower, and size of LCD display.
- **document.** R3 - The algorithm MUST work with tokens that do not support any numeric input, but MAY also be used with more sophisticated devices such as secure PIN-pads.
- **document.** R4 - The value displayed on the token MUST be easily read and entered by the user: This requires the HOTP value to be of reasonable length.
- **document.** R5 - There MUST be user-friendly mechanisms available to resynchronize the counter.
- **document.** Section 7.4 and Appendix E.4 details the resynchronization mechanism proposed in this document R6 - The algorithm MUST use a strong shared secret.
- **document.** The length of the shared secret MUST be at least 128 bits.

## RFC 6238 TOTP: Time-Based One-Time Password Algorithm

Source: https://www.rfc-editor.org/rfc/rfc6238.html

- **document.** Notation and Terminology The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [ RFC2119 ].
- **document.** R1: The prover (e.g., token, soft token) and verifier (authentication or validation server) MUST know or be able to derive the current Unix time (i.e., the number of seconds elapsed since midnight UTC of January 1, 1970) for OTP generation.
- **document.** R2: The prover and verifier MUST either share the same secret or the knowledge of a secret transformation to generate a shared secret.
- **document.** R3: The algorithm MUST use HOTP [ RFC4226 ] as a key building block.
- **document.** Informational [Page 3] RFC 6238 HOTPTimeBased May 2011 R4: The prover and verifier MUST use the same time-step value X.
- **document.** R5: There MUST be a unique secret (key) for each prover.
- **document.** R6: The keys SHOULD be randomly generated or derived using key derivation algorithms.
- **document.** R7: The keys MAY be stored in a tamper-resistant device and SHOULD be protected against unauthorized access and usage.
