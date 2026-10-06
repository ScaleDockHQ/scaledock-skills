# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Sitemaps 0.9

Source: https://www.sitemaps.org/protocol.html

The Sitemap protocol format consists of XML tags. All data values in a Sitemap must

- **document.** All data values in a Sitemap must be entity-escaped .
- **document.** The Sitemap must: Begin with an opening < urlset > tag and end with a closing </urlset> tag.
- **document.** Also, all URLs in a Sitemap must be from a single host, such as www.example.com or store.example.com.
- **document.** This URL must begin with the protocol (such as http) and end with a trailing slash, if your web server requires it.
- **document.** This value must be less than 2,048 characters.
- **document.** This date should be in W3C Datetime format.
- **document.** Note that the date must be set to the date the linked page was last modified, not when the sitemap is generated.
- **document.** Valid values are: always hourly daily weekly monthly yearly never The value "always" should be used to describe documents that change each time they are accessed.
