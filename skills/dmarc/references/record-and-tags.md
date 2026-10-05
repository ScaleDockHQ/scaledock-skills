# The DMARC Policy Record and its tags

Read this when writing, parsing or reviewing a DMARC Policy Record. Section numbers refer to RFC 9989 unless another RFC is named. The tag list matches the IANA DMARC Tags registry as checked on 2026-10-05.

## Where the record lives

- A DNS TXT record at `_dmarc.<domain>`; for `example.com`, query `_dmarc.example.com` (§ 4.1, § 4.5). `_dmarc` is registered as a globally scoped underscored node name (§ 9.5).
- A TXT record made of several character-strings is joined in order and parsed as one string (§ 4.5).
- Records that do not start with a valid `v` tag are discarded; if more than one DMARC record remains at one name, all of them are discarded (§ 4.10 step 2).
- A record at an Organizational Domain also covers its subdomains, through `sp` and `np` (§ 4.5). A record at a subdomain covers only that name: `sp` is ignored there (§ 4.7 `sp`).
- Not publishing a record opts the domain out of DMARC (§ 4.5).

## Syntax

The record uses the DKIM tag-value syntax (§ 4.7). Formal definition (§ 4.8):

```abnf
dmarc-record  = dmarc-version *(dmarc-sep dmarc-tag) [dmarc-sep]
dmarc-version = "v" equals %s"DMARC1"       ; case sensitive
dmarc-sep     = *WSP ";" *WSP
equals        = *WSP "=" *WSP
dmarc-tag     = 1*ALPHA equals 1*dmarc-value
dmarc-value   = %x20-3A / %x3C-7E           ; printing characters but ";"
dmarc-uri     = URI                         ; "," and "!" MUST be percent-encoded
obs-dmarc-uri = dmarc-uri obs-dmarc-report-size
obs-dmarc-report-size = "!" 1*DIGIT [ "k" / "m" / "g" / "t" ]   ; ignore if found
dmarc-urilist = (dmarc-uri / obs-dmarc-uri) *(*WSP "," *WSP (dmarc-uri / obs-dmarc-uri))
dmarc-request = "none" / "quarantine" / "reject"
dmarc-yorn    = "y" / "n"
dmarc-psd     = "y" / "n" / "u"
dmarc-rors    = "r" / "s"
dmarc-fo      = ("0" / "1") *(":" dmarc-afrf)
              / dmarc-afrf [":" ("0" / "1")] [":" dmarc-afrf]
              / *(dmarc-afrf ":") ("0" / "1")
dmarc-afrf    = "d" / "s"                   ; each at most once
```

Parsing rules (§ 4.7, § 4.8):

- `v=DMARC1` MUST be the first tag; if it is absent, not first, or not exactly `DMARC1`, the whole record is ignored.
- Unknown tags MUST be ignored. Syntax errors elsewhere are discarded in favour of the default value, or ignored.
- A new tag does not need a new `v` value; changing an existing tag would (§ 4.8).

## Tags

| Tag     | Value rule      | Default        | Meaning                                                                                                                  |
| ------- | --------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `v`     | `DMARC1`        | (none)         | REQUIRED, first. Identifies the record (§ 4.7).                                                                          |
| `p`     | `dmarc-request` | `none`         | RECOMMENDED. Domain Owner Assessment Policy for the domain and, unless `sp` or `np` apply, its subdomains (§ 4.7).       |
| `sp`    | `dmarc-request` | `p`            | Policy for existing subdomains of the Organizational Domain; not for the Organizational Domain itself (§ 4.7).           |
| `np`    | `dmarc-request` | `sp`, else `p` | Policy for non-existent subdomains (NXDOMAIN, RFC 8020) of the Organizational Domain (§ 4.7, § 3.2.13).                  |
| `t`     | `dmarc-yorn`    | `n`            | Test mode. `y` asks the validator to apply one level below the stated policy; no effect on reports or on `none` (§ 4.7). |
| `psd`   | `dmarc-psd`     | `u`            | `y`: the domain is a PSD. `n`: the domain is an Organizational Domain. `u`: unknown, use the tree walk (§ 4.7).          |
| `adkim` | `dmarc-rors`    | `r`            | DKIM alignment mode, relaxed or strict (§ 4.7).                                                                          |
| `aspf`  | `dmarc-rors`    | `r`            | SPF alignment mode, relaxed or strict (§ 4.7).                                                                           |
| `rua`   | `dmarc-urilist` | (none)         | Aggregate report URIs. Without it, receivers MUST NOT send aggregate reports (§ 4.7).                                    |
| `ruf`   | `dmarc-urilist` | (none)         | Failure report URIs. Without it, receivers MUST NOT send failure reports (§ 4.7).                                        |
| `fo`    | `dmarc-fo`      | `0`            | Failure reporting options; ignored without `ruf` (§ 4.7).                                                                |

