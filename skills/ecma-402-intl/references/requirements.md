# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## ECMA-402 2026

Source: https://tc39.es/ecma402/2026/

- 6 Identification of Locales, Currencies, Time Zones, Measurement Units, Numbering Systems, Collations, and Calendars 6.1 Case Sensitivity and Case Mapping

* **Software License.** SEE THE ECMA CODE OF CONDUCT IN PATENT MATTERS AVAILABLE AT https://ecma-international.org/memento/codeofconduct.htm FOR INFORMATION REGARDING THE LICENSING OF PATENT CLAIMS THAT ARE REQUIRED TO IMPLEMENT ECMA INTERNATIONAL STANDARDS.
* **Software License.** IN NO EVENT SHALL ECMA INTERNATIONAL BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)…
* **2 Conformance.** A conforming implementation of this specification must conform to ECMA-262 , and must provide and support all the objects, properties, functions, and program semantics described in this specification.
* **2 Conformance.** Nothing in this specification is intended to allow behaviour that is otherwise prohibited by ECMA-262 , and any such conflict should be considered an editorial error rather than an override of constraints from ECMA-262 .
* **4.3 API Conventions.** Every Intl constructor should behave as if defined by a class, throwing a TypeError exception when called as a function (without NewTarget).
* **4.4 Implementation Dependencies.** In browser implementations the initial set of locales, currencies, calendars, numbering systems, and other enumerable items visible to a particular origin must be the same for all users sharing the same user agent string (engine and platform version).
* **4.4 Implementation Dependencies.** Furthermore, dynamic changes to these sets must not result in users becoming distinguishable from each other.
* **4.4 Implementation Dependencies.** As a result of this constraint, the first time a browser implementation that allows on-demand locale installation receives a request from a particular origin that could require installing a new locale, it must not reveal whether or not that locale is already installed.

## ECMA-402 2025

Source: https://tc39.es/ecma402/2025/

- 6 Identification of Locales, Currencies, Time Zones, Measurement Units, Numbering Systems, Collations, and Calendars 6.1 Case Sensitivity and Case Mapping

* **Software License.** SEE THE ECMA CODE OF CONDUCT IN PATENT MATTERS AVAILABLE AT https://ecma-international.org/memento/codeofconduct.htm FOR INFORMATION REGARDING THE LICENSING OF PATENT CLAIMS THAT ARE REQUIRED TO IMPLEMENT ECMA INTERNATIONAL STANDARDS.
* **Software License.** IN NO EVENT SHALL ECMA INTERNATIONAL BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)…
* **2 Conformance.** A conforming implementation of this specification must conform to the ECMAScript 2025 Language Specification (ECMA-262 16 th Edition, or successor), and must provide and support all the objects, properties, functions, and program semantics described in this specification.
* **2 Conformance.** Nothing in this specification is intended to allow behaviour that is otherwise prohibited by ECMA-262, and any such conflict should be considered an editorial error rather than an override of constraints from ECMA-262.
* **4.3 API Conventions.** Every Intl constructor should behave as if defined by a class, throwing a TypeError exception when called as a function (without NewTarget).
* **5 Notational Conventions.** An implementation of the API must behave as if it produced and operated upon internal slots in the manner described here.
* **5 Notational Conventions.** As an extension to the Record Specification Type, the notation “[[< name >]]” denotes a field whose name is given by the variable name , which must have a String value.
* **6.1 Case Sensitivity and Case Mapping.** Note For example, "ß" (U+00DF) must not match or be mapped to "SS" (U+0053, U+0053).

## ECMA-402 2024

Source: https://tc39.es/ecma402/2024/

- 6 Identification of Locales, Currencies, Time Zones, Measurement Units, Numbering Systems, Collations, and Calendars 6.1 Case Sensitivity and Case Mapping

* **Software License.** SEE THE ECMA CODE OF CONDUCT IN PATENT MATTERS AVAILABLE AT https://ecma-international.org/memento/codeofconduct.htm FOR INFORMATION REGARDING THE LICENSING OF PATENT CLAIMS THAT ARE REQUIRED TO IMPLEMENT ECMA INTERNATIONAL STANDARDS.
* **Software License.** IN NO EVENT SHALL ECMA INTERNATIONAL BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)…
* **2 Conformance.** A conforming implementation of this specification must conform to the ECMAScript 2024 Language Specification (ECMA-262 15 th Edition, or successor), and must provide and support all the objects, properties, functions, and program semantics described in this specification.
* **2 Conformance.** Nothing in this specification is intended to allow behaviour that is otherwise prohibited by ECMA-262, and any such conflict should be considered an editorial error rather than an override of constraints from ECMA-262.
* **4.3 API Conventions.** Every Intl constructor should behave as if defined by a class, throwing a TypeError exception when called as a function (without NewTarget).
* **5 Notational Conventions.** An implementation of the API must behave as if it produced and operated upon internal slots in the manner described here.
* **5 Notational Conventions.** As an extension to the Record Specification Type, the notation “[[< name >]]” denotes a field whose name is given by the variable name , which must have a String value.
* **6.1 Case Sensitivity and Case Mapping.** Note For example, "ß" (U+00DF) must not match or be mapped to "SS" (U+0053, U+0053).

## ECMA-402 draft

Source: https://tc39.es/ecma402/

- 6 Identification of Locales, Currencies, Time Zones, Measurement Units, Numbering Systems, Collations, and Calendars 6.1 Case Sensitivity and Case Mapping

* **Software License.** SEE THE ECMA CODE OF CONDUCT IN PATENT MATTERS AVAILABLE AT https://ecma-international.org/memento/codeofconduct.htm FOR INFORMATION REGARDING THE LICENSING OF PATENT CLAIMS THAT ARE REQUIRED TO IMPLEMENT ECMA INTERNATIONAL STANDARDS.
* **Software License.** IN NO EVENT SHALL ECMA INTERNATIONAL BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)…
* **2 Conformance.** A conforming implementation of this specification must conform to ECMA-262 , and must provide and support all the objects, properties, functions, and program semantics described in this specification.
* **2 Conformance.** Nothing in this specification is intended to allow behaviour that is otherwise prohibited by ECMA-262 , and any such conflict should be considered an editorial error rather than an override of constraints from ECMA-262 .
* **4.3 API Conventions.** Every Intl constructor should behave as if defined by a class, throwing a TypeError exception when called as a function (without NewTarget).
* **4.4 Implementation Dependencies.** In browser implementations the initial set of locales, currencies, calendars, numbering systems, and other enumerable items visible to a particular origin must be the same for all users sharing the same user agent string (engine and platform version).
* **4.4 Implementation Dependencies.** Furthermore, dynamic changes to these sets must not result in users becoming distinguishable from each other.
* **4.4 Implementation Dependencies.** As a result of this constraint, the first time a browser implementation that allows on-demand locale installation receives a request from a particular origin that could require installing a new locale, it must not reveal whether or not that locale is already installed.
