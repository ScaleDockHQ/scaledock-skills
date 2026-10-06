# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Data on the Web Best Practices

Source: https://www.w3.org/TR/dwbp/

This document provides Best Practices related to the publication and usage of data on the Web designed to help support a self-sustaining ecosystem. Data should be discoverable and understandable by humans and machines. Where data is used in some way, whether by the originator of the data or by an external party, such usage should also be discoverable and the efforts of the data publisher recognized. In short, following these Best Practices will facilitate interaction between publishers and consumers.

- **1. Introduction.** Not all data and metadata should be shared openly, however.
- **1. Introduction.** It is for data publishers to determine policy on which data should be shared and under what circumstances.
- **1. Introduction.** Although it is likely to be safe to share some of that information openly, and even more within a controlled environment, publishers should bear in mind that combining data from multiple sources may allow inadvertent identification of individuals.
- **3. Scope.** As noted above, whether a Best Practice has or has not been followed should be judged against the intended outcome , not the possible approach to implementation which is offered as guidance.
- **4. Context.** A relevant aspect of this is the identification principle that says that URIs should be used to identify resources.
- **4. Context.** All resources should be published with stable URIs, so that they can be referenced and make links, via URIs, between two or more resources.
- **Intended Outcome.** What it should be possible to do when a data publisher follows the Best Practice.
- **8.1 Running Example.** It is important that both humans and software agents can easily understand and process the data which should be kept up to date and be easily discoverable on the Web.

## Spatial Data on the Web Best Practices

Source: https://www.w3.org/TR/sdw-bp/

This document advises on best practices related to the publication of spatial data on the Web; the use of Web technologies as they may be applied to location . The best practices presented here are intended for practitioners, including Web developers and geospatial experts, and are compiled based on evidence of real-world application. These best practices suggest a significant change of emphasis from traditional Spatial Data Infrastructures by adopting an approach based on general Web standards. As location is often the common factor across multiple datasets, spatial data is an especially useful addition to the Web of data.

- **1. Conformance.** The key words MAY , MUST , MUST NOT , OPTIONAL , RECOMMENDED , REQUIRED , SHALL , SHALL NOT , SHOULD , and SHOULD NOT in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **1. Conformance.** The key words " MUST ", " MUST NOT ", " REQUIRED ", " SHALL ", " SHALL NOT ", " SHOULD ", " SHOULD NOT ", " RECOMMENDED ", " MAY ", and " OPTIONAL " in this document are to be interpreted as described in RFC 2119.
- **13.1.1 Spatial data identifiers.** Given the widespread use of the Hyper Text Transfer Protocol (HTTP) on the Web, we SHOULD use HTTP URIs to identify resources in spatial data .
- **Possible Approach to Implementation.** The two key points from [ WEBARCH ] are: Good practice: Link identification — A [data format] specification SHOULD provide ways to identify links to other resources [...].
- **Possible Approach to Implementation.** Good practice: Web linking — A [data format] specification SHOULD allow Web-wide linking, not just internal document linking.
- **Possible Approach to Implementation.** An OPTIONAL third-position element SHALL be the height in meters above or below the WGS 84 reference ellipsoid .
- **Possible Approach to Implementation.** In the absence of elevation values, applications sensitive to height or depth SHOULD interpret positions as being at local ground or sea level.
- **2. Introduction.** Following these guidelines should result in your data fitting more with the FAIR Principles .
