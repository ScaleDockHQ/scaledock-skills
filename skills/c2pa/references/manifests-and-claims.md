# Manifests, the manifest store and claims

Read this when serializing or parsing a C2PA Manifest Store, writing a claim, labelling manifests, embedding a store in an asset or serving it externally, or adding ingredient manifests. Section numbers are from the C2PA 2.4 Technical Specification listed in [Sources](../SKILL.md#sources).

## Structure

An asset's Content Credentials are a **C2PA Manifest Store**: a JUMBF (ISO 19566-5:2023) superbox holding one or more **C2PA Manifests**. Each manifest holds one **assertion store**, one **claim** and one **claim signature** (§ 11.1.4.2, § 11.2.1).

| Box                 | Label                      | JUMBF type UUID                                 | Content                                          |
| ------------------- | -------------------------- | ----------------------------------------------- | ------------------------------------------------ |
| Manifest Store      | `c2pa`                     | `63327061-0011-0010-8000-00AA00389B71` (`c2pa`) | One or more manifests; the last is active        |
| Standard manifest   | `urn:c2pa:<uuid>…`         | `63326D61-0011-0010-8000-00AA00389B71` (`c2ma`) | Assertion store, claim, claim signature          |
| Update manifest     | `urn:c2pa:<uuid>…`         | `6332756D-0011-0010-8000-00AA00389B71` (`c2um`) | As above, no hard binding                        |
| Compressed manifest | same as the inner manifest | `6332636D-0011-0010-8000-00AA00389B71` (`c2cm`) | A `brob` box with the Brotli-compressed manifest |
| Assertion store     | `c2pa.assertions`          | `63326173-0011-0010-8000-00AA00389B71` (`c2as`) | One superbox per assertion                       |
| Claim               | `c2pa.claim.v2`            | `6332636C-0011-0010-8000-00AA00389B71` (`c2cl`) | One CBOR content box                             |
| Claim signature     | `c2pa.signature`           | `63326373-0011-0010-8000-00AA00389B71` (`c2cs`) | One CBOR content box (`COSE_Sign1_Tagged`)       |

Rules (§ 11.1.2, § 11.1.4):

- Never process an assertion, assertion store, claim, signature or manifest that is not inside a Manifest Store. Skip JUMBF boxes with unrecognized type UUIDs; keep any box that has both the Requestable and Label Present toggles when rewriting a store.
- Every JUMBF Description box sets Label Present and Requestable; a salt in a private box also sets the Private toggle. Labels are UTF-8, null-terminated, and exclude control characters, `/`, `;`, `?`, `#`, U+FEFF, U+FFFF and surrogates.
- Assertion content boxes should be CBOR, JSON, Embedded File or UUID content types; custom formats use a UUID content box.
- Consumers accept the old standard-manifest UUID `c2md`; generators never write it (§ 11.2.2).
- Data boxes (`c2pa.databoxes`, `c2pa.data`) are deprecated; use embedded data assertions (§ 11.1.4.6, § 18.12).

## Manifest types

- **Standard manifest** (`c2ma`): exactly one hard binding assertion, one of `c2pa.hash.data`, `c2pa.hash.boxes`, `c2pa.hash.collection.data`, `c2pa.hash.bmff.v3` (or deprecated `c2pa.hash.bmff.v2`) (§ 11.2.2).
- **Update manifest** (`c2um`): adds assertions without changing bound content (§ 11.2.3). It has no hard binding, no `c2pa.hash.multi-asset`, no thumbnail; its actions are only `c2pa.edited.metadata`, `c2pa.opened`, `c2pa.published` or `c2pa.redacted`; it may carry a time-stamp assertion and a certificate status assertion; and it has exactly one `c2pa.ingredient.v3` with `relationship` `parentOf` whose `activeManifest` and `claimSignature` point to the manifest being updated. For a data hash binding, the store must still start at the same file offset.
- **Compressed manifest** (`c2cm`): either type, Brotli-compressed into a `brob` box. A data hash assertion must not be used with a compressed manifest (§ 11.2.4, § 18.5.1). Hash a compressed manifest box like any other box, without decompressing (§ 11.1.3.2).
- **Time-stamp manifest** (`c2tm`): historical. Not written and not read; use a time-stamp assertion in an update manifest (§ 11.2.5).

## Manifest labels and URIs

- Each manifest is labelled with a `c2pa` URN: `urn:c2pa:` + a UUID v4, then an optional claim generator identifier (0 to 32 visible ASCII characters) and an optional `version_reason` (§ 8.1). Examples: `urn:c2pa:F9168C5E-CEB2-4FAA-B6BF-329BF39FA1E4`, `…:acme:2_1`.
- On a label conflict with a different manifest, re-label by appending `:<n>_1` (reason 1 is "conflict"), adding an empty generator identifier first if there is none (§ 8.2).
- All references inside a store are JUMBF URIs. `hashed_uri` (`url`, optional `alg`, `hash`) points inside the store with `self#jumbf=`; a leading `/` makes it store-relative, otherwise it is manifest-relative; `..` is forbidden (§ 8.4.2.1). An ambiguous label in a path makes the reference unresolved (§ 8.4.1).
- `hashed_ext_uri` points to an http(s) resource and requires `alg` and `hash`; `dc:format`, `size` and `data_types` are optional (§ 8.4.2.2).
- Hash a referenced box over its JUMBF Description box and all content boxes, excluding the superbox header (§ 8.4.2.3). Each assertion should carry a random 16 or 32 byte salt in a private `c2sh` box so later redaction is safe (§ 6.6, § 8.4.2.3).

## The claim (`c2pa.claim.v2`)

The claim is CBOR with Core Deterministic Encoding (RFC 8949 § 4.2.1) (§ 10.1). Generators must not write the deprecated v1 `c2pa.claim`; validators should still accept it.

| Field                     | Rule                                                                                                                                                                                                                          |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `instanceID`              | Required. The asset's `xmpMM:InstanceID` when it has XMP, otherwise another unique identifier (§ 10.2.2).                                                                                                                     |
| `claim_generator_info`    | Required single map with `name`; optional `version`, `icon` (hashed URI to a `c2pa.icon` embedded data assertion), `operating_system`, `specVersion` (§ 10.2.3). Describes the hardware or software that generated the claim. |
| `signature`               | Required. Absolute URI to the claim signature in the same manifest, for example `self#jumbf=c2pa.signature` (§ 10.2.2, § 10.3.2.3).                                                                                           |
| `created_assertions`      | Required, one or more hashed URIs. Attributed to the signer. In a standard manifest it includes the hard binding (§ 10.2.2, § 10.3.2.1).                                                                                      |
| `gathered_assertions`     | Optional. Assertions supplied by other workflow components, for example human-entered data; part of the claim but not attributed to the signer.                                                                               |
| `redacted_assertions`     | Optional. JUMBF URIs of redacted assertions in ingredient manifests, never in this claim's own manifest.                                                                                                                      |
| `alg`                     | Hash algorithm for any hashed URI or hash assertion that does not name its own. If absent, every one of them must name its algorithm (§ 10.2.2).                                                                              |
| `alg_soft`                | Default soft binding algorithm.                                                                                                                                                                                               |
| `dc:title`                | Optional; prefer a metadata assertion with `dc:title`.                                                                                                                                                                        |
| `specVersion`, `metadata` | Deprecated at claim level in 2.4; put `specVersion` in `claim_generator_info` as SemVer, for example `"2.4.0"` (§ 10.2.3.2).                                                                                                  |

Validators treat `specVersion` as informational and do not change validation logic on it (§ 10.2.3.2).

## Creating and signing a manifest

1. Create every assertion and put it in the assertion store (§ 10.3.1).
2. Fill `created_assertions` and `gathered_assertions` with hashed URIs to them; list ingredient redactions in `redacted_assertions` (§ 10.3.2.1).
3. Add ingredient manifests into this store (§ 10.3.2.2). If a manifest with the same label is already there: identical means ignore the new one; different means re-label it and add it. A remote ingredient manifest that cannot be fetched is recorded as `manifest.inaccessible`.
4. Set `signature` to the signature box URI, then sign: the `Sig_structure` payload is the serialized CBOR of the claim, in detached mode, and the `COSE_Sign1_Tagged` goes into the claim signature box (§ 10.3.2.4). See [`signing-and-trust.md`](signing-and-trust.md).
5. Time-stamp the signature if possible (one time-stamp per manifest, v2 payload, `sigTst2`) and staple OCSP responses (§ 10.3.2.5, § 10.3.2.6). If revocation information is stapled, a time-stamp is required.
6. Put the active manifest last in the store, and embed or publish the store.

### Multiple step processing

Formats where the store sits before the bound content (for example JPEG 1) need two passes (§ 10.4):

- Write the data hash with `start` and `length` of the store exclusion as 0, encoded as 32-bit integers, and a zero-filled `pad` of at least 16 bytes.
- Write a temporary `COSE_Sign1_Tagged`: empty protected bucket, an unprotected map with `pad` of zero bytes (25 KB recommended), `nil` payload, empty signature.
- Embed the store, fill in the real offsets without changing the assertion box size (split padding across `pad` and `pad2` when a size cannot be hit), hash, sign, and shrink the unprotected `pad` so the signature box keeps its size. If the signature does not fit, repeat with more padding and a new time-stamp.
- Exclusions and padding must not be able to change how the asset is interpreted; for JPEG 1, include every APP11 C2PA marker and length in the exclusion so segments cannot be shortened or retyped.

## Embedding and external manifests

- Appendix A gives per-format embedding (JPEG, PNG, GIF, TIFF, BMFF, PDF, ZIP, fonts, HTML, structured and unstructured text, and more). Formats such as BMP cannot embed; use an external manifest (§ 11.3).
- An external store is served as `application/c2pa`; `application/x-c2pa-manifest-store` is deprecated (§ 11.4).
- For an external store, an asset with XMP should carry `dcterms:provenance` with the store's URI; fonts use their C2PA table instead (§ 11.5). Over HTTP, validators look for an RFC 8288 `Link` header with `rel=c2pa-manifest`, so a server can point to the store there (§ 15.5.3.2).
- An asset with more than one embedded store, or a PDF update section with more than one, is treated as having none (§ 15.5.2).

## Redaction and ingredient manifests

- Redaction removes an assertion from an ingredient manifest, or keeps its box and replaces its content with a UUID content box `CAA98EEE-9D4D-F80E-86AD-4DFFCA263973` filled with zeros, and lists it in `redacted_assertions`; a `c2pa.redacted` action with a `reason` should accompany it (§ 6.8, § 18.15.4.2).
- Never redact `c2pa.actions` or `c2pa.actions.v2`. An update manifest never redacts the current asset's hard binding. Remove an ingredient's manifest from the store when its last reference is redacted (§ 6.8).
- Only `c2pa.ingredient.v3` survives redaction during validation; v1 and v2 ingredient assertions fail (§ 6.8).
- When copying an ingredient's store, copy validated manifests not yet present; compare same-label manifests by hash, merge redactions, and re-label genuine conflicts. Also copy unvalidated manifests and unknown JUMBF boxes for forward compatibility (§ 18.16.11, § 18.16.12).
