# security-insights

An agent skill for Security Insights: publishing a machine-readable security-insights.yml file that describes a project's security contacts, policies, tooling and releases.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill security-insights
```

Then ask your agent to apply Security Insights.

## What it covers

- The OpenSSF Security Insights specification: a YAML schema (`header`, `project` and `repository` objects) that a project publishes as `security-insights.yml` so tools and users can read its security contacts, vulnerability reporting, tooling and release details. Read from the specification repository at a pinned release tag.

## Versions

| Line                  | Status  |
| --------------------- | ------- |
| Security Insights     | current |
| Security Insights 1.0 | legacy  |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Security Insights schema 2.2.0](https://raw.githubusercontent.com/ossf/security-insights/v2.2.0/spec/schema.md): OpenSSF Specification, Release v2.2.0 (2026-01-31).
- [Security Insights CUE schema 2.2.0](https://raw.githubusercontent.com/ossf/security-insights/v2.2.0/spec/schema.cue): OpenSSF Specification, Release v2.2.0 (2026-01-31).
- [Security Insights README 2.2.0](https://raw.githubusercontent.com/ossf/security-insights/v2.2.0/README.md): OpenSSF Specification, Release v2.2.0 (2026-01-31).
- [Security Insights specification 1.0.0](https://raw.githubusercontent.com/ossf/security-insights/v1.0.0/specification.md): OpenSSF Specification (superseded), Release v1.0.0 (2023-10-02).

## License

MIT
