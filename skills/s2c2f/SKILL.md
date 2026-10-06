---
name: s2c2f
description: >-
  S2C2F: secure how a project consumes open source dependencies, by practice and maturity level. Covers S2C2F. Use when assessing a secure supply chain. Triggers: S2C2F.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.1"
  kind: standard
---

# S2C2F

This document is provided "as-is." Information and views expressed in this document, including URL and other Internet Web site references, may change without notice. You bear the risk of using it.

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when assessing a secure supply chain.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: S2C2F (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **document.** "No real association or connection is intended or should be inferred."
2. **document.** "The practices section should be utilized by individuals like Chief Information Security Officers (CISOs) and security, engineering, compliance/risk managers while the implementation guide should be utilized by software developers and other security practitioners."
3. **document.** "This helps organizations prioritize which requirements they should implement first."
4. **document.** "npm) with no change to the corresponding open source repo and uploads a new malicious version of a package | [Ua-parser-js](https://www.truesec.com/hub/blog/uaparser-js-npm-package-supply-chain-attack-impact-and-response) | AUD-1 ENF-2 SCA-4 | L3 | | Upstream source code re-licensed which may pose legal risk or prevent practical upgrade paths when licenses are incompatible | [node-ipc license…"
5. **document.** "the _event-stream_ scenario) - A team tries to use an OSS package with a backdoor Once we control all artifact inputs, we must scan all inputs to trust them."
6. **document.** "### _Practice 3: Inventory It_ _I know where OSS artifacts are deployed in production._ **Sample threat scenarios addressed by this job:** - A critical vulnerability is discovered in log4j, and the incident response team wants to know all the production services using log4j so they can appropriately staff and coordinate a response effort Once we have ingested and scanned the artifacts entering…"
7. **document.** "Given the [SaltStack incident](https://www.helpnetsecurity.com/2020/05/04/saltstack-salt-vulnerabilities/), where a vulnerability was exploited within 3 days after announcement, every organization should aspire to patch vulnerable OSS packages in under 72 hours so that you patch faster than the adversary can operate."
8. **document.** "**Sample threat scenarios addressed by this job:** - A well-meaning but misguided developer bypasses the official engineering pipeline to update an OSS package directly in a release; however, this new version contains a known vulnerability - An attacker with network access intentionally bypasses the official engineering pipeline to deploy malware to a service Now that we have ingested, scanned,…"

## Workflow

1. **Pick the version.** Use the current line unless a named consumer needs a supported one. Do not author a legacy line. Emit a preview only when its posture is build and the user asked for that draft.
   -> [`references/versions.md`](references/versions.md)
   ✓ The target version is recorded, and it is not a legacy line.
2. **Apply the pinned requirements.** Walk the quotes in [`references/requirements.md`](references/requirements.md) and implement each one that applies to the role.
   -> [`references/requirements.md`](references/requirements.md)
   ✓ Each applicable quote is either implemented or recorded as out of scope for the role, with the heading it came from.
3. **Upgrade** (only when asked). Follow the upgrade section from the source line to the target.
   -> [`references/versions.md`](references/versions.md)
   ✓ The result cites the target line and no longer depends on a requirement that only the old line stated.

## Verify before done

- [ ] The artifact cites the target line's revision from [Sources](#sources).
- [ ] Every applicable quoted requirement in [`references/requirements.md`](references/requirements.md) holds.
- [ ] Nothing from a preview line is emitted unless its posture is build and the user opted in.

## Reference index

- **`references/versions.md`**: every version line, which one to use, and how to upgrade. Load for steps 1 and 3.
- **`references/requirements.md`**: quotes taken from the pinned specification. Load for step 2.

## Related skills

Install related spec skills by name with `npx skills add ScaleDockHQ/scaledock-skills --skill <name>`.

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [S2C2F](https://raw.githubusercontent.com/ossf/s2c2f/main/specification/framework.md): Framework, S2C2F framework, fetched 2026-10-06 (Framework, 2026-10-06), checked 2026-10-06.
