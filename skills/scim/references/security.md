# SCIM security

Load this when choosing authentication for a SCIM integration or reviewing its security. Sources: RFC 7644 §2, §6 and §7; RFC 7643 §9; RFC 7642 §4; RFC 7523.

## Authentication options (RFC 7644 §2)

SCIM defines no authentication scheme of its own; it relies on TLS and standard HTTP schemes. RFC 7644 §2 lists:

- **TLS client authentication.** The service provider MAY request it.
- **HOBA.** HTTP Origin-Bound Authentication (RFC 7486).
- **Bearer tokens.** Bearer tokens (RFC 6750) MAY be used with TLS and a token framework such as OAuth 2.0. Tokens issued on weak or no authentication SHOULD NOT be used, except as single-use tokens for cases like anonymous registration.
- **PoP tokens.** Proof-of-possession tokens.
- **Cookies.** JavaScript clients MAY use cookies over TLS.
- **HTTP Basic.** Basic authentication should be avoided, and implementers SHOULD combine it with other factors.

The service provider SHALL list supported schemes in `WWW-Authenticate` (RFC 7644 §2) and in `authenticationSchemes` (RFC 7643 §5).

## Authorization (RFC 7644 §2, §2.1)

- **Access policy.** The service provider MUST map every authenticated client to an access control policy, and SHOULD check whether the subject may perform the action on the resource.
- **OAuth tokens.** For OAuth tokens, implementers SHOULD consider the grant type and scopes, and MUST account for the threats in RFC 7521 §8 (RFC 7644 §2.1, §7.3).
- **Anonymous requests.** These MAY be allowed for cases like self-registration (§2.2). They need countermeasures: authenticate the UI component, rate-limit, and create Users with `active: false` until confirmed (§7.6).

## Bearer tokens and cookies (RFC 7644 §7.4)

- **Entropy.** Tokens and cookies MUST contain enough entropy to prevent guessing.
- **Transport.** They MUST be exchanged over TLS.
- **Lifetime.** Bearer tokens MUST have a limited lifetime that the service provider can determine, directly or through a validation service.
- **Cookies.** A cookie SHOULD last no longer than the browser session.

## JWT client authentication (RFC 7523)

Both SCIM profiles in `profiles.md` use RFC 7523 for the SCIM client's OAuth token request. There are two distinct uses:

- **Authorization grant (§2.1).** `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer` with a single JWT in `assertion`. FastFed uses this.
- **Client authentication (§2.2).** `client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer` with a single JWT in `client_assertion`, for example with `grant_type=client_credentials`. IPSIE names this.

The authorization server validates the JWT per RFC 7523 §3:

1. **`iss`.** Present.
2. **`sub`.** Present. For client authentication it MUST be the `client_id`.
3. **`aud`.** Present and identifying the authorization server; the token endpoint URL MAY be used. The server MUST reject a JWT that does not list it.
4. **`exp`.** Present. The server MUST reject an expired JWT, allowing for small clock skew.
5. **`nbf`, `iat` and `jti`.** Optional. A JWT MUST NOT be accepted before `nbf`. The server may reject a JWT whose `iat` is too old, and MAY track `jti` to prevent replay.
6. **Signature.** The JWT MUST be digitally signed or MACed, and the server MUST reject it if the signature or MAC is invalid.
7. **Everything else.** The server MUST reject a JWT that is invalid in any other respect under RFC 7519.

```http
POST /oauth/token HTTP/1.1
Host: app.example.com
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials
&scope=scim
&client_assertion_type=urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer
&client_assertion=eyJhbGciOiJFUzI1NiIsImtpZCI6IjE2In0.eyJpc3Mi...
```

The SCIM client then sends `Authorization: Bearer <access_token>` on every SCIM request.

## Multi-tenancy (RFC 7644 §6)

- **Optional.** Multi-tenancy is OPTIONAL, and SCIM defines no tenancy scheme. The service provider MAY infer the tenant from the client's authentication (§6.1).
- **Explicit tenants.** For explicit tenant selection, use a URL prefix (`/Tenants/{tenant_id}/v2/Users`), a sub-domain, or a header. Access controls should prevent unintended cross-tenant use (§6.1).
- **Identifiers.** `id` does not have to be unique across tenants. `externalId` only has to be unique within the tenant (§6.2).

## Transport and HTTP (RFC 7644 §7.1, §7.2)

- **Userinfo.** A SCIM client MUST NOT generate the userinfo component in an `http` URI.
- **TLS.** TLS is MUST for clients and service providers. The service provider MUST support TLS 1.2. The client MUST check the server identity per RFC 6125.

## Privacy (RFC 7644 §7.5, RFC 7643 §9.3, RFC 7642 §4)

- **Personal data.** All SCIM attributes are treated as sensitive personal data. Share only what is needed, and consider regional regulation when data crosses jurisdictions.
- **Filters in URLs.** Clients SHOULD avoid personal data in GET filter URLs and use POST `/.search`. Servers SHOULD answer such GETs with `403`, optionally with `scimType` `sensitive` (RFC 7644 §7.5.2).

## Credentials and storage (RFC 7644 §7.7, RFC 7643 §9.2)

- **Passwords.** Password values MUST NOT be stored in cleartext. Follow RFC 6819 §5.1.4.1: validate all inputs against injection, hash or encrypt stored credentials, and prefer asymmetric credentials over passwords.
- **Online attacks.** Apply countermeasures: password policy, lockout after failed attempts, tar pits, CAPTCHAs.
- **Access model.** Service providers SHOULD define an access control model that separates client applications and user self-service rights.
