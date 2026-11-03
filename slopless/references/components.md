# Component sourcing

Use when the task needs a nontrivial UI component that the project does not already provide, or the user names a component library. Start with the user's task and design intent, not a catalogue of effects. Reuse proven behavior and adapt the presentation; a library demo is not a finished product.

## Find, adapt, then build the gap

1. **Search locally first.** Inspect the package manifest, design system, component directory and relevant callers. Reuse or extend a working component before importing another version. A spacing, palette or copy change needs no library search.
2. **Describe the need.** Identify the behavior, content density, platform, framework and visual intent: for example, a searchable team picker with keyboard navigation, or a restrained animated disclosure. Match these requirements rather than a screenshot's decoration. Respect a named source or a request for custom work.
3. **Search narrowly.** Choose the best-fit source below. Inspect the exact component's official demo, source, dependencies and installation instructions. Start with one source; try a second only if it fails the fit. Compare at most three candidates before choosing or building the missing part. Do not browse every library, load full registries or paste entire documentation sites into context.
4. **Choose by total integration cost.** Prefer a compatible implementation with the required behavior over a prettier demo that needs a new framework, styling engine or animation runtime. Check current APIs, license/access terms, required notices, responsiveness, keyboard/focus behavior and reduced motion. A provider's reputation is not verification of the individual component.
5. **Integrate deliberately.** Use an existing registry/MCP connector when available; ordinary official docs and source work without one. No extra skill, account, API key or MCP setup is required. Inspect the files and dependencies a registry command will add or overwrite before running it; preserve existing configuration, follow project installation rules and review the diff. Use the project's package manager. Never initialize or migrate the project just to fit a component.
6. **Make it belong.** Adapt tokens, type, spacing, shape, copy and motion to the chosen design language. Preserve useful semantics and interaction logic. Compose around the user's real task; do not assemble unrelated demos into a page. Test affected controls and inspect the result using `browser.md` and `visual-quality.md`. Report the source link and whether the component was reused, adapted or studied; retain required notices in the deliverable.

## Sources by need

These are starting points, not a ranking or a promise that every item is free, accessible or fast. Verify the exact item and current installation path. Keep a compatible library already in the project, including Radix or platform-native components, rather than replacing it with a listed alternative.

| Source | Useful for | Fit to check |
| --- | --- | --- |
| [shadcn/ui](https://ui.shadcn.com/docs/components) and its [registry](https://ui.shadcn.com/docs/registry) | Common product controls, forms, tables and application blocks | React stack, configured primitive family, styling and registry dependencies |
| [Kokonut UI](https://kokonutui.com/docs) | Distinctive interactive cards, navigation, inputs and presentation details | shadcn registry, Tailwind requirements and per-component dependencies; some items are Pro |
| [Base UI](https://base-ui.com/react/overview/about) | Unstyled behavior primitives for a custom visual language | React; supply styling rather than expecting a finished visual system |
| [React Aria](https://react-aria.adobe.com/) | Accessible interactions, collections, selection and internationalized controls | React; choose the appropriate component and styling approach |
| [Motion Primitives](https://github.com/ibelick/motion-primitives) | Composable animated interface patterns | Component dependencies, interruption and reduced-motion behavior |
| [Magic UI](https://magicui.design/docs) | Marketing components, product framing and intentional visual emphasis | React-oriented integration; decorative effects must serve the brief; Pro items have separate access |
| [React Bits](https://reactbits.dev/get-started/introduction) | Expressive animated components, backgrounds and microinteractions | Select the JS/TS and CSS/Tailwind variant; inspect animation dependencies and rendering cost |

## When learning is cheaper than importing

If the implementation is incompatible, study its grouping, proportions, state model or motion timing and implement the smallest suitable equivalent in the current stack. Distinguish learning a pattern from copying source; copied code retains its license obligations. Do not strip complex keyboard/focus logic from a widget and claim equivalent behavior.

For standalone HTML/decks, prefer existing or native HTML/CSS/JS. Do not add React, Tailwind or a bundler for one visual effect. For native mobile or non-React projects, use the installed platform/framework components first; the React sources above can inform visual intent without becoming dependencies.

Build custom when no candidate fits, integration costs more than the missing behavior, or the user wants original work. If source access fails, use available local components or a bounded custom solution and disclose the limitation. Never claim a component was inspected or reused when only its screenshot was available. Paid components require existing access; do not buy access or block the whole task on them.

## Keep Quick quick

Reuse local components immediately. Look externally only for a missing component or a requested reference; do not replace working controls during a restyle. Stop when one suitable candidate meets the need. Cache a chosen source link and relevant decisions in project design notes when useful, not an entire catalogue. Component reuse saves implementation work only when adaptation and verification cost less than a custom build; do not promise token or runtime savings without measurement.
