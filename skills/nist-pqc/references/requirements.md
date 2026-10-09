# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published text, quoted as written (only line breaks and hyphenation from PDF layout were joined). Apply the ones that match the role. Each is labelled with the section of the standard named in the group heading, or with its SP 800-227 requirement identifier (RS for testable "shall" requirements, RM for "must" requirements).

## FIPS 203: Module-Lattice-Based Key-Encapsulation Mechanism Standard

Source: https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.203.pdf

- **§ 3.3.** The public-key encryption scheme K-PKE described in Section 5 shall not be used as a stand-alone cryptographic scheme.
- **§ 3.3.** In particular, the sampling of random values required for key generation (as specified in ML-KEM.KeyGen) and encapsulation (as specified in ML-KEM.Encaps) shall be performed by the cryptographic module.
- **§ 3.3.** If further key derivation is needed, the final symmetric keys shall be derived from this 256-bit shared secret key in an approved manner, as specified in SP 800-108 and SP 800-56C [16, 17].
- **§ 3.3.** Moreover, this RBG shall have a security strength of at least 128 bits for ML-KEM-512, at least 192 bits for ML-KEM-768, and at least 256 bits for ML-KEM-1024.
- **§ 3.3.** Implementations of ML-KEM shall not use floating-point arithmetic, as rounding errors in floating-point operations may lead to incorrect results in some cases.
- **§ 7.1.** While the encapsulation key can be made public, the decapsulation key shall remain private.
- **§ 7.2.** ML-KEM.Encaps shall not be run with an encapsulation key that has not been checked as above.
- **§ 7.3.** Ciphertext checking shall be performed with every execution of ML-KEM.Decaps.

## FIPS 204: Module-Lattice-Based Digital Signature Standard

Source: https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.204.pdf

- **Announcement, item 8.** Agencies are advised that digital signature key pairs shall not be used for other purposes.
- **§ 3.6.3.** Therefore, implementations of ML-DSA shall ensure that any potentially sensitive intermediate data is destroyed as soon as it is no longer needed.
- **§ 5.4.** In the case of pre-hashing, the hash or XOF of the content to be signed must be computed within a FIPS 140-validated cryptographic module, but it may be a different cryptographic module than the one that generates the signature.

## FIPS 205: Stateless Hash-Based Digital Signature Standard

Source: https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.205.pdf

- **§ 3.1.** Therefore, implementations of SLH-DSA shall ensure that any local copies of the inputs and any potentially sensitive intermediate data are destroyed as soon as they are no longer needed.
- **§ 3.2.** Care must be taken to protect implementations against attacks, such as side-channel attacks or fault attacks [17, 18, 19, 20, 21].

## SP 800-227: Recommendations for Key-Encapsulation Mechanisms

Source: https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-227.pdf

- **RS3.** KEM implementations shall use approved components with security strengths that meet or exceed the required strength for each KEM parameter set.
- **RS4.** Random bits shall be generated using approved techniques, as described in the latest revisions of SP 800-90A, SP 800-90B, and SP 800-90C [6–8].
- **RS6.** If an application uses an ephemeral key pair, the key pair shall be used for only one execution of key-establishment via a KEM and shall be destroyed as soon as possible after its use.
- **RS9.** The key-confirmation key shall only be used for key confirmation and destroyed after use.
- **RM3.** If an encapsulating party obtains the static encapsulation key of another party, it must have assurance of the other party's ownership of the key before or during the execution of key-establishment.
- **RM5.** The key-establishment process that takes place over the channel used by Alice and Bob must satisfy an application-appropriate notion of integrity.
