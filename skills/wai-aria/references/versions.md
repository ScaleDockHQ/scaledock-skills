# Versions and upgrades

Read this when choosing which WAI-ARIA, AccName or ARIA in HTML text to author against, reading markup written for an older WAI-ARIA line, upgrading it, or deciding whether to use something from a draft. Sources: the W3C technical reports of each line, the WAI-ARIA editor's draft, and the change logs in each report, listed in [Sources](../SKILL.md#sources). Citations name the line and its section, for example "1.2 §5.2.6" or "1.2 Appendix B".

## Version lines

Three families are tracked. WAI-ARIA itself has no family name; AccName (`accname`) and ARIA in HTML (`html-aria`) are separately versioned companion specifications from the same Working Group.

| Id                    | Line         | Status  | Revision                                                | Posture | Summary                                                                                                         |
| --------------------- | ------------ | ------- | ------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------- |
| `1.3-preview`         | WAI-ARIA 1.3 | preview | W3C Working Draft 2026-06-04; editor's draft 2026-10-02 | name    | Adds comment, mark, suggestion, sectionheader, sectionfooter and image roles, aria-description, braille labels. |
| `1.2`                 | WAI-ARIA 1.2 | current | W3C Recommendation 2023-06-06                           |         | The default target. New combobox pattern, generic and text-level roles, name-prohibited roles.                  |
| `1.1`                 | WAI-ARIA 1.1 | legacy  | W3C Recommendation 2017-12-14                           |         | Superseded by 1.2. Container-style combobox; introduced aria-modal, none, switch, table and cell.               |
| `1.0`                 | WAI-ARIA 1.0 | legacy  | W3C Recommendation 2014-03-20                           |         | Superseded by 1.1. Combobox on the text field owning its listbox through aria-owns.                             |
| `accname-1.2-preview` | AccName 1.2  | preview | W3C Working Draft 2026-10-02                            | build   | The algorithm WAI-ARIA 1.2 normatively cites; adds aria-description, shadow roots and slots, name prohibited.   |
| `accname-1.1`         | AccName 1.1  | current | W3C Recommendation 2018-12-18                           |         | The latest AccName Recommendation.                                                                              |
| `html-aria`           | ARIA in HTML | current | W3C Recommendation 2026-08-11                           |         | Which roles and aria-\* attributes authors may use on each HTML element, and the implicit semantics.            |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. No WAI-ARIA line is supported: WAI-ARIA is backwards compatible in the user agent (1.2 keeps deprecated features "allowed in the conformance model and expected to be supported by user agents", 1.2 §3.5), so there is no consumer that needs 1.1 markup.

## Which version to use

- Author against WAI-ARIA 1.2 and ARIA in HTML (W3C Recommendation 2026-08-11). ARIA in HTML defines its rules in terms of WAI-ARIA 1.2 (ARIA in HTML §3.4, §4.1).
- Predict names and descriptions with the AccName 1.2 algorithm. WAI-ARIA 1.2 lists `[ACCNAME-1.2]` as a normative reference and says priority is defined by it (1.2 §5.2.8, Appendix D.1), while the latest AccName Recommendation is still 1.1. Posture **build**: rely on the steps 1.1 and 1.2 share, and treat what 1.2 adds (below) as behaviour to test in each target browser before you depend on it.
- Treat WAI-ARIA 1.1 and WAI-ARIA 1.0 markup as input to an upgrade. User agents still accept it, but new code follows 1.2.
- WAI-ARIA 1.3 is posture **name**: reserve its role and attribute names in your component model, and do not ship 1.3-only roles or attributes as the only way information reaches users.

## What changed

### WAI-ARIA 1.3 (Working Draft)

From the 1.3 Status of This Document and Appendix B.1 and B.2:

- New roles: `comment`, `mark`, `suggestion` (B.1), `sectionheader` and `sectionfooter` (Status), and `image` as a synonym of `img` (B.2; 1.3 §5.4 image).
- New attributes: `aria-description`, `aria-braillelabel`, `aria-brailleroledescription` (B.1), `aria-colindextext` and `aria-rowindextext` (1.3 §6.8). `aria-details` takes multiple ID references (B.1), and `aria-errormessage` becomes an ID reference list (B.2).
- `ariaNotify()` is added as an IDL method with priority `normal` or `high` (Status; 1.3 §10.2 ARIANotifyMixin).
- Authors MUST NOT use `aria-hidden` on the root element or the element containing the primary document, such as `html` or `body` (1.3 §6.8 aria-hidden).
- "Required Owned Elements" becomes "Allowed Accessibility Child Roles" and "Required Context Role" becomes "Required Accessibility Parent Role": authors MUST only add accessibility children with allowed roles, and generic elements may intervene (1.3 §5.2.6, §5.2.7).
- Removes `aria-expanded` from `listbox`, removes `group` as an allowed child of `tree`, makes `tooltip` name prohibited, and removes "name required" from several roles including `alertdialog`, `dialog`, `form`, `grid` and `radiogroup` (Status, list of changes since the First Public Working Draft). `aria-hidden="false"` becomes a synonym of undefined (same list).
- Comboboxes may invoke menus (same list).

