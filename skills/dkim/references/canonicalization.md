# Canonicalization

Read this when implementing or debugging the `c=` algorithms, or when a body hash or signature fails for no obvious reason. Section numbers are RFC 6376 unless another source is named. Sources are listed in [Sources](../SKILL.md#sources).

## Rules that apply to both algorithms (§ 3.4)

- Header and body each use `simple` or `relaxed`, chosen independently in `c=header/body`. The default is `simple/simple`; `c=relaxed` means `relaxed/simple` (§ 3.5).
- Verifiers MUST implement both algorithms, and MUST ignore signatures that name an unknown one (§ 3.4).
- Canonicalization only prepares the input to the hash. It MUST NOT change the transmitted message (§ 3.4).
- Input is assumed to be in network normal form: ASCII, lines separated by CRLF (§ 3.4). Fix bare CR or LF before signing (§ 5.3).

## Header: `simple` (§ 3.4.1)

Present each header field exactly as it is in the message. No case folding of names, no whitespace changes, folding kept.

## Header: `relaxed` (§ 3.4.2, erratum 5839)

Apply in order:

1. Lowercase the header field name (not the value): `SUBJect: AbC` becomes `subject: AbC`.
2. Unfold continuation lines: a CRLF followed by WSP is read without the CRLF. Keep the CRLF that ends the field.
3. Replace each run of one or more WSP (space or tab), including whitespace around a former fold, with one SP.
4. Delete the SP, if present, at the end of the unfolded value before its final CRLF. (RFC 6376 says "all WSP characters at the end"; verified erratum 5839 corrects it, because after step 3 at most one SP remains.)
5. Delete whitespace before and after the colon between name and value. Keep the colon.

In internationalized header fields, field names are still ASCII, so step 1 is still ASCII lowercasing (RFC 8616 § 5).

## Body: `simple` (§ 3.4.3)

- Reduce any run of empty lines (CRLF) at the end of the body to a single CRLF.
- If there is no body, or no CRLF at the end, add a CRLF. An empty or missing body canonicalizes to CRLF, 2 octets.
- Change nothing else.
- Empty-body hash: SHA-256 `frcCV1k9oG9oKj3dpUqdJg1PxRT2RSN/XKdLCPjaYaY=`.

## Body: `relaxed` (§ 3.4.4)

Apply (a) then (b):

1. (a) In each line, delete all whitespace at the end of the line (keep the CRLF), and replace every run of WSP within a line with one SP.
2. (b) Delete all empty lines at the end of the body. If the body is non-empty but does not end in CRLF, add one.

- An empty body canonicalizes to the empty string, unlike `simple`.
- Empty-body hash: SHA-256 `47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=`.

The SHA-1 values RFC 6376 also lists are of historic interest only; rsa-sha1 MUST NOT be used (RFC 8301 § 3.1).

## Worked example (§ 3.4.5)

Input (`<SP>`, `<HTAB>`, `<CRLF>` mark whitespace):

```text
A: <SP> X <CRLF>
B <SP> : <SP> Y <HTAB><CRLF>
                <HTAB> Z <SP><SP><CRLF>
<CRLF>
<SP> C <SP><CRLF>
D <SP><HTAB><SP> E <CRLF>
<CRLF>
<CRLF>
```

`relaxed` header gives `a:X<CRLF>` and `b:Y<SP>Z<CRLF>`. `relaxed` body gives `<SP>C<CRLF>` and `D<SP>E<CRLF>`. `simple` body keeps `<SP>C<SP><CRLF>` and `D<SP><HTAB><SP>E<CRLF>` and drops only the trailing empty lines.

## Choosing (§ 5.4.1, § 8.1)

- Signers SHOULD choose by message type and risk tolerance. Transactional mail that no intermediary should touch (for example purchase receipts) generally prefers `simple`; person-to-person mail that crosses lists and forwarders generally prefers `relaxed` (§ 5.4.1).
- `relaxed` body canonicalization allows crude "ASCII art" changes by adjusting the spacing between words; use `simple` body if that matters (§ 8.1).
- No modification of any kind: `c=simple/simple` and no `l=` (§ 5.3.1).

## Debugging hash failures

- Body hash mismatch ("body hash did not verify", § 6.1.3): check line endings (bare LF), trailing whitespace and blank lines, a transfer-encoding change after signing (§ 5.3), a footer added after signing, and whether `l=` was applied after canonicalization (§ 5.3.1).
- Signature mismatch with a correct body hash: check that `h=` fields are taken bottom-up for repeated names (§ 5.4.2), that missing fields hash as nothing (§ 5.4), that the signature field is hashed last with an empty `b=` and no trailing CRLF (§ 3.7, erratum 5252), and that the relaxed trailing-SP rule follows erratum 5839.
- When testing against RFC 6376 Appendix A, apply errata 3192 (one space after "game.") and 4926 (six-space continuation indentation); the published text does not verify as printed.
