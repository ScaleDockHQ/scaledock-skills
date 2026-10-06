# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences the extractor found (shall or must). Apply the ones that match the role. Section headings are the nearest article, section or clause marker in the published document.

## OCPI 2.2.1 locations

Source: https://raw.githubusercontent.com/ocpi/ocpi/2.2.1/mod_locations.asciidoc

Open Charge Point Interface (OCPI) 2.2.1, from the 2.2.1 tag. This skill pins the locations, sessions, tokens, CDRs, commands and tariffs modules fetched from that tag.

- **text.** When the CPO wants to delete an EVSE from the list of active EVSEs, they MUST update the EVSE's `status` field to `REMOVED` and call the <<mod_locations_put_method,PUT>> or <<mod_locations_patch_method,PATCH>> on the eMSP system.
- **2.2.** In order for this to work properly, the following logic MUST be implemented accordingly: If an EVSE is updated, also the 'parent' Location's `last_updated` field needs to be updated.
- **text.** When the PUT only contains a <<mod_locations_evse_object,EVSE>> Object, the Receiver SHALL also set the new `last_updated` value on the parent <<mod_locations_location_object,Location>> Object.
- **text.** When the PUT contains a <<mod_locations_connector_object,Connector>> Object, the Receiver SHALL also set the new `last_updated` value on the parent <<mod_locations_evse_object,EVSE>> and <<mod_locations_location_object,Location>> Objects.
- **2.2.** When the PATCH is on a <<mod_locations_connector_object,Connector>> Object, the Receiver SHALL also set the new `last_updated` value on the parent <<mod_locations_evse_object,EVSE>> and <<mod_locations_location_object,Location>> Objects.
- **2.2.** Locations that have this flag set to `false` SHALL not be shown in an app or on a website etc.

## OCPI 2.2.1 sessions

Source: https://raw.githubusercontent.com/ocpi/ocpi/2.2.1/mod_sessions.asciidoc

Open Charge Point Interface (OCPI) 2.2.1, from the 2.2.1 tag. This skill pins the locations, sessions, tokens, CDRs, commands and tariffs modules fetched from that tag.

- **text.** [[mod_sessions_reservation]] ==== Reservation When a EV driver makes a Reservation for a Charge Point/EVSE, the Sender SHALL create a new Session object with `status` = `RESERVED` When the Push model is used, the CPO SHALL push the new Session object to the Receiver.
- **text.** [[mod_sessions_msp_get_request_parameters]] ====== Request Parameters The following parameters shall be provided as URL segments.
- **text.** If the new <<mod_sessions_session_object,Session>> object does not contain `charging_periods` (field is omitted or contains any empty list), the `charging_periods` of the existing object SHALL be removed (replaced by the new empty list).
- **text.** This SHALL be the same value as the `party_id` in the Session object being pushed.
- **text.** If existing <<mod_cdrs.asciidoc#mod_cdrs_chargingperiod_class,ChargingPeriod>> objects in a <<mod_sessions_session_object,Session>> need to be replaced or removed, the Sender SHALL use the <<mod_sessions_msp_put_method,PUT>> method to replace the entire <<mod_sessions_session_object,Session>> object (including all the `charging_periods`).
- **text.** When the eMSP provided an `authorization_reference` in either: <<mod_tokens.asciidoc#mod_tokens_real-time_authorization,real-time authorization>>, <<mod_commands.asciidoc#mod_commands_startsession_object,StartSession>> or <<mod_commands.asciidoc#mod_commands_reservenow_object,ReserveNow>> this field SHALL contain the same value.

## OCPI 2.2.1 tokens

Source: https://raw.githubusercontent.com/ocpi/ocpi/2.2.1/mod_tokens.asciidoc

Open Charge Point Interface (OCPI) 2.2.1, from the 2.2.1 tag. This skill pins the locations, sessions, tokens, CDRs, commands and tariffs modules fetched from that tag.

- **text.** NOTE: If real-time authorization is asked for a location, the eMSP SHALL NOT validate that charging is possible based on information like opening hours or EVSE status etc.
- **text.** This SHALL be the same value as the `country_code` in the Token object being pushed.
- **text.** Examples: `+https://www.server.com/ocpi/emsp/2.2/tokens/012345678/authorize+` `+https://ocpi.server.com/2.2/tokens/012345678/authorize?type=RFID+` When the eMSP does not know the Token, the eMSP SHALL respond with an HTTP status code: 404 (Not Found).
- **text.** |=== [[mod_tokens_post_response_data]] ====== Response Data When the token is known by the Sender, the response SHALL contain a <<mod_tokens_authorizationinfo_object,AuthorizationInfo>> object.
- **text.** If a Token is: `valid = false`, when the `whitelist` field requires real-time authorization, the CPO SHALL do a <<mod_tokens_real-time_authorization,real-time authorization>>, the state of the Token might have changed.
- **text.** But when the CPO cannot get a response from the eMSP (communication between CPO and eMSP is offline), the CPO shall allow this Token to be used.

