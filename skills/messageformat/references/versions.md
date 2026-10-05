# Versions and upgrades

Read this when choosing a target version, reading a message written for an older release, upgrading, or deciding whether to use the next LDML draft. Sources: the UTS #35 Part 9 text of each LDML release, the message-format-wg release notes, and the ICU MessageFormat docs, listed in [Sources](../SKILL.md#sources).

Unicode MessageFormat was called "MessageFormat 2.0" while it was developed (message-format-wg `spec/README.md`). It ships as Part 9 of UTS #35 (LDML), so its versions are LDML release numbers. LDML 47 was its first Stable release.

## Version lines

| Id               | Line                                | Status    | Revision                                        | Posture | Summary                                                                                                          |
| ---------------- | ----------------------------------- | --------- | ----------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------- |
| `ldml49-preview` | Unicode MessageFormat LDML 49 draft | preview   | CLDR 49 draft, tr35-79, 2026-09-24              | track   | Proposed update. Part 9 text currently matches LDML 48.2 apart from an editorial fix.                            |
| `ldml48`         | Unicode MessageFormat LDML 48       | current   | LDML 48.2, tr35-78, 2026-03-03                  |         | `:offset`, `:currency` and `:percent` Stable; Default Bidi Strategy required; `u:locale` removed.                |
| `ldml47`         | Unicode MessageFormat LDML 47       | supported | LDML 47, tr35-75 (release tag 2025-02-27)       |         | First Stable release: syntax and data model frozen; only `:string`, `:number`, `:integer` Stable.                |
| `ldml45-46`      | MessageFormat 2.0 Tech Preview      | legacy    | LDML 45 (tr35-72), 46 (tr35-73), 46.1 (tr35-74) |         | Pre-stable drafts. LDML 45 used expression selectors and reserved syntax that later releases removed.            |
| `icu-mf1`        | ICU MessageFormat 1                 | current   | ICU4J 78 API docs                               |         | Family `icu-mf1`: the older ICU `MessageFormat` syntax, still widely deployed; migrate to Unicode MessageFormat. |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

`icu-mf1` is its own family because it is a separate, older format from the same publisher. It is "current" only within that family: it is the one ICU MessageFormat 1 line, not a recommended target for new messages.

## Which version to use

- Write new messages and implementations to Unicode MessageFormat LDML 48, at 48.2.
- Unicode MessageFormat LDML 47 is fine for an implementation that has not moved yet. The stability policy guarantees that a message valid in LDML 47 stays valid, with the same meaning, in LDML 48 (Stability Policy). Avoid functions that were Draft in 47 (`:math`, `:currency`, `:unit`, date/time, `u:locale`) when the message must run on a 47 implementation.
- Treat messages written for the MessageFormat 2.0 Tech Preview as input to an upgrade.
- Use ICU MessageFormat 1 only where the runtime has no Unicode MessageFormat implementation; plan the migration in [`icu-mf1-migration.md`](icu-mf1-migration.md).
- The LDML 49 draft has posture **track**: read it for coming changes, emit nothing from it.

## What changed

### Unicode MessageFormat LDML 48 (48, 48.1, 48.2)

From the LDML 48 and LDML 48.2 release notes, confirmed in the tr35-76 and tr35-78 texts:

