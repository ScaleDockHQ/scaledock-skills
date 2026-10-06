# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## RFC 3986 Uniform Resource Identifier (URI): Generic Syntax

Source: https://www.rfc-editor.org/rfc/rfc3986.html

- **document.** These terms should not be mistaken as an assumption that an identifier defines or embodies the identity of what is referenced, though that may be the case for some identifiers.
- **document.** Nor should it be assumed that a system using URIs will access the resource identified: in many cases, URIs are used to denote resources without any intention that they be accessed.
- **document.** However, an action made on the basis of that reference will take place in relation to the end-user's context, which implies that an action intended to refer to a globally unique thing must use a URI that distinguishes that resource from all other things.
- **document.** URIs that identify in relation to the end-user's local context should only be used when the context itself is a defining aspect of the resource,
- **document.** Future specifications and related documentation should use the general term "URI" rather than the more restrictive terms
- **document.** o A URI might be transcribed from a non-network source and thus should consist of characters that are most likely able to be entered into a computer, within the constraints imposed by keyboards (and related input devices) across languages and locales.
- **document.** Such a definition should specify the character encoding used to map those characters to octets prior to being percent-encoded for the URI.
- **document.** As relative references can only be used within the context of a hierarchical URI, designers of new URI schemes should use a syntax consistent with the generic syntax's hierarchical components unless there are compelling reasons to forbid relative referencing within that scheme.

## RFC 3987 Internationalized Resource Identifiers (IRIs)

Source: https://www.rfc-editor.org/rfc/rfc3987.html

- **document.** In this document, the key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" are to be interpreted as described in [ RFC2119 ].
- **document.** Duerst & Suignard Standards Track [Page 6] RFC 3987 Internationalized Resource Identifiers January 2005 Characters outside the US-ASCII repertoire are not reserved and therefore MUST NOT be used for syntactical purposes, such as to delimit components in newly defined schemes.
- **document.** Applications MUST map IRIs to URIs by using the following two steps.
- **document.** To reduce variability, the hexadecimal notation SHOULD use uppercase letters.
- **document.** This conversion SHOULD be used when the goal is to maximize interoperability with legacy URI resolvers.
- **document.** If these characters are found but are not converted, then the conversion SHOULD fail.
- **document.** Please note that the number sign ("#"), the percent sign ("%"), and the square bracket characters ("[", "]") are not part of the above list and MUST NOT be converted.
- **document.** Conversions from URIs to IRIs MUST NOT use any character encoding

## RFC 8141 Uniform Resource Names (URNs)

Source: https://www.rfc-editor.org/rfc/rfc8141.html

- **document.** The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [ RFC2119 ].
- **document.** Other than inside those components, a "?" that is not immediately followed by "=" or "+" is not defined for URNs and SHOULD be treated as a syntax error by URN-specific parsers and other processors.
- **document.** Software that is not aware of namespace-specific canonicalization and encoding rules MUST NOT construct URNs from the name in the non-URN identifier system.
- **document.** In particular, with regard to characters outside the ASCII range, URNs that appear in protocols or that are passed between systems MUST use only Unicode characters encoded in UTF-8 and further encoded as required by RFC 3986 .
- **document.** To the extent feasible and consistent with the requirements of names defined and standardized elsewhere, as well as the principles discussed in Section 1.2 , the characters used to represent names SHOULD be restricted to either ASCII letters and digits or to the characters and syntax of some widely used models
- **document.** Saint-Andre & Klensin Standards Track [Page 11] RFC 8141 URNs April 2017 In order to make URNs as stable and persistent as possible when protocols evolve and the environment around them changes, URN namespaces SHOULD NOT allow characters outside the ASCII range [ RFC20 ] unless the nature of the particular URN namespace makes such characters necessary.
- **document.** Note that characters outside the ASCII range [ RFC20 ] MUST be percent-encoded using the method defined in Section 2.1 of the generic URI specification [ RFC3986 ].
- **document.** As described in Section 3 , the r-component SHALL NOT be taken into account when determining URN-equivalence.

## RFC 6570 URI Template

Source: https://www.rfc-editor.org/rfc/rfc6570.html

- **document.** Notational Conventions The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [ RFC2119 ].
- **document.** It is only during the process of template expansion that a string of characters in a URI Template is REQUIRED to be processed as a sequence of Unicode code points.
- **document.** If a value is provided by a user, such as via a data-entry dialog, then the string SHOULD be normalized as Normalization Form C (NFC: Canonical Decomposition, followed by Canonical Composition) prior to being used in expansions by a
- **document.** Likewise, when non-ASCII data that represents readable strings is pct-encoded for use in a URI reference, a template processor MUST first encode the string as UTF-8 [ RFC3629 ] and then pct-encode any octets that are not allowed in a URI reference.
- **document.** Each variable's value MUST be formed prior to template expansion.
- **document.** If a template processor encounters a character sequence outside an expression that does not match the <URI-Template> grammar, then processing of the template SHOULD cease, the URI reference result SHOULD contain the expanded part of the template followed by the remainder unexpanded, and the location and type of error SHOULD be indicated to the invoking application.
- **document.** If an error is encountered in an expression, such as an operator or value modifier that the template processor does not recognize or does not yet support, or a character is found that is not allowed by the <expression> grammar, then the unprocessed parts of the expression SHOULD be copied to the result unexpanded, processing of the remainder of the template SHOULD continue, and the location and…
- **document.** Note that the percent character ("%") is only allowed as part of a pct-encoded triplet and only for reserved/fragment expansion: in all other cases, a value character of "%" MUST be pct-
