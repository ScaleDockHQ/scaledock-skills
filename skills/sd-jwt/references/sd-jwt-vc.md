# SD-JWT VC (draft-ietf-oauth-sd-jwt-vc-19)

Read this when issuing, holding or verifying SD-JWT-based Verifiable Digital Credentials. The line is a WG draft with posture **build**: implement it, keep the revision pinned, and re-check Datatracker before release. Section numbers are draft-19 unless stated. SD-JWT VC is a profile of RFC 9901, so every rule in the other references applies too (§ 2.4, § 7, § 8).

## Format

- Media type `application/dc+sd-jwt`, where `dc` means "digital credential" (§ 2.1, § 9.2.1).
- The SD-JWT compact format of RFC 9901 § 4 (§ 2.2). The JWS JSON serialization is not precluded but not specified (§ 2.2).
- The Issuer MUST include `typ: dc+sd-jwt` in the Issuer-signed JWT header (§ 2.2.1).
- Selective disclosure is optional. Without selectively disclosable claims the credential MUST NOT contain `_sd` and MUST NOT have Disclosures (§ 2.2.2.5).

## Claims

| Claim           | Status                                  | May be disclosable | Rule                                                                                             |
| --------------- | --------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------ |
| `vct`           | REQUIRED                                | no                 | Case-sensitive string, a Collision-Resistant Name (RFC 7515 § 2) (§ 2.2.2.1).                    |
| `vct#integrity` | OPTIONAL                                | no                 | Integrity metadata for the Type Metadata document (§ 6).                                         |
| `aka_vcts`      | OPTIONAL                                | no                 | Non-empty array of Collision-Resistant Names; MUST NOT contain the `vct` value (§ 2.2.2.2).      |
| `iss`           | OPTIONAL                                | no                 | The Issuer, when not conveyed otherwise (for example the `x5c` end-entity subject) (§ 2.2.2.3).  |
| `nbf`, `exp`    | OPTIONAL                                | no                 | Validity window (§ 2.2.2.3).                                                                     |
| `cnf`           | REQUIRED for Key Binding, else OPTIONAL | no                 | RFC 7800 confirmation; a JWK is RECOMMENDED; the KB-JWT MUST be secured by this key (§ 2.2.2.3). |
| `status`        | OPTIONAL                                | no                 | Token Status List reference; with `status_list` the Status List Token MUST be a JWT (§ 2.2.2.3). |
| `sub`, `iat`    | OPTIONAL                                | yes                | `sub` need not be bound to `cnf` (§ 2.2.2.3).                                                    |

The non-disclosable claims, including their sub-claims, MUST NOT be in Disclosures (§ 2.2.2.3). Public and private claims MAY be used; binary data SHOULD be a `data:` URI unless a text encoding is already established (§ 2.2.2.4).

Type versioning: a change that alters meaning, adds required claims or removes required elements is generally a new type with a new `vct` value (§ 2.2.2.1). `aka_vcts` lets a derived type also match a general one, but it is only as trustworthy as the Issuer (§ 2.2.2.2).

## Verification

1. Process and verify per RFC 9901 § 7 (§ 2.4).
2. Satisfy RFC 9901 § 7.1 step 2.c (Issuer and key) with a key discovery and validation mechanism permitted for this Issuer by policy (§ 2.4, § 2.5). If none validates the key for the Issuer, reject (§ 2.5).
3. If Key Binding is required, verify the KB-JWT per RFC 9901 § 7.3 using `cnf` (§ 2.4).
4. Optionally process Type Metadata (below); its rules can require rejection (§ 2.4, § 5.7).
5. If `status` is present, it SHOULD be checked; Verifier policy decides acceptance (§ 2.4).

### Issuer key discovery (§ 2.5)

- **JWT VC Issuer Metadata**, when `iss` is an HTTPS URI (§ 4): GET `/.well-known/jwt-vc-issuer` inserted between host and path, with any trailing `/` of the path removed first (§ 4, § 4.1). `iss=https://example.com/tenant/1234` gives `GET /.well-known/jwt-vc-issuer/tenant/1234`. `iss` MUST be an HTTPS URL without query or fragment (§ 4).
  - The response is `application/json` with `issuer` (REQUIRED, identical to `iss`) and exactly one of `jwks_uri` or `jwks` (§ 4.2). A `kid` header in the Issuer-signed JWT is RECOMMENDED (§ 4.2).
  - If `issuer` differs from `iss`, the response MUST NOT be used (§ 4.3).
- **Inline X.509**: when the protected header has `x5c`, use the end-entity certificate's key and validate the chain; the Issuer is the certificate subject (§ 2.5).
- Ecosystems may add or override mechanisms, but an attacker MUST NOT be able to influence which mechanism is used for a given `iss` (§ 2.5, § 7.3).

## Retrieving documents (§ 3, § 7.1)

