# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Open Banking UK 4.0

Source: https://openbankinguk.github.io/read-write-api-site3/v4.0/profiles/read-write-data-api-profile.html

icon_search Search Get Started Get Started Here are some of the underlying principles, assets and resources to give you a headstart working with the Standard. Find out more ico_chevron

- **# Pagination.** In such a situation, the ASPSP MUST : If a subsequent page of resource records exists, the ASPSP must provide a link to the next page of resources in the Links.Next field of the response.
- **# Pagination.** For a paginated responses, the ASPSP SHOULD ensure that the number of records on a page are within reasonable limits, a minimum of 25 records (except on the last page where there are no further records) and a maximum of 1000 records.
- **# Pagination.** As with all other responses, the ASPSP MUST include a "self" link to the resource in the Links.Self field as described in the Links sections.
- **# Token Expiry Time.** Its value MUST be a number containing a NumericDate value, as specified in https://tools.ietf.org/html/rfc7519#section-2 NumericDate is a JSON numeric value representing the number of seconds from 1970-01-01T00:00:00Z UTC until the specified UTC date-time, ignoring leap seconds.
- **# Overview.** This profile should be used in conjunction with compatible functional profiles (such as Accounts and Transactions or Payments) and compatible resources.
- **# Unique Identifiers (Id Fields).** A REST resource should have a unique identifier (e.g.
- **# Unique Identifiers (Id Fields).** An ASPSP that chooses to populate optional Id fields must ensure that the values are unique and immutable.
- **# Categorisation of Implementation Requirements.** ASPSPs must make documentation available to TPPs (e.g.
