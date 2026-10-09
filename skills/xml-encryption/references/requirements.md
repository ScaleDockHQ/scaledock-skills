# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published text, quoted as written (only line breaks were joined). Apply the ones that match the role. Each is labelled with the section it comes from in the published document.

## XML Encryption Syntax and Processing Version 1.1

Source: https://www.w3.org/TR/xmlenc-core1/

- **§ 3.1.** Implementations MUST generate laxly schema valid [XMLSCHEMA-1], [XMLSCHEMA-2] EncryptedData or EncryptedKey elements as specified by the subsequent schema declarations.
- **§ 3.2.** The presence of any child element under EncryptionMethod that is not permitted by the algorithm or the presence of a KeySize child inconsistent with the algorithm MUST be treated as an error.
- **§ 3.3.** It must either contain the encrypted octet sequence as base64 encoded text as element content of the CipherValue element, or provide a reference to an external location containing the encrypted octet sequence via the CipherReference element.
- **§ 3.3.1.** Implementations MUST support the CipherReference feature and the same URI encoding, dereferencing, scheme, and HTTP response codes as that of [XMLDSIG-CORE1].
- **§ 3.5.** In addition, we provide two additional child elements: applications MUST support EncryptedKey (section 3.5.1 The EncryptedKey Element) and MAY support AgreementMethod (section 5.6 Key Agreement).
- **§ 3.5.1.** The value of the key MUST be the same in all EncryptedKey elements identified with the same CarriedKeyName label within a single XML document.
- **§ 4.3.** If the cleartext is of type element or content, the data MUST be serialized in UTF-8 as specified in [XML10], using Normal Form C [NFC].
- **§ 5.2.4.** For the purposes of this specification, AES-GCM shall be used with a 96 bit Initialization Vector (IV) and a 128 bit Authentication Tag (T).
- **§ 5.3.** If the size of the key to be used is apparent and disagrees with the KeySize parameter, an error MUST be returned.
- **§ 5.5.2.** Implementations MUST implement RSA-OAEP for the transport of all key types and sizes that are mandatory to implement for symmetric encryption.
- **§ 5.7.2.** Implementation of wrapping 128 bit keys REQUIRED.
- **§ 5.8.** Therefore, SHA-1 support is REQUIRED in this specification only for backwards-compatibility reasons.
- **§ 6.1.3.** Implementations SHOULD always use a different public key pair for data confidentiality and for data integrity functionality.
- **§ 6.1.3.** Implementations using symmetric keys SHOULD NOT use the same key material for different algorithms, even if serving the same purpose.
- **§ 6.1.3.** Implementations SHOULD restrict algorithm usage to algorithms known to be secure in the face of chosen-ciphertext attacks (RSA-OAEP, AES-GCM).
- **§ 6.1.3.** In that case, documents containing RSA-PKCS#1 v1.5 [XMLENC-PKCS15-ATTACK] and AES-CBC [XMLENC-CBC-ATTACK] ciphertexts SHOULD be rejected without decryption.
- **§ 6.2.** While the signature secures plaintext it only covers that which is signed, recipients of encrypted messages must not infer integrity or authenticity of other unsigned information (e.g., headers) within the encrypted envelope, see [XMLDSIG-CORE1], section 8.1.1 Only What is Signed is Secure].
- **§ 6.4.** For the Galois/Counter Mode (GCM) used by this specification, the IV must not be reused for any key and should be random, but it need not be secret.
- **§ 6.5.** Consequently, implementations should be able to restrict arbitrary recursion and the total amount of processing and networking resources a request can consume.
- **§ 6.6.** Consequently, such applications must consider encrypted content to be as unsafe as the unsafest content transported in its application context.
- **§ 6.7.** Implementations SHOULD NOT provide detailed error responses related to security algorithm processing.
- **§ 6.8.** Implementers SHOULD ensure that distinct errors detected during security algorithm processing do not consume systematically different amounts of processing time from each other.
- **§ 8.2.** The application/xenc+xml type name MUST only be used for data objects in which the root element is from the XML Encryption namespace.
