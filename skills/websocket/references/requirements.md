# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## RFC 6455 The WebSocket Protocol

Source: https://www.rfc-editor.org/rfc/rfc6455.html

- **document.** The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [ RFC2119 ].
- **document.** Requirements phrased in the imperative as part of algorithms (such as "strip any leading space characters" or "return false and abort these steps") are to be interpreted with the meaning of the key word ("MUST", "SHOULD", "MAY", etc.) used in introducing the algorithm.
- **document.** The "resource-name" (also known as /resource name/ in Section 4.1 ) can be constructed by concatenating the following: o "/" if the path component is empty o the path component o "?" if the query component is non-empty o the query component Fragment identifiers are meaningless in the context of WebSocket URIs and MUST NOT be used on these URIs.
- **document.** As with any URI scheme, the character "#", when not indicating the start of a fragment, MUST be escaped as %23.
- **document.** When the client is to _Establish a WebSocket Connection_ given a set of (/host/, /port/, /resource name/, and /secure/ flag), along with a list of /protocols/ and /extensions/ to be used, and an /origin/ in the case of web browsers, it MUST open a connection, send an opening handshake, and read the server's handshake in response.
- **document.** The components of the WebSocket URI passed into this algorithm (/host/, /port/, /resource name/, and /secure/ flag) MUST be valid according to the specification of WebSocket URIs specified in Section 3 .
- **document.** If any of the components are invalid, the client MUST _Fail the WebSocket Connection_ and abort these steps.
- **document.** If the client already has a WebSocket connection to the remote host (IP address) identified by /host/ and port /port/ pair, even if the remote host is known by another name, the client MUST wait until that connection has been established or for that connection to have failed.

## RFC 8441 Bootstrapping WebSockets with HTTP/2

Source: https://www.rfc-editor.org/rfc/rfc8441.html

- **document.** Terminology The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **document.** The value of the parameter MUST be 0 or 1.
- **document.** A sender MUST NOT send a SETTINGS_ENABLE_CONNECT_PROTOCOL parameter with the value of 0 after previously sending a value of 1.
- **document.** The pseudo-header field is single valued and contains a value from the "Hypertext Transfer Protocol (HTTP) Upgrade Token Registry" located at < https://www.iana.org/assignments/http-upgrade-tokens/ > o On requests that contain the :protocol pseudo-header field, the :scheme and :path pseudo-header fields of the target URI (see Section 5 ) MUST also be included.
- **document.** In particular, the server MUST NOT create a tunnel to the host indicated by the :authority as it would with a CONNECT method request that was not modified by this extension.
- **document.** Using Extended CONNECT to Bootstrap the WebSocket Protocol The :protocol pseudo-header field MUST be included in the CONNECT request, and it MUST have a value of "websocket" to initiate a WebSocket connection on an HTTP/2 stream.
- **document.** The scheme of the target URI ( Section 5.1 of [RFC7230] ) MUST be "https" for "wss"-schemed WebSockets and "http" for "ws"-schemed WebSockets.
- **document.** They MUST NOT be included in the CONNECT request defined here.
