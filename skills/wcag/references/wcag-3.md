# WCAG 3.0 (Working Draft)

Read this when WCAG 3.0 is a build or test target: when designing, building or testing content against the draft's core requirements (and supplemental requirements when asked), writing assertions, or reporting results against the draft. Sources: W3C Accessibility Guidelines (WCAG) 3.0, W3C Working Draft 10 September 2026 (WD-wcag-3.0-20260910); the Editor's Draft of 2 October 2026; the Explainer for WCAG 3.0 (Group Note Draft, 10 September 2026); the WCAG 3 Introduction; and the WCAG 3 Support Material, listed in [Sources](../SKILL.md#sources). Citations without a document name are to the Working Draft.

The draft "may be updated, replaced, or obsoleted by other documents at any time. It is inappropriate to cite this document as other than a work in progress" (Status of This Document). Every result built from this file is a result against the named Working Draft, never a W3C conformance claim, and never a replacement for the WCAG 2.2 result.

## Structure of the draft

- **Guidelines** are plain-language outcome statements ("Users have equivalent alternatives for images"), are normative, and group the provisions for one functional need (Explainer § 5.1; Glossary, guideline). The draft numbers them `2.<topic>.<n>`, for example Guideline 2.1.1 Image alternatives.
- **Provisions** come in three types (§ 3.1.1):
  - **Core requirements** MUST be met to conform. They make content detectable by user agents and AT, available to multiple senses and input methods, free of direct and immediate physical harm, and give needed support such as captions, text alternatives and expanded abbreviations.
  - **Supplemental requirements** build on the core set and are not required to conform: they go beyond the core, are a stricter form of a core requirement, or are disproportionately burdensome.
  - **Assertions** are documented statements, attributed to a person or organization, about accessibility practices it follows (§ 3.1.1; Glossary, assertion). An assertion can't stand in for a core requirement (Explainer § 5.3.1).
- **Recommended practices** are informative, clearly marked, and not needed to conform (§ 3.1.2). The draft has one: Return to start prominent.
- **Requirement format.** Each provision has a short name, a type, a statement, and optional "Applies when" and "Except when" conditions, notes and examples. Unless it says otherwise, a requirement assumes the content is provided both visually and programmatically (§ 2, summary).
- **Identifiers.** Requirements have no visible number; they are identified by name and by fragment anchor, for example `https://www.w3.org/TR/wcag-3.0/#images-detectable`. Cite them as "Guideline 2.1.1, Images detectable".
- **Methods and How-to documents** are informative. Each requirement is associated with at least one method, which holds techniques, examples, resources and tests; methods resemble WCAG 2 Techniques and How-to documents resemble Understanding documents (Explainer § 5, § 5.2; WCAG 3 Introduction, Structure). The WCAG 3 Support Material publishes a page per requirement with a test procedure and expected results, marked as an in-progress draft.
- **Status levels.** Every normative section has a status: Placeholder, Exploratory, Developing, Refining or Mature (§ 1.1.2). Developing means the need is roughly agreed but details are still being worked out. Refining means ready for experimental adoption, and Mature means believed ready for Recommendation.
- **Status of this draft.** The Working Draft includes only provisions at Developing (§ 1.1). Every one of its 216 provisions is Developing, and none is Refining or Mature yet. The Editor's Draft of 2 October 2026 holds the same 216 provisions plus 29 Exploratory ones. Exploratory provisions are not build targets.
- **Placeholders.** Values the draft has not set are written `@@`: the text appearance values, the text contrast algorithm ("yet to be determined"), and the non-text contrast threshold referenced by Pointer contrast sufficient (Guidelines 2.2.1, 2.3.2; Glossary, contrast ratio test).

| Count                     | Working Draft 10 September 2026                                    |
| ------------------------- | ------------------------------------------------------------------ |
| Topics                    | 12 (sections 2.1 to 2.12)                                          |
| Guidelines                | 46; 2.1.2 and 2.12.2 have no provision beyond Exploratory yet      |
| Core requirements         | 106                                                                |
| Supplemental requirements | 74                                                                 |
| Assertions                | 35                                                                 |
| Recommended practices     | 1                                                                  |
| Status                    | all 216 Developing; 29 more Exploratory only in the Editor's Draft |

## Mapping to WCAG 2.2

The draft publishes no criterion-by-criterion mapping. What it does say: content that conforms to WCAG 2.2 Level A and AA "is expected to meet most of the minimum conformance level", but WCAG 3 adds tests and changes scoring, and W3C "will provide transition support materials" (§ 1.2). Meeting WCAG 2 AA "means you will be close to meeting WCAG 3, but there may be differences" (§ 1, summary). Core requirements "cover a similar, but not identical, set of needs as WCAG 2.2 Level AA" (Explainer § 5.2), and WCAG 3 will not be published until it covers at least as much as WCAG 2.2 (Explainer § 9).

The **WCAG 2.2 (derived)** column below is this skill's own comparison of the requirement text with the WCAG 2.2 success criteria. It is not a W3C mapping. "partial" means the WCAG 2.2 criterion covers only part of the requirement, and "none" means no WCAG 2.2 criterion covers it. A WCAG 2.2 pass is evidence for a WCAG 3.0 requirement, not proof: always test the requirement's own wording.

Type codes: **C** core, **S** supplemental, **A** assertion, **RP** recommended practice. Exceptions are condensed; read the requirement for the full text.

## 2.1 Images and media

### Guideline 2.1.1 Image alternatives: users have equivalent alternatives for images

| Requirement                   | Type | Rule                                                              | WCAG 2.2 (derived) |
| ----------------------------- | ---- | ----------------------------------------------------------------- | ------------------ |
| Images detectable             | C    | Non-decorative images are detectable.                             | 1.1.1 (partial)    |
| Decorative images hidden      | C    | Decorative images are programmatically hidden.                    | 1.1.1              |
| Image alternatives available  | C    | Non-decorative images have text alternatives.                     | 1.1.1              |
| Image alternatives equivalent | C    | The text alternative conveys the equivalent purpose to the image. | 1.1.1              |

### Guideline 2.1.2 Figure captions: users can view figure captions even if not focused at figure

No provision has progressed beyond Exploratory.

### Guideline 2.1.3 Non-text alternatives

| Requirement                    | Type | Rule                                                                                             | WCAG 2.2 (derived) |
| ------------------------------ | ---- | ------------------------------------------------------------------------------------------------ | ------------------ |
| Non-text content not relied on | C    | Non-decorative non-text content has a programmatically determinable equivalent text alternative. | 1.1.1              |

### Guideline 2.1.4 Transcripts: users have transcripts for audio content

| Requirement                                  | Type | Rule                                                                                                                                                     | WCAG 2.2 (derived)     |
| -------------------------------------------- | ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| Transcripts findable                         | C    | A text transcript is adjacent to audio and video content. Except no spoken dialogue, decorative, or a labelled media alternative for text.               | none                   |
| Dialogue transcripts available (prerecorded) | C    | Dialogue transcripts exist for all prerecorded audio and video. Except a labelled alternative for text, or background-only media with no speech.         | 1.2.1 (partial)        |
| Dialogue transcripts available (live)        | C    | Dialogue transcripts exist for all live audio and video, with the same exceptions.                                                                       | none                   |
| Transcripts equivalent (prerecorded)         | C    | Transcripts are equivalent. Except background-only media with no speech.                                                                                 | 1.2.1 (partial)        |
| Descriptive transcripts available            | C    | Prerecorded audio and video has a descriptive transcript. Except decorative, a labelled alternative for text, or no visual information beyond the audio. | 1.2.3, 1.2.8 (partial) |
| Speakers identified in transcripts           | S    | With multiple speakers, speakers are identified understandably.                                                                                          | none                   |
| Speaker language identified in transcripts   | S    | When several languages are spoken, each speaker's language is identified.                                                                                | none                   |
| Sounds identified in transcripts             | C    | Sounds needed to understand the media are identified or described.                                                                                       | none                   |
| Visual information identified in transcripts | C    | Visual information needed to understand the media is described.                                                                                          | 1.2.8 (partial)        |

Assertions: Transcripts style guide; Transcripts usability testing (with users who need transcripts, issues fixed); Transcripts reviewed by content authors.

### Guideline 2.1.5 Captions: users have captions for audio content

| Requirement                             | Type | Rule                                                                                                               | WCAG 2.2 (derived) |
| --------------------------------------- | ---- | ------------------------------------------------------------------------------------------------------------------ | ------------------ |
| Captions adjustable                     | S    | Caption appearance (font size, weight, style, color, background, transparency, placement) is adaptable.            | none               |
| Captions available (prerecorded)        | C    | Captions exist for all prerecorded audio. Except a labelled alternative for text.                                  | 1.2.2              |
| Captions equivalent (prerecorded)       | C    | Captions are equivalent. Except background-only media with no speech.                                              | 1.2.2              |
| Captions available (live)               | C    | Captions exist for all live audio.                                                                                 | 1.2.4              |
| Caption language adjustable             | S    | Users can change the caption language when several are available.                                                  | none               |
| Captions controllable                   | S    | Captions can be turned on and off. Except hard-coded captions.                                                     | none               |
| Captions unobstructed                   | S    | Captions don't hide visual information needed to understand the video.                                             | none               |
| Captions synchronized                   | C    | Captions are synchronized with the audio of synchronized media.                                                    | 1.2.2, 1.2.4       |
| Captions centered (immersive)           | C    | In 360-degree environments, captions stay directly in front of the user (when the user controls caption position). | none               |
| Direction indicated (immersive)         | C    | In 360-degree environments, the direction of sound or speech from outside the view is indicated.                   | none               |
| Speakers identified in captions         | S    | With multiple speakers, speakers are identified understandably.                                                    | none               |
| Speaker language identified in captions | S    | Each speaker's language is identified when several are spoken.                                                     | none               |
| Sounds identified in captions           | C    | Sounds needed to understand the media are identified or described.                                                 | 1.2.2 (partial)    |

Assertions: Captions style guide; Captions usability testing; Captions reviewed by content authors.

### Guideline 2.1.6 Audio descriptions: users have audio descriptions for video content

| Requirement                                         | Type | Rule                                                                                                                       | WCAG 2.2 (derived) |
| --------------------------------------------------- | ---- | -------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| Audio descriptions available (prerecorded)          | C    | Prerecorded video has audio description of visual content needed to understand it. Except a labelled alternative for text. | 1.2.3, 1.2.5       |
| Audio descriptions equivalent (prerecorded)         | C    | The description is equivalent to the visual content needed to understand the media.                                        | 1.2.5 (partial)    |
| Audio descriptions synchronized                     | C    | Descriptions are synchronized and don't overlap dialogue or meaningful audio.                                              | none               |
| Audio descriptions available (live)                 | S    | Live video has audio description of needed visual content.                                                                 | none               |
| Extended audio descriptions available               | C    | When pauses are too short, the video pauses for an extended description.                                                   | 1.2.7 (AAA)        |
| Extended audio descriptions equivalent              | C    | Extended descriptions are equivalent to the needed visual content.                                                         | 1.2.7 (partial)    |
| Audio description language adjustable               | S    | Users can change the description language when several are available.                                                      | none               |
| Audio descriptions controllable                     | S    | Descriptions can be turned on and off. Except hard-coded descriptions.                                                     | none               |
| Speakers identified in audio descriptions           | S    | With multiple speakers, speakers are identified understandably.                                                            | none               |
| Speaker language identified in audio descriptions   | S    | Each speaker's language is identified when several are spoken.                                                             | none               |
| Sounds identified in audio descriptions             | C    | Sounds needed to understand the media are identified or described in captions and transcripts.                             | none               |
| Visual information identified in audio descriptions | C    | Visual information needed to understand the media is described.                                                            | 1.2.5 (partial)    |

Assertions: Audio descriptions style guide; Audio descriptions usability testing; Audio descriptions reviewed by content authors. An editor's note says the draft still has to decide how to handle video whose audio has no gaps for descriptions.

### Guideline 2.1.7 Sign language: users have equivalent sign language interpretation for audio content

| Requirement                           | Type | Rule                                                                                                                                                                                                 | WCAG 2.2 (derived) |
| ------------------------------------- | ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| Sign language available (prerecorded) | S    | Prerecorded audio has interpretation in the primary sign language of each intended audience or region. Except alternatives for visual content, decorative background sound, interface sound effects. | 1.2.6 (AAA)        |
| Sign language controllable            | S    | Interpretation can be shown and hidden. Except hard-coded, or provided as a separate video.                                                                                                          | none               |
| Sign language policy (live)           | A    | The organization has a policy to provide interpretation for live in-person, hybrid and online events.                                                                                                | none               |

### Guideline 2.1.8 Single sense: users have content that does not rely on a single sense or perception

| Requirement                          | Type | Rule                                                                                                                          | WCAG 2.2 (derived) |
| ------------------------------------ | ---- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| Hue not relied on                    | C    | Information is not conveyed by hue alone. Except artistic or expressive content, or devices limited to presenting hues.       | 1.4.1              |
| Graphical object contrast sufficient | C    | Parts of graphical objects needed to understand content meet a minimum contrast ratio test. Except an essential presentation. | 1.4.11             |
| Visual depth not relied on           | C    | Information is not conveyed through visual depth perception alone.                                                            | none               |
| Sound not relied on                  | C    | Information is not conveyed by sound alone. Except audio-based media.                                                         | 1.3.3 (partial)    |
| Spatial audio not relied on          | C    | Information is not conveyed by spatial audio alone.                                                                           | none               |

### Guideline 2.1.9 Accessible media player

Assertions only: Accessible video player selected, and Accessible audio player selected (for formats that don't play in standard browsers), each listing the features supported, such as caption formats, caption and description toggles, caption styling and position, and description language.

## 2.2 Text and wording

### Guideline 2.2.1 Text appearance: users can read visually rendered text

| Requirement                         | Type | Rule                                                                                                                                                                                                                               | WCAG 2.2 (derived)      |
| ----------------------------------- | ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| Blocks of text readable (minimum)   | C    | The authored presentation of blocks of text meets minimum values (`@@`, not set) for inline and block margin, line length and line height.                                                                                         | 1.4.8 (partial)         |
| Text style readable (minimum)       | C    | The authored text style meets minimum values (`@@`) for typeface, font size and width, decoration, letter spacing, capitalization, end-of-line hyphenation.                                                                        | none                    |
| Text contrast sufficient (minimum)  | C    | The default presentation of text, including text in images, meets a contrast measure (`@@`, algorithm not chosen). Except duplicates that pass, inactive elements, decoration, invisible text, incidental text in pictures, logos. | 1.4.3                   |
| Blocks of text adjustable           | C    | Margins, line length, line height and justification can be adjusted to `@@` values without loss of content or functionality. Except hard-coded raw text.                                                                           | 1.4.12, 1.4.8 (partial) |
| Text style adjustable               | C    | Typeface, font width, decoration, capitalization and hyphenation can be adjusted without loss. Except hard-coded raw text.                                                                                                         | 1.4.12 (partial)        |
| Text size adjustable                | C    | Text can be increased to at least 200% of the platform's default body-text size. Except when the same text elsewhere can be.                                                                                                       | 1.4.4                   |
| Text color adjustable               | C    | Text foreground and background colors can be adjusted without loss; the user agent or the author may provide this.                                                                                                                 | 1.4.8 (partial)         |
| Blocks of text readable (enhanced)  | S    | As the minimum, with enhanced `@@` values.                                                                                                                                                                                         | 1.4.8 (partial)         |
| Text style readable (enhanced)      | S    | As the minimum, with enhanced `@@` values.                                                                                                                                                                                         | none                    |
| Text contrast sufficient (enhanced) | S    | Text meets a higher `@@` contrast level than the minimum.                                                                                                                                                                          | 1.4.6                   |
| Text customizations retained        | S    | Exported, saved or printed content keeps user text customizations.                                                                                                                                                                 | none                    |

### Guideline 2.2.2 Text-to-speech: users can access text content and its meaning with text-to-speech tools

| Requirement                  | Type | Rule                                                                                                                                       | WCAG 2.2 (derived) |
| ---------------------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| Text detectable              | C    | All visible text has a programmatically determinable equivalent. Except where that would duplicate within the view.                        | 1.4.5 (partial)    |
| Human language detectable    | C    | The human language of all content in the view is programmatically determinable. Except no ISO 639 tag exists, or the technology can't say. | 3.1.1, 3.1.2       |
| Numerical metadata available | C    | Dates, temperatures, times and Roman numerals have enough written context and a programmatic equivalent to avoid confusion.                | none               |

### Guideline 2.2.3 Clear language: users can understand the content without having to process complex or unclear language

| Requirement                    | Type | Rule                                                                                                                                                                                | WCAG 2.2 (derived) |
| ------------------------------ | ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| Abbreviations explained        | C    | Abbreviations are explained at first use. Except abbreviations that became dictionary words, logos, or longer phrases covered by non-literal language.                              | 3.1.4 (AAA)        |
| Non-literal language explained | S    | Idioms, metaphors and other non-literal language have explanations or unambiguous alternatives. Except poetic, scriptural, artistic or expressive text.                             | 3.1.3 (partial)    |
| Summaries available            | C    | Long-form text of 300 or more words in paragraphs has a summary that is identifiable, concise, and explains its uncommon words. Only the first page of a multi-page text needs one. | 3.1.5 (partial)    |
| Common words used              | S    | Common words are used, with definitions for uncommon ones (languages with over 1,500 words and a high-frequency corpus). Except names of people and places.                         | 3.1.3 (partial)    |
| Diacritics available           | C    | Diacritics needed to identify the meaning of each word are available, in languages that drop them for proficient readers.                                                           | 3.1.6 (partial)    |
| No nested clauses              | S    | Sentences have no nested clauses. Except expressive text or legal information.                                                                                                      | none               |
| No unnecessary words           | S    | Sentences have no unnecessary words. Except expressive text.                                                                                                                        | none               |

Assertions: Clear language review (a pre-publication review that confirms the guideline's core requirements, verb tense, short paragraphs and topic sentences); Visual aids review.

## 2.3 Interactive components

### Guideline 2.3.1 Keyboard focus appearance: users can see which element has keyboard focus

| Requirement                         | Type | Rule                                                                              | WCAG 2.2 (derived)   |
| ----------------------------------- | ---- | --------------------------------------------------------------------------------- | -------------------- |
| Default focus indicator used        | S    | The focusable item uses the user agent's default focus indicator.                 | 2.4.7 (partial)      |
| Focus indicator contrast sufficient | C    | A custom focus indicator has sufficient adjacent contrast and change of contrast. | 2.4.13 (AAA), 1.4.11 |
| Focus indicator size sufficient     | S    | A custom focus indicator has sufficient size and adjacency.                       | 2.4.13 (AAA)         |

Assertion: Focus indicator style guide.

### Guideline 2.3.2 Pointer focus appearance: users can see the location of the pointer focus

| Requirement                             | Type | Rule                                                                                                                                         | WCAG 2.2 (derived) |
| --------------------------------------- | ---- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| Pointer activation indicated (minimum)  | C    | Where the platform shows no pointer indicator (touch, VR), activation of an element is visibly indicated.                                    | none               |
| Pointer activation indicated (enhanced) | S    | Where the platform shows no pointer indicator, the user can choose to always show one.                                                       | none               |
| Pointer contrast sufficient             | C    | Where the pointer appearance can be changed, the default pointer meets the `@@` non-text contrast requirement and is at least platform size. | none               |
| Default pointer used                    | S    | The user can stop the interface overriding the pointer appearance. Except where changing it is essential.                                    | none               |
| Pointer focus indicated                 | C    | There is a visible pointer indicator. Except over video with a way to unhide it, or when the pointer steers the view.                        | none               |
| Pointer visible                         | C    | The pointer indicator is always visible. Except over a still video, or when the pointer steers the view.                                     | none               |
| Enhanced pointer available              | S    | A more visible pointer than the platform default can be enabled, temporarily or permanently.                                                 | none               |

### Guideline 2.3.3 Navigating content

Users can determine where they are and move through content in a systematic and meaningful way regardless of input method.

| Requirement            | Type | Rule                                                                                                                                                            | WCAG 2.2 (derived) |
| ---------------------- | ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| Focus relevant         | C    | The focus order doesn't include hidden, static, or groups of repeated interactive elements.                                                                     | 2.4.3 (partial)    |
| Focus retained         | S    | After focusing an area such as a modal, the user can get back to all content in a limited number of steps.                                                      | none               |
| Focus order meaningful | C    | Focus moves in an order that preserves meaning and operability; the common keyboard techniques count as logical, and strict start-to-end order is not required. | 2.4.3              |

### Guideline 2.3.4 Expected behavior: users can interact with interactive elements that behave as expected

| Requirement                 | Type | Rule                                                                                                                                               | WCAG 2.2 (derived) |
| --------------------------- | ---- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| Consistent control location | S    | An interactive element with the same purpose keeps its visual position across pages/views. Except viewport or page variations, or process layouts. | 3.2.3 (partial)    |

Assertions: Consistent interactions (same function, same behaviour, indicators and labels; platform designs used); Conventional pattern used (components follow platform conventions; library components are tested for accessibility before use).

### Guideline 2.3.5 Control information

Users have information about interactive elements that is identifiable and usable visually and with assistive technology.

| Requirement                                 | Type | Rule                                                                                                                                                                     | WCAG 2.2 (derived)  |
| ------------------------------------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------- |
| Interactive element contrast sufficient     | C    | Visual information that identifies interactive elements and their states meets a minimum contrast ratio test. Except inactive elements or unmodified user agent styling. | 1.4.11              |
| Interactive element names available         | C    | Persistent names, including labels (text or icons), that identify the purpose are visually and programmatically available.                                               | 4.1.2, 2.4.6, 3.3.2 |
| Changes to elements notified                | C    | Changes to names, roles, values or states are visually and programmatically indicated.                                                                                   | 4.1.2               |
| Input constraints used                      | C    | Field constraints and conditions are available.                                                                                                                          | 3.3.2 (partial)     |
| Label included in programmatic name         | C    | The programmatic name includes the visual label.                                                                                                                         | 2.5.3               |
| Roles, values, states, properties available | C    | Accurate names, roles, values and states are available for interactive elements.                                                                                         | 4.1.2               |

## 2.4 Input / operation

### Guideline 2.4.1 Keyboard interface input: users can navigate and operate content using only the keyboard

| Requirement              | Type | Rule                                                                                                                                                                             | WCAG 2.2 (derived) |
| ------------------------ | ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| Keyboard operable        | C    | Every component that can be operated by pointer, voice, gesture, camera or other means can be operated by keyboard interface only.                                               | 2.1.1, 2.1.3 (AAA) |
| Keyboard accessible      | C    | All content reachable by other modalities (including hover and right-click content) is reachable by keyboard only.                                                               | 2.1.1 (partial)    |
| Bidirectional navigation | C    | The keyboard can always move forward to the next and back to the previous interactive element; symmetry is not required.                                                         | none               |
| Custom keys documented   | S    | Each custom keyboard command is documented on the page/view or in the process where it applies.                                                                                  | none               |
| No keyboard conflicts    | C    | Custom keyboard commands don't conflict with standard platform commands, or can be remapped.                                                                                     | 2.1.4 (partial)    |
| Focus placed             | S    | When focus moves to another context and back, it returns to its previous location if that still exists (for example, after closing a dialog).                                    | 2.4.3 (partial)    |
| No keyboard traps        | C    | Anything entered or activated by keyboard can be exited or deactivated with standard keyboard techniques. Except a non-standard technique described earlier.                     | 2.1.2              |
| Focus user-controlled    | C    | Focus moves only as a result of user interaction. Except auto-advance after a user action (such as TOTP fields), security or emergency warnings, or a warned and avoidable move. | 3.2.1 (partial)    |
| Focus movement relevant  | S    | Apart from skip links and similar aids, tabbing doesn't move focus onto content that was not visible before the tab.                                                             | none               |

### Guideline 2.4.2 Physical or cognitive effort when using keyboard

| Requirement                                 | Type | Rule                                                                                                                                           | WCAG 2.2 (derived) |
| ------------------------------------------- | ---- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| Navigation keys described                   | S    | Any keyboard action needed that is not a common keyboard navigation technique is described where it is needed or earlier.                      | none               |
| No repetitive adjacent interactive elements | S    | Adjacent interactive elements with the same outcome (such as a linked image and linked text to the same place) are combined. Except dismissal. | none               |

Assertion: Keyboard effort comparable (a review keeps keyboard command counts close to other modalities).

### Guideline 2.4.3 Pointer input

Pointer input is consistent, and all functionality works with simple pointer input in a time- and pressure-insensitive way.

| Requirement                     | Type | Rule                                                                                                                                                                                                                 | WCAG 2.2 (derived) |
| ------------------------------- | ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| Pointer activation controllable | C    | For simple pointer activation, either nothing runs on the down event, or completion is on the up event with cancel or undo, or the up event reverses the down event. Except when down-event completion is essential. | 2.5.2              |
| Simple pointer input available  | C    | Everything available through complex pointer input (double click, drag, swipe, multipoint, pressure or timing) is also available through simple pointer input without timing.                                        | 2.5.1, 2.5.7       |
| Consistent pointer cancellation | S    | Pointer cancellation works the same way for each interaction type across a set of pages/views. Except when it is essential.                                                                                          | none               |
| Pointer pressure not relied on  | C    | Specific pressure is not the only way to achieve a function. Except when essential, such as a paintbrush.                                                                                                            | none               |
| Pointer speed not relied on     | C    | Functionality doesn't rely solely on pointer speed. Except when essential.                                                                                                                                           | none               |

"Simple pointer input" is a single click, or a down-up pair with no movement between and no outcome difference based on timing; it is stricter than single pointer input (Glossary, simple pointer input).

### Guideline 2.4.4 Speech and voice input: provide alternatives to speech input and facilitate speech control

| Requirement              | Type | Rule                                                                                    | WCAG 2.2 (derived) |
| ------------------------ | ---- | --------------------------------------------------------------------------------------- | ------------------ |
| Speech not relied on     | C    | Content or functionality doesn't rely on speech alone. Except when speech is essential. | none               |
| Real-time text available | C    | Real-time bidirectional voice communication has a real-time text option.                | none               |

Assertion: Generated speech testing (voice systems are tested with synthetic speech).

### Guideline 2.4.5 Input operation

Users can use different input techniques and combinations and switch between them.

| Requirement                        | Type | Rule                                                                                                                             | WCAG 2.2 (derived) |
| ---------------------------------- | ---- | -------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| Hover or focus content dismissible | C    | Author-controlled hover or focus content can be dismissed without moving hover or focus, unless it obscures or replaces nothing. | 1.4.13             |
| Hover content persistent           | C    | The pointer can move over hover-triggered content without it disappearing.                                                       | 1.4.13             |
| Hover or focus content persistent  | S    | Hover or focus content stays until the trigger is removed, the user dismisses it, or it is no longer valid.                      | 1.4.13             |
| Path-based gesture not relied on   | C    | Path-based gestures are not the only way to achieve a function. Except when essential.                                           | 2.5.1              |
| Input method flexible              | S    | Users can switch input method at any time; a supported modality works everywhere except where another is essential.              | 2.5.6 (AAA)        |
| Body movements not relied on       | C    | Functionality doesn't rely solely on full or gross body movement, including shaking the device. Except when essential.           | 2.5.4 (partial)    |
| Eye tracking not relied on         | C    | Content and functionality don't rely solely on eye tracking. Except when essential.                                              | none               |
| Pointer accessible                 | C    | Selecting an element with the pointer moves keyboard focus to it, even when dragging away without activation.                    | none               |

### Guideline 2.4.6 Authentication: users have alternative authentication methods available

| Requirement                        | Type | Rule                                                                                                 | WCAG 2.2 (derived) |
| ---------------------------------- | ---- | ---------------------------------------------------------------------------------------------------- | ------------------ |
| Biometrics not relied on           | C    | Biometric identification (face, fingerprint, voice) is not the only way to identify or authenticate. | none               |
| Voice identification not relied on | C    | Voice identification is not the only way to identify or authenticate.                                | none               |

## 2.5 Error handling

### Guideline 2.5.1 Correct errors: users know about and can correct errors

| Requirement                       | Type | Rule                                                                                                                    | WCAG 2.2 (derived) |
| --------------------------------- | ---- | ----------------------------------------------------------------------------------------------------------------------- | ------------------ |
| Error notifications available     | C    | Programmatically determined errors are identified and described to the user in text.                                    | 3.3.1              |
| Error suggestions provided        | S    | Error messages suggest corrections. Except when that would jeopardize security or purpose.                              | 3.3.3              |
| Errors indicated in multiple ways | S    | Error messages use at least two of: a consistent symbol, a distinguishing color, a textual indication such as "Error:". | none               |
| Error messages persistent         | S    | Error messages persist until the error is resolved or dismissed.                                                        | none               |
| Errors associated                 | C    | Failed validation errors are visually and programmatically associated with the element that caused or can resolve them. | 3.3.1 (partial)    |
| Error messages collocated         | S    | Error messages sit next to the source, or focus moves to the message with a way to reach the input.                     | none               |

### Guideline 2.5.2 Prevent errors: users can review, confirm and fix information they submit

| Requirement                | Type | Rule                                                                                                                                                    | WCAG 2.2 (derived) |
| -------------------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| Errors preventable         | C    | Before submission users can review, confirm and correct all information, or review and correct validation errors. Except auto-saved or reversible data. | 3.3.4, 3.3.6 (AAA) |
| Submission status notified | S    | Users are told at submission whether it succeeded or failed.                                                                                            | 4.1.3 (partial)    |
| Data entry validated       | S    | Data is validated when the user leaves the field or when the form is submitted.                                                                         | none               |

Assertion: Error prevention review (for each form: minimal input, required fields marked, chunked long numbers, valid-only inputs, autocomplete, familiar units).

## 2.6 Animation and movement

### Guideline 2.6.1 Avoid physical harm: users do not experience physical harm from content

| Requirement                                | Type | Rule                                                                                                                                                           | WCAG 2.2 (derived)                    |
| ------------------------------------------ | ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| No flashing over threshold                 | C    | Flashes are below the general flash and red flash thresholds. Except essential flashing; a respected, accessibility-supported "no flashing" preference counts. | 2.3.1                                 |
| No flashing over threshold (no exceptions) | S    | Flashes are below the thresholds with no minimum size.                                                                                                         | 2.3.2 (AAA)                           |
| No visual motion                           | C    | No pseudo-motion or visual motion lasting longer than 5 seconds. Except when essential.                                                                        | 2.2.2 (partial), 2.3.3 (AAA, partial) |
| No visual motion (no exceptions)           | S    | No pseudo-motion or visual motion longer than 5 seconds, with no exception.                                                                                    | 2.3.3 (AAA, partial)                  |
| Trigger warning available                  | C    | Before flashing, motion over 5 seconds, or pseudo-motion, a warning is shown and the same information is available without the trigger.                        | none                                  |
| Haptic stimulation adjustable              | C    | Haptic feedback can be reduced or turned off.                                                                                                                  | none                                  |
| Audio shifting adjustable                  | C    | Audio shifting that creates a perception of motion can be paused or turned off.                                                                                | none                                  |

Assertion: Safe content review (warnings before violent, explicit or troubling content). The thresholds are the WCAG 2.2 ones (three flashes per second, or a combined area within 0.006 steradians of any 10 degree field), with an updated red flash definition (Glossary, general flash and red flash thresholds); research into the values is under way.

## 2.7 Layout

### Guideline 2.7.1 Recognizable layouts

Assertion only: Conventional layout review (layout conventions of similar products reviewed; a conventional or tested pattern is used).

### Guideline 2.7.2 User orientation: users can determine their location in content visually and with AT

| Requirement               | Type | Rule                                                                                                                                     | WCAG 2.2 (derived) |
| ------------------------- | ---- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| Page/view title available | C    | The page/view has a title that describes its name, topic or purpose. Except when the technology can't carry a title.                     | 2.4.2              |
| All steps listed          | C    | Each step of a multi-step process shows, visually and programmatically, a list of all steps. Except unknown or user-dependent sequences. | none               |
| Current step indicated    | C    | The current step is visually and programmatically indicated.                                                                             | none               |
| Page/view change notified | C    | A content-triggered change of page/view gives a visual change and a programmatic notification.                                           | none               |
| Return to start supported | S    | A visual and programmatic way back to the starting point of the conformance scope exists.                                                | none               |
| Return to start prominent | RP   | That mechanism is in a prominent visual and programmatic position, such as early in the DOM.                                             | none               |

Assertion: Location within product review (for example, breadcrumbs).

### Guideline 2.7.3 Structure: users can understand and navigate through the content using structure

| Requirement                            | Type | Rule                                                                                                           | WCAG 2.2 (derived)      |
| -------------------------------------- | ---- | -------------------------------------------------------------------------------------------------------------- | ----------------------- |
| Relationships detectable               | S    | Relationships of meaning between elements are conveyed programmatically.                                       | 1.3.1                   |
| Blocks of content available (minimum)  | C    | Meaningful blocks of content are programmatically determinable and have sufficient surrounding space.          | 1.3.1 (partial)         |
| Sections labeled                       | C    | Meaningful blocks have a semantically appropriate label defining their purpose, unless context makes it clear. | 2.4.6, 2.4.10 (partial) |
| Heading structure available            | S    | Meaningful blocks are organized with a logical heading hierarchy, where the technology supports levels.        | 1.3.1, 2.4.10 (partial) |
| Order detectable                       | C    | Ordered content, including lists and processes, has programmatic position markers.                             | 1.3.1 (partial)         |
| Blocks of content available (enhanced) | S    | Styling enhances the visual separation between meaningful blocks.                                              | none                    |

Assertions: Clear structure review; Key information usability testing (with people with cognitive and mental health disabilities).

### Guideline 2.7.4 No obstruction

| Requirement                 | Type | Rule                                                       | WCAG 2.2 (derived) |
| --------------------------- | ---- | ---------------------------------------------------------- | ------------------ |
| Overlay content dismissible | C    | New content that covers the main content can be dismissed. | none               |

## 2.8 Consistency across views

### Guideline 2.8.1 Consistency: users have consistent and alternative methods for navigation

| Requirement                  | Type | Rule                                                                                         | WCAG 2.2 (derived) |
| ---------------------------- | ---- | -------------------------------------------------------------------------------------------- | ------------------ |
| Consistent structural order  | S    | Structural components keep their relative order across pages/views in scope.                 | 3.2.3 (partial)    |
| Consistent navigation order  | S    | Items in repeated navigation blocks keep their relative order.                               | 3.2.3              |
| Consistent navigation labels | S    | Items in repeated navigation blocks are labelled consistently, apart from "current" markers. | 3.2.4 (partial)    |

## 2.9 Process and task completion

### Guideline 2.9.1 Avoid exclusionary cognitive tasks

| Requirement                           | Type | Rule                                                                                                                    | WCAG 2.2 (derived)               |
| ------------------------------------- | ---- | ----------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| Automated entry allowed               | C    | Automated input of personal information (names, passwords) by user agents, third-party tools or paste is not prevented. | 3.3.8 (partial), 1.3.5 (partial) |
| Cognitive test alternatives available | C    | Processes, such as login, can be completed without a cognitive function test.                                           | 3.3.8, 3.3.9 (AAA)               |

A cognitive function test is remembering, manipulating or transcribing information, such as memorization, transcription, spelling, calculation or puzzles; name, email and phone number don't count (Glossary). Unlike WCAG 2.2 SC 3.3.8, the core requirement has no object-recognition or personal-content exception.

### Guideline 2.9.2 Adequate time: users have enough time to read and use content

| Requirement          | Type | Rule                                                                                      | WCAG 2.2 (derived)   |
| -------------------- | ---- | ----------------------------------------------------------------------------------------- | -------------------- |
| Timeout adjustable   | S    | Time limits can be extended or disabled. Except essential limits.                         | 2.2.1                |
| No time limits       | S    | Processes have no time limits. Except essential ones such as auctions or timed exams.     | 2.2.3 (AAA)          |
| Time limits conveyed | S    | Users are told at the start that a limit exists, its length, and that it can be adjusted. | 2.2.6 (AAA, partial) |

Assertion: No unnecessary time limits.

### Guideline 2.9.3 Avoid deception: users do not encounter deception when completing tasks

| Requirement           | Type | Rule                                                                                                              | WCAG 2.2 (derived) |
| --------------------- | ---- | ----------------------------------------------------------------------------------------------------------------- | ------------------ |
| Preselections visible | C    | Preselected options that affect finance, privacy or safety are visible and programmatically available by default. | none               |

Assertions: Deceptive practices usability testing; Deceptive messaging expert review.

### Guideline 2.9.4 Retain information: users do not have to reenter information or redo work

| Requirement          | Type | Rule                                                                                                                                         | WCAG 2.2 (derived) |
| -------------------- | ---- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| Going back supported | S    | In a multi-step process users can step back and return without data loss. Except when that is essential to prevent.                          | none               |
| No redundant entry   | S    | Information already entered or provided in the same process is auto-populated or selectable. Except essential, security, or no longer valid. | 3.3.7              |
| Progress saved       | S    | Data entry and task processes can be saved and resumed from the current step. Except real-time events.                                       | none               |

WCAG 2.2 makes Redundant Entry Level A, while the draft makes it supplemental. Keep meeting SC 3.3.7 for the WCAG 2.2 result.

### Guideline 2.9.5 Complete tasks: users understand how to complete tasks

| Requirement                                 | Type | Rule                                                                                             | WCAG 2.2 (derived) |
| ------------------------------------------- | ---- | ------------------------------------------------------------------------------------------------ | ------------------ |
| Required action available                   | S    | The interface shows when input or action is required to proceed.                                 | 3.3.2 (partial)    |
| Information requirements available at start | S    | A multi-step process states the number of steps, needed resources, and an overview at the start. | none               |
| Process instructions available              | S    | Instructions needed to complete a multi-step process are available.                              | 3.3.2 (partial)    |

### Guideline 2.9.6 Unnecessary steps

Assertion only: Usability testing for unnecessary steps (with participants with cognitive or mental health disabilities).

## 2.10 Policy and protection

### Guideline 2.10.1 Risk: users understand the benefits, risks and consequences of options they select

| Requirement                             | Type | Rule                                                                                                                         | WCAG 2.2 (derived) |
| --------------------------------------- | ---- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| Consequences of choices explained       | C    | Choices with legal, financial, privacy or security consequences come with a description of benefits, risks and consequences. | none               |
| Consequences explained before agreement | S    | Those consequences are given before an agreement is finalized.                                                               | none               |

Assertions: Diverse disabilities considered; Algorithm inclusivity review.

### Guideline 2.10.2 Algorithms: users are not disadvantaged or harmed by algorithms

Assertions only: Inclusive data set (AI models trained on representative disability-related data); No harm from algorithms (usability testing and ethics reviews).

## 2.11 Help and feedback

### Guideline 2.11.1 Help available

| Requirement                           | Type | Rule                                                                                              | WCAG 2.2 (derived) |
| ------------------------------------- | ---- | ------------------------------------------------------------------------------------------------- | ------------------ |
| Consistent help available             | S    | Help is labelled consistently and in a consistent relative location, when help or contact exists. | 3.2.6              |
| Contextual help available             | S    | Context-sensitive help is available.                                                              | 3.3.5 (AAA)        |
| Disabled controls explained           | S    | Why a visible element is disabled is explained, with the actions that enable it.                  | none               |
| Sensory characteristics not relied on | C    | Instructions and help don't rely on shape, color, size, location, orientation or sound.           | 1.3.3              |

WCAG 2.2 makes Consistent Help Level A, while the draft makes it supplemental. Keep meeting SC 3.2.6 for the WCAG 2.2 result. Assertions: Supported decision-making review; Help usability testing.

### Guideline 2.11.2 Feedback

| Requirement                  | Type | Rule                                            | WCAG 2.2 (derived) |
| ---------------------------- | ---- | ----------------------------------------------- | ------------------ |
| Feedback mechanism available | S    | A mechanism to give feedback to authors exists. | none               |

## 2.12 User control

### Guideline 2.12.1 Assistive technology control

| Requirement                    | Type | Rule                                                                                                                            | WCAG 2.2 (derived) |
| ------------------------------ | ---- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| Assistive technology supported | C    | Content can be controlled with assistive and adaptive technology.                                                               | 4.1.2 (partial)    |
| User settings supported        | C    | Content responds to platform and user agent accessibility settings (font size, icon size, color scheme, magnification, motion). | none               |
| Virtual cursor supported       | C    | AT can reach content and interactions through alternative points of regard, such as a virtual cursor.                           | none               |
| Notifications adjustable       | S    | Notification timing or position can be changed, suppressed or saved. Except emergencies or essential ones.                      | none               |

### Guideline 2.12.2 Control text

No provision has progressed beyond Exploratory.

### Guideline 2.12.3 Adjustable viewport

| Requirement                      | Type | Rule                                                                                                                                            | WCAG 2.2 (derived) |
| -------------------------------- | ---- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| Orientation supported (minimum)  | C    | Content supports the platform's default orientation, or both orientations if there is none. Except real-world-aligned or essential orientation. | 1.3.4 (partial)    |
| Orientation supported (enhanced) | S    | Content supports both portrait and landscape.                                                                                                   | 1.3.4              |
| Text reflow supported            | S    | Blocks of text are legible at 320 CSS pixels without scrolling in the text direction. Except text that relies on 2D structure.                  | 1.4.10 (partial)   |
| Layout reflow supported          | S    | All content fits 320 CSS pixels without scrolling in two directions. Except 2D relationships, presentational canvases, multi-panel tools.       | 1.4.10             |

WCAG 2.2 makes Reflow Level AA, while the draft makes it supplemental. Keep meeting SC 1.4.10 for the WCAG 2.2 result.

### Guideline 2.12.4 Media control

| Requirement                     | Type | Rule                                                                                              | WCAG 2.2 (derived) |
| ------------------------------- | ---- | ------------------------------------------------------------------------------------------------- | ------------------ |
| Page/view audio adjustable      | C    | Auto-playing audio can be paused, stopped, and its volume set independently of the system volume. | 1.4.2              |
| Media alternatives searchable   | S    | Media alternatives can be searched and queried.                                                   | none               |
| Media alternatives controllable | S    | Closed captions and audio descriptions can be turned on and off.                                  | none               |
| Media chapters available        | S    | Audio or video of five minutes or longer can be navigated by chapters. Except undivided music.    | none               |

### Guideline 2.12.5 Content changes: users know when content changes

| Requirement                   | Type | Rule                                                                                                                                                                                                                 | WCAG 2.2 (derived)   |
| ----------------------------- | ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| Change of content notified    | C    | Meaningful visual changes are conveyed programmatically: changes earlier in reading order or process, notifications and status or error messages, changes in amount, meaning or audience. Except continuous changes. | 4.1.3 (partial)      |
| Change of focus notified      | C    | When focus changes on focus or automatically, the user is notified visually and programmatically.                                                                                                                    | 3.2.1 (partial)      |
| Change of user agent notified | C    | A content-triggered device or user agent change is announced before it happens.                                                                                                                                      | 3.2.5 (AAA, partial) |

## Conformance (§ 3, Developing)

- **One conformance level.** "For a specified conformance scope to conform to WCAG 3, all core requirements MUST be satisfied" (§ 3.2). The editor's note moves levels from conformance to reporting, so there is no A, AA or AAA.
- **Normative content.** Provisions are normative; introductory material, appendices, non-normative sections, diagrams, examples and notes are informative (§ 3.1).
- **Accessibility supported.** Methods count only when they are supported by the user agents and AT in the accessibility support set (§ 3.2.1; Glossary, accessibility supported). WCAG 3 has a **default** set (common browsers, AT and settings that support English content and web methods) and **alternative** sets for other languages, regions or technologies (§ 3.2.1.1). The set MUST be in conformance claims. In closed environments or with non-web technology, the draft recommends putting it in public accessibility statements too. The draft notes the default set "has not yet been defined" (§ 3.2.1.1, editor's note).
- **Defined scope.** A claim is optional. When one is made, the scope MUST identify the product, pages/views, content, functionality or components, and SHOULD state the boundaries when it covers only part of a product. Everything testable in scope MUST be included (§ 3.2.2). Limited scopes are pages/views, processes, paths and components; paths and components are still being defined. For a process, every unique step MUST be in the set of pages/views (§ 3.2.2; Glossary, conformance scope, process).
- **Views.** A view is content actively available in a viewport, including scrolled or conditionally shown content that leaves the rest available. A modal dialog, or navigating to another page, makes a new view (Glossary, view).

## Reporting (§ 4, Exploratory)

Reporting tiers are informative and exploratory; they are reporting tiers, not conformance levels (§ 4).

- **Core requirement tags** (§ 4.1.1): Physical harm, Risk (financial, medical, legal, privacy or security), Barrier (can stop someone from proceeding) and Friction (hinders; several together can stop someone). A tag reflects the maximum potential severity of a failure. The Working Draft does not yet print a tag on each requirement.
- **Assertion tags** (§ 4.1.3): Content (reviews, usability testing, AT testing, style guides) and Organization (training, public accessibility statements). The Working Group has not decided whether assertions can be required for conformance.
- **Tiers** (§ 4.1.4), each cumulative: 1 Avoid physical harm (Physical harm and Risk met); 2 Foundational access (plus Barrier); 3 Conformance (plus Friction, so all core requirements); 4 Bronze, 5 Silver and 6 Gold, which add a to-be-determined number of supplemental requirements and assertions, with Gold adding the organization assertions.
- **Alternative: scoring.** The Explainer floats a weighted score instead: 3 for Physical harm and Risk, 2 for Barrier, 1 for Friction and others, as the percentage met, with Bronze, Silver and Gold awards above conformance (Explainer § 7.1). It is not part of the draft.
- **Functional performance statements** (§ 4.2, exploratory): each provision will be tagged with needs such as use with limited or no vision, hearing, speech, manipulation, focus, memory, language, executive function or reasoning, or without perception of color, and with hypo- or hypersensitivity.
- **Assertion contents.** An assertion states the process, the date of the assertion, when the procedure was done, its scope, a contact, and the requirements or guidelines it supports (Explainer § 5.3.2). The draft's assertions list what must be public (who asserts, the dates) and what to keep internally.

## Building and testing to WCAG 3.0

1. **Opt in and pin.** Record "W3C Accessibility Guidelines (WCAG) 3.0, W3C Working Draft 10 September 2026" (or the newer Working Draft you re-pinned) and its dated URI `https://www.w3.org/TR/2026/WD-wcag-3.0-20260910/`. Record the provision set (core; core plus named supplemental; or core, supplemental and assertions).
2. **Keep WCAG 2.2 AA alongside.** Build to the WCAG 2.2 AA criteria too, unless the user explicitly opts out; laws and policies cite WCAG 2. Where the draft makes a WCAG 2.2 AA criterion supplemental (Reflow, Redundant Entry, Consistent Help), the WCAG 2.2 result still needs it.
3. **Define scope and support set.** List the pages/views, processes (every unique step) and components (§ 3.2.2). State the accessibility support set you test with, since the default set is not yet defined (§ 3.2.1.1).
4. **Build every core requirement that applies.** Work guideline by guideline through the tables above. Read each "Applies when" and "Except when"; record not-applicable requirements with the reason.
5. **Handle placeholders explicitly.** Where the draft writes `@@` (text appearance values, text contrast, pointer contrast), the draft gives no pass/fail value. As this skill's interim practice, not the draft's, test against the WCAG 2.2 counterpart (SC 1.4.3 for text contrast, 1.4.11 for non-text contrast, 1.4.12 spacing for adjustable text) and report "value not set in the draft; tested against WCAG 2.2 SC x".
6. **Test.** Use the requirement text as the rule. The WCAG 3 Support Material page for each requirement gives a draft test procedure and expected results; it is informative and in progress. Tests may be quantifiable or qualitative (Explainer § 6.1).
7. **Supplemental requirements and assertions** only when asked. Write each assertion with the public fields the draft lists, and never use one in place of a core requirement.
8. **Report** each core requirement as pass, fail or not applicable. Where tiers help, report the tier reached (1 to 3), labelled exploratory. Don't claim Bronze, Silver or Gold: their thresholds are TBD (§ 4.1.4).

### Report wording

Title the result "Results against the W3C Accessibility Guidelines (WCAG) 3.0 Working Draft of 10 September 2026 (work in progress)". Give the scope, the accessibility support set, the provision set and the date tested. Keep it next to, never instead of, the WCAG 2.2 conformance result. Don't write "conforms to WCAG 3.0" or "WCAG 3.0 compliant".

## Common mistakes

- Treating the draft as stable: requirements "are likely to be added, combined, and removed", and their text will change (§ 1.1.1).
- Building Exploratory provisions from the Editor's Draft as if they were in the Working Draft.
- Dropping a WCAG 2.2 AA criterion because the draft makes it supplemental or omits it.
- Inventing a contrast algorithm or text-appearance values the draft has not set.
- Reading the derived WCAG 2.2 column as a W3C mapping.
