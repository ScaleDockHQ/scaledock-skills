# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published RFC text, quoted as written (only line breaks and page breaks from the plain-text layout were joined). Apply the ones that match the role. Each is labelled with the RFC and section it comes from.

## RFC 9535 JSONPath: Query Expressions for JSON

Source: https://www.rfc-editor.org/rfc/rfc9535.html

- **RFC 9535 § 2.1.** A query MUST be encoded using UTF-8.
- **RFC 9535 § 2.1.** Integer numbers in the JSONPath query that are relevant to the JSONPath processing (e.g., index values and steps) MUST be within the range of exact integer values defined in Internet JSON (I-JSON) (see Section 2.2 of [RFC7493]), namely within the interval [-(2^53)+1, (2^53)-1].
- **RFC 9535 § 2.1.** Uses of function extensions MUST be _well-typed_, as described in Section 2.4.3.
- **RFC 9535 § 2.1.** A JSONPath implementation MUST raise an error for any query that is not well-formed and valid.
- **RFC 9535 § 2.1.** Specifically, if a valid JSONPath query is evaluated against a structured value whose size is too large to process the query correctly (for instance, requiring the processing of numbers that fall outside the range of exact values), the implementation MUST provide an indication of overflow.
- **RFC 9535 § 2.1.2.** This document may describe semantics in a procedural step-by-step fashion; however, such descriptions are normative only in the sense that any implementation MUST produce an identical result but not in the sense that implementers are required to use the same algorithms.
- **RFC 9535 § 2.1.2.** A syntactically valid segment MUST NOT produce errors when executing the query.
- **RFC 9535 § 2.2.1.** Every JSONPath query (except those inside filter expressions; see Section 2.3.5) MUST begin with the root identifier $.
- **RFC 9535 § 2.3.1.2.** A name-selector string MUST be converted to a member name M by removing the surrounding quotes and replacing each escape sequence with its equivalent Unicode character, as shown in Table 4:
- **RFC 9535 § 2.3.1.2.** Two strings MUST be considered equal if and only if they are identical sequences of Unicode scalar values.
- **RFC 9535 § 2.3.1.2.** In other words, normalization operations MUST NOT be applied to either the member name string M from the JSONPath or the member name strings in the JSON prior to comparison.
- **RFC 9535 § 2.3.3.1.** To be valid, the index selector value MUST be in the I-JSON range of exact values (see Section 2.1).
- **RFC 9535 § 2.3.5.2.2.** - numbers expected to interoperate, as per Section 2.2 of I-JSON [RFC7493], MUST compare using the normal mathematical ordering; numbers not expected to interoperate, as per I-JSON, MAY compare using an implementation-specific ordering,
- **RFC 9535 § 2.4.** A function extension MUST be defined such that its evaluation is free of side effects, i.e., all possible orders of evaluation and choices of short-circuiting or full evaluation of an expression containing it MUST lead to the same result.
- **RFC 9535 § 2.4.** Any function expressions in a query must be well-formed (by conforming to the above ABNF) and well-typed; otherwise, the JSONPath implementation MUST raise an error (see Section 2.1).
