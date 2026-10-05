# Set-Cookie, Cookie and the attributes

Read this when writing a `Set-Cookie` header, choosing an attribute, deleting a cookie, or parsing a `Cookie` header. Section numbers without a prefix are draft-ietf-httpbis-rfc6265bis-22; "6265 §" marks RFC 6265.

## Set-Cookie grammar (server profile)

Servers MUST NOT send `Set-Cookie` fields that deviate from this grammar (§ 4.1.1). RFC 6265 § 4.1.1 says SHOULD NOT, with the same productions apart from optional whitespace and `SameSite`.

```text
set-cookie-string = BWS cookie-pair *( BWS ";" OWS cookie-av )
cookie-pair       = cookie-name BWS "=" BWS cookie-value
cookie-name       = token
cookie-value      = *cookie-octet / ( DQUOTE *cookie-octet DQUOTE )
cookie-octet      = %x21 / %x23-2B / %x2D-3A / %x3C-5B / %x5D-7E
cookie-av         = expires-av / max-age-av / domain-av / path-av /
                    secure-av / httponly-av / samesite-av / extension-av
expires-av        = "Expires" BWS "=" BWS sane-cookie-date  ; IMF-fixdate
max-age-av        = "Max-Age" BWS "=" BWS non-zero-digit *DIGIT
domain-av         = "Domain" BWS "=" BWS domain-value
path-av           = "Path" BWS "=" BWS path-value
secure-av         = "Secure"
httponly-av       = "HttpOnly"
samesite-av       = "SameSite" BWS "=" BWS samesite-value
samesite-value    = "Strict" / "Lax" / "None"
extension-av      = 1*av-octet          ; any CHAR except CTLs or ";"
```

Rules next to the grammar (§ 4.1.1 unless noted):

- No nameless cookies: an empty `cookie-name` serializes unpredictably.
- The value has no defined semantics. Encode arbitrary data, for example with Base64.
- Double quotes around a value are not stripped; they are part of the value and come back in `Cookie`.
- No two attributes with the same name in one string, and no two `Set-Cookie` fields with the same `cookie-name` in one response.
- An `extension-av` has no leading or trailing whitespace.
- `domain-value` is ASCII, such as an A-label for an internationalized name.
- Attribute names are case-insensitive (`httponly` works), but cookie names are case-sensitive: `SID` and `sid` are two cookies (§ 3.1).
- Use four-digit years. Some user agents mishandle dates after 2038.
- Concurrent responses that set the same cookie race, with unpredictable results.
- Never fold several `Set-Cookie` fields into one: `Set-Cookie: a=b;path=/c,d=e` could be two cookies or one with path `/c,d=e` (§ 3). Origin servers and intermediaries MUST NOT combine them.

A server MAY send `Set-Cookie` with any response, and its presence does not stop caches from storing and reusing the response (§ 3). User agents may ignore `Set-Cookie` on 1xx responses, but process it on 4xx and 5xx (§ 5.3).

## The attributes

### Expires (§ 4.1.2.1, § 5.6.1)

- The latest date the cookie lives, as an `IMF-fixdate` such as `Wed, 09 Jun 2027 10:18:14 GMT`.
- Expiry runs on the user agent's clock: servers MUST NOT depend on eviction at an exact time on the server's clock.
- The user agent parses dates leniently (§ 5.1.1), ignores an unparsable one, and caps it at its lifetime limit (§ 5.5).

### Max-Age (§ 4.1.2.2, § 5.6.2)

- Seconds until expiry. It takes precedence over `Expires`.
- At the user agent, zero or a negative number expires the cookie at once; the server grammar requires a first digit of 1 to 9.
- Values above the lifetime limit (recommended 400 days, 34560000 seconds) are reduced to it (§ 5.5).
- Without `Expires` and `Max-Age`, the cookie is a session cookie, removed when "the current session is over" as the user agent defines it (§ 5.7).

### Domain (§ 4.1.2.3, § 5.6.3, § 5.7 steps 7 to 10)

- Omitted: the cookie is host-only and goes back only to the host that set it.
- `Domain=site.example`: sent to `site.example` and every subdomain. A leading dot is ignored.
- The user agent rejects a `Domain` that does not domain-match the request host (`bar.site.example` cannot be set from `foo.site.example`), and, if it uses a public suffix list, a `Domain` that is a public suffix such as `com` or `co.uk`, unless it equals the request host.
- Some old user agents treat a missing `Domain` as the current host and send the cookie to subdomains too.
- Any host under the domain can overwrite a `Domain` cookie (§ 8.6).

