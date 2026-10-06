# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## proto3

Source: https://protobuf.dev/programming-guides/proto3/

Covers how to use the proto3 revision of the Protocol Buffers language in your project. This guide describes how to use the protocol buffer language to structure your

- **Defining A Message Type.** The edition (or syntax for proto2/proto3) must be the first non-empty, non-comment line of the file.
- **Assigning Field Numbers.** You must give each field in your message definition a number between 1 and 536,870,911 with the following restrictions: The given number must be unique among all fields for that message.
- **Assigning Field Numbers.** You should use the field numbers 1 through 15 for the most-frequently-set fields.
- **Deleting Fields.** However, you must reserve the deleted field number .
- **Deleting Fields.** You should also reserve the field name to allow JSON and TextFormat encodings of your message to continue to parse.
- **Scalar Value Types.** bool string A string must always contain UTF-8 encoded or 7-bit ASCII text, and cannot be longer than 2 32 .
- **Scalar Value Types.** In all cases, the value must fit in the type represented when set.
- **Default Field Values.** For enums, the default value is the first defined enum value , which must be 0.

## proto2

Source: https://protobuf.dev/programming-guides/proto2/

Covers how to use the proto2 revision of Protocol Buffers language in your project. This guide describes how to use the protocol buffer language to structure your

- **Defining A Message Type.** The syntax must be the first non-empty, non-comment line of the file.
- **Assigning Field Numbers.** You must give each field in your message definition a number between 1 and 536,870,911 with the following restrictions: The given number must be unique among all fields for that message.
- **Assigning Field Numbers.** You should use the field numbers 1 through 15 for the most-frequently-set fields.
- **Specifying Field Cardinality.** Semantics for required field should be implemented at the application layer.
- **Specifying Field Cardinality.** When it is used, a well-formed message must have exactly one of this field.
- **Use Packed Encoding for New Repeated Fields.** New code should use the special option [packed = true] to get a more efficient encoding.
- **Important.** Required Is Forever As mentioned earlier required must not be used for new fields .
- **Important.** Semantics for required fields should be implemented at the application layer instead.

## Protobuf Editions

Source: https://protobuf.dev/editions/

Topics related to the Protobuf Editions functionality. Protobuf Editions Overview

- **abstract.** Topics related to the Protobuf Editions functionality. Protobuf Editions Overview
