# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Selection API

Source: https://www.w3.org/TR/selection-api/

This document is a preliminary draft of a specification for the Selection API and selection related functionality. It replaces a couple of old sections of the HTML specification , the selection part of the old DOM Range specification . This document defines APIs for selection, which allows users and authors to select a portion of a document or specify a point of interest for copy, paste, and other editing operations.

- **2..** This one selection must be shared by all the content of the document (though not by nested documents ), including any editing hosts in the document .
- **2..** Once a selection is associated with a given range , it must continue to be associated with that same range until this specification requires otherwise.
- **2..** Note For instance, if the DOM changes in a way that changes the range's boundary points, or a script modifies the boundary points of the range, the same range object must continue to be associated with the selection.
- **2..** However, if the user changes the selection or a script calls addRange () , the selection must be associated with a new range object, as required elsewhere in this specification.
- **2..** If the selection 's range is not null and is collapsed , then the caret position must be at that range 's boundary point .
- **2..** When the selection is not collapsed , this specification does not define the caret position; user agents should follow platform conventions in deciding whether the caret is at the start of the selection , the end of the selection , or somewhere else.
- **2..** If the user creates a selection by indicating first one boundary point of the range and then the other (such as by clicking on one point and dragging to another), and the first indicated boundary point is after the second, then the corresponding selection must initially be backwards .
- **2..** If the first indicated boundary point is before the second, then the corresponding selection must initially be forwards .
