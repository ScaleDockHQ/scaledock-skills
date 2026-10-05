# Fields

Section numbers refer to RFC 9116 unless another document is named. The registry is the IANA security.txt Fields registry, last updated 2026-03-07.

## General rules

- A field is a name, a colon, a single space and a value: `Contact: mailto:security@example.com` (§ 2, § 4 `fs SP`).
- The name follows RFC 5322 `field-name` and is case-insensitive; the value follows RFC 5322 `unstructured` (§ 2).
- A field MUST have both a name and a value, each field MUST be on its own line, and values MUST NOT be chained into one field unless the field definition allows it (§ 2).
- A field MAY appear several times unless its definition says otherwise (§ 2). The registry's "Multiple Appearances" column records which fields are limited.
- Every field except Contact and Expires is optional (§ 2.5, § 2.4).
- Field order does not matter, except that the order of Contact fields is their priority (§ 4, with erratum 6946 correcting the cross-reference to § 2.5.3).
- Blank lines and comment lines starting with `#` are allowed (§ 2, § 2.1).
- URIs may use percent-encoding (§ 2, RFC 3986 § 2.1).
- When a field's value is a web URI, it MUST begin with `https://` (§ 2.5.1 to § 2.5.7).
- Resources referenced in the file MUST NOT point into `/.well-known/` unless the suffix is registered with IANA (§ 6).

## Registered fields

| Field               | Required          | Repeats | Value                           | Defined in                 |
| ------------------- | ----------------- | ------- | ------------------------------- | -------------------------- |
| Contact             | yes, at least one | yes     | URI                             | § 2.5.3                    |
| Expires             | yes, exactly one  | no      | RFC 3339 `date-time`            | § 2.5.5                    |
| Encryption          | no                | yes     | URI of a key                    | § 2.5.4                    |
| Acknowledgments     | no                | yes     | URI                             | § 2.5.1                    |
| Preferred-Languages | no                | no      | comma-separated language tags   | § 2.5.8                    |
| Canonical           | no                | yes     | URI                             | § 2.5.2                    |
| Policy              | no                | yes     | URI                             | § 2.5.7                    |
| Hiring              | no                | yes     | URI                             | § 2.5.6                    |
| CSAF                | no                | yes     | URI of `provider-metadata.json` | registry; CSAF 2.0 § 7.1.8 |
| Bug-Bounty          | no                | no      | `True` or `False`               | registry                   |

All ten are status "current" in the registry.

### Contact (§ 2.5.3)

How researchers report vulnerabilities: an email address, a phone number, or a web page with contact information.

- MUST always be present.
- The value MUST be a URI (RFC 3986 § 3), so email uses `mailto:` (RFC 6068) and phone uses `tel:` (RFC 3966). Web URIs MUST begin with `https://`.
- List them in order of preference (SHOULD): the first is the preferred method.
- Security mailboxes should follow RFC 2142 § 4 (`security@`).
- When the value is an email address, encryption is RECOMMENDED (see Encryption).

```text
Contact: mailto:security@example.com
Contact: mailto:security%2Buri%2Bencoded@example.com
Contact: tel:+1-201-555-0123
Contact: https://example.com/security-contact.html
```

### Expires (§ 2.5.5)

The date and time after which the file's data is stale and should not be used.

- MUST be present and MUST NOT appear more than once.
- Formatted per RFC 3339 (`date-time` from RFC 3339 § 5.6).
- RECOMMENDED to be less than a year in the future.
- RFC 3339 § 5.6 allows a lower-case `t` and `z` but says generators SHOULD use upper case. The RFC 9116 example uses `z`; erratum 7264 (Reported) proposes `Z`. Write `Z`; accept both.
- Not having a file may be preferable to having stale information (§ 5.3), so renew it before the date or take it down.

```text
Expires: 2027-06-30T23:59:59Z
```

### Encryption (§ 2.5.4)

A key researchers should use for encrypted communication.

- Keys MUST NOT appear in the field; the value MUST be a URI pointing to where the key can be retrieved. Web URIs MUST begin with `https://`.
- Researchers verify the key themselves, and must not assume it is the key that signed the file (§ 2.5.4, § 2.3).

```text
Encryption: https://example.com/pgp-key.txt
Encryption: dns:5d2d37ab76d47d36._openpgpkey.example.com?type=OPENPGPKEY
Encryption: openpgp4fpr:5f2de5521c63a801ab59ccb603d49de44b29100f
```

### Acknowledgments (§ 2.5.1)

A page that recognizes researchers for their reports. Limit the vulnerability detail on that page to prevent future attacks. Web URIs MUST begin with `https://`. Note the spelling: `Acknowledgments`, not `Acknowledgements`.

```text
Acknowledgments: https://example.com/hall-of-fame.html
```

