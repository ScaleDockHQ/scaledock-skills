---
name: url
description: >-
  URL: The URL Standard defines URLs, domains, IP addresses, the application/x-www-form-urlencoded format, and their API. Covers URL Living Standard. Use when parsing or serializing URLs. Triggers: URL, URL parser.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# URL

The URL Standard defines URLs, domains, IP addresses, the application/x-www-form-urlencoded format, and their API.

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when parsing or serializing URLs.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: URL Living Standard (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **URL.** "Developers should refer to the Living Standard for the most current error corrections and other developments."
2. **2. Security considerations.** "In particular, B should never trust A , as at some point URLs from A can come from untrusted sources."
3. **3.2. Host miscellaneous.** "github.io github.io null whatwg.github.io github.io whatwg.github.io إختبار xn--kgbechtv null example.إختبار xn--kgbechtv example.xn--kgbechtv sub.example.إختبار xn--kgbechtv example.xn--kgbechtv [2001:0db8:85a3:0000:0000:8a2e:0370:7334] null null Specifications should prefer the origin concept for security decisions."
4. **3.4. Host writing.** "A valid host string must be a valid domain string , a valid IPv4-address string , or: U+005B ([), followed by a valid IPv6-address string , followed by U+005D (])."
5. **3.4. Host writing.** "A valid domain string must be a string that is a valid domain ."
6. **3.4. Host writing.** "A valid IPv4-address string must be four shortest possible strings of ASCII digits , representing a decimal number in the range 0 to 255, inclusive, separated from each other by U+002E (.)."
7. **3.4. Host writing.** "A valid IPv6-address string must be one of the following: a valid IPv6-pieces string with effective piece length 8."
8. **3.4. Host writing.** "[RFC5952] A valid opaque-host string must be one of the following: one or more URL units excluding forbidden host code points U+005B ([), followed by a valid IPv6-address string , followed by U+005D (])."

## Workflow

1. **Pick the version.** Use the current line unless a named consumer needs a supported one. Do not author a legacy line. Emit a preview only when its posture is build and the user asked for that draft.
   -> [`references/versions.md`](references/versions.md)
   ✓ The target version is recorded, and it is not a legacy line.
2. **Apply the pinned requirements.** Walk the quotes in [`references/requirements.md`](references/requirements.md) and implement each one that applies to the role.
   -> [`references/requirements.md`](references/requirements.md)
   ✓ Each applicable quote is either implemented or recorded as out of scope for the role, with the heading it came from.
3. **Upgrade** (only when asked). Follow the upgrade section from the source line to the target.
   -> [`references/versions.md`](references/versions.md)
   ✓ The result cites the target line and no longer depends on a requirement that only the old line stated.

## Verify before done

- [ ] The artifact cites the target line's revision from [Sources](#sources).
- [ ] Every applicable quoted requirement in [`references/requirements.md`](references/requirements.md) holds.
- [ ] Nothing from a preview line is emitted unless its posture is build and the user opted in.

## Reference index

- **`references/versions.md`**: every version line, which one to use, and how to upgrade. Load for steps 1 and 3.
- **`references/requirements.md`**: quotes taken from the pinned specification. Load for step 2.

## Related skills

Install related spec skills by name with `npx skills add ScaleDockHQ/scaledock-skills --skill <name>`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [URL Living Standard](https://url.spec.whatwg.org/review-drafts/2026-08/): Review Draft, Review Draft 2026-08 (Review Draft, 2026-08), checked 2026-10-06.
