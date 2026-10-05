# Bitstring Status List

Read this when adding revocation, suspension, refresh or message status to credentials, publishing a status list, or checking status as a verifier. Source: Bitstring Status List v1.0 (BSL), with VC Data Model 2.0 § 4.10 for `credentialStatus`. Section numbers are BSL unless another specification is named.

## How it works

The issuer gives every credential an index into a large, compressed bitstring that it publishes as a verifiable credential of its own. A verifier fetches the list credential, verifies it, expands the bitstring and reads the bits at the index. Many credentials share one list, which gives holders group privacy: the verifier does not tell the issuer which credential it is checking (§ 1.1, § 6.1).

## Status entry in the credential

```json
"credentialStatus": {
  "id": "https://example.com/credentials/status/3#94567",
  "type": "BitstringStatusListEntry",
  "statusPurpose": "revocation",
  "statusListIndex": "94567",
  "statusListCredential": "https://example.com/credentials/status/3"
}
```

| Property               | Rule (§ 2.1)                                                                                                                                                                                                                                                               |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                   | Optional URL identifying this status information; MUST NOT be the status list URL; not used in verification or validation.                                                                                                                                                 |
| `type`                 | MUST be `BitstringStatusListEntry`.                                                                                                                                                                                                                                        |
| `statusPurpose`        | A string. `refresh`, `revocation`, `suspension` and `message` MUST be used for their defined meaning.                                                                                                                                                                      |
| `statusListIndex`      | An integer of arbitrary size, at least 0, written as a base-10 string. Indexes SHOULD be assigned randomly.                                                                                                                                                                |
| `statusListCredential` | MUST be a URL to a verifiable credential whose `type` includes `BitstringStatusListCredential`.                                                                                                                                                                            |
| `statusSize`           | Optional integer greater than zero, in bits; treated as 1 when absent.                                                                                                                                                                                                     |
| `statusMessage`        | Array with exactly 2^`statusSize` objects, each with `status` (hex string prefixed `0x`) and `message` (for developers; SHOULD NOT be shown to end users). MUST be present when `statusSize` is greater than 1. Without it, bit values 1 and 0 mean `"set"` and `"unset"`. |
| `statusReference`      | Optional URL or array of URLs to material about the status; strongly encouraged with `message`.                                                                                                                                                                            |

Status purposes:

| Purpose      | Meaning                                                                                                          | Reversible |
| ------------ | ---------------------------------------------------------------------------------------------------------------- | ---------- |
| `refresh`    | An updated credential is available through the credential's refresh service; does not invalidate the credential. | no         |
| `revocation` | Cancels the validity of the credential.                                                                          | no         |
| `suspension` | Temporarily prevents acceptance of the credential.                                                               | yes        |
| `message`    | An arbitrary status message, committed at issuance through `statusSize`, `statusMessage` and `statusReference`.  | n/a        |

- A credential can carry several entries, for example one `revocation` and one `suspension`, each pointing to a list (§ 2.1, Example 1).
- `statusListIndex` is the only link between a credential and its status; `credentialSubject.id` is not used (§ 2.1, note).
- From VC Data Model 2.0: `credentialStatus` MUST NOT enable tracking of the holder (§ 4.10).

## Status list credential

```json
{
  "@context": ["https://www.w3.org/ns/credentials/v2"],
  "id": "https://example.com/credentials/status/3",
  "type": ["VerifiableCredential", "BitstringStatusListCredential"],
  "issuer": "did:example:12345",
  "validFrom": "2021-04-05T14:27:40Z",
  "credentialSubject": {
    "id": "https://example.com/status/3#list",
    "type": "BitstringStatusList",
    "statusPurpose": "revocation",
    "encodedList": "uH4sIAAAAAAAAA-3BMQEAAADCoPVPbQwfoAAAAAAAAAAAAAAAAAAAAIC3AYbSVKsAQAAA"
  }
}
```

| Property                          | Rule (§ 2.2)                                                                                                                                                                         |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| The credential                    | MUST be a conforming VC Data Model 2.0 document.                                                                                                                                     |
| `id`                              | MAY equal the entry's `statusListCredential`.                                                                                                                                        |
| `type`                            | MUST include `BitstringStatusListCredential`.                                                                                                                                        |
| `validFrom`, `validUntil`         | The validity period of the list itself.                                                                                                                                              |
| `credentialSubject.type`          | MUST be `BitstringStatusList`.                                                                                                                                                       |
| `credentialSubject.statusPurpose` | One or more strings; the defined purposes have the meanings above.                                                                                                                   |
| `credentialSubject.encodedList`   | Multibase base64url (no padding, prefix `u`) of the GZIP-compressed bitstring. Uncompressed, at least 16KB (131,072 bits). Index 0 is the left-most bit.                             |
| `credentialSubject.ttl`           | Optional milliseconds before a refresh SHOULD be attempted; no default; does not override the validity period. Publishers SHOULD align HTTP caching such as `Cache-Control` with it. |

