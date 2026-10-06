# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## LTI 1.3

Source: https://www.imsglobal.org/spec/lti/v1p3

The IMS Learning Tools Interoperability (LTI)® specification allows Learning Management Systems (LMS) or platforms to integrate remote tools and content in a standard way. LTI™ v1.3 builds on LTI v1.1 by incorporating a new model for security for message and service authentication.

- **IPR and Distribution Notice.** ANY USE OF THIS SPECIFICATION SHALL BE MADE ENTIRELY AT THE IMPLEMENTER'S OWN RISK, AND NEITHER THE CONSORTIUM, NOR ANY OF ITS MEMBERS OR SUBMITTERS, SHALL HAVE ANY LIABILITY WHATSOEVER TO ANY IMPLEMENTER OR THIRD PARTY FOR ANY DAMAGES OF ANY NATURE WHATSOEVER, DIRECTLY OR INDIRECTLY, ARISING FROM THE USE OF THIS SPECIFICATION.
- **1.2 Conformance Statements.** The key words MAY , MUST , MUST NOT , OPTIONAL , RECOMMENDED , REQUIRED , SHALL , SHALL NOT , SHOULD , and SHOULD NOT in this document are to be interpreted as described in [ RFC2119 ].
- **1.2 Conformance Statements.** An implementation of this specification that fails to implement a MUST/REQUIRED/SHALL requirement or fails to abide by a MUST NOT/SHALL NOT prohibition is considered nonconformant.
- **1.2 Conformance Statements.** SHOULD/SHOULD NOT/RECOMMENDED statements constitute a best practice.
- **3.1.3 Tool Deployment.** When a user deploys a tool within their tool platform, the platform MUST generate an immutable deployment_id identifier to identify the integration.
- **3.1.3 Tool Deployment.** A platform MUST generate a unique deployment_id for each tool it integrates with.
- **3.1.3 Tool Deployment.** Every message between the platform and tool MUST include the deployment_id in addition to the client_id .
- **3.1.3 Tool Deployment.** A tool MUST thus allow multiple deployments on a given platform to share the same client_id and the security contract attached to it.
