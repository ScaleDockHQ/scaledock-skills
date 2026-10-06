# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Prompt API

Source: https://webmachinelearning.github.io/prompt-api/

The prompt API gives web pages the ability to directly prompt a language model

- **3.3. The LanguageModel class.** The following are the event handlers (and their corresponding event handler event types ) that must be supported, as event handler IDL attributes , by all LanguageModel objects: Event handler Event handler event type oncontextoverflow contextoverflow onquotaoverflow quotaoverflow The prompt( input , options ) method steps are: Let responseConstraint be options [" responseConstraint "] if it exists ; otherwise null.
- **3.3.1. Prefilling and generating.** The process should use model ’s initial messages , model ’s sampling mode , model ’s top K , model ’s temperature , model ’s expected inputs , model ’s expected outputs , and model ’s tools to guide how the state is updated.
- **3.3.1. Prefilling and generating.** The process must conform to the guidance given in § 4 Privacy considerations and § 5 Security considerations .
- **3.3.1. Prefilling and generating.** The process should use model ’s initial messages , model ’s sampling mode , model ’s top K , model ’s temperature , model ’s expected inputs , model ’s expected outputs , model ’s tools , and responseConstraint to guide the model’s behavior.
- **3.3.1. Prefilling and generating.** The prompting process must conform to the guidance given in § 4 Privacy considerations and § 5 Security considerations .
- **3.3.2. Usage.** The returned context usage must be nonnegative and finite.
- **3.3.2. Usage.** It should be roughly proportional to the amount of data in inputToModel .
- **3.3.4. Errors.** This table lists the possible DOMException names and the cases in which an implementation should use them: DOMException name Scenarios " NotAllowedError " Prompting is disabled by user choice or user agent policy.
