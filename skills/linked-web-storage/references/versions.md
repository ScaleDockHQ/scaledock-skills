# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id                    | Line                                                                            | Status  | Revision                                                                        | Posture | Publisher                |
| --------------------- | ------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------- | ------- | ------------------------ |
| `lws10-core`          | Linked Web Storage Protocol 1.0                                                 | current | lws10-core WD-lws10-core-20260921 (Working Draft, 2026-10-05)                   | track   | Working Draft 2026-10-05 |
| `lws10-authn-openid`  | LWS 1.0 Authentication Suite: OpenID Connect                                    | current | lws10-authn-openid WD-lws10-authn-openid-20260803 (Working Draft, 2026-08-03)   | track   | Working Draft 2026-08-03 |
| `lws10-authn-saml`    | LWS 1.0 Authentication Suite: SAML 2.0                                          | current | lws10-authn-saml WD-lws10-authn-saml-20260803 (Working Draft, 2026-08-03)       | track   | Working Draft 2026-08-03 |
| `lws10-authn-ssi-cid` | LWS 1.0 Authentication Suite: Self-signed Identity using Controlled Identifiers | current | lws10-authn-ssi-cid WD-lws10-authn-ssi-cid-20260921 (Working Draft, 2026-09-21) | track   | Working Draft 2026-09-21 |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### Linked Web Storage Protocol 1.0

- Publisher status on 2026-10-06: Working Draft (2026-10-05).
- Pinned text: https://www.w3.org/TR/lws10-core/
- Revision token: lws10-core WD-lws10-core-20260921 (Working Draft, 2026-10-05)

### LWS 1.0 Authentication Suite: OpenID Connect

- Publisher status on 2026-10-06: Working Draft (2026-08-03).
- Pinned text: https://www.w3.org/TR/lws10-authn-openid/
- Revision token: lws10-authn-openid WD-lws10-authn-openid-20260803 (Working Draft, 2026-08-03)

### LWS 1.0 Authentication Suite: SAML 2.0

- Publisher status on 2026-10-06: Working Draft (2026-08-03).
- Pinned text: https://www.w3.org/TR/lws10-authn-saml/
- Revision token: lws10-authn-saml WD-lws10-authn-saml-20260803 (Working Draft, 2026-08-03)

### LWS 1.0 Authentication Suite: Self-signed Identity using Controlled Identifiers

- Publisher status on 2026-10-06: Working Draft (2026-09-21).
- Pinned text: https://www.w3.org/TR/lws10-authn-ssi-cid/
- Revision token: lws10-authn-ssi-cid WD-lws10-authn-ssi-cid-20260921 (Working Draft, 2026-09-21)

## Upgrading

There is no older line to upgrade from.

## Preview

No preview line is listed. The pinned current text is the newest line this skill tracks.
