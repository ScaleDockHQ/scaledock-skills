# dkim

An agent skill for DomainKeys Identified Mail (RFC 6376, updated by RFC 8301 and RFC 8463): signing and verifying email with `DKIM-Signature` header fields and `_domainkey` key records, and upgrading from RFC 4871.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill dkim
```

Then ask your agent to "set up DKIM signing with a new selector for our domain" or "review why our DKIM signatures fail with body hash did not verify".

## What it covers

- The `DKIM-Signature` header field and its tags: `v`, `a`, `b`, `bh`, `c`, `d`, `h`, `i`, `l`, `q`, `s`, `t`, `x` and `z`.
- Simple and relaxed canonicalization for header and body, with the errata that fix the published text.
- Choosing header fields to sign, oversigning, and the risks of `l=`.
- Key records at `<selector>._domainkey.<domain>` (`v`, `h`, `k`, `n`, `p`, `s`, `t`), selectors, rotation and revocation.
- rsa-sha256 with 2048-bit RSA keys, ed25519-sha256, and why rsa-sha1 and short keys fail.
- Verification steps, SUCCESS, PERMFAIL and TEMPFAIL results, and SMTP reply rules.

## Versions

| Line     | Status                |
| -------- | --------------------- |
| DKIM2    | preview (track)       |
| RFC 6376 | current               |
| RFC 4871 | legacy (upgrade from) |

RFC 6376 is read together with RFC 8301, RFC 8463, RFC 8553 and RFC 8616. RFC 4871 includes its update RFC 5672. `references/versions.md` says what changed, how to upgrade from RFC 4871, and what the DKIM2 drafts contain.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [RFC 6376](https://www.rfc-editor.org/rfc/rfc6376): RFC (Internet Standard, STD 76).
- [RFC 6376 errata](https://www.rfc-editor.org/errata/rfc6376): 9 verified, 4 reported.
- [RFC 8301](https://www.rfc-editor.org/rfc/rfc8301): RFC (Proposed Standard).
- [RFC 8463](https://www.rfc-editor.org/rfc/rfc8463): RFC (Proposed Standard).
- [RFC 8616](https://www.rfc-editor.org/rfc/rfc8616): RFC (Proposed Standard).
- [RFC 8553](https://www.rfc-editor.org/rfc/rfc8553): RFC (Best Current Practice, BCP 222).
- [RFC 4871](https://www.rfc-editor.org/rfc/rfc4871) and [RFC 5672](https://www.rfc-editor.org/rfc/rfc5672): RFC, obsoleted by RFC 6376.
- [IANA DKIM parameters](https://www.iana.org/assignments/dkim-parameters/): last updated 2018-07-06.
- [draft-ietf-dkim-dkim2-spec](https://datatracker.ietf.org/doc/draft-ietf-dkim-dkim2-spec/): WG draft, revision 06.
- [RFC 8617](https://www.rfc-editor.org/rfc/rfc8617): RFC (Experimental), ARC, as a pointer only.

## License

MIT
