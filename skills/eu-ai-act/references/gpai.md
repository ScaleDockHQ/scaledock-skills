# General-purpose AI models: Arts. 51 to 56

Sources: Regulation (EU) 2024/1689, consolidated text of 27.07.2026 (Arts. 3, 51 to 56, 111(3) and 113), and the Commission's page on the contents of the GPAI Code of Practice. Chapter V applies from 2 August 2025 (Art. 113(b)). Not legal advice.

## Definitions (Art. 3)

- **General-purpose AI model** (63): an AI model, including one trained with a large amount of data using self-supervision at scale, that displays significant generality and can competently perform a wide range of distinct tasks, and can be integrated into a variety of downstream systems or applications. Models used for research, development or prototyping before market placement are excluded.
- **General-purpose AI system** (66): an AI system based on a GPAI model that can serve a variety of purposes, directly or integrated into other AI systems.
- **Systemic risk** (65): a risk specific to the high-impact capabilities of GPAI models, with significant impact on the Union market due to reach or foreseeable negative effects on public health, safety, security, fundamental rights or society, that can be propagated at scale.

An organisation that integrates a third-party GPAI model into its own AI system is the provider of that AI system (Art. 3(3)) and receives the model provider's Art. 53(1)(b) information. Whether modifying or fine-tuning the model also makes it a GPAI model provider is a question for counsel.

## Systemic risk classification (Arts. 51 and 52)

- A model has systemic risk if it has high-impact capabilities, or the Commission decides it has equivalent capabilities or impact under Annex XIII (51(1)).
- High-impact capabilities are presumed when cumulative training compute exceeds 10^25 floating point operations (51(2)). The Commission may amend the threshold by delegated act (51(3)).
- The provider notifies the Commission without delay, and within two weeks, once the threshold is met or known to be met, and may argue that the model exceptionally does not present systemic risk (52(1), (2)).

## Obligations of all GPAI model providers (Art. 53(1))

| Point | Obligation                                                                                                                                                                                                       | Artefact                                                                                         |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| (a)   | Draw up and keep up to date technical documentation, including training, testing and evaluation results, with at least Annex XI, for the AI Office and national authorities on request                           | Model documentation; the Code of Practice Transparency chapter offers a Model Documentation Form |
| (b)   | Draw up, keep up to date and make available information to downstream AI system providers, so they understand capabilities and limitations and can comply, with at least Annex XII                               | Downstream integration documentation                                                             |
| (c)   | Put in place a policy to comply with Union copyright law, in particular to identify and respect, including with state-of-the-art technologies, reservations of rights under Art. 4(3) of Directive (EU) 2019/790 | Copyright policy; crawler that honours machine-readable opt-outs                                 |
| (d)   | Draw up and publish a sufficiently detailed summary of the content used for training, using the AI Office template                                                                                               | Public training-content summary                                                                  |

- **Open-source exception** (53(2)): points (a) and (b) do not apply to models released under a free and open-source licence with public parameters, including weights, architecture and usage information, unless the model has systemic risk.
- **Authorised representative** (54): providers established in third countries appoint one in the Union before placing a model on the market; the representative keeps the Annex XI documentation for 10 years. Open-source models without systemic risk are exempt (54(6)).
- **Codes of practice** (53(4)): providers may rely on codes of practice under Art. 56 to demonstrate compliance until a harmonised standard is published.

## Additional obligations for systemic-risk models (Art. 55(1))

1. (a) Perform model evaluation with state-of-the-art standardised protocols and tools, including documented adversarial testing.
2. (b) Assess and mitigate possible systemic risks at Union level.
3. (c) Track, document and report serious incidents and corrective measures to the AI Office, and to national authorities as appropriate, without undue delay.
4. (d) Ensure adequate cybersecurity for the model and its physical infrastructure.

Providers may rely on codes of practice until a harmonised standard is published (55(2)).

## The GPAI Code of Practice (Commission page)

- Published on 10 July 2025; a voluntary tool prepared by independent experts in a multi-stakeholder process.
- The Commission and the AI Board have confirmed it is an adequate voluntary tool to demonstrate compliance. Signatories can show compliance by adhering to it.
- Three chapters: **Transparency** and **Copyright**, for all GPAI model providers under Art. 53; **Safety and Security**, for providers of models with systemic risk under Art. 55.

## Dates

- Chapter V applies from 2 August 2025 (Art. 113(b)).
- Models placed on the market before 2 August 2025 comply by 2 August 2027 (Art. 111(3)).
- The Commission page states that the AI Office holds enforcement powers over GPAI models, and that the AI Office and Member State authorities implement, supervise and enforce the Act from 2 August 2026.
