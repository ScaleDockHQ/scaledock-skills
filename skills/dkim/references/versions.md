# Versions and upgrades

Read this when choosing a target version, reading a signer, verifier or key record built against RFC 4871, upgrading one, or deciding what to do with the DKIM2 drafts. Sources: RFC 6376 (Appendix E lists its changes from RFC 4871), RFC 8301, RFC 8463, RFC 8553, RFC 8616, RFC 4871, RFC 5672, the RFC Editor errata for RFC 6376, the IANA DKIM parameters registry and the IETF datatracker entry for the DKIM2 specification, listed in [Sources](../SKILL.md#sources).

## Version lines

| Id              | Line     | Status  | Revision                                                                                          | Posture | Summary                                                                                                   |
| --------------- | -------- | ------- | ------------------------------------------------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------- |
| `dkim2-preview` | DKIM2    | preview | draft-ietf-dkim-dkim2-spec-06 (2026-08-28), WG Document                                           | track   | A new `DKIM2-Signature` and `Message-Instance` chain that records each hop and each change. Not DKIM v=1. |
| `rfc6376`       | RFC 6376 | current | RFC 6376, Internet Standard (STD 76, September 2011), updated by RFC 8301, 8463, 8553 and 8616    |         | The default target: `v=1` signatures, `v=DKIM1` keys, rsa-sha256 and ed25519-sha256 only.                 |
| `rfc4871`       | RFC 4871 | legacy  | RFC 4871, Proposed Standard (May 2007), updated by RFC 5672 (August 2009); both obsoleted by 6376 |         | Same `v=1` wire format, plus the `g=` key tag, rsa-sha1 and 512-bit keys that are no longer acceptable.   |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

The `rfc6376` line is RFC 6376 read together with every RFC that updates it. Treat the updates as part of the line, not as separate versions:

- RFC 8301 (January 2018, Proposed Standard): rsa-sha1 is historic and MUST NOT be used for signing or verifying; RSA keys are at least 1024 bits, SHOULD be at least 2048 bits; verifiers handle 1024 to 4096 bits (RFC 8301 § 3.1, § 3.2).
- RFC 8463 (September 2018, Proposed Standard): adds `a=ed25519-sha256` and `k=ed25519`; signers SHOULD and verifiers MUST implement it (RFC 8463 § 4, § 5).
- RFC 8553 (March 2019, BCP 222): brings RFC 6376's underscored `_domainkey` node name under the IANA "Underscored and Globally Scoped DNS Node Names" registry model (RFC 8553 § 2.1). It changes no signing or verifying behaviour.
- RFC 8616 (June 2019, Proposed Standard): in internationalized (EAI, RFC 6532) header fields, `d=`, `i=` and `s=` SHOULD use U-labels, `dkim-safe-char` admits non-ASCII UTF-8, and the hash uses the domain exactly as it appears in the header field; key records are unchanged (RFC 8616 § 5).

The RFC Editor lists nine verified errata for RFC 6376. The ones that change how code is written are folded into the reference files: 5252 (the header hash does not include the body hash separately, and the signature field has no trailing CRLF), 5839 (relaxed header canonicalization deletes a trailing SP before the final CRLF), 5137 (the `k=` ABNF starts with `k`, not `v`), 5070 (an empty tag value takes no trailing FWS), 4810 (`:` is encoded in `q=` arguments), and 3192 and 4926 (the Appendix A example text and indentation).

## Which version to use

- Default to RFC 6376 with all four updates. There is no supported older line: an RFC 4871 implementation is input to an upgrade.
- Signatures stay `v=1` and key records stay `v=DKIM1` across RFC 4871 and RFC 6376 (RFC 6376 § 3.5, § 3.6.1), so the version tag does not tell you which RFC an implementation follows. Check its algorithms, key sizes and key tags instead.
- Do not emit anything from DKIM2. It uses different header fields (`DKIM2-Signature`, `Message-Instance`) and is not a new value of `v=`.

## What changed

### RFC 6376 (from RFC 4871 and RFC 5672)

Appendix E lists the changes:

- The `g=` key tag is dropped and registered as historic; it MUST now be ignored, and signers are advised not to publish it because RFC 4871 verifiers remain in use (Appendix C.2, § 7.5).
- The SDID (`d=`) and AUID (`i=`) terms from RFC 5672 are used throughout. The mandatory output to an assessor is the `d=` domain; `i=` is optional output (§ 2.5, § 2.6, § 3.11, RFC 5672 § 1).
- New input requirements (valid RFC 5322 and MIME input, § 3.8) and output requirements (SUCCESS, PERMFAIL, TEMPFAIL and the `d=` domain, § 3.9).
- Verifiers may allow for clock drift on `x=` (§ 3.5).
- Advice about uses of `l=` was removed, and new security considerations cover malformed messages and extra header fields (§ 8.14, § 8.15).
- The hash pseudo-code was rewritten (§ 3.7); erratum 5252 corrects it again.
- The IANA registries gained a status column (§ 7).

### RFC 8301

- rsa-sha1 moves from "Verifiers MUST implement" to "MUST NOT be used for signing or verifying"; signatures with it have permanently failed (RFC 8301 § 3.1). The IANA `sha1` hash entry is historic.
- RSA key floor moves from "at least 1024 bits for long-lived keys" with verifiers accepting 512 bits (RFC 6376 § 3.3.3, RFC 4871 § 3.3.3) to "at least 1024 bits for all keys", 2048 recommended, verifiers MUST NOT accept less than 1024 and MUST handle up to 4096 (RFC 8301 § 3.2).

### RFC 8463

- New algorithm `ed25519-sha256`: SHA-256 over the same hash input, signed with PureEdDSA Ed25519 (RFC 8463 § 3). Key records use `k=ed25519` and `p=` is the raw 32-byte public key in base64, 44 characters (RFC 8463 § 4.2).
- Each selector has one key record, so a message signed with both RSA and Ed25519 uses two selectors (RFC 8463 § 6).

### RFC 8616

- `d=`, `i=` and `s=` may be U-labels in internationalized header fields, and A-labels stay valid (RFC 8616 § 5).

## Upgrading

### RFC 4871 to RFC 6376

1. Change the version marker: none on the wire. `v=1` and `v=DKIM1` stay. Update documentation and code comments to cite RFC 6376 and its updates.
2. Replace removed or renamed fields:
   - Remove `g=` from every key record (Appendix C.2). If you used `g=` to restrict a delegated key to some local-parts, give that sender its own selector instead (§ 3.1); RFC 6376 has no per-local-part restriction.
   - Stop signing with `a=rsa-sha1`; sign with `rsa-sha256`, and add `ed25519-sha256` under a second selector (RFC 8301 § 3.1, RFC 8463 § 6).
   - Replace RSA keys under 1024 bits, and plan 2048-bit keys, under new selectors (RFC 8301 § 3.2, RFC 6376 § 3.1).
3. Validate against the target:
   - Verifiers return PERMFAIL for rsa-sha1 and for RSA keys under 1024 bits, accept 1024 to 4096 bits, and implement ed25519-sha256 (RFC 8301 § 3.1, § 3.2, RFC 8463 § 5).
   - Verifiers ignore `g=` in key records (unknown key tags are ignored, § 3.6.1).
   - Verifiers hand the `d=` domain to the assessor as the primary result; `i=` is extra (§ 3.11, RFC 5672).
   - Re-run the hash code against the corrected Appendix A example (errata 3192 and 4926) and the RFC 8463 Appendix A message.
4. Keep behaviour unchanged: keep existing `d=` domains and the header fields you sign. Rotate to the new keys with new selectors and keep old public keys published until mail in transit has been verified (§ 3.1, § 5.2).

## Preview: DKIM2

The IETF DKIM working group is active again and has adopted DKIM2 documents. The main one is `draft-ietf-dkim-dkim2-spec-06` (2026-08-28, WG Document, expires 2027-03-01); `draft-ietf-dkim-dkim2-dns` and `draft-ietf-dkim-dkim2-bcp` are active WG documents, `draft-ietf-dkim-dkim2-motivation-02` has expired, and `draft-ietf-dkim-dkim2-header-00` is marked as a dead WG document. Posture: **track**.

What the draft contains today: each handler adds a `DKIM2-Signature` header field (with an `i=` sequence number, `mf=` MAIL FROM, `rt=` RCPT TO, `nd=` next domain and `d=` domain), and changes to the message are described in `Message-Instance` header fields with JSON "recipes" so earlier hashes can be checked again. Together these form a chain of custody for detecting replay and for routing delivery status notifications (draft-06 Abstract, § 5, § 7, § 8). It allows rsa-sha256 and ed25519-sha256, keeps keys at `<selector>._domainkey.<domain>` in the same format as DKIM1, and ignores `DKIM-Signature` and ARC header fields when computing its own hashes (draft-06 § 3, § 3.6, § 4).

Do not emit `DKIM2-Signature` or `Message-Instance` header fields, and do not change DKIM v=1 code to match the draft. Watch the datatracker page for new revisions and working group last call. When DKIM2 is published as an RFC: add it as a separate line (it does not replace `v=1` signatures in flight), decide whether RFC 6376 stays current or becomes supported, and add an upgrade section.

ARC (RFC 8617, Experimental) is a separate protocol that adds `ARC-Seal`, `ARC-Message-Signature` and `ARC-Authentication-Results` header fields for a chain of custody across intermediaries. It is not a DKIM version line and this skill does not teach it.
