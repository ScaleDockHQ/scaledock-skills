# Versions and upgrades

Read this when choosing a target version, reading code or documentation that cites an older cookie RFC, upgrading, or deciding how much of RFC 6265bis to adopt. Sources: RFC 6265, draft-ietf-httpbis-rfc6265bis-22 (its Appendix A lists the changes from RFC 6265), its datatracker entry, RFC 2965 and RFC 2109, listed in [Sources](../SKILL.md#sources).

## Version lines

| Id                   | Line        | Status  | Revision                                                  | Posture | Summary                                                                                                  |
| -------------------- | ----------- | ------- | --------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------- |
| `rfc6265bis-preview` | RFC 6265bis | preview | draft-ietf-httpbis-rfc6265bis-22 (1 December 2025)        | build   | Obsoletes RFC 6265 once published. In the RFC Editor queue. Adds SameSite, prefixes and stricter limits. |
| `rfc6265`            | RFC 6265    | current | RFC 6265, Proposed Standard (April 2011)                  |         | The published standard for `Set-Cookie` and `Cookie`. Obsoletes RFC 2965.                                |
| `rfc2965`            | RFC 2965    | legacy  | RFC 2965, Historic, obsoleted by RFC 6265 (October 2000)  |         | `Set-Cookie2`, `Cookie2` and `$Version="1"` cookies. Obsoletes RFC 2109.                                 |
| `rfc2109`            | RFC 2109    | legacy  | RFC 2109, Historic, obsoleted by RFC 2965 (February 1997) |         | `Set-Cookie` with `Version=1`, `Comment` and `$Version` in `Cookie`.                                     |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

As of 2026-10-05 the datatracker lists revision 22 as the latest, the IESG state as "RFC Ed Queue" (the RFC Editor state is "In Progress"), and no `became_rfc` relation, so no RFC number exists yet. The RFC Editor lists RFC 6265 with no updating or obsoleting RFC.

## Which version to use

- Target RFC 6265 for interoperability, and write cookies to the RFC 6265bis server profile (§ 4 of the draft). That profile is stricter than RFC 6265 in a few places (MUST NOT where RFC 6265 said SHOULD NOT) and adds only things RFC 6265 user agents ignore safely, because "user agents ignore unrecognized cookie attributes (but not the entire cookie)" (6265 § 4.1.2).
- Use RFC 6265bis behaviour as the model of what browsers do with your cookies: SameSite enforcement, Lax-by-default, prefix checks, the 400-day cap and the 4096-octet limit. The draft writes § 5 for cookie consumers such as web browsers (§ 3.2.2).
- Treat RFC 2965 and RFC 2109 code as input to an upgrade. RFC 6265 registers `Cookie2` and `Set-Cookie2` as obsoleted (6265 § 9.3, § 9.4).

## What changed

### RFC 6265bis (draft-22), from its Appendix A

- Adds the same-site concept and the `SameSite` attribute (§ 5.2, § 4.1.2.7).
- Adds the `__Secure-` and `__Host-` prefixes, and forbids nameless cookies whose value mimics a prefix (§ 4.1.3, § 5.7 step 22).
- Non-secure origins can no longer set `Secure` cookies or overwrite them (§ 5.7 steps 13 and 16).
- Limits name plus value to 4096 octets and attribute values to 1024 octets (§ 5.6, § 5.7).
- Caps `Expires` and `Max-Age` at the user agent's limit, recommended 400 days (§ 5.5, § 5.6.1, § 5.6.2).
- Adds the host-only-flag to a cookie's identity: name, domain, host-only-flag and path (§ 5.7 step 23).
- Treats potentially trustworthy origins, such as `localhost`, as secure (§ 5.7, § 5.8.3).
- Syntax fixes: `Set-Cookie: token` creates a cookie with an empty name; cookies with neither name nor value are rejected; control characters are handled explicitly; an empty `Domain` and non-ASCII `Domain` are handled; the header is not percent-decoded (§ 5.6, § 5.7).
- Removes the single `Cookie` header requirement: HTTP/2 and HTTP/3 may split it, and servers MUST tolerate several (§ 5.8.1, § 4.2.1).
- Turns several server SHOULD NOTs into MUST NOTs: folding `Set-Cookie`, duplicate attributes, repeated names in a response (§ 3, § 4.1.1).
- Adds a "Cookie Attributes" IANA registry (§ 9.3).

### RFC 6265, compared with RFC 2965

- Returns to the `Set-Cookie` and `Cookie` header fields as deployed, and obsoletes RFC 2965; `Set-Cookie2` and `Cookie2` are registered as obsoleted (6265 § 9).
- Defines `Expires`, `Max-Age`, `Domain`, `Path`, `Secure` and `HttpOnly` (6265 § 4.1.2). `Version`, `Comment`, `CommentURL`, `Discard` and `Port` are gone; an unknown attribute is ignored (6265 § 4.1.2).
- The `Cookie` header carries only `name=value` pairs, without `$Version`, `$Path` or `$Domain` (6265 § 4.2).

### RFC 2965, compared with RFC 2109

- Moves the new-style cookie to a `Set-Cookie2` response header and adds the `Cookie2` request header that advertises the understood version (RFC 2965 § 3.2.2, § 3.3.5).
- Adds `CommentURL`, `Discard` and `Port` (RFC 2965 § 3.2.2).

## Upgrading

### RFC 2109 or RFC 2965 to RFC 6265

1. Change the version marker: stop sending `Set-Cookie2` and `Version=1`; send `Set-Cookie`. Stop expecting `Cookie2` or `$Version` in requests.
2. Replace removed attributes:
   - `Max-Age` stays; add an `Expires` in `IMF-fixdate` only if old user agents need it, since `Max-Age` wins when both are present (6265 § 4.1.2.2).
   - `Discard` becomes a session cookie: omit both `Expires` and `Max-Age` (6265 § 4.1.2.2).
   - Drop `Comment`, `CommentURL` and `Port`. RFC 6265 has no port scoping (6265 § 8.5).
   - Drop quoted values that contain characters outside `cookie-octet`; encode the data instead (6265 § 4.1.1). Note that double quotes around a value are kept as part of it (§ 4.1.1).
   - `Domain`: RFC 2965 adds a leading dot itself (RFC 2965 § 3.2.2); in RFC 6265 a leading dot is ignored and `Domain=site.example` already includes subdomains (6265 § 4.1.2.3). Send `Domain` without the dot, or omit it for a host-only cookie.
3. Replace the `Cookie` parser: split on `;` and read `name=value` pairs. Drop `$Version`, `$Path`, `$Domain` and `$Port` handling and the comma separator (RFC 2965 § 3.3.4).
4. Validate against the target: each header matches the 6265 § 4.1.1 grammar, one cookie per field.
5. Keep behaviour unchanged: compare which hosts and paths receive each cookie before and after. A `Port`-scoped cookie now reaches every port.

### RFC 6265 to the RFC 6265bis profile

1. Change the version marker: none on the wire. Record in the code or documentation that cookies follow the draft-22 server profile.
2. Replace removed or renamed behaviour:
   - Add an explicit `SameSite` to every cookie. A cookie without one gets the user agent default, equivalent to `Lax` (§ 4.1.2.7), or "Lax-allowing-unsafe" for up to about 2 minutes after creation in some user agents (§ 5.6.7.2).
   - Add `Secure` to every `SameSite=None` cookie, or it is rejected (§ 5.7 step 19).
   - Rename session cookies to `__Host-` (with `Secure; Path=/`, no `Domain`) or `__Secure-` (§ 4.1.3). A rename is a new cookie: set the new one, read both during the transition, then delete the old one with its original `Path` and `Domain`.
   - Cap requested lifetimes at 400 days (§ 5.5), and keep name plus value under 4096 octets (§ 5.6).
   - Stop setting any cookie over plain HTTP that shares a name and scope with a `Secure` one; the user agent ignores it (§ 5.7 step 16).
   - Accept several `Cookie` header fields per request (§ 4.2.1).
   - Remove any `Set-Cookie` folding, duplicate attributes and repeated names in one response (§ 3, § 4.1.1).
3. Validate against the target: run the Verify list in `SKILL.md`, and in a current browser confirm each cookie is stored and sent in the cross-site cases the inventory needs.
4. Keep behaviour unchanged: a flow that relied on implicit cross-site sending (a cross-site `POST` login callback, an iframe) now needs `SameSite=None; Secure`, or a redesign; check each one before release.

### RFC 2109 or RFC 2965 to the RFC 6265bis profile

Apply the two checklists above in order, then validate against the Verify list in `SKILL.md`.

## Preview: RFC 6265bis

Posture: **build**. draft-ietf-httpbis-rfc6265bis-22 (1 December 2025) is approved and in the RFC Editor queue. Browsers already implement most of it, and its server profile is safe under RFC 6265, so emit `SameSite`, the prefixes and the stricter syntax now. Behind that, do not depend on anything a pure RFC 6265 user agent would treat differently for security: an older user agent ignores `SameSite` and does not enforce prefixes (6265 § 4.1.2), so keep CSRF tokens and server-side checks (§ 8.8.1).

The draft does not define a `Partitioned` attribute or partitioned cookies; § 7.1 only says some user agents "partition cookies based upon the first-party context". This skill does not cover them.

When the draft is published: make the new RFC current, move RFC 6265 to legacy, rename the `rfc6265bis-preview` id to the RFC number, re-check every section number against the RFC text, and turn the "RFC 6265 to the RFC 6265bis profile" checklist into the upgrade from RFC 6265.
