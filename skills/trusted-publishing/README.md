# trusted-publishing

An agent skill for Trusted publishing: publishing npm and PyPI packages from CI with OIDC trusted publishers instead of long-lived tokens.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill trusted-publishing
```

Then ask your agent to apply Trusted publishing.

## What it covers

- Trusted publishing on npm and PyPI: a package registry trusts a specific CI workflow through OpenID Connect and mints a short-lived publish token for it, so no long-lived token is stored. Read from the npm documentation and PyPI (Warehouse) documentation Markdown sources at pinned commits.

## Versions

| Line                    | Status  |
| ----------------------- | ------- |
| npm trusted publishing  | current |
| PyPI trusted publishing | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [npm: Trusted publishing for npm packages](https://raw.githubusercontent.com/npm/documentation/48e397113e76387d72286f2f9f532eb2781a56eb/content/packages-and-modules/securing-your-code/trusted-publishers.mdx): Documentation, Commit 48e397113e76 (2026-10-02).
- [PyPI: Publishing to PyPI with a Trusted Publisher](https://raw.githubusercontent.com/pypi/warehouse/f97350ae5bd7cecc7254e5994ee484d047184591/docs/user/trusted-publishers/index.md): Documentation, Commit f97350ae5bd7 (2026-10-06).
- [PyPI: Publishing with a Trusted Publisher](https://raw.githubusercontent.com/pypi/warehouse/f97350ae5bd7cecc7254e5994ee484d047184591/docs/user/trusted-publishers/using-a-publisher.md): Documentation, Commit f97350ae5bd7 (2026-10-06).
- [PyPI: Security model and considerations](https://raw.githubusercontent.com/pypi/warehouse/f97350ae5bd7cecc7254e5994ee484d047184591/docs/user/trusted-publishers/security-model.md): Documentation, Commit f97350ae5bd7 (2026-10-06).

## License

MIT
