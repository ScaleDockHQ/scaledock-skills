# Keys, selectors and DNS records

Read this when generating keys, publishing or reviewing `_domainkey` TXT records, choosing selectors, delegating signing to another party, rotating or revoking keys. Section numbers are RFC 6376 unless another RFC is named. Sources are listed in [Sources](../SKILL.md#sources).

## Where the key lives (§ 3.6.2)

- The key for `d=example.com; s=foo.bar` is the TXT record at `foo.bar._domainkey.example.com` (§ 3.6.2.1). Periods in a selector are DNS label boundaries, so a selector such as `march2005.reykjavik` can be delegated as its own zone (§ 3.1).
- All implementations MUST support the DNS TXT binding (§ 3.6.2). `q=dns/txt` is the only query method (§ 3.5).
- The strings of a TXT record MUST be concatenated with no whitespace between them before parsing (§ 3.6.2.2).
- Publish exactly one TXT record per selector. Several records in one RRset give undefined results (§ 3.6.2.2), and a message signed with two algorithms needs two selectors (RFC 8463 § 6).
- A wildcard TXT record that covers `*._domainkey` answers DKIM queries with something that is unlikely to be a key record; verifiers have to cope with it (§ 6.1.2).
- RFC 8553 § 2.1 places the `_domainkey` underscored name under the IANA "Underscored and Globally Scoped DNS Node Names" registry model; DNS behaviour is unchanged.

## Key record tags (§ 3.6.1)

The record is a tag-list (§ 3.2). Unknown tags MUST be ignored. Each tag is in the IANA "_domainkey DNS TXT Record Tag Specifications" registry.

| Tag | Default  | Meaning and rules                                                                                                                                                                                                                                                      |
| --- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `v` | `DKIM1`  | RECOMMENDED. If present it MUST be exactly `DKIM1` and MUST be the first tag. A record starting with any other `v=` MUST be discarded; the comparison is a plain string match (`DKIM1.0` is not `DKIM1`).                                                              |
| `h` | all      | Colon-separated acceptable hash algorithms, for example `h=sha256`. If present and the signature's hash is not listed, the verifier returns PERMFAIL (§ 6.1.2). `sha1` is historic (RFC 8301 § 5).                                                                     |
| `k` | `rsa`    | Key type: `rsa` (DER-encoded RSAPublicKey, § 3.6.1) or `ed25519` (RFC 8463 § 4.2). Unknown types MUST be ignored. Erratum 5137 corrects the ABNF to `%x6b` ("k"); erratum 4287 corrects the ASN.1 reference to X.690.                                                  |
| `n` | empty    | Notes for administrators, qp-section. No program interprets it; use it sparingly in DNS.                                                                                                                                                                               |
| `p` | required | The public key in base64. An empty value means the key is revoked (§ 3.6.1). For RSA, the base64 of the DER key; for Ed25519, the 32-byte key in base64, 44 characters (RFC 8463 § 4.2). FWS may appear in the base64, but every CRLF needs at least one WSP after it. |
| `s` | `*`      | Colon-separated service types: `email` or `*`. A verifier MUST ignore the record if its service type is not listed.                                                                                                                                                    |
| `t` | none     | Colon-separated flags. `y`: the domain is testing DKIM; verifiers MUST NOT treat its messages differently from unsigned mail, even when the signature fails. `s`: the `i=` domain MUST equal `d=` exactly, not a subdomain; RECOMMENDED unless subdomains are needed.  |

The `g=` tag from RFC 4871 is historic and MUST be ignored; do not publish it (Appendix C.2, § 7.5).

### Example records (RFC 8463 Appendix A.2)

```text
brisbane._domainkey.football.example.com. IN TXT (
 "v=DKIM1; k=ed25519; p=11qYAYKxCrfVS/7TyWQHOg7hcvPapiMlrwIaaPcHURo=")

test._domainkey.football.example.com. IN TXT (
 "v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDkHlOQoBTzWR"
 "iGs5V6NpP3idY6Wk08a5qhdR6wy5bdOKb2jLQiY/J16JYi0Qvx/byYzCNb3W91y3FutAC"
 "DfzwQ/BC/e/8uBsCR+yz1Lxj+PL6lHvqMKrM3rG4hstT5QjvHO9PzoxZyVYLzBfO2EeC3"
 "Ip3G+2kryOTIKT+l/K4w3QIDAQAB")
```

The RSA record above is a 1024-bit test key from the RFC. New deployments use at least 2048 bits (RFC 8301 § 3.2).

## Algorithms and key sizes

- RSA: signers MUST use keys of at least 1024 bits and SHOULD use at least 2048. Verifiers MUST handle 1024 to 4096 bits, MAY handle larger, and MUST NOT accept signatures from RSA keys under 1024 bits (RFC 8301 § 3.2). The public exponent SHOULD be 65537 (§ 3.3.2).
- Ed25519: `k=ed25519`, signed as `a=ed25519-sha256`. Signers SHOULD and verifiers MUST implement it (RFC 8463 § 5). The 44-character key fits in one TXT string (RFC 8463 § 3).
- rsa-sha1 MUST NOT be used (RFC 8301 § 3.1). A key record can restrict itself to SHA-256 with `h=sha256`; the list is the signer's operational choice (§ 3.6.1).
- DNS size: widely used DNS provisioning software handles only a single 256-octet string in a TXT record, and RSA keys much longer than 1024 bits do not fit in it (RFC 8301 § 1). Large keys such as 4096 bits might not fit in a 512-byte UDP DNS response (§ 3.3.3). Split the base64 across several strings in one record; verifiers join them (§ 3.6.2.2).
- Verifiers can refuse keys with unreasonable RSA exponents, which are a resource-exhaustion attack (§ 8.13).

## Generating a key (Appendix C)

RFC 6376 Appendix C shows the OpenSSL steps, with a 1024-bit key; use 2048 per RFC 8301 § 3.2:

```bash
openssl genrsa -out rsa.private 2048
openssl rsa -in rsa.private -out rsa.public -pubout -outform PEM
```

Put the base64 between the PEM `BEGIN` and `END` lines, without them, into `p=`. Keep the private key protected: a stolen key lets anyone sign as the domain (§ 8.3). A private key on a user's own machine is harder to protect than one held by an outgoing MTA that authenticates the submitter (§ 8.3).

## Selectors (§ 3.1, § 5.2)

- Selectors let a domain have several keys at once: per region, per mail server, per date, per user, or per outside party allowed to sign for the domain (for example an advertising provider for a fixed period) (§ 3.1).
- All selectors are equal to the specification; choose them for administrative convenience (§ 5.2).
- Do not reuse a selector for a new key. A verifier cannot then tell an expired key from a forgery. Assign new keys to new selectors (§ 3.1).
- Per-user or per-message selectors can leak information: a selector derived from a user name exposes that name, and a per-message selector shows the sender when the message was verified through its DNS lookup (§ 3.1, § 8.10). A random value such as a key fingerprint avoids the first.

## Rotation (§ 3.1, § 5.2)

1. Publish the new public key under a new selector, next to the old one.
2. Switch signing to the new private key immediately.
3. Keep the old public key published for a transition period that covers mail in transit, and verifiers that verify late (§ 5.2).
4. Remove the old record, or revoke it with an empty `p=`. The two have no defined difference in meaning (§ 3.1, § 6.1.2).

Do not sign with a key whose public record will be removed or revoked before the verifier is likely to check it (§ 5.2).

## Revocation and its limits (§ 3.6.1, § 8.7)

- `p=` empty: verifiers return PERMFAIL (key revoked) for every signature using that selector (§ 6.1.2). Use it when a key is compromised or a delegation ends.
- Revocation is per selector. If one key signs for many users, revoking it to disown one user's mail breaks everyone's (§ 8.7). Separate selectors for separately managed senders keep revocation targeted.

## Parent domains and subdomains (§ 3.10, § 8.14)

- By default a key under `example.com` can verify signatures whose `i=` is in any subdomain, such as `sub.example.com`. Set `t=s` to forbid this (§ 3.10).
- A parent domain could sign with an `i=` in a subdomain it does not run; DKIM accepts that risk as it accepts DNS delegation. Verifiers MAY ignore signatures from unlikely domains such as `com` or `co.uk`, and that list SHOULD be configurable (§ 6.1.1, § 8.14).
