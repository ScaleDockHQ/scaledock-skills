# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Global Privacy Platform

Source: https://raw.githubusercontent.com/InteractiveAdvertisingBureau/Global-Privacy-Platform/main/Core/Consent%20String%20Specification.md

This document is one of the IAB Tech Lab Global Privacy Protocol Specifications. It defines the technical implementation of the structure and encoding for a Global Privacy Protocol String (GPP String).

- **document.** TECH LAB DOES NOT WARRANT THAT THE PRODUCTS AND SERVICES PROVIDED TO OR USED BY YOU HEREUNDER SHALL CAUSE YOU AND/OR YOUR PRODUCTS OR SERVICES TO BE IN COMPLIANCE WITH ANY APPLICABLE LAWS, REGULATIONS, OR SELF-REGULATORY FRAMEWORKS, AND YOU ARE SOLELY RESPONSIBLE FOR COMPLIANCE WITH THE SAME.
- **document.** Participants in the Global Privacy Working group must be members of IAB Tech Lab.
- **document.** This document specifies how that string must be formatted and how it must be used.
- **document.** Vendors or any other third-party service providers must neither create nor alter GPP Strings.
- **document.** #### Table from RFC 4648 Value Encoding Value Encoding Value Encoding Value Encoding 0 A 17 R 34 i 51 z 1 B 18 S 35 j 52 0 2 C 19 T 36 k 53 1 3 D 20 U 37 l 54 2 4 E 21 V 38 m 55 3 5 F 22 W 39 n 56 4 6 G 23 X 40 o 57 5 7 H 24 Y 41 p 58 6 8 I 25 Z 42 q 59 7 9 J 26 a 43 r 60 8 10 K 27 b 44 s 61 9 11 L 28 c 45 t 62 + 12 M 29 d 46 u 63 / 13 N 30 e 47 v 14 O 31 f 48 w (pad) = 15 P 32 g 49 x 16 Q 33 h…
- **document.** The string must contain a header and applicable discrete section(s): [Header]~[Discrete Section] #### **Header** The header is always required and comes first.
- **document.** The IDs must be represented in the order the related sections appear in the string.
- **document.** For example, if TCF needs a version 3 and eliminates the concept of “out of band” vendors—which would result in the removal of DisclosedVendors and AllowedVendors—that should not require a version bump to the GPP string specification.
