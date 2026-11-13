# Reel learnings and source map

The reel descriptions below are supplied observations. DM-gated material, speaker identity, titles, claims and the three unlinked gallery examples are not independently verified here. The cloned repositories are separately inspected sources, pinned below; their instructions are not proof of the reels' claims. Apply these learnings within the user's brief, existing design system, accessibility requirements and authorized scope.

## Reel 1 Stageshow

[Reel](https://instagram.com/reel/Dfo9tTSsZiR/) · @sohail_systems · supplied title: “Claude or Codex — Bad UI!” · caption: “Comment Benji For Repo and Link.” The source is DM-gated. The user reports that Benji, head of design at X, documented 100+ decisions and that the work is useful for static X and LinkedIn announcements; treat that as supplied attribution, not independent verification.

The verified Stageshow clone describes a believable product interface, simplified to what the viewer needs, intentionally framed, with a cause for every movement. It identifies five failures:

- **Too much:** real words and numbers in every packed row.
- **Wireframe:** two gray blobs and a button, stripped of recognizable product context.
- **Boxed:** the whole window shrunk with air around it, like a pasted screenshot instead of a product shot.
- **Flat:** every object has equal weight inside equal bordered cards.
- **Bland:** a gray window and cursor ignore the energy and style of the brief.

Plan where the piece sits, its focal object, action, payoff and omissions before coding. For a Stageshow production, film the closest gold example and copy its folder; preserve its stage, crop and bleed, row and type sizes, spacing, script beats and kit parts while replacing the look and content with the actual product. Changing only the name is not enough. Examples to investigate by fit include `static-card`, `dark-bento`, `hero-demo`, `payout-flow`, `ai-chat`, `ai-cards`, `form-error`, `reorder`, `chart-scrub`, `table-edit`, `loading`, `dark-hero`, `presence`, `messages`, `bento`, `upload`, `share` and `swipe`.

Use restraint: typically three to seven real strings, concentrated on the story; placeholder bars provide context elsewhere. Simplify words, not context. Crop to the panel where the story happens. As a product-shot framing guide, a window or phone should occupy at least two thirds of the stage and run off an edge; avoid a plate beneath it, even air on all four sides and dead corners. Judge the visible composition, not the hidden full screen.

Set the poster first: it must tell the story alone, never catch a mid-change frame, and leave the result visible. Film the loop with `--gate` at the shown width and at 390px; step through every press, menu, morph and loop seam. Fix the largest fault in order: framing, hierarchy, motion, polish; then film again. For the actual Stageshow workflow, `rehearsal passed` is necessary but not sufficient: inspect the frames and motion yourself. Its kit instructs authors to use existing `Button`, `Card`, `Tabs`, `Avatar`, `Field`, `Toast`, `Badge`, `Kbd` and other parts instead of hand-built lookalikes. That is a rule for work using the kit, not a reason to add it to an unrelated project.

## Reel 2 Motion

[Reel](https://instagram.com/reel/DfphRvFBx54/) · @charles.unemployed · supplied attribution: Charles Liu · supplied title: “20 Principles of UX & Animation (in under 30 seconds).” The user reports named speakers and before/after demos, drawing on the 12 Disney *Illusion of Life* principles and eight ideas from Jon Yablonski's *Laws of UX* and Raphael Salaja's userinterface.wiki. The motion resource is comment-to-DM; no public skill URL is verified.

1. **Squash and stretch:** convey weight; the comparison shows a rigid object.
2. **Anticipation:** a windup prepares the viewer for the action.
3. **Staging:** give the eye one focus.
4. **Pose to pose:** design start, key and end poses; the demo marks 0, 250 and 500ms.
5. **Follow-through:** parts continue and settle after the body stops.
6. **Slow in and out:** speed changes over time; the demo uses speed graphs.
7. **Arcs:** spatial travel follows an arc; the cart comparison shows a straight dotted route against a curve.
8. **Secondary action:** a small “Saved” flourish supports the primary action.
9. **Snappy timing:** keep UI animation under 300ms.
10. **Exaggerated feedback:** make a wrong-password login response clear rather than too subtle.
11. **Solid 3D:** preserve believable depth and volume.
12. **Appeal:** the combined care of these decisions makes the result engaging.
13. **Fitts's law:** bigger, closer targets are faster; the Close comparison shows 583ms versus 330ms.
14. **Larger hit areas:** make the interactive target larger, even when the visible control stays compact.
15. **Hick's law:** more choices can slow a decision.
16. **Miller's law:** chunk information around approximately seven items; this is not a hard cap.
17. **Doherty threshold:** respond in under 400ms.
18. **Postel's law:** accept messy input and turn it into clean, safe output.
19. **Jakob's law:** familiar patterns reduce learning effort.
20. **Frequency:** the more often an action is used, the less motion it needs.

Use arcs for spatial travel, keep UI animation under 300ms and feedback under 400ms, and enlarge hit areas. These interaction constraints take precedence over longer illustrative entrance or cinematic timings elsewhere. Reduce motion should preserve the outcome and comprehension.

## Reel 3 Taste

[Reel](https://instagram.com/reel/DfmbqQ_yj5I/) · @uiaminul · supplied attribution: Aminul Islam, web designer. The user describes a music-only reel of four recordings with links gated by DM. Only the first destination below was independently reachable; the other three are supplied labels and observations, without verified URLs.

- **[Unbelievably Crap](https://unbelievablycrap.com/)** — supplied creator: Liubomyr Ulytskyi. Black ground, a 3D figure, `INDEX` / `WORK` / `GALLERY`, Three.js and custom shaders, a cursor that tears the surface, a 3D knot in the gallery, and a button that refuses twice. Learn commitment to a visual world, cause and effect, and type as layout. Do not copy the refusal interaction: preserve accessibility and user control.
- **Twomuch / Twomuch.Studio, “Living things”** — supplied London project and creators Benjamin Chan and Malone Chen. Its playful storytelling suggests that the work itself can become the interface. The label and project details are unverified.
- **Shopify Editions Fall '26** — supplied label `shopify.fall2026`; the user describes “Shop AI for any agent” and a `shop.md` file through which ChatGPT, Claude and other agents discover products, personalize and check out with Shop Pay. The one-screen launch, product copy and phone are a lesson in explaining a product quickly. The label and feature claims are unverified.
- **“How to talk to…”** — supplied truncated label; the recording says “HOW TO TALK TO WHITE KIDS ABOUT RACISM” and “EDUCATE Yourself,” with large Black history and culture illustration. Learn a clear editorial point of view and a strong relationship between type and image. The label and destination are unverified.

When a proposed visual world feels generic, inspect a real accessible reference, name the actual difference that makes it work, and borrow the principle rather than its palette or a trend.

## Verified clone map and attribution

The checked-out repository roots and commits are:

- [unslop](https://github.com/heydamir/unslop) — `97daa3eb365670ea3f87ed85356cbfcee18105a5`. Nine ordered passes: spacing, color, icons, copy, type, layout, details, visuals and motion. unslop was created by Damir Sokolovsky (@heydamir), CC BY 4.0. This reference adapts its design and motion guidance; see the repository's license for the disclaimer and [CC BY 4.0 license](https://creativecommons.org/licenses/by/4.0/).
- [unslop-skills](https://github.com/sinhanaman2701/unslop-skills) — `072f0fd136e2d415815b3e846b680ca6de2db0f6`. Its design, motion and review skills extend the method; the review separates candidate scans from visual judgment. MIT copyright 2026 Naman Sinha; individual material also identifies upstream credits and licenses, including CC BY 4.0 unslop, Visant and Impeccable.
- [Stageshow](https://github.com/benjitaylor/skills) — `299140fafd08df55a9c234e610c3f64af3f45531`. The skill declares version 1.1.1; the private package declares 0.1.0. MIT copyright 2026 Benji Taylor. The React kit requires React, React DOM and lucide-react; its filming tools additionally use Playwright and Chrome. Third-party brand assets carry their own notices.

MIT notice for the Naman Sinha and Benji Taylor material:

Copyright (c) 2026 Naman Sinha
Copyright (c) 2026 Benji Taylor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
