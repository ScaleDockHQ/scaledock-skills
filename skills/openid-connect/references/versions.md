# Versions and upgrades

Read this when choosing a target version, meeting an OpenID Authentication 2.0 relying party or provider, or moving its users to OpenID Connect. Sources: OpenID Connect Core 1.0 incorporating errata set 2 (Core), Core 1.0 incorporating errata set 1 (Core errata 1), OpenID Authentication 2.0 (OpenID 2.0) and OpenID 2.0 to OpenID Connect Migration 1.0 (Migration), listed in [Sources](../SKILL.md#sources).

## Version lines

| Id           | Line                      | Status  | Revision                                 | Posture | Summary                                                                                              |
| ------------ | ------------------------- | ------- | ---------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------- |
| `1.0`        | OpenID Connect 1.0        | current | Core 1.0 errata set 2 (15 December 2023) |         | The default target: an identity layer on OAuth 2.0 with signed ID tokens.                            |
| `openid-2.0` | OpenID Authentication 2.0 | legacy  | Final (5 December 2007)                  |         | The previous generation of OpenID. Read it and migrate its users; never build a new 2.0 integration. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

### Errata sets within 1.0

Errata sets correct the text of a Final specification without changing its version. Core lists its previous versions as Core 1.0 (final) of February 2014 and Core 1.0 incorporating errata set 1 of 8 November 2014 (Core § 1). The unversioned URL `openid-connect-core-1_0.html` now serves errata set 2, and errata set 1 stays at `openid-connect-core-1_0-errata1.html`. Discovery, Dynamic Client Registration and Back-Channel Logout received errata in the same December 2023 round. An implementation built against errata set 1 is still an OpenID Connect 1.0 implementation; read errata set 2 when checking it, and cite errata set 2 in new work.

## Which version to use

- Build every new RP, resource server and OP against OpenID Connect 1.0, at errata set 2.
- Treat an OpenID Authentication 2.0 deployment as input to a migration. Do not add OpenID 2.0 support to a new system; the OpenID Foundation specifications index files the Final OpenID 2.0 specifications under its obsolete documents, and Core describes itself as the successor version of OpenID (Core Appendix B).
- Key Binding and IPSIE SL1 are extensions and profiles of 1.0, not a next Connect line. They stay in [`extensions-and-drafts.md`](extensions-and-drafts.md) at their own posture.

## What changed

### OpenID Connect 1.0 (from OpenID Authentication 2.0)

- The protocol runs on OAuth 2.0 authorization and token endpoints with the `openid` scope (Core § 3, § 3.1.2.1), instead of OpenID 2.0 indirect messages with `openid.*` parameters in Key-Value or HTTP encoding (OpenID 2.0 § 4.1, § 5).
- The assertion is a signed JWT, the ID token (Core § 2), validated with keys from `jwks_uri` (Core § 10.1). OpenID 2.0 signed assertions with HMAC-SHA1 or HMAC-SHA256 shared secrets from associations, or by direct verification with the OP (OpenID 2.0 § 6, § 8, § 11.4).
- The stable user key is `iss` plus `sub` (Core § 5.7). OpenID 2.0 used the Claimed Identifier, a URL or XRI, as the local key (OpenID 2.0 § 11.5), with fragments for recycled URLs (OpenID 2.0 § 11.5.1).
- Discovery uses `/.well-known/openid-configuration` (Discovery § 4) instead of XRDS (Yadis) or HTML-based discovery on the user's identifier (OpenID 2.0 § 7.3).
- Replay protection uses the RP's `nonce` echoed in the ID token (Core § 2, § 3.1.2.1). OpenID 2.0 used the OP's `openid.response_nonce` (OpenID 2.0 § 10.1, § 11.3).
- Authentication policy moved into Core: `max_age`, `auth_time` and `acr` correspond to the OpenID 2.0 PAPE extension's `max_auth_age`, `auth_time` and `nist_auth_level` (Core § 2, § 3.1.2.1).
- The return URL check against `openid.realm` (OpenID 2.0 § 9.2) became exact `redirect_uri` matching for a registered client (Core § 3.1.2.1).

## Upgrading

### OpenID Authentication 2.0 to OpenID Connect 1.0

Migration moves each existing user from the OpenID 2.0 Identifier to the OpenID Connect Identifier, the `iss` and `sub` pair, without asking them to create a new account (Migration § 1, § 1.2).

1. **Change the protocol.** Register the RP as an OpenID Connect client and run the authentication request from [`authentication-request.md`](authentication-request.md). Remove the `openid.ns` messages (OpenID 2.0 § 4.1.2), associations (OpenID 2.0 § 8) and `check_authentication` calls (OpenID 2.0 § 11.4.2).
2. **Ask for the old identifier.** Add `openid2` to `scope`. If the RP used a pairwise identifier under OpenID 2.0, also send `openid2_realm` with the old `openid.realm` value (Migration § 2). An OP that does not support `openid2` ignores it (Migration § 2, Core § 3.1.2.1).
3. **OP side.** The OP verifies that the realm and the RP's redirect URI match as OpenID 2.0 § 9.2 requires, to stop an RP obtaining another RP's pairwise identifier (Migration § 3). If it finds the user's OpenID 2.0 Identifier, it returns it as the JSON string claim `openid2_id` in the ID token; otherwise it omits the claim (Migration § 4). No new error codes are defined (Migration § 4.1). The OP SHOULD ask the user before correlating the two identifiers (Migration § 9.1).
4. **Validate the ID token** exactly as Core § 3.1.3.7 requires (Migration § 5), using [`id-token-validation.md`](id-token-validation.md).
5. **Verify that the Connect OP is authoritative for `openid2_id`** (Migration § 6). One of these must hold, or the RP MUST NOT accept the identifier:
   1. The RP knows the authority hosts exactly one OpenID 2.0 OP and one Connect OP, and the authorization endpoint's authority equals the OpenID 2.0 OP endpoint's authority.
   2. A GET on the `openid2_id` URL with `Accept: application/json` returns a JSON object whose `iss` exactly matches the ID token `iss`. When the authorities differ, this check is mandatory (Migration § 2).
   3. For an XRI identifier, GET `https://xri.net/` + `openid2_id` + `/(+openid_iss)`, follow redirects to the `200 OK`, and compare that URL with `iss`, ignoring only a trailing slash.
      When in doubt, skip rule 1 and use rule 2 (Migration § 10).
6. **Link the accounts.** After the check passes, associate the existing account, keyed on the old Claimed Identifier, with `iss` plus `sub`, and key future logins on `iss` plus `sub` (Migration § 7, Core § 5.7). Libraries that keyed on `openid.identity` instead of `openid.claimed_id` had a bug; Migration § 8 explains how to recover those links.
7. **Keep behaviour unchanged.** Each migrated user lands in the same account as before. The `openid2_id` check keeps working after the OpenID 2.0 OP is shut down (Migration § 8.1), so keep it in place until every active account is linked.

### Errata set 1 to errata set 2

1. Update the cited revision to errata set 2 and the URL to the unversioned Core, Discovery and Registration pages.
2. Re-read the sections the implementation cites; section numbers are stable within 1.0.
3. Re-run the conformance checks for the role.
4. Keep behaviour unchanged unless a corrected sentence shows the old behaviour was wrong.

## Preview

No preview is listed. The OpenID Foundation index shows no draft of a Connect Core 1.1 or 2.0; the active AB/Connect drafts (Key Binding, Native SSO and others) are extensions of 1.0. Track Key Binding and IPSIE SL1 in [`extensions-and-drafts.md`](extensions-and-drafts.md). If a draft of a next Connect Core version appears with text, list it here as a preview with posture track.
