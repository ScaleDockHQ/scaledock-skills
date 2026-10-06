# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Media Capture and Streams

Source: https://www.w3.org/TR/mediacapture-streams/

This document defines a set of JavaScript APIs that allow local media, including audio and video, to be requested from a platform.

- **2. Conformance.** The key words MAY , MUST , MUST NOT , NOT REQUIRED , and SHOULD in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **3. Terminology.** The platform SHOULD try to minimize such excursions as far as possible, but will continue to deliver media even when a temporary or permanent condition exists that prevents satisfying the constraints.
- **4.2 MediaStream.** The track set MUST contain the MediaStreamTrack objects that correspond to the tracks of the stream.
- **4.2 MediaStream.** To add a track track to a MediaStream stream , the User Agent MUST run the following steps: If track is already in stream's track set , then abort these steps.
- **4.2 MediaStream.** To remove a track track from a MediaStream stream , the User Agent MUST
- **Attributes.** id of type DOMString , readonly The id attribute MUST return the value to which it was initialized when the object was created.
- **Attributes.** When a MediaStream is created, the User Agent MUST generate an identifier string, and MUST initialize the object's id attribute to that string, unless the object is created as part of a special purpose algorithm that specifies how the stream id must be initialized.
- **Attributes.** To avoid fingerprinting, implementations SHOULD use the forms in section 4.4 or 4.5 of RFC 4122 when generating UUIDs.

## MediaStream Image Capture

Source: https://www.w3.org/TR/image-capture/

This document specifies methods and camera settings to produce photographic image capture. The source of images is, or can be referenced via a MediaStreamTrack .

- **3.2. Methods.** The MediaStreamTrack passed to the constructor MUST have its kind attribute set to "video" otherwise a DOMException of type NotSupportedError will be thrown.
- **3.2. Methods.** When this method is invoked, the user agent MUST run the following steps: If the readyState of track provided in the constructor is not live , return a promise rejected with a new DOMException whose name is InvalidStateError , and abort these steps.
- **3.2. Methods.** In this case, the stopping and restarting of streaming SHOULD cause onmute and onunmute events to fire on the track in question.
- **5.1. Members.** The UA MUST select the closest height value to this setting if it supports a discrete set of height options.
- **5.1. Members.** The UA MUST select the closest width value to this setting if it supports a discrete set of width options.
- **9.2.1. Members.** Each string MUST be one of the members of MeteringMode .
- **9.2.1. Members.** Each string MUST be the members of MeteringMode .
- **9.2.1. Members.** In that case the UA MUST NOT expose the pan value range but MAY provide an empty MediaSettingsRange dictionary to indicate that the underlying video source supports pan .

## MediaStream Recording

Source: https://www.w3.org/TR/mediastream-recording/

This document defines a recording API for use with MediaStream s.

- **2.1. Constructors.** MediaRecorder(MediaStream stream, optional MediaRecorderOptions options = {}) When the MediaRecorder() constructor is invoked, the User Agent MUST run the following steps: Let stream be the constructor’s first argument.
- **2.2. Attributes.** The User Agent SHOULD be able to play back any of the MIME types it supports for recording.
- **2.3. Methods.** start(optional unsigned long timeslice) When a MediaRecorder object’s start() method is invoked, the UA MUST run the following steps: Let recorder be the MediaRecorder object on which the method was invoked.
- **2.3. Methods.** The UA SHOULD constrain the configuration of recorder so that the video encoder follows the below rules: If videoKeyFrameIntervalDuration is not null and videoKeyFrameIntervalCount is null , the video encoder produces a keyframe on the first frame arriving after videoKeyFrameIntervalDuration milliseconds elapsed since the last key frame.
- **2.3. Methods.** If the User Agent does not support the specified combination of media type/subtype, codecs and container, then it MUST abort the remaining steps and queue a task, using the DOM manipulation task source, that runs the following steps: Inactivate the recorder with recorder .
- **2.3. Methods.** If at any point stream ’s isolation properties change so that MediaRecorder is no longer allowed access to it, the UA MUST stop gathering data, discard any data that it has gathered, and queue a task, using the DOM manipulation task source, that runs the following steps: Inactivate the recorder with recorder .
- **2.3. Methods.** If at any point, a track is added to or removed from stream ’s track set , the UA MUST stop gathering data, and queue a task,
- **2.3. Methods.** If the UA at any point is unable to continue gathering data for reasons other than isolation properties or stream ’s track set , it MUST stop gathering data, and queue a task, using the DOM manipulation task source, that runs the following steps: Inactivate the recorder with recorder .