- Implementations that do not report every error MUST prioritize Syntax and Data Model Errors (Error Handling; #1011).
- The Default Bidi Strategy is required and the default for string output (Handling Bidirectional Text; #1066).
- `:offset` is Stable; it was the Draft `:math` with the same `add` and `subtract` options (#1073).
- `:datetime`, `:date` and `:time` stay Draft and are rebuilt on Semantic Skeletons: `dateFields`, `dateLength`, `timePrecision`, `timeZoneStyle` on `:datetime`, `fields` and `length` on `:date`, `precision` on `:time`. The LDML 47 `dateStyle`, `timeStyle` and field options are gone (#1078, #1083).
- `:percent` is added (48) and made Stable (48.2) (#1094, #1100).
- `:currency` is made Stable (48.2) (#1101).
- The Draft option `u:locale` is removed (48.2) (#1102).
- Editorial: the name "Unicode MessageFormat", and a rewritten pattern selection algorithm with the same meaning (#1064, #1080).

### Unicode MessageFormat LDML 47

From the LDML47-Stable release notes:

- MessageFormat becomes Stable, and the stability policy becomes normative.
- The "function registry" is replaced by default functions and `u:` namespace options; the data model is renamed the Interchange Data Model.
- `number-literal` leaves the ABNF and moves to the numeric functions; unquoted literals accept a wider range of characters.
- Option values record whether they were set by a literal; `select` on `:number` and `:integer` must be a literal.
- `style=percent` is removed from `:number` and `:integer`.
- Only `:string`, `:number` and `:integer` are Stable; `u:id` and `u:dir` are optional and `u:locale` is Draft.
- The Default Bidi Strategy is revised, and quoting `*` as a key (`|*|`) is clarified.

### MessageFormat 2.0 Tech Preview (LDML 45 to 46.1)

Compared with the LDML 45 ABNF (tr35-72), LDML 46 (tr35-73) and 46.1 (tr35-74) changed:

- Selectors are variables (`selector = variable`) instead of expressions (`selector = expression`).
- Reserved statements (`.keyword` other than the three), reserved annotations (`!`, `%`, `*`, `+`, `<`, `>`, `?`, `~`) and private-use annotations (`^`, `&`) are removed.
- Attribute values are literals only; LDML 45 also allowed variables.
- Whitespace productions allow bidi marks and isolates, and leading and trailing whitespace is allowed around complex messages.

## Upgrading

### MessageFormat 2.0 Tech Preview to LDML 48

1. Move every selector expression into a declaration: `.match {$count :number}` becomes `.input {$count :number}` with `.match $count`. For a literal or function-only selector, use `.local $sel = {…}` and match `$sel`.
2. Remove reserved statements and reserved or private-use annotations; replace private-use annotations with a namespaced function (`:ns:fn`).
3. Replace variable-valued attributes with literal values or remove them.
4. Replace `:number style=percent` with `:percent`, and `:math` with `:offset`.
5. Rewrite date/time options to the LDML 48 options (`dateFields`, `dateLength`, `timePrecision`, `fields`, `length`, `precision`), and flag them as Draft.
6. Remove `u:locale`; set the locale in the formatting context.
7. Check that `select` is a literal on every numeric selector.
8. Run the message through an LDML 48 parser: no Syntax or Data Model Error, then compare the formatted output.

### LDML 47 to LDML 48

1. Replace `:math` with `:offset`. The options are unchanged.
2. Replace LDML 47 date/time options (`dateStyle`, `timeStyle`, field options such as `weekday=long`) with the LDML 48 options; they remain Draft.
3. Remove `u:locale`.
4. `:currency` and `:percent` can now be relied on as Stable.
5. Implementations: make the Default Bidi Strategy the default for string output, and report Syntax and Data Model Errors first.
6. Messages that only use `:string`, `:number` and `:integer` need no change (Stability Policy).

### ICU MessageFormat 1 to LDML 48

Follow [`icu-mf1-migration.md`](icu-mf1-migration.md): rename numbered arguments, declare selectors, flatten nested `select`/`plural` into one `.match`, turn `other` into `*`, replace `#` and `offset:` with variables and `:offset`, and switch apostrophe quoting to backslash escapes.

## Preview: Unicode MessageFormat LDML 49 draft

The proposed update of UTS #35 for CLDR 49 (tr35-79, dated 2026-09-24) is a draft that "may be updated, replaced, or superseded" and must not be cited as other than a work in progress (Status). Its Part 9 text matches LDML 48.2 except one editorial change. The message-format-wg editor's copy has more since LDML 48.2, notably #1104 (merged 2026-03-16), which specifies "well-formed" values for time zones, calendars and units in the Draft date/time and `:unit` options; it is not in the published draft yet.

Posture **track**: implement nothing from it. When LDML 49 is published, re-read Part 9 and the release notes, make `ldml49` current, move `ldml48` to supported, and add an upgrade section.
