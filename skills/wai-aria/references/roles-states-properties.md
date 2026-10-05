# Roles, states and properties

Read this when choosing a role, checking which children and parents it needs, adding states and properties, hiding content, or reviewing markup for author errors. Section numbers are WAI-ARIA 1.2 unless marked otherwise. Role and attribute definitions live in §5.4 (roles) and §6.7 (states and properties) under the role or attribute name.

## How the role is chosen

- The `role` attribute is a token list. User agents use the first token that matches a non-abstract WAI-ARIA role; the rest are ignored (§4.1, §8.1).
- If no token matches a non-abstract role, the element is treated as if it had no role: `<table role="foo">` is exposed as a table (§9.1).
- An explicit role overrides the host language's implicit role, and the element then supports the states and properties of the new role (§4, §8.6). Host-language attributes with the same meaning take precedence over aria-\* attributes when both are present (§4, §8.5).
- Use ASCII lowercase for role tokens and token values (ARIA in HTML §4.4).

```html
<!-- One role. Fallback tokens add nothing in current browsers. -->
<div role="switch" aria-checked="false" tabindex="0">Night mode</div>
```

## Role categories

From §5.3. Authors use the concrete roles in the five usable categories; abstract roles exist only for the ontology.

| Category                    | Roles                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Abstract (§5.3.1)           | `command`, `composite`, `input`, `landmark`, `range`, `roletype`, `section`, `sectionhead`, `select`, `structure`, `widget`, `window`                                                                                                                                                                                                                                                                                                                  |
| Widget (§5.3.2)             | `button`, `checkbox`, `gridcell`, `link`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `option`, `progressbar`, `radio`, `scrollbar`, `searchbox`, `separator` (when focusable), `slider`, `spinbutton`, `switch`, `tab`, `tabpanel`, `textbox`, `treeitem`                                                                                                                                                                                        |
| Composite widget (§5.3.2)   | `combobox`, `grid`, `listbox`, `menu`, `menubar`, `radiogroup`, `tablist`, `tree`, `treegrid`                                                                                                                                                                                                                                                                                                                                                          |
| Document structure (§5.3.3) | `application`, `article`, `blockquote`, `caption`, `cell`, `columnheader`, `definition`, `deletion`, `directory`, `document`, `emphasis`, `feed`, `figure`, `generic`, `group`, `heading`, `img`, `insertion`, `list`, `listitem`, `math`, `meter`, `none`, `note`, `paragraph`, `presentation`, `row`, `rowgroup`, `rowheader`, `separator` (when not focusable), `strong`, `subscript`, `superscript`, `table`, `term`, `time`, `toolbar`, `tooltip` |
| Landmark (§5.3.4)           | `banner`, `complementary`, `contentinfo`, `form`, `main`, `navigation`, `region`, `search`                                                                                                                                                                                                                                                                                                                                                             |
| Live region (§5.3.5)        | `alert`, `log`, `marquee`, `status`, `timer`                                                                                                                                                                                                                                                                                                                                                                                                           |
| Window (§5.3.6)             | `alertdialog`, `dialog`                                                                                                                                                                                                                                                                                                                                                                                                                                |

Rules:

- Authors MUST NOT use abstract roles in content (§5.2.1, §5.3.1). `role="select"` is a typical mistake for `combobox` (ARIA in HTML §3.4).
- Authors SHOULD NOT use `generic`; it is the implicit role of `div` and `span`. Use `presentation` or `none` to remove semantics, or `group` for a named container (§5.4 generic).
- `directory` is deprecated; use a `list` (Appendix B; ARIA in HTML §4.3.1).
- Each `region` MUST have a brief label, and SHOULD be used only when no other landmark fits (§5.4 region).

## Required owned elements and context

An element with required owned elements must own at least one element of one listed role; it need not own one of each, and a subclass role does not count (§5.2.6). An element with a required context role MUST be contained in, or owned through `aria-owns` by, an element of that role (§5.2.7). Implicit HTML semantics satisfy both (§5.2.6, §5.2.7, §8.4). While required owned elements are missing during loading or script updates, authors MUST set `aria-busy="true"` on a containing element (§5.2.6; §6.7 aria-busy).

