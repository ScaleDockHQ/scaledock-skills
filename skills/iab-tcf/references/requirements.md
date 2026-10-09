# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are normative sentences from the published text, quoted as written (only line breaks and hyphenation from PDF layout were joined). Apply the ones that match the role. Each is labelled with the nearest section, clause or article in the published document.

## Consent string and vendor list formats

Source: https://raw.githubusercontent.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/703fc2964ba8fe1086b18a3c509c46a48c1aee1c/TCFv2/IAB%20Tech%20Lab%20-%20Consent%20string%20and%20vendor%20list%20formats%20v2.md

- **Who should create a TC string.** Vendors or any other third-party service providers must neither create nor alter TC Strings.
- **When should a TC string be created.** A TC String that contains positive consent signals must not be created before clear affirmative action is taken by a user that unambiguously signifies that user's consent.
- **What are publisher restrictions.** Vendors must always respect a restriction signal that disallows them the processing for a specific purpose regardless of whether or not they have declared that purpose to be "flexible".
- **What are publisher restrictions.** Vendors that declared a purpose with a default legal basis (consent or legitimate interest respectively) but also declared this purpose as flexible must respect a legal basis restriction if present.
- **URL-based services.** TC Strings must always be propagated as is, and not modified.
- **Full TC String passing.** For macro `${GDPR_CONSENT_XXXXX}`, the service making the call must also check that the macro name contains a valid Vendor ID before replacing the macro.
- **Why was the disclosed vendor section made mandatory in TCF 2.3.** If a vendor declaring special purpose(s) appears in the disclosed vendors list, it means that the vendor has been presented to the user and is permitted to operate under the declared special purpose(s).
- **Managing conflicting string versions.** Post 30 September 2023 a TC String created with a policy version set to smaller than 4 will be deemed invalid.
- **TC String Format.** There are 3 distinct TC String segments that are joined together on a "dot" character.
- **TC String Format.** All subsequent segments (disclosedVendors and PublisherTC) may appear in any order because each includes a segment ID used for identification.
- **CMPs using the GVL.** To determine whether the interface should be resurfaced to a user, the CMP must compare the latest version of the GVL with the archived version of the GVL identified in the TC String (assuming they are different).
- **Accessing and caching the Global Vendor List.** All requests for the GVL must now be server-side.
- **CMPs accessing and caching the GVL.** Client-side CMP applications must not load GVL resources directly from vendor-list.consensu.org - instead they must be loaded and hosted by a CMP's server-side application and then passed to the client-side CMP application.
- **Global CMP List Specification.** Consent strings or TC Strings for CMPs with a `deletedDate` set must be considered invalid after that date/time and must be discarded immediately and not passed downstream.

## CMP API v2

Source: https://raw.githubusercontent.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/703fc2964ba8fe1086b18a3c509c46a48c1aee1c/TCFv2/IAB%20Tech%20Lab%20-%20CMP%20API%20v2.md

- **How does the CMP provide the API.** The function `__tcfapi` **must always be a function** and cannot be any other type, even if only temporarily on initialization - the API must be able to handle calls at all times.
- **How does the CMP provide the API.** Secondarily, CMPs must provide a proxy for postMessage events targeted to the `__tcfapi` interface sent from within nested iframes.
- **addEventListener.** The `addEventListener` callback shall be immediately called upon registration with the current TC data, even if the CMP status is `loading` and the CMP has incomplete TC Data, so that the calling script may have access to its registered `listenerId`.
- **TCData.** If GDPR does not apply to this user in this context then only `gdprApplies`, `tcfPolicyVersion`, `cmpId` and `cmpVersion` shall exist in the object.
- **What does the gdprApplies value mean.** A CMP shall determine whether or not GDPR applies in its current context and set the `gdprApplies` value.
- **How can scripts on a page determine if there is a CMP present.** Publishers must load the CMP in a parent (or ancestor) of all iframes that may need to establish a GDPR legal basis.
- **Requirements for the CMP "stub" API script.** The stub code must be loaded and executed synchronously before any other scripts that depend on the `__tcfapi` function to be there - this usually means between the `<head></head>` tags of the HTML document - in order to ensure that it can be executed before all calls from third parties.
- **Using postmessage.** The `callId` property shall be either a string or a number, but the calling script shall not use the two types interchangeably.
- **How does the version parameter work.** If the argument is `1`, the CMP shall invoke the callback with an argument of `false` for the success parameter and a `null` argument for any expected TC data parameter, as this TCF version is no longer supported by this API.
- **How is a CMP used in-app.** The initialized CMP shall set `IABTCF_CmpSdkID` with its ID as soon as it is initialized in the app to signal to vendors that a CMP is present.
- **How do third-party SDKs (vendors) access the consent information in-app.** On Android OS, the TC data and TC string shall be stored in the default Shared Preferences for the application context.
