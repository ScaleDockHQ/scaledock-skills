# Serving and signing

Section numbers refer to RFC 9116 unless another document is named. RFC 9116 cites RFC 7230 and RFC 7231 for HTTP; RFC 9110 obsoletes both, and the matching RFC 9110 sections are given next to them. RFC 9116 cites RFC 4880 for OpenPGP; RFC 9580 obsoletes it.

## Location (§ 3)

- Web services MUST place the file under `/.well-known/`: `https://example.com/.well-known/security.txt` (RFC 8615). The `security.txt` suffix is registered in the Well-Known URIs registry with status permanent (§ 6.1).
- For legacy compatibility, a file might also sit at the top-level path `/security.txt`, or that path can redirect to the `/.well-known/` file (RFC 7231 § 6.4, now RFC 9110 § 15.4).
- If files exist in both places, the one under `/.well-known/` MUST be used. Prefer a redirect over a second copy, so the two cannot drift apart.

## Transport and media type (§ 3, § 4, § 5.7)

- The file MUST be accessed over HTTP 1.0 or later, using the `https` scheme (RFC 7230 § 2.7.2, now RFC 9110 § 4.2.2).
- It MUST have `Content-Type: text/plain` with the charset parameter set to `utf-8` (RFC 2046 § 4.1.3), and it MUST be UTF-8 in Net-Unicode form (RFC 5198) (§ 4).
- Implementors MUST use HTTPS to serve the file and to retrieve any web URI it references, except where the RFC says otherwise (§ 5.7).
- Retrieving the file or the resources it names may involve redirects; researchers analyse them before trusting the result (§ 3, § 5.2). Keep redirects on hosts the organization controls.

A correct response:

```http
HTTP/1.1 200 OK
Content-Type: text/plain; charset=utf-8

Contact: mailto:security@example.com
Expires: 2027-06-30T23:59:59Z
```

When a file cannot be served over HTTPS (for example on localhost) or has an invalid certificate, the RFC recommends extra human validation, because the content may have been altered in transit (§ 5.7).

## Scope (§ 3.1)

- A file MUST apply only to the domain or IP address in the URI used to retrieve it, not to its subdomains or parent domains. `https://example.com/.well-known/security.txt` covers `example.com` only; `subdomain.example.com` needs its own file.
- IP addresses are valid hosts: `https://192.0.2.0/.well-known/security.txt`, `https://[2001:db8:8:4::2]/.well-known/security.txt`.
- A file MAY also apply to the products and services of the organization that publishes it.
- Organizations SHOULD use `Policy` to describe the scope and details of their disclosure process.
- The format is meant for vulnerability response, not incident response (§ 1.1, § 3.1). Using it for incident response brings the extra risks in § 5.1.

Serving one file from many hosts: serve the same content on each host and list every host's URI in `Canonical` (§ 2.5.2). A redirect from `sub.example.com/.well-known/security.txt` to `example.com` is still a redirect that researchers will inspect (§ 5.2).

## Multi-tenant hosts (§ 5.6)

Where users can create pages on a shared host, a user might take over the file's location. Reserve both `/security.txt` and `/.well-known/security.txt` at the root so no third party can create them.

## Signing (§ 2.3, § 4, § 5.1, § 5.7)

- Signing the file with an OpenPGP cleartext signature (RFC 4880 § 7, now RFC 9580 § 7) is RECOMMENDED.
- When signing, `Canonical` is also RECOMMENDED, so the signature authenticates the file's location (§ 2.3).
- Researchers are responsible for deciding whether they trust the signing key (§ 2.3). The Encryption key need not be the signing key (§ 2.5.4).

The signed form, from § 2.7:

```text
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA256

# Canonical URI
Canonical: https://example.com/.well-known/security.txt

# Our security address
Contact: mailto:security@example.com

# Our OpenPGP key
Encryption: https://example.com/pgp-key.txt

# Our security policy
Policy: https://example.com/security-policy.html

# Our security acknowledgments page
Acknowledgments: https://example.com/hall-of-fame.html

Expires: 2021-12-31T18:37:07z
-----BEGIN PGP SIGNATURE-----
Version: GnuPG v2.2

[signature]
-----END PGP SIGNATURE-----
```

Rules from the § 4 `signed` production:

- It starts with `-----BEGIN PGP SIGNED MESSAGE-----`, then **one or more** `Hash:` headers, an empty line, the dash-escaped cleartext, and the armored signature.
- Lines that start with `-` in the cleartext MUST be dash-escaped with `- `; lines starting with `From ` SHOULD be (§ 4 `line-dash`, `line-from`; RFC 9580 § 7.2).
- The cleartext itself must still be a valid unsigned file: Contact, one Expires, and so on.

How RFC 9580 interacts with the § 4 grammar:

- RFC 9580 § 6.2.2.3 deprecates the `Hash` armor header: it SHOULD NOT be emitted unless the message carries a version 4 signature with a SHA-2 digest and might be verified by a legacy implementation. RFC 9116's grammar requires at least one `Hash:` header (§ 4 `1*(hash-header)`). To produce a file that both validates against RFC 9116 and follows RFC 9580, sign with a version 4 key and a SHA-2 digest and keep the `Hash:` header. A file without `Hash:` will verify in RFC 9580 tools but fails strict RFC 9116 parsers.
- Verifiers MUST ignore a well-formed `Hash` header and decline any signature when another armor header appears before the empty line (RFC 9580 § 6.2.2.3, § 7.1).
- The signature is computed over the text with CRLF line endings, and trailing spaces and tabs on each line are removed before signing and verifying (RFC 9580 § 7.1). Do not rely on trailing whitespace; the § 4 `eol` rule allows it anyway.

Signing workflow:

1. Write the final unsigned file, including Canonical lines for every serving URI and the new Expires.
2. Make a cleartext signature with the organization's key, using a SHA-2 digest, and check the output still has the `Hash:` header.
3. Verify the signature, then parse the signed file against the § 4 grammar.
4. Publish the key through a channel researchers can check independently; the RFC leaves key validity out of scope (§ 5.7).
5. Re-sign every time the file changes, including each Expires renewal.

## Keeping the file current (§ 5.1, § 5.3)

- Organizations must use Expires to say when the data stops being valid (§ 5.3).
- Keep the file and everything it references (pages, mailboxes, phone numbers, keys) current, accessible, controlled by the organization and secure (§ 5.3).
- Monitor the file and the resources it references to detect tampering (§ 5.1).
- If you cannot keep it current, removing it may be better than leaving stale data (§ 5.3).