| Role                                            | Required owned elements (§5.2.6)                                               | Required context role (§5.2.7)          |
| ----------------------------------------------- | ------------------------------------------------------------------------------ | --------------------------------------- |
| `feed`                                          | `article`                                                                      |                                         |
| `grid`, `table`, `treegrid`                     | `row`, or `rowgroup` owning `row`                                              |                                         |
| `rowgroup`                                      | `row`                                                                          | `grid`, `table`, `treegrid`             |
| `row`                                           | `cell`, `columnheader`, `gridcell`, `rowheader`                                | `grid`, `rowgroup`, `table`, `treegrid` |
| `cell`, `columnheader`, `gridcell`, `rowheader` |                                                                                | `row`                                   |
| `caption`                                       |                                                                                | `figure`, `grid`, `table`, `treegrid`   |
| `list`                                          | `listitem`                                                                     |                                         |
| `listitem`                                      |                                                                                | `directory`, `list`                     |
| `listbox`                                       | `option`, or `group` owning `option`                                           |                                         |
| `option`                                        |                                                                                | `group`, `listbox`                      |
| `menu`, `menubar`                               | `menuitem`, `menuitemcheckbox`, `menuitemradio`, or `group` owning any of them |                                         |
| `menuitem`, `menuitemcheckbox`, `menuitemradio` |                                                                                | `group`, `menu`, `menubar`              |
| `radiogroup`                                    | `radio`                                                                        |                                         |
| `tablist`                                       | `tab`                                                                          |                                         |
| `tab`                                           |                                                                                | `tablist`                               |
| `tree`                                          | `treeitem`, or `group` owning `treeitem`                                       |                                         |
| `treeitem`                                      |                                                                                | `group`, `tree`                         |

User agents do not validate these relationships (§9.2), so a broken structure fails silently.

## Required states and properties

Authors MUST give required states and properties a non-empty value, and MUST NOT use `undefined` unless the attribute explicitly supports it (§5.2.2). A missing required attribute is an author error; user agents then use the fallback below (§8.6, §9.2).

| Role                                                               | Required (§5.4)                  | Fallback when missing (§9.2)                      |
| ------------------------------------------------------------------ | -------------------------------- | ------------------------------------------------- |
| `checkbox`, `radio`, `switch`, `menuitemcheckbox`, `menuitemradio` | `aria-checked`                   | `false`                                           |
| `combobox`                                                         | `aria-controls`, `aria-expanded` | no mapping; `false`                               |
| `heading`                                                          | `aria-level`                     | `2`                                               |
| `option`                                                           | `aria-selected`                  |                                                   |
| `scrollbar`                                                        | `aria-controls`, `aria-valuenow` | no mapping; `(aria-valuemax - aria-valuemin) / 2` |
| `slider`, `separator` (focusable)                                  | `aria-valuenow`                  | `(aria-valuemax - aria-valuemin) / 2`, clamped    |
| `meter`                                                            | `aria-valuenow`                  | the value of `aria-valuemin`                      |

## Supported, prohibited and global attributes

- Global states and properties apply to every element unless a role prohibits them (§6.5): `aria-atomic`, `aria-busy`, `aria-controls`, `aria-current`, `aria-describedby`, `aria-details`, `aria-dropeffect`, `aria-flowto`, `aria-grabbed`, `aria-hidden`, `aria-keyshortcuts`, `aria-label`, `aria-labelledby`, `aria-live`, `aria-owns`, `aria-relevant`, `aria-roledescription`.
- `aria-disabled`, `aria-errormessage`, `aria-haspopup` and `aria-invalid` are still listed as global but their global use is deprecated in 1.2 (§6.5). Use them only on roles that support them.
- Authors MUST only use non-global states and properties on elements whose explicit or implicit role supports them; user agents MUST ignore them otherwise (§8.6). Example: `aria-valuetext` on `progressbar` is fine, on `div` it is ignored.
- Authors MUST NOT specify a prohibited state or property (§5.2.5). Name-prohibited roles prohibit `aria-label` and `aria-labelledby`; `generic` also prohibits `aria-roledescription` (§5.4 generic).
- Authors MAY set `""` on a supported, not required attribute; user agents treat it as absent (§8.6).
- ID references that match nothing are ignored, and duplicate IDs resolve to the first element (§8.6.1). Authors are responsible for unique IDs (§8.6.1).
- Translate `aria-label`, `aria-placeholder`, `aria-roledescription` and `aria-valuetext` when the page is localized (§6.4).

## Hiding and presentational roles

- `aria-hidden="true"` removes the element and its subtree from the accessibility tree; it overrides `aria-hidden="false"` on descendants (§7.1). Authors using it on visible content MUST expose identical or equivalent meaning and functionality to assistive technologies (§6.7 aria-hidden). `aria-hidden="false"` works inconsistently (§6.7 aria-hidden, note).
- Do not put `aria-hidden="true"` on focusable elements or on `body` (ARIA in HTML §4.2 hidden row; §4 body row). WAI-ARIA 1.3 makes the `body` and root rule part of WAI-ARIA too (1.3 §6.8 aria-hidden).
- Hidden content is still used in names and descriptions when it is referenced through `aria-labelledby` or `aria-describedby` (§7.2 note; AccName 1.2 §4.3.2 step 2A).
- `presentation` and its synonym `none` remove an element's implicit semantics but keep its content (§5.4 presentation). User agents MUST ignore the presentational role, and expose the implicit role, when the element is focusable or interactive, or when it has a global ARIA attribute (§5.4 Presentational Roles Conflict Resolution). Required owned elements of a presentational table or list inherit the presentational role unless they have an explicit role (same section).
- Descendants of `button`, `checkbox`, `img`, `menuitemcheckbox`, `menuitemradio`, `meter`, `option`, `progressbar`, `radio`, `scrollbar`, `separator`, `slider`, `switch` and `tab` are presentational ("Children Presentational: True", §7.1); their text still contributes. Do not put interactive content inside them (ARIA in HTML §5).

