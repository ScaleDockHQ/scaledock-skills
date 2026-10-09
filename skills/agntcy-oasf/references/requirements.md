# Requirements from the pinned text

These statements were read from the pinned sources on 2026-10-06 and are quoted as written. OASF has no single normative prose document: the schema files (`record.json`, the base classes and the class metaschema) carry the defining rules in their attribute descriptions and `requirement` values, and the README and contribution guide state the conventions in lowercase must/should wording, not BCP 14 keywords. Apply the ones that match the role. Each is labelled with the attribute or the nearest heading it comes from.

## OASF 1.1.0: README

Source: https://raw.githubusercontent.com/agntcy/oasf/v1.1.0/README.md

- **Key Concepts.** OASF records can be annotated with **skills** and **domains** to enable effective announcement and discovery across agentic systems.
- **Key Concepts.** Additionally, **modules** provide a flexible mechanism to extend records with additional information in a modular and composable way, supporting a wide range of agentic use cases.
- **Schema Versioning and Immutability.** Once a schema version is released, no changes to that version of the schema are expected, except for non-breaking fixes such as documentation updates or minor bug corrections.

## OASF 1.1.0: record object

Source: https://raw.githubusercontent.com/agntcy/oasf/v1.1.0/schema/objects/record.json

Labels give the attribute and its `requirement` value from `record.json`. The `created_at` description also says its value MUST conform to RFC 3339, with examples such as `2024-09-10T23:20:50.520Z`.

- **record.name (required).** The name of the record.
- **record.version (required).** The version of the record. Values MAY conform to a specific versioning schema.
- **record.schema_version (required).** Version of the OASF schema.
- **record.created_at (required).** Includes the creation timestamp.
- **record.skills (required).** List of skills associated with this record.
- **record.domains (recommended).** List of domains associated with this record.

## OASF 1.1.0: skill, domain and module classes

Source: https://raw.githubusercontent.com/agntcy/oasf/v1.1.0/schema/skills/base_skill.json

Sources: the base skill, base domain and base module class files and the class metaschema listed in [Sources](../SKILL.md#sources). In both base_skill.json and base_domain.json, `constraints.at_least_one` lists `id` and `name`.

- **base_skill.name (recommended).** The name as a unique identifier of the skill.
- **base_module.name (required).** The name as a unique identifier of the module.
- **base_module.data (required).** The data associated with the module.
- **class.schema.json category.** If true, indicates this class is a category (organizational structure) and should not be used as an actual value.
- **class.schema.json uid.** A unique identifier for this class, must be unique within the category and class level.

## OASF 1.1.0: schema conventions (Contribution Guide)

Source: https://raw.githubusercontent.com/agntcy/oasf/v1.1.0/CONTRIBUTING.md

- **Adding or Modifying an `attribute`.** Attribute names must be a valid UTF-8 sequence.
- **Adding or Modifying an `attribute`.** Attribute names must be all lowercase.
- **Adding or Modifying an `attribute`.** When attribute represents multiple entities, the attribute name should be pluralized and the value type should be an array.
- **Adding or Modifying an `attribute`.** If the attribute is supposed to hold sensitive data such as API keys, use the `env_vars` attribute instead, which enables record publishers to mandate the presence of environment variables holding such sensitive information.
- **Defining an `object`.** All objects in OASF must extend a base definition of `object` or another existing object.
- **Defining an `object`.** `name` must match the filename of the actual `.json` file.

## OASF 1.2 (preview): main development line

Source: https://raw.githubusercontent.com/agntcy/oasf/a2c7e161a9b8534da921dfb029b9e6523609c5f7/CHANGELOG.md

The README on main repeats the 1.1.0 concepts and the schema immutability policy unchanged; the quotes below are the versioning rules from the changelog that govern the preview line.

- **Versioning.** OASF does **not** follow semantic versioning.
- **Versioning.** the **major and minor** version track the _schema_ version;
- **Versioning.** the **patch** version covers _server and API_ changes only — including breaking API changes.
