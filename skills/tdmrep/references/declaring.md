# Declaring and applying TDM reservations

Read this when publishing a reservation or building a TDM agent that applies one. Section names refer to the TDMRep Final Community Group Report of 10 May 2024.

## The two properties

| Property          | Values        | Meaning                                                                                                                                        |
| ----------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `tdm-reservation` | `1`           | TDM rights are reserved. If a policy is set, agents MAY use it to learn how to acquire authorization.                                          |
| `tdm-reservation` | `0`           | TDM rights are not reserved; agents can mine without contacting the rightsholder.                                                              |
| `tdm-reservation` | anything else | Protocol error; agents MUST treat the value as unset.                                                                                          |
| `tdm-policy`      | URL           | A TDM Policy. `text/html` is human-readable; `application/json` or `application/ld+json` is machine-readable. Ignored when reservation is `0`. |

## Techniques

### Well-known file

`/.well-known/tdmrep.json` holds site-wide choices. A valid GET MUST return the representation or redirects leading to it; otherwise the server does not implement the protocol (TDM File on the Origin Server).

```json
[
  { "location": "/directory-a/", "tdm-reservation": 1 },
  {
    "location": "/directory-b/html/",
    "tdm-reservation": 1,
    "tdm-policy": "https://provider.com/policies/policy.json"
  },
  { "location": "/directory-b/images/*.jpg", "tdm-reservation": 0 }
]
```

Matching rules (TDM File on the Origin Server; Use of regular expressions):

- Match the path patterns against the URL, case-sensitively (SHOULD).
- The most specific match MUST be used, and the spec defines it as "the first in sequence": order rules from specific to general.
- No match: `tdm-reservation` is unset.
- Decode percent-encoded unreserved US-ASCII characters before comparing; a rule matches when its end is reached before the octets differ.
- `*` matches zero or more characters and `$` anchors the end, as in robots.txt; match a literal `$` as `%24`.

### HTTP response headers

The report calls this "currently the preferred technique" (TDM Header Field in HTTP Responses).

```http
HTTP/1.1 200 OK
Content-Type: text/html
tdm-reservation: 1
tdm-policy: https://provider.com/policies/policy.json
```

### HTML meta

```html
<meta name="tdm-reservation" content="1" />
<meta name="tdm-policy" content="https://provider.com/policies/policy.json" />
```

### EPUB

EPUB 2 uses `<meta name="tdm:reservation" content="1" />` and `<meta name="tdm:policy" content="..." />` in the package metadata. EPUB 3 declares `prefix="tdm: http://www.w3.org/ns/tdmrep#"` on `<package>` and uses `<meta property="tdm:reservation">1</meta>` and `<meta property="tdm:policy">...</meta>`. Both cover every resource in the package (TDM Metadata in EPUB 2 files; EPUB 3 files).

### PDF

XMP elements `tdm:reservation` and `tdm:policy` in the namespace `http://www.w3.org/ns/tdmrep/` cover every page. A PDF/A validator raises errors on these properties (TDM Metadata in PDF files).

## Processing priority

From Processing priority:

1. Publishers SHOULD use only one technique.
2. An agent MUST check `/.well-known/tdmrep.json` before it starts scraping a server, and keeps it cached.
3. An agent MUST check headers on every response; header values supersede the file.
4. An agent MUST check HTML meta in every HTML file; those values supersede earlier ones.
5. An agent MUST check EPUB and PDF metadata in every such file; those values supersede earlier ones.
6. The absence of a property at any step MUST NOT reset the current value.

## Agent outcome table

| Resolved value | Agent behaviour                                                                                                     |
| -------------- | ------------------------------------------------------------------------------------------------------------------- |
| `1`, policy    | Reserved. Read the policy (if machine-readable) to learn how to obtain a license.                                   |
| `1`, no policy | Reserved, with no published way to acquire a license.                                                               |
| `0`            | Not reserved under TDMRep. Other signals (robots.txt, licenses, law outside the EU) still apply.                    |
| unset          | No TDMRep statement. Outside the EU, the report says the absence of a reservation is not an implicit authorization. |

## Legal context

- CDSM Article 3 is a mandatory exception for research organisations and cultural heritage institutions; Article 4 is the general exception, which applies only if the rightsholder has not expressly reserved TDM "in an appropriate manner, such as machine-readable means" (Introduction; Directive (EU) 2019/790 Art. 3, Art. 4).
- Under EU AI Act Article 53(1)(c), providers of general-purpose AI models must have a copyright policy that identifies and complies with Article 4(3) reservations, "including through state-of-the-art technologies" (AI Act Article 53).
- TDMRep expresses a reservation; it does not prevent retrieval. Use robots.txt or access control to stop fetching.
