# Versions and upgrades

Read this when choosing a target version, reading a security.txt written against a pre-RFC draft, upgrading one, or checking whether anything newer than RFC 9116 is coming. Sources: RFC 9116, its errata page, the IANA security.txt Fields registry, and revisions -00 to -12 of draft-foudil-securitytxt on the datatracker, listed in [Sources](../SKILL.md#sources). Draft section numbers are given as `-NN § x`.

## Version lines

| Id                         | Line                     | Status  | Revision                                       | Posture | Summary                                                                                      |
| -------------------------- | ------------------------ | ------- | ---------------------------------------------- | ------- | -------------------------------------------------------------------------------------------- |
| `rfc9116`                  | RFC 9116                 | current | RFC 9116, Informational (April 2022)           |         | The default target. Published from draft -12; no RFC updates or obsoletes it.                |
| `draft-foudil-securitytxt` | draft-foudil-securitytxt | legacy  | -00 to -12 (2017-09-10 to 2021-05-24), expired |         | The pre-RFC drafts. Files from before -10 often lack Expires; earlier ones use other fields. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

## Which version to use

- Default to RFC 9116 for every new or renewed file.
- No other line is supported. A file written against draft-foudil-securitytxt is input to an upgrade.
- A file written against draft -12 is already close to RFC 9116: the field set, the Expires format and the location rules are the same. Files written against -00 to -09 need real changes.
- New fields arrive through the IANA security.txt Fields registry, not through new versions of the RFC (§ 2.4, § 6.2). A registered field is optional and does not create a new version line.

## What changed

### RFC 9116

RFC 9116 is draft-foudil-securitytxt-12 published as an RFC (RFC Editor metadata). Compared with -12 it is editorial: section numbers shift (fields move from -12 § 3.5 to § 2.5, location from -12 § 4 to § 3), and the rules are the same.

Errata on RFC 9116, from the errata page:

- **6946 (Verified, editorial).** The § 4 ABNF comment for `unsigned` refers to "Section 3.5.3"; it means § 2.5.3 (Contact ordering).
- **7264 (Reported, technical).** Proposes an upper-case `Z` in the § 2.5.5 example `2021-12-31T18:37:07z`. RFC 3339 § 5.6 accepts a lower-case `z` but says generators SHOULD use upper case, so write `Z` and accept either.
- **7743 (Reported, technical).** Notes that the ABNF `CRLF` rule conflicts with § 2.2, which allows LF alone, and proposes `CRLF = [CR] LF` with one separator per file. Until it is resolved, accept CRLF and LF as § 2.2 says.

Registry changes since publication (IANA registry):

- `CSAF` registered on 2023-02-15, controlled by OASIS Open, may appear more than once.
- `Bug-Bounty` registered on 2026-03-07, controlled by the IETF, appears at most once, value `True` or `False`.

### draft-foudil-securitytxt

What each group of revisions defined, from the draft texts. Use it to recognise which draft an old file follows.

| Revisions  | Fields                                                                                                         | Other differences                                                                                                                             |
| ---------- | -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| -00        | Contact, Encryption, Disclosure (`Full`, `Partial`, `None`), Acknowledgement                                   | File in the website's top-level directory (-00 § 2). Contact values may be a bare email address or phone number.                              |
| -01, -02   | Contact, Encryption, Signature, Acknowledgement; Policy from -02                                               | `/.well-known/security.txt` appears; `Signature:` links a detached `security.txt.sig`. Bare emails and phone numbers still shown.             |
| -03, -04   | Contact, Encryption, Signature, Policy, Acknowledgments, Hiring; Permission (`none`) in -04 only               | Contact MUST use `mailto:` and `tel:` URIs (-03); `text/plain` with `charset=utf-8`; `/security.txt` allowed as a fall back.                  |
| -05 to -08 | Contact, Encryption, Policy, Acknowledgments, Hiring, Canonical (at most once), Preferred-Languages            | `Signature:` replaced by an OpenPGP cleartext signature (-05 § 3.4). HTTPS RECOMMENDED (-05), then MUST (-08). `/.well-known/` is a SHOULD.   |
| -09        | As -08, plus Expires (optional, RFC 5322 date such as `Thu, 31 Dec 2020 18:37:07 -0800`); Canonical may repeat | `/.well-known/` becomes a MUST on HTTP servers (-09 § 3).                                                                                     |
| -10, -11   | As -09                                                                                                         | Expires MUST be present exactly once and SHOULD be under a year away (-10 § 3.5.5); still an RFC 5322 date. File-system placement is dropped. |
| -12        | As -11                                                                                                         | Expires switches to RFC 3339 (`2021-12-31T18:37:07z`). This is the text of RFC 9116.                                                          |

## Upgrading

### draft-foudil-securitytxt to RFC 9116

1. Change the version marker: the file has none. Upgrading means making the file match the RFC 9116 field rules, location and ABNF (§ 2, § 3, § 4).
2. Replace removed or renamed fields:
   - Add `Expires` if it is missing, or rewrite an RFC 5322 date (`Thu, 31 Dec 2020 18:37:07 -0800`) as RFC 3339 (`2020-12-31T18:37:07-08:00`, or the UTC form with `Z`). Keep exactly one, under a year away (§ 2.5.5).
   - Rewrite bare email addresses and phone numbers in `Contact` as `mailto:` and `tel:` URIs, keeping their order (§ 2.5.3). Percent-encode characters such as `+` in the address (§ 2.5.3 example).
   - Rename `Acknowledgement` to `Acknowledgments` (§ 2.5.1). Field names are case-insensitive, but the spelling must match.
   - Remove `Signature:` and re-sign the file inline with an OpenPGP cleartext signature (§ 2.3). Delete the detached `security.txt.sig` once nothing links to it.
   - Remove `Permission:` and `Disclosure:`; neither is in the registry. State testing permission and disclosure terms in the policy that `Policy` links to (§ 2.5.7, § 5.5).
   - Make every web URI start with `https://` (§ 2.5.1 to § 2.5.7).
   - If `Canonical` was used, list every URI the file is served from (§ 2.5.2).
3. Validate against the target: serve the file at `/.well-known/security.txt` over HTTPS as `text/plain; charset=utf-8`, keep or add a redirect from `/security.txt` (§ 3), and parse it against the § 4 ABNF.
4. Keep behaviour unchanged: the same contacts in the same order, the same key and policy. Remove a stale `/security.txt` copy that differs from the new file, because a client that only checks the legacy path would read the old one.

## Preview

No preview line is listed. The RFC Editor entry for RFC 9116 shows no updating or obsoleting RFC, and the datatracker lists no draft that updates RFC 9116.

One related draft exists and is worth watching: draft-bruhns-securitytxt-product-security-00 (individual submission, 2026-09-10) asks IANA to register `Product-Security` and `Product-Security-Policy` fields for product vulnerability contacts. It registers fields rather than changing RFC 9116, it is not adopted by a working group, and the fields are not in the registry. Do not emit them. If they are registered, add them to [`fields.md`](fields.md); they would still not be a new version line.
