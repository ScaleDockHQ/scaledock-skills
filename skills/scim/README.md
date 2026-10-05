# scim

An agent skill for SCIM 2.0 (System for Cross-domain Identity Management): building SCIM service providers and clients that provision users and groups across domains, and upgrading SCIM 1.1 implementations to 2.0.

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
- Upgrading SCIM 1.1 clients and service providers to SCIM 2.0.

## Versions

| Line     | Status                |
| -------- | --------------------- |
| SCIM 2.0 | current               |
| SCIM 1.1 | legacy (upgrade from) |

No preview is listed: the IETF SCIM working group's drafts extend 2.0 rather than start a new line. `references/versions.md` says which line to use and how to upgrade from 1.1.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [RFC 7642](https://www.rfc-editor.org/rfc/rfc7642), [RFC 7643](https://www.rfc-editor.org/rfc/rfc7643) and [RFC 7644](https://www.rfc-editor.org/rfc/rfc7644).
- [RFC 9865](https://www.rfc-editor.org/rfc/rfc9865) (cursor pagination) and [RFC 9967](https://www.rfc-editor.org/rfc/rfc9967) (security events).
- [RFC 7523](https://www.rfc-editor.org/rfc/rfc7523) (JWT client authentication).
- [IPSIE AL SCIM 2.0 Profile](https://openid.github.io/ipsie-scim-al/draft-openid-ipsie-al-scim-profile.html): Draft 00 editor's copy.
- [FastFed Enterprise SCIM Profile 1.0](https://openid.net/specs/fastfed-scim-1_0-03.html): draft 03.
- [SCIM Core Schema 1.1](http://www.simplecloud.info/specs/draft-scim-core-schema-01.html) and [SCIM Protocol 1.1](http://www.simplecloud.info/specs/draft-scim-api-01.html): 9 July 2012, with the [simplecloud.info index](http://www.simplecloud.info/).
- The [IETF SCIM working group documents](https://datatracker.ietf.org/wg/scim/documents/) list.

## License

MIT