## Media Capture from DOM Elements

Source: https://www.w3.org/TR/mediacapture-fromelement/

This document defines how a stream of media can be captured from a DOM element, such as a video , audio , or canvas element, in the form of a MediaStream [ GETUSERMEDIA ].

- **2. Conformance.** The key words MUST and MUST NOT in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **3..** A MediaStreamTrack MUST end prior to being removed from the MediaStream .
- **3..** A captured MediaStreamTrack MUST have a muted attribute set to true if its corresponding source track does not have available and accessible content.
- **3..** Captured audio from an element with an effective playback rate other than 1.0 MUST be time-stretched.
- **4..** Content from a canvas that is not origin-clean MUST NOT be captured.
- **4..** A captured stream MUST immediately cease to capture content if the origin-clean flag of the source canvas becomes false after the stream is created by captureStream () .
- **4..** The captured MediaStreamTrack MUST become muted , producing no new content while the canvas remains in this state.
- **4..** In order to support manual control of frame capture with the requestFrame () method, browsers MUST support a value of 0 for frameRequestRate .

## MediaStreamTrack Insertable Media Processing using Streams

Source: https://www.w3.org/TR/mediacapture-transform/

This API defines an API surface for manipulating the bits on MediaStreamTrack s carrying raw data.

- **2.1. MediaStreamTrackProcessor.** In this case, [[numDiscardedFrames]] MUST be incremented accordingly.
- **2.1.5. Handling interaction with the track.** When the [[track]] of a MediaStreamTrackProcessor processor delivers a frame to processor , the UA MUST execute the handleNewFrame algorithm with processor as parameter.
- **2.1.5. Handling interaction with the track.** [[numDiscardedFrames]] MUST be incremented accordingly.
- **2.1.7. Constructor.** Also, a MediaStreamTrack MUST not be garbage collected if it is referenced from a data holder that is being transferred.
- **2.2.4. Attributes.** When this attribute is accessed for the first time, it MUST be initialized with the following steps: Initialize this .
- **2.2.5.2. Constrainable properties.** As a capability, max MUST reflect the largest width a VideoFrame may have, and min MUST reflect the smallest width a VideoFrame may have.
- **2.2.5.2. Constrainable properties.** As a capability, max MUST reflect the largest height a VideoFrame may have, and min MUST reflect the smallest height a VideoFrame may have.
- **2.2.5.2. Constrainable properties.** As a capability min MUST be zero and max MUST be the maximum frame rate supported by the system.

## MediaStreamTrack Content Hints

Source: https://www.w3.org/TR/mst-content-hint/

This specification extends MediaStreamTrack to provide an optional hint about the user's preference on how the media should be treated when insufficient resources for perfect reproduction are available. This optional hint permits MediaStreamTrack sinks such as RTCPeerConnection (defined in [ webrtc ]) or MediaRecorder (defined in [ mediastream-recording ]) that process a track's audio or video content to choose processing parameters that are appropriate to the user's preferences.

- **2. Conformance.** The key words MAY , MUST , SHOULD , and SHOULD NOT in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **4.1 Behavior of a MediaStreamTrack.** When setting a contentHint value for a MediaStreamTrack , the UA MUST apply a default as follows: For an audio track with the value "music" , and for constraints echoCancellation, autoGainControl and noiseSuppression apply a default of "false".
- **4.1 Behavior of a MediaStreamTrack.** Whenever the "apply constraints" algorithm is subsequently run, the UA MUST choose the remembered value t if it is now a permitted value.
- **4.2 Degradation preference when encoding.** The user agent SHOULD prefer reducing the resolution in order to optimize for video quality and performance within network constraints.
- **4.2 Degradation preference when encoding.** The user agent SHOULD prefer reducing the framerate in order to optimize for video quality and performance within network constraints.
- **4.2 Degradation preference when encoding.** The user agent SHOULD prefer reducing a balance of framerate and resolution in order to optimize for video quality and performance within network constraints.
- **4.2 Degradation preference when encoding.** The user agent SHOULD NOT prefer reducing the framerate or resolution for quality and performance reasons, but MAY drop frames before encoding if necessary not to overuse network and encoder resources.
- **4.3 Behavior of an RTCPeerConnection.** An RTCRtpSender transmitting a MediaStreamTrack for which a contentHint attribute has been set MUST use the following degradation preferences, unless an explicit degradationPreference attribute has been set in the sender's parameters: For a video track with the attribute value "motion" , use " maintain-framerate ".

