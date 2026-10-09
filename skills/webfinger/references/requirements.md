# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published RFC text, quoted as written (only line breaks and page breaks from the plain-text layout were joined). Apply the ones that match the role. Each is labelled with the RFC and section it comes from.

## RFC 7033 WebFinger

Source: https://www.rfc-editor.org/rfc/rfc7033.html

- **RFC 7033 § 4.** WebFinger resources MUST NOT be served with any other URI scheme (such as HTTP).
- **RFC 7033 § 4.** The path component of a WebFinger URI MUST be the well-known path "/.well-known/webfinger".
- **RFC 7033 § 4.1.** The query component MUST contain a "resource" parameter and MAY contain one or more "rel" parameters.
- **RFC 7033 § 4.1.** The "resource" parameter MUST contain the query target (URI), and the "rel" parameters MUST contain encoded link relation types according to the encoding described in this section.
- **RFC 7033 § 4.2.** If the "resource" parameter is absent or malformed, the WebFinger resource MUST indicate that the request is bad as per Section 10.4.1 of RFC 2616 [2].
- **RFC 7033 § 4.2.** If the "resource" parameter is a value for which the server has no information, the server MUST indicate that it was unable to match the request as per Section 10.4.5 of RFC 2616.
- **RFC 7033 § 4.2.** A client MUST query the WebFinger resource using HTTPS only.
- **RFC 7033 § 4.2.** If the client determines that the resource has an invalid certificate, the resource returns a 4xx or 5xx status code, or if the HTTPS connection cannot be established for any reason, then the client MUST accept that the WebFinger query has failed and MUST NOT attempt to reissue the WebFinger request using HTTP over a non-secure connection.
- **RFC 7033 § 4.2.** A WebFinger resource MUST return a JRD as the representation for the resource if the client requests no other supported format explicitly via the HTTP "Accept" header.
- **RFC 7033 § 4.2.** The WebFinger resource MUST silently ignore any requested representations that it does not understand or support.
- **RFC 7033 § 4.2.** A WebFinger resource MAY redirect the client; if it does, the redirection MUST only be to an "https" URI and the client MUST perform certificate validation again when redirected.
- **RFC 7033 § 4.3.** If the resource does not support the "rel" parameter, it MUST ignore the parameter and process the request as if no "rel" parameter values were present.
- **RFC 7033 § 4.4.** When processing a JRD, the client MUST ignore any unknown member and not treat the presence of an unknown member as an error.
- **RFC 7033 § 4.4.1.** The "subject" member SHOULD be present in the JRD.
- **RFC 7033 § 4.4.4.1.** The "rel" member MUST be present in the link relation object.
- **RFC 7033 § 5.** The current best practice is to make resources available to browsers through Cross-Origin Resource Sharing (CORS) [7], and servers MUST include the Access-Control-Allow-Origin HTTP header in responses.
- **RFC 7033 § 5.** A server that wishes to restrict access to information from external entities SHOULD use a more restrictive Access-Control-Allow-Origin header.
- **RFC 7033 § 8.1.** Any application that uses WebFinger MUST specify the URI scheme(s), and to the extent appropriate, what forms the URI(s) might take.
- **RFC 7033 § 9.1.** Clients MUST verify that the certificate used on an HTTPS connection is valid (as defined in [12]) and accept a response only if the certificate is valid.
- **RFC 7033 § 9.2.** WebFinger MUST NOT be used to provide any personal data unless publishing that data via WebFinger by the relevant service was explicitly authorized by the person whose information is being shared.
- **RFC 7033 § 9.3.** It is RECOMMENDED that implementers of WebFinger server software take steps to mitigate abuse, including malicious over-use of the server and harvesting of user information.
