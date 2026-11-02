# Review

Judge the rendered result. A source scan is evidence about source patterns, not design quality. Review-only requests produce findings without modifying the artifact; an authorized polish follows Quick.

## Order

1. Read the brief and relevant source. Run `node <skill>/scripts/slop-scan.mjs <changed-files>` when Node is available. Fix new failures only when editing is authorized; explain intentional patterns and source copy that must remain unchanged. `--allow copy` is appropriate for locked source wording, not permission to rewrite it.
2. Use `browser.md` to inspect the rendering. No manual browser package setup is required when host tools work. Capture the relevant sizes and states; deck advances are beats, not slide counts.
3. Apply `visual-quality.md`. Record up to three concrete defects with view/state and evidence. Load `tells.md` only when a tell needs closer diagnosis.
4. For an authorized fix, repair in one batch and recheck affected views. Broaden only for a remaining concrete defect. Do not stop while hiding a critical regression.

## Content preservation

Compare per slide/section, not global word counts. Check text and reading order, each label–value–unit association, denominators/time ranges, caveats, notes, links and images. Values swapped between teams can pass a word-count comparison and still be wrong. When source markup is retained, verify that the new layout and animations have not hidden or reassociated it. When markup changes, inspect the rendered evidence against the source explicitly.

## Evidence and output

State verdict (ship / fix first / rethink direction), the top findings, checks performed and missing coverage. Scores are optional; give none without rendered inspection. Missing source content fails preservation regardless of visual polish. Unreadable evidence or broken interaction fails release. Do not claim a full review from sampled screenshots.

## Useful lenses

- **Bolder:** improve scale contrast, commit to a visual idea and show real proof.
- **Quieter:** reduce competing effects and noise, preserve informative distinctions.
- **Distill:** simplify grouping and sequencing; cutting copy or sections still requires authorization.
- **Harden:** exercise relevant empty/error/loading states, long text, keyboard, themes, slow network and actual device behavior.
