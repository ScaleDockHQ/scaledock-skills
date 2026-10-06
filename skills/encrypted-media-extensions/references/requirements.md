# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Encrypted Media Extensions Level 1

Source: https://www.w3.org/TR/encrypted-media-1/

This proposal extends HTMLMediaElement [ HTML51 ] providing APIs to control playback of encrypted content. The API supports use cases ranging from simple clear key decryption to high value video (given an appropriate user agent implementation). License/key exchange is controlled by the application, facilitating the development of robust playback applications supporting a range of content decryption and protection technologies. This specification does not define a content protection or Digital Rights Management system. Rather, it defines a common API that may be used to discover, select and interact with such systems as well as with simpler content encryption systems. Implementation of Digita

- **2. Definitions.** User agents MUST support the Common Key Systems .
- **2. Definitions.** Other MediaKeys objects, CDM instances, and media elements MUST NOT access the key session or use its key(s).
- **2. Definitions.** All license(s) and key(s) associated with a Key Session which have not been explicitly stored MUST be destroyed when the Key Session is closed.
- **2. Definitions.** Key IDs MUST be unique within a session.
- **2. Definitions.** Each Session ID SHALL be unique within the browsing context in which it was created.
- **2. Definitions.** algorithm returns true , Session IDs MUST be unique within the origin over time, including across browsing sessions.
- **2. Definitions.** (The same key may be present in multiple sessions.) Such keys MUST only be provided to the CDM via an update() call.
- **2. Definitions.** (They may later be loaded by load() as part of the stored session data.) Note Authors SHOULD encrypt each set of stream(s) that requires enforcement of a meaningfully different policy with a distinct key (and key ID).

## Encrypted Media Extensions Level 2

Source: https://www.w3.org/TR/encrypted-media-2/

This specification extends HTMLMediaElement [ HTML ] providing APIs to control playback of encrypted content. The API supports use cases ranging from simple clear key decryption to high value video (given an appropriate user agent implementation). License/key exchange is controlled by the application, facilitating the development of robust playback applications supporting a range of content decryption and protection technologies. This specification does not define a content protection or Digital Rights Management system. Rather, it defines a common API that may be used to discover, select and interact with such systems as well as with simpler content encryption systems. Implementation of Dig

- **2..** User agents MUST support the Common Key Systems .
- **2..** Other MediaKeys objects, CDM instances, and media elements MUST NOT access the key session or use its key(s).
- **2..** All license(s) and key(s) associated with a Key Session which have not been explicitly stored MUST be destroyed when the Key Session is closed.
- **2..** Key IDs MUST be unique within a session.
- **2..** Each Session ID SHALL be unique within the browsing context in which it was created.
- **2..** algorithm returns true , Session IDs MUST be unique within the origin over time, including across browsing sessions.
- **2..** (The same key may be present in multiple sessions.) Such keys MUST only be provided to the CDM via an update () call.
- **2..** The user agent MUST NOT store the Initialization Data or use its content at the time it is encountered.

## Encrypted Media Extensions Initialization Data Format Registry

Source: https://www.w3.org/TR/eme-initdata-registry/

This specification defines the initialization data formats for use with the Encrypted Media Extensions [ ENCRYPTED-MEDIA ]. Some formats may be extracted from media data as defined in the Encrypted Media Extensions Stream Format Registry [ EME-STREAM-REGISTRY ]. All may be provided separately, such as via a manifest or other application data. This registry is non-normative.

- **3. Registration Entry Requirements.** If the underlying format specification is not publicly available, it must be made available to the Working Group for evaluation.
- **3. Registration Entry Requirements.** If the Media Working Group reaches consensus to accept the candidate, send a pull request (either by the registry editors or by the party requesting the candidate registration) to register the candidate that meets the following requirements: Each entry must include a unique initialization data type string.
- **3. Registration Entry Requirements.** Each entry must include a link that references a publicly available registration specification.
- **3. Registration Entry Requirements.** Per the Encrypted Media Extensions specification, entries must be fully specified and support common formats such that instances of the format can be processed in a fully specified and compatible way.

## Encrypted Media Extensions Stream Format Registry

Source: https://www.w3.org/TR/eme-stream-registry/

This specification defines the stream formats for use with the Encrypted Media Extensions [ ENCRYPTED-MEDIA ]. This registry is non-normative.

- **3. Registration Entry Requirements.** If the underlying format specification is not publicly available, it must be made available to the Working Group for evaluation.
- **3. Registration Entry Requirements.** If the Media Working Group reaches consensus to accept the candidate, send a pull request (either by the registry editors or by the party requesting the candidate registration) to register the candidate that meets the following requirements: Each entry must include a unique MIME type / subtype pair.
- **3. Registration Entry Requirements.** If the byte stream format is derived-from an existing file format, then it should use the MIME type / subtype pairs typically used for the file format.
- **3. Registration Entry Requirements.** Each entry must include a link that references a publicly available registration specification.
- **3. Registration Entry Requirements.** Per the Encrypted Media Extensions specification, the media container for a stream format must not be encrypted.
- **3. Registration Entry Requirements.** Per the Encrypted Media Extensions specification, entries must be fully specified and support "common encryption" such that the content can decrypted in a fully specified and compatible way when a key or keys are provided.
