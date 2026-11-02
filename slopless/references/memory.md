# Taste memory

slopless gets better for each user by writing down what they like and reject. Two small files, read at the start of every run.

## `~/.slopless/taste.md` — the person (all projects)

Append one dated line per explicit user preference, with its source: user correction, choice or quote. Label agent-selected project decisions as agent choices in project DESIGN.md, not as personal taste. Keep memory under ~60 lines; when merging conflicting entries, preserve scope and prefer the newest explicit correction.

```markdown
# Taste
## Loves
- 2026-11-02 Frosted glass on story cards with opaque evidence panels.
- 2026-11-02 Connected scenes: the same object travels between slides.
## Rejects
- 2026-11-02 Orange/green decorative bars. "Looks AI generated."
- 2026-11-02 Choppy dock magnification where neighbours jump.
## Defaults
- Palette: Sapphire Glass (renamed "Night Studio"). Motion: Cinematic. Dark first.
- Fonts liked: … Fonts rejected: …
## Process
- Wants two live studies before a full build.
- Wants presenter control: → stops at each beat.
```

Write when the user: corrects the look ("too busy", "fonts feel cheap"), praises something specific, picks or renames a palette, rejects a direction, or states a process preference. Quote their words briefly. Never store personal data, client names, secrets or employer content here.

## `.slopless/DESIGN.md` — the project

The durable visual decisions for this project: palette tokens, type, material, motion level, signature move, the idea sentence, what was tried and rejected (and why), and the content authority. Update after the user approves a direction and after each version ships. Commit it with the project if the team shares the design.

## Precedence
User's words in this conversation > project DESIGN.md > personal taste.md > this skill's defaults.
