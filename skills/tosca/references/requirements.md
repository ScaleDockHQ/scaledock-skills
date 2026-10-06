# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## TOSCA 2.0

Source: https://docs.oasis-open.org/tosca/TOSCA/v2.0/os/TOSCA-v2.0-os.html

The Topology and Orchestration Specification for Cloud Applications (TOSCA) provides a language for describing application components and their relationships by means of a service topology, and for specifying the lifecycle management procedures for creation or modification of services using orchestration processes. The combination of topology and orchestration enables not only the automation of deployment but also the automation of the complete service lifecycle management. The TOSCA specification promotes a model-driven approach, whereby information embedded in the model structure (the dependencies, connections, compositions) drives the automated processes.

- **Key Words.** The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in BCP 14 [ RFC2119 ] and [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **5.2 Mandatory Keynames.** If a keyname is marked as mandatory it MUST be defined in that particular definition context.
- **5.3.1 metadata.** The following shows an example that uses metadata to track revision status of a TOSCA file: metadata : creation-date : '2025-04-14' date-updated : '2025-05-01' status : developmental Data provided within metadata, wherever it appears, MAY be ignored by TOSCA Orchestrators and SHOULD NOT affect runtime behavior.
- **6.1 Keynames.** The following rules apply: The key tosca_definitions_version MUST be the first line of each TOSCA file.
- **6.1 Keynames.** However, a TOSCA file that defines a profile MUST NOT define a service_template .
- **6.2 TOSCA Definitions Version.** The mandatory tosca_definitions_version keyname provides a means to specify the TOSCA version used within the TOSCA file as follows: tosca_definitions_version : <tosca_version> It is an indicator for the version of the TOSCA grammar that MUST be used to parse the remainder of the TOSCA file.
- **6.4.2 Type Derivation.** For definitions that are not inherited, a new definition MUST be provided (if the keyname is mandatory) or MAY be provided (if the keyname is not mandatory).
- **6.7.1 Grammar.** For example, the following profile statement is used to define Version 2.0 of a set of definitions suitable for describing cloud computing in an example company: profile : com.example.tosca_profiles.cloud_computing:2.0 The following defines a domain-specific profile for Kubernetes: profile : io.kubernetes:1.30 TOSCA parsers MUST process profile definitions according to the following rules: TOSCA…
