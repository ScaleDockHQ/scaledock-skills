# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## oEmbed

Source: https://oembed.com/

oEmbed is a format for allowing an embedded representation of a URL on third party sites. The simple API allows a website to display embedded content (such as photos or videos) when a user posts a link to that resource, without having to parse the resource directly.

- **2.1. Configuration.** Providers must specify one or more URL scheme and API endpoint pairs.
- **2.1. Configuration.** Some examples: http://www.flickr.com/photos/* OK http://www.flickr.com/photos/*/foo/ OK http://_.flickr.com/photos/_ OK http://_.com/photos/_ NOT OK _://www.flickr.com/photos/_ NOT OK The API endpoint must point to a URL with either HTTP or HTTPS scheme which implements the API described below.
- **2.2. Consumer Request.** Requests sent to the API endpoint must be HTTP GET requests, with all arguments sent as query parameters.
- **2.2. Consumer Request.** All arguments must be urlencoded (as per RFC 1738).
- **2.2. Consumer Request.** For supported resource types, this parameter must be respected by providers.
- **2.2. Consumer Request.** When specified, the provider must return data in the request format, else return an error (see below for error codes).
- **2.2. Consumer Request.** Providers should ignore all other arguments it doesn't expect.
- **2.2. Consumer Request.** When a provider publishes a URL scheme and API endpoint pair, they should clearly state whether the format is implicit in the endpoint or if it needs to be passed as an argument.
