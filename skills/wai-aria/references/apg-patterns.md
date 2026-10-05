# APG keyboard and focus patterns

Read this when building or reviewing the keyboard interaction, focus management and ARIA structure of a widget. Sources: the ARIA Authoring Practices Guide (APG) pattern pages and the practice "Developing a Keyboard Interface", read 2026-10-05. The APG is informative guidance; where it restates a WAI-ARIA requirement, the WAI-ARIA 1.2 section is cited too. Citations name the APG page and heading.

## Focus fundamentals

- Tab and Shift + Tab move between components; arrow keys move inside a composite. Only one element of a composite is in the tab sequence (Keyboard Interface, Fundamental Keyboard Navigation Conventions; Keyboard Navigation Inside Components).
- Authors MUST manage focus on `grid`, `listbox`, `menu`, `menubar`, `radiogroup`, `tree`, `treegrid` and `tablist` (WAI-ARIA 1.2 §4.3.1).
- `tabindex="0"` puts an element in the tab sequence in DOM order; `tabindex="-1"` makes it focusable by script only; positive values are strongly discouraged (Keyboard Interface, Keyboard Navigation Between Components).
- Keep DOM order, tab order and reading order aligned; rearrange the DOM rather than use positive `tabindex` (same section).
- Never lose focus: when the focused element is removed or hidden, move focus to a logical element (WAI-ARIA 1.2 §4.3.1; Keyboard Interface, Discernible and Predictable Keyboard Focus). Do not scroll the focused element off screen unless the user scrolled (WAI-ARIA 1.2 §4.3.1).
- The focus indicator must always be visible, and selection must look different from focus (Keyboard Interface, Focus VS Selection and the Perception of Dual Focus).
- Let selection follow focus only when the newly selected content appears without noticeable latency (Keyboard Interface, Deciding When to Make Selection Automatically Follow Focus).
- Where focus lands on Tab into a composite: the last focused element for grid and treegrid; the selected element for radio groups, tabs, listboxes and trees; the first element for menubars and toolbars (Keyboard Interface, Keyboard Navigation Inside Components).

### Roving tabindex

Set `tabindex="0"` on the one element in the tab sequence and `tabindex="-1"` on the rest. On an arrow key, move `tabindex="0"` to the new element and call `element.focus()`. The browser scrolls the focused element into view (Keyboard Interface, Managing Focus Within Components Using a Roving tabindex).

### aria-activedescendant

Keep DOM focus on the container (or the combobox) and set `aria-activedescendant` to the ID of the active element. The referenced element MUST be a DOM descendant, owned through `aria-owns`, or, for a focused `combobox`, `textbox` or `searchbox`, inside the element its `aria-controls` references (WAI-ARIA 1.2 §6.7 aria-activedescendant; Keyboard Interface, Managing Focus in Composites Using aria-activedescendant). Draw the focus indicator and scroll into view yourself (same sections; WAI-ARIA 1.2 §4.3.1). Update `tabindex` or `aria-activedescendant` on pointer clicks too (Keyboard Interface, same section, Note).

### Disabled items

`disabled` removes a control from the tab sequence; `aria-disabled="true"` keeps it focusable. APG keeps disabled options, menu items, tabs and tree items focusable so users can discover them (Keyboard Interface, Focusability of disabled controls).

## Dialog (modal)

APG Dialog (Modal) Pattern; WAI-ARIA 1.2 §5.4 dialog and §6.7 aria-modal.

- Structure: the container has role `dialog`, `aria-modal="true"`, and a name from `aria-labelledby` (a visible title) or `aria-label`. Authors MUST name a dialog (WAI-ARIA 1.2 §5.4 dialog). Everything needed to operate it is a descendant: with a modal displayed, authors MUST ensure the interface can be controlled with only the modal's descendants, and SHOULD make other content inert (WAI-ARIA 1.2 §6.7 aria-modal).
- `aria-describedby` is optional; omit it when the content has lists, tables or several paragraphs.
- Keyboard: on open, focus moves inside. Tab and Shift + Tab wrap within the dialog. Escape closes it.
- Initial focus: usually the first focusable element; a static element with `tabindex="-1"` at the top when the content is long or structured; the least destructive action before an irreversible step.
- On close, focus returns to the invoking element unless it no longer exists or the workflow makes another target more logical.
- Include a visible close or cancel button in the tab sequence.
- Mark a dialog modal only when code blocks all interaction outside it and styling obscures the rest. Legacy dialogs that use `aria-hidden` on the background must not sit inside a hidden element.

```html
<div role="dialog" aria-modal="true" aria-labelledby="dlg-title">
  <h2 id="dlg-title">Delete file</h2>
  <p>This cannot be undone.</p>
  <button type="button">Cancel</button>
  <button type="button">Delete</button>
</div>
```

