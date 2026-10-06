# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Autoplay Policy Detection

Source: https://www.w3.org/TR/autoplay-detection/

This specification provides web developers the ability to detect if automatically starting the playback of a media file is allowed in different situations.

- **2.2.1. Query by a Media Type.** When getAutoplayPolicy(type) method is called, the user agent MUST run the following steps: If type is mediaelement , return a result that represents the current status for HTMLMediaElement and its extensions, such as HTMLVideoElement and HTMLAudioElement , which exist in the document contained in the Window object associated with the queried Navigator object.
- **Document conventions.** The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119.
- **2.2.2. Query by an Element.** If the result of querying by a media type is different from the result of querying by an element, authors should take the latter one as the correct result.
- **Conformant Algorithms.** Requirements phrased in the imperative as part of algorithms (such as "strip any leading space characters" or "return false and abort these steps") are to be interpreted with the meaning of the key word ("must", "should", "may", etc) used in introducing the algorithm.