### Preferred-Languages (§ 2.5.8)

Natural languages preferred for reports.

- MUST NOT appear more than once; if present, at least one value MUST be listed.
- Values are RFC 5646 language tags, separated by commas (`lang-values` in § 4 allows whitespace around commas).
- The order is not a priority; all listed languages are equal.
- When absent, researchers may assume English (RFC 2277 § 4.5).

```text
Preferred-Languages: en, es, fr
```

### Canonical (§ 2.5.2)

The canonical URIs where the file is located, usually `https://example.com/.well-known/security.txt`. Web URIs MUST begin with `https://`.

- A file applies to the URI it was retrieved from; Canonical MUST NOT be read as making the file apply to every listed URI. Researchers SHOULD use another trust mechanism, such as the signature, to decide that a listed URI applies.
- If Canonical is present and the retrieval URI is not listed, the contents SHOULD NOT be trusted.
- RECOMMENDED whenever the file is signed, so the signature covers the location (§ 2.3).

```text
Canonical: https://www.example.com/.well-known/security.txt
Canonical: https://someserver.example.com/.well-known/security.txt
```

### Policy (§ 2.5.7)

A link to the vulnerability disclosure policy. Web URIs MUST begin with `https://`. Organizations SHOULD use it for the scope and details of their disclosure process (§ 3.1), and it is where any permission to test may be stated (§ 5.5). Other details of vulnerability disclosure are outside RFC 9116's scope; it points readers to ISO/IEC 29147 and the CERT Guide to Coordinated Vulnerability Disclosure (§ 1.1).

```text
Policy: https://example.com/disclosure-policy.html
```

### Hiring (§ 2.5.6)

A link to the vendor's security-related job positions. Web URIs MUST begin with `https://`.

```text
Hiring: https://example.com/jobs.html
```

### CSAF (registry; CSAF 2.0 § 7.1.8)

A link to the `provider-metadata.json` of a Common Security Advisory Framework provider. Registered 2023-02-15 with OASIS Open as change controller; it may appear more than once.

CSAF 2.0 requirement 8 adds, for CSAF providers:

- There MUST be at least one `CSAF` field pointing to the `provider-metadata.json`; web URIs MUST begin with `https://`.
- Several `CSAF` fields are possible (for example after a merger), but this SHOULD NOT be done and should be removed as soon as possible.
- If one of the URLs is the well-known `/.well-known/csaf/provider-metadata.json` (requirement 9), it MUST be the first `CSAF` entry.

```text
CSAF: https://www.example.com/.well-known/csaf/provider-metadata.json
```

### Bug-Bounty (registry)

Registered 2026-03-07, IETF change controller, at most once. `Bug-Bounty: True` says the project or company may financially reward reporters through a bug bounty program (as per CERT Guide to Coordinated Vulnerability Disclosure § 3.5.5); `Bug-Bounty: False` says no financial reward can be offered. securitytxt.org does not yet list it in its generator. Consumers that do not support it ignore it (§ 2.4).

```text
Bug-Bounty: False
```

## Extension fields

- Fields are added only through the IANA registry, by Expert Review (§ 2.4, § 6.2).
- Any registered field MUST be considered optional (§ 2.4, § 6.2).
- Researchers MUST ignore fields they do not explicitly support (§ 2.4).
- In the ABNF an unknown field matches `ext-field = field-name fs SP unstructured` (§ 4).
- Registrations record the name, description, whether it can repeat, a status (`current`, `deprecated` or `historic`), the change controller and the defining document (§ 6.2).
- Do not invent unregistered fields; a field proposed in a draft but not registered (for example `Product-Security`) is not part of the format yet.

## Complete example

Unsigned, from § 2.6 with a current Expires:

```text
# Our security address
Contact: mailto:security@example.com

# Our OpenPGP key
Encryption: https://example.com/pgp-key.txt

# Our security policy
Policy: https://example.com/security-policy.html

# Our security acknowledgments page
Acknowledgments: https://example.com/hall-of-fame.html

Preferred-Languages: en, nl
Canonical: https://example.com/.well-known/security.txt
Expires: 2027-06-30T23:59:59Z
```

For the signed form, see [`serving-and-signing.md`](serving-and-signing.md).

## Common mistakes

- No Expires, two Expires lines, or an RFC 5322 date such as `Thu, 31 Dec 2021 18:37:07 -0800` (draft-era syntax).
- A bare email address or phone number in Contact instead of a `mailto:` or `tel:` URI.
- `http://` URIs in any field.
- The key itself pasted into Encryption.
- Several values chained on one Contact line.
- A Canonical list that omits the host the file is actually served from.
- `Acknowledgements` spelled with an extra `e`, which parsers treat as an unknown field and ignore.
