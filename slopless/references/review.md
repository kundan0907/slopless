# Review

Judge pictures, not code. If a problem is visible in a screenshot, it is real.

## Order
1. `node <skill>/scripts/slop-scan.mjs <files>` — fix every `FAIL`; justify or fix every `WARN`.
2. `node <skill>/scripts/shoot.mjs <file-or-url> [--deck]` — screenshots at 1440/768/390 (decks: 1920×1080 and 1440×810, plus `--steps N` to press → between shots). Open every image.
3. Critique with the passes below; write it down in the format at the end.
4. Fix the top problems in one batch. Re-shoot once. Stop: open-ended polishing burns time and makes things worse.

## Passes (score each 0–10)
1. **Squint** — is there one dominant thing per view? Is hierarchy obvious with eyes half-closed?
2. **Idea** — could the competitor's name replace this one's and nothing change?
3. **Type** — sizes far apart, headlines ≤ 2 lines, measure, chosen face actually loaded.
4. **Colour** — one accent, used on the action; body in full ink; strategy consistent.
5. **Composition** — neighbours differ; no stock section order; idea carried into every part.
6. **Tells** — count against `tells.md`. Four or more = average; the score caps at 5.
7. **Real things** — real content, real images/devices/data; nothing fake or placeholder.
8. **Motion** — one signature move with a job; states land; reduced motion works; nothing too fast to talk over.
9. **Craft floor** — states, focus, browser surfaces, contrast (`craft-floor.md`).
10. **Fit** — matches the brief, the playback summary and the user's taste memory.

Caps: any banned tell → max 6. Unreadable text at rest → max 4. Missing content from the source → fail regardless.

## Content audit (when there is a source of truth)
Diff semantically: every heading, number, unit, caveat, link, note and image in the source is present and unchanged. Report discrepancies explicitly.

## Output
```
Score: <n>/100   Verdict: ship | fix first | rethink direction
Top 3 problems (with screenshot + location): …
Tells found: …
Not verified: <browsers/devices/real presenter hardware not tested>
```

## Modes for an existing design
- **Bolder** — it's safe and bland: bigger scale contrast, a committed colour field, one signature move.
- **Quieter** — it's loud: remove effects, drop to one accent, one motion moment, more space.
- **Distill** — it's cluttered: cut sections without claims, merge beats, one idea per view.
- **Harden** — production: empty/error/loading states, long text, i18n, slow network, keyboard.
