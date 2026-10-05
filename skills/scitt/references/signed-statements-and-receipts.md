# Signed Statements, Receipts and Transparent Statements

Read this when producing or parsing the CBOR/COSE messages. Section numbers are RFC 9943 unless RFC 9942 (COSE Receipts) is named.

## Signed Statement (§ 6, § 6.1 Figure 3)

A Signed Statement is a tagged COSE_Sign1 (`#6.18`) per RFC 9052. The normative CDDL:

```cddl
Signed_Statement = #6.18(COSE_Sign1)
Receipt = #6.18(COSE_Sign1)

COSE_Sign1 = [
  protected   : bstr .cbor Protected_Header,
  unprotected : Unprotected_Header,
  payload     : bstr / nil,
  signature   : bstr
]

Protected_Header = {
  &(CWT_Claims: 15) => CWT_Claims
  ? &(alg: 1) => int
  ? &(content_type: 3) => tstr / uint
  ? &(kid: 4) => bstr
  ? &(x5t: 34) => COSE_CertHash
  ? &(x5chain: 33) => COSE_X509
  * label => any
}

CWT_Claims = {
  &(iss: 1) => tstr
  &(sub: 2) => tstr
  * label => any
}

Unprotected_Header = {
  ? &(x5chain: 33) => COSE_X509
  ? &(receipts: 394)  => [+ bstr .cbor Receipt]
  * label => any
}

label = int / tstr
```

Header rules:

| Label | Name         | Where       | Rule                                                                                                                                  |
| ----- | ------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| 15    | CWT Claims   | protected   | MUST be present in Signed Statements and Receipts, with `iss` (1) and `sub` (2) (§ 6, RFC 9597 § 2).                                  |
| 1     | alg          | protected   | Signature algorithm.                                                                                                                  |
| 3     | content type | protected   | The payload's media type; the Issuer picks the payload format first (§ 6).                                                            |
| 4     | kid          | protected   | MUST be present when neither `x5t` nor `x5chain` is protected. Issuers MAY use one key per Artifact or one for all (§ 6).             |
| 34    | x5t          | protected   | With X.509, `x5t` or `x5chain` in the protected header is REQUIRED to implement (§ 6).                                                |
| 33    | x5chain      | either      | Protected (alternative to `x5t`), or unprotected when it matches the protected `x5t` or `kid` (OPTIONAL with `kid`) (§ 6, § 5.1.1.1). |
| 394   | receipts     | unprotected | Array of CBOR-encoded Receipts; turns a Signed Statement into a Transparent Statement (§ 7, RFC 9942 § 2).                            |

When `x5t` or `x5chain` is protected, `iss` MUST be a string meeting the URI requirements of RFC 8392, between 1 and 8192 characters (§ 6). Registration Policies may require more labels than the minimum (§ 6.1).

Example protected header from § 6.1 Figure 5:

```text
{
  1: -7,                            / Algorithm        /
  3: application/example+json,      / Content type     /
  4: h'50685f55...50523255',        / Key identifier   /
  15: {                             / CWT Claims       /
    1: software.vendor.example,     / Issuer           /
    2: vendor.product.example,      / Subject          /
  }
}
```

### Payload formats (§ 6)

The Statement is any serializable content, for example CoSWID, CycloneDX, in-toto, SPDX, SLSA or SWID. The TS treats it as opaque.

### Detached and hashed payloads (§ 6.1, § 6.2)

The payload may be `nil` (detached), which supports large Statements and existing storage. For large or sensitive Statements, sign over a hash of the payload rather than the bytes (§ 6.2). SCRAPI's register example shows this with protected labels 258 (payload-hash-alg), 259 (preimage-content-type) and 260 (payload-location), and 16 (typ) set to `application/example+cose` (SCRAPI § 2.3). With a detached payload the TS still needs the content to verify the signature; how it gets it is implementation specific (SCRAPI § 2.3).

### Replay-sensitive payloads (SCRAPI § 4.4.2.1)

If payload meaning is time dependent, timestamps MUST be in the Issuer-signed protected header. An Issuer-supplied timestamp MUST use the `iat` claim in CWT Claims. A third-party timestamp SHOULD use the RFC 9921 header parameters for RFC 3161 tokens, or a similar mechanism such as an Epoch Marker claim, unless the profile names another protected-header mechanism.