## Region Capture

Source: https://www.w3.org/TR/mediacapture-region/

This document introduces an API for cropping a video track derived from display-capture of the current tab.

- **1. Conformance.** The key words MUST and MUST NOT in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **5.2 CropTarget Definition.** The user agent MUST return a Promise p .
- **5.2 CropTarget Definition.** The user agent MUST resolve p only after it has finished all the necessary internal propagation of state associated with the new CropTarget , at which point the user agent MUST be ready to receive the new CropTarget as a valid parameter to cropTo .
- **6.1 BrowserCaptureMediaStreamTrack.** We specify that if the user chooses to capture a browser display-surface , the user agent MUST instantiate the video track as either MediaStreamTrack , or as some sub-class of MediaStreamTrack , and that cropTo MUST be exposed on this track.
- **6.1 BrowserCaptureMediaStreamTrack.** Whenever cropTo is invoked, the user agent MUST execute the following algorithm: If cropTarget is neither a valid CropTarget nor null , the user agent MUST return a Promise rejected with an UnknownError .
- **6.1 BrowserCaptureMediaStreamTrack.** If cropTarget is either undefined or a valid CropTarget , the user agent MUST update this video track's crop-state according to cropTarget : If cropTarget is set to undefined , the user agent MUST stop cropping.
- **6.1 BrowserCaptureMediaStreamTrack.** If cropTarget is a valid CropTarget , the user agent MUST start cropping this video track to the contours of the element referenced by this CropTarget .
- **6.1 BrowserCaptureMediaStreamTrack.** The user agent MUST resolve p when it is guaranteed that no more frames cropped (or uncropped) according to PRE-STATE will be delivered to the application, and that any additional frames delivered to the application will therefore be cropped (or uncropped) according to either POST-STATE or a later state.

## Viewport Capture

Source: https://www.w3.org/TR/mediacapture-viewport/

This document defines how a browser viewport can be used as the source of a media stream using getViewportMedia , an extension to the Screen Capture API [ screen-capture ].

- **2. Conformance.** The key words MAY , MUST , and MUST NOT in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **5.1 MediaDevices Additions.** The user agent MUST apply any provided options to the produced media after permission has been granted.
- **5.1 MediaDevices Additions.** If the user agent knows no audio will be shared for the lifetime of the stream it MUST NOT include an audio track in the resulting stream.
- **5.1 MediaDevices Additions.** The user agent MUST reject audio-only requests.
- **5.1 MediaDevices Additions.** When the getViewportMedia () method is called, the user agent MUST run the following steps: If the current settings object 's cross-origin isolated capability is false, return a promise rejected with a DOMException object whose name attribute has the value SecurityError .
- **5.1 MediaDevices Additions.** The provided media MUST include precisely one video track, which MUST be a live-capture of the browser display surface of the relevant global object 's associated Document 's top-level browsing context 's viewport .
- **5.1 MediaDevices Additions.** The provided media MUST include at most one audio track, which, if provided, MUST be the combined audio produced by the sum of documents that consist of the relevant global object 's associated Document 's top-level browsing context 's active document , and all active documents in nested browsing context s of the relevant global object 's associated Document 's top-level browsing context .
- **5.1 MediaDevices Additions.** This audio track MUST NOT be included if audio was not specified in requestedMediaTypes , or if it was specified as false .

## Screen Capture

Source: https://www.w3.org/TR/screen-capture/

This document defines how a user's display, or parts thereof, can be used as the source of a media stream using getDisplayMedia , an extension to the Media Capture API [ GETUSERMEDIA ].

