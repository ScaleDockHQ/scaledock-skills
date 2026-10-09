# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published text, quoted as written (only line breaks and hyphenation from PDF layout were joined). Apply the ones that match the role. Each is labelled with the nearest section, clause or article in the published document.

## Files and publishing

Source: https://raw.githubusercontent.com/MobilityData/gbfs/v3.0/gbfs.md

- **Term Definitions.** REQUIRED - The field MUST be included in the dataset, and a value MUST be provided in that field for each record.
- **Files.** To avoid circular references this file MUST NOT contain links to `manifest.json`.
- **Files.** Vehicles that are part of an active rental MUST NOT appear in this feed.
- **Accessibility.** To be compliant with GBFS, all systems MUST have an entry in the [systems.csv](https://github.com/MobilityData/gbfs/blob/master/systems.csv) file.
- **Feed Availability.** Producers MUST provide a technical contact who can respond to feed outages in the `feed_contact_email` field in the `system_information.json` file.
- **Seasonal Shutdowns, Disruptions of Service, Termination of Service.** Feeds SHOULD continue to be published during seasonal or temporary shutdowns.
- **File Requirements.** All files MUST be valid JSON
- **File Requirements.** All data MUST be UTF-8 encoded
- **File Distribution.** REQUIRED files MUST NOT 404. They MUST return a properly formatted JSON file as defined in [Output Format](#output-format).
- **Version Endpoints.** All endpoints within a data set SHOULD conform to the same MAJOR or MINOR version.
- **Localization.** Each supported language MUST be listed in the `languages` field in `system_information.json`.
- **Data Latency.** The data returned by the near-realtime endpoints `station_status.json` and `vehicle_status.json` SHOULD be as close to realtime as possible, but in no case should it be more than 5 minutes out-of-date.

## Field types

Source: https://raw.githubusercontent.com/MobilityData/gbfs/v3.0/gbfs.md

- **Field Types, Boolean.** Boolean values MUST be JSON booleans, not strings (meaning `true` or `false`, not `"true"` or `"false"`).
- **Field Types, Enum.** Enum values MUST (as of v3.0) be lowercase.
- **Field Types, ID.** An exception is `vehicle_id`, which MUST NOT be persistent for privacy reasons (see `vehicle_status.json`).
- **Field Types, Phone Number.** The characters following the "+" MUST be integers and MUST NOT contain any hyphens, spaces or parentheses.
- **Field Types, Timestamp.** Timestamp fields MUST be represented as strings in [RFC3339 format](https://www.rfc-editor.org/rfc/rfc3339), for example `2023-07-17T13:34:13+02:00`.

## Feed files

Source: https://raw.githubusercontent.com/MobilityData/gbfs/v3.0/gbfs.md

- **gbfs.json.** The key MUST be the base file name defined in the spec for the corresponding feed type ( `system_information` for `system_information.json` file, `station_information` for `station_information.json` file).
- **system_information.json.** Each distinct system or geographic area in which vehicles are operated MUST have its own unique `system_id`.
- **station_information.json.** Any station that is represented in `station_information.json` MUST have a corresponding entry in `station_status.json`.
- **station_status.json.** If the station is temporarily taken out of service and not allowing rentals, this field MUST be set to `false`.
- **vehicle_status.json.** Vehicles that are not accessible (for example, in a warehouse or in transit) MUST NOT appear as available for rental.
- **vehicle_status.json.** The `vehicle_id` identifier MUST be rotated to a random string after each trip to protect user privacy
