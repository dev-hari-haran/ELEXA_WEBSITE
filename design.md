# Design — ELEXA Reader

A locked design system for ELEXA Reader. Every page redesign reads this file before emitting code. Do not regenerate per page — extend or amend this file when the system needs to grow.

## Genre
`editorial`

## Macrostructure family
Pages within a family share the family's shape; they vary only in component archetypes.

- **App views (Home, Library, Notes, Analytics)**: Workbench / Editorial Dashboard
- **Reader workspace**: Long Document Focus Reader (Zen Mode, 65ch measure, marginalia annotations)
- **Overlays & Modals (Book Detail, Command Palette)**: Specimen Overlay

## Theme Tokens
- `--color-paper`: `oklch(0.975 0.012 85)` (`#FAF7F0` - Warm literary cream)
- `--color-paper-2`: `oklch(0.945 0.018 80)` (`#F2EDE4` - Surface elevation)
- `--color-paper-3`: `oklch(0.915 0.022 75)` (`#E9E2D5` - Hover state)
- `--color-ink`: `oklch(0.18 0.02 45)` (`#1C1917` - Deep warm ink primary)
- `--color-ink-2`: `oklch(0.42 0.02 45)` (`#57534E` - Secondary metadata ink)
- `--color-ink-muted`: `oklch(0.55 0.02 45)` (`#78716C` - Muted caption ink)
- `--color-rule`: `oklch(0.88 0.015 75)` (`#E2DACD` - Crisp 1px hairline rules)
- `--color-accent`: `oklch(0.62 0.18 35)` (`#E06A5E` - Terracotta bookmark accent)
- `--color-accent-hover`: `oklch(0.55 0.19 35)` (`#D15649`)
- `--color-accent-light`: `oklch(0.96 0.02 35)` (`#FDF2F0`)
- `--color-focus`: `oklch(0.55 0.16 35)`

## Typography
- **Display**: `"Newsreader"`, `"Georgia"`, serif, weight 600, style normal
- **Body**: `"Plus Jakarta Sans"`, -apple-system, sans-serif, weight 400
- **Reader Text**: `"Literata"`, `"Georgia"`, serif, weight 400
- **Mono**: `"JetBrains Mono"`, monospace, weight 400
- **Display tracking**: `-0.025em`

## Spacing
4-point named scale. Pages must use named custom tokens or mapped utility classes:
- `--space-3xs`: 0.25rem
- `--space-2xs`: 0.5rem
- `--space-xs`: 0.75rem
- `--space-sm`: 1rem
- `--space-md`: 1.5rem
- `--space-lg`: 2rem
- `--space-xl`: 3rem
- `--space-2xl`: 4.5rem

## Motion Stance
- **Easings**: `cubic-bezier(0.16, 1, 0.3, 1)` named `--ease-out`
- **Reveal pattern**: Soft opacity transition + 4px vertical shift
- **Reduced-motion fallback**: Opacity-only ≤ 150 ms

## Microinteractions & State Stance
- All interactive elements must support the 8-state discipline:
  `default` · `hover` · `focus-visible` · `active` · `disabled` · `loading` · `error` · `success`
- Hover delay: 0 ms, transition duration: 200 ms
- Tactile hover elevation: `transform: translateY(-1px)`
- Focus rings: 2px solid `var(--color-focus)` with 2px offset

## CTA & Button Voice
- **Primary Action**: Solid terracotta accent background, crisp warm ink text, pill/rounded border, subtle shadow.
- **Secondary Action**: Hairline border (`var(--color-rule)`), ink text, surface hover transition.
- **Icon Buttons**: Circular or square pill, soft surface hover, clean focus ring.

## What pages MUST share
- The top header & left navigation rail layout & spacing rhythm.
- The warm editorial OKLCH color token system across all light/cream/dark variants.
- High-contrast literary serif headlines and clean micro-badges.
- Tactical hairline rule dividers instead of heavy shadow containers.

## Exports
### tokens.css
```css
:root {
  --color-paper: oklch(0.975 0.012 85);
  --color-paper-2: oklch(0.945 0.018 80);
  --color-paper-3: oklch(0.915 0.022 75);
  --color-ink: oklch(0.18 0.02 45);
  --color-ink-2: oklch(0.42 0.02 45);
  --color-ink-muted: oklch(0.55 0.02 45);
  --color-rule: oklch(0.88 0.015 75);
  --color-accent: oklch(0.62 0.18 35);
  --color-accent-hover: oklch(0.55 0.19 35);
  --color-accent-light: oklch(0.96 0.02 35);
  --color-focus: oklch(0.55 0.16 35);

  --font-display: "Newsreader", "Georgia", serif;
  --font-body: "Plus Jakarta Sans", sans-serif;
  --font-reader: "Literata", "Georgia", serif;
  --font-mono: "JetBrains Mono", monospace;

  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --dur-short: 200ms;
}
```
