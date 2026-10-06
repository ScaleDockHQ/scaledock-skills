# credential-management

An agent skill for Credential Management.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill credential-management
```

Then ask the agent to apply Credential Management.

## What it covers

- when storing, retrieving or mediating credentials, or publishing the change-password and passkey well-known URLs
- The version lines in the table below, pinned to the revisions in `metadata.json`.

## Versions

| Line                                                         | Status          |
| ------------------------------------------------------------ | --------------- |
| Credential Management Level 1                                | current (track) |
| A Well-Known URL for Changing Passwords                      | current (track) |
| A Well-Known URL for Relying Party Passkey Endpoints Level 1 | current (track) |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Credential Management Level 1](https://www.w3.org/TR/credential-management-1/): Working Draft, credential-management-1 WD-credential-management-1-20260903 (Working Draft, 2026-09-03).
- [A Well-Known URL for Changing Passwords](https://www.w3.org/TR/change-password-url/): Working Draft, change-password-url WD-change-password-url-20240603 (Working Draft, 2024-06-03).
- [A Well-Known URL for Relying Party Passkey Endpoints](https://www.w3.org/TR/passkey-endpoints-1/): Working Draft, passkey-endpoints-1 WD-passkey-endpoints-1-20260114 (Working Draft, 2026-01-14).

## License

MIT
