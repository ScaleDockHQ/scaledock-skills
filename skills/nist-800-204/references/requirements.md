# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## SP 800-204

Source: https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-204.pdf

Walter Copan, NIST Director and Under Secretary of Commerce for Standards and Technology

- **document.** Nothing in this publication should be taken to contradict the standards and guidelines made mandatory and binding on federal agencies by the Secretary of Commerce under statutory authority.
- **document.** Nor should these guidelines be interpreted as altering or superseding the existing authorities of the Secretary of Commerce, Director of the OMB, or any other federal official.
- **document.** 2.2 Microservices: Design Principles The design of a microservice is based on the following drivers [4]: • Each microservice must be managed, replicated, scaled, upgraded, and deployed independently of other microservices.
- **document.** • Each microservice must have a single function and operate in a bounded context (i.e., have limited responsibility and dependence on other services).
- **document.** • All microservices should be designed for constant failure and recovery and must therefore be as stateless as possible.
- **document.** NIST SP 800-204 SECURITY STRATEGIES FOR MICROSERVICES-BASED APPLICATION SYSTEMS 4 This publication is available free of charge from: https://doi.org/10.6028/NIST.SP.800-204 • One should reuse existing trusted services (e.g., databases, caches, directories) for state
- **document.** • Scalability: applications must be highly scalable to maintain availability in the face of an increasing number of users and/or increased rate of usage from the existing user base.
- **document.** • The microservice making the request must ensure that the request has been successfully delivered to the target microservice.

## SP 800-204A

Source: https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-204A.pdf

Walter Copan, NIST Director and Under Secretary of Commerce for Standards and Technology

- **document.** Nothing in this publication should be taken to contradict the standards and guidelines made mandatory and binding on federal agencies by the Secretary of Commerce under statutory authority.
- **document.** Nor should these guidelines be interpreted as altering or superseding the existing authorities of the Secretary of Commerce, Director of the OMB, or any other federal official.
- **document.** The supporting services (e.g., authentication/authorization, security monitoring, etc.) for a microservices-based application must be tightly coordinated through a dedicated infrastructure, such as the Service Mesh.
- **document.** ● All microservices must be treated as non-trustworthy.
- **document.** 1.1 Why Service Mesh Due to the security requirements for microservices-based applications stated above, the infrastructure that supports the application and that infrastructure’s associated services (e.g., security) should be tightly coordinated.
- **document.** There are multiple microservices, and the authentication policies should be defined to provide coverage for all of them.
- **document.** Further authorization modules covering resources in all microservices must be built to provide fine-grained authorization in all service requests.
- **document.** 2.3 Improving Availability through Network Resilience Techniques ● Load balancing: There is a need to have multiple instances of the same service, and the loads on these instances must be evenly distributed to avoid delayed responses or service crashes due to overload.

## SP 800-204B

Source: https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-204B.pdf

James K. Olthoff, Performing the Non-Exclusive Functions and Duties of the Under Secretary of Commerce

- **document.** Nothing in this publication should be taken to contradict the standards and guidelines made mandatory and binding on f ederal agencies by the Secretary of Commerce under statutory authority.
- **document.** Nor should these guidelines be interpreted as altering or superseding the existing authorities of the Secretary of Commerce, Director of the OMB, or any other f ederal official.
- **document.** They are: ● Multiple, loosely coupled microservices communicate through network calls, and these communication links must be protected.
- **document.** ● The logging data that pertains to each microservice must be consolidated to obtain a security profile in order for forensics, audits, and analytics to assess the overall health of the application.
- **document.** When implemented within the service mesh, the critical requirements of this framework are: ● The code that is part of this framework should be verifiable and non-bypassable (always invoked), thus satisfying the requirements of a security kernel.
- **document.** ● The framework should provide authentication and authorization services at both the service level and end-user level.
- **document.** ● The framework should be able to support a diverse set of authorization policies.
- **document.** Every Kubernetes container within a pod has a separate log, and hence a custom solution over Kubernetes must be implemented to capture and consolidate them.

## SP 800-204C

Source: https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-204C.pdf

James K. Olthoff, Performing the Non-Exclusive Functions and Duties of the Under Secretary of Commerce

- **document.** Nothing in this publication should be taken to contradict the standards and guidelines made mandatory and binding on federal agencies by the Secretary of Commerce under statutory authority.
- **document.** Nor should these guidelines be interpreted as altering or superseding the existing authorities of the Secretary of Commerce, Director of the OMB, or any other f ederal official.
- **document.** It should be noted that there is no community-wide consensus on the term “DevSecOps.” As already stated, the term was primarily coined to emphasize the fact that security must be tested and incorporated in all stages of the software development life cycle (i.e., build, test, package, deploy, and operate).
- **document.** A portion of the community continues to use the term “DevOps” based on the argument that there is no need to define a new term since security must be an integral part of any software life cycle process.
- **document.** Every Kubernetes container within a pod has a separate log, and a custom solution over Kubernetes must be implemented to capture and consolidate them.
- **document.** While the development team should be overall aware of the security and management details of deployment of their code, the automation of the above mentioned services provides more time to them to concentrate their efforts on efficient development paradigms, such as code modularity and structuring.
- **document.** It should be noted that an organization has the option to continue the build process when a test fails.
- **document.** In the fail-closed event, the developer gets the test outcome report, must fix the issues, and restart the CI process.

## SP 800-204D

Source: https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-204D.pdf

Laurie E. Locascio, NIST Director and Under Secretary of Commerce for Standards and Technology

- **document.** Nothing in this publication should be taken to contradict the standards and guidelines made mandatory and
- **document.** Nor should these guidelines be interpreted as altering or superseding the existing authorities of the Secretary of Commerce, Director of the OMB, or any other federal official.
- **document.** Since the specification of these artifacts, their mandatory constituents, and the requirements that processes using them must satisfy are continually evolving through projects in government organizations and various industry forums, they are beyond the scope of this document.
- **document.** Thus, in the context of cloud-native applications, SSC security assurance measures must be integrated into CI/CD pipelines.
- **document.** The specification of these artifacts, their mandatory constituents, and the requirements that processes using them must satisfy are continually evolving through projects in government organizations and various industry forums and are, therefore, beyond the scope of this document.
- **document.** SSC security should also account for discovering and tracking software security defects rather than simply mitigating attacks.
- **document.** To facilitate this, the software bill of materials (SBOM) must be shared with end users so that they can build inventories of software components.
- **document.** Developer Environment Developer workstations and their environments present a fundamental risk to the security of an SSC and should not be trusted as part of the build process since they are at risk of compromise.
