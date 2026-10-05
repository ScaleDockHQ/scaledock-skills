# aipref

An agent skill for the IETF AI Preferences (aipref) drafts: publish and read AI usage preferences (`train-ai`, `ai-use`, `search`) in the `Content-Usage` HTTP header and the robots.txt `Content-Usage` rule, following `draft-ietf-aipref-vocab-08` and `draft-ietf-aipref-attach-05`, with upgrades from earlier revisions.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill aipref
```

Then ask your agent to "add AI usage preferences to our robots.txt and responses" or "make our crawler respect Content-Usage preferences".

## What it covers

- The vocabulary: AI Training, AI Use and Search, what each excludes, the search override, and the allowed, disallowed and unknown outcomes.
- The Structured Fields Dictionary syntax with `y` and `n` tokens, and the parsing edge cases that give unknown.
- The `Content-Usage` header field and the robots.txt `Content-Usage` rule: syntax, path matching, group selection and timing.
- Consumer processing: collecting statements, most-restrictive combining, unknown defaults, and the limits of preferences (not enforcement).

Draft posture: build, pinned to `draft-ietf-aipref-vocab-08` and `draft-ietf-aipref-attach-05`.

## Versions

| Line                              | Status                |
| --------------------------------- | --------------------- |
| draft-ietf-aipref-vocab-08        | current (build)       |
| draft-ietf-aipref-vocab-05 to -07 | legacy (upgrade from) |
| draft-ietf-aipref-vocab-03 to -04 | legacy (upgrade from) |
| draft-ietf-aipref-vocab-02        | legacy (upgrade from) |
| draft-ietf-aipref-vocab-00 to -01 | legacy (upgrade from) |
| draft-ietf-aipref-attach-05       | current (build)       |
| draft-ietf-aipref-attach-00       | legacy (upgrade from) |

`references/versions.md` says what changed in each revision and how to upgrade old labels and robots.txt rules.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [draft-ietf-aipref-vocab-08](https://www.ietf.org/archive/id/draft-ietf-aipref-vocab-08.txt): WG draft, -08.
- [draft-ietf-aipref-attach-05](https://www.ietf.org/archive/id/draft-ietf-aipref-attach-05.txt): WG draft, -05.
- The [vocab](https://datatracker.ietf.org/doc/draft-ietf-aipref-vocab/) and [attach](https://datatracker.ietf.org/doc/draft-ietf-aipref-attach/) datatracker pages, and the [aipref working group charter](https://datatracker.ietf.org/wg/aipref/about/).
- Earlier vocab revisions -00 to -07 and attach revisions -00 and -04, for the legacy lines.
- [RFC 9309: Robots Exclusion Protocol](https://www.rfc-editor.org/rfc/rfc9309) and [RFC 9651: Structured Field Values for HTTP](https://www.rfc-editor.org/rfc/rfc9651): RFCs.
- [IANA HTTP Field Name registry](https://www.iana.org/assignments/http-fields): registry.

## License

MIT
