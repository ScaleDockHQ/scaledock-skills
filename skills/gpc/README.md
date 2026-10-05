# gpc

An agent skill for the W3C Global Privacy Control (GPC) specification: send, detect and honor the `Sec-GPC: 1` do-not-sell-or-share signal and `navigator.globalPrivacyControl`, and publish `/.well-known/gpc.json`.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill gpc
```

Then ask your agent to "honor GPC on our site" or "publish a gpc.json for this origin".

## What it covers

- The `Sec-GPC` header: user-agent, server and intermediary rules.
- Preference caching per top-level navigation (`gpcAtNavigation`).
- `navigator.globalPrivacyControl` in windows, iframes and workers.
- The `/.well-known/gpc.json` support resource, its `gpc` and `lastUpdate` members, and when support is unknown.
- Server, client, CDN and user-agent patterns in TypeScript, and the WebDriver test commands.
- The spec's own legal-effects text (CCPA, other US state universal opt-out laws, GDPR Articles 7 and 21), with no legal advice: applicability depends on the jurisdiction.
- Upgrading from the pre-W3C community draft.

The specification is a Working Draft. The skill builds against the pinned revision, `WD-gpc-20260924`.

## Versions

| Line                               | Status                |
| ---------------------------------- | --------------------- |
| GPC Working Draft 2026-09-24       | current (build)       |
| GPC community draft (2020 to 2024) | legacy (upgrade from) |

The Editor's Draft has the same text as the Working Draft, so there is no preview line. `references/versions.md` says which line to use and how to upgrade.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Global Privacy Control (GPC)](https://www.w3.org/TR/gpc/): W3C Working Draft, [WD-gpc-20260924](https://www.w3.org/TR/2026/WD-gpc-20260924/) (2026-09-24).
- [Editor's Draft](https://w3c.github.io/gpc/), the [W3C history](https://www.w3.org/standards/history/gpc/) and the [w3c/gpc repository](https://github.com/w3c/gpc): for drift checks.
- The community draft at commits [9027266](https://github.com/w3c/gpc/blob/90272664a01b925041eea0222a9f7c2ea194954f/index.html) (2024) and [e60ad1c](https://github.com/w3c/gpc/blob/e60ad1cbc4aad738e8630c0d97fbecf392b453cc/index.html) (2020): for the legacy line.
- The [project page](https://globalprivacycontrol.org/): non-normative background.

## License

MIT
