# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Media Accessibility User Requirements

Source: https://www.w3.org/TR/media-accessibility-reqs/

This document presents the accessibility requirements users with disabilities have with respect to audio and video on the web. It first provides an introduction to the needs of users with disabilities in relation to audio and video. Then it explains what alternative content technologies have been developed to help such users gain access to the content of audio and video. A third section explains how these content technologies fit in the larger picture of accessibility, both technically within a web user agent and from a production process point of view. This document is most explicitly not a collection of baseline user agent or authoring tool requirements. It is important to recognize that n

- **2.8 Sign translation.** Acknowledging that not all devices will be capable of handling multiple video streams, this is a SHOULD requirement for browsers where hardware is capable of support.
- **3.7 Requirements on the use of the viewport.** It is also a " SHOULD " level requirement, since it does not account for limitations of various devices.
- **1.2 Visual: Low vision.** This means that they will only be viewing a portion of the screen, and so must manage tracking media content via their AT .
- **1.2 Visual: Low vision.** They may be using an AT that adjusts all the colors of the screen, such as inverting the colors, so the media content must be viewable through the AT .
- **1.7 Physical impairment.** The media player must be usable with only a keyboard, including access to all player controls and methods for selecting alternative content.
- **1.8 Cognitive disabilities.** Individuals with some conditions may process information aurally better than by reading text; therefore, information that is presented as text embedded in a video should also be available as audio descriptions.
- **1.8 Cognitive disabilities.** Overall, the media experience for people on the autism spectrum should be customizable and well designed so as to not be overwhelming.
- **1.8 Cognitive disabilities.** Care must be taken to present a media experience that focuses on the purpose of the content and provides alternative content in a clear, concise manner.

## XR Accessibility User Requirements

Source: https://www.w3.org/TR/xaur/

This document lists user needs and requirements for people with disabilities when using virtual reality or immersive environments, augmented or mixed reality and other related technologies ( XR ). It first introduces a definition of XR as used throughout the document, then briefly outlines some uses of XR . It outlines the complexity of understanding XR , introduces some technical accessibility challenges such as the need for multi-modal support, synchronization of input and output devices and customization. It then outlines accessibility related user needs for XR and suggests subsequent requirements. This is followed by related work that may be helpful understanding the complex technical ar

- **3. Understanding XR and Accessibility Challenges.** Some games with XR components may lock out traditional control methods when a VR headset is being used, and the user should always be able to use a range of input mechanisms.
- **3. Understanding XR and Accessibility Challenges.** The user should not have to be in a particular physical position such as standing or sitting to play a game or perform some action.
- **3. Understanding XR and Accessibility Challenges.** Or there should be ability to remap these 'physical positions' to other controls (such as using WalkinVRDriver ).
- **3. Understanding XR and Accessibility Challenges.** Consoles should allow full button remapping on standard game controllers - to different types of assistive technologies such as switches.
- **3. Understanding XR and Accessibility Challenges.** These remapping preferences should be mobile, and transportable across a range of hardware devices and software.
- **3. Understanding XR and Accessibility Challenges.** User needs are presented here that may relate to several of these disabilities with a range of requirements that should be met by the author or the platform.
- **3.2 XR and supporting multimodality.** The following inputs and outputs can be considered modalities that should be supported in XR environments.
- **3.3 Various input modalities.** Using a range of speech commands, a user should be able to navigate in an XR environment, interact with the objects in that environment using their voice alone.

## RTC Accessibility User Requirements

Source: https://www.w3.org/TR/raur/

This document outlines various accessibility related user needs, requirements and scenarios for real-time communication ( RTC ). These user needs should drive accessibility requirements in various related specifications and the overall architecture that enables it. It first introduces a definition of RTC as used throughout the document and outlines how RTC accessibility can support the needs of people with disabilities. It defines the term user needs as used throughout the document and then goes on to list a range of these user needs and their related requirements. Following that some quality related scenarios are outlined and finally a data table that maps the user needs contained in this d

- **3. User needs definition.** These user needs should drive accessibility requirements for RTC accessibility and its related architecture.
- **4.1 Window anchoring and pinning.** REQ 1f: A user should have the ability to change the size of the window especially for sign language interpreters, certified deaf interpreters, and signing people.
- **4.2 Pause 'on record' captioning in RTC.** There should be a mechanism that both audio and captions can be paused or stopped, and both can be simultaneously restored for recording.
- **4.4 Incoming calls and caller ID.** Note Successful design of operations required for acting on incoming calls, getting informed about who the caller is and connecting relay services should not require complicated sequences of user actions.
- **4.6 Audio description in live conferencing.** Applications should also inherit customization settings from the user's operating system.
- **4.10 Text and Video relay services ( VRS ).** Note To successfully connect video or text relay services should not require a complicated sequence of user actions.
- **4.12 Call participants and status.** This should be done with the participants consent.
- **5. Relationship between RTC and XR Accessibility.** For example, if an RTC application is also an XR application then relevant XR accessibility requirements should be addressed as well.

## Collaboration Tools Accessibility User Requirements

Source: https://www.w3.org/TR/ctaur/

