# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Semantic Sensor Network Ontology Level 2017

Source: https://www.w3.org/TR/vocab-ssn-2017/

The Semantic Sensor Network (SSN) ontology is an ontology for describing sensors and their observations, the involved procedures, the studied features of interest, the samples used to do so, and the observed properties, as well as actuators. SSN follows a horizontal and vertical modularization architecture by including a lightweight but self-contained core ontology called SOSA (Sensor, Observation, Sample, and Actuator) for its elementary classes and properties. With their different scope and different degrees of axiomatization, SSN and SOSA are able to support a wide range of applications and use cases, including satellite imagery, large-scale scientific monitoring, industrial and household

- **7.4 Generic or Specific Instances of ssn:Property.** On the other hand, one SHOULD NOT use OWL punning to make ex:Temperature denote both a subclass of ssn:Property and an instance of ssn:Property .
- **7.5 Generic or Specific Instances of ssn:System.** On the other hand, one SHOULD NOT use OWL punning to make ex:Temperature denote both a subclass of ssn:Property and an instance of ssn:Property.
- **2. Modularization.** This means, that the result of certain reasoning tasks such as subsumption or query answering within a single module should be possible and result in the same answers without the need to access other modules of the ontology.
- **3. Origins of SSN and SOSA.** SensorML provides extensive support for serialization of numeric data arrays and is particularly optimized for data that includes multiple parallel streams that must be processed together.
- **3. Origins of SSN and SOSA.** For example, the data collected by cameras on airborne vehicles must be geo-referenced based on the instantaneous position of the platform and orientation of the camera.
- **4.3.2.3 sosa:observedProperty.** The ObservableProperty should be a property of the FeatureOfInterest (linked by hasFeatureOfInterest ) of this Observation .
- **7.3 Quantity Values and Unit of Measures.** Such a datatype should be supported by RDF and SPARQL engines to support the comparison of quantity values.
- **7.4 Generic or Specific Instances of ssn:Property.** This specification does not specify whether an instance of ssn:Property should be generic to all features of interest (e.g., ex:Temperature , ex:OnOffStatus ), or specific to a single feature of interest (e.g., <myBodyTemperature> , <LightStatus> ).

## Semantic Sensor Network Ontology - 2023 Edition

Source: https://www.w3.org/TR/vocab-ssn-2023/

The Semantic Sensor Network ontology (SSN) describes the arrangement of actuators and their actuations, sensors and their observations, and samplers and their samplings, along with the procedures implemented, the features of interest and samples, and the actuated and observed properties. The core classes and properties are defined using a minimal set of axioms in modules called SOSA (Sensor, Observation, Sample, and Actuator), supplemented with additional axiomatization and terms in further SSN modules. These allow SSN to support a wide range of applications and use cases, including satellite imagery, large-scale scientific monitoring, industrial and household infrastructures, social sensing

- **2.3.1 Module diagrams.** However the module diagrams MUST NOT be interpreted according to strict UML rules.
- **2.3.2 Class and instance diagrams.** However the class diagrams MUST NOT be interpreted according to strict UML rules.
- **2.3.2 Class and instance diagrams.** In particular: - Cardinalities are not shown and SHOULD NOT be inferred - Object properties are generally shown as association roles.
- **3. Conformance.** The key words MAY , MUST , MUST NOT , SHALL , SHOULD , and SHOULD NOT in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **5.3.4.2.1 sosa:Execution.** Individual Executions SHOULD be typed with one of the (concrete) subclasses of Execution.
- **5.3.4.2.2 sosa:ExecutionCollection.** Where an individual ExecutionCollection has a single value for a property , each member Execution (direct or transitive) MUST have that same value for that property — i.e., the collection (set) is homogeneous in that property.
- **5.3.4.2.2 sosa:ExecutionCollection.** Where an individual ExecutionCollection has more than one value for a property , each member Execution (direct or transitive) MUST have a value for that property that matches one of the values for the property in the collection.
- **5.3.4.2.2 sosa:ExecutionCollection.** Where an individual ExecutionCollection has a value for a property that is a range or interval , each member Execution (direct or transitive) MUST have a value for that property that matches or falls within that range or interval.
