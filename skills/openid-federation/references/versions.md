# Versions and upgrades

Read this when choosing a target version, meeting an implementation built on a pre-Final draft, or moving between Federation 1.0 and 1.1. Sources: OpenID Federation 1.1 (Federation), OpenID Federation for OpenID Connect 1.1 (Federation Connect), OpenID Federation 1.0 (Federation 1.0), OpenID Federation 1.0 draft 49 with its Document History (draft 49), the fourth Implementer's Draft (ID4) and OpenID Connect Federation 1.0 ID3, listed in [Sources](../SKILL.md#sources).

## Version lines

| Id          | Line                         | Status    | Revision                                                                            | Posture | Summary                                                                                                 |
| ----------- | ---------------------------- | --------- | ----------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------- |
| `1.1`       | OpenID Federation 1.1        | current   | Final, Federation 1.1 and Federation for OpenID Connect 1.1 (5 May 2026)            |         | The default target. The 1.0 rules split into a protocol-independent and an OpenID Connect document.     |
| `1.0`       | OpenID Federation 1.0        | supported | Final (17 February 2026)                                                            |         | The same rules in one document. Valid when a federation names 1.0.                                      |
| `1.0-draft` | OpenID Federation 1.0 drafts | legacy    | Implementer's Drafts ID1 to ID4 (ID4 is draft 36, 31 May 2024), and drafts up to 49 |         | Pre-Final drafts, still deployed. Read them and upgrade; claim names and error codes changed after ID4. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

The first three Implementer's Drafts were published as "OpenID Connect Federation 1.0" (ID1 is draft 04, ID2 draft 10, ID3 draft 17, 9 September 2021). ID4 (draft 36) carries the current name.

## Which version to use

- Build against Federation 1.1, citing Federation for the trust layer and Federation Connect for OpenID Connect and OAuth 2.0 registration.
- Use Federation 1.0 when the federation's policy or a conformance profile names it. The wire format is the same, so a 1.0 and a 1.1 entity interoperate: Federation 1.1 introduces no functionality not present in Federation 1.0 (Federation § 1), and it relies on the IANA registrations made in Federation 1.0 § 20 (Federation § 20).
- Treat an entity built on a draft, most often ID4, as input to an upgrade. Accept its statements only after mapping the renamed parameters below, and never emit draft names.
- The Subordinate Events Endpoint and Extended Subordinate Listing are extensions with their own Implementer's Drafts, not a next Federation line. They stay in [`endpoints.md`](endpoints.md) at posture track.

## What changed

### OpenID Federation 1.1

- The single 1.0 document is split. Federation holds Entity Statements, Trust Chains, Metadata, Policies, Trust Marks and the Federation Endpoints; Federation Connect holds OpenID Connect and OAuth 2.0 client registration (Federation § 1, Federation Connect § 1).
- No new functionality, claims or endpoints (Federation § 1). Section numbers differ between the documents; cite the document the rule is in.

### OpenID Federation 1.0 (from the drafts)

The changes since ID4 (draft 36), from the Document History of draft 49 (Appendix C). The Final follows draft 49 and does not carry the history.

