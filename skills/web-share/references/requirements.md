# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Web Share API

Source: https://www.w3.org/TR/web-share/

This specification defines an API for sharing text, links and other content to an arbitrary destination of the user's choice. The available share targets are not specified here; they are provided by the user agent. They could, for example, be apps, websites or contacts.

- **2.1.2.** The user agent SHOULD show intermediary UI through which the user can verify the shared content (if the OS-level UI does not provide this functionality).
- **3..** However, it MUST have the ability to receive data that matches some or all of the concepts exposed in ShareData .
- **3..** To convert data to a format suitable for ingestion into the target , the user agent SHOULD map the members of ShareData onto equivalent concepts in the target.
- **7. Conformance.** The key words MAY , MUST , OPTIONAL , and SHOULD in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **2.1.2.** Content that is previewed and authorized by a user might be safe to forward, however it is not always possible for a person to identify when information should be confidential, so forwarding any content presents a risk.
- **2.1.3.** If an object contains additional members, it should be destructured to only test the defined members individually.
