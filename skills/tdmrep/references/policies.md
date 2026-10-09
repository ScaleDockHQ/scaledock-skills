# TDM Policies

Read this when writing or reading the document a `tdm-policy` URL points to. Section names refer to "Expressing a TDM Policy" in the TDMRep Final Community Group Report of 10 May 2024. The format is a profile of ODRL 2.2 serialized as JSON-LD.

## Required shape

| Property     | Rule                                                                                             |
| ------------ | ------------------------------------------------------------------------------------------------ |
| `@context`   | MUST be the array `["http://www.w3.org/ns/odrl.jsonld", "http://www.w3.org/ns/tdmrep.jsonld"]`.  |
| `uid`        | MUST be present, a URI; it need not dereference (for example `https://provider.com/policies/1`). |
| `@type`      | MUST be `Offer`.                                                                                 |
| `profile`    | MUST be `http://www.w3.org/ns/tdmrep` (an identifier, not dereferenceable).                      |
| `assigner`   | MUST be exactly one, using only the listed vCard properties.                                     |
| `permission` | MUST be one array of permissions. A policy SHOULD NOT contain `obligation` or `prohibition`.     |

## Assigner

Allowed vCard properties: `vcard:fn` (full name), `vcard:nickname` (acronym), `vcard:hasEmail` (`mailto:` URI), `vcard:hasAddress` (object with `vcard:street-address`, `vcard:postal-code`, `vcard:locality`, `vcard:country-name`), `vcard:hasTelephone` (`tel:` URI) and `vcard:hasURL` (a page about TDM licensing).

## Permissions

- `action` is mandatory and MUST be `tdm:mine` (`http://www.w3.org/ns/tdmrep#mine`, included in ODRL `use`): analyse text and data by automated techniques to generate information such as patterns, trends and correlations.
- `target` MAY identify the collection the permission applies to; it need not dereference, and an HTTP error on it is not a processing error.
- A duty `{"action": "obtainConsent"}` expresses that the actor must obtain consent first.
- A duty `{"action": "compensate"}` expresses that mining must be paid for.
- A constraint `{"leftOperand": "purpose", "operator": "eq", "rightOperand": "tdm:research"}` (or `tdm:non-research`) limits the purpose. Both values are marked experimental and may be replaced.

## Example

```json
{
  "@context": [
    "http://www.w3.org/ns/odrl.jsonld",
    "http://www.w3.org/ns/tdmrep.jsonld"
  ],
  "@type": "Offer",
  "profile": "http://www.w3.org/ns/tdmrep",
  "uid": "https://provider.com/policies/1",
  "assigner": {
    "uid": "https://provider.com",
    "vcard:fn": "Provider",
    "vcard:hasEmail": "mailto:contact@provider.com",
    "vcard:hasURL": "https://provider.com/tdm/licensing.html"
  },
  "permission": [
    {
      "action": "tdm:mine",
      "duty": [{ "action": "obtainConsent" }]
    }
  ]
}
```

The report notes that actors benefiting from CDSM Article 3 do not have to comply with a consent duty like this one (Full Examples).

## Reading a policy

- Serve and accept `application/json` or `application/ld+json` for machine-readable policies; `text/html` is human-readable only (tdm-policy).
- If the policy cannot be fetched or parsed, it is not a protocol error: the agent has no way to know the conditions at this time and keeps the reservation (tdm-policy).
- Ignore a policy when `tdm-reservation` is `0` (tdm-policy).
