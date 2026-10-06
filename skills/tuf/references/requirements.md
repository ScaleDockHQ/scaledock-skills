# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## TUF specification

Source: https://theupdateframework.github.io/specification/latest/

https://groups.google.com/forum/?fromgroups#!forum/theupdateframework with subject line “ [TUF] … message topic … ”

- **1.1. Scope.** The keywords "MUST," "MUST NOT," "REQUIRED," "SHALL," "SHALL NOT," "SHOULD," "SHOULD NOT," "RECOMMENDED," "MAY," and "OPTIONAL" in this document are to be interpreted as described in RFC 2119 .
- **2.1.1. Root role.** The client-side of the framework MUST ship with trusted root keys for each configured repository.
- **2.1.1. Root role.** The root role’s private keys MUST be kept very secure and thus should be kept offline.
- **3.1.1. Target files.** If an application using the framework does not follow these recommendations, but wishes to support self-contained consistent snapshots the application MUST ensure that target files are persisted in a way where each target file can be uniquely and consistently addressed.
- **4.2.1. Object format.** The keyid MUST be unique in the "signatures" array: multiple signatures with the same keyid are not allowed.
- **4.2.1. Object format.** Note: The "signatures" list SHOULD only contain one SIGNATURE per KEYID .
- **4.2.2. Key objects.** Conversely, implementations SHOULD NOT implement the KEYTYPE s and SCHEME s that are defined in a different manner than specified, so as to avoid confusion across implementations.
- **4.2.2. Key objects.** All RSA keys MUST be at least 2048 bits.
