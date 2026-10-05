# Versions and upgrades

Read this when choosing a target version, reading code written against `Date` or against an older Temporal polyfill, or upgrading it. Sources: the Temporal spec draft, the proposal README, `finished-proposals.md`, the ECMA-262 draft and the 2026 edition, ecma262 pull request #3966, both polyfill changelogs and the TC39 notes of 12 June 2024, listed in [Sources](../SKILL.md#sources).

## Version lines

| Id                  | Line                                | Status  | Revision                                                                             | Posture | Summary                                                                                         |
| ------------------- | ----------------------------------- | ------- | ------------------------------------------------------------------------------------ | ------- | ----------------------------------------------------------------------------------------------- |
| `es2027`            | Temporal (ECMAScript 2027)          | current | Stage 4 Draft of July 27, 2026 (commit e8cc03f); not yet merged into ECMA-262        | build   | The `Temporal` namespace with string time zones and calendars, as accepted at stage 4.          |
| `pre-2024-polyfill` | Temporal pre-reduction polyfill API | legacy  | Stage 3 API before the June 2024 scope reduction; @js-temporal/polyfill before 0.5.0 |         | Adds `Temporal.Calendar`, `Temporal.TimeZone`, custom calendars and time zones, `getISOFields`. |
| `date`              | ECMAScript Date                     | legacy  | ECMA-262 § 21.4 Date Objects, ECMAScript 2026 and the ECMAScript 2027 draft          |         | Mutable millisecond time value, local time zone or UTC only, 0-based months, lenient parsing.   |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows.

## Which version to use

