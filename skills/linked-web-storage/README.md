# linked-web-storage

An agent skill for Linked Web Storage.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill linked-web-storage
```

Then ask the agent to apply Linked Web Storage.

## What it covers

- when reading or writing a Linked Web Storage pod, including the OpenID, SAML and CID authentication suites
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line                                                                            | Status          |
| ------------------------------------------------------------------------------- | --------------- |
| Linked Web Storage Protocol 1.0                                                 | current (track) |
| LWS 1.0 Authentication Suite: OpenID Connect                                    | current (track) |
| LWS 1.0 Authentication Suite: SAML 2.0                                          | current (track) |
| LWS 1.0 Authentication Suite: Self-signed Identity using Controlled Identifiers | current (track) |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Linked Web Storage Protocol 1.0](https://www.w3.org/TR/lws10-core/): Working Draft, lws10-core WD-lws10-core-20260921 (Working Draft, 2026-10-05).
- [LWS 1.0 Authentication Suite: OpenID Connect](https://www.w3.org/TR/lws10-authn-openid/): Working Draft, lws10-authn-openid WD-lws10-authn-openid-20260803 (Working Draft, 2026-08-03).
- [LWS 1.0 Authentication Suite: SAML 2.0](https://www.w3.org/TR/lws10-authn-saml/): Working Draft, lws10-authn-saml WD-lws10-authn-saml-20260803 (Working Draft, 2026-08-03).
- [LWS 1.0 Authentication Suite: Self-signed Identity using Controlled Identifiers](https://www.w3.org/TR/lws10-authn-ssi-cid/): Working Draft, lws10-authn-ssi-cid WD-lws10-authn-ssi-cid-20260921 (Working Draft, 2026-09-21).
- [Linked Web Storage Use Cases](https://www.w3.org/TR/lws-ucs/): Draft Note, lws-ucs (Draft Note, 2026-02-10).
- [Linked Web Storage Vocabulary](https://www.w3.org/TR/lws10-vocab/): Draft Note, lws10-vocab (Draft Note, 2026-07-14).

## License

MIT
