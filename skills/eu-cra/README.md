# eu-cra

An agent skill for the EU Cyber Resilience Act, Regulation (EU) 2024/2847: scoping products with digital elements and turning the obligations into engineering requirements.

This skill is not legal advice. Involve qualified counsel for scoping, classification, conformity and anything with regulatory consequences.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill eu-cra
```

Then ask your agent to "check whether our router firmware is an important product under the CRA" or "set up our Article 14 reporting runbook".

## What it covers

- Scope and exclusions, free and open-source software, open-source software stewards and operator roles.
- Default, important (class I and II) and critical products (Annexes III and IV, Implementing Regulation (EU) 2025/2392).
- The Annex I essential requirements and vulnerability handling: SBOM, coordinated vulnerability disclosure, security updates and upstream reporting.
- The support period and how long updates and documentation stay available (Art. 13).
- Reporting actively exploited vulnerabilities and severe incidents within 24 hours, 72 hours and the final report deadline, through the single reporting platform (Arts. 14 to 17).
- Annex VII technical documentation, conformity modules, the declaration of conformity and CE marking (Arts. 28 to 32).
- The application dates (Arts. 69 and 71) and fines (Art. 64).

## Versions

| Line                                      | Status          |
| ----------------------------------------- | --------------- |
| Official Journal text of 20 November 2024 | current         |
| Digital Omnibus proposal COM(2025) 837    | preview (track) |
| public procurement proposal COM(2026) 590 | preview (track) |

`references/versions.md` says which text to work from, lists the corrigenda and the acts adopted under the Regulation, explains the scheduled European Health Data Space amendment, and says what to do when a proposal is adopted.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Regulation (EU) 2024/2847](https://publications.europa.eu/resource/celex/32024R2847): Regulation in force, OJ L 2024/2847 of 20.11.2024.
- Corrigenda [R(01)](https://publications.europa.eu/resource/celex/32024R2847R%2801%29), [R(02)](https://publications.europa.eu/resource/celex/32024R2847R%2802%29) and [R(04)](https://publications.europa.eu/resource/celex/32024R2847R%2804%29), and the [Publications Office metadata](https://publications.europa.eu/webapi/rdf/sparql) listing all seven corrigenda and the related acts.
- [Regulation (EU) 2025/327](https://publications.europa.eu/resource/celex/32025R0327): the European Health Data Space Regulation, which amends the CRA from 26 March 2027.
- [Delegated Regulation (EU) 2025/1535](https://publications.europa.eu/resource/celex/32025R1535), [Implementing Regulation (EU) 2025/2392](https://publications.europa.eu/resource/celex/32025R2392) and [Delegated Regulation (EU) 2026/881](https://publications.europa.eu/resource/celex/32026R0881).
- The Commission [guidance of 27 July 2026](https://ec.europa.eu/newsroom/dae/redirection/document/131456) and [FAQs version 1.4](https://ec.europa.eu/newsroom/dae/redirection/document/122331), both non-binding.
- European Commission pages on the [CRA](https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act), [reporting obligations](https://digital-strategy.ec.europa.eu/en/policies/cra-reporting) and [standardisation](https://digital-strategy.ec.europa.eu/en/policies/cra-standardisation), and ENISA's [Single Reporting Platform](https://www.enisa.europa.eu/topics/product-security/single-reporting-platform-srp) page.
- The proposals [COM(2025) 837](https://publications.europa.eu/resource/celex/52025PC0837) (Digital Omnibus) and [COM(2026) 590](https://publications.europa.eu/resource/celex/52026PC0590) (public procurement).

## License

MIT
