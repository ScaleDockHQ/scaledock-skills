# Token Status List (draft-ietf-oauth-status-list-21)

Read this when adding revocation or suspension to SD-JWTs, SD-JWT VCs, JWTs or CWTs, or when checking status as a Holder or Relying Party. The draft is approved and in the RFC Editor queue, with posture **build**: implement it and re-pin to the RFC when it is published. Section numbers are draft-21 unless stated.

## Roles and pieces

- **Referenced Token**: the credential or token whose status is checked; it carries a `status` claim (§ 6).
- **Status List**: a compressed bit array with one status value per Referenced Token (§ 4).
- **Status List Token**: a signed JWT or CWT containing the Status List (§ 5).
- Status Issuer and Status Provider can differ from the Issuer; the Provider can be a CDN, since the token is signed (§ 12.6, § 13.5, § 13.6).

## Status List encoding (§ 4.1)

1. Choose `bits`: 1, 2, 4 or 8 bits per Referenced Token (§ 4.1 step 1).
2. Allocate at least `count × bits / 8` bytes (§ 4.1 step 2).
3. Give each Referenced Token a distinct index from 0. Index blocks are packed from the least significant bit to the most significant bit of each byte; bytes are in natural order (§ 4.1 step 3, § 11.1).
4. Compress with DEFLATE in the ZLIB format, at the highest level available (RECOMMENDED) (§ 4.1 step 4).

JSON form (§ 4.2): `{"bits": 1, "lst": "<base64url compressed bytes>"}`, optionally with `aggregation_uri`. CBOR form (§ 4.3): a map with `bits`, `lst` as a byte string, and optional `aggregation_uri`.

Test vector (§ 4.1, § 4.2): statuses `1,0,0,1,1,1,0,1,1,1,0,0,0,1,0,1` give bytes `0xB9 0xA3` and `{"bits": 1, "lst": "eNrbuRgAAhcBXQ"}`. Implementations SHOULD check themselves against the Appendix C vectors (§ 11.1).

```ts
import { inflateSync } from "node:zlib";

export function statusAt(
  lst: string,
  bits: 1 | 2 | 4 | 8,
  idx: number,
): number {
  const bytes = inflateSync(Buffer.from(lst, "base64url"));
  const perByte = 8 / bits;
  const byte = bytes[Math.floor(idx / perByte)];
  if (byte === undefined) throw new RangeError("index out of bounds");
  return (byte >> ((idx % perByte) * bits)) & ((1 << bits) - 1);
}
```

## Status List Token

JWT (§ 5.1):

- Header `typ` REQUIRED: `statuslist+jwt`.
- `sub` REQUIRED: the URI of the Status List Token, equal to `status_list.uri` in the Referenced Token.
- `iat` REQUIRED; `exp` RECOMMENDED; `ttl` RECOMMENDED (positive number of seconds the token may be cached).
- `status_list` REQUIRED: the JSON Status List.
- MUST be signed or MACed; Relying Parties MUST reject invalid signatures and JWTs invalid per RFC 7519. Follow RFC 7519 and RFC 8725 (§ 11.2).

CWT (§ 5.2): not tagged with the CWT tag; the COSE message MUST be `COSE_Sign1_Tagged` (18) or `COSE_Mac0_Tagged` (17). Protected header `16` (type) is `application/statuslist+cwt` or its CoAP Content-Format ID. Claims: `2` subject, `6` issued at (REQUIRED), `4` expiration and `65534` ttl (RECOMMENDED), `65533` status list (REQUIRED).

Prefer digital signatures; use MACs only when Status Issuer and Relying Party can exchange keys securely or are the same entity (§ 11.6).

## Referenced Token (§ 6)

```json
{
  "status": {
    "status_list": {
      "idx": 0,
      "uri": "https://example.com/statuslists/1"
    }
  }
}
```

- `status` is a JSON object with at least one status mechanism (§ 6.2); other specifications can define other members, as with `cnf` (§ 6.1).
- `status_list.idx` is a non-negative integer and `status_list.uri` is an RFC 3986 URI; both are REQUIRED (§ 6.2).
- The Referenced Token can be a JWT, an SD-JWT or an SD-JWT VC (§ 6.2), or a CWT, SD-CWT or ISO mdoc (§ 6.3). In a CWT the claim key is `65535` (§ 6.3).
- In an SD-JWT VC, `status` MUST NOT be selectively disclosable and the Status List Token MUST be a JWT (draft-ietf-oauth-sd-jwt-vc-19 § 2.2.2.3).

## Status Types (§ 7)

