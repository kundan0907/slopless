# Surface: app screens, mobile, dashboards

Operating surfaces: the user has a task. Clarity and platform fit beat art direction; the premium feel comes from craft, not effects.

## Platform fit
- **iOS:** SF Pro via system font, Dynamic Type sizes (body 17, footnote 13, title 28/34), 44pt targets, safe areas, large titles that collapse, sheets with detents, native back swipe, SF Symbols-style icons, haptics on meaningful actions, materials (`.regularMaterial`) only where iOS itself uses them.
- **Android:** Roboto/system, Material 3 type scale, 48dp targets, edge-to-edge with insets, predictive back, ripple feedback, dynamic colour when the brand allows.
- **React Native / Expo:** Reanimated on the UI thread, Gesture Handler for drags and sheets, `Pressable` with pressed states, `expo-haptics`; test on a device, not only the simulator. (`animate-expo` skill goes deeper if installed.)
- **Dashboards (web):** density is a feature: 8–32px spacing scale, tabular numerals, tables with real lines, charts with direct labels instead of legends, one accent for the thing that needs action.

## Rules
- One primary action per screen. Bottom navigation ≤ 5 items. Predictable back. Deep links.
- Every list has empty, loading (skeleton matching layout), error with recovery, and long-content states.
- Forms: visible labels, inline errors next to the field, helper text, correct keyboard types.
- Icons from one family, fetched with `scripts/assets.mjs`, one weight; filled vs outline means state, consistently.
- Dark mode is designed, not inverted: raise surfaces by lightening, desaturate accents, keep contrast.
- Motion is functional: 150–300ms, springs for gestures, continuity between list item and detail (shared element), nothing blocks input.

## Verify
Screens at 390×844 and 430×932 (plus tablet if supported), both themes, largest accessibility text size, VoiceOver/TalkBack labels on icon buttons, a real device for gestures and haptics.
