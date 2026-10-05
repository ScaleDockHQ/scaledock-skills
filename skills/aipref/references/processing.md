# Processing and applying preferences

Read this when building the consumer side, such as a crawler, AI agent, training pipeline or search indexer, or when reviewing what preferences can and cannot do. Sources: `draft-ietf-aipref-vocab-08` (cited as vocab §), `draft-ietf-aipref-attach-05` (cited as attach §), RFC 9309 and RFC 9651, listed in [Sources](../SKILL.md#sources).

## Consumer algorithm

For each asset fetched over HTTP:

1. **robots.txt.** Use the robots.txt that is current at fetch time (attach § 3.3). Select the group for your product token: the merged matching groups, else the `*` group, else none (RFC 9309 § 2.2.1). If Allow and Disallow forbid the path, do not fetch it; it has no preferences anyway (attach § 3.1).
2. **robots.txt statement.** Among the group's `Content-Usage` rules, take the one with the longest matching path, counted in bytes of the encoded path (attach § 3.1). If several rules share that longest path, keep all of them as separate statements (attach § 3.1). Extract each statement as in [`attachment.md`](attachment.md) (attach § 3.2).
3. **Header statement.** Combine all `Content-Usage` field lines on the response and parse them as one Dictionary (RFC 9651 § 4.2). A failed parse is ignored, as if the field were absent (RFC 9651 § 4.2).
4. **Other statements.** Add statements from any other method you implement, such as embedded metadata. You can only apply methods you implement, and unknown methods leave you unaware of their preferences (vocab § 3.1).
5. **Outcomes per statement.** Map each statement to allowed, disallowed or unknown for `train-ai`, `ai-use` and `search` (vocab § 6.5). See [`vocabulary.md`](vocabulary.md).
6. **Combine.** For each category: any disallowed gives disallowed; else any allowed gives allowed; else unknown (vocab § 5.1).
7. **Classify the use.** Decide which category the intended use falls in. If it meets the Search conditions, the `search` outcome governs, overriding AI Training and AI Use (vocab § 4.3).
8. **Unknown.** Apply your own documented default; the draft takes no position (vocab § 5).
9. **Record** the outcome, the statements behind it and the robots.txt version, so that later uses of the stored asset can be checked against the preferences that applied when it was fetched (attach § 3.3).

## Precedence and conflicts

| Situation                                                   | Rule                                                                                                           |
| ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Header and robots.txt disagree                              | No method outranks another; combine most-restrictively (vocab § 5.1).                                          |
| Two robots.txt rules, different path lengths                | The longest match wins; this is selection, not combining (attach § 3.1).                                       |
| Two robots.txt rules, identical paths, conflicting values   | Both apply; combine most-restrictively, unlike Allow/Disallow ties (attach § 3.1; RFC 9309 § 2.2.2).           |
| Same key twice in one Dictionary                            | The last value wins (vocab § 6.5.1).                                                                           |
| `train-ai=n` and `search=y`, use is qualifying search       | Search overrides, so the use is allowed, including model training inside the search application (vocab § 4.3). |
| A contract explicitly permits a use the statement disallows | The arrangement likely applies, unless its terms say otherwise (vocab § 5.2).                                  |
| An extension adds qualifications to a category              | The extension's rules apply; it must define how overlaps resolve (vocab § 4.4, § 5.2).                         |

"Absent some other means of resolving conflicts" qualifies the most-restrictive rule (vocab § 5.1): a consumer with a documented other means, such as a contract, may resolve differently.

## TypeScript: combining outcomes

```ts
type Outcome = "allowed" | "disallowed" | "unknown";

export function combine(outcomes: readonly Outcome[]): Outcome {
  if (outcomes.includes("disallowed")) return "disallowed";
  if (outcomes.includes("allowed")) return "allowed";
  return "unknown";
}
```

Call it per category over every statement collected for the asset (vocab § 5.1).

## Limits: what preferences are not

- **Not enforcement or security.** Preferences are not a security mechanism (vocab § 8). The specifications do not ensure that preferences are followed, do not say if, how or when to follow them, and do not address the legal or contractual mechanisms that might require it (vocab § 3.2). Technical enforcement is out of the working group's charter.
- **The choice is the recipient's.** An entity that receives preferences chooses whether to follow them, and the draft does not determine how (vocab § 3.2).
- **Legal effect is outside the draft.** The vocabulary is meant for jurisdictions with and without legal obligations attached to preferences, without prejudice to applicable law, including copyright exceptions and limitations (vocab § 1).
- **Unknown source.** Unless a method identifies the declaring party, no assumption can be made about who made a statement. robots.txt only implies the server is the source, and the apparent source may be relaying others' preferences (vocab § 3.1). Authenticating clients and crawlers is also out of the charter.
- **Not access control for publishers.** To stop a crawler from fetching, use robots.txt Disallow, and to protect content, use real access control; robots.txt itself is not a security measure (RFC 9309 § 3).

## Security considerations

- Statements are text produced by potential adversaries. Parse them with the robustness guidance of RFC 9651 § 6 and RFC 9110 § 17 (attach § 4; vocab § 8).
- robots.txt may be up to 500 KiB, and the draft does not raise that limit (attach § 4). Crawlers must parse at least 500 KiB (RFC 9309 § 2.5).
- Treat robots.txt as untrusted content and reject out-of-range characters (RFC 9309 § 3).
- RFC 9651 parsers must support Dictionaries of at least 1024 members and keys of at least 64 characters (RFC 9651 § 3.2); bound anything larger.

## Known cross-reference errors in the drafts

These are inconsistencies between the pinned revisions. Follow the intent shown here, and re-check when either draft is revised.

- attach-05 cites `draft-ietf-aipref-vocab-07`, not -08 (attach § 6.1). The -08 changes (adding `ai-use`, the search override) are vocabulary-only and do not change the attachment syntax.
- attach § 3.1 sends conflicting identical-path rules to "Section 7.1 of [VOCAB]". In vocab-07 and vocab-08, Combining Preferences is § 5.1; § 7.1 was its number in vocab-01 and vocab-02.
- attach § 3.2 applies "Sections 6 and 7 of [VOCAB]". In vocab-08, § 6 is the serialization and processing algorithm and § 7 is Alternative Formats; the processing rules are § 6.5 and the combining rule is § 5.1.
- The prose of attach § 3.4 says ExampleBot gets "ai=y"; Figure 2 says `train-ai=y`.
- vocab-08's informative [ATTACH] reference gives the vocabulary's title and revision -00; the attachment draft is `draft-ietf-aipref-attach-05`, titled "Associating AI Usage Preferences with Content in HTTP".
