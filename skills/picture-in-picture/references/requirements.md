# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Picture-in-Picture

Source: https://www.w3.org/TR/picture-in-picture/

This specification provides APIs to allow websites to create a floating video window always on top of other windows so that users may continue consuming media while they interact with other content sites, or applications on their device.

- **3.2. Picture-in-Picture.** It is RECOMMENDED that video frames are not rendered in the page and in the Picture-in-Picture window at the same time but if they are, they MUST be kept in sync.
- **3.2. Picture-in-Picture.** When a video is played in Picture-in-Picture mode, the states SHOULD transition as if it was played inline.
- **3.2. Picture-in-Picture.** That means that the events SHOULD fire at the same time, calling methods SHOULD have the same behaviour, etc.
- **3.2. Picture-in-Picture.** Styles applied to video (such as opacity, visibility, transform, etc.) MUST NOT apply in the Picture-in-Picture window.
- **3.2. Picture-in-Picture.** When a DocumentOrShadowRoot ’s Picture-in-Picture element is set, the Picture-in-Picture window MUST be visible, even when the DocumentOrShadowRoot ’s relevant global object ’s associated Document ’s visibility state is "hidden".
- **3.2. Picture-in-Picture.** The user agent SHOULD provide a way for users to manually close the Picture-in-Picture window.
- **3.3. Exit Picture-in-Picture.** When the exit Picture-in-Picture algorithm is invoked, the user agent MUST run the following steps: If pictureInPictureElement is null , throw a InvalidStateError and abort these steps.
- **3.3. Exit Picture-in-Picture.** The website SHOULD be in control of the experience if it is website initiated.
