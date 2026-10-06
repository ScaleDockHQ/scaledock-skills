# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## XACML 3.0

Source: https://docs.oasis-open.org/xacml/3.0/xacml-3.0-core-spec-os-en.html

http://www.oasis-open.org/committees/download.php/43799/xacml-3.0-core-spec-csprd03-en.zip

- **1.2 Terminology.** The key words �MUST�, �MUST NOT�, �REQUIRED�, �SHALL�, �SHALL NOT�, �SHOULD�, �SHOULD NOT�, �RECOMMENDED�, �MAY�, and �OPTIONAL� in this document are to be interpreted as described in [RFC2119] .
- **2.12 Actions performed in conjunction with enforcement.** In many applications, policies specify actions that MUST be performed, either instead of, or in addition to, actions that MAY be performed.� This idea was described by Sloman [Sloman94] .� XACML provides facilities to specify actions that MUST be performed in conjunction with policy evaluation in the <Obligations> element.� This idea was described as a provisional action by Kudo [Kudo00] .� There…
- **5.1 Element <PolicySet>.** A <PolicySet> element may be evaluated, in which case the evaluation procedure defined in Section 7.13 SHALL be used.
- **5.1 Element <PolicySet>.** If a <PolicySet> element contains references to other policy sets or policies in the form of URLs, then these references MAY be resolvable.� Policy sets and policies included in a <PolicySet> element MUST be combined using the algorithm identified by the PolicyCombiningAlgId attribute.� <PolicySet> is treated exactly like a <Policy> in all policy-combining algorithms .
- **5.1 Element <PolicySet>.** The <ObligationExpressions> element contains a set of obligation expressions that MUST be evaluated into obligations by the PDP and the resulting obligations MUST be fulfilled by the PEP in conjunction with the authorization decision .� If the PEP does not understand or cannot fulfill any of the obligations , then it MUST act according to the PEP bias.� See Section 7.2 and 7.18.
- **5.1 Element <PolicySet>.** The <AdviceExpressions> element contains a set of advice expressions that MUST be evaluated into advice by the PDP .
- **5.1 Element <PolicySet>.** PolicyCombiningAlgId [Required] The identifier of the policy-combining algorithm by which the <PolicySet> , <CombinerParameters> , <PolicyCombinerParameters> and <PolicySetCombinerParameters> components MUST be combined.� Standard policy-combining algorithms are listed in Appendix Appendix C.� Standard policy-combining algorithm identifiers are listed in Section B.9.
- **5.1 Element <PolicySet>.** <PolicySetDefaults> [Optional] A set of default values applicable to the policy set .� The scope of the <PolicySetDefaults> element SHALL be the enclosing policy set .

## XACML JSON Profile 1.1

Source: https://docs.oasis-open.org/xacml/xacml-json-http/v1.1/xacml-json-http-v1.1.html

https://docs.oasis-open.org/xacml/xacml-json-http/v1.1/os/xacml-json-http-v1.1-os.doc (Authoritative)

- **1.** Lossless behavior: it MUST be possible to translate XACML requests and responses between XML and JSON representations in either direction at any time without semantic loss.
- **1.** Transport-agnostic nature: the JSON representation MUST contain all the information the XACML request and/or response contains: this means the transport layer cannot convert XACML decisions into HTTP codes, e.g.
- **1.3 Terminology.** The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [RFC2119] .
- **3.2.1.** Member names Unless otherwise stated, JSON member names MUST match the XACML XML element and/or attribute names exactly, including case.
- **3.2.3.** The array MUST have at least one element .
- **3.2.4 Null values.** If an optional, non-array member has no value then it MUST be omitted from the containing object .
- **3.2.4 Null values.** A mandatory, non-array member MUST have a non-null value.
- **3.3.1 Supported Data Types.** urn:oasis:names:tc:xacml:3.0:data-type:xpathExpression xpathExpression None � inference must fail For all of the XACML data types that cannot be inferred from the value, the following MUST be observed: The JSON "DataType" member MUST be specified and the attribute value expressed in the XACML string representation of the value.
