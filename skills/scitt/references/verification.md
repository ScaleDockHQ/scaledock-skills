# Verifying Transparent Statements and auditing

Read this when writing a Relying Party, a verifier library or an Auditor. Section numbers are RFC 9943 unless RFC 9942 or SCRAPI is named.

## Verifier rules (§ 7.1)

- Apply RFC 9052 § 4.4 verification when checking the signatures of Signed Statements and Receipts.
- Trust the verification key or certificate, and the identity, of at least one Receipt Issuer (the TS).
- A Relying Party MAY verify only one Receipt it accepts, and MAY skip the Signed Statement's signature or Receipts from VDSs it does not understand.
- Relying Parties MAY re-verify the Issuer's signature locally, and MAY apply further policies over the Envelope, Receipt, payload and local state after verification.
- A verification API may return more than a boolean: whether the Receipt signature, the Signed Statement signature, the validity-period claims and the inclusion proof are each valid.

RFC 9942 § 5.3 recommends a single boolean result for Receipt verification, to avoid accepting a valid signature over an invalid consistency proof. If you expose details, still return one overall verdict that is false when any required part fails.

## Receipt verification (RFC 9942)

1. Decode the Transparent Statement; read `394` from the unprotected header. Each entry is `bstr .cbor` of a tagged COSE_Sign1 (RFC 9942 § 4.3).
2. Check that the Receipt's `vds` (395) and the proof types in `vdp` (396) are in the IANA registries RFC 9942 created; reject otherwise (RFC 9942 § 4.3).
3. Resolve the TS key: from your trust configuration, or by `kid` from SCRAPI `/.well-known/scitt-keys/{kid_value}` (base64url, unpadded) (SCRAPI § 2.2). Check that `iss` in the Receipt's CWT Claims is a TS you trust (§ 7.1).
4. Inclusion, for `RFC9162_SHA256`: fail if `leaf-index` ≥ `tree-size`; apply the inclusion path to the entry bytes to compute the root; use that root as the detached payload; then verify the COSE_Sign1 signature. Success confirms inclusion (RFC 9942 § 5.2, § 5.2.1).
5. Consistency, where used: verify the signature first; if it fails, do not check the proof. Then apply a previous inclusion proof to the consistency proof. A failure means the append-only property is not assured (RFC 9942 § 5.3.1).
6. Check validity-period claims such as `iat`, `nbf` and `exp` if the Receipt carries them (RFC 9942 § 7.2).

RFC 9943 and RFC 9942 do not spell out the exact leaf bytes a TS hashes for a Signed Statement; that is VDS- and implementation-specific (RFC 9943 § 5.1.3 leaves VDS details out of scope). Take it from the TS's documented profile.

## Signed Statement checks a Relying Party adds

- `iss` and `sub` in protected CWT Claims identify the Issuer and the Artifact (§ 6). Look up all Transparent Statements for a `sub` to check completeness and catch equivocation (§ 3, Subject).
- A registered Statement may be superseded by a later one from the same Issuer with the same Subject; other Issuers may add corrections, and you choose which Issuers to include (§ 6.3, § 9.2).
- Do not accept a Signed Statement for which you cannot find a Receipt from a TS you trust (§ 9.3).
- Ordering in the log is not issuance order unless the Registration Policy says so (§ 9.1).

## Keys over time (SCRAPI § 2.1)

Keep the TS verification key for as long as you may verify a Receipt, independent of HTTP cache lifetimes. If the TS retires a key early, request a fresh Receipt for the same entry from the Receipt resource.

## Auditing (§ 5.1.1.2, § 5.1.3, § 9.7)

- An Auditor replays the Statement Sequence: every registered Signed Statement, the collateral needed to authenticate it, and the Registration Policy in force at its registration (§ 5.1.1.2).
- Check the VDS properties: append-only, non-equivocation and replayability (§ 5.1.3). Consistency proofs between tree sizes show the log only grew (RFC 9942 § 5.3).
- Check that each entry passed the policy that was most recently committed at its registration time (§ 5.1.1.1).
- Relying Parties and Auditors need not be trusted; as long as Issuers and TSs control their keys, nobody can frame them for statements they did not issue or register (§ 9.7).

## Privacy (RFC 9942 § 6)

Inclusion proofs leak the log size at registration, which can reveal, for example, how many breach notices a log held. Receipt producers MUST perform a privacy analysis for mandatory header fields in their profiles (RFC 9942 § 6.2).

## Verify checklist

- [ ] Signed Statement and every Receipt are tagged COSE_Sign1 and verified per RFC 9052 § 4.4.
- [ ] Receipt `vds` and `vdp` proof types are registered values; unknown VDSs are skipped or rejected, never guessed.
- [ ] Inclusion proof recomputes the root used as the detached payload before the signature check passes.
- [ ] The Receipt's TS identity is trusted; the Signed Statement's `iss` and `sub` are what the policy expects.
- [ ] One overall verdict, false if any required check fails.
