# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## RFC 8620 The JSON Meta Application Protocol (JMAP)

Source: https://www.rfc-editor.org/rfc/rfc8620.html

- **document.** Notational Conventions The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **document.** The client MUST NOT send this property when creating a new object of this type.
- **document.** o "immutable" -- The value MUST NOT change after the object is created.
- **document.** Where "Id" is given as a data type, it means a "String" of at least 1 and a maximum of 255 octets in size, and it MUST only contain characters from the "URL and Filename Safe" base64 alphabet, as defined in Section 5 of [RFC4648] , excluding the pad character ("=").
- **document.** For maximum safety, servers SHOULD also follow defensive allocation strategies to avoid creating risks where glob completion or data type detection may be present (e.g., on filesystems or in spreadsheets).
- **document.** Where "UnsignedInt" is given as a data type, it means an "Int" where the value MUST be in the range 0 <= value <= 2^53-1.
- **document.** To ensure a normalised form, the "time-secfrac" MUST always be omitted if zero, and any letters in the string (e.g., "T" and "Z") MUST be uppercase.
- **document.** Where "UTCDate" is given as a type, it means a "Date" where the "time-offset" component MUST be "Z" (i.e., it must be in UTC time).

## RFC 8621 The JSON Meta Application Protocol (JMAP) for Mail

Source: https://www.rfc-editor.org/rfc/rfc8621.html

- **document.** Notational Conventions The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **document.** Servers MUST support all properties specified for the new data types defined in this document.
- **document.** The value of this property in an account's "accountCapabilities" property is an object that MUST contain the following information on server capabilities and permissions for that account: o maxMailboxesPerEmail: "UnsignedInt|null" The maximum number of Mailboxes (see Section 2 ) that can be can assigned to a single Email object (see Section 4 ).
- **document.** This MUST be an integer >= 1, or null for no limit (or rather, the limit is always the number of Mailboxes in the account).
- **document.** This MUST be at least 100, although it is recommended servers allow more.
- **document.** Clients MUST ignore any unknown properties in the list.
- **document.** A JMAP implementation that talks to a submission server [ RFC6409 ] SHOULD have a configuration setting that allows an administrator to modify the set of submission EHLO capabilities it may expose on this property.
- **document.** Data Type Support in Different Accounts The server MUST include the appropriate capability strings as keys in the "accountCapabilities" property of any account with which the user may use the data types represented by that URI.
