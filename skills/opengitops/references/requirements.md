# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. The GitOps Principles have no MUST or SHALL keywords, so these are the principles and glossary definitions, quoted as written (link markup from the Markdown source is dropped, the words are unchanged). Apply the ones that match the role. Each is labelled with the principle or glossary term it comes from.

## GitOps Principles v1.0.0

Source: https://raw.githubusercontent.com/open-gitops/documents/d36cde829c6ef2c7e5cab662ab98a7173a591a49/PRINCIPLES.md

- **GitOps Principles.** GitOps is a set of principles for operating and managing software systems.
- **Principle 1: Declarative.** A system managed by GitOps must have its desired state expressed declaratively.
- **Principle 2: Versioned and Immutable.** Desired state is stored in a way that enforces immutability, versioning and retains a complete version history.
- **Principle 3: Pulled Automatically.** Software agents automatically pull the desired state declarations from the source.
- **Principle 4: Continuously Reconciled.** Software agents continuously observe actual system state and attempt to apply the desired state.

## GitOps Glossary v1.0.0

Source: https://raw.githubusercontent.com/open-gitops/documents/d36cde829c6ef2c7e5cab662ab98a7173a591a49/GLOSSARY.md

- **Glossary: Continuous.** "Continuous" is intended to match the industry standard term: reconciliation continues to happen, not that it must be instantaneous.
- **Glossary: Declarative Description.** A configuration that describes the desired operating state of a system without specifying procedures for how that state will be achieved.
- **Glossary: Declarative Description.** This separates configuration (the desired state) from the implementation (commands, API calls, scripts etc.) used to achieve that state.
- **Glossary: Desired State.** The aggregate of all configuration data that is sufficient to recreate the system so that instances of the system are behaviourally indistinguishable.
- **Glossary: Desired State.** This configuration data generally does not include persistent application data, eg. database contents, though often does include credentials for accessing that data, or configuration for data recovery tools running on that system.
- **Glossary: Drift.** When a system's actual state has moved or is in the process of moving away from the desired state, this is often referred to as drift.
- **Glossary: Reconciliation.** The process of ensuring the actual state of a system matches its desired state.
- **Glossary: Reconciliation.** Contrary to traditional CI/CD where automation is generally driven by pre-set triggers, in GitOps reconciliation is triggered whenever there is a divergence.
- **Glossary: Reconciliation.** Actions are taken based on policies around feedback from the system and previous reconciliation attempts, in order to reduce deviation over time.
- **Glossary: State Store.** A system for storing immutable versions of desired state declarations.
- **Glossary: State Store.** This state store should provide access control and auditing on the changes to the Desired State.
- **Glossary: State Store.** In all cases, these state stores must be properly configured and precautions must be taken to comply with requirements set out in the GitOps Principles.
- **Glossary: Feedback.** In control theory, feedback represents how previous attempts to apply a desired state have affected the actual state.
