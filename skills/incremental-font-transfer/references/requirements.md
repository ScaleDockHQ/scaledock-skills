# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Incremental Font Transfer

Source: https://www.w3.org/TR/IFT/

This specification defines a method to incrementally transfer a font from server to client. The client loads only the portion(s) of the font that they actually need, significantly reducing data transfer. Multiple incremental additions to the same font are possible, such as a user agent updating a font as a user browses multiple pages. Incremental transfer improves on unicode-range by avoiding damage to layout (kerning, ligatures, etc) rules, meaning it can efficiently support fine grained increments to latin and to complex scripts like Indic or Arabic.

- **Document conventions.** The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119.
- **1.4. Performance Considerations and the use of Incremental Font Transfer.** This section provides non-normative guidance to help decide when incremental transfer should be utilized.
- **2. Opt-In Mechanism.** The keyword incremental is used to indicate the referenced font contains IFT data and should only be loaded by a user agent which supports incremental font transfer.
- **2. Opt-In Mechanism.** The unicode ranges should be set to match the coverage of the fully extended font.
- **2.1. Offline Usage.** due to JavaScript execution), the page saving mechanism should fully expand the incremental font by invoking Fully Expand a Font Subset and replace references to the incremental font with the fully expanded one.
- **3.3. Patch Map.** The value specifies information about the patches which should be applied when the entry is matched.
- **4.2. Default Layout Features.** When forming a font subset definition as input to the extension algorithm the client should typically include all features found in Appendix A: Default Feature Tags in the subset definition.
- **4.3. Incremental Font Extension Algorithm.** These come in two forms: First, patch mapping entries may list more than one URL string, where each URL string after the first should also be loaded because they will be needed in future iterations.
