# owasp-masvs

An agent skill for the OWASP Mobile Application Security Verification Standard (MASVS) 2.1 and its companions, the MASWE and the MASTG: review and harden iOS and Android apps, choose MAS testing profiles, and upgrade MASVS 1.x checklists.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill owasp-masvs
```

Then ask your agent to "review our Android app against MASVS 2.1 at MAS-L2+P" or "map our MASVS 1.5 checklist to the 2.x controls".

## What it covers

- The eight control groups and 24 controls, from MASVS-STORAGE-1 to MASVS-PRIVACY-4.
- The 78 MASWE 1.0 weaknesses under each control, with their profiles and platforms.
- MAS testing profiles MAS-L1, MAS-L2, MAS-R and MAS-P, the specialized MAS-EUDIW profile, and how to choose and tailor them.
- How MASVS controls, MASWE weaknesses and MASTG tests, techniques and demos link, and the MASTG testing process from scoping to reporting.
- Upgrading MASVS 1.5 (V1 to V8, `MSTG-*` IDs, levels), MASTG 1.x tests and MASWE beta IDs.

## Versions

| Line       | Status                |
| ---------- | --------------------- |
| MASVS 2.1  | current               |
| MASVS 1.5  | legacy (upgrade from) |
| MASTG 2.0  | current               |
| MASTG 1.7  | legacy (upgrade from) |
| MASWE 1.0  | current               |
| MASWE beta | legacy (upgrade from) |

`references/versions.md` says what each release changed and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [OWASP MASVS v2.1.0](https://github.com/OWASP/masvs/releases/tag/v2.1.0): Released, with its [document](https://github.com/OWASP/masvs/tree/v2.1.0/Document) and [controls](https://github.com/OWASP/masvs/tree/v2.1.0/controls).
- [OWASP MASVS v2.0.0](https://github.com/OWASP/masvs/releases/tag/v2.0.0) and [v1.5.0 document](https://github.com/OWASP/masvs/tree/v1.5.0/Document): Released, superseded.
- [OWASP MASTG v2.0.0](https://github.com/OWASP/mastg/releases/tag/v2.0.0): Released, with its [tests](https://github.com/OWASP/mastg/tree/v2.0.0/tests-beta) and [testing chapter](https://github.com/OWASP/mastg/blob/v2.0.0/Document/0x04b-Mobile-App-Security-Testing.md); [v1.7.0](https://github.com/OWASP/mastg/releases/tag/v1.7.0), last 1.x.
- [OWASP MASWE v1.0.0](https://github.com/OWASP/maswe/releases/tag/v1.0.0): Released, with its [YAML](https://github.com/OWASP/maswe/releases/download/v1.0.0/OWASP_MASWE.yaml).
- The [MASVS](https://mas.owasp.org/MASVS/), [MASTG](https://mas.owasp.org/MASTG/), [MASWE](https://mas.owasp.org/MASWE/), [MAS Testing Profiles](https://mas.owasp.org/Profiles/) and [Using MAS Profiles](https://mas.owasp.org/Profiles/Using-MAS-Profiles/) pages.
- Unreleased work: the [MASVS development branch](https://github.com/OWASP/masvs/compare/v2.1.0...master) and [MASTG pull request 3979](https://github.com/OWASP/mastg/pull/3979).

## License

MIT
