# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Time Ontology in OWL

Source: https://www.w3.org/TR/owl-time/

OWL-Time is an OWL-2 DL ontology of temporal concepts, for describing the temporal properties of resources in the world or described in Web pages. The ontology provides a vocabulary for expressing facts about topological (ordering) relations among instants and intervals, together with information about durations, and about temporal position including date-time information. Time positions and durations may be expressed using either the conventional (Gregorian) calendar and clock, or using another temporal reference system such as Unix-time, geologic time, or different calendars. The namespace for OWL-Time terms is http://www.w3.org/2006/time# The suggested prefix for the OWL-Time namespace is

- **4.1.6 Generalized date-time description.** Individual values SHOULD be consistent with each other and the calendar, indicated through the value of the :hasTRS property.
- **1. Motivation and background.** This includes relaxing the expectation from the original version that dates must use the Gregorian calendar.
- **3.2 Temporal reference systems, clocks, calendars.** In order to support these more general applications, the representation of temporal position and duration must be flexible, and annotated with the temporal reference system in use.
- **3.4 Duration.** The extent of an interval can be given using multiple duration descriptions or individual durations (e.g., 2 days, 48 hours) , but these must all describe the same amount of time.
- **4.1.7 Generalized duration description.** When non-earth-based calendars are considered even more care must be taken in comparing durations.
- **4.1.16 Time position.** The temporal ordinal reference system should be provided as the value of the :hasTRS property The temporal coordinate system should be provided as the value of the :hasTRS property
- **7. Security and Privacy.** Implementations that produce, maintain, publish or consume temporal information using OWL-Time must take steps to ensure security and privacy considerations are addressed at the application level.
