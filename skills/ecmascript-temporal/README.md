# ecmascript-temporal

An agent skill for the ECMAScript Temporal API from TC39: writing JavaScript date and time code with `Temporal` types, time zones and calendars, and migrating code from `Date` and from older Temporal polyfills.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill ecmascript-temporal
```

Then ask your agent to "replace the Date handling in this module with Temporal" or "check this scheduling code for DST bugs".

## What it covers

- Choosing between `Temporal.Instant`, `ZonedDateTime`, `PlainDate`, `PlainTime`, `PlainDateTime`, `PlainYearMonth`, `PlainMonthDay` and `Duration`, and reading the clock with `Temporal.Now`.
- IANA time zones, offset time zones, DST `disambiguation` and `offset` options, transitions and the start of day.
- Calendars: `iso8601`, `withCalendar`, month codes and cross-calendar best practices.
- `add`, `subtract`, `until`, `since`, `round` and `total`, with `largestUnit`, `smallestUnit`, rounding modes, `relativeTo` and duration balancing.
- RFC 9557 and RFC 3339 strings, `toString` options, `compare` versus `equals`, `Intl.DateTimeFormat` and `toLocaleString`.
- Migration recipes from `Date`, and upgrade steps from the API before the 2024 scope reduction (`Temporal.Calendar`, `Temporal.TimeZone`).

Temporal is at stage 4 and expected in ECMAScript 2027, but not yet merged into the ECMA-262 draft. The skill pins the proposal spec (build posture).

## Versions

| Line                                | Status                |
| ----------------------------------- | --------------------- |
| Temporal (ECMAScript 2027)          | current (build)       |
| Temporal pre-reduction polyfill API | legacy (upgrade from) |
| ECMAScript Date                     | legacy (upgrade from) |

`references/versions.md` says what changed and how to upgrade from each legacy line.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Temporal proposal specification](https://tc39.es/proposal-temporal/): Stage 4 Draft, July 27, 2026.
- [Temporal documentation](https://tc39.es/proposal-temporal/docs/), its [cookbook](https://tc39.es/proposal-temporal/docs/cookbook.html) and the [proposal repository](https://github.com/tc39/proposal-temporal): commit e8cc03f.
- [TC39 finished proposals](https://github.com/tc39/proposals/blob/main/finished-proposals.md), the [ECMA-262 draft](https://tc39.es/ecma262/), [ECMAScript 2026](https://tc39.es/ecma262/2026/) and [ecma262 pull request #3966](https://github.com/tc39/ecma262/pull/3966): the status of Temporal and the `Date` line.
- The [proposal polyfill changelog](https://raw.githubusercontent.com/tc39/proposal-temporal/main/polyfill/CHANGELOG.md), the [@js-temporal/polyfill changelog](https://raw.githubusercontent.com/js-temporal/temporal-polyfill/main/CHANGELOG.md) and the [TC39 notes of 12 June 2024](https://github.com/tc39/notes/blob/HEAD/meetings/2024-06/june-12.md): the API changes since the polyfill era.
- [RFC 9557](https://www.rfc-editor.org/rfc/rfc9557) and [RFC 3339](https://www.rfc-editor.org/rfc/rfc3339): the string formats.

## License

MIT