This document outlines various accessibility-related user needs and requirements for both synchronous and asynchronous web-based collaboration tools based on various collaborative engagement scenarios. These tools typically include one or more specific collaborative features such as content editing by multiple authors, support for comments annotations, and revision control in real-time synchronous sessions, or asynchronously. Asynchronous tools are more commonly known as revision control systems rather than collaboration tools though their functionality is otherwise very similar. The Cloud-based office application suites from Google and Microsoft are well-known examples of synchronous, real-

- **1.2 Our scope: distinctive features of collaboration tools.** By their very nature, audio alternatives presented in music or sound editing environments must be played sequentially, and their distinctions remembered by the user in the comparison and decisioning process.
- **1.4 Collaboration tools and accessibility.** Many users cannot track updates on multiple locations simultaneously, rather, they must view and comprehend the interactive elements of the application's features sequentially, for example in speech or braille for screen reader users.
- **1.4 Collaboration tools and accessibility.** Thus when we talk about collaborative tools we must consider accessibility burdens imposed by their associated complexity.
- **1.5 Social Considerations.** Collaborative tools should support all identified accessibility features in order to provide comprehensive accessibility.
- **2. Real-time Co-editing.** If there are multiple active collaborators, then multiple such commands, or a menu of active content editors, should be available.
- **3. Annotations.** For example, it should be possible to suppress presentation of metadata or replies to comments, or to alert the user only to the presence of the annotation without presenting the metadata or comment text.
- **3. Annotations.** Note REQ 8 may be valuable to users in general, and it should be considered for inclusion as a feature of collaboration tools themselves.
- **4.1 Suggested changes.** These details should include time stamps and identification of who made the change together with any annotations the editor may have provided by way of explanation.

## Synchronization Accessibility User Requirements

Source: https://www.w3.org/TR/saur/

This document summarizes relevant research, then outlines accessibility-related user needs and associated requirements for the synchronization of audio and visual media. The scope of the discussion includes synchronization of accessibility-related components of multimedia, such as captions, sign language interpretation, and descriptions. The requirements identified herein are also applicable to multimedia content in general, as well as real-time communication applications and media occurring in immersive environments. The purpose of this document is to identify and to characterize synchronization-related needs. It does not constitute normative guidance. It may, nevertheless, influence the fu

- **1.1 Media Synchronization.** To ensure equality of access for all users, including those with a variety of disabilities and associated needs, these concurrent resources should be appropriately synchronized.
- **1.2 Media Synchronization and Accessibility.** For example, for a person who uses captions to follow the progression of a video successfully, a correspondence should be maintained between the captions and the visual track (both of which the user is watching concurrently).
- **1.2 Media Synchronization and Accessibility.** The issue of what delay should be regarded as acceptable in such a case is addressed in this document with respect to a variety of media resources.
- **1.2 Media Synchronization and Accessibility.** For instance, the frame rate of video must be adequate; otherwise, lip reading becomes impracticable.
- **1.3 Associated Publications.** The XR Accessibility User Requirements (XAUR) [ xaur ] should be consulted for guidance concerning the accessibility of these technologies.
- **1.3 Associated Publications.** The present document should be regarded as complementing each of these publications by examining a specific aspect of media quality and accessibility.
- **2.1 Lip Reading Use Case Synchronization.** These findings suggest that, from an accessibility perspective, the audio signal should not be ahead of the video by more than 40 ms, and the video should not be ahead of the audio by more than 160 ms.
- **2.2.2 Captions in Live Media.** Even automated captions produced by ASR systems require some amount of time to process human speech into text which then must be integrated into the video stream.

## Natural Language Interface Accessibility User Requirements

Source: https://www.w3.org/TR/naur/

This document outlines accessibility-related user needs, requirements and scenarios for natural language interfaces. These user needs should influence accessibility requirements in related specifications and in the design of applications that include natural language interfaces. The concept of a natural language interface is first clarified. User needs and associated requirements are then described. This document is not a collection of baseline requirements. Some requirements may be implemented at a system or platform level and others at the application level.

- **1.3 Cross disability support.** Speech input commands must be quickly called to mind, which requires cognitive effort for experienced users and more effort for new users.
- **1.3 Cross disability support.** Similar to type-ahead results, speech input results must be watched to make sure that the computer has not made a wording mistake that may be difficult to figure out later.
- **1.3 Cross disability support.** The design should accomodate this need by providing step-by-step instructions.
- **4. Services and agents.** This document aims to look at these services and determine to what degree they can and should support the needs of people with disabilities; what system requirements are, or where further research is needed.
- **4. Services and agents.** If natural language interaction is provided as part of a system that also offers other styles of interaction, this document should be read in combination with guidance provided elsewhere which is relevant to the other interface and service aspects.
- **5. User need definition.** They include a variety of physical, sensory, learning and cognitive abilities that should be taken into account in the design of platforms and applications.
- **6.1 User identification and authentication.** Due to security and privacy requirements, each user must be authenticated individually.
- **6.4 Speech recognition and speech production.** This correlation should be established empirically, in a variety of real use contexts, before relying on this approach.
