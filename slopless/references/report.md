# Report

Every route ends with this report. It is the user's view of what happened and doubles as the PR description when the work is committed. Keep it to one screen; omit empty sections.

## Content changes are never silent

List every user-facing text, number, link, image or section that was added, rewritten, moved or removed, even when copy editing was authorized. Unauthorized content changes are not allowed; if one is needed, ask first. Drafted copy and placeholder data are flagged as drafts until the user approves them.

## Template

```markdown
## <Deliverable> — <route: Quick | Standard | Deep>

<One sentence: what now exists or what visibly improved, and where to open it.>

### Your choices
<Interview playback, or "Quick: no interview">. Agent picks are labelled "(picked)".

### What changed
- <Visible improvement 1 — the design reason>
- <Visible improvement 2>
Files: `<path>` (new | edited), …

### Content changes
| Where | Before | After | Why |
| --- | --- | --- | --- |
| Hero heading | "…" | "…" | tightened (authorized) |
Drafts to review: <list> · None: "All supplied content kept exactly."

### Checks
<rendered views compared (sizes/states), slop-scan, contrast, keyboard/reduced motion, tests>

### Not verified
<anything not inspected or not runnable>

### Next options
A. <most valuable next improvement> (Recommended) · B. <…> · C. <…>
```

## As a PR body

When asked to open a PR, use the same sections with the title `<imperative summary>` (≤ 60 characters). Add before/after screenshots when they exist. Keep it under ~40 lines; link files rather than pasting code.

## Contract evidence (every route)

Add the compact record from `run-contract.md#report`: Audit findings and severity; Direction approval source and inspected taste reference; nine ordered pass outcomes; Checklist failures/unverified rows; evidence-linked scores and derived disposition. Report exact capture or playback failures and every unchecked size/state. If rendering or required rehearsal is unavailable, say `recapture — visual verification unavailable`; source changes and a green scanner are not a visually completed screen. Omit the template’s Next options when no follow-up is needed.

## Version traceability

Include `slopless <version>` in the report's Checks line, reading the value from the installed skill folder's `VERSION` file. This identifies which release produced the work without adding tooling metadata to the delivered UI. If the file is unavailable, say `slopless version: unknown`; never infer a version from memory or the target project's package.