### WAI-ARIA 1.2

From 1.2 Appendix B, "Substantive changes since the WAI-ARIA 1.1 Recommendation":

- The combobox role changes to a new pattern: the `combobox` element is the input itself, references its popup with `aria-controls`, and carries `aria-expanded`, `aria-autocomplete` and `aria-activedescendant` (B, 01-Nov-2019; 1.2 §5.4 combobox).
- New roles: `generic`, `code`, `time`, `subscript`, `superscript`, `meter`, `strong`, `emphasis`, `insertion`, `deletion`, `blockquote`, `caption` and `paragraph` (B, 2018-2019 entries).
- Naming is prohibited on `caption`, `code`, `deletion`, `emphasis`, `insertion`, `paragraph`, `presentation`, `strong`, `subscript` and `superscript` (B, 24-Oct-2019); `generic` is name prohibited too (1.2 §5.2.8.6).
- `aria-disabled`, `aria-errormessage`, `aria-haspopup` and `aria-invalid` are deprecated as global attributes (B, 07-May-2020; 1.2 §6.5). The `directory` role is deprecated (B, 11-Oct-2019).
- `aria-expanded` is removed from most structure and landmark roles and added to `application` and `checkbox` (B, 04-Sep-2019).
- `group` is allowed as a child of `listbox` and no longer of `list` (B, 24-Oct-2019 and 11-Oct-2019).
- `aria-roledescription` is prohibited on `generic`; `aria-level` is removed from `tablist` and `grid` (B, 2019-2020 entries).
- The ARIAMixin IDL reflects aria-\* attributes as element properties (B, 01-Apr-2018; 1.2 §10).

### WAI-ARIA 1.1

From 1.1 Appendix C, "Change Log: substantive changes since the WAI-ARIA 1.0 Recommendation":

- New attributes: `aria-modal`, `aria-current`, `aria-details`, `aria-errormessage`, `aria-keyshortcuts`, `aria-placeholder`, `aria-roledescription`, and `aria-colcount`, `aria-rowcount`, `aria-colindex`, `aria-rowindex`, `aria-colspan`, `aria-rowspan`.
- New roles: `none` (synonym of `presentation`), `searchbox`, `switch`, `table`, `cell`, `term`, `figure` and `feed`; `region` becomes a landmark that MUST have a label.
- `aria-haspopup` changes from boolean to a token: `true`, `false`, `menu`, `listbox`, `tree`, `grid`, `dialog`.
- `aria-grabbed` and `aria-dropeffect` are marked for deprecation; 1.2 labels both "[Deprecated in ARIA 1.1]" (1.2 §6.7).
- The combobox becomes a container that contains or owns a `textbox` or `searchbox` and a popup, with `aria-controls` on the textbox (1.1 §5.4 combobox).

### WAI-ARIA 1.0

- The combobox is a single-line text field with a listbox popup, and authors SHOULD associate the text field with its listbox using `aria-owns` (1.0 Roles, combobox). WAI-ARIA 1.1 asks user agents to keep supporting this pattern (1.1 §5.4 combobox), and the APG strongly recommends `aria-controls` instead (APG Combobox Pattern, WAI-ARIA Roles, States, and Properties, Note).

### AccName 1.2 (Working Draft)

From AccName 1.2 §6.1:

- Adds `aria-description` at precedence 2 of the description computation (§4.2; §6.1.1).
- Adds steps for shadow roots and slots ("Determine Child Nodes", §4.3.2 step 2F; §6.1.1).
- Returns the empty string when the root node's role prohibits naming (§4.3.2 step 1; §6.1.2, 27-June-2019).
- Specifies that a hidden subtree is included when the node referenced by `aria-labelledby` or `aria-describedby` is itself hidden (§4.3.2 steps 2A and 2B; §6.1.1).
- Moves the tooltip attribute definition into AccName (§2; §6.1.1).

### ARIA in HTML

