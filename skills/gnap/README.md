# gnap

An agent skill for the Grant Negotiation and Authorization Protocol: build and review GNAP clients, authorization servers and resource servers.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill gnap
```

Then ask your agent to "add GNAP token validation to this resource server" or "map our RAR authorization_details types to GNAP access rights".

## What it covers

- The RFC 9635 grant request, client keys and the `httpsig`, `mtls`, `jwsd` and `jws` proofing methods.
- Interaction start and finish modes, the interaction hash, continuation, and token rotation and revocation.
- The `access` rights array and how it relates to OAuth Rich Authorization Requests.
- RFC 9767 resource server connections: the token model, token formats, discovery, introspection, resource registration and derived tokens.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [RFC 9635](https://www.rfc-editor.org/rfc/rfc9635): RFC, Proposed Standard.
- [RFC 9767](https://www.rfc-editor.org/rfc/rfc9767): RFC, Proposed Standard.
- [RFC 9396](https://www.rfc-editor.org/rfc/rfc9396): RFC, Proposed Standard.

## License

MIT
