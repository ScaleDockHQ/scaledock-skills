# Architecture: roles, transparency services and registration policies

Read this when designing a Transparency Service (TS), deciding what an Issuer or Relying Party must do, or writing a Registration Policy. Section numbers are RFC 9943 unless another document is named.

## Roles and terms (§ 3)

| Term                  | Meaning                                                                                                                                                               |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Artifact              | A physical or non-physical item moving along a supply chain.                                                                                                          |
| Statement             | Any serializable information about an Artifact, tagged with a media type. Opaque to the TS, and MAY be encrypted.                                                     |
| Issuer                | The identifier of an organization, device, user or entity that secures Statements. Carried as the `iss` claim inside CWT Claims (COSE header parameter 15, RFC 9597). |
| Subject               | An Issuer-defined identifier for the thing Statements are about, carried as `sub`. Groups a logical collection of Statements.                                         |
| Envelope              | The COSE protected header (signed) and unprotected header (not signed) wrapped around a Statement.                                                                    |
| Signed Statement      | A Statement in a COSE_Sign1 Envelope, signed by the Issuer.                                                                                                           |
| Transparency Service  | Maintains and extends the Verifiable Data Structure (VDS) and endorses its state. Its identity is a public key Relying Parties must know to validate Receipts.        |
| Registration          | Submit a Signed Statement, apply the Registration Policy, add it to the VDS, produce a Receipt.                                                                       |
| Registration Policy   | The precondition the TS enforces before registering, based on the non-opaque header and metadata in the Envelope.                                                     |
| Receipt               | A COSE_Sign1 (RFC 9942) that proves VDS properties. Receipt profiles MUST support inclusion proofs and MAY support other proof types such as consistency proofs.      |
| Transparent Statement | A Signed Statement with one or more Receipts in its unprotected header. It is still a valid Signed Statement and may be registered again elsewhere.                   |
| Append-only Log       | The Statement Sequence holding the TS's entire registration history.                                                                                                  |
| Relying Party         | Consumes Transparent Statements, verifies their proofs and inspects the payload.                                                                                      |
| Auditor               | A specialized Relying Party that checks the correctness and consistency of all Transparent Statements a TS issued.                                                    |
| Client                | An application that makes TS requests on behalf of a resource owner. Not necessarily the Issuer (§ 7).                                                                |
| Equivocation          | A TS giving Relying Parties inconsistent proofs about the Signed Statement at a given VDS position. Non-equivocation is the opposite.                                 |

SCITT generalizes Certificate Transparency (RFC 9162): CAs are Issuers, certificates are Signed Statements, CT logs are TSs, and SCTs are Transparent Statements (§ 4).

## What transparency gives you (§ 4, § 9)

- Transparency does not stop dishonest Issuers; it holds them accountable (§ 4).
- A Receipt is universally verifiable without online access to the TS. Asking again can yield a new Receipt for the same Signed Statement; its key, algorithm, validity period, headers or claims MAY differ each time (§ 4).
- Guarantees: Statements are identifiable and authenticated; provenance and history can be audited; Issuers can prove a Statement is logged (§ 9).
- Registering only proves an Issuer produced a Statement, not that it is true (§ 9.2). Relying Parties choose which Issuers and TSs to trust (§ 9, § 9.7).
- Unless the Registration Policy says so, log order does not match issuance order (§ 9.1).
- Issuers can withhold Statements. Do not accept a Signed Statement without a Receipt from a TS you trust (§ 9.3).

## Transparency Service requirements (§ 5.1)

- A TS MUST produce COSE Receipts (RFC 9942). It typically has one Issuer identity in the `iss` of its Receipts; multi-tenant services can use distinct `iss` values per tenant (§ 5.1).
- The VDS MUST be append-only (no modify, delete or reorder), non-equivocating (no fork; everyone sees the same ordered collection), and replayable (enough information for authorized actors to check each registration) (§ 5.1.3).
- A TS can sit next to other storage (Adjacent Services), for example a package manager that asks for a fresh Receipt for a package (§ 5.1.4).

