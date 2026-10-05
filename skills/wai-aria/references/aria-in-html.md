# ARIA in HTML and the rules of ARIA use

Read this when deciding between a native HTML element and ARIA, adding a role or aria-\* attribute to an HTML element, or reviewing HTML for conflicting semantics. Sources: ARIA in HTML (W3C Recommendation 2026-08-11), WAI-ARIA 1.2 §8.4 and §8.5, and Using ARIA (W3C Discontinued Draft 2026-02-24), which keeps the rules of ARIA use "for historical purposes and for easier reference" and is informative only.

## The rules of ARIA use

From Using ARIA §2. These are informative advice; the normative versions are noted with each.

1. **Use native HTML first.** If a native HTML element or attribute has the semantics and behaviour you need, use it instead of repurposing an element with ARIA (Using ARIA §2.1). Exceptions: the feature is not implemented or not accessibly supported, it cannot be styled as the design requires, or HTML does not have it (same section). Normative: when a host-language feature with identical semantics exists and there is no compelling reason to avoid it, authors SHOULD use it (WAI-ARIA 1.2 §8.5).
2. **Do not change native semantics unless you have to.** Wrap instead: `<div role="tab"><h2>…</h2></div>`, not `<h2 role="tab">` (Using ARIA §2.2). Normative: ARIA in HTML §3.1 and the allowed-roles column of the §4 table.
3. **All interactive ARIA controls must be keyboard usable.** Anything users can click, tap, drag or slide must also be reachable and operable from the keyboard; `role="button"` must take focus and activate with Enter and Space (Using ARIA §2.3). Normative: WAI-ARIA 1.2 §4.3.1 (authors SHOULD make all interactive elements focusable).
4. **No `role="presentation"` or `aria-hidden="true"` on a focusable element**, or on an ancestor of one (Using ARIA §2.4). Normative: ARIA in HTML §4.2 (aria-hidden MAY be used on any element except focusable elements and `body`); WAI-ARIA 1.2 §5.4 Presentational Roles Conflict Resolution (user agents ignore `presentation` on focusable elements).

The Discontinued Draft calls these "the four rules of ARIA" (Using ARIA, Status of This Document). Naming rules are in [`accessible-names.md`](accessible-names.md).

## Author requirements

- Authors MAY use `role` and aria-\* attributes to change the exposed semantics of HTML elements, except where they conflict with strong native semantics or equal the implicit semantics (ARIA in HTML §1).
- Authors MUST NOT use them in a way that conflicts with the §4 and §4.2 tables (ARIA in HTML §1).
- Setting a role or attribute that equals the implicit semantics is NOT RECOMMENDED (ARIA in HTML §1). Exception: `role="list"` on a `ul` whose markers are removed, because some user agents drop the list semantics (ARIA in HTML §3.2).
- Where the §4 table says **No role**, authors MUST NOT override the element's implicit or native semantics. Where it says **Any role**, the implicit role, `generic` and deprecated roles are still NOT RECOMMENDED (ARIA in HTML §4).
- ARIA does not change HTML parsing or content models: `<p><div role="link">` is split by the parser; use `<span role="link" tabindex="0">` (ARIA in HTML §3.5).

## Allowed roles: common elements

From the ARIA in HTML §4 table. "Global" means global aria-\* attributes plus those of the allowed roles.

