# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published RFC text, quoted as written (only line breaks and page breaks from the plain-text layout were joined). Apply the ones that match the role. Each is labelled with the RFC and section it comes from.

## RFC 4226 HOTP: An HMAC-Based One-Time Password Algorithm

Source: https://www.rfc-editor.org/rfc/rfc4226.html

- **RFC 4226 § 4.** R6 - The algorithm MUST use a strong shared secret. The length of the shared secret MUST be at least 128 bits. This document RECOMMENDs a shared secret length of 160 bits.
- **RFC 4226 § 5.1.** This counter MUST be synchronized between the HOTP generator (client) and the HOTP validator (server).
- **RFC 4226 § 5.3.** Implementations MUST extract a 6-digit code at a minimum and possibly 7 and 8-digit code.
- **RFC 4226 § 5.3.** Depending on security requirements, Digit = 7 or more SHOULD be considered in order to extract a longer HOTP value.
- **RFC 4226 § 7.1.** This implies that a throttling/lockout scheme is RECOMMENDED on the validation server side.
- **RFC 4226 § 7.2.** If and when the maximum number of authorized attempts is reached, the server SHOULD lock out the account and initiate a procedure to inform the user.
- **RFC 4226 § 7.3.** We RECOMMEND setting a throttling parameter T, which defines the maximum number of possible attempts for One-Time Password validation.
- **RFC 4226 § 7.3.** The delay or lockout schemes MUST be across login sessions to prevent attacks based on multiple parallel guessing techniques.
- **RFC 4226 § 7.4.** We RECOMMEND setting a look-ahead parameter s on the server, which defines the size of the look-ahead window.
- **RFC 4226 § 7.5.** The data store holding the shared secrets MUST be in a secure area, to avoid as much as possible direct attack on the validation system and secrets database.

## RFC 6238 TOTP: Time-Based One-Time Password Algorithm

Source: https://www.rfc-editor.org/rfc/rfc6238.html

- **RFC 6238 § 3.** The prover (e.g., token, soft token) and verifier (authentication or validation server) MUST know or be able to derive the current Unix time (i.e., the number of seconds elapsed since midnight UTC of January 1, 1970) for OTP generation.
- **RFC 6238 § 3.** The algorithm MUST use HOTP [RFC4226] as a key building block.
- **RFC 6238 § 3.** The prover and verifier MUST use the same time-step value X.
- **RFC 6238 § 3.** There MUST be a unique secret (key) for each prover.
- **RFC 6238 § 4.2.** The implementation of this algorithm MUST support a time value T larger than a 32-bit integer when it is beyond the year 2038.
- **RFC 6238 § 5.1.** As indicated in the algorithm requirement section, keys SHOULD be chosen at random or using a cryptographically strong pseudorandom generator properly seeded with a random value.
- **RFC 6238 § 5.1.** Keys SHOULD be of the length of the HMAC output to facilitate interoperability.
- **RFC 6238 § 5.1.** The key store MUST be in a secure area, to avoid, as much as possible, direct attack on the validation system and secrets database.
- **RFC 6238 § 5.2.** We RECOMMEND that at most one time step is allowed as the network delay.
- **RFC 6238 § 5.2.** We RECOMMEND a default time-step size of 30 seconds.
- **RFC 6238 § 5.2.** The verifier MUST NOT accept the second attempt of the OTP after the successful validation has been issued for the first OTP, which ensures one-time only use of an OTP.
