# Applying overlays safely

The Overlay Specification has no security considerations section. The checks below follow from its rules; each names the rule it comes from. Read this before applying an overlay in a build or publishing pipeline.

## Silent no-ops

A target that selects zero nodes succeeds without changing the document (§ 4.5.4.1). When the source description changes (a path is renamed, an `operationId` changes), an action can stop matching and nobody notices.

Check: when applying, record how many nodes each action selected, and fail the build when an action that should match selects nothing.

## Over-broad targets

Wildcards, filters and descendant segments can select far more than intended, and actions apply to every selected node (§ 4.5.4.1, § 4.6.3). `$..description` updates every description in the document.

Check: diff the result against the input and read the diff. Prefer specific targets (a path key, an `operationId` filter) over descendant segments.

## Removing security

`remove: true` deletes whatever the target selects (§ 4.5.4.1), including `security` arrays, Security Requirement entries or `components.securitySchemes`. An overlay that removes these makes the published description claim that operations need no authentication.

Check: compare the security requirements of every operation before and after applying. Treat any removal or narrowing of `security` or `securitySchemes` as a change that needs explicit review.

## Where the overlay and target come from

`extends` is an identifier, not necessarily a location (§ 4.4), and without it the tool decides which description to apply the overlay to (§ 4.5.1.1).

Check: keep overlays in version control next to the pipeline that applies them, review them like code, and pass the target document to the tool explicitly. Do not fetch overlays or targets from URLs that can change without review.

## JSONPath dialects

Libraries that predate RFC 9535 can parse the same expression differently or accept extra syntax (§ 4.9). The same overlay can then select different nodes in different tools.

Check: use only RFC 9535 syntax, and apply overlays with a tool that implements RFC 9535 fully (§ 4.9).

## Order dependence

Actions apply in order, each to the previous result (§ 4.5.1.1). Reordering actions, or inserting one in the middle, changes what later targets select.

Check: when editing an overlay, re-apply it from the original source and compare the full result, not just the edited action.

## Lost comments and formatting

Applying actions MAY drop YAML or JSONC comments (§ 4.10).

Check: do not keep information only in comments of a document that overlays rewrite.

## Merge errors

Merging an object into an array, or an array into a primitive, is an error (§ 4.5.4.1), and selected nodes must be all objects, all arrays or all primitives.

Check: treat a merge error as a failed build, not a warning.
