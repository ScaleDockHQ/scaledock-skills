# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Storage Living Standard

Source: https://storage.spec.whatwg.org/review-drafts/2026-02/

The Storage Standard defines an API for persistent storage and quota estimates, as well as the platform storage architecture.

- **Storage.** Developers should refer to the Living Standard for the most current error corrections and other developments.
- **5. Persistence permission.** The " persistent-storage " powerful feature ’s permission-related algorithms, and types are defaulted, except for: permission state " persistent-storage "'s permission state must have the same value for all environment settings objects with a given origin .
- **6. Usage and quota.** This amount should be less than the total storage space on the device.
- **6. Usage and quota.** It must not be a function of the available storage space on the device.
- **7. Management.** Whenever a storage bucket is cleared by the user agent, it must be cleared in its entirety.
- **7. Management.** User agents should avoid clearing storage buckets while script that is able to access them is running, unless instructed otherwise by the user.
- **7.1. Storage pressure.** A user agent that comes under storage pressure should clear network state and local storage buckets whose mode is " best-effort ", ideally prioritizing removal in a manner that least impacts the user.
- **7.1. Storage pressure.** If a user agent continues to be under storage pressure, then the user agent should inform the user and offer a way to clear the remaining local storage buckets , i.e., those whose mode is " persistent ".
