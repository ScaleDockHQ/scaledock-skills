# Verification and results

Read this when building or reviewing a verifier, mapping failures to results, deciding SMTP replies, or reporting results downstream. Section numbers are RFC 6376 unless another RFC is named. Sources are listed in [Sources](../SKILL.md#sources).

## Results (§ 3.9, § 6.1)

Each signature ends in one of three states:

| State    | Meaning                                                    | Next step                                                                         |
| -------- | ---------------------------------------------------------- | --------------------------------------------------------------------------------- |
| SUCCESS  | The signature verified.                                    | Report the `d=` domain (MUST) and optionally `i=` (MAY) to the assessor (§ 3.11). |
| PERMFAIL | Permanent failure, such as a bad signature or missing key. | Stop processing this signature and do not reconsider it; try the next one.        |
| TEMPFAIL | Temporary failure, such as a DNS timeout.                  | Stop this signature; MAY defer the message and try again later.                   |

For each SUCCESS or TEMPFAIL signature the output MUST include the `d=` domain and the result; it MAY include PERMFAIL signatures and other details (§ 3.9). Assessors SHOULD ignore PERMFAIL signatures, as if they were not there (§ 4.2).

## Order of signatures (§ 4.2, § 6.1)

- Verifiers MAY try signatures in any order, and MUST NOT give meaning to the order of DKIM-Signature fields, because relays reorder header fields (§ 6.1).
- Evaluate each signature independently. Keep checking until one verifies to your satisfaction. Verifiers MAY cap how many signatures they try, to limit denial of service (§ 4.2, § 6.1).
- Do not try to explain an invalid signature by comparing it with a valid one (§ 4.2).

## Steps for one signature

Produce results equal to doing these steps in order; steps may run in parallel if the result is the same (§ 6, § 6.1.2).

### 1. Validate the DKIM-Signature field (§ 6.1.1)

Validate the format and every value strictly; any inconsistency gives PERMFAIL (signature syntax error). Unknown tags are allowed. Then:

| Check                                                                                        | Result                                       |
| -------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `v=` is not `1`                                                                              | PERMFAIL (incompatible version)              |
| A required tag (`v`, `a`, `b`, `bh`, `d`, `h`, `s`) is missing                               | PERMFAIL (signature missing required tag)    |
| The `i=` domain is not `d=` or a subdomain of it (no `i=` means `@` plus `d=`)               | PERMFAIL (domain mismatch)                   |
| `h=` does not include `From`                                                                 | PERMFAIL (From field not signed)             |
| `x=` is in the past                                                                          | MAY PERMFAIL (signature expired)             |
| `a=rsa-sha1`                                                                                 | PERMFAIL (RFC 8301 § 3.1)                    |
| Unknown algorithm or canonicalization                                                        | ignore the signature (§ 3.3.4, § 3.4)        |
| `d=` is not a plausible signing domain, such as `com` or `co.uk` (configurable list)         | MAY ignore                                   |
| The signature leaves out header fields the verifier considers essential, such as MIME fields | MAY PERMFAIL (unacceptable signature header) |

### 2. Get the public key (§ 6.1.2)

1. Query `<s>._domainkey.<d>` with the `q=` method (`dns/txt`).
2. No response: MAY return TEMPFAIL (key unavailable).
3. No such record: PERMFAIL (no key for signature).
4. Several records: pick one or try each; their order is unspecified.
5. Record does not parse, or has a `v=` the verifier does not implement: ignore it, PERMFAIL (key syntax error). Verifiers MUST validate key records and be robust against malformed ones (§ 8.8).
6. Key `h=` present and the signature's hash not listed: PERMFAIL (inappropriate hash algorithm).
7. `p=` empty: PERMFAIL (key revoked).
8. Key not usable with the `a=` algorithm and `k=` type: PERMFAIL (inappropriate key algorithm).

Also apply the key record rules in [keys-and-dns.md](keys-and-dns.md): ignore records whose `s=` does not list `email` or `*`; with `t=s`, the `i=` domain must equal `d=` (§ 3.6.1, § 3.10); RSA keys under 1024 bits are not valid (RFC 8301 § 3.2).

### 3. Compute and compare (§ 6.1.3)

1. Canonicalize with the `c=` algorithms, `l=` and `h=`, matching header names case-insensitively. Do not change the message itself.
2. Compute the body hash and the header hash as in [signature-and-tags.md](signature-and-tags.md) ("Computing and inserting the signature").
3. Body hash differs from `bh=`: PERMFAIL (body hash did not verify).
4. Signature in `b=` does not verify over the header hash with the key: PERMFAIL (signature did not verify).
5. Otherwise SUCCESS.

The key query can run in parallel with hashing, and the header signature can be checked before the body hash, but a body hash mismatch always fails the signature (§ 6.1.3).

Content after the `l=` length is not covered. Verifiers might treat it with suspicion and can treat the signature as invalid, PERMFAIL (unsigned content) (§ 6.1.3, § 8.2).

## Timing and placement (§ 6)

Verify soon after receipt, preferably at the border MTA, because signers may remove keys at any time. Deferring verification until the user reads the message is discouraged (§ 6).

## Communicating results (§ 6.2)

- Any results header field SHOULD be inserted before existing DKIM-Signature and authentication status fields. The `Authentication-Results` header field MAY be used.
- Verifiers MAY delete existing results header fields before adding their own, so filters are not fooled by forged results from attackers (§ 6.2).
- Record the exact failure reason for diagnostics (§ 6.3).

## Policy (§ 6.3, § 6.1)

- A message with only bad signatures SHOULD be treated like an unsigned message (§ 6.1, § 6.3). Signatures can break in transit through no fault of the signer.
- Do not decide acceptability only on a missing or unverifiable signature (§ 6.3). If an MTA rejects by prior agreement, use a 550/5.7.x reply.
- Only temporary failures such as an unreachable key server SHOULD get a 4xx reply, for example `451 4.7.5 Unable to verify signature - key server unavailable`. Cryptographic failures MUST NOT cause 4xx replies (§ 6.3).
- A verified signature MUST be passed on to the assessor and/or the user. If the SDID differs from the From address, make the actual SDID clear (§ 6.3).
- Signatures under a key with `t=y` (testing) MUST NOT be treated differently from unsigned mail (§ 3.6.1).
- DKIM proves only that the `d=` domain took some responsibility. It does not say the From address is authentic, and neither `d=` nor `i=` has to match any other header field (§ 3.11). Requiring a match with the From domain is an assessor policy outside DKIM (§ 3.11); the `dmarc` skill covers it.

## Security checks for verifiers (§ 8)

- Malformed signatures and key records: verify every value before use (§ 8.8, § 8.9).
- Extra header fields: a signed message can gain a second `From` or `Subject` after signing. One signed instance does not mean all instances are signed (§ 8.15). Signers prevent this by oversigning.
- Replay: a validly signed message can be re-sent to many recipients. Volume detection and reputation are partial answers; `x=` is not an anti-replay tool (§ 8.6, § 3.5).
- DNS: use resolvers that check glue strictly to resist name-chaining attacks; DNSSEC helps (§ 8.5).
- Resource exhaustion: cap the number of signatures tried and refuse keys with unreasonable RSA exponents (§ 6.1, § 8.13).
- Timing: implementations should consider hiding timing to avoid remote key extraction (§ 8.11).
