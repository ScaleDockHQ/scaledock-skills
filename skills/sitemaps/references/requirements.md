# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the protocol's rules from the published text, quoted as written (only line breaks were joined; XML tag names are shown as code). Apply the ones that match the role. Each is labelled with the section it comes from in the published document. The protocol page has no section numbers, so each quote is labelled with its heading.

## Sitemaps XML format

Source: https://www.sitemaps.org/protocol.html

- **Sitemaps XML format.** All data values in a Sitemap must be entity-escaped.
- **Sitemaps XML format.** The file itself must be UTF-8 encoded.
- **Sitemaps XML format.** The Sitemap must: Begin with an opening `<urlset>` tag and end with a closing `</urlset>` tag.
- **Sitemaps XML format.** Specify the namespace (protocol standard) within the `<urlset>` tag.
- **Sitemaps XML format.** Include a `<url>` entry for each URL, as a parent XML tag.
- **Sitemaps XML format.** Include a `<loc>` child entry for each `<url>` parent tag.
- **Sitemaps XML format.** Also, all URLs in a Sitemap must be from a single host, such as www.example.com or store.example.com.
- **XML tag definitions, loc.** This URL must begin with the protocol (such as http) and end with a trailing slash, if your web server requires it.
- **XML tag definitions, loc.** This value must be less than 2,048 characters.
- **XML tag definitions, lastmod.** This date should be in W3C Datetime format.
- **XML tag definitions, lastmod.** Note that the date must be set to the date the linked page was last modified, not when the sitemap is generated.
- **XML tag definitions, priority.** Valid values range from 0.0 to 1.0.
- **Entity escaping.** As with all XML files, any data values (including URLs) must use entity escape codes for the characters listed in the table below.
- **Entity escaping.** In addition, all URLs (including the URL of your Sitemap) must be URL-escaped and encoded for readability by the web server on which they are located.
- **Using Sitemap index files.** You can provide multiple Sitemap files, but each Sitemap file that you provide must have no more than 50,000 URLs and must be no larger than 50MB (52,428,800 bytes).
- **Using Sitemap index files.** If you would like, you may compress your Sitemap files using gzip to reduce your bandwidth requirement; however the sitemap file once uncompressed must be no larger than 50MB.
- **Using Sitemap index files.** Sitemap index files may not list more than 50,000 Sitemaps and must be no larger than 50MB (52,428,800 bytes) and can be compressed.
- **Using Sitemap index files.** Note: A Sitemap index file can only specify Sitemaps that are found on the same site as the Sitemap index file.
- **Text file.** The text file must have one URL per line.
- **Text file.** You must fully specify URLs, including the http.
- **Sitemap file location.** Note that this means that all URLs listed in the Sitemap must use the same protocol (http, in this example) and reside on the same host as the Sitemap.
- **Sitemap file location.** If you submit a Sitemap using a path with a port number, you must include that port number as part of the path in each URL listed in the Sitemap file.
- **Specifying the Sitemap location in your robots.txt file.** This directive is independent of the user-agent line, so it doesn't matter where you place it in your file.
