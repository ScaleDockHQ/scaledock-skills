# scim

An agent skill for SCIM 2.0 (System for Cross-domain Identity Management): building SCIM service providers and clients that provision users and groups across domains.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill scim
```

Then ask your agent to "add a SCIM 2.0 endpoint for users and groups" or "review our SCIM provisioning client".

## What it covers

- The RFC 7643 core schema: attribute characteristics, common attributes, User, Group and the Enterprise User extension.
- The RFC 7644 protocol: create, query, filters, sorting, PUT, PATCH, DELETE, Bulk, `/Me`, errors and ETags.
- Discovery through `/ServiceProviderConfig`, `/ResourceTypes` and `/Schemas`.
- Index pagination, and cursor pagination from RFC 9865.
- Authentication, including RFC 7523 JWT client authentication, plus tenancy, TLS and privacy.
- RFC 9967 security events and asynchronous requests.
- The draft IPSIE AL and FastFed SCIM profiles, with their known inconsistencies.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [RFC 7642](https://www.rfc-editor.org/rfc/rfc7642), [RFC 7643](https://www.rfc-editor.org/rfc/rfc7643) and [RFC 7644](https://www.rfc-editor.org/rfc/rfc7644).
- [RFC 9865](https://www.rfc-editor.org/rfc/rfc9865) (cursor pagination) and [RFC 9967](https://www.rfc-editor.org/rfc/rfc9967) (security events).
- [RFC 7523](https://www.rfc-editor.org/rfc/rfc7523) (JWT client authentication).
- [IPSIE AL SCIM 2.0 Profile](https://openid.github.io/ipsie-scim-al/draft-openid-ipsie-al-scim-profile.html): Draft 00 editor's copy.
- [FastFed Enterprise SCIM Profile 1.0](https://openid.net/specs/fastfed-scim-1_0-03.html): draft 03.

## License

MIT
