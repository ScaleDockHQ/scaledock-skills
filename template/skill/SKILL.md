---
name: scaledock-my-skill
description: Start with what the skill does, because the install picker shows only the first 57 characters. Then say when an agent should use it, with the trigger phrases or situations (for example "Use when working on X, or when the user asks to Y").
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
---

# My skill

One or two sentences on the outcome this skill produces.

**Follow the workflow below step by step.** Load the reference a step names when you reach that step. Take framework mechanics (API signatures, config options) from the installed or linked docs; don't restate or improvise them.

## Inputs (fill in, or ask before starting)

- Input one: {{INPUT_ONE}}
- Input two: {{INPUT_TWO}}

## Invariants

The rules every change must satisfy. The workflow produces them, and the final check verifies them.

1. **First invariant.** Why it matters.
2. **Second invariant.** Why it matters.

## Workflow

1. **First step.** What to do.
   -> [`references/topic.md`](references/topic.md) (create it in `references/`)
   ✓ What is true when this step is done.
2. **Second step.** What to do.
   ✓ What is true when this step is done.

## Verify before done

- [ ] A check that can be confirmed by reading the diff.
- [ ] Another check.

## Reference index

- **`references/topic.md`**: what it covers and when to load it.
