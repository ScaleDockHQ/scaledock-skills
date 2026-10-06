# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## FIPS 203

Source: https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.203.pdf

Laurie E. Locascio, NIST Director and Under Secretary of Commerce for Standards and Technology

- **document.** Comments concerning this Federal Information Processing Standard publication are welcomed and should be submitted using the contact information in the “Inquiries and Comments” clause of the announcement section.
- **document.** Exports of cryptographic modules that implement this standard and technical data regarding them must comply with all federal laws and regulations and be licensed by the Bureau of Industry and Security of the U.S.
- **document.** The decapsulation key must be kept private and must be destroyed after it is no longer needed.
- **document.** The decryption key must be kept private and must be destroyed after it is no longer needed.
- **document.** A set of two keys with the property that one key can be made public while the other key must be kept private.
- **document.** The shared secret key must be kept private and must be destroyed when no longer needed.
- **document.** should Used to indicate a strong recommendation but not a requirement of this standard.
- **document.** The bytes must be freshly generated using randomness from an approved RBG.

## FIPS 204

Source: https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.204.pdf

Laurie E. Locascio, NIST Director and Under Secretary of Commerce for Standards and Technology

- **document.** Comments concerning this Federal Information Processing Standard publication are welcomed and should be submitted using the contact information in the “Inquiries and comments” clause of the announcement section.
- **document.** Public keys may be known by the public, but private keys must be kept secret.
- **document.** Exports of cryptographic modules that implement this standard and technical data regarding them must comply with these federal regulations and be licensed by the Bureau of Industry and Security of the U.S.
- **document.** ii FIPS 204 MODULE-LATTICE-BASED DIGITAL SIGNATURE STANDARD Since a standard of this nature must be flexible enough to adapt to advancements and innovations in science and technology, this standard will be reviewed every five years in order to assess its adequacy.
- **document.** should Used to indicate a strong recommendation but not a requirement of this standard.
- **document.** The identifier for a signature (e.g., the object identifier [OID]) should indicate whether the signature is a ML-DSA signature or a pre-hash HashML-DSA signature.
- **document.** In the case of pre-hash signatures, the identifier should also indicate the hash function or XOF used to compute the pre-hash.
- **document.** If a non-empty context string is to be used, this should either be indicated by the signature’s identifier or by the application with which the signature is being used.

## FIPS 205

Source: https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.205.pdf

Laurie E. Locascio, NIST Director and Under Secretary of Commerce for Standards and Technology

- **document.** Comments concerning this Federal Information Processing Standard publication are welcomed and should be submitted using the contact information in the “Inquiries and comments” clause of the announcement section.
- **document.** Public keys may be known by the public, but private keys must be kept secret.
- **document.** Exports of cryptographic modules that implement this standard and technical data regarding them must comply with these federal regulations and be licensed by the Bureau of Industry and Security of the U.S.
- **document.** Since a standard of this nature must be flexible enough to adapt to advancements and innovations in science and technology, this standard will be reviewed every five years in order to assess its adequacy.
- **document.** [1] should Used to indicate a strong recommendation but not a requirement of this standard.
- **document.** Sec- tion 3.2 discusses issues that implementers of cryptographic modules should take into considera- tion but that are not requirements.
- **document.** As WOTS+ , XMSS, FORS, and hypertree signature schemes are not approved for use as stand-alone signature schemes, cryptographic modules should not make interfaces to these components available to applications.
- **document.** Care must be taken to protect implementations against attacks, such as side-channel attacks or fault attacks [17, 18, 19, 20, 21].

## SP 800-227

Source: https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-227.pdf

Craig Burkhardt, Acting Under Secretary for Standards and Technology and Acting NIST Director

- **document.** Nothing in this publication should be taken to contradict the standards and guidelines made mandatory and binding on federal agencies by the Secretary of Commerce under statutory authority.
- **document.** Nor should these guidelines be interpreted as altering or superseding the existing authorities of the Secretary of Commerce,
- **document.** Specific requirements will be clearly noted with “shall” and “must” statements.
- **document.** Ensuring full functional equivalence to the specifica tion via testing is not possible (see the “must” requir ement RM1 ).
- **document.** The following requirements are not testable by a CMVP validation lab (i.e., must state- ments): RM1 (Section 3.1).
- **document.** Implementations must correctly implement the mathematical func- tionality of the target KEM.
- **document.** RM2 (Section 4.2) In applications of KEMs, a parameter set with an application-appropriate security strength must be selected (see [10, Section 2.2]).
- **document.** RM3 (Section 4.2) If an encapsulating party obtains the static encapsulation key of another party, it must have assurance of the other party’s ownership of the key before or during the execution of key-establishment.
