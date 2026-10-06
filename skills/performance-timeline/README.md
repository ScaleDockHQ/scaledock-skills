# performance-timeline

An agent skill for Performance Timeline.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill performance-timeline
```

Then ask the agent to apply Performance Timeline.

## What it covers

- when measuring load, paint, events, long tasks or server timing in the browser
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line                         | Status                |
| ---------------------------- | --------------------- |
| Performance Timeline Level 1 | current (build)       |
| Performance Timeline         | legacy (upgrade from) |
| High Resolution Time Level 2 | current               |
| High Resolution Time Level 3 | preview (track)       |
| Navigation Timing            | current               |
| Navigation Timing Level 2    | preview (track)       |
| Resource Timing              | current (build)       |
| User Timing Level 2          | current               |
| User Timing                  | preview (build)       |
| Server Timing                | current (track)       |
| Paint Timing Level 1         | current (track)       |
| Largest Contentful Paint     | current (track)       |
| Event Timing API             | current (track)       |
| Long Tasks API Level 1       | current (track)       |
| Long Animation Frames API    | current (track)       |
| Beacon                       | current (build)       |
| requestIdleCallback()        | current (track)       |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Performance Timeline](https://www.w3.org/TR/performance-timeline/): Candidate Recommendation Draft, performance-timeline-1 CRD-performance-timeline-20250213 (Candidate Recommendation Draft, 2025-05-21).
- [High Resolution Time Level 2](https://www.w3.org/TR/hr-time-2/): Recommendation, hr-time-2 REC-hr-time-2-20191121 (Recommendation, 2019-11-21).
- [High Resolution Time](https://www.w3.org/TR/hr-time-3/): Working Draft, hr-time-3 WD-hr-time-3-20260901 (Working Draft, 2026-09-01).
- [Navigation Timing](https://www.w3.org/TR/navigation-timing/): Recommendation, navigation-timing REC-navigation-timing-20121217 (Recommendation, 2012-12-17).
- [Navigation Timing Level 2](https://www.w3.org/TR/navigation-timing-2/): Working Draft, navigation-timing-2 WD-navigation-timing-2-20260901 (Working Draft, 2026-09-01).
- [Resource Timing](https://www.w3.org/TR/resource-timing/): Candidate Recommendation Draft, resource-timing CRD-resource-timing-20260901 (Candidate Recommendation Draft, 2026-09-01).
- [User Timing Level 2](https://www.w3.org/TR/user-timing-2/): Recommendation, user-timing-2 REC-user-timing-2-20190226 (Recommendation, 2019-02-26).
- [User Timing](https://www.w3.org/TR/user-timing/): Candidate Recommendation Draft, user-timing CRD-user-timing-20260311 (Candidate Recommendation Draft, 2026-03-11).
- [Server Timing](https://www.w3.org/TR/server-timing/): Working Draft, server-timing WD-server-timing-20260407 (Working Draft, 2026-04-07).
- [Paint Timing](https://www.w3.org/TR/paint-timing/): Working Draft, paint-timing WD-paint-timing-20261002 (Working Draft, 2026-10-02).
- [Largest Contentful Paint](https://www.w3.org/TR/largest-contentful-paint/): Working Draft, largest-contentful-paint WD-largest-contentful-paint-20260826 (Working Draft, 2026-08-26).
- [Event Timing API](https://www.w3.org/TR/event-timing/): Working Draft, event-timing WD-event-timing-20260319 (Working Draft, 2026-03-19).
- [Long Tasks API](https://www.w3.org/TR/longtasks-1/): Working Draft, longtasks-1 WD-longtasks-1-20260319 (Working Draft, 2026-03-19).
- [Long Animation Frames API](https://www.w3.org/TR/long-animation-frames/): First Public Working Draft, long-animation-frames WD-long-animation-frames-20260428 (First Public Working Draft, 2026-04-28).
- [Beacon](https://www.w3.org/TR/beacon/): Candidate Recommendation Draft, beacon CRD-beacon-20220803 (Candidate Recommendation Draft, 2022-08-03).
- [requestIdleCallback()](https://www.w3.org/TR/requestidlecallback/): Working Draft, requestidlecallback WD-requestidlecallback-20250521 (Working Draft, 2025-05-21).
- [Core Web Vitals](https://web.dev/articles/vitals): web.dev article, read 2026-10-06.

## License

MIT