## OCPI 2.2.1 CDRs

Source: https://raw.githubusercontent.com/ocpi/ocpi/2.2.1/mod_cdrs.asciidoc

Open Charge Point Interface (OCPI) 2.2.1, from the 2.2.1 tag. This skill pins the locations, sessions, tokens, CDRs, commands and tariffs modules fetched from that tag.

- **text.** This credit CDR SHALL have a different CDR.id which can be a completely different number, or it can be the id of the original CDR with something appended like for example: `-C` to make it unique again.
- **text.** The Credit CDR references the old CDR via the <<mod_cdrs_cdr_object,`credit_reference_id`>> field, which SHALL contain the <<mod_cdrs_cdr_object,`id`>> of the original CDR.
- **2.2.** The _CDR_ object shall always contain information like Location, EVSE, Tariffs and Token as they were _at the start_ of the charging session.
- **text.** When another Tariff Element becomes active, the CPO SHALL add a new Charging Period with at least all the relevant information for the change to the other Tariff Element.
- **text.** When the price of a Tariff is higher when the EV is charging faster than 32A, a new Charging Period SHALL be added the moment the charging power goes over 32A.
- **text.** When the eMSP provided an `authorization_reference` in either: <<mod_tokens.asciidoc#mod_tokens_real-time_authorization,real-time authorization>>, <<mod_commands.asciidoc#mod_commands_startsession_object,StartSession>> or <<mod_commands.asciidoc#mod_commands_reservenow_object,ReserveNow>>, this field SHALL contain the same value.

## OCPI 2.2.1 commands

Source: https://raw.githubusercontent.com/ocpi/ocpi/2.2.1/mod_commands.asciidoc

Open Charge Point Interface (OCPI) 2.2.1, from the 2.2.1 tag. This skill pins the locations, sessions, tokens, CDRs, commands and tariffs modules fetched from that tag.

- **text.** |=== [[mod_commands_cpo_post_request_body]] ===== Request Body Depending on the `command` parameter the body SHALL contain the applicable object for that command.
- **text.** The Token provided by the eMSP for the `ReserveNow` SHALL be authorized by the eMSP before sending it to the CPO.
- **text.** If this is an OCPP Charge Point, the Charge Point decides if it needs to validate the given Token, in such case: - If this Token is of type `AD_HOC_USER` or `APP_USER` the CPO SHALL NOT do a <<mod_tokens.asciidoc#mod_tokens_real-time_authorization,realtime authorization>> at the eMSP for this.
- **text.** An eMSP sending a `ReserveNow` SHALL only use Tokens that are owned by this eMSP.
- **text.** The CPO SHALL make sure the Reservation ID sent to the Charge Point is unique and is not used by another Sender (eMSP).
- **text.** If this Token is of type: `RFID`, the CPO SHALL NOT do a <<mod_tokens.asciidoc#mod_tokens_real-time_authorization,realtime authorization>> at the eMSP for this Token at the given EVSE/Charge Point within 15 minutes after having received this `StartSession`.

## OCPI 2.2.1 tariffs

Source: https://raw.githubusercontent.com/ocpi/ocpi/2.2.1/mod_tariffs.asciidoc

Open Charge Point Interface (OCPI) 2.2.1, from the 2.2.1 tag. This skill pins the locations, sessions, tokens, CDRs, commands and tariffs modules fetched from that tag.

- **text.** [[mod_tariffs_msp_get_request_parameters]] ====== Request Parameters The following parameters SHALL be provided as URL segments.
- **text.** |=== [[mod_tariffs_msp_put_request_parameters]] ====== Request Parameters The following parameters SHALL be provided as URL segments.
- **text.** This SHALL be the same value as the `country_code` in the Tariff object being pushed.
- **text.** [[mod_tariffs_msp_delete_request_parameters]] ====== Request Parameters The following parameters SHALL be provided as URL segments.
- **text.** When a Tariff contains both the `tariff_alt_text` and `elements` fields, the `tariff_alt_text` SHALL only contain additional tariff information in human-readable text, not the price information that is also available via the `elements` field.
- **text.** This restriction can make a TariffElement become active when the charging current is above the defined value, but the TariffElement MUST no longer be active when the charging current drops below the defined value.
