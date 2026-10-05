# Perceivable and operable

Read this when building or reviewing a UI against principles 1 and 2 of WCAG 2.2. Each criterion is paraphrased from the WCAG 2.2 Recommendation with its level; read the Recommendation for the exact wording before deciding a borderline case. Understanding documents are cited where they explain how to apply a criterion; they are informative. Sources are in [Sources](../SKILL.md#sources). "New" marks a criterion added in 2.2; "2.1" marks one added in 2.1.

## Principle 1: Perceivable

Information and user interface components must be presentable to users in ways they can perceive.

### 1.1 Text alternatives

- **1.1.1 Non-text Content (A).** All non-text content has a text alternative that serves the equivalent purpose. Exceptions: controls and inputs have a name that describes their purpose (see 4.1.2); time-based media, tests and sensory experiences get at least a descriptive identification; CAPTCHA gets a text alternative describing its purpose plus alternative forms using other senses; decoration, formatting and invisible content is implemented so assistive technology can ignore it.

### 1.2 Time-based media

- **1.2.1 Audio-only and Video-only (Prerecorded) (A).** Prerecorded audio-only gets an equivalent text alternative; prerecorded video-only gets a text alternative or an audio track. Not required when the media is itself a clearly labeled alternative for text.
- **1.2.2 Captions (Prerecorded) (A).** Captions for all prerecorded audio in synchronized media.
- **1.2.3 Audio Description or Media Alternative (Prerecorded) (A).** An alternative for time-based media or audio description for prerecorded video.
- **1.2.4 Captions (Live) (AA).** Captions for all live audio in synchronized media.
- **1.2.5 Audio Description (Prerecorded) (AA).** Audio description for all prerecorded video in synchronized media.
- AAA: 1.2.6 Sign Language, 1.2.7 Extended Audio Description, 1.2.8 Media Alternative, 1.2.9 Audio-only (Live).

### 1.3 Adaptable

- **1.3.1 Info and Relationships (A).** Information, structure and relationships conveyed through presentation are programmatically determinable or available in text. Programmatically determined means software can extract it from author-supplied data, through markup or an accessibility API (Glossary).
- **1.3.2 Meaningful Sequence (A).** When order affects meaning, a correct reading sequence is programmatically determinable.
- **1.3.3 Sensory Characteristics (A).** Instructions do not rely solely on shape, color, size, visual location, orientation or sound ("press the round button on the right").
- **1.3.4 Orientation (AA, 2.1).** Content does not lock to portrait or landscape unless a specific orientation is essential (a bank check, a piano app, VR).
- **1.3.5 Identify Input Purpose (AA, 2.1).** Fields collecting information about the user expose their purpose programmatically when the purpose is in WCAG 2.2 § 7 Input Purposes (for example `name`, `email`, `username`, `current-password`, `new-password`, `street-address`, `tel`), and the technology supports it. In HTML this list is based on the autofill field names.
- AAA: 1.3.6 Identify Purpose.

### 1.4 Distinguishable

- **1.4.1 Use of Color (A).** Color is not the only visual means of conveying information, indicating an action, prompting a response or distinguishing an element. Color perception is covered here; programmatic access to color coding is under 1.3 (Note).
- **1.4.2 Audio Control (A).** Audio that plays automatically for more than 3 seconds can be paused or stopped, or its volume controlled independently of the system. Applies to the whole page (§ 5.2.5).
- **1.4.3 Contrast (Minimum) (AA).** Text and images of text have at least 4.5:1; large-scale text at least 3:1. No requirement for inactive components, pure decoration, invisible text, text incidental to a picture, or logotypes.
- **1.4.4 Resize Text (AA).** Text can be resized to 200 percent without assistive technology and without loss of content or functionality (captions and images of text excepted).
- **1.4.5 Images of Text (AA).** Use text rather than images of text when the technology can achieve the presentation, unless the image is customizable or the presentation is essential (logotypes are essential).
- **1.4.10 Reflow (AA, 2.1).** No loss of information or function and no two-dimensional scrolling at a width of 320 CSS pixels (vertical-scrolling content) or a height of 256 CSS pixels (horizontal-scrolling content). 320 CSS pixels equals a 1280 pixel viewport at 400% zoom. Maps, diagrams, video, games, presentations, data tables and toolbars that must stay in view may scroll in two dimensions.
- **1.4.11 Non-text Contrast (AA, 2.1).** At least 3:1 against adjacent colors for visual information needed to identify UI components and their states (borders of inputs, checkbox marks, focus indicators) and for parts of graphics needed to understand content. Excepted: inactive components, components whose appearance the user agent determines and the author did not modify, and graphics whose particular presentation is essential.
- **1.4.12 Text Spacing (AA, 2.1).** No loss of content or function when the user sets line height to 1.5 times the font size, paragraph spacing to 2 times, letter spacing to 0.12 times and word spacing to 0.16 times, changing nothing else. Content need not use these values; it must survive them. Scripts that do not use a property are exempt from it.
- **1.4.13 Content on Hover or Focus (AA, 2.1).** Content that appears on hover or focus (custom tooltips, sub-menus, non-modal popups) is dismissible without moving hover or focus (usually Escape), hoverable (the pointer can move onto it without it disappearing), and persistent until the trigger is removed, the user dismisses it, or it is no longer valid. Browser `title` tooltips are excepted.
- AAA: 1.4.6 Contrast (Enhanced) (7:1, large text 4.5:1), 1.4.7 Low or No Background Audio, 1.4.8 Visual Presentation, 1.4.9 Images of Text (No Exception).

### Contrast ratio

From the Glossary:

- Contrast ratio = (L1 + 0.05) / (L2 + 0.05), where L1 is the relative luminance of the lighter color and L2 of the darker. It ranges from 1:1 to 21:1.
- Relative luminance for sRGB: L = 0.2126 R + 0.7152 G + 0.0722 B, where each channel C = C8bit / 255 is linearized as C / 12.92 if C ≤ 0.04045, else ((C + 0.055) / 1.055) ^ 2.4.
- Large-scale text: at least 18 point, or 14 point bold, or the CJK equivalent, at the size the content is delivered (not after user zoom). Thin or unusual fonts are harder to read at low contrast (Glossary, large scale (text), Notes 1 and 2).
- Measure text against the background specified for normal use; with no background color specified, white is assumed. Specifying a text color without a background color (or the reverse) is a failure, because the user's default is unknown (Glossary, contrast ratio, Notes 3 and 4).
- Text contrast can be evaluated with anti-aliasing off, and only color pairs the author expects to appear adjacent need checking (Notes 2 and 6).

```ts
const channel = (c8: number): number => {
  const c = c8 / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};

export const relativeLuminance = ([r, g, b]: [
  number,
  number,
  number,
]): number => 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);

export const contrastRatio = (
  a: [number, number, number],
  b: [number, number, number],
): number => {
  const [l1, l2] = [relativeLuminance(a), relativeLuminance(b)].sort(
    (x, y) => y - x,
  );
  return (l1 + 0.05) / (l2 + 0.05);
};
```

## Principle 2: Operable

User interface components and navigation must be operable.

### 2.1 Keyboard accessible

- **2.1.1 Keyboard (A).** All functionality is operable through a keyboard interface without specific timings for keystrokes, except where the underlying function depends on the path of movement (freehand drawing). Mouse-key emulators do not count as a keyboard interface (Glossary, keyboard interface).
- **2.1.2 No Keyboard Trap (A).** If focus can move into a component by keyboard, it can move out by keyboard; if that takes more than unmodified arrow, Tab or standard exit keys, the user is told how. Applies to the whole page (§ 5.2.5).
- **2.1.4 Character Key Shortcuts (A, 2.1).** A shortcut using only letters, punctuation, numbers or symbols can be turned off, remapped to include a modifier key, or is active only while its component has focus.
- AAA: 2.1.3 Keyboard (No Exception).

### 2.2 Enough time

- **2.2.1 Timing Adjustable (A).** Every time limit set by content can be turned off, adjusted to at least ten times the default, or extended (warned beforehand, at least 20 seconds to extend with a simple action, at least ten times). Exceptions: real-time events, essential limits, limits longer than 20 hours.
- **2.2.2 Pause, Stop, Hide (A).** Moving, blinking or scrolling content that starts automatically, lasts more than five seconds and sits alongside other content can be paused, stopped or hidden; auto-updating content that starts automatically can be paused, stopped, hidden, or have its frequency controlled, unless it is essential. Applies to the whole page (§ 5.2.5).
- AAA: 2.2.3 No Timing, 2.2.4 Interruptions, 2.2.5 Re-authenticating, 2.2.6 Timeouts.

### 2.3 Seizures and physical reactions

- **2.3.1 Three Flashes or Below Threshold (A).** Nothing flashes more than three times in any one-second period, or the flash is below the general and red flash thresholds. Applies to the whole page (§ 5.2.5).
- AAA: 2.3.2 Three Flashes, 2.3.3 Animation from Interactions (motion animation triggered by interaction can be disabled).

### 2.4 Navigable

- **2.4.1 Bypass Blocks (A).** A mechanism to bypass blocks repeated on multiple pages. A skip link that appears only on focus is not "additional content" under 1.4.13 (SC 1.4.13, Note 3).
- **2.4.2 Page Titled (A).** Pages have titles that describe topic or purpose.
- **2.4.3 Focus Order (A).** When sequential navigation affects meaning or operation, focus order preserves meaning and operability.
- **2.4.4 Link Purpose (In Context) (A).** Link purpose is clear from the link text, or the text plus its programmatically determined context.
- **2.4.5 Multiple Ways (AA).** More than one way to find a page within a set of pages, except pages that are a step in a process.
- **2.4.6 Headings and Labels (AA).** Headings and labels describe topic or purpose.
- **2.4.7 Focus Visible (AA).** Any keyboard-operable UI has a mode where the focus indicator is visible.
- **2.4.11 Focus Not Obscured (Minimum) (AA, New).** When a component receives keyboard focus, it is not entirely hidden by author-created content. Details below.
- AAA: 2.4.8 Location, 2.4.9 Link Purpose (Link Only), 2.4.10 Section Headings, 2.4.12 Focus Not Obscured (Enhanced) (no part hidden), 2.4.13 Focus Appearance (New, details below).

### 2.5 Input modalities

- **2.5.1 Pointer Gestures (A, 2.1).** Functions using multipoint (pinch) or path-based (swipe along a path) gestures can also be operated with a single pointer without a path, unless the gesture is essential.
- **2.5.2 Pointer Cancellation (A, 2.1).** For single-pointer functions, the down-event does not execute the function; or completion is on the up-event with a way to abort or undo; or the up-event reverses the down-event; or down-event completion is essential (a piano key, an on-screen keyboard).
- **2.5.3 Label in Name (A, 2.1).** For components with a visible text label, the accessible name contains that text. A best practice is to put the label text at the start of the name (Note).
- **2.5.4 Motion Actuation (A, 2.1).** Functions triggered by device or user motion (shake to undo, tilt) can also be operated through UI components, and motion response can be disabled, unless the motion goes through an accessibility-supported interface or is essential.
- **2.5.7 Dragging Movements (AA, New).** Details below.
- **2.5.8 Target Size (Minimum) (AA, New).** Details below.
- AAA: 2.5.5 Target Size (Enhanced) (44 by 44 CSS pixels; called Target Size in 2.1), 2.5.6 Concurrent Input Mechanisms.

## WCAG 2.2 additions in detail

### 2.4.11 Focus Not Obscured (Minimum) (AA)

- Rule: when a component receives keyboard focus, the component is not entirely hidden due to author-created content (SC 2.4.11). Partly hidden passes AA; 2.4.12 (AAA) requires no part hidden.
- The test is on the focused component, not the focus indicator, unless the indicator is inside the component; a fully hidden indicator likely fails 2.4.7 instead (Understanding 2.4.11, Intent, Note).
- Typical failures: sticky headers, sticky footers, cookie banners and non-modal dialogs that cover the focused element as the user tabs (Understanding 2.4.11, Intent; failure F110).
- Fixes: CSS `scroll-padding` so the scrolled-to element clears the sticky region (technique C43); make a banner modal so it must be dismissed first; or close non-essential notifications when they lose focus (Understanding 2.4.11, Intent).
- Only the initial position of user-movable panels counts (Note 1). Content the user opens may obscure focus if the user can reveal the focused item without moving focus back, for example with Escape or by scrolling (Note 2; Understanding 2.4.11, User-opened content).
- A properly built modal dialog always passes, because focus moves into it and stays there (Understanding 2.4.11, Modal dialogs).
- Translucent overlays may pass 2.4.11 yet fail 1.4.11 for the indicator's contrast (Understanding 2.4.11, Intent).

### 2.4.13 Focus Appearance (AAA)

- Rule: when the focus indicator is visible, an area of it is at least as large as a 2 CSS pixel thick perimeter of the unfocused component, and has at least 3:1 contrast between the same pixels in focused and unfocused states (SC 2.4.13).
- Exceptions: the user agent determines the indicator and the author cannot adjust it, or the author modifies neither the indicator nor its background.
- The perimeter is the component's visible content, border and background, not outside shadows or glows (Note 1). Sub-components such as menu items or grid cells count (Note 2).
- The simplest pass is a solid outline at least 2px thick with 3:1 change contrast (Understanding 2.4.13, Minimum area). 2.4.7 requires an indicator; 2.4.13 sets how visible it must be; 1.4.11 covers the component's own contrast (Understanding 2.4.13, Intent).
- It is AAA, so it is not required for AA conformance; report it as a criterion met beyond the claimed level when it passes (§ 5.3.2).

### 2.5.7 Dragging Movements (AA)

- Rule: all functionality that uses a dragging movement can be achieved by a single pointer without dragging, unless dragging is essential or the user agent provides the behaviour unmodified (SC 2.5.7).
- A dragging movement: the pointer engages an element on the down-event and the element follows the pointer until the up-event (Glossary).
- Keyboard support does not satisfy it: 2.1.1 and 2.5.7 are evaluated independently, and the alternative must be clickable or tappable (Understanding 2.5.7, Relationship to keyboard accessibility requirements).
- The alternative may not be a path-based gesture, which would fail 2.5.1 (Understanding 2.5.7, Intent). A text input beside a slider or color wheel is an acceptable alternative.
- Patterns that pass: a slider whose track can be clicked, a sortable list with move up and move down buttons, a kanban card with a "move to column" menu, map pan buttons, carousel previous and next buttons (Understanding 2.5.7, Examples; technique G219, failure F108).
- Browser scrolling, including scrolling a CSS `overflow` region, is the user agent's and out of scope, unless content suppresses it (Understanding 2.5.7, Intent).

### 2.5.8 Target Size (Minimum) (AA)

- Rule: pointer targets are at least 24 by 24 CSS pixels, except: **Spacing** (an undersized target's 24 CSS pixel diameter circle, centered on its bounding box, intersects no other target and no other undersized target's circle); **Equivalent** (another control on the same page meets the criterion); **Inline** (in a sentence, or constrained by the line height of non-target text); **User agent control** (size set by the browser and not modified); **Essential** (the presentation is essential or legally required) (SC 2.5.8).
- A slider or color gradient where position selects a value is one target (Note 1). Overlapping areas do not count toward size unless both targets do the same thing (Glossary, target).
- Size check: a solid 24 by 24 CSS pixel square, aligned to the axes, fits fully inside the target. Rounded corners can make a 24px button undersized (Understanding 2.5.8, Size requirement).
- Zoom does not help: CSS pixel sizes do not change when the user zooms (Understanding 2.5.8, Size requirement).
- Worked cases from Understanding 2.5.8 (Spacing): 20 by 20 targets with 4px gaps pass through spacing; 20 by 20 targets with no gap fail; a 16px-tall row with nothing above or below passes, but two such rows 1px apart fail.
- Targets are not evaluated while covered by user-triggered or scripted content such as an open combobox list or modal (Understanding 2.5.8, Size requirement).
- Fix: give the target container `min-height` and `min-width` (technique C42), or add spacing. 24px is a floor; 2.5.5 (AAA) asks for 44 by 44.
