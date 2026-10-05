# Versions and upgrades

Read this when choosing a target version, talking to a transmitter or receiver built on an Implementer's Draft, upgrading one, or deciding whether to use a draft. Sources: the SSF, CAEP and RISC 1.0 Finals, their Implementer's Drafts, and the Shared Signals WG specifications page, all listed in [Sources](../SKILL.md#sources). The Finals carry no change log, so the 1.0 changes below come from comparing the ID3 and Final texts; the earlier changes come from the Document History appendix of each draft.

## Version lines

SSF, CAEP and RISC move together: each line is named after the framework draft, and lists the CAEP and RISC drafts that go with it. The id matches the `spec_version` value a transmitter publishes in its metadata.

| Id        | Line                                    | Status  | Revision                                                                                                              | Posture | Summary                                                                                                           |
| --------- | --------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------- |
| `1.0`     | SSF 1.0, CAEP 1.0, RISC 1.0             | current | Final, 29 August 2025 (`spec_version` `1_0`)                                                                          |         | The default target.                                                                                               |
| `1.0-id3` | SSF 1.0 Implementer's Draft 3           | legacy  | SSF ID3 (draft 03, 25 June 2024), CAEP ID2 (draft 03, 19 June 2024), RISC ID2 (draft 02, 5 April 2022) (`1_0-ID3`)    |         | Last draft before the Finals. Adds `default_subjects`, `txn`, session-established and session-presented.          |
| `1.0-id2` | SSF 1.0 Implementer's Draft 2           | legacy  | SSF ID2 (draft 02, 9 October 2023), CAEP ID1 (draft 02, 9 August 2021), RISC ID2 (draft 02, 5 April 2022) (`1_0-ID2`) |         | First draft under the SSF name: `ssf-configuration`, top-level `sub_id`, URN delivery methods.                    |
| `1.0-id1` | SSE Framework 1.0 Implementer's Draft 1 | legacy  | SSE Framework ID1 (draft 01, 8 June 2021), CAEP ID1 (draft 02, 9 August 2021) (`1_0-ID1`, or `spec_version` absent)   |         | The Shared Signals and Events (SSE) framework: `sse-configuration`, `subject` inside the event, no Create Stream. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

A transmitter that omits `spec_version` is assumed to conform to `1_0-ID1` (SSF §7.1). The `1_0-ID1` line is the June 2021 SSE Framework draft: no document named "Shared Signals Framework ID1" was published, and `openid-sharedsignals-framework-1_0-ID1.html` returns 404.

The CAEP Interoperability Profile has its own revisions (ID1, and working-group draft 01 built on the Finals). It is a profile, not a line of SSF; see [`caep-interop.md`](caep-interop.md).

## Which version to use

- Default to the 1.0 Finals, and publish `"spec_version": "1_0"` in transmitter metadata (SSF §7.1).
- Treat a peer on an Implementer's Draft as input to an upgrade. Read its `spec_version` to pick the line, and map its fields with the upgrade sections below.
- Receivers may accept SETs from a draft-era transmitter while it upgrades, but never send draft-only shapes (a `subject` member for new event types, `sse` event-type URIs, RISC delivery-method URIs) from new code.
- Existing RISC transmitters may keep `/.well-known/risc-configuration`; new services should not use it (SSF §7.2.2).

## What changed

### 1.0 (Final, 29 August 2025)

SSF 1.0 against SSF ID3:

- `spec_version` is `1_0` for the Final (SSF §7.1).
- The sections are reorganised. The SET profile moves from "Profiles" (ID3 §10) into "Events" (§4), delivery into "Event Delivery" (§6), discovery from ID3 §6 to §7, and stream management from ID3 §7 to §8. Update section citations when reading ID3-era material.
- A new `ip-addresses` subject identifier format carries an array of observed IP addresses (§3.5.3).
- A new section says each deployment defines its own event processing, from informational to mandatory enforcement (SSF Prescriptive SETs, §4.1.5).
- The receiver SHOULD validate `aud` in the Create Stream response (§8.1.1.1.1).
- Subject matching rules are defined: simple subjects match when identical, and complex subjects match field by field when each field is undefined on one side or identical (§8.1.3.1).
- A new Transmitter-Supplied `inactivity_timeout` lets the transmitter pause, disable or delete a stream after the receiver is inactive (§8.1.1).

CAEP 1.0 against CAEP ID2:

- New `risk-level-change` event type (CAEP §3.8).

RISC 1.0 against RISC ID2:

- Examples identify the subject with the top-level `sub_id` instead of a `subject` member (RISC §2).
- A Security Considerations section says implementations SHOULD comply with SSF (RISC §4).

### 1.0-id3 (SSF ID3, 25 June 2024)

From the "-03" entries of the SSF ID3 Document History (SSF ID3 Appendix C):

- `default_subjects` in transmitter metadata, `ALL` or `NONE`, states whether new streams include subjects by default (SSF ID3 §6.1).
- The `txn` claim is described (SSF ID3 §10.2.3).
- The stream management API must be authorized; fields in the stream configuration are marked OPTIONAL or REQUIRED; the status response includes `stream_id` (SSF ID3 §7.1).
- The receiver should validate the issuer information (SSF ID3 §6.2.4).
- `spec_version` is `1_0-ID3` (SSF ID3 §6.1).

From the "-03" entries of the CAEP ID2 Document History (CAEP ID2 Appendix C):

- New `session-established` and `session-presented` event types (CAEP ID2 §3.6, §3.7).
- `namespace` is a required field of `assurance-level-change` (CAEP ID2 §3.4).
- References to SSE are renamed SSF, and subjects in examples carry `format`.

### 1.0-id2 (SSF ID2, 9 October 2023)

From the "-02" entries of the SSF ID2 Document History (SSF ID2 Appendix C):

- SSE is renamed Shared Signals: metadata moves from `/.well-known/sse-configuration` to `/.well-known/ssf-configuration` (SSF ID2 §6.2.1; SSE ID1 §6.2.1), and stream event types move from `https://schemas.openid.net/secevent/sse/event-type/` to `https://schemas.openid.net/secevent/ssf/event-type/`.
- `spec_version` is added to the metadata, with `1_0-ID1` assumed when absent (SSF ID2 §6.1).
- A top-level `sub_id` claim MUST describe the primary subject. Existing CAEP and RISC event types MAY still use `subject` inside the event, and new event types MUST NOT (SSF ID2 §3.1).
- Delivery methods are URNs, `urn:ietf:rfc:8935` and `urn:ietf:rfc:8936`, replacing `https://schemas.openid.net/secevent/risc/delivery-method/push` and `.../poll` (SSF ID2 §10.2; SSE ID1 §11.2.1).
- `jwks_uri` changes from REQUIRED to OPTIONAL (SSF ID2 §6.1; SSE ID1 §6.1).
- Streams get a `stream_id`, are created with `POST` and deleted with `DELETE`, and creating an existing stream returns 409 (SSF ID2 §7.1.1.1, §7.1.1.5). SSE ID1 defined only reading, updating and removing a stream configuration (SSE ID1 §7.1.2).
- Subject formats `jwt-id` and `saml-assertion-id` become `jwt_id` and `saml_assertion_id`; complex subjects carry `format`; `format` is removed from the stream configuration (SSF ID2 §3; SSE ID1 §3.4).

### 1.0-id1 (SSE Framework ID1, 8 June 2021)

The first framework Implementer's Draft, under the name "Shared Signals and Events Framework". CAEP ID1 (draft 02, 9 August 2021) defines its event types against it. It replaces the standalone "OpenID RISC Profile of IETF Security Events 1.0" Implementer's Draft (24 April 2018), which published metadata at `/.well-known/risc-configuration`; SSF 1.0 still allows that path for existing RISC transmitters (SSF §7.2.2).

## Upgrading

### 1.0-id3 to 1.0

1. Change the version marker: publish `"spec_version": "1_0"` (SSF §7.1).
2. Replace removed or renamed parts: there are no renamed fields. Re-map section citations from ID3 to the Final numbering (ID3 §6 to §7, ID3 §7 to §8, ID3 §10 to §4 and §6).
3. Validate against the target: receivers validate `aud` in Create Stream responses (§8.1.1.1.1); transmitters apply the subject matching rules (§8.1.3.1); both sides accept `ip-addresses` subjects (§3.5.3) and the CAEP `risk-level-change` event (CAEP §3.8). Run the SSF conformance tests for the role.
4. Keep behaviour unchanged: the same streams carry the same event types to the same receivers. If `inactivity_timeout` is adopted, document it so receivers do not lose streams silently (§8.1.1).

### 1.0-id2 to 1.0-id3

1. Change the version marker: `1_0-ID3` (SSF ID3 §6.1), or go straight to `1_0`.
2. Replace removed or renamed parts: nothing is renamed. Add `default_subjects` if the transmitter's default is known, and add `stream_id` to status responses (SSF ID3 §6.1, §7.1.2).
3. Validate against the target: the stream management API rejects unauthorized calls (SSF ID3 §7.1), and `assurance-level-change` events carry `namespace` (CAEP ID2 §3.4).
4. Keep behaviour unchanged: the same subjects stay in the same streams.

### 1.0-id1 to 1.0-id2

1. Change the version marker: publish `spec_version` (`1_0-ID2`, or `1_0` when going to the Final) (SSF ID2 §6.1). Without it, receivers assume `1_0-ID1`.
2. Replace removed or renamed parts:
   - Serve metadata at `/.well-known/ssf-configuration`, keeping `/.well-known/sse-configuration` only during the transition (SSF ID2 §6.2.1).
   - Change `https://schemas.openid.net/secevent/sse/event-type/verification` and `stream-updated` to the `ssf` paths.
   - Change delivery methods to `urn:ietf:rfc:8935` and `urn:ietf:rfc:8936` (SSF ID2 §10.2).
   - Add the top-level `sub_id` to every SET. Keep `subject` inside existing CAEP and RISC events only for receivers that still read it, and never use it for new event types (SSF ID2 §3.1).
   - Rename `jwt-id` and `saml-assertion-id` subject formats to `jwt_id` and `saml_assertion_id` (SSF ID2 §3).
   - Support Create Stream and Delete Stream, and return 409 for an existing stream (SSF ID2 §7.1.1.1, §7.1.1.5).
3. Validate against the target: discovery, stream CRUD, verification and SET validation pass the checks in [`transmitter.md`](transmitter.md) and [`receiver.md`](receiver.md).
4. Keep behaviour unchanged: the same subjects receive the same events; renaming URIs must not drop or duplicate events in flight.

### Any Implementer's Draft to 1.0

Apply the sections above in order from the peer's `spec_version` to `1_0`. A RISC transmitter that predates SSE (the 2018 RISC profile) may keep `/.well-known/risc-configuration` (SSF §7.2.2), but otherwise follows the 1.0-id1 to 1.0-id2 steps, including `sub_id` and URN delivery methods. Replace the deprecated RISC `sessions-revoked` event with CAEP `session-revoked` (RISC §2.11), and do not use the `subject_type` field name (RISC §3.1).

## Preview

No preview is listed. No draft of a line after 1.0 has been published: the Shared Signals WG specifications page lists the 1.0 Finals and their Implementer's Drafts, and the working-group editors' copies of SSF and CAEP still carry the 1.0 text. The CAEP Interoperability Profile draft 01 is a revision of a separate profile, tracked in [`caep-interop.md`](caep-interop.md).

When the working group publishes a draft of the next SSF, CAEP or RISC line, add it here as a preview with its posture. When it ships, make it current, make 1.0 supported, and add a "1.0 to next" upgrade section.
