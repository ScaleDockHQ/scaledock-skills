# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Screen Orientation

Source: https://www.w3.org/TR/screen-orientation/

The Screen Orientation specification standardizes the types and angles for a device's screen orientation, and provides a means for locking and unlocking it. The API, defined by this specification, exposes the current type and angle of the device's screen orientation, and dispatches events when it changes. This enables web applications to programmatically adapt the user experience for multiple screen orientations, working alongside CSS. This API is particularly useful for applications such as computer games, where users physically rotate the device, but the screen orientation itself should not change. The API restricts locking the screen orientation only if certain pre-lock conditions are met

- **5.2.** When the lock () method is invoked with OrientationLockType orientation , the user agent MUST run the following steps.
- **5.3.** unlock() method When the unlock () method is invoked, the user agent MUST run the following steps: Let document be this 's relevant global object 's associated Document .
- **8.1.** Initializing the ScreenOrientation object When a browsing context context is created, the user agent MUST : Let screenOrientation be context 's associated ScreenOrientation .
- **8.2.** Rejecting a document's current lock promise When steps require to reject and nullify the current lock promise of Document document with a DOMString exceptionName , the user agent MUST : Assert : [[orientationPendingPromise]] is not null .
- **8.3.** orientation to Document document , the user agent MUST perform the following steps: If document stops being fully active while in parallel , and [[orientationPendingPromise]] is not null , reject and nullify the current lock promise of document with an " AbortError ".
- **8.6.** Handling unloading documents Whenever the unloading document cleanup steps run with a document , the user agent MUST run the following steps: If document is not a top-level traversable 's active document , abort these steps.
- **9..** Interaction with Fullscreen API A user agent MUST restrict the use of lock () to simple fullscreen documents as a pre-lock condition .
- **10..** A user agent SHOULD require installed web applications to be presented in the "fullscreen" display mode as a pre-lock condition .
