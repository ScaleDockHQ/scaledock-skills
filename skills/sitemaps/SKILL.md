---
name: sitemaps
description: >-
  Sitemaps: The Sitemap protocol format consists of XML tags. Covers Sitemaps 0.9. Use when publishing a sitemap. Triggers: sitemaps.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.1"
  kind: standard
---

# Sitemaps

The Sitemap protocol format consists of XML tags. All data values in a Sitemap must

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when publishing a sitemap.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: Sitemaps 0.9 (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **document.** "All data values in a Sitemap must be entity-escaped ."
2. **document.** "The Sitemap must: Begin with an opening < urlset > tag and end with a closing </urlset> tag."
3. **document.** "Also, all URLs in a Sitemap must be from a single host, such as www.example.com or store.example.com."
4. **document.** "This URL must begin with the protocol (such as http) and end with a trailing slash, if your web server requires it."
5. **document.** "This value must be less than 2,048 characters."
6. **document.** "This date should be in W3C Datetime format."
7. **document.** "Note that the date must be set to the date the linked page was last modified, not when the sitemap is generated."
8. **document.** "Valid values are: always hourly daily weekly monthly yearly never The value "always" should be used to describe documents that change each time they are accessed."

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

- `robots-txt`, when the work also follows that specification: `npx skills add ScaleDockHQ/scaledock-skills --skill robots-txt`

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [Sitemaps 0.9](https://www.sitemaps.org/protocol.html): Protocol, Sitemaps protocol, fetched 2026-10-06 (Protocol, 2026-10-06), checked 2026-10-06.
