# Accessible names and descriptions

Read this when naming or describing an element, predicting what a screen reader will announce, or debugging a wrong or missing name. Rules cite AccName 1.2 (Working Draft 2026-10-02, the version WAI-ARIA 1.2 cites normatively), WAI-ARIA 1.2 and the APG practice "Providing Accessible Names and Descriptions". AccName 1.1 is the latest Recommendation; see [`versions.md`](versions.md) for what 1.2 adds.

## Name from: author, contents, prohibited

Every role has a "name from" value (WAI-ARIA 1.2 §5.2.8; AccName 1.2 §4):

- **author**: the name comes from `aria-labelledby`, `aria-label` or a host-language mechanism such as `alt`, `label` or `title`; `title` has the lowest precedence.
- **contents**: the name can also come from the element's text, used only when no author name is given.
- **prohibited**: the element cannot be named. Authors MUST NOT use `aria-label` or `aria-labelledby` on it.

| Group                             | Roles (WAI-ARIA 1.2)                                                                                                                                                                                                                                                                                                                                                                                        |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Name required (§5.2.8.4)          | `alertdialog`, `application`, `button`, `checkbox`, `columnheader`, `combobox`, `dialog`, `grid`, `heading`, `img`, `link`, `listbox`, `marquee`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `meter`, `option`, `progressbar`, `radio`, `radiogroup`, `region`, `rowheader`, `searchbox`, `slider`, `spinbutton`, `switch`, `table`, `tabpanel`, `textbox`, `tooltip`, `tree`, `treegrid`, `treeitem` |
| Name from contents too (§5.2.8.5) | `button`, `cell`, `checkbox`, `columnheader`, `gridcell`, `heading`, `link`, `menuitem`, `menuitemcheckbox`, `menuitemradio`, `option`, `radio`, `row`, `rowheader`, `sectionhead`, `switch`, `tab`, `tooltip`, `treeitem`                                                                                                                                                                                  |
| Name prohibited (§5.2.8.6)        | `caption`, `code`, `deletion`, `emphasis`, `generic`, `insertion`, `paragraph`, `presentation`, `strong`, `subscript`, `superscript`                                                                                                                                                                                                                                                                        |

All other concrete roles support name from author but do not require it. In HTML, `div`, `span`, `p`, `code`, `a` without `href` and `body` have name-prohibited implicit roles; authors MUST NOT name them with `aria-label` or `aria-labelledby` unless an explicit role allows naming (ARIA in HTML §4.1; §4 table, "Naming Prohibited").

## Name computation, step by step

AccName 1.2 §4.3.2. The algorithm walks the root node and, recursively, the nodes it references or contains. The first step that returns a non-empty string wins for the current node.

