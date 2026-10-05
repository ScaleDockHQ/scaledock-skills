# ocsf

An agent skill for the Open Cybersecurity Schema Framework (OCSF) 1.x: mapping application audit logs to valid OCSF 1.9.0 events, and upgrading events from older 1.x releases.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill ocsf
```

Then ask your agent to "map our audit log to OCSF" or "validate these OCSF events".

## What it covers

- Categories, classes and activity IDs, including Authentication, Authorize Session, API Activity, User Management and Role Management, and the classes 1.9.0 deprecates.
- Required and recommended base attributes, `type_uid`, enums, time attributes, and the `metadata` object with `metadata.version`.
- Profiles, extensions and `unmapped`.
- Validation with the schema server, its response format, and example events that pass the 1.9.0 validator.

## Versions

| Line                 | Status                |
| -------------------- | --------------------- |
| OCSF 1.10.0-dev      | preview (track)       |
| OCSF 1.9             | current               |
| OCSF 1.8             | supported             |
| OCSF 1.0 to OCSF 1.7 | legacy (upgrade from) |

`references/versions.md` lists every 1.x release, says which one to emit, and has the upgrade checklists.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [OCSF Schema 1.9.0 release](https://github.com/ocsf/ocsf-schema/releases/tag/1.9.0): Released, 1.9.0.
- [OCSF Schema releases](https://github.com/ocsf/ocsf-schema/releases) and the [CHANGELOG](https://github.com/ocsf/ocsf-schema/blob/main/CHANGELOG.md): v1.0.0 to 1.9.0 and the Unreleased 1.10.0-dev changes.
- [OCSF schema server versions](https://schema.ocsf.io/api/versions): hosted versions, including 1.10.0-dev.
- [OCSF schema server API](https://schema.ocsf.io/api/version): 1.9.0 categories, classes, objects and profiles.
- [Understanding OCSF](https://raw.githubusercontent.com/ocsf/ocsf-docs/main/overview/understanding-ocsf.md): white paper.
- [OCSF extensions registry](https://raw.githubusercontent.com/ocsf/ocsf-schema/main/extensions.md).

## License

MIT
