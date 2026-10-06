# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## EditContext API

Source: https://www.w3.org/TR/edit-context/

EditContext is an API that allows authors to more directly participate in the text input process.

- **1.1 Background and Motivation.** When an app wants to consume text input from these various sources, it must first provide a view of its currently editable text to the operating system.
- **1.2.1 EditContext state.** composition end must always be greater than or equal to composition start .
- **1.2.1 EditContext state.** text format is a struct that indicates decorative properties that should be applied to the ranges of text .
- **1.2.1 EditContext state.** The struct contains: range start which is an offset into text that respresents the position before the first codepoint that should be decorated.
- **1.2.1 EditContext state.** range end which is an offset into text that respresents the position after the last codepoint that should be decorated.
- **1.2.2 Association and activation.** Note An EditContext keeps its associated element alive, so developers should be aware that assigning an EditContext to an element's editContext property will prevent the element from being garbage collected until the property is cleared or the EditContext is garbage collected.
- **1.2.3 Differences for an EditContext editing host.** There are also some ways that an EditContext editing host differs from other types of editing hosts : When the Document being edited has an active EditContext , the user agent must not update the DOM as a direct result of a user action in the EditContext editing host (e.g., keyboard input in an editable region, deleting or formatting text, ...).
- **1.2.3 Differences for an EditContext editing host.** When the Document being edited has an active EditContext , the user agent must not fire the input event against the EditContext editing host as a direct result of user action event as specified in [ uievents ].
