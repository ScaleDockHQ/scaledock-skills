# Distribution

Read this when publishing CSAF documents, running a lister or aggregator, or retrieving documents from other issuers. Section numbers are CSAF 2.0 (OASIS Standard) unless marked 2.1. The `provider-metadata.json` schema is `https://docs.oasis-open.org/csaf/csaf/v2.0/provider_json_schema.json`; the `aggregator.json` schema is the Errata 01 `https://docs.oasis-open.org/csaf/csaf/v2.0/aggregator_json_schema.json`.

## Requirements (§7.1)

Requirements are numbered for reference; roles pick which ones apply (§7.1).

| #   | Requirement                  | Rule                                                                                                                                                                                                                                               |
| --- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Valid CSAF document          | Conformance clause 1.                                                                                                                                                                                                                              |
| 2   | Filename                     | Section 5.1 (lowercased `tracking.id`, `_` for other characters, `.json`).                                                                                                                                                                         |
| 3   | TLS                          | Retrievable over TLS; MUST NOT be downloadable unencrypted across organizational boundaries.                                                                                                                                                       |
| 4   | TLP:WHITE                    | MUST be freely accessible; a portal copy is fine, but one copy MUST be available without portal access.                                                                                                                                            |
| 5   | TLP:AMBER and TLP:RED        | MUST be access protected; on a web server, under a different path than TLP:WHITE, TLP:GREEN and unlabeled documents, with TLS client authentication, access tokens or another automatable method.                                                  |
| 6   | No redirects                 | SHOULD NOT be used; if inevitable, HTTP header redirects only.                                                                                                                                                                                     |
| 7   | `provider-metadata.json`     | MUST be valid against the provider schema. Its `publisher` SHOULD match the documents.                                                                                                                                                             |
| 8   | security.txt                 | At least one `CSAF:` field pointing to `provider-metadata.json`, starting `https://` for web URIs. If one URL meets requirement 9, it MUST be the first `CSAF` entry. Several fields SHOULD NOT be kept long.                                      |
| 9   | Well-known URL               | `https://<main domain>/.well-known/csaf/provider-metadata.json` serves the file directly.                                                                                                                                                          |
| 10  | DNS path                     | `csaf.data.security.<domain.tld>` resolves to an HTTPS server serving `provider-metadata.json` directly.                                                                                                                                           |
| 11  | One folder per year          | Documents live in `<YYYY>` folders, the year of `tracking.initial_release_date`.                                                                                                                                                                   |
| 12  | `index.txt`                  | Lists every document as `<YYYY>/<filename>`.                                                                                                                                                                                                       |
| 13  | `changes.csv`                | Quoted filename and `current_release_date` per document, no header, newest first.                                                                                                                                                                  |
| 14  | Directory listings           | Enabled.                                                                                                                                                                                                                                           |
| 15  | ROLIE feed                   | One RFC 8322 JSON feed per TLP level; at least one of TLP:WHITE, TLP:GREEN or unlabeled exists. Each entry's `link` lists the hash (`rel` `hash`) and signature (`rel` `signature`) when they exist.                                               |
| 16  | ROLIE service document       | Optional; if used, an RFC 8322 JSON service document listing the feeds.                                                                                                                                                                            |
| 17  | ROLIE category document      | Optional; if used, RFC 8322 JSON. Categories SHOULD split documents by category, language, branch values, product type or sector.                                                                                                                  |
| 18  | Integrity                    | At least one hash file per document with a secure algorithm (for example SHA-512 or SHA-3), named `<file>.sha512` and so on; MD5 and SHA-1 SHOULD NOT be used. The file starts with the hex hash, optionally followed by a space and the filename. |
| 19  | Signatures                   | At least one OpenPGP signature per document, `<file>.asc` (RFC 4880).                                                                                                                                                                              |
| 20  | Public OpenPGP key           | The public key MUST be available, SHOULD also be on a public key server, and SHOULD be of a strength considered secure.                                                                                                                            |
| 21  | List of CSAF providers       | A valid `aggregator.json`, not stored next to a `provider-metadata.json`; it SHOULD list only the latest metadata of each provider.                                                                                                                |
| 22  | Two disjoint issuing parties | `aggregator.json` lists at least two disjoint providers, or one publisher and one provider.                                                                                                                                                        |
| 23  | Mirror                       | Each mirrored issuer in its own folder next to `aggregator.json`, with its own `provider-metadata.json` and a ROLIE feed pointing to the local copies.                                                                                             |

## Roles (§7.2)

| Role                  | Requirements                                                                                                                                                                                                                                                                       |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CSAF publisher        | 1 to 4; distributes only its own documents.                                                                                                                                                                                                                                        |
| CSAF provider         | Publisher, plus 5 to 7, plus at least one of 8 to 10, plus either 11 to 14 (directory-based) or 15 to 17 (ROLIE-based).                                                                                                                                                            |
| CSAF trusted provider | Provider, plus 18 to 20.                                                                                                                                                                                                                                                           |
| CSAF lister           | 6, 21 and 22; `aggregator.category` `lister`; lists no mirror on a domain it controls.                                                                                                                                                                                             |
| CSAF aggregator       | 1 to 6 and 21 to 23; `aggregator.category` `aggregator`; mirrors at least two disjoint issuers on its own domain; links each mirrored issuer's OpenPGP key; provides a hash and signature for every mirrored document (copying the issuer's or creating its own), listed in ROLIE. |

