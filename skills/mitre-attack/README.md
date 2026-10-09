# mitre-attack

An agent skill for MITRE ATT&CK: mapping adversary behavior to ATT&CK tactics, techniques and sub-techniques, and working with the ATT&CK STIX data.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill mitre-attack
```

Then ask your agent to apply MITRE ATT&CK.

## What it covers

- MITRE ATT&CK, a knowledge base of adversary tactics, techniques, sub-techniques and procedures: the model from the ATT&CK Design and Philosophy paper, and how the v19.2 release is published as STIX 2.1 data in the mitre-attack/attack-stix-data repository at the v19.2 tag.

## Versions

| Line         | Status  |
| ------------ | ------- |
| ATT&CK v19.2 | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [MITRE ATT&CK: Design and Philosophy](https://attack.mitre.org/docs/ATTACK_Design_and_Philosophy_March_2020.pdf): MITRE Product, MP180360R1, revised March 2020.
- [ATT&CK STIX Data: README](https://raw.githubusercontent.com/mitre-attack/attack-stix-data/v19.2/README.md): Data repository documentation, Tag v19.2, commit 6cda5ad8462c (2026-08-05).
- [ATT&CK STIX Data: USAGE](https://raw.githubusercontent.com/mitre-attack/attack-stix-data/v19.2/USAGE.md): Data repository documentation, Tag v19.2, commit 6cda5ad8462c (2026-08-05).

## License

MIT
