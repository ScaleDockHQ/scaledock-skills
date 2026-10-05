# Versions and upgrades

Read this when choosing a target version, reading a system that signs with the pre-standard cavage drafts or sends RFC 3230 `Digest`, or upgrading one. Sources: RFC 9421, draft-cavage-http-signatures-12, RFC 9530 (Section 1.3 and Appendix E cover RFC 3230), RFC 3230, RFC 9651, the RFC Editor entries and errata, and the IANA registries, listed in [Sources](../SKILL.md#sources).

## Version lines

Two families: `signatures` (message signatures) and `digest` (content and representation digests). Each has one current line.

| Id          | Line                            | Status  | Revision                                                 | Posture | Summary                                                                                  |
| ----------- | ------------------------------- | ------- | -------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------- |
| `rfc9421`   | RFC 9421                        | current | RFC 9421, Proposed Standard (February 2024)              |         | The default for signatures. No updating or obsoleting RFC; two verified errata.          |
| `cavage-12` | draft-cavage-http-signatures-12 | legacy  | Individual Internet-Draft -12 (20 October 2019), expired |         | The widely deployed pre-standard format. -12 is the last revision; RFC 9421 replaces it. |
| `rfc9530`   | RFC 9530                        | current | RFC 9530, Proposed Standard (February 2024)              |         | The default for digests: `Content-Digest`, `Repr-Digest` and the `Want-*` fields.        |
| `rfc3230`   | RFC 3230                        | legacy  | RFC 3230, Proposed Standard (January 2002)               |         | `Digest` and `Want-Digest`. Obsoleted by RFC 9530.                                       |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

The datatracker lists draft-cavage-http-signatures at revision 12, dated 2019-10-21, expired 2020-04-23. RFC 9421 cites it as [SIGNING-HTTP-MESSAGES] and says it was "initially based on" that draft (RFC 9421 Acknowledgements). Earlier cavage revisions differ in details; this file describes -12.

RFC 9421 and RFC 9530 cite RFC 8941 for Structured Fields. RFC 9651 obsoletes RFC 8941 and adds the Date and Display String types and refines parse failure handling (RFC 9651 Appendix D); none of the types RFC 9421 or RFC 9530 use changed. Use an RFC 9651 parser.

## Which version to use

- Sign and verify with RFC 9421; send digests with RFC 9530. Both are the only current lines in their families.
- No line is supported. A cavage peer or an RFC 3230 peer is input to an upgrade, not a second target.
- During a migration, detect the format before parsing: if `Signature-Input` is present, parse every `Signature` field as RFC 9421 (Appendix A). A cavage `Signature` value such as `keyId="k",algorithm="hs2019",...` is not a valid Structured Fields Dictionary, because Dictionary keys cannot contain uppercase characters (RFC 9651 § 3.2).
- The two formats share the field name `Signature`, so one message cannot carry a cavage signature and an RFC 9421 signature at the same time.

## What changed

### RFC 9421 (from draft-cavage-http-signatures-12)

- Metadata moved to its own field. Cavage puts `keyId`, `algorithm`, `created`, `expires`, `headers` and `signature` as auth-params in one `Signature` header or in `Authorization: Signature ...` (cavage § 2.1, § 3.1, § 4.1). RFC 9421 splits them into `Signature-Input` (a Dictionary of Inner Lists with parameters) and `Signature` (a Dictionary of Byte Sequences), keyed by a label (§ 4.1, § 4.2).
- Several signatures per message, each with a label (§ 4.3). Cavage has one.
- Covered components replace the `headers` list. Cavage pseudo-headers `(request-target)`, `(created)` and `(expires)` (cavage § 2.3) become derived components (`@method`, `@path`, `@query`, `@target-uri`, `@authority`, `@scheme`, `@request-target`, `@query-param`, `@status`; § 2.2) and signature parameters (`created`, `expires`; § 2.3).
- The signature always covers its own metadata, because `@signature-params` is the last line of every base (§ 2.3). In cavage, metadata was covered only if listed in `headers`.
- Lines are serialized as Structured Fields: the identifier is a quoted string with parameters, for example `"content-type": application/json` (§ 2.5). Cavage lines are bare `content-type: application/json` (cavage § 2.3 step 4).
- Field parameters `sf`, `key`, `bs`, `tr` and `req` (§ 2.1, § 2.4) and `Accept-Signature` (§ 5) are new. Cavage had no response-to-request binding and requested signatures only through `WWW-Authenticate: Signature headers="..."` (cavage § 3.1.1).
- Algorithms are fully specified registry entries (`rsa-pss-sha512`, `rsa-v1_5-sha256`, `hmac-sha256`, `ecdsa-p256-sha256`, `ecdsa-p384-sha384`, `ed25519`; § 3.3, § 6.2.2). Cavage `hs2019` derives the signature algorithm from key metadata with SHA-512 hashing, and its `rsa-sha1`, `rsa-sha256`, `hmac-sha256` and `ecdsa-sha256` are marked deprecated (cavage Appendix E.2).
- Time values are Integers with no sub-second precision (§ 2.3). Cavage `expires` allowed decimals (cavage § 2.1.5).
- There is no `Signature` HTTP authentication scheme. How a failed signature maps to 401, 403 or 400 is part of the application profile (§ 1.4).

RFC 9421 has two verified errata, both renaming `@signature-input` to `@signature-params`: 8102 (editorial, the example base in § 7.2.8) and 8103 (technical, the prose of § 7.5.3). The base line is always `"@signature-params": ...`.

### RFC 9530 (from RFC 3230)

- `Digest` is split in two: `Repr-Digest` hashes the selected representation data, which is what RFC 3230 meant by "instance"; `Content-Digest` hashes the message content, which many RFC 3230 implementations computed by mistake (RFC 9530 § 1.3, Appendix E).
- `Want-Digest` becomes `Want-Content-Digest` and `Want-Repr-Digest`, with integer weights 0 to 10 instead of q-values (RFC 9530 § 4; RFC 3230 § 4.3.1).
- Values are Structured Fields Dictionaries with lowercase algorithm keys and Byte Sequence values, so every algorithm uses one encoding (RFC 9530 § 2, § 3, Appendix E). RFC 3230 let each algorithm pick its encoding (base64, decimal, hexadecimal; RFC 3230 § 4.2; IANA HTTP Digest Algorithm Values).
- A new registry, Hash Algorithms for HTTP Digest Fields, marks `sha-256` and `sha-512` Active and `md5`, `sha`, `unixsum`, `unixcksum`, `adler` and `crc32c` Deprecated; the RFC 3230 registry is deprecated (RFC 9530 § 7.2, § 7.3).
- The field registry lists `Digest` and `Want-Digest` as obsoleted (RFC 9530 § 7.1).

RFC 9530 has two verified editorial errata (8158, 8273) and one reported technical erratum (8890) saying the Brotli bytes in Appendix B.4 and B.6 are invalid and should start `0B 09`; do not use those two examples as test vectors until it is resolved.

## Upgrading

### draft-cavage-http-signatures-12 to RFC 9421

1. Change the version marker: stop emitting the cavage `Signature` header and `Authorization: Signature`. Emit `Signature-Input: <label>=(<components>);<params>` and `Signature: <label>=:<base64>:` (§ 4.1, § 4.2). Pick a label such as `sig1`; give it no meaning (§ 7.2.5).
2. Replace removed or renamed fields, mapping each `headers` entry:
   - `(request-target)` (lowercased method, a space, and the path with query; cavage § 2.3 step 1) becomes `"@method" "@path" "@query"`, or `"@target-uri"`. `@method` is case-sensitive and not lowercased (§ 2.2.1). Use `@request-target` only when HTTP/1.1 is guaranteed (§ 2.2.5).
   - `(created)` and `(expires)` become the `created` and `expires` parameters; do not list them as components. Make `expires` an Integer (§ 2.3).
   - `host` becomes `"@authority"` (§ 2.2.3, § 7.2.4). Keep `date` only if the profile needs it; use `created` for time windows (§ 7.2.4).
   - `digest` becomes `"content-digest"` or `"repr-digest"`; upgrade the digest too (next checklist).
   - Other header names stay as lowercased field names (§ 2.1).
   - `keyId` becomes `keyid` (lowercase; parameter keys cannot contain uppercase, RFC 9651 § 3.1.2). Its value stays the same string if the key lookup does not change.
   - `algorithm` is dropped or replaced by `alg` with a registry value. `hs2019` is not in the RFC 9421 registry (IANA HTTP Signature Algorithms). Prefer leaving `alg` out and fixing the algorithm per key in configuration (§ 7.3.6). Cavage `rsa-sha256` uses the same primitive as `rsa-v1_5-sha256`, `hmac-sha256` as `hmac-sha256`, and `ecdsa-sha256` as `ecdsa-p256-sha256`; cavage `rsa-sha1` has no RFC 9421 equivalent, so move to another algorithm. For `hs2019` with an RSA key, choose `rsa-pss-sha512` (RSASSA-PSS, MGF1 SHA-512, 64-byte salt; § 3.3.1) or `rsa-v1_5-sha256` explicitly and configure it on both sides.
   - A missing `headers` meant `(created)` only (cavage § 2.1.6). In RFC 9421, an empty component list is allowed but discouraged (Appendix B.2.1); cover the components the profile requires.
3. Validate against the target: rebuild the base with the RFC 9421 algorithm (quoted identifiers, final `@signature-params` line; § 2.5) and check the Appendix B.2 test cases. Signatures are not byte-compatible across the formats: the base differs, `ed25519` signs the base with no prehash (§ 3.3.6), and ECDSA output is the fixed-length `r || s` concatenation (§ 3.3.4, § 3.3.5), which -12 does not define. Replace `WWW-Authenticate: Signature headers=...` challenges with `Accept-Signature` (§ 5) and a profile-defined error response (§ 1.4).
4. Keep behaviour unchanged: keep the cavage verifier checks as profile rules. Cavage required rejecting a `created` in the future and an `expires` in the past, and required deriving the algorithm from `keyId` metadata rather than the `algorithm` value (cavage § 2.1.4, § 2.1.5, § 2.5); RFC 9421 leaves time checks to the application and requires matching algorithms when stated in several places (§ 3.2 step 6, § 3.2.1). Run both formats side by side only by detecting `Signature-Input` (Appendix A), and remove the cavage path once every peer has moved.

### RFC 3230 to RFC 9530

1. Change the version marker: stop sending `Digest` and `Want-Digest` (RFC 9530 § 1.3, § 7.1).
2. Replace removed or renamed fields:
   - Decide what the old implementation hashed. If it hashed the full selected representation, send `Repr-Digest`; if it hashed the bytes in the message, send `Content-Digest` (RFC 9530 Appendix E).
   - `Digest: SHA-256=<base64>` becomes `Repr-Digest: sha-256=:<base64>:` (or `Content-Digest`). Algorithm keys are lowercase registry keys; values are Byte Sequences in colons (RFC 9530 § 2, § 3, § 7.2).
   - `SHA-512` becomes `sha-512`. `MD5`, `SHA`, `UNIXsum`, `UNIXcksum`, `ADLER32` and `CRC32c` map to Deprecated keys (`md5`, `sha`, `unixsum`, `unixcksum`, `adler`, `crc32c`); keep them only for non-adversarial corruption checks and move to `sha-256` or `sha-512` (RFC 9530 § 5). Their old decimal or hex outputs are now Byte Sequences of the raw checksum bytes (RFC 9530 Appendix D, Appendix E).
   - `Want-Digest: sha-256;q=1, md5;q=0.3` becomes `Want-Repr-Digest: sha-256=10, md5=3` (or `Want-Content-Digest`), weights 1 to 10 with 0 meaning not acceptable (RFC 9530 § 4).
   - RFC 3230's `contentMD5` Want-Digest token (RFC 3230 § 5) has no RFC 9530 equivalent.
3. Validate against the target: check outputs against RFC 9530 Appendix D (`sha-256` of `{"hello": "world"}` is `:X48E9qOokqqrvdts8nOJRJN3OWDUoyWxBf7kbu9DBPE=:`), and parse fields with a Structured Fields parser.
4. Keep behaviour unchanged: if the digest was covered by a cavage signature, cover the new field name in the RFC 9421 signature, and keep validating the digest against the received data (§ 7.2.8).

## Preview

No preview line is listed. The RFC Editor shows no RFC that updates or obsoletes RFC 9421 or RFC 9530, and the cavage draft series ended at -12. New algorithms, metadata parameters, derived components and component parameters arrive through the IANA HTTP Message Signature registries, not through new versions of the RFC; recheck them when refreshing.
