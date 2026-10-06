---
name: visa-trusted-agent-protocol
description: >-
  Visa Trusted Agent Protocol: identify trusted AI agents to merchants with signed HTTP requests. Covers Trusted Agent Protocol. Use when identifying an agent to a merchant. Triggers: Trusted Agent Protocol.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.2"
  kind: standard
---

# Trusted Agent Protocol

_Establishing a universal standard of trust between AI agents and merchants for the next phase of agentic commerce._

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when identifying an agent to a merchant.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: Trusted Agent Protocol (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **document.** "**For an agent to make a purchase, merchants must answer:** - Is this a legitimate, trusted, and recognized AI agent?"

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

- `ap2`, when the work also follows that specification: `npx skills add ScaleDockHQ/scaledock-skills --skill ap2`

## Sources

Status uses the publishing body's own maturity term. Checked is the date the source was last read.

- [Trusted Agent Protocol](https://raw.githubusercontent.com/visa/trusted-agent-protocol/main/README.md): Repository document, Trusted Agent Protocol README, fetched 2026-10-06 (Repository document, 2026-10-06), checked 2026-10-06.
