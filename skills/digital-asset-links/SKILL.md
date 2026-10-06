---
name: digital-asset-links
description: >-
  Digital Asset Links: publish assetlinks.json statements that link an Android app to a website. Covers Digital Asset Links. Use when publishing an assetlinks.json statement. Triggers: Digital Asset Links.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.1"
  kind: standard
---

# Digital Asset Links

The Digital Asset Links protocol and API enable an app or website to make public,

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when publishing an assetlinks.json statement.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: Digital Asset Links (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **Overview.** "Here are some possible uses for Digital Asset Links: Website A declares that links to its site should open in a designated app on mobile devices, if the app is installed."
2. **Quick usage example.** "Here's a very simplified example of how the website www.example.com could use Digital Asset Links to specify that any links to URLs in that site should open in a designated app rather than the browser: The website www.example.com publishes a statement list at https://www.example.com/.well-known/assetlinks.json."
3. **Quick usage example.** "The intent filter includes a special attribute android:autoVerify , new to Android M, which indicates that Android should verify the statement on the website described in the intent filter when the app is installed."
4. **Important considerations and limitations:.** "The protocol does not natively perform any statement actions; rather, it enables the ability to expose statements, which a consuming application must validate and then decide whether and how to act upon."

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

- [Digital Asset Links](https://developers.google.com/digital-asset-links/v1/getting-started): Documentation, Digital Asset Links, fetched 2026-10-06 (Documentation, 2026-10-06), checked 2026-10-06.
