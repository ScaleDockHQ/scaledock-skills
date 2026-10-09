# ssvc

An agent skill for SSVC: prioritizing vulnerability responses with Stakeholder-Specific Vulnerability Categorization decision models.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill ssvc
```

Then ask your agent to apply SSVC.

## What it covers

- Stakeholder-Specific Vulnerability Categorization (SSVC) from the CERT Coordination Center: decision points such as Exploitation, Automatable, Technical Impact, System Exposure and Human Impact, and the outcomes they lead to (Defer, Scheduled, Out-of-Cycle, Immediate for deployers; Track, Track*, Attend, Act for CISA). Read from the decision point JSON data and the deployer documentation in the CERTCC/SSVC repository at a pinned release.

## Versions

| Line | Status  |
| ---- | ------- |
| SSVC | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [SSVC decision point: Exploitation 1.1.0](https://raw.githubusercontent.com/CERTCC/SSVC/2026.7.0/data/json/decision_points/ssvc/exploitation_1_1_0.json): CERT/CC decision point, Release 2026.7.0, commit e3b00a256158 (2026-07-20).
- [SSVC decision point: Automatable 2.0.0](https://raw.githubusercontent.com/CERTCC/SSVC/2026.7.0/data/json/decision_points/ssvc/automatable_2_0_0.json): CERT/CC decision point, Release 2026.7.0, commit e3b00a256158 (2026-07-20).
- [SSVC decision point: Technical Impact 1.0.0](https://raw.githubusercontent.com/CERTCC/SSVC/2026.7.0/data/json/decision_points/ssvc/technical_impact_1_0_0.json): CERT/CC decision point, Release 2026.7.0, commit e3b00a256158 (2026-07-20).
- [SSVC decision point: System Exposure 1.0.1](https://raw.githubusercontent.com/CERTCC/SSVC/2026.7.0/data/json/decision_points/ssvc/system_exposure_1_0_1.json): CERT/CC decision point, Release 2026.7.0, commit e3b00a256158 (2026-07-20).
- [SSVC decision point: Mission Impact 2.0.0](https://raw.githubusercontent.com/CERTCC/SSVC/2026.7.0/data/json/decision_points/ssvc/mission_impact_2_0_0.json): CERT/CC decision point, Release 2026.7.0, commit e3b00a256158 (2026-07-20).
- [SSVC decision point: Human Impact 2.0.2](https://raw.githubusercontent.com/CERTCC/SSVC/2026.7.0/data/json/decision_points/ssvc/human_impact_2_0_2.json): CERT/CC decision point, Release 2026.7.0, commit e3b00a256158 (2026-07-20).
- [SSVC decision point: Value Density 1.0.0](https://raw.githubusercontent.com/CERTCC/SSVC/2026.7.0/data/json/decision_points/ssvc/value_density_1_0_0.json): CERT/CC decision point, Release 2026.7.0, commit e3b00a256158 (2026-07-20).
- [SSVC decision point: CISA Levels 1.1.0](https://raw.githubusercontent.com/CERTCC/SSVC/2026.7.0/data/json/decision_points/cisa/cisa_levels_1_1_0.json): CERT/CC decision point, Release 2026.7.0, commit e3b00a256158 (2026-07-20).
- [SSVC: Prioritizing Patch Deployment (Deployer decision model)](https://raw.githubusercontent.com/CERTCC/SSVC/2026.7.0/docs/howto/deployer_tree.md): CERT/CC documentation, Release 2026.7.0, commit e3b00a256158 (2026-07-20).

## License

MIT
