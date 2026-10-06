# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published text, quoted as written (only line breaks and hyphenation from PDF layout were joined). Apply the ones that match the role. Each is labelled with the nearest section, clause or article in the published document.

## OpenADR 3.1.0 openapi3.yaml

Source: https://raw.githubusercontent.com/grid-coordination/openadr3-specification/17b91725e0f07203574ddc946e28def31cb11e44/3.1.0/openadr3.yaml

- **`securitySchemes.oAuth2ClientCredentials` scopes.** read_targets: VENs may only read objects with targets by providing matching targets
- **`securitySchemes.oAuth2ClientCredentials` scopes.** read_ven_objects: VENs may only read objects whose clientID matches their own
- **`securitySchemes.oAuth2ClientCredentials` scopes.** write_programs: Only BL can write to programs
- **`securitySchemes.oAuth2ClientCredentials` scopes.** write_events: Only BL can write to events
- **`securitySchemes.oAuth2ClientCredentials` scopes.** write_reports: only VENs can write to reports
- **`clientCredentialRequest.grant_type`.** OAuth2 grant type, must be 'client_credentials'
- **`clientCredentialResponse.token_type`.** token type, must be Bearer.
- **`subscription.objectOperations.bearerToken`.** To avoid custom integrations, callback endpoints should accept the provided bearer token to authenticate VTN requests.
- **`notifiersResponse.WEBHOOK`.** 'Currently MUST be true'
- **`objectID`.** URL safe VTN assigned object ID.
- **`venName`.** venName is expected to be unique within the scope of a VTN
- **`event.priority`.** Relative priority of event. A lower number is a higher priority.
- **`interval.id`.** A client generated number assigned an interval object. Not a sequence number.
- **`intervalPeriod`.** A start of "0001-01-01" or "0001-01-01T00:00:00" may indicate 'now'. See User Guide. A duration of "P9999Y" may indicate infinity.
- **`dateTime`.** datetime in RFC 3339 format
- **`duration`.** duration in ISO 8601 format
- **`resourceName`.** A value of AGGREGATED_REPORT indicates an aggregation of more that one resource's data
- **`problem.type`.** An absolute URI that identifies the problem type. When dereferenced, it SHOULD provide human-readable documentation for the problem type (e.g., using HTML).

## Enumeration schemas: event interval payloads

Source: https://raw.githubusercontent.com/oadr3-org/openadr3-schemas/80b67b43e698a70256ae76298935396b3c9fe13e/OpenADR_Alliance/event-interval-payloads.schema.yaml

- **`SIMPLE`.** An indication of the level of a basic demand response signal. Payload value is an integer of 0, 1, 2, or 3.
- **`PRICE`.** The price of energy. Payload value is a float. Units and currency defined in associated eventPayloadDescriptor.
