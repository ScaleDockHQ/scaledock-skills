# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## WebDriver Level 1

Source: https://www.w3.org/TR/webdriver1/

WebDriver is a remote control interface that enables introspection and control of user agents. It provides a platform- and language-neutral wire protocol as a way for out-of-process programs to remotely instruct the behavior of web browsers. Provided is a set of interfaces to discover and manipulate DOM elements in web documents and to control the behavior of a user agent. It is primarily intended to allow web authors to write tests that automate a user agent from a separate controlling process, but may also be used in such a way as to allow in-browser scripts

- **1. Conformance.** The key words “ MUST ”, “ MUST NOT ”, “ REQUIRED ”, “ SHOULD ”, “ SHOULD NOT ”, “ RECOMMENDED ”, “ MAY ”, and “ OPTIONAL ” in the normative parts of this document are to be interpreted as described in [ RFC2119 ].
- **6.3 Processing Model.** After such a connection has been established, a remote end MUST run the following steps: Read bytes from the connection until a complete HTTP request can be constructed from the data.
- **7. Capabilities.** The following table of standard capabilities enumerates the capabilities each implementation MUST support.
- **8.1 New Session.** An intermediary node MAY also define extension capabilities to assist in this process, however, these specific capabilities MUST NOT be forwarded to the endpoint node .
- **8.1 New Session.** An intermediary node MUST forward custom, top-level parameters (i.e.
- **1.1 Dependencies.** must be interpreted as required for conforming IDL fragments, as described in the Web IDL specification.
- **4. Interface.** Navigator includes NavigatorAutomationInformation ; Note that the NavigatorAutomationInformation interface should not be exposed on WorkerNavigator .
- **5. Nodes.** All remote end node types must be black-box indistinguishable from a remote end , from the point of view of local end , and so are bound by the requirements on a remote end in terms of the wire protocol.

## WebDriver Level 2

Source: https://www.w3.org/TR/webdriver2/

WebDriver is a remote control interface that enables introspection and control of user agents. It provides a platform- and language-neutral wire protocol as a way for out-of-process programs to remotely instruct the behavior of web browsers. Provided is a set of interfaces to discover and manipulate DOM elements in web documents and to control the behavior of a user agent. It is primarily intended to allow web authors to write tests that automate a user agent from a separate controlling process, but may also be used in such a way as to allow in-browser scripts

- **4. Interface.** WebIDL interface mixin NavigatorAutomationInformation { readonly attribute boolean webdriver ; }; Navigator includes NavigatorAutomationInformation ; Note The NavigatorAutomationInformation interface should not be exposed on WorkerNavigator .
- **5. Nodes.** All remote end node types must be black-box indistinguishable from a remote end , from the point of view of local end , and so are bound by the requirements on a remote end in terms of the wire protocol.
- **5. Nodes.** It must be false if the implementation is an endpoint node and the list of active HTTP sessions is not empty, or otherwise if the remote end is known to be in a state in which attempting to create new sessions would fail.
- **6. Protocol.** WebDriver remote ends must provide an HTTP compliant wire protocol where the endpoints map to different commands .
- **6. Protocol.** As this standard only defines the remote end protocol, it puts no demands to how local ends should be implemented.
- **6.3 Processing model.** After a connection is established, the remote end must run the following steps: While the connection is not closed: Read bytes from the connection until a complete HTTP request can be constructed from the data.
- **6.3 Processing model.** If it is not possible to construct a complete HTTP request , the remote end must either close the connection , return an HTTP response with status code 500, or return an error with error code unknown error .
- **6.3 Processing model.** code and an optional error data dictionary, a remote end must run the following steps: Let status and name be the error response data for error code .

## WebDriver BiDi

Source: https://www.w3.org/TR/webdriver-bidi/

This document defines the BiDirectional WebDriver Protocol, a mechanism for remote control of user agents.

- **8.3.3. The viewport meta element.** If WebDriver BiDi viewport meta state given the `viewport` meta element’s node document is true, the user agent MUST use the `viewport` meta element.
- **3.3. Modules.** These must have a module name that contains a single colon " : " character.
- **3.3. Modules.** The part before the colon is the prefix; this is typically the same for all extension modules specific to a given implementation and should be unique for a given implementation.
- **3.3. Modules.** Such modules must not have a name which contains a colon ( : ) character, nor must they define command names , event names , or property names that contain that character.
- **4. Transport.** When a WebSocket listener listener is created, a remote end must start to listen for WebSocket connections on the host and port given by listener ’s host and port .
- **4. Transport.** If listener ’s secure flag is set, then connections established from listener must be TLS encrypted.
- **4. Transport.** When a client establishes a WebSocket connection connection by connecting to one of the set of active listeners listener , the implementation must proceed according to the WebSocket server-side requirements , with the following steps run when deciding whether to accept the incoming connection: Let resource name be the resource name from reading the client’s opening handshake .
- **4. Transport.** If resource name is the byte string " /session ", and the implementation supports BiDi-only sessions : Run any other implementation-defined steps to decide if the connection should be accepted, and if it is not stop running these steps and act as if the requested service is not available.