1. **Initialization.** If the root node's role prohibits naming, return the empty string.
2. **2A Hidden Not Referenced.** A hidden node returns the empty string, unless it is reached through an `aria-labelledby` or `aria-describedby` traversal whose directly referenced node was hidden, or through a native label traversal whose root was hidden. `display:none`, `visibility:hidden`, `visibility:collapse`, `content-visibility:hidden` and `aria-hidden="true"` count as hidden; `opacity:0` and off-screen positioning do not.
3. **2B LabelledBy.** If the node has `aria-labelledby` with at least one valid IDREF, and is not already inside a labelledby or describedby traversal, compute each referenced node in order and join the results with spaces. References are not chained: a referenced node's own `aria-labelledby` is not followed.
4. **2C Embedded Control.** A control embedded in another widget's label contributes its value: a `textbox` its value, a `combobox` or `listbox` its chosen option, a range (`slider`, `spinbutton`) its `aria-valuetext`, then `aria-valuenow`, then the host value.
5. **2D AriaLabel.** A non-empty, non-whitespace `aria-label` is returned (except on embedded controls reached by name-from-content recursion, which go to 2C).
6. **2E Host Language Label.** The host language's text alternative: `alt`, HTML `label`, SVG `title`, unless the node is presentational.
7. **2F Name From Content.** If the role allows name from content, or the node is referenced by `aria-labelledby` or `aria-describedby`, or is (inside) a native label: collect CSS `::before`, `::marker` and `::after` content, then compute each rendered child (shadow root children, or a slot's assigned nodes, or plain children) and concatenate. Each node is visited once.
8. **2G Text Node.** A text node returns its text.
9. **2H Recursive Name From Content.** A descendant with children, inside a name computation, continues with 2F.
10. **2I Tooltip.** Otherwise the tooltip attribute (HTML `title`) is used, and only if nothing else, including subtree content, produced text.

The result is a flat string: whitespace collapsed to single spaces (AccName 1.2 §4.3.1).

```html
<!-- Name: "Delete Documentation.pdf" (2B joins self-reference and the link). -->
<a id="file1" href="/files/Documentation.pdf">Documentation.pdf</a>
<span
  role="button"
  tabindex="0"
  id="del1"
  aria-label="Delete"
  aria-labelledby="del1 file1"
></span>
```

## Description computation

AccName 1.2 §4.2. The first applicable source wins, even if it results in an empty description:

1. `aria-describedby`: the referenced nodes, computed and joined with spaces.
2. `aria-description`: as a flat string. Defined in WAI-ARIA 1.3, so it falls under the 1.3 preview posture (see [`versions.md`](versions.md)).
3. Host-language features that participate in descriptions, if not already used for the name.
4. The tooltip attribute (HTML `title`), if not already used for the name.

## Authoring rules

- If the label text is visible in the DOM, authors SHOULD use `aria-labelledby` and SHOULD NOT use `aria-label`; if no visible label is possible, authors SHOULD use `aria-label` (WAI-ARIA 1.2 §6.7 aria-label, aria-labelledby).
- `aria-labelledby` overrides `aria-label`, which overrides native labels and content (AccName 1.2 §4.3.2 steps 2B to 2F).
- Prefer visible text and native techniques (`label`, `legend`, `caption`); avoid relying on `title` and `placeholder` as names; compose brief, distinct names (APG Providing Accessible Names and Descriptions, Cardinal Rules of Naming, rules 2 to 5).
- `aria-label` or `aria-labelledby` on a role that supports name from content replaces that content for assistive technology users unless the content is referenced too; avoid it except where hiding the content is intended (APG Providing Accessible Names and Descriptions, Naming with Child Content, Warning).
- Translate `aria-label` values when localizing (WAI-ARIA 1.2 §6.4; APG, Naming with a String Attribute Via aria-label, Warning).
- Hosts MUST NOT declare strong native semantics that prevent `aria-describedby`, `aria-label` or `aria-labelledby` (WAI-ARIA 1.2 §8.5), so these work on every HTML element that allows naming.
- `aria-labelledby` can reference hidden elements, including `hidden` and `display:none` content, and includes the value of referenced inputs (APG, Naming with Referenced Content Via aria-labelledby).
- Use `aria-describedby` for short, flat descriptions; prefer `aria-details` for structured content (WAI-ARIA 1.3 §6.8 aria-description, which states the same split). Do not put a description on a dialog whose content has lists, tables or several paragraphs (APG Dialog (Modal) Pattern, WAI-ARIA Roles, States, and Properties).

## Debugging a name

- Empty name on a name-required role: check that the role is not name prohibited, that referenced IDs exist (unresolved IDs are ignored, WAI-ARIA 1.2 §8.6.1), and that referenced content is not hidden by an intermediate hidden node (AccName 1.2 §4.3.2 step 2A, Example 2).
- Name contains unexpected text: `aria-labelledby` pulled in a subtree, or name from content collected CSS generated content or hidden-but-referenced text (step 2F).
- Two words run together or split: whitespace between inline elements is unresolved in AccName 1.2 (note after "Name From Each Child"); add explicit spaces.
- Name differs between browsers: AccName 1.2 is a Working Draft; test the target browsers (APG, Cardinal Rules of Naming, rule 1).
