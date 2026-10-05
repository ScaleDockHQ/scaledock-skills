# wai-aria

An agent skill for W3C WAI-ARIA 1.2: roles, states and properties, accessible names per AccName, the ARIA in HTML rules, and the ARIA Authoring Practices Guide (APG) keyboard and focus patterns, with upgrades from WAI-ARIA 1.1 and 1.0.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill wai-aria
```

Then ask your agent to "build an accessible combobox with ARIA" or "review the ARIA on our modal dialog and tabs".

## What it covers

- Native HTML first, and the roles and aria-\* attributes ARIA in HTML allows on each element.
- Role categories, abstract roles that are never used, required owned elements, context roles and required states.
- Supported, prohibited and global states and properties, hiding content, and live regions.
- Accessible name and description computation, step by step, and the APG naming rules.
- Keyboard and focus management for modal dialog, alert dialog, menu button, menu and menubar, combobox, listbox, tabs, disclosure, grid, tree view and alerts.
- Upgrading markup from WAI-ARIA 1.1 and 1.0, and which WAI-ARIA 1.3 names to reserve.

For the WCAG success criteria that ARIA markup helps meet, install the `wcag` skill: `npx skills add ScaleDockHQ/scaledock-skills --skill wcag`.

## Versions

| Line         | Status                |
| ------------ | --------------------- |
| WAI-ARIA 1.3 | preview (name)        |
| WAI-ARIA 1.2 | current               |
| WAI-ARIA 1.1 | legacy (upgrade from) |
| WAI-ARIA 1.0 | legacy (upgrade from) |
| AccName 1.2  | preview (build)       |
| AccName 1.1  | current               |
| ARIA in HTML | current               |

`references/versions.md` says what each line changed, how to upgrade from WAI-ARIA 1.1 and 1.0, and how far to rely on the WAI-ARIA 1.3 and AccName 1.2 drafts.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/): W3C Recommendation, 2023-06-06.
- [WAI-ARIA 1.1](https://www.w3.org/TR/wai-aria-1.1/): W3C Recommendation, 2017-12-14.
- [WAI-ARIA 1.0](https://www.w3.org/TR/wai-aria-1.0/): W3C Recommendation, 2014-03-20.
- [WAI-ARIA 1.3](https://www.w3.org/TR/wai-aria-1.3/): W3C Working Draft, 2026-06-04, and the [editor's draft](https://w3c.github.io/aria/) of 2026-10-02.
- [AccName 1.2](https://www.w3.org/TR/accname-1.2/): W3C Working Draft, 2026-10-02.
- [AccName 1.1](https://www.w3.org/TR/accname-1.1/): W3C Recommendation, 2018-12-18.
- [ARIA in HTML](https://www.w3.org/TR/html-aria/): W3C Recommendation, 2026-08-11.
- [Using ARIA](https://www.w3.org/TR/using-aria/): W3C Discontinued Draft, 2026-02-24, informative.
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/): W3C WAI resource, its pattern pages and practices pages as read on 2026-10-05.

## License

MIT
