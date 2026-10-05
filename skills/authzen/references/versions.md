# Versions and upgrades

Read this when choosing a target version, reading a PEP or PDP built against the Implementer's Draft, upgrading, or deciding whether the editors' draft is a new line. Sources: Authorization API 1.0 (Final), Authorization API 1.0 draft 01 (the first Implementer's Draft), drafts 02 and 03, the AuthZEN specifications index and the current editors' draft, listed in [Sources](../SKILL.md#sources).

## Version lines

| Id        | Line                                                | Status  | Revision                                                                     | Posture | Summary                                                                                     |
| --------- | --------------------------------------------------- | ------- | ---------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------- |
| `1.0`     | AuthZEN Authorization API 1.0                       | current | Final, published 11 January 2026                                             |         | The default target: evaluation, batch evaluation, search, PDP metadata, HTTPS JSON binding. |
| `1.0-id1` | AuthZEN Authorization API 1.0 Implementer's Draft 1 | legacy  | draft 01, 6 September 2024; approved as Implementer's Draft in November 2024 |         | The Access Evaluation endpoint only. Superseded by the Final.                               |

Statuses: **current** is the default target; **legacy** is superseded, read and upgraded from but never authored. No line is **supported**: the index lists the Final as the only current specification and keeps the drafts "for reference" under Previous Versions. No line is a **preview** (see [Preview](#preview)).

Drafts 02 (23 January 2025) and 03 (18 March 2025) were working group drafts between the Implementer's Draft and the Final, never approved as Implementer's Drafts; the index lists them under Previous Versions. Only draft 01 was approved as an Implementer's Draft, so there is no Implementer's Draft 2. A document built against draft 02 or 03 upgrades with the same checklist as `1.0-id1`, skipping the steps for features it already has.

## Which version to use

- Default to `1.0`, the Final. Later revisions may augment it but MUST NOT modify it (AuthZEN § 4).
- Treat a PEP or PDP built against `1.0-id1` (or draft 02 or 03) as input to an upgrade. Do not author new code against a draft.
- The editors' draft is not a separate line: read the Final.

## What changed

### AuthZEN Authorization API 1.0

Compared with Implementer's Draft 1. Each change cites the Final (AuthZEN §) and, where it replaces something, draft 01 (ID1 §).

- The Access Evaluations API for batched requests, with top-level defaults, `evaluations_semantic` and per-item errors (AuthZEN § 7). Added in draft 02; the Document History in draft 03 also records that `evaluations` changed from an object to an array to preserve ordering.
- The Subject, Resource and Action Search APIs with pagination (AuthZEN § 8). Added in draft 03.
- PDP metadata at `/.well-known/authzen-configuration`, with endpoint and capability parameters and `signed_metadata` (AuthZEN § 9), and the IANA registries for it (AuthZEN § 12).
- Decision and decision context are part of the information model (AuthZEN § 5.5, § 5.5.1). A PEP MAY reject `decision: true` when it does not understand the `context` (AuthZEN § 5.5). In draft 01 the response context was a free-form addition with a structured "reasons" example (ID1 § 6.2.2, § 6.2.3).
- The common subject properties `ip_address` and `device_id` (ID1 § 5.1.1.1, § 5.1.1.2) and the common action values `can_access`, `can_create`, `can_read`, `can_update` and `can_delete` (ID1 § 5.3.1) are no longer defined. The Final lists IP address and device identifier only as examples of subject attributes (AuthZEN § 5.1.1), and an Action needs only `name` (AuthZEN § 5.3).
- Action `properties` are described as attributes such as parameters of the requested action (AuthZEN § 5.3.1).
- The version rule is softer: endpoints for version 1.0 SHOULD include `v1` (AuthZEN § 4), where draft 01 required every method to be preceded by `/v1/` (ID1 § 4). The default paths, such as `/access/v1/evaluation`, are listed with their metadata parameters (AuthZEN § 10.1).
- The HTTPS binding is the normative "HTTPS JSON Binding", with a JSON serialization section that requires a JSON object at the top level (AuthZEN § 10.1, § 10.1.1). The error codes `400`, `401`, `403` and `500` and the rule that a deny is `200` with `decision: false` are unchanged (ID1 § 7.1.3; AuthZEN § 10.1.2). `X-Request-ID` handling is unchanged (ID1 § 7.1.4, § 7.1.5; AuthZEN § 10.1.3).
- New security considerations: sender authentication failure and `WWW-Authenticate`, JSON payload considerations (I-JSON, no `null` properties), response integrity, signed versus unsigned metadata, and metadata caching (AuthZEN § 11.3, § 11.5, § 11.6, § 11.8, § 11.9).

### AuthZEN Authorization API 1.0 Implementer's Draft 1

- Subject, Resource, Action and Context, with optional fields moved into a `properties` object (ID1 § 5; Document History, 01).
- The Access Evaluation API and its HTTPS binding at `/access/v1/evaluation` (ID1 § 6, § 7.1).

## Upgrading

### 1.0-id1 to 1.0

1. Keep the endpoint path. `/access/v1/evaluation` is still the default path for Access Evaluation (AuthZEN § 10.1). If the PDP publishes metadata, a PEP uses the `access_evaluation_endpoint` it lists instead.
2. Replace removed definitions. Keep sending `ip_address`, `device_id` or other attributes under `properties` if the policy uses them, but do not rely on the specification to define their meaning (AuthZEN § 5.1.1). Keep `can_read`-style action names only as names your policies agree on (AuthZEN § 5.3).
3. Treat the response `context` as decision context: the PEP enforces `decision: false` and decides what to do with a `context` it does not understand (AuthZEN § 5.5).
4. Check the transport rules that the Final adds: a JSON object body at the top level, I-JSON and omitted `null` properties, `401` with `WWW-Authenticate` on failed authentication (AuthZEN § 10.1.1, § 11.3, § 11.5).
5. Add Access Evaluations, Search and metadata only when in scope; they are optional for a PDP (AuthZEN § 3, § 9.1.1).
6. Validate against the Final: run the certification fixture and interop vectors for your scope ([`conformance.md`](conformance.md)).
7. Keep behaviour unchanged: the same requests must produce the same decisions. An upgrade that validates but permits something it used to deny is a regression.

## Preview

None is listed. The working group's current editors' draft (dated 5 October 2026 when checked) is still titled "Authorization API 1.0" and differs from the Final only in its date and the removal of the "Final" status line, so it is not a new version line and has no new text to cite. The working group drafts on the index (COAZ, the Access Request and Approval Profile, the Profile for Obligations) are separate documents built on the API, not versions of it.

When the working group publishes a draft with a new version number, add it as a `-preview` line with posture track, and add an upgrade section when it ships.