| Element                      | Implicit role                                                         | Authors may set                                                                                                                                                                       |
| ---------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a` with `href`              | `link`                                                                | `button`, `checkbox`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `option`, `radio`, `switch`, `tab`, `treeitem`. `aria-disabled="true"` NOT RECOMMENDED; remove `href` instead. |
| `a` without `href`           | `generic`                                                             | Any role; naming prohibited unless the role allows it.                                                                                                                                |
| `button`                     | `button`                                                              | `checkbox`, `combobox`, `gridcell`, `link`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `option`, `radio`, `separator`, `slider`, `switch`, `tab`, `treeitem`.                   |
| `input type=checkbox`        | `checkbox`                                                            | `menuitemcheckbox`, `option`, `switch`; `button` with `aria-pressed`. MUST NOT use `aria-checked`.                                                                                    |
| `h1` to `h6`                 | `heading`, `aria-level` from the tag                                  | `none`, `presentation`, `tab`.                                                                                                                                                        |
| `ul`                         | `list`                                                                | `group`, `listbox`, `menu`, `menubar`, `none`, `presentation`, `radiogroup`, `tablist`, `toolbar`, `tree`.                                                                            |
| `li`                         | `listitem` inside a list, otherwise `generic`                         | No role other than `listitem` when the parent is a list.                                                                                                                              |
| `nav`                        | `navigation`                                                          | `menu`, `menubar`, `none`, `presentation`, `tablist`.                                                                                                                                 |
| `section`                    | `region` if named, otherwise `generic`                                | Landmark, window, live region and several structure roles; `region` NOT RECOMMENDED, `generic` SHOULD NOT be used.                                                                    |
| `fieldset`                   | `group`                                                               | `none`, `presentation`, `radiogroup`.                                                                                                                                                 |
| `dialog`                     | `dialog`                                                              | `alertdialog`.                                                                                                                                                                        |
| `details`                    | `group`                                                               | No role other than `group`, which is NOT RECOMMENDED.                                                                                                                                 |
| `summary` (of its `details`) | none; varies by browser                                               | No role. Global attributes, `aria-disabled`, `aria-haspopup`.                                                                                                                         |
| `main`                       | `main`                                                                | No role other than `main`, which is NOT RECOMMENDED.                                                                                                                                  |
| `div`, `span`                | `generic`                                                             | Any role; naming prohibited unless the role allows it. `div` in `dl` only `presentation` or `none`.                                                                                   |
| `table`                      | `table`                                                               | Any role.                                                                                                                                                                             |
| `td`, `th`                   | `cell`, `gridcell`, `columnheader`, `rowheader` from the table's role | Only the matching cell roles when the table is a `table`, `grid` or `treegrid`.                                                                                                       |
| `hr`                         | `separator`                                                           | `none`, `presentation`.                                                                                                                                                               |
| `body`                       | `generic`                                                             | No role. MUST NOT set `aria-hidden="true"`.                                                                                                                                           |
| `label` (associated)         | none                                                                  | No role.                                                                                                                                                                              |
| `link`                       | none                                                                  | No role or aria-\* attributes.                                                                                                                                                        |

For any other element, look up the row in the §4 table before adding a role.

## HTML attributes with ARIA equivalents

From ARIA in HTML §4.2. When both the HTML attribute and its aria-\* equivalent are present, user agents MUST ignore the aria-\* attribute, so authors SHOULD NOT specify both (ARIA in HTML §4.2; WAI-ARIA 1.2 §8.5).

| HTML feature               | Equivalent                       | Author rule                                                                                                                                                                                  |
| -------------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `checked`, `indeterminate` | `aria-checked`                   | MUST NOT use `aria-checked` where the element's checkedness can contradict it.                                                                                                               |
| `disabled`                 | `aria-disabled="true"`           | MAY use `aria-disabled` instead, with script that disables the control; SHOULD NOT combine `aria-disabled="true"` with `disabled`; MUST NOT combine `aria-disabled="false"` with `disabled`. |
| `hidden`                   | `aria-hidden="true"`             | Not on focusable elements or `body`; NOT RECOMMENDED with `hidden`; MUST NOT be used on an element whose `hidden` attribute is in the Hidden Until Found state.                              |
| `placeholder`              | `aria-placeholder`               | MUST NOT use both.                                                                                                                                                                           |
| `max`, `min`               | `aria-valuemax`, `aria-valuemin` | SHOULD use the HTML attribute; MUST NOT use both.                                                                                                                                            |
| `readonly`                 | `aria-readonly="true"`           | SHOULD NOT combine `aria-readonly="true"` with `readonly`; MUST NOT combine `aria-readonly="false"` with `readonly`; MUST NOT set `aria-readonly="true"` on content-editable elements.       |
| `required`                 | `aria-required="true"`           | SHOULD NOT combine `aria-required="true"` with `required`; MUST NOT combine `aria-required="false"` with `required`.                                                                         |
| `colspan`, `rowspan`       | `aria-colspan`, `aria-rowspan`   | SHOULD NOT use both; MUST NOT use both with different values.                                                                                                                                |

A focusable element includes one with `tabindex="-1"`, which is focusable but not tabbable (ARIA in HTML §4.2, note).

## Deprecated features and case

- Conformance checkers MUST warn about the deprecated `directory` role, the DPub roles `doc-biblioentry` and `doc-endnote`, and `aria-dropeffect` and `aria-grabbed` (ARIA in HTML §4.3).
- Authors SHOULD use ASCII lowercase for role tokens and token-valued aria-\* attributes: `role="main"`, `aria-current="page"`, not `role="Main"` (ARIA in HTML §4.4).

## Content models for ARIA roles

An element with an explicit role follows the descendant rules of the HTML element with that implicit role: a `role="button"` element allows no interactive descendants and no descendants with `tabindex` (ARIA in HTML §5). Conformance checkers report `<button><div role="button">…</div></button>` as an error (same section).

## Examples

```html
<!-- Native first: no ARIA needed. -->
<button type="button">Save</button>

<!-- A toggle: extend the native button rather than rebuild it. -->
<button type="button" aria-pressed="false">Bold</button>

<!-- A disabled link: remove href, then expose the role and state. -->
<a role="link" aria-disabled="true">Next page</a>

<!-- Do not: the native state wins and the ARIA attribute is ignored. -->
<input type="checkbox" checked aria-checked="false" />
```

The toggle and disabled link come from ARIA in HTML §2, and the conflicting checkbox from §3.4.
