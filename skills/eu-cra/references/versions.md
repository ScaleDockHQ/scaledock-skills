# Versions and upgrades

Read this when deciding which text of the CRA to work from, when a plan or summary predates the corrigenda or the delegated and implementing acts, when an amendment starts to apply, or when a proposal is adopted. Sources: the Official Journal text of Regulation (EU) 2024/2847, its corrigenda, Regulation (EU) 2025/327, the delegated and implementing acts, the two Commission proposals and the Publications Office metadata, listed in [Sources](../SKILL.md#sources). Not legal advice.

## Version lines

| Id                        | Line                                      | Status  | Revision                                                                   | Posture | Summary                                                                                    |
| ------------------------- | ----------------------------------------- | ------- | -------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------ |
| `digital-omnibus-preview` | Digital Omnibus proposal COM(2025) 837    | preview | COM(2025) 837 final of 19.11.2025, procedure 2025/0360(COD)                | track   | Single-entry point for incident reporting built on the CRA platform; amends NIS2, not CRA. |
| `procurement-preview`     | public procurement proposal COM(2026) 590 | preview | COM(2026) 590 final of 9.9.2026, procedure 2026/0265(COD)                  | track   | Deletes CRA Art. 5 and moves its procurement rules into a new procurement regulation.      |
| `oj-20241120`             | Official Journal text of 20 November 2024 | current | OJ L 2024/2847 of 20.11.2024 (CELEX 32024R2847), corrigenda R(01) to R(07) |         | The Regulation as adopted. The default target.                                             |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

A line here is a text of the Regulation, not a software version. Only Official Journal texts are authentic. The Publications Office lists one consolidated version, `02024R2847-20241120`, which is the original text: no amendment has yet been consolidated.

## What the current line is read with

These acts do not change the wording of the Regulation, so they are not separate lines, but they apply alongside it:

- **Corrigenda.** The Publications Office lists seven, `32024R2847R(01)` to `R(07)`. Three have an English version: R(01) of 5.12.2024 corrects the title (Regulation "(EU) 2019/1020"); R(02) of 2.7.2025 changes Art. 64(10) to "By way of derogation from paragraphs 2 to 9", so the fine derogations for micro and small enterprises and for stewards also cover the Art. 64(2) fines; R(04) of 17.10.2025 renumbers the point Art. 67 adds to Directive (EU) 2020/1828 from 69 to 72. R(03), R(05), R(06) and R(07) are listed only for French, Hungarian, Slovak and German; check them for the language version you rely on.
- **Commission Delegated Regulation (EU) 2025/1535** excludes products within Regulation (EU) No 168/2013 (L-category vehicles) from the CRA, except L1e vehicles designed to pedal (Art. 1).
- **Commission Implementing Regulation (EU) 2025/2392** gives the technical description of every Annex III and Annex IV category (Art. 7(4)).
- **Commission Delegated Regulation (EU) 2026/881** sets the terms for a CSIRT to delay dissemination of a notification (Art. 14(9), Art. 16(2)).
- **Commission guidance C(2026) 5252 of 27 July 2026** and the **FAQs (version 1.4 of 4 September 2026)**: non-binding, used here for interpretation and flagged as such.

As of 2026-10-05 the metadata lists no implementing act on the SBOM format (Art. 13(24)), on the simplified technical documentation form (Art. 33(5)), or on notification formats (Art. 14(10)), and no delegated act under Art. 8(1) requiring certification of critical products.

### Scheduled amendment: European Health Data Space

Art. 104 of Regulation (EU) 2025/327 amends the CRA: Art. 13(4) and Art. 31(3) also cover products under a new Art. 32(5a), and Art. 32(5a) requires manufacturers of products classified as EHR systems under Regulation (EU) 2025/327 to show conformity with Annex I through the conformity assessment procedure of Chapter III of that Regulation. Regulation (EU) 2025/327 applies from 26 March 2027 (its Art. 105), and Art. 104 is not among its deferred provisions. No consolidated CRA text with this change exists yet, and it affects EHR systems only, so it is not listed as a line. When a consolidated version dated 26 March 2027 appears, add it as current and make `oj-20241120` legacy.

## Which version to use

- Work from `oj-20241120`, read with the acts above, and cite the Official Journal text when an answer has legal weight.
- For EHR systems placed on the market from 26 March 2027, apply Art. 32(5a) as inserted by Regulation (EU) 2025/327.
- There is no supported or legacy line.
- Never plan, scope or build against `digital-omnibus-preview` or `procurement-preview`: they are proposals with posture track.

## What changed

### Official Journal text of 20 November 2024

The Regulation as adopted on 23 October 2024 and published on 20.11.2024, in force on 10 December 2024 (Art. 71(1); Commission policy page). Since publication: the corrigenda, the two delegated regulations and the implementing regulation above, and the EHDS amendment that applies from 26 March 2027.

## Upgrading

### Older material to oj-20241120

Use this for a plan, requirements list or summary written from drafts, early summaries, or before the corrigenda and the acts based on the Regulation.

1. Change the version marker: cite "Regulation (EU) 2024/2847 (OJ L 2024/2847, 20.11.2024)" and name the corrigenda and acts relied on.
2. Replace changed or added material: take every date from Arts. 71 and 69 (see [`conformity-and-timeline.md`](conformity-and-timeline.md#key-dates)); read Art. 64(10) as corrected by R(02); drop L-category vehicles from scope per Delegated Regulation (EU) 2025/1535; re-check the product class against Implementing Regulation (EU) 2025/2392; and align the reporting runbook with Delegated Regulation (EU) 2026/881 and the single reporting platform.
3. Validate against the target: re-read each cited article in the Official Journal text, then check the Publications Office for new consolidated versions, amending acts, corrigenda and acts based on the Regulation.
4. Keep behaviour unchanged where the law did not change: a reinterpretation in guidance is not a reason to drop a built control. Record what moved.

### oj-20241120 to the text as amended by Regulation (EU) 2025/327

1. For EHR systems only, change the conformity route to Art. 32(5a) and the procedure of Chapter III of Regulation (EU) 2025/327, from 26 March 2027.
2. Keep a single risk assessment and a single set of technical documentation where both acts require them (Arts. 13(4), 31(3) as amended).
3. Validate against the consolidated text once the Publications Office publishes it, and re-pin.

### A preview to a new line

When a proposal is adopted and published in the Official Journal: read the adopted text (not the proposal), add it as a line with its application date, make `oj-20241120` legacy once the amendment applies, and write an upgrade section with the changed articles.

## Preview: Digital Omnibus proposal COM(2025) 837

Posture: track. The proposal amends NIS2 and other acts, not Regulation (EU) 2024/2847. It would oblige ENISA to build a single-entry point for incident reporting that "may" build on the CRA single reporting platform, "without prejudice to Article 16" of the CRA (proposed NIS2 Art. 23a(1)), and it would make a manufacturer's severe-incident notification under CRA Art. 14(3) count as NIS2 reporting where it contains the information NIS2 requires (proposed NIS2 Art. 23(12)). Its explanatory memorandum says it leaves the underlying reporting requirements unchanged. As of 2026-10-05 the Publications Office lists no adopted act from it. Do not change CRA reporting for it; watch the procedure and the Commission CRA reporting page.

## Preview: public procurement proposal COM(2026) 590

Posture: track. The proposal would delete Art. 5 of Regulation (EU) 2024/2847 and construe references to it as references to Art. 68 of the new regulation on public contracts and concessions, which restates the procurement rules (essential requirements and vulnerability handling taken into account in procurement; Member States may add requirements for specific purposes). It does not change manufacturer obligations. Do not cite Art. 68 until the regulation is adopted and applies.
