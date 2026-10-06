# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## SOAP Version 1.2 Part 1: Messaging Framework (Second Edition)

Source: https://www.w3.org/TR/soap12-part1/

SOAP Version 1.2 is a lightweight protocol intended for exchanging structured information in a decentralized, distributed environment. "Part 1: Messaging Framework" defines, using XML technologies, an extensible messaging framework containing a message construct that can be exchanged over a variety of underlying protocols.

- **1.1 Notational Conventions.** The keywords "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in RFC 2119 [RFC 2119] .
- **1.2 Conformance.** For an implementation to claim conformance with the SOAP Version 1.2 specification, it MUST correctly implement all mandatory ("MUST") requirements expressed in Part 1 of the SOAP Version 1.2 specification (this document) that pertain to the activity being performed.
- **1.2 Conformance.** The implementation of an Adjunct MUST implement all the pertinent mandatory requirements expressed in the specification of the Adjunct to claim conformance with the Adjunct.
- **1.3 Relation to Other Specifications.** The values associated with element and attribute information items defined in this specification MUST be carried explicitly in the transmitted SOAP message except where stated otherwise (see 5.
- **1.3 Relation to Other Specifications.** The media type "application/soap+xml" SHOULD be used for XML 1.0 serializations of the SOAP message infoset (see SOAP 1.2 Part 2 [SOAP Part 2] , The "application/soap+xml" Media Type ).
- **2.1 SOAP Nodes.** A SOAP node receiving a SOAP message MUST perform processing according to the SOAP processing model as described in this section and in the remainder of this specification.
- **2.2 SOAP Roles and SOAP Nodes.** The roles assumed by a node MUST be invariant during the processing of an individual SOAP message.
- **2.2 SOAP Roles and SOAP Nodes.** Table 2: SOAP Roles defined by this specification Short-name Name Description next "http://www.w3.org/2003/05/soap-envelope/role/next" Each SOAP intermediary and the ultimate SOAP receiver MUST act in this role.

## SOAP Version 1.2 Part 2: Adjuncts (Second Edition)

Source: https://www.w3.org/TR/soap12-part2/

SOAP Version 1.2 is a lightweight protocol intended for exchanging structured information in a decentralized, distributed environment. SOAP Version 1.2 Part 2: Adjuncts defines a set of adjuncts that may be used with SOAP Version 1.2 Part 1: Messaging Framework. This specification depends on SOAP Version 1.2 Part 1: Messaging Framework [SOAP Part 1] .

- **1.1 Notational Conventions.** The keywords "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in RFC 2119 [RFC 2119] .
- **2.3 Values.** The outbound edges of a struct MUST be labeled with distinct names (see 2.1.1 Edge labels ).
- **2.3 Values.** The outbound edges of an array MUST NOT be labeled.
- **3. SOAP Encoding.** SOAP messages using this particular serialization SHOULD indicate that fact by using the SOAP encodingStyle attribute information item (see SOAP 1.2 Part 1 [SOAP Part 1] SOAP encodingStyle Attribute ).
- **3.1 Mapping between XML and the SOAP Data Model.** When serializing a graph for transmission inside a SOAP message, a representation that deserializes to the identical graph MUST be used; when multiple such representations are possible, any of them MAY be used.
- **3.1 Mapping between XML and the SOAP Data Model.** When receiving an encoded SOAP message, all representations MUST be accepted.
- **3.1.1 Encoding Graph Edges and Nodes.** In such cases the element information item represents both a graph edge and a graph node If the element information item representing the edge does have a ref attribute information item (see 3.1.5.2 ref Attribute Information Item ) among its attributes, then the value of that attribute information item MUST be identical to the value of exactly one id attribute information item ( see 3.1.5.1 id…
- **3.1.1 Encoding Graph Edges and Nodes.** That element information item MUST be in the scope of an encodingStyle attribute with a value of "http://www.w3.org/2003/05/soap-encoding" (see SOAP 1.2 Part 1 [SOAP Part 1] , SOAP encodingStyle Attribute ).

## Web Services Description Language (WSDL) Version 2.0 Part 1: Core Language

Source: https://www.w3.org/TR/wsdl20/

This document describes the Web Services Description Language Version 2.0 (WSDL 2.0), an XML language for describing Web services. This specification defines the core language which can be used to describe Web services based on an abstract model of what the service offers. It also defines the conformance criteria for documents in this language.

- **1.4.1 RFC.** 2119 Keywords The keywords “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in this document are to be interpreted as described in RFC 2119 [ IETF RFC 2119 ].
- **2. Component.** Such properties are marked as REQUIRED, whereas those that are not required to be present are marked as OPTIONAL.
- **2. Component.** In order to simplify the presentation of the rules that deal with sets of components, for all OPTIONAL properties whose type is a set, the absence of such a property from a component MUST be treated as semantically equivalent to the presence of a property with the same name and whose value is the empty set.
- **2. Component.** In other words, every OPTIONAL set-valued property MUST be assumed to have the empty set as its default value, to be used in case the property is absent.
- **2.1.1 The Description Component.** However, any WSDL 2.0 document that contains component definitions that refer by QName to WSDL 2.0 components that belong to a different namespace MUST contain a wsdl:import element information item for that namespace (see 4.2 Importing Descriptions ).
- **2.1.2.** The value of the targetNamespace attribute information item SHOULD be dereferencable.
- **2.1.2.** † It SHOULD resolve to a human or machine processable document that directly or indirectly defines the intended semantics of those components.
- **2.1.2.** † If a WSDL 2.0 document is split into multiple WSDL 2.0 documents (which may be combined as needed via 4.1 Including Descriptions ), then the targetNamespace attribute information item SHOULD resolve to a master WSDL 2.0 document that includes all the WSDL 2.0 documents needed for that service description.

## Web Services Addressing 1.0 - Core

Source: https://www.w3.org/TR/ws-addr-core/

Web Services Addressing provides transport-neutral mechanisms to address Web services and messages. Web Services Addressing 1.0 - Core (this document) defines a set of abstract properties and an XML Infoset [ XML Information Set ] representation thereof to reference Web services and to facilitate end-to-end addressing of endpoints in messages. This specification enables messaging systems to support message transmission through networks that include processing nodes such as endpoint managers, firewalls, and gateways in a transport-neutral manner.

- **1.1 Notational.** Conventions The keywords "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in RFC 2119 [ IETF RFC 2119 ].
- **2.1 Information.** "http://www.w3.org/2005/08/addressing/none" Messages sent to EPRs whose [address] is this value MUST be discarded (i.e.
- **2.1 Information.** of the scope of this specification, such as EPR life cycle information (see 2.4 Endpoint Reference Lifecycle ) or retrieval of metadata from an authoritative source, SHOULD be used.
- **2.2 Endpoint Reference.** /wsa:EndpointReference/wsa:Address This REQUIRED element (whose content is of type xs:anyURI) specifies the [address] property of the endpoint reference.
- **3.1 Abstract.** A binding of WS-Addressing message addressing properties MUST reflect the property cardinality shown above.
- **3.2.** /wsa:Action This REQUIRED element (whose content is of type xs:anyURI) conveys the value of the [action] property.
- **3.4 Formulating a.** If the [reply endpoint] message addressing property is not present the processor MUST fault.
- **3.4 Formulating a.** In either of the above cases, if the related message lacks a [message id] property, the processor MUST fault.

## SOAP over Java Message Service 1.0

Source: https://www.w3.org/TR/soapjms/

This document specifies how SOAP binds to a messaging system that supports the Java Message Service (JMS) [ Java Message Service ]. Binding is specified for both SOAP 1.1 [ SOAP 1.1 ] and SOAP 1.2 [ SOAP 1.2 Messaging Framework ] using the SOAP 1.2 Protocol Binding Framework. This specification also describes how to use WSDL documents to indicate and control the use of this binding.

- **1.4 Notational Conventions.** The keywords " MUST ", " MUST NOT ", " REQUIRED ", " SHALL ", " SHALL NOT ", " SHOULD ", " SHOULD NOT ", " RECOMMENDED ", " MAY ", and " OPTIONAL " in this document are to be interpreted as described in RFC 2119 [ IETF RFC 2119 ].
- **1.6 Conformance.** A conforming implementation MUST work with JMS.
- **1.6 Conformance.** † Feature: soapjms:Protocol [ http://www.w3.org/2010/soapjms/Protocol ] A conforming implementation MUST implement all the requirements of 2 The SOAP/JMS Underlying Protocol Binding .
- **1.6 Conformance.** † Conforming implementations MUST implement all the requirements of the JMS URI.
- **1.6 Conformance.** However, a conforming implementation of this feature MUST implement all the requirements of 3.3 WSDL 1.1 Extensions Detail .
- **2.2 Properties Affecting Binding.** If a given property is specified in more than one of these, the following list specifies the precedence: the first MUST be used in preference to the second.
- **2.2 Properties Affecting Binding.** If a given property is specified more than once in the JMS URI the last instance of the property MUST be used.
- **2.2.1 Connection to a destination.** MUST be specified in the JMS URI, as the jms-variant portion of the syntax.