A single Recommendation line. It defines per-element allowed roles and attributes (§4), aria-\* parity with HTML attributes (§4.2), deprecated features (§4.3) and case requirements (§4.4).

## Upgrading

### WAI-ARIA 1.1 to WAI-ARIA 1.2

1. Change the version marker: there is none in markup. Record in the component docs that it targets WAI-ARIA 1.2.
2. Replace removed or renamed patterns:
   - Combobox: move `role="combobox"` from the wrapper to the input. Put `aria-expanded`, `aria-controls` (referencing the popup) and `aria-autocomplete` on that input, and keep `aria-activedescendant` on it. Remove the wrapper's `aria-owns`. Add `aria-haspopup` with the popup role if the popup is not a listbox (1.2 §5.4 combobox).
   - Move any open-popup button out of the combobox element, give it role `button`, and keep it out of the Tab sequence (1.2 §5.4 combobox).
   - Remove `aria-disabled`, `aria-errormessage`, `aria-haspopup` and `aria-invalid` from elements whose role does not support them (1.2 §6.5). Replace `role="directory"` with a `list` (ARIA in HTML §4.3.1).
   - Remove `aria-label` and `aria-labelledby` from elements whose role is now name prohibited (1.2 §5.2.8.6; ARIA in HTML §4.1).
   - Remove `aria-expanded` from roles that no longer support it, and remove `group` children from `list` elements; a `listbox` may now group its options with `group` (1.2 Appendix B).
3. Validate against the target: run the Verify list in `SKILL.md` and a conformance checker, which MUST report unmet author MUST requirements as errors and unmet SHOULD requirements as warnings (1.2 §3.4).
4. Keep behaviour unchanged: the same names, roles, states and keyboard behaviour reach the user. Compare the accessibility tree before and after in each target browser.

### WAI-ARIA 1.0 to WAI-ARIA 1.1

1. Change the version marker: none in markup.
2. Replace removed or renamed patterns: change `aria-haspopup="true"` to the token for the popup role (`true` still means `menu`, 1.2 §6.7 aria-haspopup); replace `aria-hidden` on content outside a modal dialog with `aria-modal="true"` on the dialog (APG Dialog (Modal) Pattern, Note); stop using `aria-grabbed` and `aria-dropeffect`.
3. Validate against the target: the 1.1 role tables.
4. Keep behaviour unchanged. In practice, go straight on to the 1.1 to 1.2 steps.

### WAI-ARIA 1.0 to WAI-ARIA 1.2

Apply both checklists in order. The combobox is the largest change: the 1.0 text field that owns its listbox through `aria-owns` becomes a 1.2 combobox element that references its popup through `aria-controls`, with no 1.1 wrapper in between (1.0 Roles, combobox; 1.2 §5.4 combobox).

### AccName 1.1 to AccName 1.2

1. Nothing changes in markup. Re-check computed names in each target browser for components that use shadow DOM and slots, that label with hidden content through `aria-labelledby`, or that put `aria-label` on name-prohibited roles (AccName 1.2 §4.3.2).
2. Where you want a description without visible text, `aria-description` now sits at precedence 2, after `aria-describedby` (AccName 1.2 §4.2). Its WAI-ARIA definition is in 1.3, so it falls under the 1.3 posture: keep `aria-describedby` as the main mechanism.

## Preview: WAI-ARIA 1.3

The Working Draft of 2026-06-04 and the editor's draft of 2026-10-02 define the same roles and attributes. Posture: **name**. Model comments, highlights, suggested edits and section headers in your components so they can map to `comment`, `mark`, `suggestion`, `sectionheader` and `sectionfooter` later, and keep braille and description strings in your data model if you need them, but do not ship the 1.3-only roles and attributes as the only carrier of meaning. The 1.3 rule against `aria-hidden` on `html` or `body` matches ARIA in HTML today, so follow it now (ARIA in HTML §4, body row). Watch the WAI-ARIA editor's draft and the TR page for a Candidate Recommendation. When 1.3 becomes a Recommendation: make it current, move 1.2 to legacy, and add a 1.2 to 1.3 upgrade section covering the renamed child and parent role rules and the removed name requirements.

## Preview: AccName 1.2

The Working Draft of 2026-10-02. Posture: **build**, because WAI-ARIA 1.2 already depends on it normatively. Use it to predict names; test its new steps in each target browser. The draft carries an open note that the Working Group is considering joining text with or without spaces depending on CSS `display` (AccName 1.2 §4.3.2, note after "Name From Each Child"), so do not rely on whitespace between inline elements in a name. When AccName 1.2 becomes a Recommendation: make it current, move 1.1 to legacy.
