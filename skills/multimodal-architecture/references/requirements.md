# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Multimodal Architecture and Interfaces

Source: https://www.w3.org/TR/mmi-arch/

This document describes a loosely coupled architecture for multimodal user interfaces, which allows for co-resident and distributed implementations, and focuses on the role of markup and scripting, and the use of well defined interfaces between its constituents.

- **1 Conformance.** The key words MUST , MUST NOT , REQUIRED , SHALL , SHALL NOT , SHOULD , SHOULD NOT , RECOMMENDED , MAY , and OPTIONAL in this specification are to be interpreted as described in [IETF RFC 2119] .
- **5.2.1 The Interaction.** Manager All life-cycle events that the Modality Components generate MUST be delivered to the Interaction Manager.
- **5.2.1 The Interaction.** All life-cycle events that are delivered to Modality Components MUST be sent by the Interaction Manager.
- **5.2.1 The Interaction.** If the Interaction Manager does not contain an explicit handler for an event, it MUST respect any default behavior that has been established for the event.
- **5.2.1 The Interaction.** If there is no default behavior, the Interaction Manager MUST ignore the event.
- **5.2.4.1 The Event Transport.** We place the following requirements on all transport mechanisms: Events MUST be delivered reliably.
- **5.2.4.1 The Event Transport.** In particular, the event delivery mechanism MUST report an error if an event can not be delivered, for example if the destination endpoint is unavailable.
- **5.2.4.1 The Event Transport.** Events MUST be delivered to the destination in the order in which the source generated them.
