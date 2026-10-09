# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. ATT&CK is a knowledge base and has no MUST or SHALL keywords, so the model is given by its definitions and the data by the usage rules of its STIX representation, quoted as written. Apply the ones that match the role. Paper quotes are labelled with their section number; STIX data quotes with the object type or property they describe.

## MITRE ATT&CK: Design and Philosophy

Source: https://attack.mitre.org/docs/ATTACK_Design_and_Philosophy_March_2020.pdf

- **§ 3.3.** Tactics represent the “why” of an ATT&CK technique or sub-technique. It is the adversary’s tactical objective: the reason for performing an action.
- **§ 3.3.** Tactics are treated as “tags” within ATT&CK where a technique or sub-technique is associated or tagged with one or more tactic categories depending on the different results that can be achieved by using a technique.
- **§ 3.4.** Techniques represent “how” an adversary achieves a tactical objective by performing an action.
- **§ 3.4.** Sub-techniques further break down behaviors described by techniques into more specific descriptions of how behavior is used to achieve an objective.
- **§ 3.4.1.** Within ATT&CK, procedures are the specific implementation adversaries have used for techniques or sub-techniques.
- **§ 3.4.2.** Unique identifier for the (sub-)technique within the knowledge base. Format: (technique) T####; (sub-technique) T####.###.
- **§ 3.5.** Groups are defined as named intrusion sets, threat groups, actor groups, or campaigns that typically represent targeted, persistent threat activity.
- **§ 2.1.** At its core, ATT&CK documents known adversary behavior and is not intended to provide a checklist of things that need to all be addressed.
- **§ 2.1.** Anyone mapping to ATT&CK should be able to explain the procedures they cover.
- **§ 3.9.1.** All objects are assigned a two part numerical version MAJOR.MINOR that starts at 1.0 for any new object.
- **§ 3.9.1.1.** Scope changes are a modification of how the technique could be interpreted or what it covers or does not cover in the description and include changes to its assigned tactics.

## ATT&CK STIX Data: README

Source: https://raw.githubusercontent.com/mitre-attack/attack-stix-data/v19.2/README.md

- **Collections.** Each STIX bundle in the collection folders represents a specific release of the collection.
- **Collections.** Each domain includes a STIX 2.1 collection bundle without version markings which will always match the most recent release of the dataset.

## ATT&CK STIX Data: USAGE

Source: https://raw.githubusercontent.com/mitre-attack/attack-stix-data/v19.2/USAGE.md

- **attack-pattern.** ATT&CK Techniques and sub-techniques are both represented as `attack-pattern` objects.
- **external_references.** By specifying the STIX type you're looking for as `attack-pattern` you can avoid this issue.
- **kill_chain_phases.** The `phase_name` of each kill chain phase corresponds to the `x_mitre_shortname` of a tactic.
- **x_mitre_deprecated, revoked.** Objects that are deemed no longer beneficial to track as part of the knowledge base are marked as deprecated, and objects which are replaced by a different object are revoked.
- **revoked-by.** In the case of revoked objects, a relationship of type `revoked-by` is also created targeting the replacing object.
- **x_mitre_deprecated, revoked.** We recommend you filter out revoked and deprecated objects from your views whenever possible since they are no longer maintained by ATT&CK.
