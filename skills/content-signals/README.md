# content-signals

An agent skill for the Content Signals Policy: write and read `Content-Signal` lines in robots.txt that say whether content may be used for search, AI input and AI training.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill content-signals
```

Then ask your agent to "add content signals to our robots.txt: search yes, AI training no" or "make our crawler read Content-Signal lines".

## What it covers

- The three signals, `search`, `ai-input` and `ai-train`, and what `yes`, `no` and a missing signal mean.
- Line syntax, path-scoped signals, group placement, the policy comment block and the four generator presets.
- Consumer parsing that keeps RFC 9309 behaviour intact, and combining with aipref, RSL and TDMRep.
- The limits: preferences, not enforcement.

## Versions

| Line                        | Status  |
| --------------------------- | ------- |
| Content Signals Policy 2025 | current |

`references/versions.md` explains how the policy relates to aipref and RSL.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Cloudflare's Content Signals Policy announcement](https://blog.cloudflare.com/content-signals-policy/): CC0, 24 September 2025.
- [contentsignals.org](https://contentsignals.org/): policy site and generator.
- [RFC 9309: Robots Exclusion Protocol](https://www.rfc-editor.org/rfc/rfc9309): RFC.

## License

MIT
