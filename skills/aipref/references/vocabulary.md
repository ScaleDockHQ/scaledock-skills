# Vocabulary and serialization

Read this when deciding which preferences to state, writing a statement, or writing the parser that turns a statement into per-category outcomes. Source: `draft-ietf-aipref-vocab-08` (cited as §) and RFC 9651 for the Dictionary syntax, listed in [Sources](../SKILL.md#sources).

The vocabulary sections (§ 3, § 4) carry the note "This section does not yet have consensus". Build to them, and expect changes.

## Terms (§ 2)

- **Asset**: a digital file or stream of data, usually with associated metadata.
- **Declaring party**: the entity that expresses a preference about an asset.
- **Generative AI model**: a model used, or made available for use, to generate synthetic content in one or more modalities. It does not include a model used for classification, ranking or scoring, even one that generates a rationale for its output.

## Data model (§ 3, § 5)

- A statement of preference is made about an asset. It assigns allow or disallow to some, all or none of the categories (§ 3).
- After processing, each category has one of three values: allowed, disallowed or unknown. With no statement at all, every category is unknown (§ 3).
- An explicit allow or disallow for a category is the outcome; otherwise the outcome is unknown. There is no inheritance between categories (§ 5). Earlier revisions had a parent fallback; see [`versions.md`](versions.md).
- A consumer can assign a default for unknown. The draft takes no position on what that default is (§ 5).
- Several declaring parties can each make statements about the same asset; combining is in [`processing.md`](processing.md) (§ 3, § 5.1).

## Categories (§ 4)

The categories describe concrete, observable outcomes, not implementation details (§ 4).

| Category    | Label      | Covers                                                                                                                 | Excludes                                                                                                    |
| ----------- | ---------- | ---------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| AI Training | `train-ai` | Using an asset to modify the learned parameters of a generative AI model (§ 4.1).                                      | Training models used for exclusively non-generative tasks, even if capable of generation.                   |
| AI Use      | `ai-use`   | Using an asset as input to a generative AI model, where the user did not directly provide the asset (§ 4.2).           | Anything in AI Training. Open issue 249: whether referencing an asset by URL counts as "directly provided". |
| Search      | `search`   | Using an asset in an application whose primary purpose is to select assets and direct users to their location (§ 4.3). | Using assets to generate summaries.                                                                         |

### Search conditions and override (§ 4.3)

Search only applies when both hold:

- presenting the asset in search output includes a direct reference or link to the original location it was retrieved from;
- excerpts shown from the asset serve to help users judge the relevance of the result.

Displaying titles or excerpts, and accessibility changes such as translation, transcription or text-to-speech, are included. Allowing Search allows any processing internal to the search application, including training and using AI models, as long as the models and their outputs are used only in ways that meet the conditions above.

Search overrides any usage that falls into other categories, including AI Training and AI Use. In practice: decide first whether a use qualifies as Search; if it does, the `search` outcome governs it.

### Trained models (§ 3.3, under discussion)

Compliance with training preferences also includes conveying the preferences associated with training assets along with a model when it is distributed, either the full range of preferences or what uses are consistent with them. Issue 245 is open on whether this section stays; treat it as guidance to track, not a settled requirement.

### Extensions (§ 4.4, § 7)

- Extensions to the vocabulary are defined in a standards-track RFC that updates the draft, and MUST define how overlaps between categories are resolved (§ 4.4).
- Larger data models that embed these terms are not bound by the RFC rule, but must avoid overlapping categories (§ 4.4).
- An alternative format must define the mapping to and from this model; the mapping can be partial, for example by stating that unmapped categories are unknown (§ 7).

## Serialization (§ 6)

The exemplary format is a Structured Fields Dictionary (RFC 9651 § 3.2): keys are category labels, values are the Tokens `y` (allow) or `n` (disallow) (§ 6, § 6.2).

```text
train-ai=n, ai-use=n, search=y
```

- Labels are case sensitive (§ 6.1). Dictionary keys cannot contain uppercase characters at all (RFC 9651 § 3.2), so `Train-AI=n` fails to parse.
- Labels for new categories may only use `a-z`, `0-9`, `_`, `-`, `.` and `*` (§ 6.1), the RFC 9651 key characters; an RFC 9651 key must also start with `a-z` or `*` (RFC 9651 § 4.2.3.3).
- The format is bytes, limited to ASCII; formats that carry strings decode and encode it with ASCII or UTF-8 (§ 6.3).
- Unknown labels MUST be ignored, and unknown parameters MUST be ignored. New syntax extensions need an RFC that updates the draft (§ 6.4).

## Processing algorithm (§ 6.5)

1. Parse the bytes as an RFC 9651 Dictionary (RFC 9651 § 4.2.2).
2. For each category in Table 1 (`train-ai`, `ai-use`, `search`), look up its label and ignore any parameters.
3. Token `y` gives allow; Token `n` gives disallow; anything else gives unknown.

"Anything else" covers an absent key, a value that is not a Token, and a Token other than `y` or `n`. None of these is an error (§ 6.5).

### Edge cases

| Input                                        | Result                                                                                        |
| -------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `train-ai=n, search=y`                       | `train-ai` disallowed, `search` allowed, `ai-use` unknown.                                    |
| `train-ai`                                   | Unknown: a bare key is Boolean true, not a Token (RFC 9651 § 3.2, § 4.2.2).                   |
| `train-ai="n"`                               | Unknown: a String, not a Token.                                                               |
| `train-ai=no`                                | Unknown: a Token other than `y` or `n`.                                                       |
| `train-ai=y, train-ai, search=n, search="n"` | All unknown: the last value of each key wins, and neither is a Token (§ 6.5.1).               |
| `train-ai;allow=n, train-ai=y`               | `train-ai` allowed, with no parameters; only the selected value's parameters apply (§ 6.5.2). |
| `TRAIN-AI=n` or `train-ai=n,`                | Parse failure, so every category is unknown (§ 6.5.1; RFC 9651 § 4.2.2 trailing comma).       |
| `bots=n, train-genai=n`                      | All unknown: legacy labels are unknown labels and are ignored (§ 6.4).                        |

## TypeScript: from a parsed Dictionary to outcomes

Use an RFC 9651 parser for step 1; the draft relies on its exact rules (§ 6.5). This maps its output to outcomes.

```ts
type Outcome = "allowed" | "disallowed" | "unknown";
type Category = "train-ai" | "ai-use" | "search";
const CATEGORIES: readonly Category[] = ["train-ai", "ai-use", "search"];

// Shape most RFC 9651 parsers return: key -> [bare item or inner list, parameters].
type SfToken = { type: "token"; value: string };
type SfDictionary = Map<string, [unknown, Map<string, unknown>]>;

function isToken(v: unknown): v is SfToken {
  return typeof v === "object" && v !== null && (v as SfToken).type === "token";
}

export function toOutcomes(
  dict: SfDictionary | null,
): Record<Category, Outcome> {
  const result = {
    "train-ai": "unknown",
    "ai-use": "unknown",
    search: "unknown",
  } as Record<Category, Outcome>;
  if (dict === null) return result; // parse failure: everything unknown
  for (const category of CATEGORIES) {
    const member = dict.get(category);
    if (!member || !isToken(member[0])) continue;
    if (member[0].value === "y") result[category] = "allowed";
    else if (member[0].value === "n") result[category] = "disallowed";
  }
  return result;
}
```

Adapt `isToken` to the parser in use; some return a `Token` class instead of a tagged object.
