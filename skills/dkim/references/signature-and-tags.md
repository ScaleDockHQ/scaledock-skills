# The DKIM-Signature header field and signing

Read this when building or reviewing a signer, choosing tag values, choosing which header fields to sign, or deciding on `l=`. Section numbers are RFC 6376 unless another RFC is named. Sources are listed in [Sources](../SKILL.md#sources).

## Tag=value syntax (§ 3.2)

- The value is a `tag-list`: `tag=value` pairs separated by `;`, with an optional trailing `;`. Whitespace around tags and before `;` is not part of the value; whitespace inside a value is significant.
- Tag names are case-sensitive. Values are case-sensitive unless the tag says otherwise.
- A duplicated tag name makes the whole tag-list invalid.
- Unrecognized tags MUST be ignored (and, in a DKIM-Signature, still hashed, § 3.5).
- An empty value is not the same as an omitted tag: omitted means the default, empty means the empty string.
- Erratum 5070 corrects the ABNF: `tag-spec = [FWS] tag-name [FWS] "=" [FWS] [tag-value [FWS]]`, so an empty value cannot leave a whitespace-only line.

## Tags

Required tags are `v`, `a`, `b`, `bh`, `d`, `h` and `s` (§ 3.5, § 6.1.1). Each tag is listed in the IANA "DKIM-Signature Tag Specifications" registry.

| Tag  | Encoding              | Required        | Meaning and rules                                                                                                                                                                                                                                                                        |
| ---- | --------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `v`  | plain text            | yes             | MUST be `1` (§ 3.5).                                                                                                                                                                                                                                                                     |
| `a`  | plain text            | yes             | `rsa-sha256` or `ed25519-sha256`. Signers MUST sign with rsa-sha256; rsa-sha1 MUST NOT be used (RFC 8301 § 3.1). Signers SHOULD implement ed25519-sha256 (RFC 8463 § 5).                                                                                                                 |
| `b`  | base64                | yes             | The signature. Whitespace is ignored, so FWS may be inserted anywhere for line length (§ 3.5).                                                                                                                                                                                           |
| `bh` | base64                | yes             | The hash of the canonicalized body, limited by `l=` (§ 3.5, § 3.7). Whitespace is ignored.                                                                                                                                                                                               |
| `c`  | plain text            | no              | `header/body` canonicalization, default `simple/simple`. A single name sets the header algorithm and leaves the body `simple`: `c=relaxed` means `relaxed/simple` (§ 3.5). See [canonicalization.md](canonicalization.md).                                                               |
| `d`  | plain text            | yes             | The SDID, the domain claiming responsibility, and the domain the key is fetched under. MUST be a valid DNS name; IDNs as A-labels (§ 3.5), or U-labels in internationalized header fields (RFC 8616 § 5).                                                                                |
| `h`  | plain text            | yes             | Colon-separated names of the signed header fields, in the order they are hashed. MUST NOT be empty, MUST include `From`, and MUST NOT include the DKIM-Signature being created (§ 3.5, § 5.4). Names compare case-insensitively. Names of absent fields are allowed and hash as nothing. |
| `i`  | dkim-quoted-printable | no              | The AUID, `[local-part]@domain`. Default `@` plus the `d=` value. Its domain MUST equal or be a subdomain of `d=` (§ 3.5); with key flag `t=s`, it MUST equal `d=` (§ 3.10). The SDID, not the AUID, is DKIM's mandatory output (§ 3.11).                                                |
| `l`  | decimal               | no              | Number of canonicalized body octets hashed, default the whole body. MUST NOT exceed the canonicalized body length. At most 76 digits; check for overflow (§ 3.5). See [Body length](#body-length-l).                                                                                     |
| `q`  | plain text            | no              | Key query methods, default `dns/txt`, the only defined method (§ 3.5).                                                                                                                                                                                                                   |
| `s`  | plain text            | yes             | The selector. Periods split it into DNS labels (§ 3.1, § 3.5).                                                                                                                                                                                                                           |
| `t`  | decimal               | no, RECOMMENDED | Signing time in seconds since the Unix epoch, UTC, no leap seconds. Handle values up to at least 10^12; values over 12 digits MAY be treated as infinite; verifiers MAY ignore future timestamps (§ 3.5).                                                                                |
| `x`  | decimal               | no, RECOMMENDED | Absolute expiry time, same format as `t=`. MUST be greater than `t=` when both are present. Not an anti-replay defence. Verifiers MAY treat expired signatures as invalid and MAY allow for clock drift (§ 3.5).                                                                         |
| `z`  | dkim-quoted-printable | no              | Vertical-bar-separated copies of header fields as signed, for diagnostics only. Vertical bars and all whitespace inside values are encoded (§ 3.5).                                                                                                                                      |

Other registered tags (`atps`, `atpsh` from RFC 6541, `r` from RFC 6651) belong to extensions this skill does not cover. A verifier that does not implement them ignores them (§ 3.2).

DKIM-Quoted-Printable (§ 2.11): encode controls, 8-bit octets, DEL, SPACE and `;` as `=XX` with uppercase hex, and all whitespace including CR and LF. FWS added after encoding is not part of the value. `q=` arguments also encode `:` (erratum 4810), and `z=` values also encode `|`.

## Choosing header fields (§ 5.4, § 5.4.1, § 5.4.2)

- `From` MUST be signed. Do not sign fields likely to be changed or removed in transit, such as `Return-Path`, `Received`, `Comments` and `Keywords`.
- Strongly advised: `Date`, `Subject`, `Reply-To`, `Sender` and all MIME header fields. Common choices for the message core: `From`, `Reply-To`, `Subject`, `Date`, `To`, `Cc`, `Resent-Date`, `Resent-From`, `Resent-To`, `Resent-Cc`, `In-Reply-To`, `References`, `Message-ID`, and the `List-*` fields (`List-Id`, `List-Help`, `List-Unsubscribe`, `List-Subscribe`, `List-Post`, `List-Owner`, `List-Archive`).
- If `l=` is used, sign `Content-Type` too, because a replaced `Content-Type` can render completely different content (§ 5.4.1).
- Sign every field the end user sees, or a replayed message can carry a new `Subject` (§ 5.4).
- Multiple instances: a field name in `h=` selects the physically last unused instance, so instances are signed from the bottom of the header block up. To sign two `Received` fields, list `Received` twice (§ 5.4.2).
- Signing existing `DKIM-Signature` fields is legal but unadvised, because intermediaries may reorder them (§ 4.2, § 8.12).

### Oversigning

List a name one more time than it occurs to stop any further instance from being added: `h=from:from:...` for a message with one `From` (§ 5.4, § 8.15). A name for an absent field hashes as the null string, so adding that field later breaks the signature. Listing it once more than its count is enough; more is legal (§ 5.4). The RFC 8463 Appendix A example oversigns `from`, `subject` and `date`.

## Body length (`l=`)

- Without `l=`, the whole body is signed. `l=` lets content be appended after signing, for mailing lists that add trailers and do not re-sign (§ 5.3.1, § 8.2).
- The count is taken after body canonicalization (§ 5.3.1). `l=0` leaves the body completely unsigned (§ 5.3.1, § 5.4.1).
- Risk: an intermediary can append content that replaces what the recipient sees, through MIME structure changes or lax HTML parsing (§ 8.2). Signers "should be extremely wary of using this tag", and verifiers and assessors may ignore signatures that use it or that leave content beyond `l=` (§ 6.1.3, § 8.2).
- Signers that want no modification at all use `c=simple/simple` and omit `l=` (§ 5.3.1).

## Preparing the message (§ 5.3, § 3.7)

- Sign the message as the verifier will receive it, not a local form. Convert bare CR or LF to CRLF before signing, and send the converted message (§ 5.3).
- Convert 8-bit content to a 7-bit MIME transfer encoding (quoted-printable or base64) before signing, because 7-bit downgrades in transit break signatures (§ 5.3).
- Hash after any MIME content-transfer encoding, and before SMTP dot-stuffing (§ 3.7). MIME attachments are part of the signed body (§ 3.7).

## Computing and inserting the signature (§ 3.7, § 5.5, § 5.6)

1. Body hash: canonicalize the body with the `c=` body algorithm, truncate to `l=` if present, hash with SHA-256, base64-encode into `bh=`.
2. Header hash input, in order:
   1. each field named in `h=`, in `h=` order, canonicalized with the `c=` header algorithm, each ending in one CRLF;
   2. the DKIM-Signature field being created, with the value of `b=` empty (and surrounding whitespace deleted), canonicalized the same way, with **no** trailing CRLF.
3. Sign that hash: RSA with PKCS #1 v1.5 for `rsa-sha256`, with a public exponent that SHOULD be 65537 (§ 3.3.2), or PureEdDSA Ed25519 over the SHA-256 hash for `ed25519-sha256` (RFC 8463 § 3). Do not truncate or convert the hash before signing.
4. Put the signature into `b=` and insert the field before every other DKIM-Signature field; prepending it to the header block is easiest (§ 5.6, § 3.5).

Erratum 5252 corrects the § 3.7 pseudo-code: `data-hash = hash-alg(h-headers, D-SIG)`. The body hash is covered through `bh=` inside D-SIG, not hashed a second time.

Every tag in the field is hashed, including tags the verifier does not understand; only the `b=` value is blank (§ 3.7).

## Multiple signatures (§ 4.2, RFC 8463 § 6)

- A signer MAY add several DKIM-Signature fields, for example rsa-sha256 and ed25519-sha256 during a transition. They need different selectors, because each selector has one key record; `d=` and `i=` can be the same.
- Signers SHOULD NOT remove existing DKIM-Signature fields, even ones they know are broken (§ 4.2).
- An intermediary that changes the message (for example a mailing list adding an unsubscribe footer) SHOULD check existing signatures first and MUST make its changes before it signs (§ 5.5).

## Example (RFC 8463 Appendix A.3)

```text
DKIM-Signature: v=1; a=ed25519-sha256; c=relaxed/relaxed;
 d=football.example.com; i=@football.example.com;
 q=dns/txt; s=brisbane; t=1528637909; h=from : to :
 subject : date : message-id : from : subject : date;
 bh=2jUSOH9NhtVGCQWNr9BrIAPreKQjO6Sn7XIkfJVOzv8=;
 b=/gCrinpcQOoIfuHNQIbq4pgh9kyIK3AQUdt9OdqQehSwhEIug4D11Bus
 Fa3bT3FY5OsU7ZbnKELq+eXdp1Q1Dw==
```

The second signature on the same message uses `a=rsa-sha256; s=test` with the same `d=`, `i=` and `h=`.
