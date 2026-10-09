# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the pinned texts listed in [Sources](../SKILL.md#sources).

## Version lines

| Id          | Line      | Status  | Revision                                                                   | Posture | Summary                                                                                                    |
| ----------- | --------- | ------- | -------------------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------- |
| `did-web`   | did:web   | current | Unofficial draft, w3c-ccg/did-method-web commit ea423c1, 2026-05-08        |         | DID document served over HTTPS at a domain, at /.well-known/did.json or a path.                            |
| `did-key`   | did:key   | current | v0.9 draft, w3c-ccg/did-method-key commit 2cc490c, 2025-11-02              |         | DID document expanded deterministically from a multibase-encoded public key; no update or deactivate.      |
| `did-jwk`   | did:jwk   | current | quartzjer/did-jwk spec.md commit 44e186c, 2023-08-19                       |         | DID document generated from a base64url-encoded public JWK; no update or deactivate.                       |
| `did-webvh` | did:webvh | current | v1.0, decentralized-identity/didwebvh spec-v1.0 commit 7e39c70, 2026-09-25 |         | did:web with a verifiable history: a signed, hash-chained did.jsonl log with a self-certifying identifier. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build.

The four methods are separate families; each has one line here. did:webvh v1.0 is the DIF's current published version; its repository also holds the v0.3 to v0.5 texts and an editor's draft that this skill does not track.

## Upgrading

There is no older line in any family here. A did:web DID can be upgraded to did:webvh by publishing a did:webvh log for the same domain; the did:webvh specification's section on publishing a parallel did:web DID covers keeping both resolvable.