Every distributing party MUST at least meet the CSAF publisher role (§7). Listers and aggregators that also issue advisories follow the publisher rules for those (§7.2).

Issuers opt out with `list_on_CSAF_aggregators: false` or `mirror_on_CSAF_aggregators: false`. When a publisher provides no `provider-metadata.json` and cannot be reached, an aggregator MUST assume `list_on_CSAF_aggregators: true` and `mirror_on_CSAF_aggregators: false` (§7.1.7, §7.2). An aggregator's own signature only says the copy is unmodified; it implies no liability for the content (§7.2.5).

## `provider-metadata.json`

Example for a trusted provider with a ROLIE feed (§7.1.7):

```json
{
  "canonical_url": "https://www.example.com/.well-known/csaf/provider-metadata.json",
  "distributions": [
    {
      "rolie": {
        "feeds": [
          {
            "summary": "All TLP:WHITE advisories of Example Company.",
            "tlp_label": "WHITE",
            "url": "https://www.example.com/.well-known/csaf/feed-tlp-white.json"
          }
        ]
      }
    }
  ],
  "last_updated": "2026-10-05T10:00:00.000Z",
  "list_on_CSAF_aggregators": true,
  "metadata_version": "2.0",
  "mirror_on_CSAF_aggregators": true,
  "public_openpgp_keys": [
    {
      "fingerprint": "8F5F267907B2C4559DB360DB2294BA7D2B2298B1",
      "url": "https://keys.example.net/vks/v1/by-fingerprint/8F5F267907B2C4559DB360DB2294BA7D2B2298B1"
    }
  ],
  "publisher": {
    "category": "vendor",
    "name": "Example Company ProductCERT",
    "namespace": "https://psirt.example.com"
  },
  "role": "csaf_trusted_provider"
}
```

The matching security.txt line (requirement 8):

```text
CSAF: https://www.example.com/.well-known/csaf/provider-metadata.json
```

A ROLIE feed entry carries `id`, `title`, `link` (`self`, `hash`, `signature`), `published`, `updated`, `content` (`type` `application/json`, `src`) and `format` (`schema` `https://docs.oasis-open.org/csaf/csaf/v2.0/csaf_json_schema.json`, `version` `2.0`); the feed's `category` uses scheme `urn:ietf:params:rolie:category:information-type` with term `csaf` (§7.1.15).

## Retrieving (§7.3)

1. **Find `provider-metadata.json`.** Check the well-known URL (requirement 9), then security.txt (requirement 8), then, only if neither found one, the DNS path (requirement 10). Do the first two every time, because security.txt may advertise more. Alternatively, take the URL from a lister's or aggregator's `aggregator.json` (§7.3.1).
2. **Pick the distribution.** Directory-based (requirements 11 to 14) or ROLIE-based (15 to 17); prefer ROLIE when both exist (§7.3.2).
3. **Check integrity.** For trusted providers, fetch the hash and signature with the document and check them before anything else (§7.3.2).
4. **Validate.** Check the schema, then run the mandatory tests (§7.3.2).

Repeat step 1 regularly even if not on every run (§7.3).

## Security considerations (§8)

- JSON's security considerations apply; never parse CSAF with `eval()` or similar.
- Producers SHOULD NOT emit HTML; HTML, source code or proof-of-concept content goes in Markdown fenced or inline code.
- Consumers SHALL use a Markdown processor hardened against deeply nested markup, and SHALL disable HTML or sanitize the output. Consumers that cannot handle formatted text SHALL show the plain text instead.
- Consumers SHALL ensure no value is run as code and SHALL treat every value as unsafe input.
- Retrieving only from trusted sources and checking integrity and signatures before parsing SHOULD reduce the risk further.

## Common mistakes

- Serving `provider-metadata.json` through an HTML or JavaScript redirect; only HTTP header redirects are allowed (requirement 6).
- Putting TLP:AMBER documents in the public year folders or public ROLIE feed (requirement 5).
- Hash files that start with the filename instead of the hash (requirement 18).
- Validating `aggregator.json` against the original 2.0 schema, which requires a nonexistent `mirror` field; use the Errata 01 schema (Errata 01 §1.1).

## CSAF 2.1 changes (draft, track only)

CSAF 2.1 CSD03 renames TLP:WHITE to TLP:CLEAR and adds TLP:AMBER+STRICT to requirement 5; allows at most 20 consecutive redirects (SHOULD NOT exceed 10); adds `$schema`, per-feed `last_updated`, `maintained_from` and `maintained_until` to `provider-metadata.json`; adds requirement 24 (do not restrict access by HTTP User-Agent, except temporarily during an incident) and requirement 25 (SHOULD send `Access-Control-Allow-Origin: *`), required for providers, listers and aggregators; defines locating `aggregator.json` at `/.well-known/csaf-aggregator/`; and defines a transition with versioned paths `/.well-known/csaf/v2.0/` and `/.well-known/csaf/v2.1/` and a `v2.0` archive under `/.well-known/csaf/archive/` (2.1 §7.1.4 to §7.1.7, §7.1.24, §7.1.25, §7.2, §7.3.3, §7.4). Keep serving CSAF 2.0 until 2.1 is final.
