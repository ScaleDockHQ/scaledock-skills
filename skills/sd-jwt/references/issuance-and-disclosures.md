# Issuance and Disclosures (RFC 9901)

Read this when building an Issuer: deciding which claims are selectively disclosable, creating Disclosures, embedding digests, adding decoys, choosing the hash algorithm and enabling Key Binding. Section numbers are RFC 9901 unless stated.

## Data model

An SD-JWT is an Issuer-signed JWT plus zero or more Disclosures (§ 4). The payload holds digests of Disclosures in place of the selectively disclosable claims, and the Disclosures travel outside the signed payload (§ 3.1).

| Element               | Where                        | Rule                                                                                      |
| --------------------- | ---------------------------- | ----------------------------------------------------------------------------------------- |
| `_sd`                 | any object, at any level     | Array of strings: digests of object-property Disclosures and decoys (§ 4.2.4.1).          |
| `{"...": "<digest>"}` | in place of an array element | Exactly one key, `...`; the value is the digest (§ 4.2.4.2).                              |
| `_sd_alg`             | top level only               | Hash algorithm name; absent means `sha-256`. MUST NOT appear in nested objects (§ 4.1.1). |
| `cnf`                 | payload                      | The Holder's key, or a reference, per RFC 7800; `jwk` is suggested (§ 4.1.2).             |
| `typ` header          | Issuer-signed JWT            | Recommended for profiles, as `<example>+sd-jwt` (§ 9.11).                                 |

The payload MUST NOT use `_sd` or `...` except to carry digests, and the same digest MUST NOT appear more than once in the SD-JWT (§ 4.1). The Issuer-signed JWT MUST be signed with the Issuer's private key and MUST NOT use `none` (§ 4.1, § 9.1).

## Creating a Disclosure

Object property (§ 4.2.1): a JSON array `[salt, claim_name, claim_value]`, UTF-8 encoded, then base64url-encoded without padding.

- The salt MUST be a string, MUST be unique for each claim, and MUST NOT be revealed to anyone but the Holder (§ 4.2.1). It MUST be cryptographically random with enough entropy that it cannot be guessed; the RECOMMENDED minimum random portion is 128 bits (§ 9.3). Use a new salt for every claim, including the same claim name in different places (§ 9.3).
- The claim name MUST be a string and MUST NOT be `_sd`, `...`, or the name of a permanently disclosed claim in the same object (§ 4.2.1).
- The value can be any JSON value, including objects and arrays (§ 4.2.1).

Array element (§ 4.2.2): a two-element array `[salt, value]`, encoded the same way.

No canonicalization is needed: whitespace, Unicode escaping and member order can vary, because the digest is over the encoded string the Issuer produced (§ 4.2.1). Holders and Verifiers never re-encode a Disclosure.

## Hashing

The digest MUST be computed over the US-ASCII bytes of the base64url Disclosure string, not over the decoded JSON, and the digest bytes MUST be base64url-encoded, not hex (§ 4.2.3). Use the `_sd_alg` algorithm, or SHA-256 when it is absent (§ 4.2.3).

Test vector (§ 4.2.1, § 4.2.3):

```text
Disclosure: WyJfMjZiYzRMVC1hYzZxMktJNmNCVzVlcyIsICJmYW1pbHlfbmFtZSIsICJNw7ZiaXVzIl0
Contents:   ["_26bc4LT-ac6q2KI6cBW5es", "family_name", "Möbius"]
SHA-256:    X9yH0Ajrdm1Oij4tWso9UzzKJvPoDxwmuEcO3XAdRC0
```

Array element vector (§ 4.2.2, § 4.2.4.2): `WyJsa2x4RjVqTVlsR1RQVW92TU5JdkNBIiwgIkZSIl0` (`["lklxF5jMYlGTPUovMNIvCA", "FR"]`) hashes to `w0I8EKcdCtUPkGCNUrfwVp2xEgNjtoIDlOxc9-PlOhs`.

```ts
import { createHash, randomBytes } from "node:crypto";

export function createDisclosure(claim: [string, unknown] | [unknown]): string {
  const salt = randomBytes(16).toString("base64url");
  return Buffer.from(JSON.stringify([salt, ...claim]), "utf8").toString(
    "base64url",
  );
}

export function digest(disclosure: string): string {
  return createHash("sha256").update(disclosure, "ascii").digest("base64url");
}
```

## Hash algorithm