An alert dialog uses role `alertdialog` with `aria-modal="true"`, a name, and `aria-describedby` pointing at the message; its keyboard behaviour is the modal dialog's (APG Alert Dialog Pattern). Authors SHOULD focus an active element in it when it opens (WAI-ARIA 1.2 §5.4 alertdialog).

## Menu button

APG Menu Button Pattern.

- Structure: role `button` with `aria-haspopup` set to `menu` or `true`; `aria-expanded="true"` while the menu shows and `false` while hidden; the popup has role `menu`; `aria-controls` from the button to the menu is optional.
- Keyboard on the button: Enter or Space opens the menu and focuses the first item; Down Arrow (optional) opens and focuses the first item; Up Arrow (optional) opens and focuses the last item.

## Menu and menubar

APG Menu and Menubar Pattern.

- Structure: role `menu` or `menubar`; items are `menuitem`, `menuitemcheckbox` or `menuitemradio`. A parent item has `aria-haspopup` (`menu` or `true`) and `aria-expanded`. Checked items have `aria-checked="true"`, disabled items `aria-disabled="true"`. Group items with `separator`. A `menubar` is named; a `menu` is named by `aria-labelledby` pointing at its button or parent item, or by `aria-label`.
- Focus: either `aria-activedescendant` on the container, or `tabindex="-1"` on every item except the first menubar item (`tabindex="0"`).
- Keyboard: Tab moves out of the menubar and closes all menus; Tab never moves into a menu, so authors move focus in when it opens. Enter opens a submenu or activates the item and closes the menu. Down and Up Arrow move within a menu (optionally wrapping); Right and Left Arrow move along the menubar and open or close submenus. Home and End move to the first and last item when arrows do not wrap. Escape closes the menu and returns focus to the button or parent item. Type-ahead is optional.
- Disabled items are focusable but cannot be activated; separators are not focusable.

## Combobox

APG Combobox Pattern; WAI-ARIA 1.2 §5.4 combobox.

- Structure (MUST in WAI-ARIA 1.2): role `combobox` on the input; `aria-expanded` `true` or `false`; `aria-controls` referencing the popup; the popup has role `listbox`, `tree`, `grid` or `dialog`; `aria-haspopup` matching the popup when it is not a listbox; `aria-autocomplete` matching the behaviour when the input autocompletes.
- Name: an HTML `label` when the combobox is an `input`, otherwise `aria-labelledby` or `aria-label`.
- Focus: DOM focus stays on the combobox; for listbox, grid and tree popups, `aria-activedescendant` on the combobox points at the active item, and the selected suggestion has `aria-selected="true"`. Dialog popups take real DOM focus.
- An open button, if any, has role `button`, is not in the tab sequence, and is not a descendant of the combobox (WAI-ARIA 1.2 §5.4 combobox).
- Keyboard in the combobox: Down Arrow moves into the popup; Up Arrow (optional) to its last item; Escape closes the popup (optionally clears); Enter accepts a selected suggestion; Alt + Down Arrow opens without moving focus; Alt + Up Arrow closes. Do not intercept the browser's text editing keys.
- Keyboard in a listbox popup: Enter accepts and closes; Escape closes and returns to the combobox; Down and Up Arrow move and select; Left and Right Arrow return to the input in an editable combobox; printable characters return to the input and type. Selection follows focus.
- The 1.0 `aria-owns` form is legacy; use `aria-controls` (APG Combobox Pattern, WAI-ARIA Roles, States, and Properties, Note).

```html
<label for="city">City</label>
<input
  id="city"
  type="text"
  role="combobox"
  aria-expanded="true"
  aria-controls="city-list"
  aria-autocomplete="list"
  aria-activedescendant="city-2"
/>
<ul id="city-list" role="listbox" aria-label="Cities">
  <li id="city-1" role="option" aria-selected="false">Amsterdam</li>
  <li id="city-2" role="option" aria-selected="true">Antwerp</li>
</ul>
```

## Listbox

APG Listbox Pattern; WAI-ARIA 1.2 §5.4 listbox.

- Structure: role `listbox` containing `option`s, or `group`s of options; every group has at least one option and a name. A standalone listbox has a name. `aria-multiselectable="true"` for multi-select. Use either `aria-selected` or `aria-checked` for the selection state, not both; selectable unselected options have it set to `false`. Set `aria-setsize` and `aria-posinset` when not all options are in the DOM. `aria-orientation="horizontal"` for horizontal lists.
- Keyboard: focus goes to the selected option, or the first option. Down and Up Arrow move (selection may follow focus in single-select). Home and End are strongly recommended above five options; type-ahead is recommended, especially above seven. Multi-select: Space toggles; Shift + arrows, Shift + Space, Control + Shift + Home or End and Control + A extend selection (recommended model without held modifiers).

