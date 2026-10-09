# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published text, quoted as written (only line breaks and hyphenation from PDF layout were joined). Apply the ones that match the role. Each is labelled with the section it comes from in the publication named in the group heading.

## SP 800-57 Part 1 Rev 5: Recommendation for Key Management: Part 1 – General

Source: https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-57pt1r5.pdf

- **§ 4.2.** Symmetric keys are often known by more than one entity; however, the key shall be generated using a random process and shall not be disclosed to entities that are not authorized access to the data protected by that algorithm and key.
- **§ 5.2.** In general, a single key shall be used for only one purpose (e.g., encryption, integrity authentication, key wrapping, random bit generation, or digital signatures).
- **§ 5.3.1.** If a key is compromised, its cryptoperiod shall no longer be considered valid.
- **§ 5.3.5.** A symmetric key shall not be used to provide protection after the end of the originator-usage period.
- **§ 5.3.7.** An RBG seed shall be destroyed immediately after use.
- **§ 5.4.3.** Assurance of public-key validity shall be obtained on all public keys before using them.
- **§ 5.5.1.** When a key is compromised, all use of the key to apply cryptographic protection to information (e.g., compute a digital signature or encrypt information) shall cease, and the compromised key shall be revoked (see Section 8.3.5).
- **§ 5.5.2.** A compromise-recovery plan shall be documented and easily accessible.
- **§ 5.6.2.** The agencies shall either select algorithms and key sizes that are expected to be secure during the entire system lifetime or should ensure that the algorithms and key sizes can be easily updated.
- **§ 6.1.** Integrity protection shall be provided for all key information.
- **§ 6.1.1.** Symmetric keys and private keys shall be destroyed at the end of their period of protection (see Sections 8.3.4 and 9.4).
- **§ 6.2.** For keys that are in use, the keys shall reside (and be used) within appropriate cryptographic modules; note that a key being in use does not preclude that key from also being simultaneously in transit and/or in storage.

## SP 800-131A Rev 2: Transitioning the Use of Cryptographic Algorithms and Key Lengths

Source: https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-131Ar2.pdf

- **§ 2.** Three-key TDEA may continue to be used for encryption in existing applications but shall not be used for encryption in new applications.
- **§ 3.** Private-key lengths providing less than 112 bits of security shall not be used to generate digital signatures.
- **§ 3.** The length of the modulus n shall be 2048 bits or more to meet the minimum security-strength requirement of 112 bits for Federal Government use.
- **§ 8.** The length of the key-derivation key shall be at least 112 bits.

## SP 800-132: Recommendation for Password-Based Key Derivation, Part 1: Storage Applications

Source: https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-132.pdf

- **§ 5.** Since most user-chosen passwords have low entropy and weak randomness properties, as discussed in Appendix A.1, these passwords shall not be used directly as cryptographic keys.
- **§ 5.1.** All or a portion of the salt shall be generated using an approved Random Bit Generator (e.g., see [5]).
- **§ 5.1.** The length of the randomly-generated portion of the salt shall be at least 128 bits.
- **§ 5.2.** The iteration count shall be selected as large as possible, as long as the time required to generate the key using the entered password is acceptable for the users.
