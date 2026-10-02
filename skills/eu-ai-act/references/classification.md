# Roles, prohibited practices and risk classification

Sources: Regulation (EU) 2024/1689, consolidated text of 27.07.2026 (Arts. 3, 5, 6, 25 and Annex III), and the Commission's AI Act policy page. Not legal advice; confirm every classification with counsel.

## Roles (Art. 3)

| Role                          | Definition, shortened                                                                                                                                         |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Provider (3)                  | Develops an AI system or GPAI model, or has one developed, and places it on the market or puts it into service under its own name or trademark, paid or free. |
| Deployer (4)                  | Uses an AI system under its authority, except in a personal non-professional activity.                                                                        |
| Authorised representative (5) | Established in the Union, holds a written mandate from a provider to carry out its obligations.                                                               |
| Importer (6)                  | Established in the Union, places on the market an AI system bearing the name or trademark of a person established in a third country.                         |
| Distributor (7)               | Makes an AI system available on the Union market, other than the provider or importer.                                                                        |
| Operator (8)                  | Any of the above, or a product manufacturer.                                                                                                                  |

**Becoming a provider** (Art. 25(1)): a distributor, importer, deployer or other third party is treated as the provider of a high-risk system if it puts its name or trademark on it, makes a substantial modification so it stays high-risk, or changes the intended purpose of a non-high-risk system, including a general-purpose AI system, so that it becomes high-risk. Fine-tuning or rebranding a third-party system for a high-risk use can therefore move the provider obligations to you.

## Risk levels (Commission policy page)

The Commission describes four levels: unacceptable risk (prohibited), high risk, transparency risk, and minimal or no risk, for which the Act introduces no rules. General-purpose AI models have their own obligations (Chapter V).

## Prohibited practices (Art. 5(1))

| Point | Practice, shortened                                                                                                                                                                                                                      |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (a)   | Subliminal, purposefully manipulative or deceptive techniques that materially distort behaviour and cause or are likely to cause significant harm                                                                                        |
| (b)   | Exploiting vulnerabilities due to age, disability or a specific social or economic situation                                                                                                                                             |
| (ba)  | Generating or manipulating realistic images, video, audio or similar material of an identifiable person's intimate parts, or of an identifiable person in sexually explicit activities, without that person's explicit consent (Omnibus) |
| (bb)  | Generating or manipulating child sexual abuse material within the meaning of Directive 2011/93/EU (Omnibus)                                                                                                                              |
| (c)   | Social scoring of persons over time that leads to detrimental or unfavourable treatment                                                                                                                                                  |
| (d)   | Risk assessments predicting a person will commit a criminal offence based solely on profiling or personality traits                                                                                                                      |
| (e)   | Creating or expanding facial recognition databases through untargeted scraping of facial images from the internet or CCTV                                                                                                                |
| (f)   | Inferring emotions in the workplace or education, except for medical or safety reasons                                                                                                                                                   |
| (g)   | Biometric categorisation to deduce or infer race, political opinions, trade union membership, religious or philosophical beliefs, sex life or sexual orientation                                                                         |
| (h)   | Real-time remote biometric identification in publicly accessible spaces for law enforcement, except where strictly necessary for listed objectives                                                                                       |

Read the full text of each point; the table drops conditions and exceptions.

**Generative systems and points (ba) and (bb)** (Art. 5(1a), (1b)): placing such a system on the market is prohibited where that generation is its intended purpose, or where its design, training, architecture, capabilities or user-facing features make it a reasonably foreseeable and reproducible outcome without significant modification and the system lacks reasonable and adequate safeguards to reliably prevent it, taking account of foreseeable misuse, and to correct observed or reported misuse. Use by a deployer is prohibited where the deployer uses the system for that purpose. Points (ba), (bb), (1a) and (1b) apply from 2 December 2026 (Art. 113(a)).

Engineering consequence: a general image, video or audio generator needs documented, tested safeguards against these outputs, plus a misuse reporting and correction path, before 2 December 2026.

## High-risk classification (Art. 6)

1. **Annex I route** (Art. 6(1)): the AI system is a safety component of a product, or is itself a product, covered by the Union harmonisation legislation in Annex I, and that product must undergo third-party conformity assessment. The Omnibus clarifies that systems used only for non-safety aspects (user assistance, performance optimisation, service efficiency, automation, convenience or quality control) are not safety components, unless their failure would endanger health and safety (Art. 6(1a), (1b)).
2. **Annex III route** (Art. 6(2)): the system is listed in Annex III.
3. **Annex III derogation** (Art. 6(3)): an Annex III system is not high-risk if it does not pose a significant risk of harm to health, safety or fundamental rights, including by not materially influencing decisions, and it is intended to (a) perform a narrow procedural task, (b) improve the result of a completed human activity, (c) detect decision-making patterns or deviations without replacing or influencing the human assessment without proper review, or (d) perform a preparatory task. An Annex III system that **profiles natural persons is always high-risk**.
4. **Documentation** (Art. 6(4)): a provider relying on Art. 6(3) documents the assessment before placing on the market, registers under Art. 49(2), and gives the documentation to authorities on request.

### Annex III areas

1. Biometrics, where permitted: remote biometric identification (not verification that only confirms identity), biometric categorisation by sensitive attributes, emotion recognition.
2. Critical infrastructure.
3. Education and vocational training.
4. Employment, workers' management and access to self-employment.
5. Access to essential private and public services and benefits, such as credit scoring, life and health insurance pricing, public benefits and emergency calls.
6. Law enforcement.
7. Migration, asylum and border control.
8. Administration of justice and democratic processes.

Read each area's points in Annex III; the list above gives the headings only.

## Classification record

Write one record per AI system and have counsel review it:

```json
{
  "system": "candidate-screening-ranker",
  "role": "provider",
  "intendedPurpose": "Rank job applications for recruiter review",
  "article5": {
    "checked": true,
    "notes": "No Art. 5(1) practice applies; see analysis"
  },
  "article6": {
    "route": "Annex III",
    "annexIIIPoint": "4",
    "derogation": null,
    "profiling": true
  },
  "classification": "high-risk",
  "reviewedBy": "counsel",
  "regulationVersion": "02024R1689-20260727"
}
```
