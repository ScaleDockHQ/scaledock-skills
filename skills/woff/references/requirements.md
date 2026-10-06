# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## WOFF File Format 2.0

Source: https://www.w3.org/TR/WOFF2/

Based on experience with WOFF 1.0, which is widely deployed, this specification was developed to provide improved compression and thus lower use of network bandwidth, while still allowing fast decompression even on mobile devices. This is achieved by combining a content-aware preprocessing step and improved entropy coding, compared to the Flate compression used in WOFF 1.0.

- **1.1 Notational Conventions.** The all-uppercase key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in RFC 2119 [ RFC2119 ].
- **2. General Requirements.** In particular, such linked fonts are only available to the documents that reference them; they MUST NOT be made available to other applications or documents on the user's system .
- **3. Overall file structure and basic data types.** Except for padding with a maximum of three null bytes in places where 4-byte alignment of a table length or block offset is specified, there MUST NOT be any extraneous data between the data blocks or WOFF2 header and table directory, or beyond the last such block or table .
- **3. Overall file structure and basic data types.** If such extraneous data is present a conforming user agent MUST reject the file as invalid .
- **3. Overall file structure and basic data types.** The file MUST also be rejected as invalid if the offsets and lengths of any data blocks or font tables indicate overlapping byte ranges of the file, or ranges that would extend beyond the end of the file .
- **255UInt16 Data Type.** An encoder may produce any of these, and a decoder MUST accept them all .
- **UIntBase128 Data Type.** A decoder MUST reject the font file if it encounters a UintBase128-encoded value with leading zeros (a value that starts with the byte 0x80), if UintBase128-encoded sequence is longer than 5 bytes, or if a UintBase128-encoded value exceeds 2 32 -1 .
- **3.2. WOFF2 Header.** The signature field in the WOFF2 header MUST contain the value of 0x774F4632 ('wOF2') , which distinguishes it from WOFF 1.0 files.

## WOFF File Format 1.0

Source: https://www.w3.org/TR/WOFF/

This document specifies the WOFF font packaging format. This format was designed to provide lightweight, easy-to-implement compression of font data, suitable for use with CSS @font-face rules. Any properly licensed TrueType/OpenType/Open Font Format file can be packaged in WOFF format for Web use. User agents decode the WOFF file to restore the font data such that it will display identically to the input font. The WOFF format also allows additional metadata to be attached to the file; this can be used by font designers or vendors to include licensing or other information, beyond that present in the original font. Such metadata does not affect the rendering of the font in any way, but may be

- **Notational Conventions.** The all-uppercase key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in RFC 2119 [ RFC-2119 ].
- **2. General Requirements.** In particular, such linked fonts are only available to the documents that reference them; they MUST NOT be made available to other applications or documents on the user's system .
- **3. Overall File Structure.** Except for padding with a maximum of three null bytes in places where 4-byte alignment of a table length or block offset is specified, there MUST NOT be any extraneous data between the data blocks or font data tables indicated by the WOFF header and table directory, or beyond the last such block or table .
- **3. Overall File Structure.** If such extraneous data is present a conforming user agent MUST reject the file as invalid .
- **3. Overall File Structure.** The file MUST also be rejected as invalid if the offsets and lengths of any data blocks or font tables indicate overlapping byte ranges of the file, or ranges that would extend beyond the end of the file .
- **4. WOFF Header.** The signature field in the WOFF header MUST contain the "magic number" 0x774F4646 .
- **4. WOFF Header.** If the field does not contain this value, user agents MUST reject the file as invalid .
- **4. WOFF Header.** This value MUST be a multiple of 4, because all font tables including the last are to be padded to a 4-byte boundary .
