# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published text, quoted as written (only line breaks and hyphenation from PDF layout were joined). Apply the ones that match the role. Each is labelled with the nearest section, clause or article in the published document.

## Consent String Specification

Source: https://raw.githubusercontent.com/InteractiveAdvertisingBureau/Global-Privacy-Platform/03fdf0332d261ee896b77d7f9a10edde1498fc7c/Core/Consent%20String%20Specification.md

- **Who should create a GPP String.** Vendors or any other third-party service providers must neither create nor alter GPP Strings.
- **Creating a GPP String.** Add padding (0) on the right to get to a total bit length that is a multiple of 6 bits.
- **Creating a GPP String.** For sections that use a different encoding mechanism, ensure that the data is websafe and does not include the "~" (tilde) character or the "." (dot) character.
- **Creating a GPP String.** Create a bit representation of the GPP header section including all Section IDs for discrete sections in a sorted order.
- **GPP String Format.** The GPP string is comprised of distinct sections joined together on a "~" (tilde) character.
- **Header.** The header is always required and comes first.
- **Header Encoding.** The IDs must be represented in the order the related sections appear in the string.
- **Section Encoding.** Policy writers must ensure that each field within the section has a name that is unique for this section.
- **URL-based services.** The applicable GPP Section ID must also be inserted, where the ${GPP_SID} macro is present.
- **URL-based services.** GPP Strings must always be propagated as is, and not modified.
- **URL-based services.** For macro `${GPP_STRING_XXXXX}`, the service making the call must also check that the macro name contains a valid GPP ID before replacing the macro.
- **GPP Identifier.** Frameworks that are supported by the GPP must retrieve their IDs from the IAB Tech Lab Tools Portal.

## CMP API Specification

Source: https://raw.githubusercontent.com/InteractiveAdvertisingBureau/Global-Privacy-Platform/03fdf0332d261ee896b77d7f9a10edde1498fc7c/Core/CMP%20API%20Specification.md

- **How does the CMP provide the API.** If a CMP cannot immediately respond to a query, the CMP must queue all calls to the function and execute them later. The CMP must execute the commands in the same order in which the function was called.
- **How does the CMP provide the API.** All generic commands must always be executed immediately without any asynchronous logic and call the supplied callback function immediately.
- **What is a CMP ID.** For CMPs that are not registered, a value of 1 must be used by string creators who do not have a CMP ID and are not using a commercially available CMP.
- **PingReturn.** A CMP shall not repsond to any other API requests if this cmpStatus is present.
- **EventListener.** A call to the `addEventListener` command must always trigger an immediate call to the callback function. When registering new event listeners, the CMP (and stub) must therefore generate new listenerIds for each call to this command.
- **EventListener.** Whenever the CMP starts to change or is about to change any of the existing sections or is processing user input for an existing GPP string, it **must always** first set "signalStatus" to "not ready" and fire the corresponding event.
- **EventListener.** The `signalStatus` event shall always be the first (if applicable) and last in a chain of events being fired by the CMP.
- **In-App Key Names.** On Android OS, the GPP data and GPP string shall be stored in the default Shared Preferences for the application context.
- **Sent Message.** The callId property shall be either a string or a number, but the calling script shall not use the two types interchangeably.
