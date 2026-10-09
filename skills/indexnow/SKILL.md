---
name: indexnow
description: >-
  IndexNow: notify search engines when site URLs are added, updated or deleted. Covers IndexNow. Use when notifying search engines of URL changes. Triggers: IndexNow.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.1.0"
  kind: standard
---

# IndexNow

IndexNow is a protocol for telling participating search engines that URLs on a site were added, updated or deleted. A site submits URLs with a GET request or a JSON POST to a search engine's `/indexnow` endpoint and proves ownership of the host with a key file. This skill quotes the protocol documentation published at indexnow.org.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text, labelled with the section they come from. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: Site, CMS or plugin submitting URLs to IndexNow, or a search engine receiving IndexNow submissions.
- Target version: IndexNow (current). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher for a newer revision or version line.

## Invariants

1. **Submitting One URL.** "URL must be URL-escaped and encoded and please make sure that your URLs follow the RFC-3986 standard for URIs."
2. **Submitting One URL.** "Your-key should have a minimum of 8 and a maximum of 128 hexadecimal characters. The key can contain only the following characters: lowercase characters (a-z), uppercase characters (A-Z), numbers (0-9), and dashes (-)."
3. **Submitting One URL.** "A successful request will return an HTTP 200 response code; if you receive a different response, verify that you don't submit too often, that the key and URL are valid and resubmit the request. The HTTP 200 response code only indicates that the search engine has received your URL."
4. **Submitting set of URLs.** "You can submit up to 10,000 URLs per post, mixing http and https URLs if needed."
5. **Verifying ownership via the key.** "To submit URLs, you must "prove" ownership of the host for which URLs are being submitted by hosting at least one text file within the host."
6. **Verifying ownership via the key, Option 1.** "You must host a UTF-8 encoded text key file {your-key}.txt listing the key in the file at the root directory of your website."
7. **Verifying ownership via the key, Option 2.** "You can also host one to many UTF-8 encoded text key files in other locations within the same host and you must tell search engines the location of this text key file in each IndexNow notification by specifying the location using the keyLocation variable."
8. **Verifying ownership via the key, Option 2.** "In this option 2, the location of a key file determines the set of URLs that can be included with this key."
9. **Response format, 422 Unprocessable Entity.** "In case of URLs which don't belong to the host or the key is not matching the schema in the protocol"
10. **Requirement for search engines.** "Search engines adopting the IndexNow protocol agree that submitted URLs will be automatically shared with all other participating search engines."

## Workflow

1. **Pick the version.** Use the current line unless a named consumer needs a supported one. Do not author a legacy line. Emit a preview only when its posture is build and the user asked for that draft.
   -> [`references/versions.md`](references/versions.md)
   ✓ The target version is recorded, and it is not a legacy line.
2. **Apply the pinned requirements.** Walk the quotes in [`references/requirements.md`](references/requirements.md) and implement each one that applies to the role.
   -> [`references/requirements.md`](references/requirements.md)
   ✓ Each applicable quote is either implemented or recorded as out of scope for the role, with the section it came from.
3. **Upgrade** (only when asked). Follow the upgrade section from the source line to the target.
   -> [`references/versions.md`](references/versions.md)
   ✓ The result cites the target line and no longer depends on a requirement that only the old line stated.

## Verify before done

- [ ] The artifact cites the target line's revision from [Sources](#sources).
- [ ] Every applicable quoted requirement in [`references/requirements.md`](references/requirements.md) holds.
- [ ] The key file is reachable at the root (or at the submitted `keyLocation`), is UTF-8, and contains the submitted key.
- [ ] Nothing from a preview line is emitted unless its posture is build and the user opted in.

## Reference index

- **`references/versions.md`**: every version line, which one to use, and how to upgrade. Load for steps 1 and 3.
- **`references/requirements.md`**: quotes taken from the pinned specification, grouped by source. Load for step 2.

## Related skills

Install related spec skills by name with `npx skills add ScaleDockHQ/scaledock-skills --skill <name>`: `sitemaps`, `robots-txt`, `uri`, `http-semantics`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [IndexNow Documentation](https://www.indexnow.org/documentation): Protocol documentation, indexnow.org, read 2026-10-06, checked 2026-10-06.