- `_sd_alg` is a case-sensitive value from the "Hash Name String" column of the IANA Named Information Hash Algorithm Registry, or one defined by a profile (§ 4.1.1). Every implementation MUST support `sha-256` (§ 4.1.1).
- The hash MUST be preimage and second-preimage resistant and SHOULD be collision resistant, with collision resistance matching the signature's hash (ES512 implies at least SHA-512) (§ 9.4).
- Registry membership is not enough: truncated entries such as `sha-256-32` are unfit (§ 9.4).

## Embedding digests

- Put object-property digests in `_sd` at the level where the claim would be (§ 4.2.4.1). An empty `_sd` is allowed, but omitting it is RECOMMENDED (§ 4.2.4.1).
- Hide the original claim order: the Issuer MUST, and shuffling or sorting the digests after adding decoys is RECOMMENDED (§ 4.2.4.1).
- Replace a hidden array element with `{"...": "<digest>"}` at the same position (§ 4.2.4.2). Verifiers drop elements they get no Disclosure for, so `["DE", {"...": ...}, "US"]` becomes `["DE", "US"]` (§ 4.2.4.2).

## Structure choices

Each claim at each level is independently disclosable or not (§ 6):

- Flat: the whole `address` object is one Disclosure (§ 6.1).
- Structured: `address` stays in the clear with an `_sd` of its sub-claims (§ 6.2). Its key is then visible (§ 9.6).
- Recursive: the sub-claims are disclosable and the whole `address` Disclosure contains their digests (§ 6.3, § 4.2.6). A nested Disclosure needs its parent: an SD-JWT that includes a Disclosure MUST include every Disclosure needed to process it (§ 4.2.6).

Names of permanently disclosed claims are never hidden, including keys of clear objects that hold concealed claims (§ 9.6).

## What must stay in the clear

The Issuer MUST NOT make anything selectively disclosable that is critical for checking authenticity or validity (§ 9.7). Treat these as security-critical: `iss`, `aud` (individual array entries MAY be disclosable), `exp`, `nbf` and `cnf` (§ 9.7). Profiles SHOULD list their own set (§ 9.7). SD-JWT VC adds `vct`, `vct#integrity`, `aka_vcts` and `status` to the never-disclosable list (see `references/sd-jwt-vc.md`).

## Decoy digests

- Decoys are digests with no Disclosure. They MAY go in `_sd` arrays and in arrays (§ 4.2.5).
- Create them by hashing a cryptographically secure random number, base64url-encode the result, and use the same hash function as for Disclosures (§ 4.2.5).
- Decoys are RECOMMENDED when the number or presence of claims leaks information; when a claim only exists if a condition holds, the Issuer SHOULD add decoys when it does not (§ 10.4). Padding arrays to a consistent size helps hide their length (§ 4.2.2).

## Key Binding at issuance

- To enable Key Binding, put the Holder's public key, or a reference to it, in `cnf` (RFC 7800); the `jwk` method is suggested (§ 4.1.2). How the key pair is established is out of scope (§ 4.1.2).
- Issuers support Key Binding when forwarding a credential to third parties must be prevented (§ 9.9).

## Output

The issuance serialization is `<Issuer-signed JWT>~<D.1>~...~<D.N>~`, including every relevant Disclosure (§ 4). The trailing `~` MUST be present when there is no KB-JWT (§ 4). The Issuer delivers an SD-JWT, never an SD-JWT+KB; a Holder rejects one (§ 7.2).

JWS JSON serialization (optional, § 8): put the Disclosures in the `disclosures` array of the unprotected header (§ 8.1). In the General form, `disclosures` and `kb_jwt` go only in the first unprotected header (§ 8.3). Unprotected headers other than `disclosures` are not covered by any digest (§ 8.1). Media types: `application/sd-jwt` and `application/sd-jwt+json` (§ 11.2).

## Privacy at issuance

- Batch issuance gives Verifier/Verifier and presentation unlinkability; every credential in the batch MUST use new Key Binding keys and new salts, and `iat`, `exp` and `nbf` MUST be randomized within a window or rounded (§ 10.1).
- After issuance, Issuers SHOULD NOT store the Issuer-signed JWT or the Disclosures (§ 10.2).
- A single-purpose Issuer, or the Issuer identifier itself, can reveal facts about the Holder; a group of Issuers may share an identifier (§ 10.5).
- SD-JWT does not give Issuer/Verifier unlinkability against a colluding Verifier (§ 10.1).
