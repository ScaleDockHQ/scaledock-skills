# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## GBFS 3.0

Source: https://raw.githubusercontent.com/MobilityData/gbfs/v3.0/gbfs.md

This document explains the types of files and data that comprise the General Bikeshare Feed Specification (GBFS) and defines the fields used in all of those files.

- **document.** ## Terminology The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [RFC2119](https://tools.ietf.org/html/rfc2119), [BCP 14](https://tools.ietf.org/html/bcp14) and [RFC8174](https://tools.ietf.org/html/rfc8174) when, and only when, they appear in…
- **document.** (https://geojson.org/) * REQUIRED - The field MUST be included in the dataset, and a value MUST be provided in that field for each record.
- **document.** * Conditionally REQUIRED - The field or file is REQUIRED under certain conditions, which are outlined in the field or file description.
- **document.** ## Files File Name | REQUIRED | Defines ---|---|--- gbfs.json | Yes _(as of v2.0)_ | Auto-discovery file that links to the other files published for the system.
- **document.** To avoid circular references this file MUST NOT contain links to `manifest.json`.
- **document.** manifest.json _(added in v3.0)_ | Conditionally REQUIRED | Required of any GBFS dataset provider that publishes more than one GBFS dataset.
- **document.** For example, if you publish one set of files for Berlin and a different set for Paris, this file is REQUIRED.
- **document.** vehicle_types.json _(added in v2.1)_ | Conditionally REQUIRED | Describes the types of vehicles that System operator has available for rent.
