# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## ECMA-426

Source: https://tc39.es/ecma426/

- 4 Notational Conventions + 4.1 Algorithm Conventions + 4.1.1 Implicit Completions 4.1.1.1 GetTheAnswer ( input )

* **Software License.** SEE THE ECMA CODE OF CONDUCT IN PATENT MATTERS AVAILABLE AT https://ecma-international.org/memento/codeofconduct.htm FOR INFORMATION REGARDING THE LICENSING OF PATENT CLAIMS THAT ARE REQUIRED TO IMPLEMENT ECMA INTERNATIONAL STANDARDS.
* **Software License.** IN NO EVENT SHALL ECMA INTERNATIONAL BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)…
* **2 Conformance.** A conforming source map generator should generate documents which are conforming source map documents, and can be decoded by the algorithms in this specification without reporting any errors (even those which are specified as optional).
* **2 Conformance.** A conforming source map consumer should implement the algorithms specified in this specification for retrieving (where applicable) and decoding source map documents.
* **9 Source map format.** Entries may be null if some original sources should be retrieved by name.
* **9 Source map format.** The ignoreList field is an optional list of indices of files that should be considered third party code, such as framework code or bundler- generated code .
* **9.2.1 Mappings grammar.** The mappings String must adhere to the following grammar: MappingsField : LineList LineList : Line Line ; LineList Line : MappingList opt MappingList : Mapping Mapping , MappingList Mapping : GeneratedColumn GeneratedColumn OriginalSource OriginalLine OriginalColumn Name opt GeneratedColumn : Vlq OriginalSource : Vlq OriginalLine : Vlq OriginalColumn : Vlq Name : Vlq A Decode Mapping State Record…
* **9.2.4 Names for generated JavaScript code.** Source map generators should create a mapping entry with a [[Name]] field for a JavaScript token, if: The original source language construct maps semantically to the generated JavaScript code.
