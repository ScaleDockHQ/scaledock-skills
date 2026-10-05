# eu-ai-act

An agent skill for the EU AI Act, Regulation (EU) 2024/1689, as amended by the Digital Omnibus on AI: classifying AI systems and turning the obligations into engineering requirements.

This skill is not legal advice. Involve qualified counsel for classification, conformity and anything with regulatory consequences.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill eu-ai-act
```

Then ask your agent to "check whether our hiring feature is high-risk under the AI Act" or "design Art. 12 logging for our AI system".

## What it covers

- Operator roles, prohibited practices (Art. 5) and high-risk classification (Art. 6, Annex III).
- High-risk requirements (Arts. 9 to 15) with the Annex IV technical documentation, and provider and deployer duties.
- Logging and log retention (Arts. 12, 19 and 26(6)).
- Transparency for chatbots, synthetic content and deep fakes (Art. 50).
- General-purpose AI model obligations (Arts. 51 to 55) and the GPAI Code of Practice.
- Application dates after the Omnibus (Arts. 111 and 113) and fines (Art. 99).

## Versions

| Line                              | Status                |
| --------------------------------- | --------------------- |
| consolidated text of 27 July 2026 | current               |
| original text of 12 July 2024     | legacy (upgrade from) |

`references/versions.md` says which text to work from, lists the corrigenda, and has the checklist for updating plans written against the original dates.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Regulation (EU) 2024/1689](https://publications.europa.eu/resource/celex/32024R1689): Regulation in force, OJ L 2024/1689 of 12.7.2024.
- [Consolidated text of 27.07.2026](https://publications.europa.eu/resource/celex/02024R1689-20260727): incorporates Regulation (EU) 2026/1744; no legal effect.
- [Publications Office metadata](https://publications.europa.eu/webapi/rdf/sparql): the consolidated versions, the amending act and the four corrigenda.
- [Regulation (EU) 2026/1744, Digital Omnibus on AI](https://publications.europa.eu/resource/celex/32026R1744): in force 27 July 2026.
- European Commission pages on the [AI Act](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai), the [GPAI Code of Practice](https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai) and the [implementation timeline](https://ai-act-service-desk.ec.europa.eu/en/ai-act/timeline/timeline-implementation-eu-ai-act).

## License

MIT
