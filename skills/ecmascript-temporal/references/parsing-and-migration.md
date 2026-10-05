# Parsing, serialization and migration

Read this when reading or writing date and time strings, formatting for people, or replacing `Date`. Sources: the Temporal spec draft (§ 13.10 to § 13.15, § 13.31, § 13.35, § 14.9.1, § 15.6, § 15.11), the Temporal documentation (`strings.md`, `zoneddatetime.md`) and cookbook, RFC 9557, RFC 3339 and ECMA-262 § 21.4, listed in [Sources](../SKILL.md#sources).

## Machine-readable and human-readable strings

Use `toString()` (and `toJSON()`) for data other programs read, and `toLocaleString()` for people. Temporal parses only machine-readable strings; it never parses localized formats such as `MM/DD/YY`, and it does not parse ISO 8601 week dates such as `2020-W13-5` (`strings.md`).

## The string formats

Temporal strings are RFC 3339 timestamps extended with RFC 9557 suffixes.

- RFC 3339 § 5.6 defines `full-date "T" full-time`, with `time-offset` either `Z` or `±HH:MM`; `T` and `Z` may be lower case, and producers should use upper case.
- RFC 9557 adds bracketed suffixes after the timestamp: a time zone (`[Europe/Paris]` or `[+01:00]`) and tags such as the calendar `[u-ca=hebrew]` (§ 3, § 5). A suffix is elective unless it starts with `!` (critical); a receiver must not act on a timestamp whose critical suffix it cannot process (§ 3.3). Tag keys starting with `_` are experimental and must not be used for interchange (§ 3.2).
- RFC 9557 § 2 updates RFC 3339: `Z` now means the exact time is known but the local offset is not (the same as `-00:00`), and `+00:00` means UTC is the preferred reference point.

What each type parses (§ 13.31, § 13.35; `strings.md`):

| Type             | Needs                                                  | Example                                  |
| ---------------- | ------------------------------------------------------ | ---------------------------------------- |
| `Instant`        | `Z` or a numeric offset; a time zone suffix is ignored | `2022-02-28T03:06:00+02:00`              |
| `ZonedDateTime`  | a bracketed time zone; the offset is optional          | `2022-02-28T03:06:00+02:00[Europe/Kyiv]` |
| `PlainDateTime`  | date and time; no `Z`                                  | `2022-02-28T03:06:00`                    |
| `PlainDate`      | a date; no `Z`                                         | `2022-02-28`                             |
| `PlainTime`      | a time; no `Z`                                         | `03:06:00`                               |
| `PlainYearMonth` | year and month (ISO calendar only without a day)       | `2022-02`                                |
| `PlainMonthDay`  | month and day (ISO calendar only without a year)       | `02-28`                                  |
| `Duration`       | an ISO 8601 duration                                   | `P1Y2M3DT4H5M6.5S`                       |

- A string with more information than the type needs is accepted and the extra parts ignored, so `PlainDate.from("2022-02-28T11:06:00+08:00[Asia/Shanghai]")` is `2022-02-28` (`strings.md`).
- The same string can parse into several types, so pick the type first; there is no function that guesses (`strings.md`).
- `Plain` types throw on a `Z` string, to stop UTC timestamps being read as local dates. When the UTC date is really wanted: `Temporal.Instant.from(s).toZonedDateTimeISO("UTC").toPlainDate()` (`strings.md`).
- `ZonedDateTime.from` throws without a bracketed time zone. Parse such timestamps with `Instant.from` and add the zone with `toZonedDateTimeISO(zone)`. To keep the offset of a timestamp as the zone, pass the string itself: `Temporal.Instant.from(s).toZonedDateTimeISO(s)` (`strings.md`).
- Grammar details (§ 13.31): calendar dates only; years of four digits or `+`/`-` and six digits (`-000000` is invalid); 1 to 9 fractional second digits; a space instead of `T`; `-00:00` is read as `+00:00`.
- Annotations (§ 13.35): the first `u-ca` wins; several `u-ca` annotations with one marked critical throw; an unknown key marked critical throws a `RangeError`; second `60` is read as `59`.
- Methods that take a Temporal object also take its string or property bag, so `date.until("2022-01-15")` works (`strings.md`).

## Serializing

`toString(options)` options (§ 13.10 to § 13.15):

| Option                   | Values                                                         | Default | Types                                    |
| ------------------------ | -------------------------------------------------------------- | ------- | ---------------------------------------- |
| `calendarName`           | `auto`, `always`, `never`, `critical`                          | `auto`  | date types and `ZonedDateTime`           |
| `timeZoneName`           | `auto`, `never`, `critical`                                    | `auto`  | `ZonedDateTime`                          |
| `offset`                 | `auto`, `never`                                                | `auto`  | `ZonedDateTime`                          |
| `fractionalSecondDigits` | `auto` or 0 to 9                                               | `auto`  | types with a time, `Instant`, `Duration` |
| `smallestUnit`           | `minute`, `second`, `millisecond`, `microsecond`, `nanosecond` |         | types with a time, `Instant`, `Duration` |
| `roundingMode`           | as for `round()`                                               | `trunc` | types with a time, `Instant`, `Duration` |

- `calendarName: "auto"` omits `[u-ca=iso8601]` and writes every other calendar; `"never"` drops it, `"critical"` writes `[!u-ca=…]` (§ 12.3.15). Store values in non-ISO calendars with their annotation so they round-trip.
- `Instant.prototype.toString({ timeZone })` writes the local time and offset of that zone, still as an exact time (§ 8.3.11).
- Store a `ZonedDateTime` with its offset and time zone (the default output). The offset lets a reader detect a changed time zone rule; choose `offset` when reading it back, see [`time-zones-and-calendars.md`](time-zones-and-calendars.md).
- To sort timestamp strings, parse them with `Instant.from` and sort with `Instant.compare`; string order is wrong for mixed offsets (cookbook).

## Formatting for people

- `toLocaleString(locales, options)` on every type takes `Intl.DateTimeFormat` options (§ 15.11). `ZonedDateTime.prototype.toLocaleString` formats in the object's own time zone; a non-ISO calendar on it must match the formatter's calendar, or it throws a `RangeError` (§ 15.11.8.1). The documentation adds that passing a different `timeZone` option throws a `RangeError` (`zoneddatetime.md`).
- `Intl.DateTimeFormat.prototype.format`, `formatToParts`, `formatRange` and `formatRangeToParts` accept `Instant`, `PlainDate`, `PlainTime`, `PlainDateTime`, `PlainYearMonth` and `PlainMonthDay`, but throw a `TypeError` for `ZonedDateTime` (§ 15.6.22).
- `Instant` is formatted in the formatter's time zone. `Plain` values are formatted as wall-clock values without a time zone shift (§ 15.6.15 to § 15.6.20).
- Calendar rules (§ 15.6.15 to § 15.6.19): `PlainDate` and `PlainDateTime` must use the formatter's calendar or `iso8601`; `PlainYearMonth` and `PlainMonthDay` must use exactly the formatter's calendar. Otherwise the call throws a `RangeError`. For `PlainDate`, `PlainTime`, `PlainYearMonth` and `PlainMonthDay`, a formatter whose options have no fields that fit the type throws a `TypeError`.
- `formatRange` needs two values of the same Temporal type (§ 15.6.13).
- `Duration.prototype.toLocaleString` uses `Intl.DurationFormat` (§ 15.11.1.1).
- Never build display strings from fields (`${month}/${day}/${year}`); for localized messages that embed dates, see the `messageformat` skill.

## Migrating from `Date`

### Differences that cause bugs

- A `Date` is a mutable millisecond count since the epoch (ECMA-262 § 21.4.1.1). It can only show it in the host's local time zone or UTC, and setters such as `setMonth` change it in place (§ 21.4.4.25).
- `Date.parse` and `new Date(string)` read date-only ISO strings as UTC and date-time strings without an offset as local time, and may accept other formats in implementation-specific ways (§ 21.4.3.2). Temporal parses only the formats above and throws on the rest.
- `Date` has millisecond precision; Temporal has nanosecond precision.

### Recipes (cookbook)

| Task                          | `Date`                               | Temporal                                                |
| ----------------------------- | ------------------------------------ | ------------------------------------------------------- |
| Current timestamp in ms       | `Date.now()`                         | `Temporal.Now.instant().epochMilliseconds`              |
| `Date` to exact time          | `date`                               | `date.toTemporalInstant()` (§ 14.9.1)                   |
| `Date` to local date and time | `date.getHours()` and others         | `date.toTemporalInstant().toZonedDateTimeISO(timeZone)` |
| Exact time to `Date`          |                                      | `new Date(instant.epochMilliseconds)`                   |
| Parse an ISO timestamp        | `new Date(s)`                        | `Temporal.Instant.from(s)`                              |
| Today's date for a user       | `new Date()` plus getters            | `Temporal.Now.plainDateISO(timeZone)`                   |
| Offset from UTC               | `-date.getTimezoneOffset()` minutes  | `zdt.offset` or `zdt.offsetNanoseconds`                 |
| Add a month                   | `date.setMonth(date.getMonth() + 1)` | `date.add({ months: 1 })`, returning a new value        |

- On a server, pass an explicit time zone instead of `Temporal.Now.timeZoneId()`; the system zone may not be the user's (cookbook `fromLegacyDate`).
- A `Date` that holds only a date: `new Date(2000, 0, 1)` is local midnight, so convert with the local zone; `new Date(Date.UTC(2000, 0, 1))` and `new Date("2000-01-01T00:00Z")` are UTC midnight, so convert with `"UTC"`. Then call `.toPlainDate()` (cookbook `fromLegacyDateOnly`).
- `new Date(x.epochMilliseconds)` truncates sub-millisecond digits and drops the time zone; round first with `x.round({ smallestUnit: "millisecond" })` when truncation is wrong (cookbook `toLegacyDate`).
- Replace `getTime()` comparisons and `a - b` with `Instant.compare`, `equals` and `until`.
