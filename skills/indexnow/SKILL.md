---
name: indexnow
description: >-
  IndexNow: To submit a URL using an HTTP request (replace with the URL provided by the search engine), issue your request to the following URL: Covers IndexNow. Use when notifying search engines of URL changes. Triggers: IndexNow.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# IndexNow

To submit a URL using an HTTP request (replace with the URL provided by the search engine), issue your request to the following URL:

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when notifying search engines of URL changes.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: IndexNow (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **document.** "URL must be URL-escaped and encoded and please make sure that your URLs follow the RFC-3986 standard for URIs."
2. **document.** "Your-key should have a minimum of 8 and a maximum of 128 hexadecimal characters."
3. **document.** "A successful request will return an HTTP 200 response code; if you receive a different response, you should verify your request and if everything looks fine, resubmit your request."
4. **document.** "Verifying ownership via the key To submit URLs, you must "prove" ownership of the host for which URLs are being submitted by hosting at least one text file within the host."
5. **document.** "Only you and the search engines should know the key and your file key location."
6. **document.** "You must host a UTF-8 encoded text key file {your-key}.txt listing the key in the file at the root directory of your website."
7. **document.** "For instance for the previous examples, you will need to host your UTF-8 key file at https://www.example.com/ .txt and this file must contain the key Option 2 Hosting a text key file within your host."
8. **document.** "You can also host one to many UTF-8 encoded text key files in other locations within the same host and you must tell search engines the location of this text key file in each IndexNow notification by specifying the location using the keyLocation variable."

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

- [IndexNow](https://www.indexnow.org/documentation): Documentation, IndexNow, fetched 2026-10-06 (Documentation, 2026-10-06), checked 2026-10-06.