- Default to `es2027`, Temporal (ECMAScript 2027), with posture build. TC39 lists Temporal in `finished-proposals.md` with expected publication year 2027 (stage 4 at the March 2026 meeting), and the proposal README says it is at stage 4.
- Temporal is not yet in the ECMA-262 text: the draft of October 3, 2026 does not contain it, the first merge pull request (#3759) was closed and pull request #3966 ("Temporal stage 4, round 2") is open, and the ECMA-402 part is pull request #1044. Until the merge, the proposal spec at the pin is the normative text; re-check the draft on every refresh.
- Native support per the proposal README: Firefox 139, Chrome 144 and Node.js 26 ship Temporal; Safari does not yet. Elsewhere, load one of the polyfills listed in the README. A polyfill release that predates the 2024 changes, such as @js-temporal/polyfill before 0.5.0, implements `pre-2024-polyfill`, not `es2027`.
- No line is supported. `Date` remains in the language and is still needed at boundaries (APIs that take or return `Date`), but new logic is written in Temporal.

## What changed

### Temporal (ECMAScript 2027)

From the @js-temporal/polyfill 0.5.0 changelog ("all changes adopted by TC39 between May 2023 and March 2025"), most of them from the scope reduction in the TC39 notes of 12 June 2024:

- `Temporal.Calendar` and `Temporal.TimeZone` were removed, with user-defined calendars and time zones. Calendars and time zones are string identifiers; time zones are IANA Zone or Link names or offsets of minute precision.
- `TimeZone.prototype.getPreviousTransition` and `getNextTransition` became `ZonedDateTime.prototype.getTimeZoneTransition('previous' | 'next')`.
- `getISOFields()` was removed; `withPlainDate()` was removed; `PlainTime.prototype.toPlainDateTime()` and `toZonedDateTime()` were removed (use the `PlainDate` methods).
- `epochSeconds` and `epochMicroseconds` were removed, with `Instant.fromEpochSeconds()` and `fromEpochMicroseconds()`; `epochMilliseconds` and `epochNanoseconds` remain.
- `PlainDateTime` and `ZonedDateTime` lost `toPlainYearMonth()` and `toPlainMonthDay()` (go through `toPlainDate()`).
- `Instant.prototype.toZonedDateTime(options)` and `Temporal.Now.zonedDateTime(calendar)` were removed; use `toZonedDateTimeISO(timeZone)` and `Temporal.Now.zonedDateTimeISO()`, then `withCalendar()`.
- `Duration.prototype.add()` and `subtract()` no longer take `relativeTo`, and throw for calendar units.
- Durations got limits: years, months and weeks below 2³², and the time part below 2⁵³ seconds.
- Strings with more than one calendar annotation throw when one of them is critical; non-string primitives are no longer coerced to strings.
- `PlainYearMonth.toPlainDate()` and `PlainMonthDay.toPlainDate()` clamp instead of throwing; `weekOfYear` and `yearOfWeek` can be `undefined` for calendars without a week system.
- From 0.4.4: the `calendar` and `timeZone` getters became `calendarId` and `timeZoneId` (strings), and `Intl.DateTimeFormat` stopped accepting `ZonedDateTime`.

Earlier changes, from the proposal's own polyfill changelog at 0.8.0 (the state that reached stage 3): rounding mode `nearest` became `halfExpand`, the calendar annotation became `[u-ca=name]` instead of `[u-ca-name]`, month codes took the form `"M03"` (leap month `"M03L"`), and `compare()` stopped taking calendars and time zones into account. That changelog ends at 0.9.0, which only adds deprecation warnings, and does not record the 2024 removals. The proposal README says its in-repo polyfill is not for production use.

### ECMAScript Date

What `Date` gives you, from ECMA-262 § 21.4:

- A time value is a Number of milliseconds since 1970-01-01T00:00:00Z, with every day exactly 86,400 seconds and no leap seconds (§ 21.4.1.1). There is no time zone besides the host's local zone and UTC, and no calendar besides the proleptic Gregorian one.
- `Date.parse` interprets date-only strings without an offset as UTC and date-time strings without an offset as local time, and may fall back to implementation-specific formats for other strings (§ 21.4.3.2). The string format allows `24:00` and does not support RFC 9557 time zone annotations (§ 21.4.1.32).
- Setters such as `setMonth` change the object in place (§ 21.4.4.25).

## Upgrading

### From `date` (ECMAScript Date) to `es2027`

1. Classify each `Date` by meaning: an exact moment becomes `Temporal.Instant` (or `ZonedDateTime` when local time matters); a date with no time becomes `PlainDate`; a time of day becomes `PlainTime`. See [`types.md`](types.md).
2. Convert at boundaries: `date.toTemporalInstant()` (§ 14.9.1), then `.toZonedDateTimeISO(timeZone)` with an explicit zone. Back to `Date`: `new Date(x.epochMilliseconds)`, which truncates to milliseconds. See [`parsing-and-migration.md`](parsing-and-migration.md).
3. For a `Date` that holds only a date, find out which zone produced its midnight before converting: `new Date(2000, 0, 1)` is local midnight, `new Date("2000-01-01")` is UTC midnight.
4. Replace month arithmetic on `getMonth()`/`setMonth()` (0-based) with `add({ months })` and 1-based `month`; replace `getTimezoneOffset()` with `zonedDateTime.offset` or `offsetNanoseconds`.
5. Replace `Date.parse` of ISO strings with the `from()` of the matching type; reject localized strings instead of guessing.
6. Replace `<`, `>` and `getTime()` comparisons with `compare()` and `equals()`.
7. Test with a DST gap and a DST overlap in the target time zones.

### From `pre-2024-polyfill` (Temporal pre-reduction polyfill API) to `es2027`

1. Upgrade the polyfill to @js-temporal/polyfill 0.5.0 or later, or drop it where the runtime ships Temporal.
2. Replace `Temporal.TimeZone.from(id)` and `Temporal.Calendar.from(id)` with the identifier string. Replace custom time zone or calendar classes with a supported identifier; nothing in `es2027` replaces user-defined ones.
3. Replace `.calendar` and `.timeZone` with `.calendarId` and `.timeZoneId`; compare zones with `ZonedDateTime.prototype.equals` on values with the same instant and calendar.
4. Replace `timeZone.getNextTransition(instant)` with `instant.toZonedDateTimeISO(id).getTimeZoneTransition('next')`.
5. Replace `getISOFields()` with `withCalendar('iso8601')` and the getters; replace `withPlainDate(d)` with `with({ year, monthCode, day })`.
6. Replace `epochSeconds` with `Math.floor(x.epochMilliseconds / 1000)` and `epochMicroseconds` with a BigInt division of `epochNanoseconds` that rounds toward negative infinity.
7. Replace `instant.toZonedDateTime({ timeZone, calendar })` with `instant.toZonedDateTimeISO(timeZone).withCalendar(calendar)`.
8. Remove `relativeTo` from `Duration.add()` and `subtract()`; add calendar durations to a date instead, then take `since()`.
9. Pass `ZonedDateTime` values to `toLocaleString`, not to `Intl.DateTimeFormat`.
10. Replace `roundingMode: 'nearest'` with `'halfExpand'` and `[u-ca-name]` annotations with `[u-ca=name]` if the code is that old.

## Preview

None. No draft of a later Temporal line exists. The proposal README says Temporal will be merged into ECMA-262 and ECMA-402 and the proposal repository archived; after that, the ECMA-262 draft is the text to pin.