## Tabs

APG Tabs Pattern; WAI-ARIA 1.2 §5.4 tab and tabpanel.

- Structure: role `tablist` (named), with `tab`s inside; each `tab` has `aria-controls` to its `tabpanel`; each `tabpanel` has `aria-labelledby` to its tab; the active tab has `aria-selected="true"` and the others `false`. `aria-orientation="vertical"` for vertical lists. A `tab` MUST be contained in or owned by a `tablist` (WAI-ARIA 1.2 §5.4 tab).
- Keyboard: Tab into the tablist focuses the active tab; Tab out goes to the panel. Left and Right Arrow move between tabs and wrap (Up and Down in a vertical list); Home and End are optional; Space or Enter activates when activation is manual. A horizontal tablist does not handle Up and Down.
- Activate on focus when panels display without noticeable latency; otherwise activate manually. Give the panel `tabindex="0"` when its first content is not focusable.

## Disclosure

APG Disclosure (Show/Hide) Pattern.

- Structure: role `button` with `aria-expanded` `true` when the content shows and `false` when hidden; `aria-controls` to the content is optional.
- Keyboard: Enter and Space toggle.
- Native first: HTML `details` and `summary` are the native show and hide elements (Using ARIA §2.1). Add no role to the `summary` of its `details`, and no role to `details` itself, where the only allowed role is its implicit `group`, which is NOT RECOMMENDED (ARIA in HTML §4, details and summary rows).

## Grid

APG Grid Pattern; WAI-ARIA 1.2 §5.4 grid.

- Structure: role `grid`; `row`s are DOM descendants of, or owned by, the grid or a `rowgroup`; cells are `gridcell`, `columnheader` or `rowheader`. Name the grid. `aria-sort` on the sorted header, `aria-selected` on selected cells or rows, `aria-readonly` only in editable grids, `aria-rowcount`, `aria-colcount`, `aria-rowindex`, `aria-colindex` when rows or columns are missing from the DOM. On an HTML `table`, use `rowspan` and `colspan`, never `aria-rowspan` or `aria-colspan`.
- Data grid keyboard: arrows move one cell and stop at the edges; Page Down and Page Up move an author-defined number of rows; Home and End go to the first and last cell in the row; Control + Home and Control + End go to the first and last cell of the grid. Selection, when supported: Control + Space selects the column, Shift + Space the row, Control + A all, Shift + arrows extend.
- Focus the cell, or the single non-arrow-key widget inside it (link, button, checkbox). For editable content, several widgets, or arrow-key widgets, Enter or F2 enters cell interaction and Escape restores grid navigation (APG Grid Pattern, Keyboard Interaction - Setting Focus and Navigating Inside Cells; WAI-ARIA 1.2 §5.4 grid).
- In a data grid every cell is focusable or contains a focusable element, except header cells without functions (APG Grid Pattern, Data Grids For Presenting Tabular Information).

## Tree view

APG Tree View Pattern; WAI-ARIA 1.2 §5.4 tree.

- Structure: role `tree` (named) owning `treeitem`s; a parent node contains or owns a `group` of its children; parent nodes have `aria-expanded`, end nodes never do. `aria-multiselectable` for multi-select; either `aria-selected` or `aria-checked`, not both; unselectable nodes have neither. Set `aria-level`, `aria-setsize` and `aria-posinset` when nodes load dynamically.
- Keyboard: Right Arrow opens a closed node, or moves to the first child of an open one; Left Arrow closes an open node, or moves to the parent. Down and Up Arrow move without opening or closing; Home and End go to the first and last focusable node; Enter performs the default action; type-ahead is recommended; `*` (optional) expands all siblings. Multi-select keys mirror the listbox.

## Alerts and live regions

APG Alert Pattern; WAI-ARIA 1.2 §5.4 alert and §6.7 aria-live.

- Use role `alert` for a brief, important message that must not move focus. Alerts have no keyboard interaction (APG Alert Pattern).
- Screen readers do not announce alerts present before the page finishes loading, so inject the content into the region after load (APG Alert Pattern, About This Pattern).
- Do not make alerts disappear automatically, and keep their frequency low (same section, citing WCAG success criteria 2.2.3 and 2.2.4).
- Use `alertdialog` instead when the user must respond and focus should move (WAI-ARIA 1.2 §5.4 alert).
- For non-urgent updates use `status` or `aria-live="polite"`; reserve `assertive` for imperative interruptions (WAI-ARIA 1.2 §6.7 aria-live). Batch multi-part updates with `aria-busy` (WAI-ARIA 1.2 §6.7 aria-busy).

```html
<div role="status" id="save-status"></div>
<script>
  document.getElementById("save-status").textContent = "Draft saved";
</script>
```
