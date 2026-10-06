---
name: web-app-manifest
description: >-
  Web Application Manifest: This specification defines a JSON-based file format that provides developers with a centralized place to put metadata associated with a web application. Covers Web Application Manifest (track). Use when writing or parsing a web app manifest. Triggers: web app manifest, manifest.webmanifest.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# Web Application Manifest

This specification defines a JSON-based file format that provides developers with a centralized place to put metadata associated with a web application. This metadata includes, but is not limited to, the web application's name, links to icons, as well as the preferred URL to open when a user launches the web application. The manifest also allows developers to declare a default screen orientation for their web application, as well as providing the ability to set the display mode for the application (e.g., in fullscreen). Additionally, the manifest allows a developer to "scope" a web application to a URL. This restricts the URLs to which the manifest is applied and provides a means to "deep li

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when writing or parsing a web app manifest.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: Web Application Manifest (default, posture track). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **1.9.** "This means that the user agent MUST return the orientation to the default screen orientation any time the orientation is unlocked [ SCREEN-ORIENTATION ] or the top-level traversable is navigated ."
2. **1.11.** "When the user agent sees a manifest with an identity that does not correspond to an already-installed application, it SHOULD treat that manifest as a description of a distinct application, even if it is served from the same URL as that of another application."
3. **1.11.** "When the user agent sees a manifest where manifest ["id"] is equal (with exclude fragments OPTIONALLY set to true) to the identity of an already-installed application, it SHOULD be used as a signal that this manifest is a replacement for the already-installed application's manifest, and not a distinct application, even if it is served from a different URL than the one seen previously."
4. **1.12.** "However, the user agent SHOULD NOT override the default theme color via a meta element whose name attribute is "theme-color" for documents ' URL are not within scope , since the application has no control over these documents."
5. **1.13.** "The background_color member is only meant to improve the user experience while a web application is loading and MUST NOT be used by the user agent as the background color when the web application's stylesheet is available."
6. **1.14.** "A user agent SHOULD expose shortcuts via interactions that are consistent with exposure of an application icon's context menu in the host operating system (e.g., right click, long press)."
7. **1.14.** "A user agent SHOULD render the shortcuts in the same order as they are provided in the manifest."
8. **1.14.** "A user agent SHOULD represent the shortcuts in a manner consistent with exposure of an application icon's context menu in the host operating system."

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

- [Web Application Manifest](https://www.w3.org/TR/appmanifest/): Working Draft, appmanifest WD-appmanifest-20260813 (Working Draft, 2026-08-13), checked 2026-10-06.
- [Web App Manifest - Application Information](https://www.w3.org/TR/manifest-app-info/): Note, manifest-app-info (Note, 2023-08-21), checked 2026-10-06.
