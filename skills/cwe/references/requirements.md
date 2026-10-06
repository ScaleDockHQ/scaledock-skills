# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## CWE

Source: https://cwe.mitre.org/data/definitions/1000.html

This view is intended to facilitate research into weaknesses, including their inter-dependencies, and can be leveraged to systematically identify theoretical gaps within CWE. It is mainly organized according to abstractions of behaviors instead of how they can be detected, where they appear in code, or when they are introduced in the development life cycle. By design, this view is expected to include every weakness within CWE.

- **CWE VIEW: Research Concepts.** View ID: 1000 Vulnerability Mapping : PROHIBITED This CWE ID must not be used to map to real-world vulnerabilities Type: Graph Downloads: Booklet | CSV | XML Objective This view is intended to facilitate research into weaknesses, including their inter-dependencies, and can be leveraged to systematically identify theoretical gaps within CWE.
- **CWE VIEW: Research Concepts.** A chain is a set of weaknesses that must be reachable consecutively in order to produce an exploitable vulnerability.
- **CWE VIEW: Research Concepts.** While a composite is a set of weaknesses that must all be present simultaneously in order to produce an exploitable vulnerability.
- **CWE VIEW: Research Concepts.** This results in a conflict between the functional requirement that some addresses need to be writable by software during operation and the security requirement that the system configuration lock bit must be set during the boot process.
- **CWE VIEW: Research Concepts.** Least Privilege Violation - (272) 1000 (Research Concepts) > 284 (Improper Access Control) > 269 (Improper Privilege Management) > 271 (Privilege Dropping / Lowering Errors) > 272 (Least Privilege Violation) The elevated privilege level required to perform operations such as chroot() should be dropped immediately after the operation is performed.
- **CWE VIEW: Research Concepts.** Files or Directories Accessible to External Parties - (552) 1000 (Research Concepts) > 284 (Improper Access Control) > 285 (Improper Authorization) > 552 (Files or Directories Accessible to External Parties) The product makes files or directories accessible to unauthorized actors, even though they should not be.
- **CWE VIEW: Research Concepts.** Authorization Bypass Through User-Controlled SQL Primary Key - (566) 1000 (Research Concepts) > 284 (Improper Access Control) > 285 (Improper Authorization) > 863 (Incorrect Authorization) > 639 (Authorization Bypass Through User-Controlled Key) > 566 (Authorization Bypass Through User-Controlled SQL Primary Key) The product uses a database table that includes records that should not be…
- **CWE VIEW: Research Concepts.** Weak Password Requirements - (521) 1000 (Research Concepts) > 284 (Improper Access Control) > 287 (Improper Authentication) > 1390 (Weak Authentication) > 1391 (Use of Weak Credentials) > 521 (Weak Password Requirements) The product does not require that users should have strong passwords.