```html
<!-- Presentation ignored: aria-describedby is global, so the heading stays a heading. -->
<h1 role="presentation" aria-describedby="note-1">Sample</h1>
```

## Relationship attributes

- **`aria-owns`** defines parent and child relationships the DOM cannot express. Owned elements follow the DOM children in order. Authors SHOULD NOT use it when the DOM can express the relationship, and MUST NOT list one element in more than one `aria-owns` (§6.7 aria-owns).
- **`aria-activedescendant`** points from the focused element to the active descendant. Authors MUST ensure it refers to an owned element (a DOM descendant or one owned through `aria-owns`), or, when the focused element is a `combobox`, `textbox` or `searchbox`, to an owned element of the element it references with `aria-controls` (§6.7 aria-activedescendant). Keep the active descendant visible and scrolled into view (same section). Style it yourself: `:focus` does not match (§4.3.1).
- **`aria-controls`** identifies the element whose content or presence this element controls. Use it from an `aria-expanded` element to the region it shows or hides when that region is not owned (§6.7 aria-expanded).
- **`aria-haspopup`** values are `menu`, `listbox`, `tree`, `grid`, `dialog`, `true` (means `menu`) and `false`. The popup container MUST have the matching role (§6.7 aria-haspopup). Use it only when there is a visual indication of the popup (same section, note).
- **`aria-errormessage`** MUST be used with `aria-invalid`. When the error is pertinent (`aria-invalid="true"`), the message MUST NOT be hidden; when it is not, the message MUST be hidden or the attribute removed (§6.7 aria-errormessage).
- **`aria-roledescription`** SHOULD only clarify non-interactive containers such as `group` or `region`, or describe a widget more specifically; it needs a valid role and a non-empty value (§6.7 aria-roledescription).

## Live region attributes and roles

- `aria-live="polite"` announces at the next graceful opportunity; `assertive` interrupts. Authors SHOULD NOT use `assertive` unless the interruption is imperative (§6.7 aria-live). The value is inherited from the nearest ancestor that sets it (same section).
- `aria-atomic="true"` presents the whole region on a change; the default presents only the changed node (§6.7 aria-atomic).
- `aria-relevant` defaults to `additions text`; use `removals` or `all` sparingly (§6.7 aria-relevant).
- `aria-busy="true"` lets assistive technologies wait and present the changes as one update when it becomes `false` (§6.7 aria-busy).
- `alert` is assertive and atomic; authors SHOULD NOT require users to close it, and SHOULD use `alertdialog` when focus must move to the message (§5.4 alert). `status` is polite and atomic and SHOULD NOT receive focus as a result of a status change (§5.4 status). `log` is polite, with new entries appended at the end (§5.4 log).

Pattern-level guidance for alerts is in [`apg-patterns.md`](apg-patterns.md#alerts-and-live-regions).

## Deprecated

| Feature                                                                             | Status                         | Replace with                                       |
| ----------------------------------------------------------------------------------- | ------------------------------ | -------------------------------------------------- |
| `aria-grabbed`, `aria-dropeffect`                                                   | deprecated in 1.1 (§6.7)       | nothing in ARIA yet (ARIA in HTML §4.3.3)          |
| `directory`                                                                         | deprecated in 1.2 (Appendix B) | `list`, or HTML `ul` or `ol` (ARIA in HTML §4.3.1) |
| Global use of `aria-disabled`, `aria-errormessage`, `aria-haspopup`, `aria-invalid` | deprecated in 1.2 (§6.5)       | use only on roles that support them                |

Deprecated features are still conforming and supported by user agents, but authors are advised not to use them in new content (§3.5).

## Common mistakes

- An abstract role (`select`, `input`, `range`, `widget`) on an element (§5.2.1).
- `role="tab"` outside a `tablist`, `role="option"` outside a `listbox` or `group`, or `role="listitem"` outside a `list` (§5.2.7).
- `role="checkbox"` without `aria-checked`, or `role="heading"` without `aria-level` (§5.2.2).
- `aria-label` on `div`, `span`, `p` or `code` with no role that allows naming (§5.2.8.6; ARIA in HTML §4.1).
- A button or link inside an `option` or `tab`, where children are presentational (§7.1).
- `aria-hidden="true"` on an ancestor of a focusable element (ARIA in HTML §4.2; Using ARIA §2.4).
- `aria-activedescendant` pointing at an element that is neither owned nor in the controlled popup (§6.7 aria-activedescendant).
