---
name: referrer-policy
description: >-
  Referrer Policy: This document describes how an author can set a referrer policy for documents they create, and the impact of such a policy on the Referer HTTP header for outgoing requests and navigations. Covers Referrer Policy (build). Use when choosing or applying a referrer policy on a document or request. Triggers: Referrer-Policy, referrerpolicy, strict-origin-when-cross-origin.
license: MIT
metadata:
  author: ScaleDockHQ
  version: "1.0.0"
  kind: standard
---

# Referrer Policy

This document describes how an author can set a referrer policy for documents they create, and the impact of such a policy on the Referer HTTP header for outgoing requests and navigations.

The publisher of the pinned text is named in [Sources](#sources). With this skill the agent applies that text: when choosing or applying a referrer policy on a document or request.

**Follow the workflow below step by step.** Every rule here comes from a source in [Sources](#sources). Quoted requirements are sentences taken from the pinned text. When a rule and the pinned source disagree, the source wins; when the source has a newer revision than the pin, follow the refresh steps.

## Inputs (fill in, or ask before starting)

- Role: producer or consumer of this specification.
- Target version: Referrer Policy (default, posture build). See [`references/versions.md`](references/versions.md).
- Revision: the pinned revision in [Sources](#sources), unless the user names another.
- Sources: when refreshing this skill, re-read every URL in [Sources](#sources) and check the publisher index for a newer revision or version line.

## Invariants

1. **8.4. Strip url for use as a referrer.** "Certain portions of URLs MUST not be included when sending a URL as the value of a `Referer` header: a URLs fragment, username, and password components should be stripped from the URL before it’s sent out."
2. **Document conventions.** "The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119."
3. **4.1. Delivery via Referrer-Policy header.** "The Referrer-Policy HTTP header specifies the referrer policy that the user agent applies when determining what referrer information should be included with requests made, and with browsing contexts created from the context of the protected resource."
4. **7. Integration with CSS.** "However, implementations should be sure to set the referrer-related properties of any requests initiated by stylesheets as follows: If a CSS declaration block is responsible for the request, set the referrer to the block’s owner node ’s node document ’s URL , and the referrer policy to the block’s owner node ’s node document ’s referrer policy ."
5. **9.1. User Controls.** "Nothing in this specification should be interpreted as preventing user agents from offering options to users which would change the information sent out via a `Referer` header."
6. **10.1. Information Leakage.** "Authors wanting to ensure that they do not leak any more information than the default policy should instead use the policy states " same-origin " , " strict-origin " , " strict-origin-when-cross-origin " or " no-referrer " ."
7. **Conformant Algorithms.** "Requirements phrased in the imperative as part of algorithms (such as "strip any leading space characters" or "return false and abort these steps") are to be interpreted with the meaning of the key word ("must", "should", "may", etc) used in introducing the algorithm."

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

- [Referrer Policy](https://www.w3.org/TR/referrer-policy/): Candidate Recommendation Snapshot, referrer-policy CR-referrer-policy-20170126 (Candidate Recommendation Snapshot, 2017-01-26), checked 2026-10-06.