- **2. Conformance.** The key words MAY , MUST , MUST NOT , and SHOULD in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **5.1 MediaDevices Additions.** The user agent MUST let the end-user choose which display surface to share out of all available choices every time, and MUST NOT use any MediaTrackConstraints in options .
- **5.1 MediaDevices Additions.** The user agent MUST still offer the user unlimited choice of any display surface .
- **5.1 MediaDevices Additions.** audio MUST be applied to the media chosen by the user only after the user has made their selection.
- **5.1 MediaDevices Additions.** If the user agent knows no audio will be shared for the lifetime of the stream it MUST NOT include an audio track in the resulting stream.
- **5.1 MediaDevices Additions.** The user agent MUST reject audio-only requests.
- **5.1 MediaDevices Additions.** When the getDisplayMedia () method is called, the user agent MUST run the following steps: Let mediaDevices be this .
- **5.1 MediaDevices Additions.** The provided media MUST include precisely one video track.

## Capture Handle - Bootstrapping Collaboration when Screensharing

Source: https://www.w3.org/TR/capture-handle-identity/

This document proposes a mechanism by which an application APP can opt-in to exposing certain information with another application CAPTR , if CAPTR is screen-capturing the tab in which APP is running. It describes a mechanism for tab capture or window capture .

- **1. Conformance.** The key words MUST and MUST NOT in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
- **4.1 CaptureHandleConfig.** WebIDL dictionary CaptureHandleConfig { boolean exposeOrigin = false; DOMString handle = ""; sequence < DOMString > permittedOrigins = []; }; exposeOrigin If true , the user agent MUST expose the captured application's origin through the origin field of CaptureHandle .
- **4.1 CaptureHandleConfig.** If false , the user agent MUST NOT expose the captured application's origin.
- **4.1 CaptureHandleConfig.** handle The user agent MUST expose this value as handle .
- **4.2 MediaDevices.setCaptureHandleConfig().** WebIDL partial interface MediaDevices { undefined setCaptureHandleConfig (optional CaptureHandleConfig config = {}); }; setCaptureHandleConfig The user agent MUST run the following validations: If handle is set to an invalid value, the user agent MUST reject by raising TypeError .
- **4.2 MediaDevices.setCaptureHandleConfig().** If permittedOrigins is set to an invalid value, the user agent MUST reject by raising NotSupportedError .
- **4.2 MediaDevices.setCaptureHandleConfig().** If the call to setCaptureHandleConfig () is not from the top-level browsing context , the user agent MUST reject by raising InvalidStateError .
- **4.2 MediaDevices.setCaptureHandleConfig().** If all validations passed, the user agent MUST accept the new config.

## Audio Output Devices API

Source: https://www.w3.org/TR/audio-output/

This document defines a set of JavaScript APIs that let a Web application manage how audio is rendered on the user audio output devices.

- **2. HTMLMediaElement Extensions.** When the HTMLMediaElement constructor is invoked, the user agent MUST add the following initializing step: Let the element have a [[SinkId]] internal slot, initialized to "" .
- **Attributes.** On getting, the attribute MUST return the value of the [[SinkId]] slot.
- **Methods.** Note If this substep is successful and the media element's paused attribute is false, audio MUST stop playing out of the device represented by the element's sinkId attribute and will start playing out of the device identified by sinkId If the preceding substep failed, reject p with a new DOMException whose name is AbortError , and abort these substeps.
- **Methods.** When the selectAudioOutput method is called, the user agent MUST run the following steps: If the relevant global object of this does not have transient activation , return a promise rejected with a DOMException object whose name attribute has the value InvalidStateError .
- **Methods.** Once a device is exposed after a call to selectAudioOutput , it MUST be listed by enumerateDevices () for the current browsing context.
- **Methods.** If the promise returned by selectAudioOutput is resolved, then the user agent MUST ensure the document is both immediately allowed to play media in an HTMLMediaElement , and immediately allowed to start an AudioContext , without needing any additional user gesture.
- **4.2 Obtaining Consent.** Implementations MUST also support implicit consent via the getUserMedia () permission prompt; when an audio input device is permitted and opened via getUserMedia () , this also permits access to any associated audio output devices (i.e., those with the same groupId ).
- **5. Conformance.** The key words MAY and MUST in this document are to be interpreted as described in BCP 14 [ RFC2119 ] [ RFC8174 ] when, and only when, they appear in all capitals, as shown here.