## Receipt (§ 7, RFC 9942)

A Receipt is a COSE_Sign1 that MUST be tagged (RFC 9942 § 4.3). Its protected header carries `alg` (1), `vds` (395, the VDS algorithm) and, for SCITT, CWT Claims with the TS's `iss` and the `sub` (§ 6, Figure 10). Its unprotected header carries `vdp` (396), a map of proofs by proof type. The VDS determines the proof format (RFC 9942 § 4.2).

| Label        | Name               | Registry                                            |
| ------------ | ------------------ | --------------------------------------------------- |
| 394          | receipts           | COSE Header Parameters (RFC 9942 § 8.1)             |
| 395          | vds                | COSE Verifiable Data Structure Algorithms           |
| 396          | vdp                | map keys from COSE Verifiable Data Structure Proofs |
| `vds` 1      | RFC9162_SHA256     | Merkle tree with SHA-256 (RFC 9942 § 5.1)           |
| `vdp` key -1 | inclusion proofs   | array of bstr                                       |
| `vdp` key -2 | consistency proofs | array of bstr                                       |

### RFC9162_SHA256 inclusion proof (RFC 9942 § 5.2)

```cddl
inclusion-proof-content = [
  tree-size: uint,          ; tree size at current Merkle Tree root
  leaf-index: uint,         ; index of leaf in tree
  inclusion-path: [ + bstr ]
]
```

Each entry in the `-1` array is `bstr .cbor` of that structure. The signed payload is the Merkle Tree Hash at `tree-size` and is detached (`nil`) in practice: profiles SHOULD detach it so verifiers must recompute the root (RFC 9942 § 4.4). If `leaf-index` ≥ `tree-size`, fail (RFC 9942 § 5.2).

### RFC9162_SHA256 consistency proof (RFC 9942 § 5.3)

```cddl
consistency-proof-content = [
  tree-size-1: uint,        ; older tree size
  tree-size-2: uint,        ; newer tree size
  consistency-path: [ + bstr ]
]
```

The detached payload is the newer root at `tree-size-2`.

### Example decoded Receipt (§ 7 Figures 9 to 11)

```text
18([
  h'a4012604...6d706c65',       / Protected: {1: -7, 4: kid, 395: 1, 15: {1: TS iss, 2: sub}} /
  { 396: { -1: [ h'83080783...32568964' ] } },
  nil,                          / Detached payload /
  h'10f6b12a...4191f9d2'
])
inclusion proof = [ 8, 7, [ h'c561d333...', h'75f177fd...', h'0bdaaed3...' ] ]
```

## Transparent Statement (§ 7 Figure 7)

```cddl
Transparent_Statement = #6.18(COSE_Sign1)

Unprotected_Header = {
  &(receipts: 394)  => [+ bstr .cbor Receipt]
}
```

The Client that registered (not necessarily the Issuer) adds the Receipt to the unprotected header. Receipts from several TSs can sit in the same array (§ 5, § 7). The registration time is when the TS added the entry to its VDS (§ 7).

## Media types (§ 10, § 9.5)

| Media type                         | Describes        | File extension | CoAP Content-Format |
| ---------------------------------- | ---------------- | -------------- | ------------------- |
| `application/scitt-statement+cose` | Signed Statement | `.scitt`       | 277                 |
| `application/scitt-receipt+cose`   | Receipt          | `.receipt`     | 278                 |

Both are binary CBOR with no parameters. They describe the expected COSE header content; the payload's own media type is the `content_type` header (§ 9.5). SCRAPI's HTTP examples use `application/cose` for request and response bodies (SCRAPI § 2.3, § 2.4).

## Common mistakes

- Putting `iss` or `sub` in the unprotected header or in the payload. They belong in CWT Claims (15) in the protected header (§ 6).
- Omitting `kid` when there is no protected `x5t` or `x5chain` (§ 6).
- Using an untagged COSE_Sign1. Signed Statements, Receipts and Transparent Statements are `#6.18` (§ 6.1, § 7, RFC 9942 § 4.3).
- Placing receipts as raw arrays instead of `bstr .cbor Receipt` entries (§ 7).
- Using the pre-RFC temporary labels `-111` (vds) and `-222` (vdp). The registered labels are 395 and 396; see `versions.md`.
