# Event types

Each event is one member of the SET `events` object. Its key is the event type URI and its value is an object with the event's claims. Every SET also has a top-level `sub_id` (SSF 1.0 §3.1).

## SSF stream events (SSF 1.0 §8.1.4, §8.1.5)

| Event type URI                                                      | Claims                                              | `sub_id`                                   |
| ------------------------------------------------------------------- | --------------------------------------------------- | ------------------------------------------ |
| `https://schemas.openid.net/secevent/ssf/event-type/verification`   | `state` (OPTIONAL; echoes the verification request) | `opaque`, with `id` set to the `stream_id` |
| `https://schemas.openid.net/secevent/ssf/event-type/stream-updated` | `status` (REQUIRED), `reason` (OPTIONAL)            | `opaque`, with `id` set to the `stream_id` |

A transmitter may send either event even when it is not in `events_supported`, `events_requested` or `events_delivered`.

## CAEP 1.0 events

### Shared optional claims (CAEP §2)

| Claim               | Meaning                                                                    |
| ------------------- | -------------------------------------------------------------------------- |
| `event_timestamp`   | When the event happened, as a JSON number (seconds since the epoch).       |
| `initiating_entity` | One of `admin`, `user`, `policy` or `system`.                              |
| `reason_admin`      | An object mapping BCP 47 language tags to an administrator-facing message. |
| `reason_user`       | An object mapping BCP 47 language tags to an end-user-facing message.      |

### Event types (CAEP §3)

The base URI is `https://schemas.openid.net/secevent/caep/event-type/`.

| Event                      | Section | Event-specific claims                                                                                                           |
| -------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `session-revoked`          | §3.1    | None beyond the shared claims.                                                                                                  |
| `token-claims-change`      | §3.2    | `claims` (REQUIRED): the changed claims and their new values.                                                                   |
| `credential-change`        | §3.3    | `credential_type` (REQUIRED), `change_type` (REQUIRED); optional `friendly_name`, `x509_issuer`, `x509_serial`, `fido2_aaguid`. |
| `assurance-level-change`   | §3.4    | `namespace` (REQUIRED), `current_level` (REQUIRED); optional `previous_level`, `change_direction`.                              |
| `device-compliance-change` | §3.5    | `previous_status` and `current_status` (REQUIRED), each `compliant` or `not-compliant`.                                         |
| `session-established`      | §3.6    | Optional `fp_ua`, `acr`, `amr`, `ext_id`.                                                                                       |
| `session-presented`        | §3.7    | Optional `fp_ua`, `ext_id`.                                                                                                     |
| `risk-level-change`        | §3.8    | `principal` (REQUIRED), `current_level` (REQUIRED); `risk_reason` (RECOMMENDED); optional `previous_level`.                     |

Value sets:

- **`credential_type`** (§3.3): `password`, `pin`, `x509`, `fido2-platform`, `fido2-roaming`, `fido-u2f`, `verifiable-credential`, `phone-voice`, `phone-sms` or `app`.
- **`change_type`** (§3.3): `create`, `revoke`, `update` or `delete`.
- **`namespace`** (§3.4): `RFC8176`, `RFC6711`, `ISO-IEC-29115`, `NIST-IAL`, `NIST-AAL`, `NIST-FAL`, or a custom value. **`change_direction`** is `increase` or `decrease`.
- **`principal`** (§3.8): `USER`, `DEVICE`, `SESSION`, `TENANT`, `ORG_UNIT`, `GROUP`, or another SSF entity.
- **Risk levels** (§3.8): `current_level` and `previous_level` are `LOW`, `MEDIUM` or `HIGH`. A missing `previous_level` means the transmitter does not know it.

CAEP §4: CAEP transmitters and receivers comply with SSF.

### Receiver reactions

CAEP does not mandate a reaction. Typical mappings follow from each event's meaning:

- `session-revoked`: end the matching sessions.
- `credential-change` with `revoke` or `delete`: re-check sessions that used that credential.
- `token-claims-change`: refresh cached claims.
- `assurance-level-change` with `decrease`, or `device-compliance-change` to `not-compliant`: step up authentication or restrict access.
- `risk-level-change` to `HIGH`: apply the local risk policy.

## RISC 1.0 events (RISC §2)

The base URI is `https://schemas.openid.net/secevent/risc/event-type/`.

| Event                                                                   | Section | Claims                                                                                   |
| ----------------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------- |
| `account-credential-change-required`                                    | §2.1    | None.                                                                                    |
| `account-purged`                                                        | §2.2    | None.                                                                                    |
| `account-disabled`                                                      | §2.3    | Optional `reason`: `hijacking` or `bulk-account`.                                        |
| `account-enabled`                                                       | §2.4    | None.                                                                                    |
| `identifier-changed`                                                    | §2.5    | Optional `new-value`.                                                                    |
| `identifier-recycled`                                                   | §2.6    | None.                                                                                    |
| `credential-compromise`                                                 | §2.7    | `credential_type` (REQUIRED); optional `event_timestamp`, `reason_admin`, `reason_user`. |
| `opt-in`, `opt-out-initiated`, `opt-out-cancelled`, `opt-out-effective` | §2.8    | None.                                                                                    |
| `recovery-activated`                                                    | §2.9    | None.                                                                                    |
| `recovery-information-changed`                                          | §2.10   | None.                                                                                    |
| `sessions-revoked`                                                      | §2.11   | Deprecated. New implementations MUST use CAEP `session-revoked`.                         |

RISC §3.1 notes that one existing deployment uses a `subject_type` member. New services MUST NOT use it.

## Example: credential-change

```json
{
  "iss": "https://idp.example.com/",
  "jti": "07efd930f0977e4fcc1149a733ce7f78",
  "iat": 1615305159,
  "aud": "https://sp.example.com/caep",
  "txn": "8675309",
  "sub_id": {
    "format": "iss_sub",
    "iss": "https://idp.example.com/",
    "sub": "145234573"
  },
  "events": {
    "https://schemas.openid.net/secevent/caep/event-type/credential-change": {
      "credential_type": "fido2-roaming",
      "change_type": "create",
      "fido2_aaguid": "accced6a-63f5-490a-9eea-e59bc1896cfc",
      "friendly_name": "Jane's USB authenticator",
      "initiating_entity": "user",
      "event_timestamp": 1615304991
    }
  }
}
```

`event_timestamp` is in seconds since the epoch (CAEP §2).
