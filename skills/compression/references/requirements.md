# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Compression Living Standard

Source: https://compression.spec.whatwg.org/review-drafts/2026-04/

This document defines a set of JavaScript APIs to compress and decompress streams of binary data.

- **Compression.** Developers should refer to the Living Standard for the most current error corrections and other developments.
- **3. Supported formats.** brotli "Brotli Compressed Data Format" [RFC7932] Implementation must be "compliant" as described in [RFC7932] section 1.4.
- **3. Supported formats.** Non- [RFC7932] -conforming blocks must not be created by CompressionStream , and are errors for DecompressionStream .
- **3. Supported formats.** Implementations must be "compliant" as described in [RFC1950] section 2.3.
- **3. Supported formats.** Field values described as invalid in [RFC1950] must not be created by CompressionStream , and are errors for DecompressionStream .
- **3. Supported formats.** deflate-raw "The DEFLATE algorithm" [RFC1951] Implementations must be "compliant" as described in [RFC1951] section 1.4.
- **3. Supported formats.** Non- [RFC1951] -conforming blocks must not be created by CompressionStream , and are errors for DecompressionStream .
- **3. Supported formats.** gzip "GZIP file format" [RFC1952] Implementations must be "compliant" as described in [RFC1952] section 2.3.1.2.
