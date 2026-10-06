# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## WebVTT: The Web Video Text Tracks Format Level 1

Source: https://www.w3.org/TR/webvtt1/

This specification defines WebVTT, the Web Video Text Tracks format. Its main use is for marking up external text track resources in connection with the HTML <track> element. WebVTT files provide captions or subtitles for video content, and also text video descriptions [MAUR] , chapters for content navigation, and more generally any form of metadata that is time-aligned with audio or video content.

- **2. Conformance.** The key words "MUST", "MUST NOT", "SHOULD", "SHOULD NOT", "MAY", and "OPTIONAL" in the normative parts of this document are to be interpreted as described in RFC2119.
- **1.5. Comments in WebVTT.** Some things to bear in mind: - I was lip-reading, so the cues may not be 100% accurate - I didn't pay too close attention to when the cues should start or end.
- **2. Conformance.** [RFC2119] Requirements phrased in the imperative as part of algorithms (such as "strip any leading space characters" or "return false and abort these steps") are to be interpreted with the meaning of the key word ("must", "should", "may", etc) used in introducing the algorithm.
- **2.1. Conformance classes.** The user agent must also be conforming implementations of the IDL fragments in this specification, as described in the Web IDL specification.
- **2.1. Conformance classes.** The user agent must instead only render the text inside WebVTT caption or subtitle cue text in an appropriate manner and specifically support the color classes defined in § 5 Default classes for WebVTT Caption or Subtitle Cue Components .
- **2.1. Conformance classes.** User agents that support a full CSS engine must therefore limit the CSS styles they apply for WebVTT so as to enable identical rendering without bleeding in extra CSS styles that are beyond the WebVTT specification.
- **2.1. Conformance classes.** Conformance checkers Conformance checkers must verify that a WebVTT file conforms to the applicable conformance criteria described in this specification.
- **2.1. Conformance classes.** Authoring tools Authoring tools must generate conforming WebVTT files .
