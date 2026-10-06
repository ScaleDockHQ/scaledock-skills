# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Indexed Database API 2.0

Source: https://www.w3.org/TR/IndexedDB-2/

This document defines APIs for a database of records holding simple values and hierarchical objects. Each record consists of a key and some value. Moreover, the database maintains indexes over records it stores. An application developer directly uses an API to locate records either by their key or by using an index. A query language can be layered on this API. An indexed database can be implemented using a persistent B-tree data structure.

- **Document conventions.** The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119.
- **2.1.1. Database Connection.** If this occurs the user agent must run the steps to close a database connection with the connection and with the forced flag set.
- **2.2.1. Object Store Handle.** Multiple handles may be associated with the same object store in different transactions , but there must be only one object store handle associated with a particular object store within a transaction .
- **2.3. Values.** User agents must support any serializable object .
- **2.6.1. Index Handle.** Multiple handles may be associated with the same index in different transactions , but there must be only one index handle associated with a particular index within a transaction .
- **2.7.1. Transaction Lifetime.** The implementation must allow requests to be placed against the transaction whenever the active flag is set.
- **2.7.1. Transaction Lifetime.** Until the transaction is started the implementation must not execute these requests; however, the implementation must keep track of the requests and their order.
- **2.7.1. Transaction Lifetime.** If an attempt is made to place a request against a transaction when that transaction is not active , the implementation must reject the attempt by throwing a " TransactionInactiveError " DOMException .

## Indexed Database API

Source: https://www.w3.org/TR/IndexedDB/

This document defines APIs for a database of records holding simple values and hierarchical objects. Each record consists of a key and some value. Moreover, the database maintains indexes over records it stores. An application developer directly uses an API to locate records either by their key or by using an index. A query language can be layered on this API. An indexed database can be implemented using a persistent B-tree data structure.

- **Document conventions.** The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119.
- **2.1.1. Database connection.** If this occurs the user agent must run close a database connection with the connection and with the forced flag set to true.
- **2.2.1. Object store handle.** Multiple handles may be associated with the same object store in different transactions , but there must be only one object store handle associated with a particular object store within a transaction .
- **2.3. Values.** User agents must support any serializable object .
- **2.6.1. Index handle.** Multiple handles may be associated with the same index in different transactions , but there must be only one index handle associated with a particular index within a transaction .
- **2.7. Transactions.** " default " The user agent should use its default durability behavior for the storage bucket .
- **2.7.1. Transaction lifecycle.** When an implementation is able to enforce the constraints for the transaction’s scope and mode , defined below , the implementation must queue a database task to start the transaction asynchronously.
- **2.7.1. Transaction lifecycle.** Requests must be executed in the order in which they were made against the transaction.

## Indexed Database API 3.0

Source: https://www.w3.org/TR/IndexedDB-3/

This document defines APIs for a database of records holding simple values and hierarchical objects. Each record consists of a key and some value. Moreover, the database maintains indexes over records it stores. An application developer directly uses an API to locate records either by their key or by using an index. A query language can be layered on this API. An indexed database can be implemented using a persistent B-tree data structure.

- **Document conventions.** The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119.
- **2.1.1. Database connection.** If this occurs the user agent must run close a database connection with the connection and with the forced flag set to true.
- **2.2.1. Object store handle.** Multiple handles may be associated with the same object store in different transactions , but there must be only one object store handle associated with a particular object store within a transaction .
- **2.3. Values.** User agents must support any serializable object .
- **2.6.1. Index handle.** Multiple handles may be associated with the same index in different transactions , but there must be only one index handle associated with a particular index within a transaction .
- **2.7. Transactions.** " default " The user agent should use its default durability behavior for the storage bucket .
- **2.7.1. Transaction lifecycle.** When an implementation is able to enforce the constraints for the transaction’s scope and mode , defined below , the implementation must queue a database task to start the transaction asynchronously.
- **2.7.1. Transaction lifecycle.** Requests must be executed in the order in which they were made against the transaction.
