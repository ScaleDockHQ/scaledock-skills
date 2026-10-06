# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## RFC 6557 Procedures for Maintaining the Time Zone Database

Source: https://www.rfc-editor.org/rfc/rfc6557.html

- **document.** Terminology The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in RFC 2119 [ RFC2119 ].
- **document.** There SHALL be a single lead individual and at least one backup individual for this function.
- **document.** The TZ Coordinator is empowered to decide, as the designated expert, appropriate changes, but SHOULD take into account views expressed on the mailing list.
- **document.** Moving forward, the TZ database, supporting code, and any appropriate supporting information SHOULD be cryptographically signed prior to release using well known public keys, along with any appropriate supporting information and distributed from < http://www.iana.org/time-zones >.
- **document.** Changes to existing entries SHALL reflect the consensus on the ground in the region covered by that entry.
- **document.** To be clear, the TZ Coordinator SHALL NOT set time zone policy for a region but use judgment and whatever available sources exist to assess what the average person on street would think the time actually is, or in case of historical corrections, was.
- **document.** Where they exist, licenses SHALL NOT be changed.
- **document.** The TZ Coordinator SHALL be named by the IESG as described above, and will act as the maintainer of the database and code, as described above.
