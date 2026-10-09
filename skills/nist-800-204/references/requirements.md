# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. These guides mostly recommend with "should" and occasionally require with "must"; the sentences are quoted as written (only line breaks and hyphenation from PDF layout were joined). Apply the ones that match the role. Each is labelled with its strategy or recommendation identifier where the guide assigns one, otherwise with its section.

## SP 800-204: Security Strategies for Microservices-based Application Systems

Source: https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-204.pdf

- **MS-SS-1.** Authentication to microservices APIs that have access to sensitive data should not be done simply by using API keys.
- **MS-SS-1.** (a) the token expiry times should be as short as possible since they determine the duration of the session and an active session cannot be revoked, and (b) the token secret key must not be a part of the library code; it must be a dynamic variable represented by an environmental variable or specified in an environment data file.
- **MS-SS-4.** Client to API gateway as well as Service to Service communication should take place after mutual authentication and be encrypted (e.g., using mutual TLS (mTLS) protocol).
- **MS-SS-8.** For high security microservices, replay detection must be implemented.
- **MS-SS-10.** Internal authorization tokens must not be provided back to the user, and the user's session tokens must not be passed beyond the gateway for use in policy decisions.

## SP 800-204A: Building Secure Microservices-based Applications Using Service-Mesh Architecture

Source: https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-204A.pdf

- **SM-DR1.** By default, a service proxy should not allow traffic except as specified by this configuration.
- **SM-DR2.** The set of services that a service proxy can reach must be limited.
- **SM-DR6.** Further, service proxies should only communicate with each other by setting up a mutual TLS (mTLS) session where every exchanged data packet is encrypted.
- **SM-DR8.** Access to external resources or services outside of the mesh should be disabled by default and only allowed by an explicit policy that restricts access to specified destinations.
- **SM-DR12.** Instead, the signing certificate used by the mesh's control plane should always be rooted in the enterprise's existing PKI's root of trust and provided securely to the Service Mesh control plane at startup.
- **SM-DR13.** The lifetime of a microservice's identity certificate should be as short as is manageable within the infrastructure—preferably on the order of hours.
- **SM-DR15.** Certificates used to identify microservices should not be signing certificates.

## SP 800-204B: Attribute-based Access Control for Microservices-based Applications Using a Service Mesh

Source: https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-204B.pdf

- **AHLC-SR-1.** Containers and applications should not be run as root (thus becoming privileged containers).
- **AHLC-SR-4.** Explicitly prevent privilege escalation for containers.
- **§ 5.2.1.** Service-to-service requests must be authorized based on the identity of the calling and called services.
- **APE-SR-3.** A default policy should be authored in the system that rejects all requests that are unauthenticated, mandates that service and end-user credentials be present on every request, restricts all communication to services within the application's own namespace, and allows service communication across namespaces only through an explicit policy.

## SP 800-204C: Implementation of DevSecOps for a Microservices-based Application with Service Mesh

Source: https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-204C.pdf

- **§ 4.8.1.** Container images should be scanned for vulnerabilities.

## SP 800-204D: Strategies for the Integration of Software Supply Chain Security in DevSecOps CI/CD Pipelines

Source: https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-204D.pdf

- **§ 5.1.1.** The attestations must be cryptographically signed using a secure key.
- **§ 5.1.1.** The storage location must be tamper-proof and protected using robust access control.
- **§ 5.1.4.** If open-source modules and libraries are used, dependencies must be enumerated, understood, and evaluated for policy (potentially using appropriate SCA tools).
