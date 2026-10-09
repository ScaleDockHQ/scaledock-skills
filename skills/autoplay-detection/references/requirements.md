# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the algorithm steps and conformance sentences from the published text, quoted as written (only line breaks were joined). Apply the ones that match the role. Each is labelled with the section it comes from in the published document. The specification is short: § 2.1 and § 2.2 hold all of its normative text, so this file has fewer quotes than most.

## Autoplay Policy Detection

Source: https://www.w3.org/TR/autoplay-detection/

- **§ 2.1.** An inaudible media element is an HTMLMediaElement that has any of the following conditions: media’s volume equal to 0 media’s muted is true media’s resource does not have an audio track
- **§ 2.1.** Therefore, it is recommended that authors check the result every time if they want to have an up-to-date result.
- **§ 2.2.1.** When getAutoplayPolicy(type) method is called, the user agent MUST run the following steps:
- **§ 2.2.1.** If type is mediaelement, return a result that represents the current status for HTMLMediaElement and its extensions, such as HTMLVideoElement and HTMLAudioElement, which exist in the document contained in the Window object associated with the queried Navigator object.
- **§ 2.2.1.** If type is audiocontext, return a result that represents the current status for AudioContext, which exist in the document contained in the Window object associated with the queried Navigator object.
- **§ 2.2.1.** In this situation, it is recommended that authors also query by a specific element in order to get an accurate result.
- **§ 2.2.2.** In addition, if authors make an inaudible media element audible right after it starts playing, then it is recommended for a user agent to pause that media element immediately because it’s no longer inaudible.
- **§ 2.2.2.** If the result of querying by a media type is different from the result of querying by an element, authors should take the latter one as the correct result.
