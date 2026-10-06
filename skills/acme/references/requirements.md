# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## RFC 8555 Automatic Certificate Management Environment (ACME)

Source: https://www.rfc-editor.org/rfc/rfc8555.html

- **document.** Terminology The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **document.** Character Encoding All requests and responses sent via HTTP by ACME clients, ACME servers, and validation servers as well as any inputs for digest computations MUST be encoded using the UTF-8 character set [ RFC3629 ].
- **document.** ACME servers SHOULD follow the recommendations of [ RFC7525 ] when configuring their TLS implementations.
- **document.** ACME clients MUST send a User-Agent header field, in accordance with [ RFC7231 ].
- **document.** This header field SHOULD include the name and version of the ACME software in addition to the name and version of the underlying HTTP client software.
- **document.** Standards Track [Page 10] RFC 8555 ACME March 2019 ACME clients SHOULD send an Accept-Language header field in accordance with [ RFC7231 ] to enable localization of error messages.
- **document.** Such servers SHOULD set the Access-Control-Allow-Origin header field to the value "*".
- **document.** Trailing '=' characters MUST be stripped.

## RFC 9773 ACME Renewal Information (ARI) Extension

Source: https://www.rfc-editor.org/rfc/rfc9773.html

This document specifies how an Automated Certificate Management Environment (ACME) server may provide suggestions to ACME clients as to when they should attempt to renew their certificates. This allows servers to mitigate load spikes and ensures that clients do not make false assumptions about appropriate certificate renewal periods. ¶

- **abstract.** This document specifies how an Automated Certificate Management Environment (ACME) server may provide suggestions to ACME clients as to when they should attempt to renew their certificates. This allows servers to mitigate load spikes and ensures that clients do not make false assumptions about appropriate certificate renewal periods. ¶
