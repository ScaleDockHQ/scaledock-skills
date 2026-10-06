# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Web Cryptography API Level 1

Source: https://www.w3.org/TR/WebCryptoAPI/

This specification describes a JavaScript API for performing basic cryptographic operations in web applications, such as hashing, signature generation and verification, and encryption and decryption. Additionally, it describes an API for applications to generate and/or manage the keying material necessary to perform these operations. Uses for this API range from user or service authentication, document or code signing, and the confidentiality and integrity of communications.

- **3. Conformance.** The key words MUST , REQUIRED , and SHALL in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **3. Conformance.** The following conformance classes are defined by this specification: conforming user agent A user agent is considered to be a conforming user agent if it satisfies all of the MUST -, REQUIRED - and SHALL -level criteria in this specification that apply to implementations.
- **3. Conformance.** (In particular, the algorithms defined in this specification are intended to be easy to follow, and not intended to be performant.) User agents that use ECMAScript to implement the APIs defined in this specification MUST implement them in a manner consistent with the ECMAScript Bindings defined in the Web IDL specification [ WebIDL ] as this specification uses that specification and terminology.
- **4.2 Cryptographic algorithms.** Because the underlying cryptographic implementations will vary between conforming user agents, and may be subject to local policy, including but not limited to concerns such as government or industry regulation, security best practices, intellectual property concerns, and constrained operational environments, this specification does not dictate a mandatory set of algorithms that MUST be implemented.
- **8. Dependencies.** DOM A conforming user agent MUST support at least the subset of the functionality defined in DOM that this specification relies upon; in particular, it MUST support Promise s and DOMException .
- **8. Dependencies.** [ DOM ] HTML A conforming user agent MUST support at least the subset of the functionality defined in HTML that this specification relies upon; in particular, it MUST support the ArrayBufferView typedef and serializable objects .
- **8. Dependencies.** [ HTML ] Web IDL A conforming user agent MUST be a conforming implementation of the IDL fragments in this specification, as described in the Web IDL specification.
- **14.3.6 The generateKey method.** When invoked, generateKey MUST perform the following steps: Let algorithm , extractable and usages be the algorithm , extractable and keyUsages parameters passed to the generateKey () method, respectively.

## Web Cryptography Level 2

Source: https://www.w3.org/TR/webcrypto-2/

This specification describes a JavaScript API for performing basic cryptographic operations in web applications, such as hashing, signature generation and verification, and encryption and decryption. Additionally, it describes an API for applications to generate and/or manage the keying material necessary to perform these operations. Uses for this API range from user or service authentication, document or code signing, and the confidentiality and integrity of communications.

- **3. Conformance.** The key words MUST , REQUIRED , and SHALL in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **3. Conformance.** The following conformance classes are defined by this specification: conforming user agent A user agent is considered to be a conforming user agent if it satisfies all of the MUST -, REQUIRED - and SHALL -level criteria in this specification that apply to implementations.
- **3. Conformance.** (In particular, the algorithms defined in this specification are intended to be easy to follow, and not intended to be performant.) User agents that use ECMAScript to implement the APIs defined in this specification MUST implement them in a manner consistent with the ECMAScript Bindings defined in the Web IDL specification [ WebIDL ] as this specification uses that specification and terminology.
- **4.2 Cryptographic algorithms.** Because the underlying cryptographic implementations will vary between conforming user agents, and may be subject to local policy, including but not limited to concerns such as government or industry regulation, security best practices, intellectual property concerns, and constrained operational environments, this specification does not dictate a mandatory set of algorithms that MUST be implemented.
- **8. Dependencies.** DOM A conforming user agent MUST support at least the subset of the functionality defined in DOM that this specification relies upon; in particular, it MUST support Promise s and DOMException .
- **8. Dependencies.** [ DOM ] HTML A conforming user agent MUST support at least the subset of the functionality defined in HTML that this specification relies upon; in particular, it MUST support the ArrayBufferView typedef and serializable objects .
- **8. Dependencies.** [ HTML ] Web IDL A conforming user agent MUST be a conforming implementation of the IDL fragments in this specification, as described in the Web IDL specification.
- **14.3.6 The generateKey method.** When invoked, generateKey MUST perform the following steps: Let algorithm , extractable and usages be the algorithm , extractable and keyUsages parameters passed to the generateKey () method, respectively.