- The list credential's issuer MAY differ from the credential's issuer (§ 2.2). Verifiers decide whether they trust both (§ 3.2, note).
- A holder MAY hand the list credential to the verifier directly ("certificate stapling"); the verifier can still fetch a newer one (§ 2.2).
- Secure the list credential with the same securing mechanism, cryptographic parameters and media type as the credentials that reference it (SHOULD, § 3.6).
- The list credential is served with any media type for a secured credential, for example `application/vc` with Data Integrity; implementations can negotiate with `Accept` and answer 415 when unsupported (§ 4).

## Issuer workflow

1. Create the bitstring: at least 16KB of zero bits. For each issued credential, set the bits at position `statusListIndex × statusSize` to its status (§ 3.3).
2. GZIP-compress it and multibase-encode it with base64url without padding (§ 3.3).
3. Put it in `encodedList` of an unsigned list credential, secure it, and publish it at the `statusListCredential` URL (§ 3.1).
4. Publish so that the list can be cached and retrievals are not tracked, for example through Oblivious HTTP, a CDN the issuer does not operate, or access logs no analyst can read (SHOULD, § 3.1).
5. Optionally support point-in-time retrieval: the query parameter MUST be `timestamp` with a URL-encoded `dateTimeStamp`, and the result MUST be the list as it was then, or `STATUS_RETRIEVAL_ERROR` (§ 3.2).

## Verifier workflow (§ 3.2)

1. Let `minimumNumberOfEntries` be 131,072, unless an ecosystem specification sets a lower bound.
2. Dereference `statusListCredential` and verify all its proofs. Retrieval failure is `STATUS_RETRIEVAL_ERROR`; a failed proof is `STATUS_VERIFICATION_ERROR`.
3. Check that the entry's `statusPurpose` is one of the list's `statusPurpose` values; otherwise `STATUS_VERIFICATION_ERROR`.
4. Multibase-decode and GZIP-expand `encodedList` (§ 3.4).
5. If bitstring length ÷ `statusSize` is below the minimum, raise `STATUS_LIST_LENGTH_ERROR`.
6. Read the status at `statusListIndex × statusSize`; out of range is `RANGE_ERROR`.
7. Return `status`, `purpose`, `valid` (true only when status is 0) and, for `message`, the matching message.

- Any property that breaks a MUST in the data model raises `MALFORMED_VALUE_ERROR` (§ 3).
- Over HTTP, errors SHOULD be RFC 9457 Problem Details whose `type` starts with `https://www.w3.org/ns/credentials/status-list#` (§ 3.5).
- Cache retrieved lists and hide retrieval from the issuer through proxies or Oblivious HTTP (SHOULD, § 3.2).
- Get the bit order right: index 0 is the left-most bit; a wrong decoder can read a revoked credential as valid (§ 7.1).

## Contexts

- JSON-LD processors MUST treat `https://www.w3.org/ns/credentials/status/v1` as already resolved, with SHA-256 `fda5add353231e6a6884a46b12e6c75464281900cb348284d9c360f62381d9f7` (§ 5.2).
- These terms are also part of the `https://www.w3.org/ns/credentials/v2` context, so credentials using the base context need no extra context (§ 5.2, note).

## Privacy

- Lists shorter than 131,072 entries, or a small issued population, let observers correlate individuals (§ 6.1).
- `id`, `statusListIndex` and `statusListCredential` are global identifiers. With selective or unlinkable disclosure, make status selectively disclosable where correlation is not needed (§ 6.2).
- Decoy values that can be told apart from real ones reduce anonymity; assign indexes randomly and change entries as rarely as possible (§ 6.5).
- A malicious issuer can use a unique list, or a unique key, per credential to track presentations; holder software can detect identifiers that are not shared with other credentials (§ 6.6).
- A verifier that knows an index can keep watching it; issuers can reissue on a short cycle with new indexes to break long-term monitoring (§ 6.7).
- Detailed status messages, and messages added after issuance, leak information about the holder and the population (§ 6.8, § 6.9).

## Validity periods

No minimum or maximum is suggested. Choose the list's validity period from how often statuses change, any regulatory or reputational duty to notify verifiers quickly, what verifiers will accept, and the bandwidth and compute cost of short periods. `ttl` hints refresh timing but does not replace `validUntil` (§ 2.2, § 7.2).
