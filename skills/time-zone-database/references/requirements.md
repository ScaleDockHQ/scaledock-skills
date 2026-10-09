# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published RFC text, quoted as written (only line breaks and page breaks from the plain-text layout were joined). Apply the ones that match the role. Each is labelled with the RFC and section it comes from. RFC 6557 is a process document with only eight BCP 14 sentences, so this list also quotes its defining rules for TZ names, releases and ownership.

## RFC 6557 Procedures for Maintaining the Time Zone Database

Source: https://www.rfc-editor.org/rfc/rfc6557.html

- **RFC 6557 § 1.1.** There SHALL be a single lead individual and at least one backup individual for this function.
- **RFC 6557 § 3.** Updates to the TZ database are made by the TZ Coordinator in consultation with the TZ mailing list.
- **RFC 6557 § 3.** The TZ Coordinator is empowered to decide, as the designated expert, appropriate changes, but SHOULD take into account views expressed on the mailing list.
- **RFC 6557 § 3.** Moving forward, the TZ database, supporting code, and any appropriate supporting information SHOULD be cryptographically signed prior to release using well known public keys, along with any appropriate supporting information and distributed from <http://www.iana.org/time-zones>.
- **RFC 6557 § 3.** New TZ names (e.g., locations) are only to be created when the scope of the region a name was envisioned to cover is no longer accurate.
- **RFC 6557 § 3.** In order to correct historical inaccuracies, a new TZ name MAY be added when it is necessary to indicate what was the consensus view at a given time and location.
- **RFC 6557 § 3.** Changes to existing entries SHALL reflect the consensus on the ground in the region covered by that entry.
- **RFC 6557 § 3.** To be clear, the TZ Coordinator SHALL NOT set time zone policy for a region but use judgment and whatever available sources exist to assess what the average person on street would think the time actually is, or in case of historical corrections, was.
- **RFC 6557 § 6.** The reference implementation shall be distributed along with an associated cryptographic signature verifiable by a public key.
- **RFC 6557 § 6.** Where they exist, licenses SHALL NOT be changed.
- **RFC 6557 § 7.** The TZ database itself is not an IETF Contribution or an IETF document.
- **RFC 6557 § 8.** The TZ Coordinator SHALL be named by the IESG as described above, and will act as the maintainer of the database and code, as described above.
- **RFC 6557 § 8.** Both current and historical versions of the database will be stored and distributed via HTTP/HTTPS.
- **RFC 6557 § 9.** This memo states that the TZ database SHOULD be distributed with a valid cryptographic signature moving forward.
