# secure-contexts

An agent skill for Secure Contexts.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill secure-contexts
```

Then ask the agent to apply Secure Contexts.

## What it covers

- when deciding whether a context is secure, blocking mixed content, or upgrading insecure requests
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line                      | Status          |
| ------------------------- | --------------- |
| Secure Contexts           | current (build) |
| Mixed Content             | current (build) |
| Upgrade Insecure Requests | current (build) |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Secure Contexts](https://www.w3.org/TR/secure-contexts/): Candidate Recommendation Draft, secure-contexts CRD-secure-contexts-20231110 (Candidate Recommendation Draft, 2023-11-10).
- [Mixed Content](https://www.w3.org/TR/mixed-content/): Candidate Recommendation Draft, mixed-content CRD-mixed-content-20230223 (Candidate Recommendation Draft, 2023-02-23).
- [Upgrade Insecure Requests](https://www.w3.org/TR/upgrade-insecure-requests/): Candidate Recommendation Snapshot, upgrade-insecure-requests CR-upgrade-insecure-requests-20151008 (Candidate Recommendation Snapshot, 2015-10-08).

## License

MIT