### Mandatory registration checks (§ 5.1.1.1)

1. Cryptographically verify the COSE signature per RFC 9052. The Issuer identity MUST be bound by an identifier in the protected header; if several identifiers are present, check every one the TS registers.
2. Maintain a list of trust anchors (an X.509 root or its thumbprint, an OpenID Connect provider, or anything referenceable from a COSE header parameter) and authenticate Signed Statements as part of a Registration Policy.
3. For X.509 Signed Statements, build and validate a full certification path to a registered root. The protected header MUST carry `x5t` (34) or `x5chain` (33) per RFC 9360. With `x5t` protected, a matching `x5chain` MAY sit in the unprotected header.
4. Register Registration Policies and trust anchors as Signed Statements on the VDS, so they are transparent to Relying Parties.
5. Apply the Registration Policy most recently committed to the VDS at the time of Registration.

### Registration Policies (§ 5.1.1, § 5.1.1.2)

- A TS MUST maintain Registration Policies, even one that allows every authenticated submission, so the service can be audited and the policy can change later.
- Additional checks beyond the mandatory ones, including none, are up to the implementation; encoding and documentation of policies are up to the operator.
- The operator MAY update the policy or trust anchors at any time. For every registered Signed Statement, the TS MUST make enough available to Auditors to reproduce the checks: the Signed Statements, any collateral needed to authenticate them, and the policy that applied.

### Bootstrapping (§ 5.1.2, § 9.4.3)

A TS MUST support at least one of: a preconfigured policy and trust anchors; accepting a first Signed Statement whose payload is a valid Registration Policy without registration checks; or an out-of-band authenticated management interface. Mechanisms that set and update policy only through registration are auditable without extra knowledge and are preferable; preconfigured values that cannot be updated are unsuitable for long-lived services.

## Registration steps (§ 6.3)

1. Client authentication: implementation specific.
2. Verify the signature per RFC 9052 § 4.4 with the Issuer's algorithm and key per RFC 9360, and check the required protected headers are present. The TS MAY validate the payload for content-type-specific policies.
3. Apply the Registration Policy: check the attributes it requires are in the protected header.
4. Register the Signed Statement.
5. Return the Receipt. This MAY be asynchronous, but the TS MUST be able to provide a Receipt for every registered Signed Statement.

Steps 4 and 5 may be batched. A TS MUST register a Signed Statement before releasing its Receipt. A TS MAY read the unprotected header during verification and policy evaluation, but the unprotected header MUST be set to an empty map before the Signed Statement enters the Statement Sequence. The same Signed Statement may be registered with several TSs. An Issuer that learns of a changed state of quality for an Artifact SHOULD register a new Signed Statement with the same `iss` and `sub`.

## Key management (§ 9.4)

Issuers and TSs MUST protect their private signing keys, avoid using keys for more than one purpose, and rotate them at an appropriate cryptoperiod. After a TS key compromise, a TS can roll back its Statement Sequence to before the compromise, establish new credentials and issue fresh Receipts (§ 9.4.2). Revocation strategies are out of scope.

## Privacy (§ 8)

The TS is trusted with the confidentiality of submitted Signed Statements; Issuers and Clients check the TS's privacy posture before submitting, and review PII in Statements. A TS can keep only cryptographic metadata (a hash), but metadata analysis across the TS and Adjacent Services can still reveal build and release order.

## Common mistakes

- Treating a Receipt as proof that a Statement is true. It proves registration only (§ 9.2).
- Keeping a Registration Policy only in configuration. It MUST be registered on the VDS (§ 5.1.1.1).
- Logging the unprotected header. It MUST be emptied first (§ 6.3).
- Releasing a Receipt before the entry is committed (§ 6.3).
- Assuming log order is issuance order (§ 9.1).
