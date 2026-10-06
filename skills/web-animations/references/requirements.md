# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Web Animations Module Level 2

Source: https://www.w3.org/TR/web-animations-2/

This specification defines a model for synchronization and timing of changes to the presentation of a Web page. This specification also defines an application programming interface for interacting with this model and it is expected that further specifications will define declarative means for exposing these features. CSS is a language for describing the rendering of structured documents (such as HTML and XML) on screen, on paper, etc.

- **4.12. The EffectCallback callback function.** When this is null , the function SHOULD remove the effect.
- **Document conventions.** The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119.
- **Document conventions.** Advisements are normative sections styled to evoke special attention and are set apart from other normative text with <strong class="advisement"> , like this: UAs MUST provide an accessible alternative.
- **2.4.1. Setting the timeline of an animation.** Issue: If new timeline is null, we should ensure that custom effects get called with an unresolved iteration progress (unless a subsequent change in the same script execution context makes this redundant).
- **2.4.2. Setting the target effect of an.** If old effect is attached to another animation in the same task then we should probably not do an extra callback with unresolved .
- **2.4.7. Playing an animation.** If a user agent determines that animation is immediately ready , it may schedule the above task as a microtask such that it runs at the next microtask checkpoint , but it must not perform the task synchronously.
- **2.5.2. The active interval.** The subsequent diagram should also refer to the animation effect start time as opposed to the animation start time .
- **2.7. Animation effect speed control.** For runtime speed control the playback rate of the animation should be used.

## Web Animations Level 1

Source: https://www.w3.org/TR/web-animations-1/

This specification defines a model for synchronization and timing of changes to the presentation of a Web page. This specification also defines an application programming interface for interacting with this model and it is expected that further specifications will define declarative means for exposing these features. CSS is a language for describing the rendering of structured documents (such as HTML and XML) on screen, on paper, etc.

- **6.6.3. Processing a keyframes argument.** User agents that provide support for diagnosing errors in content SHOULD produce an appropriate warning highlighting the invalid property value.
- **8. Interaction with page display.** If provided, this behavior SHOULD be achieved by adjusting the time values of any timelines that track wallclock time.
- **Document conventions.** The key words “MUST”, “MUST NOT”, “REQUIRED”, “SHALL”, “SHALL NOT”, “SHOULD”, “SHOULD NOT”, “RECOMMENDED”, “MAY”, and “OPTIONAL” in the normative parts of this document are to be interpreted as described in RFC 2119.
- **Document conventions.** Advisements are normative sections styled to evoke special attention and are set apart from other normative text with <strong class="advisement"> , like this: UAs MUST provide an accessible alternative.
- **1.1. Use cases.** The use cases for the programming interface include the following: Inspecting running animations Often Web applications must wait for certain animated effects to complete before updating some state.
- **2. Specification conventions.** Where this specification does not specifically link to a procedure, text that requires the user agent to update a property such as, "make animation ’s start time unresolved ", should be understood to refer to updating the property directly without invoking any related procedure.
- **3. Web Animations model overview.** At a time of 6 seconds, it will calculate that the animation should be half-way through its second iteration and produces the result 0.5.
- **4.3. Timelines.** For example, a CSS animation with a duration of zero, may dispatch both an animationstart and an animationend event and the order of these events should be preserved.
