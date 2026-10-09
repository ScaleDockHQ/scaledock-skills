# xapi

An agent skill for xAPI: recording and storing learning activity Statements.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill xapi
```

Then ask your agent to apply xAPI.

## What it covers

- The Experience API (xAPI) from Advanced Distributed Learning: Part Two (Data) defines Statements with an actor, verb and object, and Part Three (Communication) defines how a Learning Record Store (LRS) receives, validates, versions and returns them, read from xAPI-Data.md and xAPI-Communication.md in adlnet/xAPI-Spec at a pinned commit.

## Versions

| Line           | Status  |
| -------------- | ------- |
| Experience API | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Experience API, Part Two: Data](https://raw.githubusercontent.com/adlnet/xAPI-Spec/ca782a1129bc6ae848640ff4e8e262334bdd0ba5/xAPI-Data.md): Specification, adlnet/xAPI-Spec commit ca782a1, 2025-07-03 (the 1.0.x text; examples use version 1.0.3).
- [Experience API, Part Three: Data Processing, Validation, and Security](https://raw.githubusercontent.com/adlnet/xAPI-Spec/ca782a1129bc6ae848640ff4e8e262334bdd0ba5/xAPI-Communication.md): Specification, adlnet/xAPI-Spec commit ca782a1, 2025-07-03 (the 1.0.x text; examples use version 1.0.3).

## License

MIT
