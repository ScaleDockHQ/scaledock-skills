# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published text, quoted as written (only line breaks and hyphenation from PDF layout were joined). Apply the ones that match the role. Each is labelled with the nearest section, clause or article in the published document.

## IndexNow documentation

Source: https://www.indexnow.org/documentation

- **Submitting One URL.** URL must be URL-escaped and encoded and please make sure that your URLs follow the RFC-3986 standard for URIs.
- **Submitting One URL.** Your-key should have a minimum of 8 and a maximum of 128 hexadecimal characters. The key can contain only the following characters: lowercase characters (a-z), uppercase characters (A-Z), numbers (0-9), and dashes (-).
- **Submitting One URL.** A successful request will return an HTTP 200 response code; if you receive a different response, verify that you don't submit too often, that the key and URL are valid and resubmit the request. The HTTP 200 response code only indicates that the search engine has received your URL.
- **Submitting set of URLs.** To submit a set of URLs using an HTTP request issue your POST JSON request to the URL provided by Search Engines.
- **Submitting set of URLs.** You can submit up to 10,000 URLs per post, mixing http and https URLs if needed.
- **Submitting set of URLs.** The recommended way is to automate submission of URLs as soon as the content is added, updated, or deleted up to some limit
- **Verifying ownership via the key.** To submit URLs, you must "prove" ownership of the host for which URLs are being submitted by hosting at least one text file within the host.
- **Verifying ownership via the key.** Once you submit your URLs to search engines, search engines will crawl the key file to verify ownership and use the key until you change the key. Only you and the search engines should know the key and your file key location.
- **Verifying ownership via the key, Option 1.** You must host a UTF-8 encoded text key file {your-key}.txt listing the key in the file at the root directory of your website.
- **Verifying ownership via the key, Option 2.** You can also host one to many UTF-8 encoded text key files in other locations within the same host and you must tell search engines the location of this text key file in each IndexNow notification by specifying the location using the keyLocation variable.
- **Verifying ownership via the key, Option 2.** In this option 2, the location of a key file determines the set of URLs that can be included with this key.
- **Verifying ownership via the key, Option 2.** URLs that are not considered valid in option 2 may not be considered for indexing. It is strongly recommended that you use Option 1 and place your file key at the root directory of your web server.
- **Response format, 202 Accepted.** URL received. IndexNow key validation pending.
- **Response format, 403 Forbidden.** In case of key not valid (e.g. key not found, file found but key not in the file)
- **Response format, 422 Unprocessable Entity.** In case of URLs which don't belong to the host or the key is not matching the schema in the protocol
- **Requirement for search engines.** Search engines adopting the IndexNow protocol agree that submitted URLs will be automatically shared with all other participating search engines.
