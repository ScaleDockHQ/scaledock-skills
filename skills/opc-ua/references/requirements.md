# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published text, quoted as written (only line breaks and hyphenation from PDF layout were joined). Apply the ones that match the role. Each is labelled with the nearest section, clause or article in the published document.

## Part 2: Security Model

Source: https://reference.opcfoundation.org/specs/OPC-10000-2/v1.05.06

- **§ 4.8.** Profile None shall be disabled by default.
- **§ 6.15.** Passwords shall not be hardcoded as part of an application.
- **§ 6.19.** Security information shall only be available to security Administrators.

## Part 3: Address Space Model

Source: https://reference.opcfoundation.org/specs/OPC-10000-3/v1.05.06

- **§ 4.2.** Programs shall always treat URIs as opaque strings that can only be tested for equality with a case sensitive string comparison.
- **§ 4.4.3.** The set of Attributes defined for each NodeClass shall not be extended by Clients or Servers.
- **§ 4.6.1.** OPC UA Servers shall provide type definitions for Objects and Variables.
- **§ 4.6.4.** Instances based on InstanceDeclarations shall always keep the same BrowseName as the InstanceDeclaration they are derived from.
- **§ 4.7.1.** Any OPC UA Server that supports eventing shall expose at least one Node as EventNotifier.

## Part 4: Services

Source: https://reference.opcfoundation.org/specs/OPC-10000-4/v1.05.07

- **§ 5.5.1.** Every Server shall have a DiscoveryEndpoint that Clients can access without establishing a Session.
- **§ 5.6.1.** When a Client and Server are communicating via a SecureChannel, they shall verify that all incoming Messages have been signed and encrypted according to the requirements specified in the EndpointDescription.
- **§ 5.6.2.1.** To protect against misbehaving Clients and denial of service attacks, the Server shall close the oldest unused SecureChannel that has no Session assigned before reaching the maximum number of supported SecureChannels.
- **§ 5.6.2.1.** The OpenSecureChannel request and response Messages shall be signed with the sender's private key.
- **§ 5.6.2.1.** If the securityPolicyUri is not None, a Client shall verify the HostName specified in the Server Certificate is the same as the HostName contained in the endpointUrl.
- **§ 5.6.2.2.** A new clientNonce shall be generated for each time a SecureChannel is renewed.
- **§ 5.6.2.3.** A Server shall check the minimum length of the Client nonce and return this status if the length is below 32 bytes.
- **§ 5.7.2.1.** Before calling this Service, the Client shall create a SecureChannel with the OpenSecureChannel Service to ensure the Integrity of all Messages exchanged during a Session.
- **§ 5.7.3.1.** This Service request shall be issued by the Client before it issues any Service request other than CloseSession after CreateSession.
- **§ 5.7.3.1.** When a Client provides a user identity then it shall provide proof that it is authorized to use that user identity.
- **§ 5.7.3.1.** A Server shall re-evaluate the permissions of all MonitoredItems in Subscriptions assigned to the Session after a user identity change.

## Part 6: Mappings

Source: https://reference.opcfoundation.org/specs/OPC-10000-6/v1.05.07

- **§ 5.1.4.** DateTime values shall be encoded as UTC values.
- **§ 5.1.8.** Decoders shall support at least 100 nesting levels.
- **§ 5.1.11.** When testing for equality, applications shall treat null and empty arrays as equal.
- **§ 6.2.1.** Certificates used by OPC UA applications shall also conform to IETF RFC 5280 which defines a profile for X.509 v3 Certificates when they are used as part of an Internet based application.
- **§ 6.2.2.** For RSA profiles, the extendedKeyUsage shall specify serverAuth for Servers and shall specify clientAuth for Clients.
- **§ 6.2.2.** The basicConstraints extension shall be present and shall not be ignored.
- **§ 6.2.3.** The cA flag shall be FALSE for User Certificates.
- **§ 6.2.6.** All OPC UA applications shall accept partial or complete chains in any field that contains a DER encoded Certificate.
