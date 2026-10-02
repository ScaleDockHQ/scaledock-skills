# OCSF profiles, extensions and unmapped data

Source: the schema server API (`/api/1.9.0/profiles`, `/api/1.9.0/extensions`), the white paper, the extensions registry and the 1.9.0 release notes.

## Profiles

A profile is an overlay: a named set of attributes that can be added to any class that supports it, without creating a new class (white paper). When an event uses a profile, list it in `metadata.profiles` and fill the profile's attributes; those attributes are only required when the profile is applied. Requesting a class from the schema server without `?profiles=` returns it without the profile attributes.

Profiles in 1.9.0, with the schema's own descriptions:

| Profile                                  | Description                                                                                                                                         |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `trace`                                  | Captures observability events, specifically trace-level data                                                                                        |
| `host`                                   | Adds host and actor context when the event originates from or is observed on a specific host or device                                              |
| `datetime`                               | Adds a `datetime_t` (RFC 3339 string) sibling wherever a `timestamp_t` attribute appears                                                            |
| `cloud`                                  | Information specific to cloud services and applications                                                                                             |
| `container`                              | The container context for a process                                                                                                                 |
| `data_classification`                    | Classifiers and data classification results on resource objects                                                                                     |
| `load_balancer`                          | Information specific to load balancers                                                                                                              |
| `osint`                                  | Open-source intelligence indicators and analysis                                                                                                    |
| `network_proxy`                          | Network proxy attributes                                                                                                                            |
| `record_integrity`                       | Cryptographic attestations over the event itself, for integrity, authenticity and non-repudiation; new in 1.9.0                                     |
| `security_control`                       | The outcome of a security control, including disposition                                                                                            |
| `incident`                               | Incident handling semantics for a Finding                                                                                                           |
| `ai_operation`                           | AI model operations, retrieval systems and agent activities; attributes `ai_agent`, `ai_model`, `delegation` (added in 1.9.0) and `message_context` |
| `linux/linux_users`, `macos/macos_users` | User information as the platform identifies it                                                                                                      |

## Extensions

An extension adds attributes, objects or classes for a vendor or platform. Each extension has a registered `uid`, and vendor attributes carry the extension's prefix (white paper). The registry in `extensions.md` lists the assigned UIDs, for example platform extensions `linux` 1, `win` 2 and `macos` 3, and registered ones such as `splunk` 997, `aws` 998 and `dev` 999. List extensions used by an event in `metadata.extensions`.

## `unmapped`

`unmapped` holds source attributes that have no OCSF attribute. The schema describes a custom extension as the preferred approach. Use `unmapped` for low-volume, application-specific fields, and review it for personal data before export.

## Versioning

OCSF uses SemVer: a minor release adds content and a patch release holds corrections (white paper). An event's `metadata.version` states which schema it was written for. When a new version deprecates a class, as 1.9.0 did with Account Change and User Access Management, the deprecation note names the replacement; move new mappings to it.
