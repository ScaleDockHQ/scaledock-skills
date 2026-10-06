# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## PKCS #11 3.1

Source: https://docs.oasis-open.org/pkcs11/pkcs11-spec/v3.1/pkcs11-spec-v3.1.html

https://docs.oasis-open.org/pkcs11/pkcs11-spec/v3.1/cs01/pkcs11-spec-v3.1-cs01.pdf

- **document.** Key words: The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in BCP 14 [ RFC2119 ] and [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **2 Platform-.** This means that when writing C or C++ code, certain preprocessor directives MUST be issued before including a Cryptoki header file.
- **2.1 Structure packing.** Cryptoki structures are packed to occupy as little space as is possible.� Cryptoki structures SHALL be packed with 1-byte alignment.
- **2.2 Pointer-related macros.** Because different platforms and compilers have different ways of dealing with different types of pointers, the following 6 macros SHALL be set outside the scope of Cryptoki: � CK_PTR CK_PTR is the �indirection string� a given platform and compiler uses to make a pointer to an object.� It is used in the following fashion: typedef CK_BYTE CK_PTR CK_BYTE_PTR; � CK_DECLARE_FUNCTION…
- **3.** When including either of these header files, a source file MUST specify the preprocessor directives indicated in Section 2.
- **3.1 General information.** ���������������������������������������� flags ������ bit flags reserved for future versions.� MUST be zero for this version ���������������������� libraryDescription ������ character-string description of the library.� MUST be padded with the blank character (� �).� Should not be null-terminated.
- **3.2 Slot and token types.** ������������������������� manufacturerID ������ ID of the slot manufacturer.� MUST be padded with the blank character (� �).� MUST NOT be null-terminated.
- **3.2 Slot and token types.** label, assigned during token initialization.� MUST be padded with the blank character (� �).� MUST NOT be null-terminated.