### Path (§ 4.1.2.4, § 5.1.4, § 5.6.4)

- The cookie is sent when the request path equals the cookie path or is below it at a `/` boundary.
- Omitted, or not starting with `/`: the default is the request path's "directory", up to but not including its right-most `/`. Set `Path=/` explicitly.
- Path is not a security boundary: any response on the host can set any `Path`, and scripts on other paths may read the cookie (§ 8.5, § 8.6).

### Secure (§ 4.1.2.5, § 5.7 steps 13 and 16)

- Sent only over a secure channel, typically HTTPS; the user agent decides what counts, and most treat `localhost` as trusted (§ 5.8.3).
- Under RFC 6265bis, a `Secure` cookie set over plain HTTP is ignored, and a plain HTTP response cannot set a non-`Secure` cookie that would shadow an existing `Secure` cookie with the same name and an overlapping domain and path.
- Under RFC 6265, `Secure` protects only confidentiality: an attacker on HTTP can overwrite it (6265 § 4.1.2.5).

### HttpOnly (§ 4.1.2.6, § 5.7 steps 14, 15 and 23)

- Hidden from non-HTTP APIs such as `document.cookie`. Independent of `Secure`.
- A non-HTTP API cannot create an `HttpOnly` cookie or overwrite one.

### SameSite (§ 4.1.2.7)

- `Strict`, `Lax` or `None`; any other or missing value gets the default enforcement, equivalent to `Lax`. See [`same-site-and-prefixes.md`](same-site-and-prefixes.md).
- `None` requires `Secure` (§ 5.7 step 19).

### Unknown attributes

User agents ignore an unrecognized attribute but keep the cookie (§ 4.1.2; 6265 § 4.1.2). New attributes are registered in the IANA "Cookie Attributes" registry on an RFC Required basis and match the `extension-av` syntax (§ 9.3).

## Examples

Session cookie for one host, the strongest scope (§ 4.1.3.2):

```http
Set-Cookie: __Host-SID=31d4d96e407aad42; Secure; HttpOnly; Path=/; SameSite=Lax
```

Preference shared with subdomains (§ 3.1):

```http
Set-Cookie: lang=en-US; Path=/; Domain=site.example; Secure; SameSite=Lax; Max-Age=2592000
```

Cookie for a cross-site embed or SSO flow (§ 8.8.3):

```http
Set-Cookie: __Secure-widget=abc; Secure; HttpOnly; Path=/; SameSite=None
```

## Deleting a cookie

Send the same name with the same `Path` and `Domain` and a past `Expires`; the deletion only succeeds if `Path` and `Domain` match the values used when the cookie was created (§ 3.1). The replacement matches on name, domain, host-only-flag and path (§ 5.7 step 23), so a host-only cookie and a `Domain` cookie with the same name are different cookies, and each needs its own deletion.

```http
Set-Cookie: lang=; Path=/; Domain=site.example; Expires=Sun, 06 Nov 1994 08:49:37 GMT
```

A `__Host-` or `__Secure-` cookie must still meet its prefix rules in the deletion, or the user agent ignores the deletion (§ 5.7 steps 20 and 21):

```http
Set-Cookie: __Host-SID=; Secure; Path=/; Expires=Sun, 06 Nov 1994 08:49:37 GMT
```

## The Cookie header

```text
cookie-string = cookie-pair *( ";" SP cookie-pair )
```

- Each pair is a name and value the user agent stored. No attributes are returned, so the server cannot tell expiry, domain, path, `Secure` or `HttpOnly` from `Cookie` (§ 4.2.2).
- Do not rely on the order, especially for two cookies with the same name set with different `Path` or `Domain` (§ 4.2.2). User agents should list longer paths first, then earlier creation times, but not all do (§ 5.8.3).
- Servers MUST tolerate several `Cookie` fields: HTTP/2 and HTTP/3 may split the header for compression. Process each one, or concatenate them, mindful of field size limits (§ 4.2.1, § 5.8.1). RFC 6265 required a single field (6265 § 5.4).
- A nameless cookie is serialized as its value only, without `=` (§ 5.8.3).
- Header size: many servers limit a field to 8192 octets by default. Avoid enough large cookies to exceed it, or requests fail (§ 4.2.1).

## APIs

String-based cookie APIs have caused interoperability problems. Prefer a semantic API, for example one that takes a date object rather than a date string (§ 6.2). Frameworks should support both the § 4 (server) and § 5 (user agent) requirements behind a compatibility toggle that defaults to § 4 (§ 3.2.2.1).
