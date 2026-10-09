# gittuf

An agent skill for gittuf: protecting Git repositories with signed gittuf policy, the Reference State Log and verification of who changed which branches and files.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill gittuf
```

Then ask your agent to apply gittuf.

## What it covers

- gittuf, an OpenSSF security layer for Git: root of trust and rule file policy metadata in `refs/gittuf/policy`, the Reference State Log (RSL) that records every ref change, and the verification and recovery workflows, read from the gittuf design document at release v0.16.0.

## Versions

| Line   | Status  |
| ------ | ------- |
| gittuf | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [gittuf Design Document](https://raw.githubusercontent.com/gittuf/gittuf/v0.16.0/docs/design-document.md): Design document, Release v0.16.0 (2026-09-04).

## License

MIT
