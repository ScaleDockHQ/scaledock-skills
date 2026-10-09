# peppol-bis

An agent skill for Peppol BIS Billing: sending, receiving and validating Peppol invoices and credit notes.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill peppol-bis
```

Then ask your agent to apply Peppol BIS Billing.

## What it covers

- Peppol BIS Billing 3.0 from OpenPeppol: the Core Invoice Usage Specification of EN 16931 that Peppol uses for invoices and credit notes in UBL, with its semantic data types, VAT and rounding rules and the PEPPOL-EN16931 transaction business rules, read from the published BIS document on docs.peppol.eu.

## Versions

| Line                   | Status  |
| ---------------------- | ------- |
| Peppol BIS Billing 3.0 | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Peppol BIS Billing 3.0](https://docs.peppol.eu/poacc/billing/3.0/bis/): Specification, Peppol BIS Billing 3.0, May 2026 release.

## License

MIT
