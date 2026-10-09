# UI and UX Guide — DMMMSU-NLUC RPSU

Last reviewed: 2026-10-09  
Status: Working project guide based on the current Laravel, React, Inertia, and Tailwind implementation.

## Purpose

The system helps the Research and Publication Services Unit (RPSU) manage research records, knowledge resources, publications, IEC materials, innovations, technologies, commercialization records, and endorsement documents. Its interface must make three things clear at every step: **what the user can access, what action is available, and where a record or document stands now**.

This guide describes the existing interface and the behavior to preserve or improve as screens are changed. It is not a claim that every item in the quality checklist is already implemented.

## Audiences and access

| Audience | Main tasks | Interface emphasis |
| --- | --- | --- |
| Public visitor | Browse the research catalog, researcher profiles, publications, and IP showcase | Discovery, readable abstracts and metadata, clear sign-in path for restricted content |
| Researcher | View own research and outputs; submit and track own endorsements | Personal records, simple submission, tracking number, current status and location |
| Research & Publication Facilitator | Assist researchers within the assigned college | College-scoped lists and editing, clear college context |
| RPSU Staff | Process endorsements and maintain records | Efficient queues, filters, status updates, document history |
| RPSU Administrator | Manage all records, users, lookups, and reports | Broad navigation, administrative controls, reliable feedback |

Navigation visibility is role-aware, but server authorization remains the source of truth. Researchers see their own records and transactions; facilitators are limited to their assigned college and have no Endorsements or Reports access. Staff and administrators process endorsements; only administrators manage users and lookup data.

## Current information architecture

### Public site

- **Home (`/`)** introduces the repository and highlights counts, colleges, recent research, publications, researchers, and IP or copyright activity.
- **Research Catalog (`/catalog`)** provides search and filters. **Research Detail (`/catalog/{id}`)** exposes the public abstract and basic metadata.
- **Researchers (`/researchers`)** and researcher profiles support discovery by person.
- **Publications** and **IP & Copyright** are separate showcase pages.
- **Login (`/login`)** leads to the restricted workspace.

### Signed-in workspace

- **Dashboard** gives role-relevant summary and entry points.
- **Research** contains Repository, Research Records for authorized RPSU users, Knowledge Resources, and the researcher's own records.
- **My Workspace** contains the researcher's own research, transactions, publications, IEC materials, and innovations.
- **Transactions** contains the staff and administrator endorsement queue, detail, documents, and status handling.
- **Publication & IEC** and **Innovation** group the related registries.
- **Reports & Analytics** is a filtered report hub for staff and administrators.
- **Administration** contains users, roles, offices, and colleges for administrators.
- **Profile** and **Notifications** support account maintenance and updates.

## Visual language in the current app

| Element | Current pattern | Guidance for new work |
| --- | --- | --- |
| Brand | Deep emerald and teal, with slate surfaces | Keep emerald as the primary action and navigation color; use color consistently for meaning. |
| Public shell | White sticky header, compact navigation, search, responsive menu, light page background | Preserve a clear route to catalog discovery and sign-in. |
| Workspace shell | Dark emerald sidebar, white sticky top bar, light content canvas | Group destinations by task and show an unmistakable active item. |
| Login | Equal-width desktop panels: solid emerald system overview on the left and white sign-in form on the right; form first on phones | Keep labels, errors, and the submit state easy to scan. |
| Content | Rounded white cards, subtle borders and shadows, compact tables and forms | Favor clear headings, spacing, and readable data over decoration. |
| Status | Colored text badges | Always include the status text; color is only a secondary cue. |
| Feedback | Flash messages, field errors, loading skeletons, empty states | Keep feedback near the action and explain the next step. |

The global font stack uses Inter when available, then system sans-serif. The code uses Tailwind utilities rather than a large custom component theme. New shared visual rules should be centralized in reusable components or theme tokens where practical.

## Core journeys

### Discover research

1. A visitor starts on Home or the Catalog and searches by title, code, or keyword, or browses by college.
2. Results show enough metadata to decide which record to open; filters and result counts should remain understandable after navigation.
3. Public detail shows the abstract and basic metadata. Restricted record data and downloads require an authorized sign-in.
4. An authorized user can open the full record and permitted files. If access is unavailable, explain the restriction and any available access-request path.

