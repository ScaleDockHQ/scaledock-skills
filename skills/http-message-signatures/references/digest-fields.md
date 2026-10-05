# Digest fields

Read this when a signed message has content, when choosing between `Content-Digest` and `Repr-Digest`, when asking a peer for digests, or when choosing a hash algorithm. Sources: RFC 9530 (sections cited as RFC 9530), RFC 9421 § 7.2.8, and the IANA Hash Algorithms for HTTP Digest Fields registry.

## Why signatures need digests

RFC 9421 does not cover message content. Put a digest of the content in a field, cover that field, and validate the digest against the received content; checking the signature alone lets an attacker replace the content and keep the field (RFC 9421 § 7.2.8). Digests alone do not stop an on-path attacker, who can remove or recompute them; combine them with TLS or signatures (RFC 9530 § 6.1).

## The fields

| Field                 | Hashes                                                     | Value                                      | Section      |
| --------------------- | ---------------------------------------------------------- | ------------------------------------------ | ------------ |
| `Content-Digest`      | The message content as sent (RFC 9110 § 6.4)               | Dictionary: algorithm key to Byte Sequence | RFC 9530 § 2 |
| `Repr-Digest`         | The whole selected representation data (RFC 9110 § 8.1)    | Dictionary: algorithm key to Byte Sequence | RFC 9530 § 3 |
| `Want-Content-Digest` | A request for `Content-Digest`, with algorithm preferences | Dictionary: algorithm key to Integer 0–10  | RFC 9530 § 4 |
| `Want-Repr-Digest`    | A request for `Repr-Digest`, with algorithm preferences    | Dictionary: algorithm key to Integer 0–10  | RFC 9530 § 4 |

```http
Content-Digest: sha-256=:d435Qo+nKZ+gLcUHn7GQtQ72hiBVAgqoLsZnZPiTGPk=:, sha-512=:YMAam51Jz/jOATT6/zvHrLVgOYTGFy1d6GJiOHTohq4yP+pgk4vf2aCsyRZOtw8MjkM7iw7yZ/WkppmM44T3qg==:
Want-Repr-Digest: sha-512=3, sha-256=10, unixsum=0
```

- Several algorithms MAY be sent at once to support peers in transition (RFC 9530 § 2, § 3). A recipient MAY ignore any or all digests, and local policy MAY add constraints (RFC 9530 § 2, § 3).
- `Want-*` weights: 1 is least preferred, 10 most preferred, 0 not acceptable. They are hints; ignoring them is not a protocol error (RFC 9530 § 4). In a response they ask the client to send the field on future requests (RFC 9530 § 4).
- Both Integrity fields MAY be sent as trailers and MAY be merged into the header section (RFC 9530 § 2, § 3). Intermediaries may drop trailers, and content processed before the trailer arrives is not validated (RFC 9530 § 6.4).

## Content or representation

- `Content-Digest` covers exactly the bytes in this message. For a range response it is the digest of the range; for a HEAD response it is the digest of empty content (RFC 9530 Appendix B.2, B.3).
- `Repr-Digest` covers the full selected representation, independent of ranges and transfer codings, but dependent on `Content-Encoding` and `Content-Type` (RFC 9530 § 1.2, § 3, Appendix B.11).
- With no representation data, a digest of the empty string still asserts that nothing was sent (RFC 9530 § 3, § 6.3).
- State-changing requests: `Repr-Digest` is computed on the enclosed representation, for example the patch document for PATCH (RFC 9530 § 3.1).
- Responses: if the representation describes the request status, `Repr-Digest` MUST be computed on it; if there is a referenced resource (for example via `Content-Location`), it MUST be computed on that resource's selected representation. `Location` does not affect it (RFC 9530 § 3.1, § 3.2).
- Error responses: the digest is of the error representation (RFC 9530 Appendix B.10).

Pick the field whose input the verifier can recompute from what it receives. `Content-Digest` hashes the received bytes directly, and every RFC 9421 example covers `content-digest` (RFC 9421 § 2.5, § 7.2.8, Appendix B.2).

## Hash algorithms

The Hash Algorithms for HTTP Digest Fields registry (last updated 2024-05-22):

| Key         | Status     | Algorithm                 |
| ----------- | ---------- | ------------------------- |
| `sha-512`   | Active     | SHA-512                   |
| `sha-256`   | Active     | SHA-256                   |
| `md5`       | Deprecated | MD5 (collision attacks)   |
| `sha`       | Deprecated | SHA-1 (collision attacks) |
| `unixsum`   | Deprecated | UNIX `sum`                |
| `unixcksum` | Deprecated | UNIX `cksum`              |
| `adler`     | Deprecated | ADLER32                   |
| `crc32c`    | Deprecated | CRC32c                    |

- Applications are RECOMMENDED to use Active algorithms (RFC 9530 § 5).
- Deprecated algorithms MAY be used against accidental corruption but MUST NOT be used in an adversarial setting, such as signing an Integrity field for authenticity (RFC 9530 § 5). Signatures are likely to be an adversarial setting (RFC 9530 § 6.3).
- Integrity fields give no protection against hash downgrade or substitution; restrict accepted algorithms to strong ones and protect the fields with TLS or signatures (RFC 9530 § 6.6). A receiver is only as strong as the weakest algorithm it accepts (RFC 9530 § 6.6).
- Implementations can limit how many digests, which algorithms or how much content they validate; skipping a preferred algorithm's failure opens a downgrade (RFC 9530 § 6.7).

## Using digests under a signature

- Cover the digest field and the representation metadata it depends on, such as `content-type` and `content-encoding`; otherwise an attacker can change the metadata and make digest validation fail (RFC 9530 § 6.3).
- Do not let intermediaries rewrite the field: de-duplicating digests or combining field lines breaks the signature (RFC 9530 § 6.3).
- An intermediary that changes the content coding changes `Content-Digest`, which breaks the signature; it must sign again (RFC 9421 § 7.2.8).
- Different compression settings give different bytes under the same `Content-Encoding`, so a digest proves integrity at rest only if the exact content is kept (RFC 9530 § 6.5).
- To cover request content in a signed response, the request must carry a digest field, covered with `req` (RFC 9421 § 2.4, § 7.2.8).

## Sample values

For the JSON `{"hello": "world"}` with no trailing newline, Byte Sequence serialized (RFC 9530 Appendix D):

```text
sha-512 :WZDPaVn/7XgHaAy8pmojAkGWoRx2UFChF41A2svX+TaPm+AbwAgBWnrIiYllu7BNNyealdVLvRwEmTHWXvJwew==:
sha-256 :X48E9qOokqqrvdts8nOJRJN3OWDUoyWxBf7kbu9DBPE=:
```

The RFC 9421 test request uses the same `sha-512` value in `Content-Digest` (RFC 9421 Appendix B.2). With a trailing LF, as in most RFC 9530 Appendix B examples, `sha-256` is `:RK/0qy18MlBSVnWgjwz6lZEWjP/lF5HF9bvEF8FabDg=:` (RFC 9530 Appendix B.1).

Reported erratum 8890 says the Brotli bytes in RFC 9530 Appendix B.4 and B.6 are invalid; do not use those two examples as test vectors (RFC 9530 errata).

## Common mistakes

- Computing `Repr-Digest` over a range or over transfer-coded bytes.
- Sending `sha-256=<base64>` without the Byte Sequence colons, or uppercase keys such as `SHA-256`.
- Verifying the signature but never recomputing the digest.
- Using `md5` or `sha` in a signed field.
