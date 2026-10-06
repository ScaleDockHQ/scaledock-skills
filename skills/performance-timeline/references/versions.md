# Versions and upgrades

Read this when choosing a target version, reading a document written for an older line, upgrading, or deciding whether to use a preview. Sources: the specification text of each line, listed in [Sources](../SKILL.md#sources). Statuses follow the publisher index read on 2026-10-06: the latest Recommendation is current, an earlier Recommendation is legacy unless a later phase names a law that still cites it, and a newer Working Draft or Candidate Recommendation is a preview.

## Version lines

| Id                            | Line                         | Status  | Revision                                                                                              | Posture | Publisher                                 |
| ----------------------------- | ---------------------------- | ------- | ----------------------------------------------------------------------------------------------------- | ------- | ----------------------------------------- |
| `performance-timeline-1`      | Performance Timeline Level 1 | current | performance-timeline-1 CRD-performance-timeline-20250213 (Candidate Recommendation Draft, 2025-05-21) | build   | Candidate Recommendation Draft 2025-05-21 |
| `performance-timeline`        | Performance Timeline         | legacy  | performance-timeline CRD-performance-timeline-20250213 (Candidate Recommendation Draft, 2024-02-16)   |         | Candidate Recommendation Draft 2024-02-16 |
| `hr-time-2`                   | High Resolution Time Level 2 | current | hr-time-2 REC-hr-time-2-20191121 (Recommendation, 2019-11-21)                                         |         | Recommendation 2019-11-21                 |
| `hr-time-3-preview`           | High Resolution Time Level 3 | preview | hr-time-3 WD-hr-time-3-20260901 (Working Draft, 2026-09-01)                                           | track   | Working Draft 2026-09-01                  |
| `navigation-timing`           | Navigation Timing            | current | navigation-timing REC-navigation-timing-20121217 (Recommendation, 2012-12-17)                         |         | Recommendation 2012-12-17                 |
| `navigation-timing-2-preview` | Navigation Timing Level 2    | preview | navigation-timing-2 WD-navigation-timing-2-20260901 (Working Draft, 2026-09-01)                       | track   | Working Draft 2026-09-01                  |
| `resource-timing`             | Resource Timing              | current | resource-timing CRD-resource-timing-20260901 (Candidate Recommendation Draft, 2026-09-01)             | build   | Candidate Recommendation Draft 2026-09-01 |
| `user-timing-2`               | User Timing Level 2          | current | user-timing-2 REC-user-timing-2-20190226 (Recommendation, 2019-02-26)                                 |         | Recommendation 2019-02-26                 |
| `user-timing-preview`         | User Timing                  | preview | user-timing CRD-user-timing-20260311 (Candidate Recommendation Draft, 2026-03-11)                     | build   | Candidate Recommendation Draft 2026-03-11 |
| `server-timing`               | Server Timing                | current | server-timing WD-server-timing-20260407 (Working Draft, 2026-04-07)                                   | track   | Working Draft 2026-04-07                  |
| `paint-timing`                | Paint Timing Level 1         | current | paint-timing WD-paint-timing-20261002 (Working Draft, 2026-10-02)                                     | track   | Working Draft 2026-10-02                  |
| `largest-contentful-paint`    | Largest Contentful Paint     | current | largest-contentful-paint WD-largest-contentful-paint-20260826 (Working Draft, 2026-08-26)             | track   | Working Draft 2026-08-26                  |
| `event-timing`                | Event Timing API             | current | event-timing WD-event-timing-20260319 (Working Draft, 2026-03-19)                                     | track   | Working Draft 2026-03-19                  |
| `longtasks-1`                 | Long Tasks API Level 1       | current | longtasks-1 WD-longtasks-1-20260319 (Working Draft, 2026-03-19)                                       | track   | Working Draft 2026-03-19                  |
| `long-animation-frames`       | Long Animation Frames API    | current | long-animation-frames WD-long-animation-frames-20260428 (First Public Working Draft, 2026-04-28)      | track   | First Public Working Draft 2026-04-28     |
| `beacon`                      | Beacon                       | current | beacon CRD-beacon-20220803 (Candidate Recommendation Draft, 2022-08-03)                               | build   | Candidate Recommendation Draft 2022-08-03 |
| `requestidlecallback`         | requestIdleCallback()        | current | requestidlecallback WD-requestidlecallback-20250521 (Working Draft, 2025-05-21)                       | track   | Working Draft 2025-05-21                  |

Statuses: **current** is the default target; **supported** is released and still a valid target when a consumer needs it; **legacy** is superseded, read and upgraded from but never authored; **preview** is a draft of the next line, used only as its posture allows. A line whose only publication is itself a draft is **current** and carries a posture.

## Which version to use

- Default to the current line of the relevant family.
- Drop to a supported line only for a named consumer that cannot read the current one.
- Treat a legacy document as input to an upgrade.
- Emit nothing from a preview unless its posture is build and the user opted in.

## What changed

### Performance Timeline Level 1

- Publisher status on 2026-10-06: Candidate Recommendation Draft (2025-05-21).
- Pinned text: https://www.w3.org/TR/performance-timeline/
- Revision token: performance-timeline-1 CRD-performance-timeline-20250213 (Candidate Recommendation Draft, 2025-05-21)

### Performance Timeline

- Publisher status on 2026-10-06: Candidate Recommendation Draft (2024-02-16).
- Pinned text: https://www.w3.org/TR/performance-timeline/
- Revision token: performance-timeline CRD-performance-timeline-20250213 (Candidate Recommendation Draft, 2024-02-16)

### High Resolution Time Level 2

- Publisher status on 2026-10-06: Recommendation (2019-11-21).
- Pinned text: https://www.w3.org/TR/hr-time-2/
- Revision token: hr-time-2 REC-hr-time-2-20191121 (Recommendation, 2019-11-21)

### High Resolution Time Level 3

- Publisher status on 2026-10-06: Working Draft (2026-09-01).
- Pinned text: https://www.w3.org/TR/hr-time-3/
- Revision token: hr-time-3 WD-hr-time-3-20260901 (Working Draft, 2026-09-01)

### Navigation Timing

- Publisher status on 2026-10-06: Recommendation (2012-12-17).
- Pinned text: https://www.w3.org/TR/navigation-timing/
- Revision token: navigation-timing REC-navigation-timing-20121217 (Recommendation, 2012-12-17)

### Navigation Timing Level 2

- Publisher status on 2026-10-06: Working Draft (2026-09-01).
- Pinned text: https://www.w3.org/TR/navigation-timing-2/
- Revision token: navigation-timing-2 WD-navigation-timing-2-20260901 (Working Draft, 2026-09-01)

### Resource Timing

- Publisher status on 2026-10-06: Candidate Recommendation Draft (2026-09-01).
- Pinned text: https://www.w3.org/TR/resource-timing/
- Revision token: resource-timing CRD-resource-timing-20260901 (Candidate Recommendation Draft, 2026-09-01)

### User Timing Level 2

- Publisher status on 2026-10-06: Recommendation (2019-02-26).
- Pinned text: https://www.w3.org/TR/user-timing-2/
- Revision token: user-timing-2 REC-user-timing-2-20190226 (Recommendation, 2019-02-26)

### User Timing

- Publisher status on 2026-10-06: Candidate Recommendation Draft (2026-03-11).
- Pinned text: https://www.w3.org/TR/user-timing/
- Revision token: user-timing CRD-user-timing-20260311 (Candidate Recommendation Draft, 2026-03-11)

### Server Timing

- Publisher status on 2026-10-06: Working Draft (2026-04-07).
- Pinned text: https://www.w3.org/TR/server-timing/
- Revision token: server-timing WD-server-timing-20260407 (Working Draft, 2026-04-07)

### Paint Timing Level 1

- Publisher status on 2026-10-06: Working Draft (2026-10-02).
- Pinned text: https://www.w3.org/TR/paint-timing/
- Revision token: paint-timing WD-paint-timing-20261002 (Working Draft, 2026-10-02)

### Largest Contentful Paint

- Publisher status on 2026-10-06: Working Draft (2026-08-26).
- Pinned text: https://www.w3.org/TR/largest-contentful-paint/
- Revision token: largest-contentful-paint WD-largest-contentful-paint-20260826 (Working Draft, 2026-08-26)

### Event Timing API

- Publisher status on 2026-10-06: Working Draft (2026-03-19).
- Pinned text: https://www.w3.org/TR/event-timing/
- Revision token: event-timing WD-event-timing-20260319 (Working Draft, 2026-03-19)

### Long Tasks API Level 1

- Publisher status on 2026-10-06: Working Draft (2026-03-19).
- Pinned text: https://www.w3.org/TR/longtasks-1/
- Revision token: longtasks-1 WD-longtasks-1-20260319 (Working Draft, 2026-03-19)

### Long Animation Frames API

- Publisher status on 2026-10-06: First Public Working Draft (2026-04-28).
- Pinned text: https://www.w3.org/TR/long-animation-frames/
- Revision token: long-animation-frames WD-long-animation-frames-20260428 (First Public Working Draft, 2026-04-28)

### Beacon

- Publisher status on 2026-10-06: Candidate Recommendation Draft (2022-08-03).
- Pinned text: https://www.w3.org/TR/beacon/
- Revision token: beacon CRD-beacon-20220803 (Candidate Recommendation Draft, 2022-08-03)

### requestIdleCallback()

- Publisher status on 2026-10-06: Working Draft (2025-05-21).
- Pinned text: https://www.w3.org/TR/requestidlecallback/
- Revision token: requestidlecallback WD-requestidlecallback-20250521 (Working Draft, 2025-05-21)

## Upgrading

### performance-timeline to performance-timeline-1

1. Treat documents that cite Performance Timeline (performance-timeline CRD-performance-timeline-20250213 (Candidate Recommendation Draft, 2024-02-16)) as input.
2. Re-read Performance Timeline Level 1 at https://www.w3.org/TR/performance-timeline/.
3. Keep behavior that Performance Timeline Level 1 still requires, and replace behavior that only Performance Timeline required.
4. Record the target revision on the artifact.

## Preview: High Resolution Time Level 3

`hr-time-3-preview` is a Working Draft dated 2026-09-01, pinned at https://www.w3.org/TR/hr-time-3/. Posture: track. Do not emit it. Read it to see what the publisher is changing. When it becomes a Recommendation, make it current and move the previous current line to supported or legacy.

## Preview: Navigation Timing Level 2

`navigation-timing-2-preview` is a Working Draft dated 2026-09-01, pinned at https://www.w3.org/TR/navigation-timing-2/. Posture: track. Do not emit it. Read it to see what the publisher is changing. When it becomes a Recommendation, make it current and move the previous current line to supported or legacy.

## Preview: User Timing

`user-timing-preview` is a Candidate Recommendation Draft dated 2026-03-11, pinned at https://www.w3.org/TR/user-timing/. Posture: build. Emit it only when the user opts in, and label the result as work against this draft. When it becomes a Recommendation, make it current and move the previous current line to supported or legacy.
