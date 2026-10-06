# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## GTFS Schedule

Source: https://gtfs.org/schedule/reference/

This document defines the format and structure of the files that comprise a GTFS dataset.

- **Document Conventions &para;.** The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", “SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in RFC 2119 .
- **Linked trips &para;.** The trips linked together MUST be operated by the same vehicle.
- **Linked trips &para;.** The last stop of from_trip_id SHOULD be geographically close to the first stop of to_trip_id , and the last arrival time of from_trip_id SHOULD be prior but close to the first departure time of to_trip_id .
- **Linked trips &para;.** For example, two train trips (trip A and trip B in the diagram below) can merge into a single train trip (trip C) after a vehicle coupling operation at a common station: In a 1-to-n continuation, the trips.service_id for each to_trip_id MUST be identical.
- **Linked trips &para;.** In an n-to-1 continuation, the trips.service_id for each from_trip_id MUST be identical.
- **Linked trips &para;.** Trips may be linked together as part of multiple distinct continuations, provided that the trip.service_id MUST NOT overlap on any day of service.
- **Term Definitions &para;.** Datasets should be published at a public, permanent URL, including the zip file name.
- **Term Definitions &para;.** Text-to-speech field - The field should contain the same information than its parent field (on which it falls back if it is empty).

## GTFS Realtime

Source: https://gtfs.org/realtime/reference/

A GTFS Realtime feed lets transit agencies provide consumers with realtime information about disruptions to their service (stations closed, lines not operating, important delays, etc.) location of their vehicles, and expected arrival times.

- **message TripDescriptor &para;.** If this field is provided, the trip_id , route_id , direction_id , start_time , start_date fields of the TripDescriptor MUST be left empty, to avoid confusion by consumers that aren't looking for the ModifiedTripSelector value.
- **message TripModifications &para;.** Producers SHOULD only transmit detours occurring within the next week.
- **message ReplacementStop &para;.** The stop MUST have location_type=0 (routable stops).
- **message ReplacementStop &para;.** This value MUST be monotonically increasing and may only be a negative number if the first stop of the original trip is the reference stop.
- **Required &para;.** In GTFS-realtime v2.0 and higher, the Required column describes what fields must be provided by a producer in order for the transit data to be valid and make sense to a consuming application.
- **Required &para;.** The following values are used in the Required field: Required : This field must be provided by a GTFS-realtime feed producer.
- **message FeedMessage &para;.** If there is real-time information available for the transit system, this field must be provided.
- **message FeedMessage &para;.** If this field is empty, consumers should assume there is no real-time information available for the system.
