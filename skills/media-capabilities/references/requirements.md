# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Media Capabilities

Source: https://www.w3.org/TR/media-capabilities/

This specification intends to provide APIs to allow websites to make an optimal decision when picking media content for the user. The APIs will expose information about the decoding and encoding capabilities for a given format but also output capabilities to find the best match based on the device’s display.

- **2.1.1. MediaConfiguration.** For a MediaConfiguration to be a valid MediaConfiguration , all of the following conditions MUST be true: audio and/or video MUST exist .
- **2.1.1. MediaConfiguration.** audio MUST be a valid audio configuration if it exists .
- **2.1.1. MediaConfiguration.** video MUST be a valid video configuration if it exists .
- **2.1.1. MediaConfiguration.** For a MediaDecodingConfiguration to be a valid MediaDecodingConfiguration , all of the following conditions MUST be true: It MUST be a valid MediaConfiguration .
- **2.1.1. MediaConfiguration.** If keySystemConfiguration exists : The type MUST be media-source or file .
- **2.1.1. MediaConfiguration.** If keySystemConfiguration.audio exists , audio MUST also exist .
- **2.1.1. MediaConfiguration.** If keySystemConfiguration.video exists , video MUST also exist .
- **2.1.1. MediaConfiguration.** For a MediaDecodingConfiguration to describe [ENCRYPTED-MEDIA] , a keySystemConfiguration MUST exist .
