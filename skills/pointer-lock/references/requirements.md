# Requirements from the pinned text

These sentences were read from the pinned sources on 2026-10-06. They are the normative or conformance sentences the extractor found (MUST, SHOULD, or REQUIRED). Apply the ones that match the role. Section headings are the nearest heading in the published document.

## Pointer Lock

Source: https://www.w3.org/TR/pointerlock/

This specification defines an API that provides scripted access to raw mouse movement data while locking the target of mouse events to a single element and removing the cursor from view. This is an essential input mode for certain classes of applications, especially first person perspective 3D applications and 3D modeling software.

- **2.1.** Issue 97 : Section 2.1 should mention the effect of lock on PointerEvents This came up in this thread on #49 : Would it be possible to list these events normatively, instead of only giving some examples?
- **2.4.** Exit Pointer Lock The process of exiting pointer lock, given an element , is as follows: The system mouse cursor must be displayed again and positioned at cursor position .
- **3..** Issue 93 : Visibility state checks The spec should not allow hidden documents to request pointer lock.
- **3..** Additionally, should a document become hidden, it should release the pointer lock.
- **3..** Issue 91 : When a subsequent requestPointerLock is rejected, should an already locked target exit lock state?
- **3..** In the PR #49 's algorithm of requestPointerLock is currently missing the description for the scenario: When a subsequent request failed (for any possible reason), should an already locked target exit lock state?
- **6..** Extensions to the MouseEvent Interface WebIDL partial interface MouseEvent { readonly attribute double movementX ; readonly attribute double movementY ; }; movementX attribute movementY attribute The attributes movementX and movementY must provide the change in position of the pointer, as if the values of screenX , screenY , were stored between two subsequent mousemove events eNow and ePrevious…
- **6..** movementX and movementY must be zero for all mouse events except mousemove and pointermove .

## Pointer Lock 2.0

Source: https://www.w3.org/TR/pointerlock-2/

This specification defines an API that provides scripted access to raw mouse movement data while locking the target of mouse events to a single element and removing the cursor from view. This is an essential input mode for certain classes of applications, especially first person perspective 3D applications and 3D modeling software.

- **2.1.** Issue 97 : Section 2.1 should mention the effect of lock on PointerEvents This came up in this thread on #49 : Would it be possible to list these events normatively, instead of only giving some examples?
- **2.4.** Exit Pointer Lock The process of exiting pointer lock, given an element , is as follows: The system mouse cursor must be displayed again and positioned at cursor position .
- **3..** Issue 93 : Visibility state checks The spec should not allow hidden documents to request pointer lock.
- **3..** Additionally, should a document become hidden, it should release the pointer lock.
- **3..** Issue 91 : When a subsequent requestPointerLock is rejected, should an already locked target exit lock state?
- **3..** In the PR #49 's algorithm of requestPointerLock is currently missing the description for the scenario: When a subsequent request failed (for any possible reason), should an already locked target exit lock state?
- **6..** Extensions to the MouseEvent Interface WebIDL partial interface MouseEvent { readonly attribute double movementX ; readonly attribute double movementY ; }; movementX attribute movementY attribute The attributes movementX and movementY must provide the change in position of the pointer, as if the values of screenX , screenY , were stored between two subsequent mousemove events eNow and ePrevious…
- **6..** movementX and movementY must be zero for all mouse events except mousemove and pointermove .
