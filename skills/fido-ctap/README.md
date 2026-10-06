# fido-ctap

An agent skill for FIDO CTAP.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill fido-ctap
```

Then ask the agent to apply FIDO CTAP.

## What it covers

- when implementing a FIDO authenticator or client
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line       | Status                |
| ---------- | --------------------- |
| CTAP 2.3   | current               |
| CTAP 2.2   | supported             |
| CTAP 2.1   | supported             |
| U2F 1.2    | legacy (upgrade from) |
| CTAP 2.3.1 | preview (track)       |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [CTAP 2.3](https://fidoalliance.org/specs/fido-v2.3-ps-20260226/fido-client-to-authenticator-protocol-v2.3-ps-20260226.html): Proposed Standard, CTAP 2.3 Proposed Standard 2026-02-26 (Proposed Standard, 2026-02-26).
- [CTAP 2.2](https://fidoalliance.org/specs/fido-v2.2-ps-20250714/fido-client-to-authenticator-protocol-v2.2-ps-20250714.html): Proposed Standard, CTAP 2.2 Proposed Standard 2025-07-14 (Proposed Standard, 2025-07-14).
- [CTAP 2.1](https://fidoalliance.org/specs/fido-v2.1-ps-20210615/fido-client-to-authenticator-protocol-v2.1-ps-20210615.html): Proposed Standard, CTAP 2.1 Proposed Standard 2021-06-15 (Proposed Standard, 2021-06-15).
- [U2F 1.2](https://fidoalliance.org/specs/fido-u2f-v1.2-ps-20170411/fido-u2f-raw-message-formats-v1.2-ps-20170411.html): Proposed Standard, U2F 1.2 raw message formats (Proposed Standard, 2017-04-11).
- [CTAP 2.3.1](https://fidoalliance.org/specs/fido-v2.3.1-wd-20260529/fido-client-to-authenticator-protocol-v2.3.1-wd-20260529.html): Working Draft, CTAP 2.3.1 Working Draft 2026-05-29 (Working Draft, 2026-05-29).

## License

MIT
