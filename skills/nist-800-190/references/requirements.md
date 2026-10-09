# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. SP 800-190 is guidance, so its recommendations use "should"; these are the Section 4 countermeasures quoted as written (only line breaks and hyphenation from PDF layout were joined). Apply the ones that match the role. Each is labelled with the section of the countermeasure.

## SP 800-190 countermeasures

Source: https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-190.pdf

- **§ 4.1.1.** Organizations should use tools that take the pipeline-based build approach and immutable nature of containers and images into their design to provide more actionable and reliable results.
- **§ 4.1.2.** For example, images should be configured to run as non-privileged users.
- **§ 4.1.2.** A final recommendation for image configuration is that SSH and other remote administration tools designed to provide remote shells to hosts should never be enabled within containers.
- **§ 4.1.3.** Organizations should continuously monitor all images for embedded malware.
- **§ 4.1.4.** Secrets should be stored outside of images and provided dynamically at runtime as needed.
- **§ 4.1.5.** Organizations should maintain a set of trusted images and registries and ensure that only images from this set are allowed to run in their environment, thus mitigating the risk of untrusted or malicious components being deployed.
- **§ 4.2.1.** Organizations should configure their development tools, orchestrators, and container runtimes to only connect to registries over encrypted channels.
- **§ 4.2.3.** Any write access to a registry should require authentication to ensure that only images from trusted entities can be added to it.
- **§ 4.3.1.** Especially because of their wide-ranging span of control, orchestrators should use a least privilege access model in which users are only granted the ability to perform the specific actions on the specific hosts, containers, and images their job roles require.
- **§ 4.3.2.** Organizations should use strong authentication methods, such as requiring multifactor authentication instead of just a password.
- **§ 4.3.3.** Orchestrators should be configured to separate network traffic into discrete virtual networks by sensitivity level.
- **§ 4.3.4.** Orchestrators should be configured to isolate deployments to specific sets of hosts by sensitivity levels.
- **§ 4.4.2.** Organizations should control the egress network traffic sent by containers.
- **§ 4.4.3.** Organizations should automate compliance with container runtime configuration standards.
- **§ 4.4.3.** At a minimum, organizations should ensure that containers are run with the default profiles provided by their runtime and should consider using additional profiles for high-risk apps.
- **§ 4.4.4.** Containers should also be run with their root filesystems in read-only mode.
- **§ 4.4.5.** All container creation should be associated with individual user identities and logged to provide a clear audit trail of activity.
- **§ 4.5.1.** Whenever possible, organizations should use these minimalistic OSs to reduce their attack surfaces and mitigate the typical risks and hardening activities associated with general-purpose OSs.
- **§ 4.5.2.** In addition to grouping container workloads onto hosts by sensitivity level, organizations should not mix containerized and non-containerized workloads on the same host instance.
- **§ 4.5.5.** In no case should containers be able to mount sensitive directories on a host's file system, especially those containing configuration settings for the operating system.
