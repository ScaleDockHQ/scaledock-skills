# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Micropub

Source: https://www.w3.org/TR/micropub/

The Micropub protocol is used to create, update and delete posts on one's own domain using third-party clients. Web apps and native apps (e.g., iPhone, Android) can use Micropub to post and edit articles, short notes, comments, likes, photos, events or other kinds of posts on your own website.

- **2. Conformance.** The key words " MUST ", " MUST NOT ", " REQUIRED ", " SHALL ", " SHALL NOT ", " SHOULD ", " SHOULD NOT ", " RECOMMENDED ", " MAY ", and " OPTIONAL " in this document are to be interpreted as described in [ RFC2119 ].
- **2.1 Conformance Classes.** All implementations MUST support UTF-8 encoding.
- **2.1.1 Publishing Clients.** A conforming Micropub client that creates posts: MUST support sending x-www-form-urlencoded requests MUST support the [ h-entry ] vocabulary If the client creates posts by uploading file attachments, it MUST check for the presence of a Media Endpoint and if present, send the file there instead of to the Micropub endpoint SHOULD handle server error messages gracefully, presenting helpful messages…
- **2.1.2 Editing Clients.** A conforming Micropub client that edits posts: MUST support sending JSON-encoded requests MUST support the [ h-entry ] vocabulary
- **2.1.3 Servers.** A conforming Micropub server: MUST support both header and form parameter methods of authentication MUST support creating posts with the [ h-entry ] vocabulary MUST support creating posts using the x-www-form-urlencoded syntax SHOULD support updating and deleting posts Servers that support updating posts MUST support JSON syntax and the source content query Servers that do not specify a Media…
- **3.1 Overview.** When a response body is necessary, it SHOULD be returned as a [ JSON ] encoded object.
- **3.1.1 Form-Encoded and Multipart Requests.** Specifically, this means in order to send multiple values for a given property, you MUST append square brackets [] to the property name.
- **3.2 Reserved Properties.** The server MUST NOT store the access_token property in the post.
