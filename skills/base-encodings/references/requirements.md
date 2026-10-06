# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## RFC 4648 The Base16, Base32, and Base64 Data Encodings

Source: https://www.rfc-editor.org/rfc/rfc4648.html

- **document.** Conventions Used in This Document The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [ 2 ].
- **document.** Implementations MUST NOT add line feeds to base-encoded data unless the specification referring to this document explicitly directs base encoders to add line feeds after a specific number of characters.
- **document.** Implementations MUST include appropriate pad characters at the end of encoded data unless the specification referring to this document explicitly states otherwise.
- **document.** Implementations MUST reject the encoded data if it contains characters outside the base alphabet when interpreting base-encoded
- **document.** These pad bits MUST be set to zero by conforming encoders, which is described in the descriptions on padding below.
- **document.** Such specifications may instead state, as MIME does, that characters outside the base encoding alphabet should simply be ignored when interpreting data ("be liberal in what you accept").
- **document.** Here are a few requirements that determine which alphabet should be used: Josefsson Standards Track [Page 4] RFC 4648 Base-N Encodings October 2006 o Handled by humans.
- **document.** (However, by default it should not; see previous section.) o Encoded into structures that mandate other requirements.
