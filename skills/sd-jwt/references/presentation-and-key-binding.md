# Presentation and Key Binding (RFC 9901)

Read this when building a Holder (a wallet): checking a received SD-JWT, choosing Disclosures, creating the Key Binding JWT and serializing the presentation. Section numbers are RFC 9901 unless stated.

## Receiving from the Issuer

- The Issuer provides an SD-JWT, not an SD-JWT+KB; if the Holder receives an SD-JWT+KB it MUST reject it (§ 7.2).
- The Holder MUST run the § 7.1 checks (see `references/verification.md`) and check that the claim values are acceptable for the application (§ 7.2).
- Processing does not tell the Holder whether it got every Disclosure; a truncated message can drop some. Keep the mapping between Disclosures and plaintext values yourself (§ 7.1 note).
- Store SD-JWTs encrypted, preferably with hardware-backed protection for the Key Binding private key; prefer on-device storage; delete expired SD-JWTs as soon as possible (§ 10.2).

## Selecting Disclosures

For each presentation the Holder MUST (§ 7.2):

1. Decide which Disclosures to release, obtaining consent if needed.
2. Check that each selected Disclosure's digest is in the Issuer-signed JWT, or inside another selected Disclosure.
3. Assemble the SD-JWT from the Issuer-signed JWT and the selected Disclosures.

Constraints:

- Any subset is allowed: none, some or all (§ 4).
- For data the Holder does not reveal, it MUST NOT send the Disclosure or reveal the salt in any other way (§ 4).
- It MUST NOT send a Disclosure that was not in the issued SD-JWT, or send one more than once (§ 4).
- A nested Disclosure needs its parent: include every Disclosure needed to process the ones you send (§ 4.2.6). In the § 4.2.6 example, sending the `"DE"` element Disclosure requires the `nationalities` Disclosure too.

## Serialization

```text
SD-JWT:     <Issuer-signed JWT>~<D.1>~...~<D.N>~
SD-JWT+KB:  <Issuer-signed JWT>~<D.1>~...~<D.N>~<KB-JWT>
```

The order MUST be the Issuer-signed JWT, `~`, each Disclosure followed by `~`, then the optional KB-JWT; without a KB-JWT the last element is empty and the last `~` MUST NOT be omitted (§ 4). ABNF (§ 4):

```abnf
SD-JWT = JWT "~" *(DISCLOSURE "~")
KB-JWT = JWT
SD-JWT-KB = SD-JWT KB-JWT
```

## Key Binding JWT

When the Verifier requires Key Binding, the Holder creates a KB-JWT tied to the SD-JWT and appends it (§ 7.2). The KB-JWT MUST be a JWT with (§ 4.3):

| Part    | Member    | Rule                                                                   |
| ------- | --------- | ---------------------------------------------------------------------- |
| header  | `typ`     | REQUIRED, MUST be `kb+jwt`.                                            |
| header  | `alg`     | REQUIRED, a digital signature algorithm, MUST NOT be `none`.           |
| payload | `iat`     | REQUIRED, the time the KB-JWT was issued.                              |
| payload | `aud`     | REQUIRED, MUST be a single string identifying the intended receiver.   |
| payload | `nonce`   | REQUIRED, a string that ensures freshness or binds to the transaction. |
| payload | `sd_hash` | REQUIRED, base64url hash over the presented SD-JWT (below).            |

How `aud` and `nonce` are obtained is up to the presentation protocol (§ 4.3). Other claims and header parameters SHOULD be avoided unless there is a compelling reason (§ 4.3). The KB-JWT is signed with the private key matching the SD-JWT's `cnf` (§ 4.3.2).

### `sd_hash`

Compute it over the US-ASCII bytes of exactly the SD-JWT being presented: the Issuer-signed JWT, `~`, and each selected Disclosure followed by `~` (§ 4.3.1). Base64url-encode the digest bytes, and use the same hash algorithm as the Disclosures (`_sd_alg`, default `sha-256`) (§ 4.3.1).

```ts
import { createHash } from "node:crypto";

export function sdHash(issuerSignedJwt: string, selected: string[]): string {
  const presented = [issuerSignedJwt, ...selected].join("~") + "~";
  return createHash("sha256").update(presented, "ascii").digest("base64url");
}
```

Because the hash covers the selected Disclosures, the KB-JWT also protects the set of Disclosures: nobody between Holder and Verifier can add, remove or change them (§ 9.10). Without a KB-JWT, Disclosures can be added or removed and the SD-JWT stays valid (§ 9.10).

Example KB-JWT payload (§ 5.2):

```json
{
  "nonce": "1234567890",
  "aud": "https://verifier.example.org",
  "iat": 1748537244,
  "sd_hash": "0_Af-2B-EhLWX5ydh_w2xzwmO6iM66B_2QCEanI4fUY"
}
```

### JWS JSON serialization

In the JSON serialization the KB-JWT goes in the `kb_jwt` unprotected header parameter, which MUST be present in an SD-JWT+KB (§ 8.1). `sd_hash` is still computed over a temporary compact serialization: protected header, payload and signature joined with `.`, followed by the Disclosures from `disclosures`, each with `~` (§ 8.1). In the General form, `disclosures` and `kb_jwt` go only in the first unprotected header (§ 8.3).

## Forwarding and transport

- Anyone holding an SD-JWT, including one extracted from an SD-JWT+KB, can forward it, with fewer Disclosures, to any party that does not enforce Key Binding (§ 9.9).
- Without Key Binding, a leaked or replayed credential is accepted by any Verifier that does not require it (§ 9.5).
- The transport must provide confidentiality when privacy or passive correlation is a concern (§ 10.3). An SD-JWT sent in a URL SHOULD be encrypted with JWE (§ 10.3).
- New Key Binding keys per credential in a batch prevent Verifiers from linking presentations by key (§ 10.1).
