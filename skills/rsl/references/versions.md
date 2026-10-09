# Versions and upgrades

Read this when choosing a target version, reading an RSL document written for the 0.9 draft, or upgrading one. Sources: the RSL 1.0 specification, its errata page and the 0.9 draft, listed in [Sources](../SKILL.md#sources).

## Version lines

| Id    | Line    | Status  | Revision                                        | Posture | Summary                                                       |
| ----- | ------- | ------- | ----------------------------------------------- | ------- | ------------------------------------------------------------- |
| `1.0` | RSL 1.0 | current | RSL-SPEC-1.0 (2025-12-10), errata to 2026-08-07 |         | The Recommendation. The default target.                       |
| `0.9` | RSL 0.9 | legacy  | 0.9 draft (last updated 2025-09-16)             |         | Launch draft with comma-separated lists and `inference` type. |

Statuses: **current** is the default target; **legacy** is superseded, read and upgraded from but never authored. No preview exists.

Both lines use the namespace `https://rslstandard.org/rsl`. RSL 1.0 says future revisions MAY use incremented namespace URIs such as `/1.1/` or `/2.0/`, each immutable once published (§ 1.3). A document is identified by namespace, so a 0.9 document cannot be told apart from 1.0 by namespace alone: look at list separators and tokens.

## Which version to use

- Author RSL 1.0 only.
- Treat a document with comma-separated lists, `type="inference"` or the currency `XBT` as 0.9 input to an upgrade.
- When refreshing, check `https://rslstandard.org/rsl/latest/` and the errata page; a new namespace is a new version line.

## What changed

### RSL 1.0 (Recommendation, 2025-12-10)

- Lists in `<permits>`, `<prohibits>` and `<legal>` are space-separated tokens (§ 3.5, Appendix A); 0.9 used commas.
- Usage tokens add `ai-all` and `ai-index` to `all`, `ai-train`, `ai-input` and `search` (§ 3.4.1.1).
- Payment types: `inference` became `use` ("each time the content contributes to an AI-generated output"), and `contribution` was added (§ 3.7).
- New elements: `<accepts>` for payment protocols such as x402 (§ 3.11), `<alternate>` for alternative representations (§ 3.14), and `<schema>` may carry inline JSON-LD (§ 3.15).
- New `<legal>` types: `attestation`, `contact` and `proof` (§ 3.13).
- New `max-age` on `<rsl>` with a 30-day default and revalidation of both document and association (§ 3.2, § 3.2.1).
- Normative conflict resolution: order-independent, specific over general, prohibition over permission (§ 3.1.1).
- Unknown RSL-namespace elements make a document non-conformant; foreign-namespace extensions are ignored (§ 1.2, § 3).
- Discovery formalised: robots.txt `License` ABNF and group scoping, `Link`, HTML linked and inline associations, RSS module, embedded file metadata, precedence (§ 4).
- The OLP, CAP and EMS protocols are specified as optional extensions (§ 5, § 6, § 7), with IANA requests for `application/rsl+xml` and the `License` authentication scheme (§ 10).

### Errata to RSL 1.0

From the errata page, newest first:

- 2026-08-07: unrecognized extension elements and their contents are ignored for RSL Core conformance and evaluation.
- 2026-07-18: scope of HTML license associations clarified (§ 3.3.1, § 4.6), including `url=""`.
- 2026-06-12: `<reporting>` added (§ 3.12).
- 2026-05-27: canonical asset identifiers aligned between inline HTML and embedded file associations (§ 4.6, § 4.8).
- 2026-05-13: `XBT` removed from the § 3.10 examples because it is not an ISO 4217 code.
- 2026-02-19: revalidation requirements clarified (§ 3.2.1).
- 2026-01-16: usage and user vocabularies consolidated in § 3.4.1 without changing meaning; robots.txt group association clarified.

## Upgrading

### 0.9 to 1.0

1. Replace commas in every `<permits>`, `<prohibits>` and `<legal>` list with single spaces.
2. Rename `<payment type="inference">` to `<payment type="use">`.
3. Replace non-ISO 4217 currencies such as `XBT` in `<amount currency>`; RSL 1.0 requires a three-letter uppercase ISO 4217 code (§ 3.10, Appendix A).
4. Check that every `<content>` with a `server` attribute has a non-empty `url` (§ 3.3).
5. Decide `max-age` explicitly; without it clients revalidate every 30 days (§ 3.2.1).
6. If the publisher used 0.9's `all` to mean "all AI", consider whether `ai-all` expresses the intent better: `all` also covers search (§ 3.4.1.1).
7. Validate against the Appendix A Relax NG schema.
8. Keep meaning unchanged: an upgrade that validates but grants a right the 0.9 document did not is a regression.
