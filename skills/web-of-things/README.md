# web-of-things

An agent skill for Web of Things.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill web-of-things
```

Then ask the agent to apply Web of Things.

## What it covers

- when describing or discovering a Thing
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line                                            | Status                |
| ----------------------------------------------- | --------------------- |
| Web of Things (WoT) Architecture 1.1            | current               |
| Web of Things (WoT) Architecture Level 1.0      | legacy (upgrade from) |
| Web of Things (WoT) Thing Description 1.1       | current               |
| Web of Things (WoT) Thing Description 2.0       | preview (track)       |
| Web of Things (WoT) Thing Description Level 1.0 | legacy (upgrade from) |
| Web of Things (WoT) Discovery                   | current               |
| Web of Things (WoT) Profiles                    | current (track)       |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Web of Things (WoT) Architecture 1.1](https://www.w3.org/TR/wot-architecture11/): Recommendation, wot-architecture11 REC-wot-architecture-20200409 (Recommendation, 2023-12-05).
- [Web of Things (WoT) Architecture](https://www.w3.org/TR/wot-architecture10/): Recommendation, wot-architecture10 CR-wot-architecture-20190516 (Recommendation, 2020-04-09).
- [Web of Things (WoT) Thing Description 1.1](https://www.w3.org/TR/wot-thing-description11/): Recommendation, wot-thing-description11 REC-wot-thing-description-20200409 (Recommendation, 2023-12-05).
- [Web of Things (WoT) Thing Description 2.0](https://www.w3.org/TR/wot-thing-description-2.0/): First Public Working Draft, wot-thing-description-2.0 REC-wot-thing-description11-20231205 (First Public Working Draft, 2025-11-04).
- [Web of Things (WoT) Thing Description](https://www.w3.org/TR/wot-thing-description10/): Recommendation, wot-thing-description10 REC-wot-thing-description-20200409 (Recommendation, 2020-04-09).
- [Web of Things (WoT) Discovery](https://www.w3.org/TR/wot-discovery/): Recommendation, wot-discovery REC-wot-discovery-20231205 (Recommendation, 2023-12-05).
- [Web of Things (WoT) Profiles](https://www.w3.org/TR/wot-profile/): Working Draft, wot-profile WD-wot-profile-20251104 (Working Draft, 2025-11-04).
- [Web of Things (WoT) Binding Registry](https://www.w3.org/TR/wot-binding-registry/): Draft Registry, wot-binding-registry (Draft Registry, 2025-11-04).

## License

MIT
