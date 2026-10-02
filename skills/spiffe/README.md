# spiffe

An agent skill for SPIFFE (Secure Production Identity Framework for Everyone): issuing, fetching and verifying workload identities, and federating trust domains, with SPIRE as the reference implementation.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill spiffe
```

Then ask your agent to "add SPIFFE mTLS between these services" or "review our SPIRE federation setup".

## What it covers

- SPIFFE ID syntax, trust domain names and the safety of SVID assertions.
- X.509-SVID certificate rules and leaf validation.
- JWT-SVID header and claim rules, validation and transmission.
- Trust domain bundles, bundle maps and key rotation.
- The Workload Endpoint and the Workload API X.509, JWT and WIT profiles.
- Federation bundle endpoints with the `https_web` and `https_spiffe` profiles.
- SPIRE servers, agents, attestation, registration entries and federation configuration.
- The Incubating WIT-SVID.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- The SPIFFE standards in [spiffe/spiffe](https://github.com/spiffe/spiffe) at `main` commit f97c46d: SPIFFE-ID, X509-SVID, JWT-SVID, Trust Domain and Bundle, Workload API, Workload Endpoint and Federation (Stable), and WIT-SVID (Incubating).
- [SPIRE v1.15.3](https://github.com/spiffe/spire/releases/tag/v1.15.3) and the [spiffe.io documentation](https://spiffe.io/docs/latest/).

## License

MIT