| Value                 | Meaning                                      |
| --------------------- | -------------------------------------------- |
| `0x00` VALID          | Valid, correct or legal.                     |
| `0x01` INVALID        | Revoked, annulled or cancelled.              |
| `0x02` SUSPENDED      | Temporarily invalid.                         |
| `0x03`, `0x0C`–`0x0F` | Application-specific (permanently reserved). |

All other values are reserved for registration (§ 7.1). Use registered values when the semantics match (§ 7.1). Choose `bits` large enough for the statuses you need: SUSPENDED needs `bits` of at least 2 (§ 4.1, § 7). The Referenced Token's own rules come first: an expired token with status VALID is expired (§ 7.1).

## Fetching (§ 8.1, § 8.2)

- GET the `uri` with `Accept: application/statuslist+jwt` or `application/statuslist+cwt`; the Provider MUST return the Status List Token unless another distribution method is agreed (§ 8.1).
- The endpoint SHOULD support CORS unless the ecosystem excludes browser clients (§ 8.1).
- A successful response uses a 2xx status and the matching content type; the body is the compact JWS or the binary CWT (§ 8.2). Redirects (3xx) SHOULD be followed, safely (§ 8.2, § 11.4). Use `Content-Encoding` such as gzip for JWT responses (SHOULD, § 8.2).
- The `exp` and `ttl` claims take precedence over HTTP caching headers (§ 8.2).

## Validation (§ 8.3)

1. Validate the Referenced Token first (signature, expiry, expected claims). If it is invalid, reject it and do not fetch the Status List Token unless the use case needs it.
2. Check `status.status_list` exists and is well formed.
3. Resolve the Status List Token from `uri`.
4. Validate it as a JWT (RFC 7519 § 7.2) or CWT (RFC 8392 § 7.2), resolving its key (§ 11.3), and check the required claims.
5. `sub` MUST equal `uri`; check `iat` against freshness policy; if `exp` is present, check it; when caching, refetch once resolution time + `ttl` has passed.
6. Decompress with a DEFLATE/ZLIB decompressor.
7. Read the value at `idx`. If `idx` is out of bounds, no statement can be made and the Referenced Token MUST be rejected.
8. Interpret the value per § 7.

If any check fails, no statement about status can be made and the Referenced Token SHOULD be rejected (§ 8.3). Holders can run the same procedure (§ 8).

Historical status (optional, § 8.4): `GET <uri>?time=<unix timestamp>`. Servers without support SHOULD answer 501, and 404 for unsupported times. Clients MUST reject a response unless the requested time is within the token's `iat` to `exp`. Implementing it is NOT RECOMMENDED without strong reasons (§ 12.7).

## Keys and trust (§ 11.3, § 10)

- If the Issuer is also the Status Issuer, the Status List Token can use the same `x5c`, `x5t`, `x5t#S256` or `kid`, or the same web-based resolution (`x5u`, `jwks`, `jwks_uri`, `kid`).
- If they differ, link the keys, for example through a common CA, with the Status Issuer certificate using the `id-kp-oauthStatusSigning` extended key usage (§ 10). The OID number is still TBD in draft-21.

## Aggregation (§ 9)

Optional list of Status List Token URIs for prefetching and offline use: `{"status_lists": ["https://..."]}` as `application/json` (§ 9.3), linked from Issuer metadata (`status_list_aggregation_endpoint` when the Issuer is an OAuth authorization server, § 9.1) or from `aggregation_uri` in the Status List (§ 9.2). Continue with the other lists when one fails to validate (§ 9).

## Operations and privacy

- Herd privacy: the Issuer cannot tell which token is being checked; larger lists give more privacy (§ 12.1). Request metadata such as IP addresses can still identify the Relying Party; relays or third-party hosting help (§ 12.1).
- Do not give every token its own list or a unique URI; that defeats herd privacy (§ 12.2).
- Use non-sequential or random indices, decoy entries and several lists to hide issuance volume and revocation rate (§ 12.4, § 12.5.1).
- Re-issued or batch tokens MUST each get a fresh, dedicated index (§ 13.2). The Status Issuer MUST prevent unintended double allocation of `uri` and `idx` (§ 13.3).
- Initialize the list with the most common value, usually VALID, so unused indices are indistinguishable (RECOMMENDED, § 13.3). Keep the size a multiple of 8 bits (RECOMMENDED, § 13.4).
- Set both `exp` and `ttl` (RECOMMENDED, § 13.7). Clients cache for `ttl` after fetching (RECOMMENDED) and bound `exp` and `ttl` to sane ranges so a Status Issuer cannot cause a request flood (§ 11.5, § 13.7).
- Statuses other than VALID and INVALID can leak information; consider revocation and re-issuance instead of SUSPENDED (§ 12.8).
- Relying Parties that do not need them are RECOMMENDED to delete the `status` claim after validation and the Status List Token after expiry or update (§ 13.8).
