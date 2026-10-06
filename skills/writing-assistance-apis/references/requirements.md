# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Writing Assistance APIs

Source: https://webmachinelearning.github.io/writing-assistance-apis/

The summarizer, writer, and rewriter APIs provide high-level interfaces to call on a browser or operating system’s built-in language model to help with writing tasks.

- **2.2. Availability.** Per the "should"-level guidance , the implementation has determined that " zh " belongs in the set of downloadable input languages, with " zh-Hans ", instead of in the set of available input languages, with " zh-Hant ".
- **2.4.1. The algorithm.** If they are non-null, sharedContext and context should be used to aid in the summarization by providing context on how the web developer wishes the input to be summarized.
- **2.4.1. The algorithm.** If input is the empty string, or otherwise consists of no summarizable content (e.g., only contains whitespace, or control characters), then the resulting summary should be the empty string.
- **2.4.1. The algorithm.** In such cases, sharedContext , context , type , format , length , preference , and outputLanguage should be ignored.
- **2.4.1. The algorithm.** The summarization should conform to the guidance given by type , format , length , and preference , in the definitions of each of their enumeration values.
- **2.4.1. The algorithm.** The summarization process must conform to the guidance given in § 6 Privacy considerations and § 7 Security considerations , notably including (but not limited to) § 6.4 User input and § 7.2 Runtime shared resources .
- **2.4.1. The algorithm.** If outputLanguage is non-null, the summarization should be in that language.
- **2.4.1. The algorithm.** Otherwise, it should be in the language of input (which might not match that of context or sharedContext ).

## Translator and Language Detector APIs

Source: https://webmachinelearning.github.io/translation-api/

The translator and language detector APIs gives web pages the ability to translate text between languages, and detect the language of such text.

- **3.2. Availability.** Return a map from language arcs to Availability values, where each key is a language arc that the user agent supports translating text between, filled according to the following constraints: If the user agent currently supports translating text from the source language to the target language of the language arc , then the map must contain an entry whose key is that language arc and whose value is " available ".
- **3.2. Availability.** If the user agent believes it will be able to support translating text from the source language to the target language of the language arc , but only after finishing a download that is already ongoing, then the map must contain an entry whose key is that language arc and whose value is " downloading ".
- **3.2. Availability.** If the user agent believes it will be able to support translating text from the source language to the target language of the language arc , but only after performing a not-currently ongoing download, then the map must contain an entry whose key is that language arc and whose value is " downloadable ".
- **3.2. Availability.** The keys must not include any language arcs that overlap with the other keys .
- **3.4.1. The algorithm.** If input is the empty string, or otherwise consists of no translatable content (e.g., only contains whitespace, or control characters), then the resulting translation should be input .
- **3.4.1. The algorithm.** In such cases, sourceLanguage and targetLanguage should be ignored.
- **3.4.1. The algorithm.** If ( sourceLanguage , targetLanguage ) can be fulfilled by the identity translation , then the resulting translation should be input .
- **3.4.1. The algorithm.** The translation process must conform to the guidance given in Writing Assistance APIs § 6 Privacy considerations and Writing Assistance APIs § 7 Security considerations , notably including (but not limited to) Writing Assistance APIs § 6.4 User input and Writing Assistance APIs § 7.2 Runtime shared resources .
