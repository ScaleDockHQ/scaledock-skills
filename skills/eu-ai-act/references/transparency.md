# Transparency obligations: Art. 50

Sources: Regulation (EU) 2024/1689, consolidated text of 27.07.2026 (Arts. 3, 50, 111(4) and 113), and the Commission's AI Act policy page. Art. 50 is in Chapter IV and applies from 2 August 2026 (Art. 113). Not legal advice.

## Obligations

| Paragraph                  | Who                                                          | Obligation                                                                                                                                                                                                                                                         | Main exceptions                                                                                                                                                                          |
| -------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 50(1)                      | Providers                                                    | Systems intended to interact directly with natural persons are designed so those persons are informed they are interacting with an AI system                                                                                                                       | Obvious to a reasonably well-informed, observant and circumspect person in context; systems authorised by law for criminal offences, unless available to the public to report an offence |
| 50(2)                      | Providers, including of general-purpose AI systems           | Synthetic audio, image, video or text output is marked in a machine-readable format and detectable as artificially generated or manipulated. Technical solutions are effective, interoperable, robust and reliable as far as technically feasible                  | Assistive functions for standard editing; systems that do not substantially alter the deployer's input data or its semantics; use authorised by law for criminal offences                |
| 50(3)                      | Deployers of emotion recognition or biometric categorisation | Inform the persons exposed of the operation of the system, and process personal data under the GDPR and related law                                                                                                                                                | Systems permitted by law to detect, prevent or investigate criminal offences                                                                                                             |
| 50(4), first subparagraph  | Deployers                                                    | Disclose that image, audio or video content constituting a deep fake has been artificially generated or manipulated. For evidently artistic, creative, satirical or fictional works, disclose the existence of such content in a way that does not hamper the work | Use authorised by law for criminal offences                                                                                                                                              |
| 50(4), second subparagraph | Deployers                                                    | Disclose that text published to inform the public on matters of public interest has been artificially generated or manipulated                                                                                                                                     | Human review or editorial control with editorial responsibility; use authorised by law                                                                                                   |
| 50(5)                      | Providers and deployers                                      | Give the information clearly and distinguishably, at the latest at the first interaction or exposure, and meet accessibility requirements                                                                                                                          |                                                                                                                                                                                          |

A deep fake is AI-generated or manipulated image, audio or video content that resembles existing persons, objects, places, entities or events and would falsely appear authentic or truthful (Art. 3(60)).

## Transitional rule

Providers of systems that generate synthetic audio, image, video or text and that were placed on the market before 2 August 2026 comply with Art. 50(2) by 2 December 2026 (Art. 111(4), added by the Omnibus).

## Codes of practice and guidelines

- The Commission encourages codes of practice for detecting, marking and labelling artificially generated or manipulated content, and assesses whether adherence is adequate for Art. 50(2) and (4); if not, it may adopt an implementing act (Art. 50(7)).
- The Commission page lists a Code of Practice on Marking and Labelling of AI-generated Content, a voluntary tool that includes icons deployers may use to disclose AI-generated images, audio and text, and Guidelines on transparency obligations that clarify scope, definitions, obligations and exceptions. Read both before choosing a marking technique.

## Engineering checklist

- [ ] Chat and voice interfaces show an AI notice before or at the first interaction, unless counsel confirms it is obvious from context.
- [ ] Generated media and text carry a machine-readable mark that a detector can read; the technique is documented with its robustness limits.
- [ ] Deep-fake output shown to the public is labelled; the label survives the formats you export.
- [ ] Notices are accessible (for example, readable by screen readers and present in audio-only flows).
- [ ] Systems on the market before 2 August 2026 have an Art. 50(2) plan finishing by 2 December 2026.
