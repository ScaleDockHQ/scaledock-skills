# Versions and upgrades

Read this when choosing a target revision, meeting a statement or robots.txt file written against an earlier revision, or upgrading one. Sources: every revision of `draft-ietf-aipref-vocab` from -00 to -08, `draft-ietf-aipref-attach` -00, -04 and -05 (compared against -01 to -03 while writing), and both datatracker pages, listed in [Sources](../SKILL.md#sources).

Bare section numbers prefixed "vocab" or "attach" refer to the current revisions, `draft-ietf-aipref-vocab-08` and `draft-ietf-aipref-attach-05`. Sections of older revisions carry the revision, for example (vocab-04 § 4.1).

## Version lines

The two drafts are versioned separately, so each is its own family with one current line. Neither is an RFC; following the repository convention for draft-only specifications, the latest revision of each is `current` with posture build. Revisions that share labels and syntax are grouped into one line; a new line starts where labels or the attachment syntax broke.

| Id          | Line                              | Status  | Revision                                             | Posture | Summary                                                                                                    |
| ----------- | --------------------------------- | ------- | ---------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------- |
| `vocab-08`  | draft-ietf-aipref-vocab-08        | current | `draft-ietf-aipref-vocab-08` (2026-09-14)            | build   | Flat vocabulary: `train-ai`, `ai-use`, `search`; search overrides the others; no hierarchy fallback.       |
| `vocab-05`  | draft-ietf-aipref-vocab-05 to -07 | legacy  | -05 (2025-12-01), -06 (2026-04-28), -07 (2026-08-19) |         | Two categories, `train-ai` and `search`; no `ai-use`.                                                      |
| `vocab-03`  | draft-ietf-aipref-vocab-03 to -04 | legacy  | -03 (2025-09-05), -04 (2025-10-28)                   |         | Hierarchy under `bots` (Automated Processing); `train-genai` in -03, `ai-output` in -04.                   |
| `vocab-02`  | draft-ietf-aipref-vocab-02        | legacy  | -02 (2025-07-21)                                     |         | Hierarchy under `all`; `train-ai`, `train-genai`, `ai-use`, `search`.                                      |
| `vocab-01`  | draft-ietf-aipref-vocab-00 to -01 | legacy  | -00 (2025-05-01), -01 (2025-06-19)                   |         | Hierarchy under `tdm`; `ai`, `genai`, `search`, `inference` (labels from -01; -00 had no serialization).   |
| `attach-05` | draft-ietf-aipref-attach-05       | current | `draft-ietf-aipref-attach-05` (2026-08-19)           | build   | `Content-Usage` header field plus path-scoped robots.txt `Content-Usage` rules with longest-match.         |
| `attach-00` | draft-ietf-aipref-attach-00       | legacy  | `draft-ietf-aipref-attach-00` (2025-06-16)           |         | At most one path-less `Content-Usage` line per robots.txt group, with its own multi-group selection rules. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

The datatracker, read 2026-10-05, lists -08 and -05 as the latest revisions, both in state "WG Document", with intended status Proposed Standard. The charter milestone for sending both to the IESG was August 2026. The only other drafts associated with the working group are individual drafts that it has not adopted (for example `draft-thomson-aipref-sup`, `draft-madhavan-aipref-displaybasedpref`); this skill does not cover them and they are not version lines.

Attach -01 to -04 use the same path-scoped rule and header as -05, so they are not separate lines; their differences are listed under What changed.

## Which version to use

- Publish `draft-ietf-aipref-vocab-08` labels, attached as `draft-ietf-aipref-attach-05` specifies. Posture build: implement exactly what the pinned text says, and re-check the datatracker before shipping, because both drafts say they do not reflect consensus (vocab "Note to Readers").
- No line is supported. Treat every earlier revision as input to an upgrade.
- A vocab-08 consumer that meets a legacy label ignores it, because unknown labels MUST be ignored (vocab § 6.4). So a legacy statement such as `bots=n` or `all=n` yields unknown for every category. The current text defines no mapping for retired labels; any mapping a consumer applies is its own policy, and should be documented as such.

## What changed

### draft-ietf-aipref-vocab-08 (from -07)

- New AI Use category, label `ai-use`: using an asset as input to a generative AI model where the asset is not directly provided by the user; excludes uses covered by AI Training (vocab § 4.2). Issue 249 is open on whether "direct" includes referencing assets by URL.
- AI Model Training is renamed AI Training (label `train-ai` unchanged) and now relies on a defined term, generative AI model, which excludes models used for classification, ranking or scoring; training of models for exclusively non-generative tasks is excluded (vocab § 2, § 4.1).
- Search now overrides any usage that falls into other categories, including AI Training and AI Use (vocab § 4.3). The accessibility text is shortened, and the -07 sentence that existing snippet-size controls apply first is gone.
- New § 3.3, Communicating Preferences with Trained Models: conveying preferences along with a distributed model is part of compliance with training preferences. Issue 245 is open on whether this section stays.
- Alternative Formats moves from § 6.6 to § 7; Security Considerations to § 8.

### draft-ietf-aipref-vocab-05 to -07

- -05 removes Automated Processing (`bots`) and AI Output (`ai-output`), leaving Foundation Model Production (`train-ai`: training or fine-tuning a foundation model) and Search (`search`) (vocab-05 § 4.1, § 4.2). Search requires a link to the location and verbatim excerpts only; an asset can be used in ranking without appearing in the output (vocab-05 § 4.2).
- -05 and -06 keep the subset fallback in "Applying Statements of Preference" (vocab-05 § 5 step 2), but no remaining category is a subset of another, so it never fires. -07 removes it (vocab-07 § 5).
- -06 renames the category AI Model Training (an AI model that can generate content) and rewrites Search: the application's primary purpose is to select assets and direct users to them, summaries are excluded, and accessibility changes are included (vocab-06 § 4.1, § 4.2). -06 also replaces the Conformance and Applicability sections with Understanding Preferences and Applying Preferences (vocab-06 § 3.1, § 3.2).
- -07 adds the duplicate-key and parameter rules (vocab-07 § 6.5.1, § 6.5.2).

### draft-ietf-aipref-vocab-03 to -04

- -03 labels: `bots` (Automated Processing, the superset of all others), `train-ai` (AI Training, any machine learning), `train-genai` (Generative AI Training, a subset of AI Training) and `search` (vocab-03 § 4, § 6.1). `ai-use` from -02 is removed.
- -03 Search applies "regardless of what other preferences are stated" to the search parts of an application (vocab-03 § 4.4).
- -04 labels: `bots`, `train-ai` redefined as Foundation Model Production, `ai-output` (AI Output: assets used in an AI system to generate outputs, including search results), and `search` as a refinement of AI Output (vocab-04 § 4.1 to § 4.4). `train-genai` is removed.
- In both, an unstated category falls back to its parent: `train-genai` to `train-ai` to `bots` in -03; `search` to `ai-output` to `bots` in -04 (vocab-03 § 5, vocab-04 § 5).

### draft-ietf-aipref-vocab-02

- Labels: `all` (Automated Processing), `train-ai` (AI Training), `train-genai` (Generative AI Training), `ai-use` (AI Use: input to a trained model during its operation) and `search` (vocab-02 § 4, § 6.1).
- Every category is a subset of `all`, and `train-genai` of `train-ai`; unstated categories fall back to the parent (vocab-02 § 4, § 7).

### draft-ietf-aipref-vocab-00 to -01

- -00 ("Opt-Out Vocab") defines TDM, AI Training and Generative AI Training as a hierarchy, with no serialization (vocab-00 § 5, § 5.2).
- -01 adds labels `tdm`, `ai`, `genai`, `search` and `inference`, with `ai` under `tdm` and `genai` under `ai` (vocab-01 § 4, § 6.1), and the subset fallback (vocab-01 § 7).

### draft-ietf-aipref-attach-05 (from -01 to -04)

- -01 replaces the -00 group-level directive with zero or more path-scoped `Content-Usage` rules per group, extending the RFC 9309 `rule` production, matched with the Allow and Disallow longest-match (attach-01 § 3, § 3.1).
- -02 changes the examples from `ai=n` to `train-ai=n`, and adds the two-stage acquisition and usage model and the time-of-fetch rule (attach § 3.1, § 3.3).
- -03 defines the header as representation metadata applying to the content, not the resource (attach § 2).
- -05 drops the -04 requirement that servers MUST retain preferences attached to request content that later answers requests; servers now can use them (attach § 2). It also notes that `#` always starts a comment because fragments cannot appear in robots.txt paths (attach § 3.2).
- -05 cites `draft-ietf-aipref-vocab-07`, not -08; see the cross-reference notes in [`processing.md`](processing.md).

### draft-ietf-aipref-attach-00

- One optional `Content-Usage` line per group, placed after the user-agent lines and before the rules, with no path (attach-00 § 3).
- Multi-group selection of its own: consider all groups matching the product token (else all `*` groups), drop groups that disallow the resource, and take the preference from the group with the longest matching Allow rule (attach-00 § 3.1).

## Upgrading

Every upgrade ends with the same checks: the new value parses as an RFC 9651 Dictionary under vocab-08, contains only `train-ai`, `ai-use` and `search`, and each intent of the old statement is either kept or listed as not expressible. Silent changes in meaning are regressions.

### vocab-05 to vocab-08

1. Keep `train-ai` and `search`; the labels are unchanged.
2. Check `train-ai` scope. In vocab-08 it covers only generative AI models (vocab § 2, § 4.1); -05 covered foundation models. A preference about non-generative training has no vocab-08 category.
3. Decide `ai-use`. It is new: say `y` or `n` if the declaring party has a view on assets used as input to generative models (vocab § 4.2); otherwise leave it unknown.
4. Re-read `search=y` with the override in mind: it allows qualifying search use, including model training inside the search application, even when `train-ai=n` (vocab § 4.3).

### vocab-03 to vocab-08

1. Remove `bots`. vocab-08 has no category for all automated processing. If the intent was "disallow everything", write `train-ai=n, ai-use=n, search=n` and record that other uses are not expressible; use robots.txt Disallow when crawling itself must stop.
2. Replace -03 `train-genai` with `train-ai`.
3. -03 `train-ai` covered all machine learning; vocab-08 `train-ai` covers only generative models. Keep the label, and record that non-generative training is no longer expressible.
4. Replace -04 `ai-output` with `ai-use` where the intent was generative output from the asset. -04 AI Output also covered search results and the training behind them; express those with `search`.
5. Drop reliance on fallback. A child category that was unstated and inherited its parent must now be stated explicitly.

### vocab-02 to vocab-08

1. Remove `all` and handle it as `bots` above.
2. Replace `train-genai` with `train-ai`, and check the old `train-ai` (any machine learning) as in the -03 steps.
3. Keep `ai-use`, and check scope: -02 covered input to any trained model; vocab-08 covers generative models only, excluding user-provided assets (vocab § 4.2).
4. Keep `search`, and state children explicitly instead of relying on fallback from `all`.

### vocab-01 to vocab-08

1. Remove `tdm`; handle it as `bots` above.
2. Replace `genai` with `train-ai`. Treat `ai` (any AI training) as in the -03 steps.
3. Replace `inference` with `ai-use`, checking the generative-only and user-provided exclusions (vocab § 4.2).
4. Keep `search`, and re-read its vocab-08 conditions (vocab § 4.3).

### attach-00 to attach-05

1. Move each group's `Content-Usage` value into a rule with no path, which applies to every crawlable path of that group (attach § 3, § 3.2).
2. Where several groups for the same crawler existed only to vary preferences, merge them into one group with path-scoped `Content-Usage` rules; RFC 9309 merges matching groups anyway (RFC 9309 § 2.2.1).
3. Upgrade the labels (`ai` and others) with the vocab steps above.
4. Re-check every sample path with the attach § 3.4 table method: crawl decision first, then the longest-matching `Content-Usage` rule.

## Preview

None. Neither family has a published next line beyond the current revisions. When a new revision appears: make it current in its family, move the old current to legacy if labels or syntax broke (otherwise just update the pin), and add an upgrade section. When either draft becomes an RFC, the RFC becomes current with no posture.
