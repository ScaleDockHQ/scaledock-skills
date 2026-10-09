# openchain

An agent skill for OpenChain: running an open source license compliance program (ISO/IEC 5230) or a security assurance program (ISO/IEC 18974).

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill openchain
```

Then ask your agent to apply OpenChain.

## What it covers

- The OpenChain Project's two program specifications: ISO/IEC 5230:2020 (OpenChain Specification 2.1, open source license compliance) and ISO/IEC 18974:2023 (OpenChain security assurance), read from the project's public Markdown texts at pinned commits.

## Versions

| Line                | Status  |
| ------------------- | ------- |
| OpenChain ISO 5230  | current |
| OpenChain ISO 18974 | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [ISO/IEC 5230:2020, OpenChain Specification 2.1 (public text)](https://raw.githubusercontent.com/OpenChain-Project/License-Compliance-Specification/968092c97da81a750f03c7b1becbd25bd088b2cb/ISO-5230-2020/en/ISO-5230-2020.md): International Standard (ISO/IEC 5230:2020), ISO/IEC 5230:2020 (OpenChain 2.1), commit 968092c97da8 (2025-01-08).
- [ISO/IEC 18974:2023, OpenChain security assurance specification (public text)](https://raw.githubusercontent.com/OpenChain-Project/Security-Assurance-Specification/5bb0a024ce967720301bfa0e1d4d9e834690066d/Security-Assurance-Specification/ISO-18974/en/ISO-18974.md): International Standard (ISO/IEC 18974:2023), ISO/IEC 18974:2023, commit 5bb0a024ce96 (2024-11-08).

## License

MIT
