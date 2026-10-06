# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Web Application Manifest

Source: https://www.w3.org/TR/appmanifest/

This specification defines a JSON-based file format that provides developers with a centralized place to put metadata associated with a web application. This metadata includes, but is not limited to, the web application's name, links to icons, as well as the preferred URL to open when a user launches the web application. The manifest also allows developers to declare a default screen orientation for their web application, as well as providing the ability to set the display mode for the application (e.g., in fullscreen). Additionally, the manifest allows a developer to "scope" a web application to a URL. This restricts the URLs to which the manifest is applied and provides a means to "deep li

- **1.9.** This means that the user agent MUST return the orientation to the default screen orientation any time the orientation is unlocked [ SCREEN-ORIENTATION ] or the top-level traversable is navigated .
- **1.11.** When the user agent sees a manifest with an identity that does not correspond to an already-installed application, it SHOULD treat that manifest as a description of a distinct application, even if it is served from the same URL as that of another application.
- **1.11.** When the user agent sees a manifest where manifest ["id"] is equal (with exclude fragments OPTIONALLY set to true) to the identity of an already-installed application, it SHOULD be used as a signal that this manifest is a replacement for the already-installed application's manifest, and not a distinct application, even if it is served from a different URL than the one seen previously.
- **1.12.** However, the user agent SHOULD NOT override the default theme color via a meta element whose name attribute is "theme-color" for documents ' URL are not within scope , since the application has no control over these documents.
- **1.13.** The background_color member is only meant to improve the user experience while a web application is loading and MUST NOT be used by the user agent as the background color when the web application's stylesheet is available.
- **1.14.** A user agent SHOULD expose shortcuts via interactions that are consistent with exposure of an application icon's context menu in the host operating system (e.g., right click, long press).
- **1.14.** A user agent SHOULD render the shortcuts in the same order as they are provided in the manifest.
- **1.14.** A user agent SHOULD represent the shortcuts in a manner consistent with exposure of an application icon's context menu in the host operating system.

## Web App Manifest - Application Information

Source: https://www.w3.org/TR/manifest-app-info/

This document is a registry of supplementary members for the Web Application Manifest specification that provide additional metadata to an application manifest . This metadata can be used in a digital storefront or other surfaces where this web application may be marketed or distributed, or to enhance an installation dialog when installing a web application.

- **3.2.** Note : Platform usage guidance for authors Authors should only use platform for instances where a screenshot is not representative of a universal experience.
- **3.2.** For instance, an OS-specific platform designation should be reserved for instances where the screenshot includes functionality only available on that specific platform.
- **3.2.** User agents might show as many (or as few) screenshots as they choose, but shouldn't display screenshots that do not pertain to their platform (e.g., Google Play should not show iOS-specific screenshots).
- **3.2.** When no platform is set, user agents should assume the screenshot is applicable to all platforms.
- **3.2.** User agents can use a screenshot’s aspect ratio ( sizes ) in determining if the screenshot should be displayed.
- **3.3.** Note : form_factor usage guidance for authors Authors should only use form_factor for instances where a screenshot is not representative of a universal experience.
- **3.3.** When no form_factor is set, user agents should assume the screenshot is applicable to all form factors.