Policy values (§ 4.7):

- `none`: the Domain Owner expresses no preference. A discovered `p=none` MUST NOT modify existing mail handling (§ 5.4).
- `quarantine`: failing mail is suspicious; it may still be valid.
- `reject`: a failure is a clear sign the use of the domain is not valid.

`t=y` mapping (§ 4.7): `p=quarantine` with `t=y` is applied as `none`; `p=reject` with `t=y` is applied as `quarantine`, plus any special handling the validator has for test mode, such as rewriting `From` (§ A.6). Aggregate reports carry the value as `testing` (RFC 9990 § 3.1.1.5) and an exemption as reason `policy_test_mode` (RFC 9990 § 3.1.6).

`fo` values (§ 4.7), colon-separated, any order, `0` and `1` mutually exclusive:

- `0`: report when all underlying mechanisms fail to produce an aligned pass.
- `1`: report when any underlying mechanism fails to produce an aligned pass.
- `d`: DKIM failure report when a signature failed, regardless of alignment (RFC 6651).
- `s`: SPF failure report when SPF failed, regardless of alignment (RFC 6652).

Reporting URIs (§ 4.6, § 4.7): a comma-separated list; a report SHOULD be sent to each. Any URI scheme may appear, but a receiver that sends reports MUST support `mailto:`, and URIs with unsupported schemes MUST be ignored. Destinations outside the record's Organizational Domain need verification; see [`reporting.md`](reporting.md).

## Historic tags

These are `historic` in the IANA DMARC Tags registry, with RFC 7489 as reference. Never publish them; receivers treat them as unknown tags (§ 4.7, § 9.3, § C.5.2).

| Tag   | RFC 7489 meaning                        | RFC 9989 replacement                                   |
| ----- | --------------------------------------- | ------------------------------------------------------ |
| `pct` | Percentage of failing mail to apply `p` | `t=y` for `pct=0`; no tag for `pct=100` (§ A.6)        |
| `rf`  | Failure report format                   | None; AFRF (RFC 6591) as updated by RFC 9991 § 4       |
| `ri`  | Aggregate report interval in seconds    | None; receivers SHOULD report at least daily (§ 5.3.8) |

## Invalid and missing values

- No valid `p`, or an invalid `sp` or `np`: if `rua` holds at least one valid URI, the receiver MUST act as if `p=none`; otherwise no DMARC processing (§ 4.10.1).
- `p` is not used in a third-party reporting authorization record (§ 4.7; RFC 9990 § 4).

## Who publishes what

- Domain Owner: a record for each Author Domain and its Organizational Domain, if they differ (§ 5.1, § 5.1.4, § 8).
- PSO: every record MUST include `psd=y` (§ 5.2). A multi-organizational PSD MUST NOT include `ruf` (§ 10.2) and risks leaking registrants' data with `rua` (§ 10.1).
- Delegated subtree: `psd=n` makes that node an Organizational Domain (§ 5.1.8).
- Author Domain with more than eight labels: MUST publish its own record, because the tree walk skips intermediate names (§ 5.1.8).

## Examples

From RFC 9989 Appendix B.2, in zone file form:

```dns
; Monitoring mode (B.2.1)
_dmarc  IN TXT ( "v=DMARC1; p=none; "
                 "rua=mailto:dmarc-feedback@example.com" )

; Monitoring mode with failure reports (B.2.2)
_dmarc  IN TXT ( "v=DMARC1; p=none; "
                 "rua=mailto:dmarc-feedback@example.com; "
                 "ruf=mailto:auth-reports@example.com" )

; Subdomain test.example.com, testing quarantine, two aggregate URIs (B.2.5)
_dmarc  IN TXT ( "v=DMARC1; p=quarantine; "
                 "rua=mailto:dmarc-feedback@example.com,"
                 "mailto:tld-test@thirdparty.example.net; "
                 "t=y" )

; The same subdomain at enforcement (B.2.5)
_dmarc  IN TXT ( "v=DMARC1; p=reject; "
                 "rua=mailto:dmarc-feedback@example.com,"
                 "mailto:tld-test@thirdparty.example.net" )
```

## Common mistakes

- Two TXT records starting with `v=DMARC1` at the same name: both are discarded and the domain has no policy (§ 4.10 step 2).
- `v=dmarc1` or `v` not first: the record is ignored (§ 4.7).
- `pct=50` kept after upgrading: RFC 9989 receivers ignore it, so the full policy applies (§ A.6, § 4.7).
- `sp` on a subdomain record: ignored (§ 4.7).
- An unencoded `,` or `!` inside a URI: breaks the list (§ 4.8).
- A `rua` to another organization without its `_report._dmarc` authorization record: the URI is ignored (RFC 9990 § 4).