- Trust mark identifier: the trust mark claim `id` became `trust_mark_id` in draft 42 and `trust_mark_type` in draft 43 (Federation 1.0 § 7.1).
- Resolve request: `anchor` became `trust_anchor` and `type` became `entity_type`, and the `trust_anchor_id` claim became `trust_anchor`, in draft 41 (Federation 1.0 § 8.3.1). Several Trust Anchor values may be passed, and the resolve response requires `trust_chain` (draft 42, Federation 1.0 § 8.3.2).
- Error codes: `validation_failed` became `trust_chain_validation_failed` in draft 40 and `invalid_trust_chain` in draft 41; `missing_trust_anchor` became `invalid_trust_anchor` in draft 41 (Federation 1.0 § 8.9).
- Trust Mark Status: the endpoint takes the trust mark itself instead of `sub` and `trust_mark_id` (draft 43), and the response is signed, with more status values (draft 44) (Federation 1.0 § 8.4, § 15.7).
- Metadata policy: operator combinations were reworked in draft 42, `subset_of` with an empty intersection now yields an empty value instead of removing the parameter (draft 42), and `value` and `default` no longer need to support JSON object values (draft 43) (Federation 1.0 § 6.1.3.1).
- Informational metadata: `homepage_uri` became `organization_uri`, and `display_name`, `description`, `keywords` and `information_uri` were added, in draft 43 (Federation 1.0 § 5.2.2).
- New claims and header parameters: `trust_anchor_hints` and the `peer_trust_chain` header parameter (draft 45). The `trust_chain` header parameter is RECOMMENDED over the older `trust_chain` request parameter and Trust Chain request body, which stay for historical reasons (draft 45, Federation 1.0 § 3.1.2, § 4.3, § 4.4). Entity Configurations and Subordinate Statements MUST NOT contain `peer_trust_chain` (draft 46).
- Explicit Registration responses use `application/explicit-registration-response+jwt` instead of `application/entity-statement+jwt`, and every `aud` is the single Entity Identifier of the recipient (draft 41, Federation 1.0 § 12.2.3, § 15.8).
- Loops in Trust Chains are prohibited (draft 42, Federation 1.0 § 10.1). Signed JWK Set JWTs require `kid` (draft 41).
- Relaxations in draft 44: a Leaf SHOULD, rather than MUST, publish its Entity Configuration at `/.well-known/openid-federation`, and may omit it when its registration method already gives the server its Entity Configuration, while Trust Anchors, Intermediates and any entity with `federation_entity` metadata MUST still publish it (Federation 1.0 § 9). Profiles MAY define Entity Identifiers other than `https` URLs (Federation 1.0 § 1.2). `client_registration_types` is RECOMMENDED rather than REQUIRED.
- Draft 49 references, rather than defines, the error values `invalid_request`, `server_error` and `temporarily_unavailable`.

## Upgrading

### 1.0 to 1.1

1. Change the cited revision to Federation 1.1 and Federation Connect 1.1. Nothing on the wire carries a version marker, so entities and statements stay as they are.
2. No fields are removed or renamed. Map each section citation to the document that now holds it: registration rules move to Federation Connect.
3. Validate against the rules of both 1.1 documents, using the checks in [`trust-chains.md`](trust-chains.md) and [`registration.md`](registration.md).
4. Keep behaviour unchanged: the same chains resolve to the same Resolved Metadata.

### Drafts to 1.0 or 1.1

1. Identify the draft from the implementation's documentation or its parameters: `anchor` in resolve requests or an `id` claim in trust marks means ID4 or earlier. Target 1.1 unless the federation names 1.0.
2. Replace renamed fields: trust mark `id` or `trust_mark_id` to `trust_mark_type`; resolve `anchor` to `trust_anchor` and `type` to `entity_type`; `homepage_uri` to `organization_uri`; error codes `validation_failed` and `trust_chain_validation_failed` to `invalid_trust_chain`, and `missing_trust_anchor` to `invalid_trust_anchor`.
3. Re-implement changed behaviour: Trust Mark Status takes the trust mark and returns a signed `application/trust-mark-status-response+jwt`; Explicit Registration responses use `application/explicit-registration-response+jwt`; `aud` values are a single Entity Identifier; `subset_of` with an empty intersection yields an empty value; Trust Chain loops are rejected.
4. Prefer the `trust_chain` header parameter for new requests, and keep accepting the request parameter form during the move.
5. Validate every published statement and every chain against the Final rules, using the checklist in [`trust-chains.md`](trust-chains.md) and [`metadata-policy.md`](metadata-policy.md).
6. Keep behaviour unchanged: re-resolve chains for the federation's known entities before and after, and compare the Resolved Metadata.

## Preview

No preview is listed. The OpenID Foundation index shows no draft of a Federation 1.2 or 2.0. The Subordinate Events Endpoint and Extended Subordinate Listing Implementer's Drafts extend 1.0 and 1.1 and are tracked in [`endpoints.md`](endpoints.md). If a draft of a next Federation version appears with text, list it here as a preview with posture track.
