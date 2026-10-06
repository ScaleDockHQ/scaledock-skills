# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## IndexNow

Source: https://www.indexnow.org/documentation

To submit a URL using an HTTP request (replace with the URL provided by the search engine), issue your request to the following URL:

- **document.** URL must be URL-escaped and encoded and please make sure that your URLs follow the RFC-3986 standard for URIs.
- **document.** Your-key should have a minimum of 8 and a maximum of 128 hexadecimal characters.
- **document.** A successful request will return an HTTP 200 response code; if you receive a different response, you should verify your request and if everything looks fine, resubmit your request.
- **document.** Verifying ownership via the key To submit URLs, you must "prove" ownership of the host for which URLs are being submitted by hosting at least one text file within the host.
- **document.** Only you and the search engines should know the key and your file key location.
- **document.** You must host a UTF-8 encoded text key file {your-key}.txt listing the key in the file at the root directory of your website.
- **document.** For instance for the previous examples, you will need to host your UTF-8 key file at https://www.example.com/ .txt and this file must contain the key Option 2 Hosting a text key file within your host.
- **document.** You can also host one to many UTF-8 encoded text key files in other locations within the same host and you must tell search engines the location of this text key file in each IndexNow notification by specifying the location using the keyLocation variable.
