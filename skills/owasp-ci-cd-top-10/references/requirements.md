# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. The OWASP CI/CD Top 10 has no MUST or SHALL keywords, so each risk is given by its definition and by the recommendations that drive implementation, quoted as written. Apply the ones that match the role. Each is labelled with its risk id.

## CICD-SEC-1: Insufficient Flow Control Mechanisms

Source: https://raw.githubusercontent.com/OWASP/www-project-top-10-ci-cd-security-risks/74b2c790d5512998f232480dde61d4d42fa692ae/CICD-SEC-01-Insufficient-Flow-Control-Mechanisms.md

- **CICD-SEC-1.** Insufficient flow control mechanisms refer to the ability of an attacker that has obtained permissions to a system within the CI/CD process (SCM, CI, Artifact repository, etc.) to single handedly push malicious code or artifacts down the pipeline, due to a lack in mechanisms that enforce additional approval or review.
- **CICD-SEC-1.** Establish pipeline flow control mechanisms to ensure that no single entity (human / programmatic) is able to ship sensitive code and artifacts through the pipeline without external verification or validation.
- **CICD-SEC-1.** Where user accounts are granted permission to push unreviewed code to a repository, ensure those accounts do not have the permission to trigger the deployment pipelines connected to the repository in question.

## CICD-SEC-2: Inadequate Identity and Access Management

Source: https://raw.githubusercontent.com/OWASP/www-project-top-10-ci-cd-security-risks/74b2c790d5512998f232480dde61d4d42fa692ae/CICD-SEC-02-Inadequate-Identity-And-Access-Management.md

- **CICD-SEC-2.** The existence of poorly managed identities - both human and programmatic accounts - increases the potential and the extent of damage of their compromise.
- **CICD-SEC-2.** Avoid using shared accounts. Create dedicated accounts for each specific context, and grant the exact set of permissions required for the context in question.

## CICD-SEC-3: Dependency Chain Abuse

Source: https://raw.githubusercontent.com/OWASP/www-project-top-10-ci-cd-security-risks/74b2c790d5512998f232480dde61d4d42fa692ae/CICD-SEC-03-Dependency-Chain-Abuse.md

- **CICD-SEC-3.** Dependency chain abuse risks refer to an attacker’s ability to abuse flaws relating to how engineering workstations and build environments fetch code dependencies.
- **CICD-SEC-3.** Any client pulling code packages should not be allowed to fetch packages directly from the internet or untrusted sources.
- **CICD-SEC-3.** Enable checksum verification and signature verification for pulled packages.
- **CICD-SEC-3.** Ensure clients are forced to fetch packages that are under your organization’s scope solely from your internal registry.

## CICD-SEC-4: Poisoned Pipeline Execution (PPE)

Source: https://raw.githubusercontent.com/OWASP/www-project-top-10-ci-cd-security-risks/74b2c790d5512998f232480dde61d4d42fa692ae/CICD-SEC-04-Poisoned-Pipeline-Execution.md

- **CICD-SEC-4.** Poisoned Pipeline Execution (PPE) risks refer to the ability of an attacker with access to source control systems - and without access to the build environment, to manipulate the build process by injecting malicious code/commands into the build pipeline configuration, essentially ‘poisoning’ the pipeline and running malicious code as part of the build process.
- **CICD-SEC-4.** Ensure that pipelines running unreviewed code are executed on isolated nodes, not exposed to secrets and sensitive environments.
- **CICD-SEC-4.** To prevent the manipulation of the CI configuration file to run malicious code in the pipeline, each CI configuration file must be reviewed before the pipeline runs.

## CICD-SEC-5: Insufficient PBAC (Pipeline-Based Access Controls)

Source: https://raw.githubusercontent.com/OWASP/www-project-top-10-ci-cd-security-risks/74b2c790d5512998f232480dde61d4d42fa692ae/CICD-SEC-05-Insufficient-PBAC.md

- **CICD-SEC-5.** When running malicious code within a pipeline, adversaries leverage insufficient PBAC (Pipeline-Based Access Controls) risks to abuse the permission granted to the pipeline for moving laterally within or outside the CI/CD system.
- **CICD-SEC-5.** Do not use a shared node for pipelines with different levels of sensitivity / that require access to different resources.

## CICD-SEC-6: Insufficient Credential Hygiene

Source: https://raw.githubusercontent.com/OWASP/www-project-top-10-ci-cd-security-risks/74b2c790d5512998f232480dde61d4d42fa692ae/CICD-SEC-06-Insufficient-Credential-Hygiene.md

- **CICD-SEC-6.** Insufficient credential hygiene risks deal with an attacker’s ability to obtain and use various secrets and tokens spread throughout the pipeline due to flaws having to do with access controls around the credentials, insecure secret management and overly permissive credentials.
- **CICD-SEC-6.** Prefer using temporary credentials over static credentials.
- **CICD-SEC-6.** Ensure secrets that are used in CI/CD systems are scoped in a manner that allows each pipeline and step to have access to only the secrets it requires.

## CICD-SEC-7: Insecure System Configuration

Source: https://raw.githubusercontent.com/OWASP/www-project-top-10-ci-cd-security-risks/74b2c790d5512998f232480dde61d4d42fa692ae/CICD-SEC-07-Insecure-System-Configuration.md

- **CICD-SEC-7.** Insecure system configuration risks stem from flaws in the security settings, configuration and hardening of the different systems across the pipeline (e.g. SCM, CI, Artifact repository), often resulting in “low hanging fruits” for attackers looking to expand their foothold in the environment.
- **CICD-SEC-7.** Ensure permissions to the pipeline execution nodes are granted according to the principle of least privilege.

## CICD-SEC-8: Ungoverned Usage of 3rd Party Services

Source: https://raw.githubusercontent.com/OWASP/www-project-top-10-ci-cd-security-risks/74b2c790d5512998f232480dde61d4d42fa692ae/CICD-SEC-08-Ungoverned-Usage-of-3rd-Party-Services.md

- **CICD-SEC-8.** Risks having to do with ungoverned usage of 3rd party services rely on the extreme ease with which a 3rd party service can be granted access to resources in CI/CD systems, effectively expanding the attack surface of the organization.
- **CICD-SEC-8.** Periodically review all 3rd parties integrated and remove those no longer in use.

## CICD-SEC-9: Improper Artifact Integrity Validation

Source: https://raw.githubusercontent.com/OWASP/www-project-top-10-ci-cd-security-risks/74b2c790d5512998f232480dde61d4d42fa692ae/CICD-SEC-09-Improper-Artifact-Integrity-Validation.md

- **CICD-SEC-9.** Improper artifact integrity validation risks allow an attacker with access to one of the systems in the CI/CD process to push malicious (although seemingly benign) code or artifacts down the pipeline, due to insufficient mechanisms for ensuring the validation of code and artifacts.
- **CICD-SEC-9.** Prior to consuming the resource in subsequent steps down the pipeline, the resource’s integrity should be validated against the signing authority.

## CICD-SEC-10: Insufficient Logging and Visibility

Source: https://raw.githubusercontent.com/OWASP/www-project-top-10-ci-cd-security-risks/74b2c790d5512998f232480dde61d4d42fa692ae/CICD-SEC-10-Insufficient-Logging-And-Visibility.md

- **CICD-SEC-10.** Insufficient logging and visibility risks allow an adversary to carry out malicious activities within the CI/CD environment without being detected during any phase of the attack kill chain, including identifying the attacker’s TTPs (Techniques, Tactics and Procedures) as part of any post-incident investigation.
