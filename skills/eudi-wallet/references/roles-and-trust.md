# Roles and trust

Read this when placing a component in the EUDI Wallet ecosystem: who registers where, who holds which certificate, which trust list carries whose trust anchors, what a Wallet Unit consists of, and how WIAs, KAs and Wallet Unit revocation work. Sources: ARF 3.0.0 chapters 3, 4 and 6, Annex 2 Topics 9, 27, 31, 38, 44 and 52, and Regulation (EU) 2024/1183 Article 5b; see [Sources](../SKILL.md#sources).

## Roles

| Role                                           | What it does                                                                                   | Registered by a Registrar | Trust anchors published in                  |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------- | ------------------------------------------- |
| Wallet Provider (§ 3.3)                        | Makes a certified Wallet Solution available; signs WIAs and KAs                                | No (notified only)        | Wallet Provider LoTE                        |
| PID Provider (§ 3.4)                           | Verifies the User's identity at LoA high, issues PIDs, publishes validity information          | Yes                       | PID Provider LoTE                           |
| QEAA Provider (§ 3.6)                          | A QTSP issuing qualified attestations                                                          | Yes                       | Trusted List (Art. 22 of the Regulation)    |
| PuB-EAA Provider (§ 3.7)                       | A public sector body, or one acting on its behalf, responsible for an authentic source         | Yes                       | PuB-EAA Provider LoTE                       |
| Non-qualified EAA Provider (§ 3.8)             | Issues other attestations                                                                      | Yes                       | As the Attestation Rulebook says (`OIA_15`) |
| Relying Party (§ 3.11)                         | A service provider requesting attributes, subject to User approval                             | Yes                       | None: authenticated by access certificates  |
| Intermediary (§ 3.11.4)                        | Connects to Wallet Units on behalf of Relying Parties; is itself a Relying Party (Art. 5b(10)) | Yes, as an intermediary   | None                                        |
| Registrar (§ 3.17)                             | Registers providers and Relying Parties under CIR 2025/848; publishes the registered data      | n/a                       | n/a                                         |
| Access Certificate Authority (§ 3.18)          | Issues X.509 access certificates (RFC 5280, ETSI TS 119 411-8)                                 | n/a                       | Access CA LoTE                              |
| Provider of registration certificates (§ 3.19) | Issues JWT registration certificates (RFC 7519) for a Registrar                                | n/a                       | Provider of registration certificates LoTE  |

- In the Regulation, "wallet-relying party" also covers Attestation Providers; the ARF uses "Relying Party" only for service providers (§ 3.11.1).
- PID and Attestation Providers are also notified under CIR 2024/2980, a separate legal flow from registration (§ 3.17).
- Trusted Lists follow ETSI TS 119 612; LoTEs follow ETSI TS 119 602. The Commission signs and publishes the LoTEs and publishes their locations in the OJEU (§ 3.5).
- An entity is never removed from a Trusted List or LoTE; its status is set to Invalid (§ 3.5). Relying Parties download the latest lists regularly, add new trust anchors to all their Instances, and drop invalidated ones (`OIA_15a`).
- There is no Trusted List or LoTE for Relying Parties (§ 3.5).

## Relying Party registration and certificates

The Regulation requires a Relying Party to register in the Member State where it is established, giving at least its Member State, name and registration number, contact details, and the intended use with the data it will request. It must not request other data, must identify itself to the User, and must not refuse pseudonyms where identification is not legally required (Art. 5b(1)–(3), (8), (9)).

In the ARF (§ 3.11, § 3.17–§ 3.19):

- The Registrar assigns an EU-wide unique **Relying Party identifier**. The Relying Party registers one or more **Services**, each with a Relying Party-chosen Service identifier, trade name and description, and one or more **intended uses**, whose identifiers the Registrar generates (§ 3.11.2).
- Each **registration certificate** holds exactly one intended use, the Relying Party identifier and the Service identifier. Three Services with two, four and one intended uses get seven registration certificates (§ 3.11.2).
- Each **access certificate** is bound to one Relying Party Instance: the Instance generates the key pair and keeps the private key; the Relying Party sends the public key with the RP identifier and Service identifier to the Access CA. An Instance serving several Services gets one access certificate per Service (§ 3.11.3).
- Both certificate types carry the RP identifier and trade name and the Service identifier and trade name (§ 3.11.1), which binds the JWT registration certificate to the X.509 access certificate (§ 3.19).
- PID Providers and Attestation Providers also receive access and registration certificates; their registration certificate lists the attestation types they may issue (§ 3.17, § 3.18, § 3.19).
- Wallet Units verify registration certificates under CIR 2024/2982, applicable 24 months after the amending act enters into force (§ 3.19).
- An Access CA runs a root CA (its trust anchors in the LoTE), at least one signing CA, and optional intermediate CAs. It logs every access certificate in a Certificate Transparency log once one exists (§ 3.18; Topic 55).

### Intermediaries

- An intermediary registers as a Relying Party that acts as an intermediary (`RPI_01`). Each intermediated Relying Party registers in its own Member State, and its registration certificates show that it uses the intermediary (`RPI_03`).
- The intermediated Relying Party tells the intermediary which single registration certificate to include in the request (`RPI_05`).
- The intermediary performs every Relying Party task on behalf of the intermediated one and must not store data about the content of the transaction (§ 3.11.4; Art. 5b(10)). Section 6.6.5 describes the flow.

## Wallet Unit components (§ 4.3.2)

- **User device**: hardware, OS and software environment. A device can host several Wallet Instances, each part of its own Wallet Unit.
- **Wallet Instance**: the app (or web application) the User controls; talks to the WSCA and optionally to keystores.
- **WSCD**: a tamper-resistant device at LoA high. Four architectures: remote (HSM), local external (smart card), local internal (SIM, eSIM, embedded SE), local native (OS API) (§ 4.5).
- **WSCA**: the application that uses the WSCD to manage critical assets. A WSCA never lets private keys be exported from a WSCD (`WUA_16a`).
- **Keystore**: hardware-backed storage for non-critical keys (SE, TPM, TEE, secure enclave, remote HSM). **A keystore cannot hold PID private keys**; those need a WSCA/WSCD.
- **Local QSCD** (optional), the **Wallet Provider backend** (support, maintenance, WIA and KA issuance), and an optional **Wallet Unit Service** running in that backend.

## Wallet Instance Attestation and Key Attestation

The Wallet Provider issues both during activation and keeps a non-revoked Wallet Unit supplied with valid ones (§ 6.5.3.4, § 6.5.3.5; `WUA_03`, `WUA_22`). Their format is in Technical Specification 3, which this skill does not cover.

| Property             | Key Attestation (KA)                                                                                           | Wallet Instance Attestation (WIA)                                                               |
| -------------------- | -------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Attests              | Certification and properties of a WSCA/WSCD or keystore                                                        | Integrity and authenticity of the Wallet Instance; Wallet Solution name, version, certification |
| Public keys          | One or more, generated and held in that WSCA/WSCD or keystore (`WUA_09`); new PIDs bind to one (`WUA_09a`)     | One, whose private key the Wallet Instance manages                                              |
| Validity             | Set by the Wallet Provider, weighing tracking risk (`WUA_17`)                                                  | Less than 24 hours, plus a longer revocation maintenance period                                 |
| Revocation reference | For the WSCD or keystore; type-shared or per-KA index                                                          | For the Wallet Instance                                                                         |
| Sent to              | PID and Attestation Providers, only for PIDs and device-bound attestations, each KA once (`WUA_07`, `WUA_10a`) | PID and Attestation Providers, for every issuance (`WUA_24`)                                    |
| Never sent to        | Relying Parties                                                                                                | Relying Parties                                                                                 |

- During PID issuance the Wallet Unit gives a KA for the WSCA/WSCD that generated the new key (`WUA_05`); the Provider verifies it per OpenID4VCI Appendix F.4 (`WUA_11a`) and gets proof of possession of every attested key (`WUA_12`).
- A PID's technical validity cannot run past the revocation maintenance period in the KA and WIA it was issued against (§ 6.5.3.4).

## Lifecycles and revocation

- **Wallet Unit** (§ 4.6.4): Installed, then Operational after activation, Valid once it holds a valid PID, Revoked when the Wallet Provider revokes the Wallet Instance or a WSCD or keystore. Revocation cannot be undone. A Revoked Wallet Unit cannot request issuance.
- The Wallet Provider revokes the Wallet Instance by setting `revoked` at every index in its WIAs' status lists, and a WSCD or keystore through the KAs' status lists (`WURevocation_07`, `WURevocation_07a`). It revokes on the User's request (`WURevocation_10`), on a PID Provider's request when the person has died after checking that Provider is in the PID Provider LoTE (`WURevocation_11`, `WURevocation_12`), and on a detected compromise (`WURevocation_09`). It informs the User within 24 hours through a channel independent of the Wallet Unit (`WURevocation_14`, `WURevocation_16`).
- **PID Providers** check, for the whole life of each PID, whether the Wallet Instance or WSCD is revoked and whether the Wallet Provider is suspended or cancelled in its LoTE, and revoke the PID if so (§ 6.6.2.5; `WURevocation_18`, `VCR_07c`). Attestation Providers may do the same (`WURevocation_19`). A Relying Party checking PID revocation therefore implicitly checks the Wallet Unit (§ 6.6.2.5).
- **Regulation**: wallets are revoked on the User's explicit request, when their security is compromised, and on the User's death (Art. 5a(9)).
