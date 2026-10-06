# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Media Source Extensions™ Level 1

Source: https://www.w3.org/TR/media-source-1/

This specification extends HTMLMediaElement [ HTML51 ] to allow JavaScript to generate media streams for playback. Allowing JavaScript to generate streams facilitates a variety of use cases like adaptive streaming and time shifting live streams.

- **1.2 Definitions.** For video and text, the duration indicates how long the video frame or text SHOULD be displayed.
- **1.2 Definitions.** If frames can be decoded out of presentation order , then the decode timestamp MUST be present in or derivable from the byte stream.
- **1.2 Definitions.** The user agent MUST run the append error algorithm if this is not the case.
- **1.2 Definitions.** Implementations MUST report the actual buffered range, regardless of this allowance.
- **1.2 Definitions.** The presentation timestamp in a coded frame indicates when the frame SHOULD be rendered.
- **1.2 Definitions.** Implementations MUST support at least 1 MediaSource object with the following configurations: A single SourceBuffer with 1 audio track and/or 1 video track.
- **1.2 Definitions.** MediaSource objects MUST support each of the configurations above, but they are only required to support one configuration at a time.
- **1.2 Definitions.** The user agent MUST run the append error algorithm if the Track ID is not unique within the initialization segment .

## Media Source Extensions™ Level 2

Source: https://www.w3.org/TR/media-source-2/

This specification extends HTMLMediaElement [ HTML ] to allow JavaScript to generate media streams for playback. Allowing JavaScript to generate streams facilitates a variety of use cases like adaptive streaming and time shifting live streams.

- **2..** For video and text, the duration indicates how long the video frame or text SHOULD be displayed.
- **2..** If frames can be decoded out of presentation order , then the decode timestamp MUST be present in or derivable from the byte stream.
- **2..** The user agent MUST run the append error algorithm if this is not the case.
- **2..** Implementations MUST report the actual buffered range, regardless of this allowance.
- **2..** The presentation timestamp in a coded frame indicates when the frame SHOULD be rendered.
- **2..** Implementations MUST support at least 1 MediaSource object with the following configurations: A single SourceBuffer with 1 audio track and/or 1 video track.
- **2..** MediaSource objects MUST support each of the configurations above, but they are only required to support one configuration at a time.
- **2..** The user agent MUST run the append error algorithm if the Track ID is not unique within the initialization segment .

## Media Source Extensions Byte Stream Format Registry

Source: https://www.w3.org/TR/mse-byte-stream-format-registry/

This registry defines the byte stream formats for use with the Media Source Extensions™ specification [ MEDIA-SOURCE ]. This registry is non-normative.

- **3. Registration Entry Requirements.** If the underlying format specification is not publicly available, it must be made available to the Working Group for evaluation.
- **3. Registration Entry Requirements.** If the Media Working Group reaches consensus to accept the candidate, send a pull request (either by the registry editors or by the party requesting the candidate registration) to register the candidate that meets the following requirements: Each entry must include a unique MIME type / subtype pair.
- **3. Registration Entry Requirements.** If the byte stream format is derived-from an existing file format, then it should use the MIME type / subtype pairs typically used for the file format.
- **3. Registration Entry Requirements.** Each entry must include a [[generate timestamps flag]] value that must be used by SourceBuffer when handling the byte stream format.
- **3. Registration Entry Requirements.** Each entry must include a link that references a publicly available registration specification.
- **3. Registration Entry Requirements.** The registration specification for each entry must comply with all requirements outlined in the Byte Stream Formats section of the Media Source Extensions™ specification [ MEDIA-SOURCE ].
