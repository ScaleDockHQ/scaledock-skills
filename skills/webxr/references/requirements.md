# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## WebXR Device API

Source: https://www.w3.org/TR/webxr/

This specification describes support for accessing virtual reality (VR) and augmented reality (AR) devices, including sensors and head-mounted displays, on the Web.

- **2.1. XR device.** Each XR device has a set of granted features for each XRSessionMode in its list of supported modes , which is a set of feature descriptors which MUST be initially an empty set .
- **2.1. XR device.** The user agent has a list of immersive XR devices (a list of XR device ), which MUST be initially an empty list .
- **2.1. XR device.** The user agent MUST have a default inline XR device , which is an XR device that MUST contain "inline" in its list of supported modes .
- **2.1. XR device.** The default inline XR device MUST NOT report any pose information, and MUST NOT report XR input source s or events other than those created by pointer events.
- **2.1. XR device.** The user agent MUST have a inline XR device , which is an XR device that MUST contain "inline" in its list of supported modes .
- **2.1. XR device.** These objects SHOULD NOT be directly accessed in steps that are not running in parallel .
- **3.1. navigator.xr.** partial interface Navigator { [ SecureContext , SameObject ] readonly attribute XRSystem xr ; }; The xr attribute’s getter MUST return the XRSystem object that is associated with it.
- **3.2. XRSystem.** [ SecureContext , Exposed = Window ] interface XRSystem : EventTarget { // Methods Promise < boolean > isSessionSupported ( XRSessionMode mode ); [ NewObject ] Promise < XRSession > requestSession ( XRSessionMode mode , optional XRSessionInit options = {}); // Events attribute EventHandler ondevicechange ; }; The user agent MUST create an XRSystem object when a Navigator object is created and…

## WebXR Augmented Reality Module - Level 1

Source: https://www.w3.org/TR/webxr-ar-module-1/

The WebXR Augmented Reality module expands the WebXR Device API with the functionality available on AR hardware.

- **2.1. XRSessionMode.** Supporting the additional "immersive-ar" session mode, does not change the requirement that user agents MUST support "inline" sessions.
- **2.2. XREnvironmentBlendMode.** enum XREnvironmentBlendMode { "opaque" , "alpha-blend" , "additive" }; partial interface XRSession { // Attributes readonly attribute XREnvironmentBlendMode environmentBlendMode ; }; The environmentBlendMode attribute MUST report the XREnvironmentBlendMode value that matches blend technique currently being performed by the XR Compositor .
- **2.2. XREnvironmentBlendMode.** A blend mode of opaque MUST be reported if the XR Compositor is using opaque environment blending .
- **2.2. XREnvironmentBlendMode.** A blend mode of alpha-blend MUST be reported if the XR Compositor is using alpha-blend environment blending .
- **2.2. XREnvironmentBlendMode.** A blend mode of additive MUST be reported if the XR Compositor is using additive environment blending .
- **2.4. XR Compositor Behaviors.** When presenting content to the XR device , the XR Compositor MUST apply the appropriate blend technique to combine virtual pixels with the real-world environment .
- **2.4. XR Compositor Behaviors.** This technique MUST be applied on opaque and pass-through displays when the mode is set to either "immersive-vr" or "inline" .
- **2.4. XR Compositor Behaviors.** This technique MUST NOT be applied when the mode is set to "immersive-ar" , regardless of the XR Device ’s display technology .

## WebXR Depth Sensing Module Level 1

Source: https://www.w3.org/TR/webxr-depth-sensing-1/

Depth Sensing API is a module extending the capabilities of WebXR Device API. It enables apps to obtain depth information computed by supported XR devices in order to provide more immersive experiences. The example use cases of depth sensing API include (but are not limited to) simulating physical interactions of virtual objects with the real world, occlusion, and non-visual applications that can make use of increased awareness of users' environment.

- **1.1. Terminology.** A layered native depth buffer MUST contain one array layer for each entry in the XRSession ’s list of views at the time it is obtained, with the layers corresponding to those views in the same order.
- **2.1. Feature descriptor.** The inline XR device MUST NOT be treated as capable of supporting the depth sensing feature.
- **2.2. Intended depth type, data usage, and data formats.** The "luminance-alpha" data format MUST NOT be used with XRGPUDepthInformation .
- **2.3. Session configuration.** The matchDepthView requests that view of the depth information MUST be aligned with the XRView .
- **2.3. Session configuration.** If this is true , the XRSystem SHOULD return depth information that reflects the current frame.
- **2.3. Session configuration.** NOTE: If matchDepthView is false , the author SHOULD do the reprojection using the view from XRDepthInformation .
- **2.3. Session configuration.** The key is optional in XRSessionInit , but it MUST be provided when depth-sensing is included in either requiredFeatures or optionalFeatures .
- **2.3. Session configuration.** partial dictionary XRSessionInit { XRDepthStateInit depthSensing ; }; If the depth sensing feature is a required feature but the application did not supply a depthSensing key, the user agent MUST treat this as an unresolved required feature and reject the requestSession(mode, options) promise with a NotSupportedError .

## WebXR DOM Overlays Module Level 1

Source: https://www.w3.org/TR/webxr-dom-overlays-1/

The WebXR DOM Overlays module expands the WebXR Device API with a mechanism for showing interactive 2D web content during an immersive WebXR session. When the feature is enabled, the user agent will display the content of a single DOM element as a transparent-background 2D rectangle.

- **2.2. CSS pseudo-class.** The :xr-overlay pseudo-class MUST match the overlay element for the duration of an immersive session using a DOM Overlay.
- **2.4. Fullscreen API integration.** In this case, the UA MUST prevent changes to the active fullscreen element, rejecting requestFullscreen requests for the duration of the immersive session.
- **2.4. Fullscreen API integration.** In this case, the overlay element MUST still match the :xr-overlay pseudoclass and MUST be styled in the immersive view using the § 2.3 User-agent level style sheet defaults for this pseudoclass.
- **2.4. Fullscreen API integration.** The UA MAY separately support using the fullscreen API for elements outside the overlay element , but this MUST NOT have any effect on how the DOM overlay content is displayed.
- **2.4. Fullscreen API integration.** On a multi-display system where the immersive session uses a separate output device from the originally displayed web page, the overlay element MUST NOT be visible or interactive on other displays as part of a 2D web page while it is being shown in the immersive view.
- **3.1. XRSessionInit.** The DOM content MUST be composited as if it were the topmost content layer.
- **3.1. XRSessionInit.** It MUST NOT be occluded by content from the XRWebGLLayer or by images from a passthrough camera for an AR device.
- **3.1. XRSessionInit.** The DOM overlay MUST be automatically visible to the user from the start of the session, without requiring the user to press buttons or take other manual actions to make it visible.

## WebXR Gamepads Module - Level 1

Source: https://www.w3.org/TR/webxr-gamepads-module-1/

This specification module describes support for accessing button, trigger, thumbstick, and touchpad data associated with virtual reality (VR) and augmented reality (AR) devices on the Web.

- **2. WebXR Device API Integration.** As stated in the WebXR device API, input mechanisms which are not explicitly associated with the XR Device , such as traditional gamepads, MUST NOT be considered XR input source s.
- **2.1. XRInputSource.** If the XR input source does not have at least one of the following properties, the for instructions: Local references: spec:webxr-gamepads-module-1; type:attribute; for:XRInputSource; text:gamepad for-less references: spec:gamepad; type:permission; for:/; text:"gamepad" spec:gamepad; type:permission; for:/; text:"gamepad"">gamepad attribute MUST be null : A single button and a gripSpace More than…
- **2.2. XRSession.** When the presence of a gamepad changes for any entry in the inputSources array, the user agent MUST invoke the WebXR Device API’s algorithm for responding to input source attribute changes .
- **2.2. XRSession.** To apply gamepad frame updates for an XRFrame frame , the user agent MUST run the following steps: For each XRInputSource with a gamepad gamepad associated with frame ’s session , perform the following steps: Update gamepad to reflect the gamepad data at frame ’s time .
- **3.1. Navigator.** However, Gamepad instances returned by an XRInputSource ’s gamepad attribute MUST NOT be included in the array returned by navigator.getGamepads() .
- **3.2. Gamepad.** The following Gamepad attributes MUST exhibit the following behavioral restrictions when the Gamepad has been returned by an XRInputSource ’s gamepad attribute.
- **3.2. Gamepad.** gamepad ’s id attribute MUST be an empty string ( "" ).
- **3.2. Gamepad.** gamepad ’s index attribute MUST be -1 if it is not exposed via navigator.getGamepads() , otherwise it should be assigned as specified by selecting an unused gamepad index .

## WebXR Hand Input Module - Level 1

Source: https://www.w3.org/TR/webxr-hand-input-1/

The WebXR Hand Input module expands the WebXR Device API with the functionality to track articulated hand poses.

- **2. Initialization.** If an application wants to view articulated hand pose information during a session, the session MUST be requested with an appropriate feature descriptor .
- **3. Physical Hand Input Sources.** Physical hand input sources MUST include the input profile name of "generic-hand-select" in their profiles .
- **3.1. XRInputSource.** If the XRInputSource belongs to an XRSession that has not been requested with the " hand-tracking " feature descriptor , hand MUST be null .
- **3.2. Skeleton Joints.** The "tip" skeleton joints SHOULD have an appropriate nonzero radius so that collisions with the fingertip may work.
- **3.3. XRHand.** [[joints]] MUST NOT change over the course of a session.
- **3.3. XRHand.** If an individual device does not support a joint defined in this specification, it MUST emulate it instead.
- **3.3. XRHand.** The size attribute MUST return the number 25 .
- **3.3. XRHand.** The get( jointName ) method when invoked on an XRHand this MUST run the following steps: Let joints be the value of this 's [[joints]] internal slot.

## WebXR Hit Test Module Level 1

Source: https://www.w3.org/TR/webxr-hit-test-1/

Describes a method for performing hit tests against real world geometry to be used with the WebXR Device API.

- **2.1. Feature descriptor.** The inline XR device MUST NOT be treated as capable of supporting the hit test feature.
- **4.1. XRHitTestSource.** In order to create a hit test source from session , space , entityTypes and offsetRay , the user agent MUST run the following steps: Let hitTestSource be a new XRHitTestSource .
- **4.1. XRHitTestSource.** When cancel() method is invoked, the user agent MUST cancel a hit test source by running the following steps: If the hitTestSource is not active , throw an InvalidStateError and abort these steps.
- **4.1. XRHitTestSource.** The cancelation MAY happen at an unspecified time (or not at all) and the application SHOULD NOT rely on this behavior for cleanup.
- **4.2. XRTransientInputHitTestSource.** In order to create a hit test source for transient input from session , profile , entityTypes and offsetRay , the user agent MUST run the following steps: Let hitTestSource be a new XRTransientInputHitTestSource .
- **4.2. XRTransientInputHitTestSource.** When cancel() method is invoked, the user agent MUST cancel a hit test source for transient input by running the following steps: If the hitTestSource is not active , throw an InvalidStateError and abort these steps.
- **5.1. XRHitTestResult.** In order to create a hit test result given XRFrame frame , array of XRHitTestTrackableType entityTypes , and native hit test result nativeResult , the user agent MUST run the following steps: Let hitTestResult be a new XRHitTestResult .
- **5.1. XRHitTestResult.** When getPose( baseSpace ) method is invoked on hitTestResult , the user agent MUST run the following steps: Let frame be the hitTestResult ’s frame .

## WebXR Layers API Level 1

Source: https://www.w3.org/TR/webxrlayers-1/

This specification describes support for various layer types used in a WebXR session.

- **2. Initialization.** If an application wants to create layers other than of type XRProjectionLayer during a session, the session MUST be requested with an appropriate feature descriptor .
- **2. Initialization.** Layers of type XRProjectionLayer MUST always be supported, regardless if the feature descriptor was requested.
- **2. Initialization.** "inline" sessions MUST NOT support layers.
- **3.1. Mono and stereo layers.** A stereo layer MUST supply an XRSubImage to render to for each view.
- **3.1. Mono and stereo layers.** A mono layer MUST supply a single XRSubImage which is shown to each view.
- **3.1. Mono and stereo layers.** The XR Compositor MUST ensure that layers are presented correctly in stereo to the observer.
- **3.4. XRCompositionLayer.** This MUST send a signal to the XR Compositor to remove the stereo effect of this XRCompositionLayer .
- **3.4. XRCompositionLayer.** Only the operation of the XR Compositor is affected by this setting and experiences SHOULD continue to draw to both eyes.

## WebXR Lighting Estimation API Level 1

Source: https://www.w3.org/TR/webxr-lighting-estimation-1/

This specification describes support for exposing estimates of environmental lighting conditions to WebXR sessions.

- **2.3. XRLightEstimate.** The array MUST be 27 elements in length, with every 3 elements defining the red, green, and blue components respectively of a single coefficient.
- **2.3. XRLightEstimate.** The first term of the sphericalHarmonicsCoefficients , meaning the first 3 elements of the array, MUST be representative of a valid lighting estimate.
- **2.3. XRLightEstimate.** The value MUST be a unit length 3D vector and the w value MUST be 0.0 .
- **2.3. XRLightEstimate.** If estimated values from the user’s environment are not available the primaryLightDirection MUST be { x: 0.0, y: 1.0, z: 0.0, w: 0.0 } , representing a light shining straight down from above.
- **2.3. XRLightEstimate.** The value MUST represent an RGB value mapped to the x , y , and z values respectively where each component is greater than or equal to 0.0 and the w value MUST be 1.0 .
- **2.3. XRLightEstimate.** If estimated values from the user’s environment are not available the primaryLightIntensity MUST be {x: 0.0, y: 0.0, z: 0.0, w: 1.0} , representing no illumination.
- **3.1. Session Initialization.** Applications that wish to use light estimation features MUST be requested with an the " light-estimation " feature descriptor .
- **3.3. XRFrame.** getLightEstimate ( XRLightProbe lightProbe ); }; When the getLightEstimate( lightProbe ) method is invoked on XRFrame frame , the user agent MUST run the following steps: If frame ’s active boolean is `false`, throw an InvalidStateError and abort these steps.
