# Time zones and calendars

Read this when a value crosses between wall-clock time and exact time, when stored strings carry an offset and a time zone, or when code meets a calendar other than ISO 8601. Sources: the Temporal spec draft (§ 6, § 11, § 12, § 13, § 14.6.2) and the Temporal documentation (`timezone.md`, `zoneddatetime.md`, `calendars.md`), listed in [Sources](../SKILL.md#sources).

Some documentation pages still show examples from before the 2024 changes (`Temporal.Calendar.from`, `date.calendar`). Use the spec text and the `calendarId` and `timeZoneId` strings instead; see [`versions.md`](versions.md).

## Time zone identifiers

- A time zone is a string: an available named time zone or an offset time zone (§ 14.6.2). Implementations that follow ECMA-402 support exactly the Zone and Link names of the IANA Time Zone Database; every implementation supports `"UTC"`.
- Identifiers are matched ASCII-case-insensitively and output in their normalized case (§ 14.6.2). A Link name (non-primary identifier) is kept as given in `timeZoneId`, but `equals` treats it as the same zone as its primary identifier (§ 11.1.15).
- Offset time zones are `±HH:MM` with minute precision; sub-minute offsets are not valid time zone identifiers (§ 11.1.5, § 14.6.2).
- Offset time zones and fixed-offset IANA zones such as `Etc/GMT+8` do not follow DST or political changes. `Etc/GMT+8` means `-08:00`; the sign is reversed for historical reasons (`timezone.md`, `zoneddatetime.md`). The documentation discourages offset time zones with `ZonedDateTime`; for most such cases a `PlainDateTime` or an `Instant` is simpler (`zoneddatetime.md`).
- Where a time zone comes from matters: `Temporal.Now.timeZoneId()` is the system zone, which on a server may not be the user's (cookbook). Take the zone from user settings or the data.

## Exact time and wall-clock time

An `Instant` or `ZonedDateTime` is an exact time; a `Plain` value is a wall-clock reading. Converting exact to wall-clock time is always unambiguous. Converting wall-clock to exact time can have zero results (a skipped hour when DST starts) or two (a repeated hour when DST ends) (`timezone.md`). An offset on a string parsed into a `Plain` type is ignored, so the ambiguity remains (`timezone.md`).

### The `disambiguation` option

Accepted by `PlainDateTime.prototype.toZonedDateTime`, `ZonedDateTime.from` and `ZonedDateTime.prototype.with` (§ 5.3.38, § 6.5.2, § 6.3.31); default `compatible` (§ 13.7). Per § 11.1.12:

| Value        | Repeated time (two candidates) | Skipped time (no candidate)                         |
| ------------ | ------------------------------ | --------------------------------------------------- |
| `compatible` | the earlier instant            | the wall-clock time moved forward by the gap length |
| `earlier`    | the earlier instant            | the wall-clock time moved back by the gap length    |
| `later`      | the later instant              | the wall-clock time moved forward by the gap length |
| `reject`     | throws `RangeError`            | throws `RangeError`                                 |

`compatible` matches legacy `Date`, common date libraries and RFC 5545 (`timezone.md`). Methods without the option, such as `PlainDate.prototype.toZonedDateTime` with a `plainTime`, use `compatible` (§ 3.3.29).

### The `offset` option

When a string or property bag has both an offset and a time zone, and the offset no longer fits the zone (for example because the zone's rules changed after the value was stored), `offset` decides (§ 6.5.1, § 13.9):

| Value    | Behaviour                                                                                   |
| -------- | ------------------------------------------------------------------------------------------- |
| `use`    | Keep the exact time from the offset; the wall-clock time may change.                        |
| `ignore` | Keep the wall-clock time and compute the offset from current rules (then `disambiguation`). |
| `prefer` | Use the offset if it is valid for the zone, otherwise behave like `ignore`.                 |
| `reject` | Use the offset if it is valid, otherwise throw a `RangeError`.                              |

The default is `reject` in `ZonedDateTime.from` (§ 6.5.2) and `prefer` in `ZonedDateTime.prototype.with` (§ 6.3.31). A string with `Z` before the bracket (`2026-01-01T12:00Z[Europe/Amsterdam]`) is taken as an exact time, not checked against the offset (§ 6.5.2). Example from `timezone.md`: `2020-01-01T12:00-02:00[America/Sao_Paulo]` was saved before Brazil abolished DST; with `use` it becomes `11:00-03:00`, with `ignore` or `prefer` `12:00-03:00`, and the default throws.

Choose per data source: `use` when the stored exact time is authoritative (a log timestamp), `ignore` or `prefer` when the local time is (a future meeting at 12:00 local), and keep `reject` when a mismatch should stop processing.

### Transitions and day boundaries

- `zdt.getTimeZoneTransition('next' | 'previous')` returns the next or previous offset change as a `ZonedDateTime`, or `null` when there is none, for example for an offset time zone (§ 6.3.46).
- `zdt.startOfDay()` returns the first instant of the local day, which is not always midnight (§ 6.3.45, § 11.1.14). `zdt.hoursInDay` gives the length of that day (`zoneddatetime.md`).
- `zdt.withTimeZone(zone)` keeps the exact time and changes the wall-clock time (§ 6.3.33).

## Calendars

- A calendar is a string identifier. `"iso8601"` must be supported; implementations may support the CLDR calendar types of Unicode Technical Standard #35, such as `"gregory"`, `"hebrew"` or `"japanese"` (§ 12.1). Identifiers are canonicalized (§ 12.1.1).
- `Now.*ISO()`, `Instant.toZonedDateTimeISO()` and string parsing without a `[u-ca=]` annotation produce ISO 8601 values. `withCalendar(id)` changes the calendar and keeps the date (§ 3.3.24, § 6.3.34).
- Month codes identify a month independent of its position in a given year: `"M"` plus the two-digit position in a common year, with an `L` suffix for a leap month inserted after it. ISO 8601 uses `"M01"` to `"M12"`; Adar I in the Hebrew calendar is `"M05L"` (§ 12.2).
- Differences need both values in the same calendar, or `until` and `since` throw a `RangeError` (§ 3.5.14, § 6.5.9).

Best practices from `calendars.md`:

1. Validate or coerce the calendar of all external input: check `calendarId`, and convert with `withCalendar('iso8601')` when the code is not built for other calendars.
2. Compare with `compare`, never by fields; fields of different calendars are unrelated. Convert both values with `withCalendar` before `equals`, which returns `false` for the same date in different calendars.
3. Use `monthsInYear`, `daysInMonth` and `daysInYear` instead of 12, 30 or 365; the last month is `month === monthsInYear`.
4. Use `month` for the order of a month in its year and `monthCode` for a month across years (birthdays). `PlainMonthDay` has only `monthCode`.
5. Never combine `month` and `monthCode`, or `year` and `era`/`eraYear`, in one property bag; use `era` and `eraYear` as a pair.
6. Use `until` and `since` to count years and months; do not divide months by 12.
7. Expect `PlainMonthDay.prototype.toPlainDate({ year })` to move a leap day or leap month to a nearby date; by default `with` and `from` adjust non-existent dates the same way unless `overflow: "reject"`.
8. Format month names and eras with `toLocaleString(locale, { calendar: date.calendarId, month: "long" })`; never show `monthCode` or `era` raw.
9. For arithmetic that should agree with what `toLocaleString` shows, use the formatter's calendar: `date.withCalendar(new Intl.DateTimeFormat().resolvedOptions().calendar)`.
