# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published text, quoted as written (only line breaks and hyphenation from PDF layout were joined). Apply the ones that match the role. Each is labelled with the nearest section, clause or article in the published document.

## Asset Links Specification

Source: https://raw.githubusercontent.com/google/digitalassetlinks/d893749ee3c84b31f72b552a7ed333789c3235d3/well-known/details.md

- **AssetDescriptor.** We only support describing an entire domain at once. Note that only fully qualified domain names are permitted in the URL.
- **AssetDescriptor.** The `sha256_cert_fingerprints` field is a list of colon-separated hex strings.
- **AssetDescriptor.** Note that the list is syntactic sugar: since only one certificate is required to identify an android app, an asset descriptor with two fingerprints is equivalent to two asset descriptors with one fingerprint each.
- **Relation.** How to determine reliability: A statement of this kind is reliable if it's made by the owner of the asset doing the delegating.
- **Relation.** The detail field is a lowercase alphanumeric string with underscores and periods allowed (matching the regular expression `[a-z0-9_.]+`), but otherwise unstructured.
- **Statement.** If the source asset's delivery mechanism is secure (e.g., HTTPS or signed Android APKs), the include file must be served over SSL. Include files are only processed if the HTTP status code is 200; otherwise the content of that include file is discarded. Specifically, HTTP 30x redirects will not be followed.
- **Statement List.** A Statement List is a JSON array with any number of statements.
- **Determining the Set of Reliable Statements.** The validity period of each statement is generally determined by the TTL of the underlying data, though a particular implementation may also impose a lower and upper bound.
- **Website.** A website asset is characterized by (scheme, domain, and port). All paths and query strings are assumed to be a part of the same website.
- **Website.** The file should be served with the media type `application/json`. Any response besides HTTP 200 is treated as an error, and will result in an empty statements list.
- **Android app.** An Android app is characterized by (package name, signing cert).

## Creating a Statement List

Source: https://developers.google.com/digital-asset-links/v1/create-statement

- **Overview.** A statement list contains one or more statements, and a principal can have only one statement list.
- **Website statement lists.** For HTTPS, any connection without a certificate chain that can be verified with the trusted root list will also result in an empty statement list.
- **Website statement lists.** The assetlinks.json file must be served as Content-Type: application/json in the HTTP headers, and it cannot be a redirect (that is, 301 or 302 response codes are not followed).
- **Matching a target.** When you consume a statement, you must match the target in a statement against some entity in reality.
- **Matching a target, website targets.** For a website, the site scheme, host, and port must match exactly.
- **Matching a target, app targets.** For an app, the certificate hash and package name of the target must exactly match the application.

## Statement List Syntax

Source: https://developers.google.com/digital-asset-links/v1/statements

- **Website target, site.** A website target can only be a root domain; you cannot limit to a specific subdirectory; all directories under this root will match.
- **Website target, site.** Subdomains should not be considered to match: that is, if the statement file is hosted on www.example.com, then www.puppies.example.com should not be considered a match.
- **Android app target, sha256_cert_fingerprints.** The uppercase SHA265 fingerprint of the certificate for the app that this statement applies to.
- **Scaling to dozens of statements or more.** A maximum of 10 include statements are allowed in a complete statement list tree.
