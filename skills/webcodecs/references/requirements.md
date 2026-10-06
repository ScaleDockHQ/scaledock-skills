# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## WebCodecs

Source: https://www.w3.org/TR/webcodecs/

This specification defines interfaces to codecs for encoding and decoding of audio, video, and images. This specification does not specify or require any particular codec or method of encoding or decoding. The purpose of this specification is to provide JavaScript interfaces to implementations of existing codec technology developed elsewhere. Implementers are free to support any combination of codecs or none at all.

- **1. Definitions.** The underlying codec implementation MUST emit all outputs in response to a flush.
- **1. Definitions.** Such resources MAY be quickly exhausted and SHOULD be released immediately when no longer in use.
- **3.1. Internal Slots.** [[key chunk required]] A boolean indicating that the next chunk passed to decode() MUST describe a key chunk as indicated by [[type]] .
- **3.5. Methods.** Implementers SHOULD inspect the chunk ’s [[internal data]] to verify that it is truly a key chunk .
- **4.1. Internal Slots.** [[key chunk required]] A boolean indicating that the next chunk passed to decode() MUST describe a key chunk as indicated by type .
- **5.6. Algorithms.** The User Agent MUST ensure that the provided description could be used to correctly decode output.
- **6.6. Algorithms.** The User Agent MUST ensure that the configuration is completely described such that outputConfig could be used to correctly decode output .
- **7.4. Codec String.** A valid codec string MUST meet the following conditions.

## WebCodecs Codec Registry

Source: https://www.w3.org/TR/webcodecs-codec-registry/

This registry is intended to enhance interoperability among implementations and users of [WEBCODECS] . In particular, this registry provides the means to identify and avoid collisions among codec strings and provides a mechanism to define codec-specific members of [WEBCODECS] codec configuration dictionaries. This registry is not intended to include any information on whether a codec format is encumbered by intellectual property claims. Implementers and users are advised to seek appropriate legal counsel in this matter if they intend to implement or use a specific codec format. Implementers of WebCodecs are not required to support any particular codec nor registry entry.

- **2. Registration Entry Requirements.** Where applicable, an audio codec registration specification SHOULD describe how AudioDecoder ’s [[priming samples to discard]] internal slot is initialized from the description and updated from decoded chunks.
- **2. Registration Entry Requirements.** If the codec specification is not publicly available, it must be made available to the Working Group for evaluation.
- **2. Registration Entry Requirements.** The codec string requirements are as follows: If the codec string contains a fixed prefix with variable suffix values, the suffix must be represented by an asterisk and the registration’s public specification must describe how to fully qualify the variable portion of the string.
- **2. Registration Entry Requirements.** Otherwise, if the codec is recognized by multiple strings, a single preferred string should be listed and the registration’s specification must list the other allowed strings.
- **2. Registration Entry Requirements.** Each registration’s specification must include a sequence of sections describing: Recognized codec strings.
