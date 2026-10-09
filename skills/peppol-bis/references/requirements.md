# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published text, quoted as written (only line breaks and hyphenation from PDF layout were joined). Apply the ones that match the role. Each is labelled with the nearest section, clause or article in the published document.

## BIS document

Source: https://docs.peppol.eu/poacc/billing/3.0/bis/

- **§ 5.2 Invoice verification.** The invoice shall refer to an authentic commercial transaction.
- **§ 7.2 Semantic data types.** Whenever a business term is used this term shall always have content and therefore the content is always mandatory.
- **§ 7.2.5 Code.** Codes shall be entered exactly as shown in the selected code list of the applicable syntax.
- **§ 7.2.7 Date.** Dates shall not include timezone information.
- **§ 7.2.10 Binary objects.** Attachments shall be transmitted together with the Invoice.
- **§ 8.1 Line VAT Information.** Each invoice line shall have the invoiced item VAT category code (BT-151), and for all VAT categories except "Not subject to VAT" (O), the VAT rate shall be provided.
- **§ 8.3 VAT Breakdown.** One VAT Breakdown shall be provided for each distinct combination of VAT category code and VAT rate found in either the line VAT information or the Document level allowance or charges.
- **§ 9 Rounding.** All document level amounts shall be rounded to two decimals for accounting
- **§ 9 Rounding.** Invoice line net amount shall be rounded to two decimals
- **§ 11.3.2 Buyer reference.** An invoice shall have either the buyer reference or the order reference
- **§ 11.5 Allowances and Charges.** The price itself shall always be the net price, i.e. the base amount reduced with a discount (allowance).
- **§ 12.1.2 Country code.** All country codes in an invoice or credit note shall be the alpha-2 code from ISO 3166-1

## § 16.1 Peppol transaction business rules

Source: https://docs.peppol.eu/poacc/billing/3.0/bis/

- **PEPPOL-EN16931-R001.** Business process MUST be provided.
- **PEPPOL-EN16931-R003.** A buyer reference or purchase order reference MUST be provided.
- **PEPPOL-EN16931-R004.** Specification identifier MUST begin with the value 'urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0' and follow the format rules for the identifier.
- **PEPPOL-EN16931-R008.** Document MUST not contain empty elements.
- **PEPPOL-EN16931-R010.** Buyer electronic address MUST be provided
- **PEPPOL-EN16931-R020.** Seller electronic address MUST be provided
- **PEPPOL-EN16931-R051.** All currencyID attributes must have the same value as the invoice currency code (BT-5), except for the invoice total VAT amount in accounting currency (BT-111).
- **PEPPOL-EN16931-R053.** Only one tax total with tax subtotals MUST be provided.
- **PEPPOL-EN16931-R120.** Invoice line net amount MUST equal (Invoiced quantity * (Item net price/item price base quantity) + Sum of invoice line charge amount - sum of invoice line allowance amount
- **PEPPOL-EN16931-R121.** Base quantity MUST be a positive number above zero.
- **PEPPOL-EN16931-F001.** A date MUST be formatted YYYY-MM-DD.
