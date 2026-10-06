# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## SP 800-207

Source: https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-207.pdf

Walter Copan, NIST Director and Under Secretary of Commerce for Standards and Technology

- **document.** Nothing in this publication should be taken to contradict the standards and guidelines made mandatory and binding on f ederal agencies by the Secretary of Commerce under statutory authority.
- **document.** Nor should these guidelines be interpreted as altering or superseding the existing authorities of the Secretary of Commerce, Director of the OMB, or any other f ederal official.
- **document.** A ZT approach is primarily focused on data and service protection but can and should be expanded to include all enterprise assets (devices, infrastructure components, applications, virtual and cloud components) and subjects (end users, applications and other non- human entities that request information from resources).
- **document.** In this new paradigm, an enterprise must assume no implicit trust and continually analyze and evaluate the risks to its assets and business functions and then enact protections to mitigate these risks.
- **document.** Organizations should seek to incrementally implement zero trust principles,
- **document.** NIST SP 800-207 ZERO TRUST ARCHITECTURE 4 This publication is available free of charge from: https://doi.org/10.6028/NIST.SP.800-207 2 Zero Trust Basics Zero trust is a cybersecurity paradigm focused on resource protection and the premise that trust is never granted implicitly but must be continually evaluated.
- **document.** The initial focus should be on restricting resources to those with a need to access and grant only the minimum privileges (e.g., read, write, delete) needed to perform the mission.
- **document.** Access is granted through a policy decision point (PDP) and corresponding policy enforcement point (PEP).3 Figure 1: Zero Trust Access The system must ensure that the subject is authentic and the request is valid.

## SP 800-207A

Source: https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-207A.pdf

Laurie E. Locascio, NIST Director and Under Secretary of Commerce for Standards and Technology

- **document.** N othing in this publication should be taken to contradict the standards and guidelines made mandatory and binding
- **document.** Nor should these guidelines be interpreted as altering or superseding the existing authorities of the Secretary of Commerce, Director of the OMB, or any other federal official.
- **document.** In order to follow zero trust principles, the constituent polices in the framework should consider the following scenario: • There should not be implicit trust in users, services, or devices based exclusively on their network location, affiliation, or ownership.
- **document.** • To ensure the presence of zero trust principles throughout the entire application, network- tier policies must be augmented with policies that establish trust in the identity of the various participating entities (e.g., users and services) irrespective of the location of the services or applications, whether on-premises or on multiple clouds.
- **document.** The policy framework should also consist of a comprehensive set of policies that span all critical entities and resources in the application stack, including the network, network devices, users, and services.
- **document.** • Identifying the infrastructural elements that should be part of the platform in order to configure and implement ZT principles.
- **document.** • Since APIs play a crucial role in cloud-native applications, proper versioning (to provide backward compatibility), proper input validation techniques (to prevent attacks, such as Structured Query Language (SQL) injection and cross-site scripting), and output encoding must be part of the policy framework in addition to general requirements, such as proper documentation for key areas (e.g., usage instructions).
- **document.** Rather, they must collectively enforce zero trust principles across all applications in the infrastructure.
