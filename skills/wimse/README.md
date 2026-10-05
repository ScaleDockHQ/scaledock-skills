# wimse

An agent skill for the IETF WIMSE (Workload Identity in Multi System Environments) drafts: give workloads identifiers and credentials, and authenticate service-to-service calls with Workload Identity Tokens, Workload Proof Tokens, HTTP Message Signatures or mutual TLS.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill wimse
```

Then ask your agent to "authenticate our service-to-service calls with WIMSE" or "move our services off shared bearer tokens".

## What it covers

- The architecture: trust domains, workload identifiers, context propagation, layered authentication, and the relationship with SPIFFE and OAuth.
- The Workload Identifier, the Workload Identity Token (WIT) and the Workload Identity Certificate (WIC).
- The Workload Proof Token (WPT), the WIMSE profile of HTTP Message Signatures, and mutual TLS, and how to choose between them.
- Workload identity practices for Kubernetes, SPIFFE, cloud providers, CI-CD and service meshes.
- The AIMS draft for AI agent identity, tracked but not built against.
- Upgrading from `draft-ietf-wimse-s2s-protocol` and from earlier WPT and HTTP signature revisions.

None of the drafts is an RFC yet. The skill builds against the pinned revisions and expects wire changes before publication.

## Versions

Each draft is its own line family.

| Line                                            | Status                |
| ----------------------------------------------- | --------------------- |
| draft-ietf-wimse-arch-08                        | current (name)        |
| draft-ietf-wimse-identifier-03                  | current (build)       |
| draft-ietf-wimse-workload-creds-02              | current (build)       |
| draft-ietf-wimse-s2s-protocol-07                | legacy (upgrade from) |
| draft-ietf-wimse-wpt-02                         | current (build)       |
| draft-ietf-wimse-wpt-01 and earlier             | legacy (upgrade from) |
| draft-ietf-wimse-http-signature-07              | current (build)       |
| draft-ietf-wimse-http-signature-06 and earlier  | legacy (upgrade from) |
| draft-ietf-wimse-mutual-tls-02                  | current (build)       |
| draft-ietf-wimse-workload-identity-practices-07 | current (build)       |
| draft-ietf-wimse-aims-00                        | current (track)       |

`references/versions.md` says which line to use and how to upgrade from each older one.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [WIMSE charter](https://datatracker.ietf.org/wg/wimse/about/) and [WG documents](https://datatracker.ietf.org/wg/wimse/documents/): active working group, read 2026-10-05.
- [draft-ietf-wimse-arch-08](https://www.ietf.org/archive/id/draft-ietf-wimse-arch-08.txt): WG draft (Informational), 2026-07-06.
- [draft-ietf-wimse-identifier-03](https://www.ietf.org/archive/id/draft-ietf-wimse-identifier-03.txt): WG draft (Standards Track), 2026-07-06.
- [draft-ietf-wimse-workload-creds-02](https://www.ietf.org/archive/id/draft-ietf-wimse-workload-creds-02.txt): WG draft (Standards Track), 2026-07-02.
- [draft-ietf-wimse-wpt-02](https://www.ietf.org/archive/id/draft-ietf-wimse-wpt-02.txt): WG draft (Standards Track), 2026-08-27.
- [draft-ietf-wimse-http-signature-07](https://www.ietf.org/archive/id/draft-ietf-wimse-http-signature-07.txt): WG draft (Standards Track), 2026-09-20.
- [draft-ietf-wimse-mutual-tls-02](https://www.ietf.org/archive/id/draft-ietf-wimse-mutual-tls-02.txt): WG draft (Standards Track), 2026-07-06.
- [draft-ietf-wimse-workload-identity-practices-07](https://www.ietf.org/archive/id/draft-ietf-wimse-workload-identity-practices-07.txt) ([datatracker](https://datatracker.ietf.org/doc/draft-ietf-wimse-workload-identity-practices/)): Informational, submitted to the IESG, 2026-09-22.
- [draft-ietf-wimse-aims-00](https://www.ietf.org/archive/id/draft-ietf-wimse-aims-00.txt) ([datatracker](https://datatracker.ietf.org/doc/draft-ietf-wimse-aims/)): WG draft (Informational), 2026-09-15.
- [draft-ietf-wimse-s2s-protocol-07](https://www.ietf.org/archive/id/draft-ietf-wimse-s2s-protocol-07.txt) ([datatracker](https://datatracker.ietf.org/doc/draft-ietf-wimse-s2s-protocol/)), [draft-ietf-wimse-wpt-01](https://www.ietf.org/archive/id/draft-ietf-wimse-wpt-01.txt) and [draft-ietf-wimse-http-signature-06](https://www.ietf.org/archive/id/draft-ietf-wimse-http-signature-06.txt): replaced or superseded drafts, for the legacy lines.
- [RFC 9421](https://www.rfc-editor.org/rfc/rfc9421): RFC (Standards Track), for HTTP Message Signatures.
- [RFC 8705](https://www.rfc-editor.org/rfc/rfc8705): RFC (Standards Track), for OAuth mutual-TLS client authentication.

## License

MIT
