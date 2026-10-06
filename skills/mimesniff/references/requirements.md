# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## MIME Sniffing Living Standard

Source: https://mimesniff.spec.whatwg.org/review-drafts/2026-07/

The MIME Sniffing standard defines sniffing resources.

- **2. Conformance requirements.** The keywords "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in RFC 2119.
- **MIME Sniffing.** Developers should refer to the Living Standard for the most current error corrections and other developments.
- **5. Handling a resource.** For each resource it handles, the user agent must keep track of the following associated metadata: A supplied MIME type , the MIME type determined by the supplied MIME type detection algorithm .
- **5.1. Interpreting the resource metadata.** To determine the supplied MIME type of a resource , user agents must use the following supplied MIME type detection algorithm : Let supplied-type be null.
- **7. Determining the computed MIME type of a resource.** To determine the computed MIME type of a resource , user agents must use the following MIME type sniffing algorithm : If the supplied MIME type is an XML MIME type or HTML MIME type , the computed MIME type is the supplied MIME type .
- **7.1. Identifying a resource with an unknown MIME type.** If the setting of the sniff-scriptable flag is not specified when calling the rules for identifying an unknown MIME type , the sniff-scriptable flag must default to unset.
- **7.1. Identifying a resource with an unknown MIME type.** However, user agents should not implicitly extend this table to include additional byte patterns for any computed MIME type already present in this table, as doing so could introduce privilege escalation vulnerabilities.
- **7.1. Identifying a resource with an unknown MIME type.** User agents must not introduce any privilege escalation vulnerabilities when extending this table.