Applies to issuer metadata, `jwks_uri`, Type Metadata (`vct`, `extends`) and rendering resources:

- HTTP GET; HTTPS only (rendering `uri` values MAY be `data:` URIs) (§ 3).
- Never use the content of a 4xx or 5xx response as the document (§ 3).
- Limit redirects, never follow one to a non-HTTPS URL, and validate every redirect target (§ 3).
- Bound time and size, and validate the content format before processing (§ 3).
- Treat every URL as untrusted: before each request, reject internal targets, including non-globally-reachable addresses in the RFC 6890 registries and internal host names, and check what DNS names resolve to (§ 7.1).
- Caching follows RFC 9111 unless integrity metadata allows indefinite caching (§ 3, § 5.3.4). Publishers SHOULD send an explicit freshness lifetime, `X-Content-Type-Options: nosniff` and a restrictive `Content-Security-Policy` (§ 3, § 7.2).

## Type Metadata (§ 5)

A JSON object with `vct` (REQUIRED), optional `name`, `description`, `extends` (with optional `extends#integrity`), `display` and `claims`; unknown properties MUST be ignored (§ 5.2).

- Retrieval: from the HTTPS `vct` URL at the Consumer's discretion, from a trusted registry, by an ecosystem-defined method, or from a cache (§ 5.3). The `vct` in the credential MUST equal the `vct` in the reference that was followed (§ 5.3).
- `extends`: retrieve and process the parent first (§ 5.4). Circular `extends` chains MUST be detected and the credential rejected (§ 7.4).
- Display (§ 5.5): one object per locale with `locale` and `name` (REQUIRED), optional `description` and `rendering`. Rendering methods: `simple` (`logo`, `background_image`, `background_color`, `text_color`) and `svg_templates` (§ 5.5.1). A child type's `display` replaces the parent's (§ 5.5.2).
- Claim metadata (§ 5.6): `path` (REQUIRED, non-empty array of strings, `null` for all array elements, or non-negative integers), `display` (`locale`, `label`), `mandatory` (default false), `sd` (`always`, `allowed` (default), `never`), `svg_id` (unique, alphanumerics and `_`, not starting with a digit).
- Path processing (§ 5.6.1.2): a string selects a key, `null` selects all elements, an integer selects an index; selecting into a non-object or non-array is an error; missing keys or indices drop out; an empty selection is the empty set. Paths address the credential as if everything were disclosed.
- Extending claim metadata (§ 5.6.5): child properties for the same `path` override per property, never merged; `sd` may only change from `allowed` to `always` or `never`; `mandatory` may only change from false to true (§ 5.6.5.1).
- Processing (§ 5.7): optional unless policy or ecosystem rules require it. If processed, process fully, including parents, before use. Claim metadata validation fails, and the credential MUST be rejected, when a path errors, a mandatory claim is shown to be missing, or a claim's selective disclosability contradicts `sd` (§ 5.6, § 5.7). A Verifier MUST NOT treat a withheld disclosable claim as a missing mandatory claim (§ 5.6). If processing is required and the metadata cannot be retrieved or processed, reject (§ 5.7).

### Integrity (§ 6)

`vct#integrity`, `extends#integrity` and `uri#integrity` hold W3C SRI "integrity metadata" strings, for example `sha256-...` in standard base64. Hash the retrieved octets with the named algorithm, compare with the decoded digest; with several expressions, use the strongest supported algorithm and accept a match on any of its values. On mismatch, or no supported algorithm, reject the document. Do not make the result depend on CORS (§ 6).

### SVG templates (§ 5.5.1.2.2, § 7.10)

Replace `{{svg_id}}` placeholders only in text content, escaping at least `&`, `<`, `>`, `"` and `'`. An unknown `svg_id` SHOULD stop rendering; an absent claim becomes an empty or "absent" string. Never execute code in the SVG; sandbox it if that cannot be guaranteed; block external references that could track the user.

## Trust and privacy

- Extending or naming a known type, or listing it in `aka_vcts`, gives no authority to issue it. Verify the Issuer's authorization independently (§ 7.7).
- Type Metadata is only as trustworthy as its Publisher; treat unaccredited Publishers with reduced trust (§ 7.8).
- Escape all displayed text and guard against layout distortion (§ 7.6); treat `data:` URIs as untrusted (§ 7.9).
- `vct` and `aka_vcts` are always shown to the Verifier; choose minimal values (§ 8.2).
- Issuer phone-home: Holder-specific `iss` values and remote `cnf` key references (`x5u`, `jku`, URL `kid`) enable tracking. Verifiers pin Issuer identifiers; only confirmation methods without remote retrieval SHOULD be supported (§ 8.3).
- Prefer cached or privacy-preserving retrieval of Type Metadata and rendering resources (§ 7.5, § 8.4).