### Submit and track an endorsement

1. A researcher enters the document title, college or department, endorsement type, submission date, optional related research, supporting file, and remarks.
2. The form displays required fields and field-specific validation. Preserve entered values after errors.
3. On success, show the tracking number in `RPSU-YYYY-XXXXX` form and a direct route to the transaction.
4. The detail page places **current status**, **current location**, and **last update** above the history so the answer is visible immediately.
5. History shows each change with time, responsible person, action taken, and remarks. Researchers can view history but cannot change status.

The physical route is Researcher → Records Office → RPSU → Records Office → RECI Office. QR stamping and saving at the Records Office happens outside this app. The UI should state when an office step is recorded manually to avoid implying that the app performs that work.

### Process an endorsement

1. Staff or an administrator finds an item in the Endorsements list using search and status filters.
2. Detail shows document identity, attachments, current status and location, and chronological history.
3. The update control offers only valid next statuses. Before submission, it shows the proposed change and asks for action taken or remarks where required.
4. After success, the new state appears immediately in the summary and history; failure keeps the form data and explains the problem.

### Manage records

Authorized RPSU users work from list → create or edit → detail. Lists should expose the most useful identifiers and filters, forms should group related fields, and destructive actions should identify the exact record before confirmation. Facilitators should always have visible college context where it affects the list or form.

## Interaction rules for future changes

- **Navigation:** Use task names in plain language. Keep the active destination visible. On smaller screens, navigation must remain reachable without covering essential content or trapping focus.
- **Search and filters:** Label controls, show applied filters, support a clear reset, and retain sensible context when paging or returning from a detail page. Distinguish a truly empty collection from a filtered result with no matches.
- **Forms:** Put persistent labels above fields. Mark required fields in text, give examples only when useful, and show specific validation beside the affected field. Disable repeated submission while processing and keep a visible success or error result.
- **Tables and cards:** Make key identifiers and status easy to scan. Use responsive wrapping or horizontal scrolling without clipping actions. Give each row a clear primary action.
- **Status and history:** Use one vocabulary across badges, filters, detail pages, and reports. Never rely on color alone. Show the latest state first in summaries and chronological events in the history.
- **Files:** Show file name, type or size when known, access level, and download permission. Explain why a file cannot be opened. Confirm removal of an uploaded document.
- **Feedback:** Loading, empty, error, success, and permission states need distinct text. Avoid leaving a user with a blank panel after a request.
- **Confirmations:** Use clear action labels and identify the affected item, especially for deletion and endorsement status updates.
- **Copy:** Use consistent terms: “Research Records” for management, “Research Catalog” for public browsing, “My Research” for the researcher's own records, and “Endorsements” or “My Transactions” according to role.

## Accessibility and responsive acceptance criteria

- Every input has an associated label; validation is conveyed in text and connected to its field.
- Interactive controls have accessible names, keyboard focus, and a visible focus indicator. Menus and dialogs can be dismissed with Escape and return focus appropriately.
- Status, alerts, and charts communicate their meaning in text as well as color or shape.
- Body text and control labels remain readable on mobile; touch targets have enough space to tap accurately.
- Public and workspace layouts work at narrow phone widths without horizontal page overflow. Dense tables may scroll within their own region.
- Loading animation respects reduced-motion preferences; content remains usable while a request runs.
- Success and error feedback is announced to assistive technology where appropriate.

## Review checklist for each UI change

1. Check the page as a public visitor or each relevant role; verify hidden navigation and direct route access agree.
2. Walk the primary task from entry point to completion, including validation, loading, empty, and error states.
3. Check phone and desktop layouts, keyboard operation, focus visibility, and readable status text.
4. Confirm record scope, file permissions, and endorsement transitions match the server rules.
5. Verify the final screen answers the user's next question: what happened, where the item is, and what to do next.

## Source of truth

This guide was derived from `README.md`, `routes/web.php`, `resources/js/Layouts`, `resources/js/Pages`, `resources/js/Components`, and `resources/css/app.css`. Update it alongside material changes to navigation, roles, visual patterns, or the endorsement journey.
