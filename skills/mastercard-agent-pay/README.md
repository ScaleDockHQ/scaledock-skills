# mastercard-agent-pay

An agent skill for Mastercard Agent Pay (merchant acceptance): accepting Mastercard Agent Pay purchases from AI agents.

## Install

```bash
npx skills add ScaleDockHQ/scaledock-skills --skill mastercard-agent-pay
```

Then ask your agent to apply Mastercard Agent Pay (merchant acceptance).

## What it covers

- Mastercard Agent Pay is Mastercard's framework for certified AI agents that buy on behalf of consumers. Mastercard Developers publishes a merchant playbook, "Developer Playbook on Preparing for Agentic Commerce", in Markdown; this skill quotes its Agent Pay guidance on agent identification, replay protection, agentic tokens and the Level 3 payment object.
- The pinned texts are Mastercard's developer guides, not a specification. They point to the Mastercard Agent Pay Acceptance Framework "for the complete Intent API specification and implementation details"; that framework is not publicly downloadable and is out of scope. The guides describe the playbook as reflecting "currently available public information" that "may evolve", so re-read them before relying on a rule.

## Versions

| Line                                 | Status  |
| ------------------------------------ | ------- |
| Mastercard Agent Pay (2026 playbook) | current |

`references/versions.md` says which line to use and how to upgrade between them.

## Pinned sources

The skill was written from these sources, pinned in `metadata.json`:

- [Developer Playbook on Preparing for Agentic Commerce](https://developer.mastercard.com/merchant-cloud/documentation/tutorials-and-guides/agentic-commerce-guide/index.md): Mastercard Developers guide, Overview page, read 2026-10-06.
- [Level 1 Agentic Commerce - Enable Agent Support with Minimal Changes](https://developer.mastercard.com/merchant-cloud/documentation/tutorials-and-guides/agentic-commerce-guide/21/index.md): Mastercard Developers guide, Level 1 page, read 2026-10-06.
- [Level 3 Agentic Commerce - Advanced Programmatic Checkout](https://developer.mastercard.com/merchant-cloud/documentation/tutorials-and-guides/agentic-commerce-guide/23/index.md): Mastercard Developers guide, Level 3 page, read 2026-10-06.
- [Preparing for Agentic Commerce: Testing, Validation, and Reference Guide](https://developer.mastercard.com/merchant-cloud/documentation/tutorials-and-guides/agentic-commerce-guide/24/index.md): Mastercard Developers guide, Reference page, read 2026-10-06.

## License

MIT
