# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## RFC 9580 OpenPGP

Source: https://www.rfc-editor.org/rfc/rfc9580.html

This document specifies the message formats used in OpenPGP. OpenPGP provides encryption with public key or symmetric cryptographic algorithms, digital signatures, compression, and key management. ¶ This document is maintained in order to publish all necessary information needed to develop interoperable applications based on the OpenPGP format. It is not a step-by-step cookbook for writing an application. It describes only the format and methods needed to read, check, generate, and write conforming packets crossing any network. It does not deal with storage and implementation questions. It does, however, discuss implementation issues necessary to avoid security flaws. ¶ This document obsolet

- **abstract.** This document specifies the message formats used in OpenPGP. OpenPGP provides encryption with public key or symmetric cryptographic algorithms, digital signatures, compression, and key management. ¶ This document is maintained in order to publish all necessary information needed to develop interoperable applications based on the OpenPGP format. It is not a step-by-step cookbook for writing an application. It describes only the format and methods needed to read, check, generate, and write conforming packets crossing any network. It does not deal with storage and implementation questions. It does, however, discuss implementation issues necessary to avoid security flaws. ¶ This document obsolet

## RFC 4880 OpenPGP Message Format

Source: https://www.rfc-editor.org/rfc/rfc4880.html

- **document.** Callas, et al Standards Track [Page 5] RFC 4880 OpenPGP Message Format November 2007 The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [ RFC2119 ].
- **document.** The key words "PRIVATE USE", "HIERARCHICAL ALLOCATION", "FIRST COME FIRST SERVED", "EXPERT REVIEW", "SPECIFICATION REQUIRED", "IESG APPROVAL", "IETF CONSENSUS", and "STANDARDS ACTION" that appear in this document when used to describe namespace allocation are to be interpreted as described in [ RFC2434 ].
- **document.** Compression OpenPGP implementations SHOULD compress the message after applying the signature but before encryption.
- **document.** Implementations SHOULD provide Radix-64 conversions.
- **document.** Implementations SHOULD NOT assume that Key IDs are unique.
- **document.** String-to-Key Usage Implementations SHOULD use salted or iterated-and-salted S2K specifiers, as simple S2K specifiers are more vulnerable to dictionary attacks.
- **document.** Also note that packets with a tag greater than or equal to 16 MUST use new format packets.
- **document.** In general, an implementation SHOULD NOT use indeterminate-length packets except where the end of the data will be clear from the context, and even then it is better to use a definite length, or a new format header.
