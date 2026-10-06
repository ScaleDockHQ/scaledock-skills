---
name: nist-800-204
description: >-
  NIST SP 800-204: secure microservices-based applications and their service-to-service communication. Covers SP 800-204, SP 800-204A, SP 800-204B, SP 800-204C, SP 800-204D. Use when securing microservices. Triggers: SP 800-204.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.1"
  kind: standard
---

# NIST SP 800-204

Walter Copan, NIST Director and Under Secretary of Commerce for Standards and Technology

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when securing microservices.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: SP 800-204 (default); SP 800-204A (default); SP 800-204B (default); SP 800-204C (default); SP 800-204D (default). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **document.** "Nothing in this publication should be taken to contradict the standards and guidelines made mandatory and binding on federal agencies by the Secretary of Commerce under statutory authority."
2. **document.** "Nor should these guidelines be interpreted as altering or superseding the existing authorities of the Secretary of Commerce, Director of the OMB, or any other federal official."
3. **document.** "2.2 Microservices: Design Principles The design of a microservice is based on the following drivers [4]: • Each microservice must be managed, replicated, scaled, upgraded, and deployed independently of other microservices."
4. **document.** "• Each microservice must have a single function and operate in a bounded context (i.e., have limited responsibility and dependence on other services)."
5. **document.** "• All microservices should be designed for constant failure and recovery and must therefore be as stateless as possible."
6. **document.** "NIST SP 800-204 SECURITY STRATEGIES FOR MICROSERVICES-BASED APPLICATION SYSTEMS 4 This publication is available free of charge from: https://doi.org/10.6028/NIST.SP.800-204 • One should reuse existing trusted services (e.g., databases, caches, directories) for state"
7. **document.** "• Scalability: applications must be highly scalable to maintain availability in the face of an increasing number of users and/or increased rate of usage from the existing user base."
8. **document.** "• The microservice making the request must ensure that the request has been successfully delivered to the target microservice."

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

- [SP 800-204](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-204.pdf): NIST SP, SP 800-204, fetched 2026-10-06 (NIST SP, 2026-10-06), checked 2026-10-06.
- [SP 800-204A](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-204A.pdf): NIST SP, SP 800-204A, fetched 2026-10-06 (NIST SP, 2026-10-06), checked 2026-10-06.
- [SP 800-204B](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-204B.pdf): NIST SP, SP 800-204B, fetched 2026-10-06 (NIST SP, 2026-10-06), checked 2026-10-06.
- [SP 800-204C](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-204C.pdf): NIST SP, SP 800-204C, fetched 2026-10-06 (NIST SP, 2026-10-06), checked 2026-10-06.
- [SP 800-204D](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-204D.pdf): NIST SP, SP 800-204D, fetched 2026-10-06 (NIST SP, 2026-10-06), checked 2026-10-06.
