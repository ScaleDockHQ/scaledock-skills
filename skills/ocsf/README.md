# ocsf

An agent skill for the Open Cybersecurity Schema Framework (OCSF) 1.9.0: mapping application audit logs to valid OCSF events.

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

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [OCSF Schema 1.9.0 release](https://github.com/ocsf/ocsf-schema/releases/tag/1.9.0): Released, 1.9.0.
- [OCSF schema server API](https://schema.ocsf.io/api/version): 1.9.0 categories, classes, objects and profiles.
- [Understanding OCSF](https://raw.githubusercontent.com/ocsf/ocsf-docs/main/overview/understanding-ocsf.md): white paper.
- [OCSF extensions registry](https://raw.githubusercontent.com/ocsf/ocsf-schema/main/extensions.md).

## License

MIT
