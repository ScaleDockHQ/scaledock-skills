# Arithmetic and rounding

Read this when adding or subtracting time, measuring the difference between two values, rounding, or working with `Temporal.Duration`. Sources: the Temporal spec draft (§ 3 to § 9, § 13.5, § 13.43, § 14.5.2) and the Temporal documentation (`balancing.md`, `duration.md`, `zoneddatetime.md`, `plaintime.md`), listed in [Sources](../SKILL.md#sources).

## Units

The units, largest first, are `year`, `month`, `week`, `day`, `hour`, `minute`, `second`, `millisecond`, `microsecond` and `nanosecond`; options also accept the plural forms. `year`, `month` and `week` are calendar units whose length depends on the date. A `day` is 24 hours except in a `ZonedDateTime` across a time zone transition (§ 13.5).

## Adding and subtracting

- `add(duration)` and `subtract(duration)` take a `Duration`, a duration string (`"P1M"`) or a property bag (`{ months: 1 }`), and return a new value of the same type.
- Date types take `overflow: "constrain"` (default) or `"reject"` for results that do not exist: 31 January plus one month is 28 or 29 February under `constrain` and a `RangeError` under `reject` (§ 13.6).
- `ZonedDateTime.add` follows RFC 5545: the date part (years, months, weeks, days) is added on the calendar and the wall clock, then the time part is added in exact time (§ 6.5.5; `zoneddatetime.md`). From `2020-03-08T00:00-08:00[America/Los_Angeles]`, `add({ days: 1 })` gives `2020-03-09T00:00-07:00`, 23 real hours later, while `add({ hours: 24 })` gives `2020-03-09T01:00-07:00`.
- `Instant.add` accepts only time units, hours and smaller; date units throw a `RangeError` (§ 8.5.10).
- `PlainTime.add` wraps around midnight, so the result can be earlier than the input (`plaintime.md`).
- `Duration.add` and `subtract` throw a `RangeError` if either duration has years, months or weeks, and treat days as 24 hours (§ 7.5.41). To add calendar durations, add both to a start date, then measure with `since` (`duration.md`).

## Differences: `until` and `since`

`a.until(b)` is the duration from `a` to `b`; `a.since(b)` is from `b` to `a`. Both take `largestUnit`, `smallestUnit`, `roundingIncrement` and `roundingMode` (§ 13.43).

| Type             | Default `largestUnit` | Not allowed                  |
| ---------------- | --------------------- | ---------------------------- |
| `PlainDate`      | `day`                 | time units                   |
| `PlainTime`      | `hour`                | date units                   |
| `PlainDateTime`  | `day`                 |                              |
| `ZonedDateTime`  | `hour`                |                              |
| `Instant`        | `second`              | date units                   |
| `PlainYearMonth` | `year`                | `week`, `day` and time units |

- `roundingMode` defaults to `trunc`; `since` negates the rounding mode so that `a.since(b)` and `b.until(a)` agree (§ 13.43).
- Ask for the unit you mean: `d1.until(d2)` on dates returns days, so "how many months" needs `{ largestUnit: "month" }`.
- `ZonedDateTime.until` returns a hybrid duration: full calendar days in the date part and real elapsed time in the time part (`zoneddatetime.md`). Both values need the same calendar, and with `largestUnit` of `day` or larger, the same time zone; otherwise it throws a `RangeError`. With an hour or smaller `largestUnit` it measures exact time and the zones may differ (§ 6.5.9).
- All date types need both values in the same calendar (§ 3.5.14).

## Rounding a date or time

`round({ smallestUnit, roundingIncrement, roundingMode })` or `round("minute")`:

- `roundingMode` defaults to `halfExpand` for `round()` (§ 14.5.2.2). The modes are `ceil`, `floor`, `expand`, `trunc`, `halfCeil`, `halfFloor`, `halfExpand`, `halfTrunc` and `halfEven`.
- `roundingIncrement` must divide the next larger unit evenly: at most 24 for hours, 60 for minutes and seconds, 1000 for the sub-second units (§ 13.5, § 13.14). For `Instant.round` it must divide a whole day (§ 8.3.9).
- `ZonedDateTime.round` allows `smallestUnit` up to `day`, and rounds using the real length of that local day (§ 6.3.39). `Instant.round` allows up to `hour` (§ 8.3.9).

## Durations

- A `Duration` has ten fields, `years` to `nanoseconds`, plus `sign` and `blank`. All non-zero fields have the same sign (§ 7.5.16). `negated()` and `abs()` flip and drop the sign.
- Limits (§ 7.5.16): `years`, `months` and `weeks` below 2³² each, and the days-and-time part below 2⁵³ seconds in total.
- Construction does not balance: `Duration.from({ seconds: 100 })` keeps 100 seconds (`balancing.md`).
- `round({ largestUnit, smallestUnit, roundingIncrement, roundingMode, relativeTo })` balances and rounds. At least one of `smallestUnit` and `largestUnit` is required; `largestUnit: "auto"` keeps the largest unit present (§ 7.3.20; `balancing.md`). `PT80M90S.round({ largestUnit: "hour" })` is `PT1H21M30S`.
- `total({ unit, relativeTo })` returns a number, for example `Duration.from({ hours: 130, minutes: 20 }).total({ unit: "second" })` is 469200 (§ 7.3.21; docs README).
- `relativeTo` is a `PlainDate` (or date string) for time-zone-neutral durations or a `ZonedDateTime` (or zoned string) for time-zone-specific ones. It is required in `round`, `total` and `Duration.compare` when years, months or weeks are involved; without it, days count as 24 hours (`balancing.md`; § 7.2.3, § 7.3.20, § 7.3.21). `P370D.round({ largestUnit: "year", relativeTo: "2019-01-01" })` is `P1Y5D`; from `2020-01-01` it is `P1Y4D`.
- With a `ZonedDateTime` `relativeTo`, DST is counted: `PT48H.round({ largestUnit: "day", relativeTo: "2020-03-08T00:00-08:00[America/Los_Angeles]" })` is `P2DT1H` (`balancing.md`).
- `Duration.round` rejects a `roundingIncrement` above 1 for a calendar `smallestUnit` unless `largestUnit` is the same unit (§ 7.3.20).
- `toLocaleString()` formats a duration with `Intl.DurationFormat` (§ 15.11.1.1).

## Patterns

- Age or tenure: `birthDate.until(today, { largestUnit: "year" }).years`.
- "Same time tomorrow" in a zone: `zdt.add({ days: 1 })`. "Exactly 24 hours later": `zdt.add({ hours: 24 })` or the `Instant`.
- Countdown: `Temporal.Now.instant().until(deadline, { largestUnit: "hour", smallestUnit: "second" })`.
- Last day of a month: `date.with({ day: date.daysInMonth })`; last month of a year: `month === monthsInYear` (`calendars.md`).
