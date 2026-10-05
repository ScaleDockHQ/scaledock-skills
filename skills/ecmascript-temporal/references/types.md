# Types

Read this when choosing a Temporal type, converting between types, reading the current time, or comparing values. Sources: the Temporal spec draft (§ 1 to § 10) and the Temporal documentation (README, `now.md`, `plainyearmonth.md`, `plainmonthday.md`, `zoneddatetime.md`) and cookbook, listed in [Sources](../SKILL.md#sources).

## The namespace

`Temporal` is an ordinary object used as a namespace, like `Math`; it is not a constructor (§ 1). Every type is immutable: methods return new objects (docs README). Types whose names start with `Plain` have no time zone; converting them to or from exact time is where time zone and DST ambiguity is resolved (docs README).

## Choosing a type

| Value means                                             | Type                      | Example string                                |
| ------------------------------------------------------- | ------------------------- | --------------------------------------------- |
| An exact moment, no local interpretation needed         | `Temporal.Instant`        | `2026-03-29T01:30:00Z`                        |
| An exact moment as seen in one place (events, meetings) | `Temporal.ZonedDateTime`  | `2026-03-29T03:30:00+02:00[Europe/Amsterdam]` |
| A calendar date with no time (birthdays, due dates)     | `Temporal.PlainDate`      | `2026-03-29`                                  |
| A wall-clock time with no date (opening hours)          | `Temporal.PlainTime`      | `09:00:00`                                    |
| A date and wall-clock time with no time zone            | `Temporal.PlainDateTime`  | `2026-03-29T09:00:00`                         |
| A month in a year ("the October 2020 meeting")          | `Temporal.PlainYearMonth` | `2020-10`                                     |
| A recurring month and day ("14 July")                   | `Temporal.PlainMonthDay`  | `07-14`                                       |
| A length of time                                        | `Temporal.Duration`       | `PT5M30S`                                     |

Rules from the documentation:

- `ZonedDateTime` is the broadest type: an `Instant` plus a time zone and calendar, and it adjusts for DST in arithmetic. When a use case needs a time zone, especially with arithmetic or derived values, use `ZonedDateTime` rather than `PlainDateTime` (docs README).
- `Instant` has no calendar or time zone. For a human-readable date or clock time, convert it with a time zone to `ZonedDateTime` or `PlainDateTime` (docs README).
- Separate date-only and time-only types exist so that code does not assume midnight, UTC or the local zone for values that are actually unknown (docs README).

## Fields and range

- Date types expose `calendarId`, `era`, `eraYear`, `year`, `month` (1-based), `monthCode`, `day`, `dayOfWeek`, `dayOfYear`, `weekOfYear`, `yearOfWeek`, `daysInWeek`, `daysInMonth`, `daysInYear`, `monthsInYear` and `inLeapYear` (§ 3.3). `weekOfYear` and `yearOfWeek` are `undefined` for calendars without a week system (§ 14.3).
- Time fields are `hour`, `minute`, `second`, `millisecond`, `microsecond` and `nanosecond` (§ 4.3).
- `ZonedDateTime` adds `timeZoneId`, `offset` (string), `offsetNanoseconds`, `hoursInDay`, `epochMilliseconds` and `epochNanoseconds` (§ 6.3). `hoursInDay` is the real number of hours in that local day, for example 23 or 25 on DST days (`zoneddatetime.md`).
- `Instant` exposes only `epochMilliseconds` and `epochNanoseconds` (a BigInt) (§ 8.3). Instants are limited to 10⁸ days either side of the epoch (§ 8.4.1).
- `PlainMonthDay` has `monthCode` and `day` but no `month` getter, and no static `compare` (§ 10.3).

## Creating values

- Prefer `Type.from(stringOrPropertyBag)`. Constructors take ISO 8601 fields (`new Temporal.PlainDate(isoYear, isoMonth, isoDay, calendar)`, § 3.1.1); `new Temporal.ZonedDateTime(epochNanoseconds, timeZone, calendar)` and `new Temporal.Instant(epochNanoseconds)` take a BigInt (§ 6.1.1, § 8.1.1).
- For `PlainYearMonth` and `PlainMonthDay`, avoid the constructor's `calendar` and reference-day or reference-year arguments: values with different reference days or years are not `equals`. Use `from()`, which sets a valid, comparable reference (`plainyearmonth.md`, `plainmonthday.md`).
- `Instant.fromEpochMilliseconds(ms)` and `Instant.fromEpochNanoseconds(ns)` create instants from numbers (§ 8.2).
- `from()` with a property bag takes `overflow: "constrain"` (default) or `"reject"` for out-of-range fields such as 31 February (§ 13.6).

## Temporal.Now

`Temporal.Now` has `timeZoneId()`, `instant()`, `zonedDateTimeISO([timeZone])`, `plainDateTimeISO([timeZone])`, `plainDateISO([timeZone])` and `plainTimeISO([timeZone])` (§ 2). Without the argument they use the system time zone (`now.md`). In a browser that is the user's zone; on a server it may not be what you expect, so pass the time zone explicitly there (cookbook, `fromLegacyDate`). For a Unix timestamp use `Temporal.Now.instant().epochMilliseconds` (cookbook).

## Converting between types

| From            | To              | Method                                                                                          |
| --------------- | --------------- | ----------------------------------------------------------------------------------------------- |
| `Instant`       | `ZonedDateTime` | `instant.toZonedDateTimeISO(timeZone)`, then `withCalendar(id)` for another calendar (§ 8.3.15) |
| `ZonedDateTime` | `Instant`       | `zdt.toInstant()`                                                                               |
| `ZonedDateTime` | `Plain*`        | `zdt.toPlainDate()`, `toPlainTime()`, `toPlainDateTime()`                                       |
| `PlainDateTime` | `ZonedDateTime` | `pdt.toZonedDateTime(timeZone, { disambiguation })` (§ 5.3.38)                                  |
| `PlainDate`     | `ZonedDateTime` | `date.toZonedDateTime(timeZone)` for the start of day, or `{ timeZone, plainTime }` (§ 3.3.29)  |
| `PlainDate`     | `PlainDateTime` | `date.toPlainDateTime(time)`                                                                    |
| `PlainDate`     | partial dates   | `date.toPlainYearMonth()`, `date.toPlainMonthDay()`                                             |
| partial dates   | `PlainDate`     | `yearMonth.toPlainDate({ day })`, `monthDay.toPlainDate({ year })`                              |
| `ZonedDateTime` | other zone      | `zdt.withTimeZone(timeZone)` keeps the exact time (§ 6.3.33)                                    |

`PlainDate.toZonedDateTime` without a time uses the first instant of that day in the zone, which is not always midnight (§ 3.3.29, § 11.1.14). With a time it resolves ambiguity as `compatible`. To keep the wall-clock time and change the zone instead of the exact time, use `zdt.toPlainDateTime().toZonedDateTime(newZone)` (`zoneddatetime.md`).

Methods that take a Temporal object also accept a string or a property bag of the same type (`strings.md`).

## Comparing

- `valueOf()` throws a `TypeError` on every type (§ 3.3.33, § 4.3.19, § 5.3.37, § 6.3.44, § 7.3.25, § 8.3.14, § 9.3.22, § 10.3.11), so `<`, `>` and arithmetic on objects throw, and `==` compares object identity.
- `compare(a, b)` returns -1, 0 or 1 and suits `Array.prototype.sort`. It uses the ISO date and time and ignores calendars; `ZonedDateTime.compare` uses only the exact time (§ 3.2.3, § 6.2.3).
- `a.equals(b)` is stricter: it also requires the same calendar, and for `ZonedDateTime` the same time zone (§ 3.3.27, § 6.3.40). `PlainMonthDay` has only `equals`.
- `Duration.compare(a, b, { relativeTo })` needs `relativeTo` when either duration has calendar units (§ 7.2.3).
