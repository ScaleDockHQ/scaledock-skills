# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Digital Asset Links

Source: https://developers.google.com/digital-asset-links/v1/getting-started

The Digital Asset Links protocol and API enable an app or website to make public,

- **Overview.** Here are some possible uses for Digital Asset Links: Website A declares that links to its site should open in a designated app on mobile devices, if the app is installed.
- **Quick usage example.** Here's a very simplified example of how the website www.example.com could use Digital Asset Links to specify that any links to URLs in that site should open in a designated app rather than the browser: The website www.example.com publishes a statement list at https://www.example.com/.well-known/assetlinks.json.
- **Quick usage example.** The intent filter includes a special attribute android:autoVerify , new to Android M, which indicates that Android should verify the statement on the website described in the intent filter when the app is installed.
- **Important considerations and limitations:.** The protocol does not natively perform any statement actions; rather, it enables the ability to expose statements, which a consuming application must validate and then decide whether and how to act upon.
