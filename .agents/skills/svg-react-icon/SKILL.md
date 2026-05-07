---
name: svg-react-icon
description: >
  Manage and create custom SVG icons in React + Vite projects using vite-plugin-svgr.
  Use when the user needs to: (1) generate or add new SVG icons to a React project,
  (2) convert inline SVGs to component-based SVGs, (3) set up SVG icon management
  workflow with AI-generated assets, (4) integrate SVG icons with UI frameworks
  like Chakra UI, or (5) establish SVG naming/export conventions.
  Triggers on keywords: svg, icon, svgr, lucide alternative, ai generate icon.
---

# SVG React Icon Workflow

## Assumptions

- Project uses Vite (not Webpack/CRA)
- `vite-plugin-svgr` is installed and configured (if not, install and configure it first)
- Icons are stored as `.svg` source files and imported as React components via `?react` suffix

## Core Workflow

### 1. Add a New Icon

```
User describes icon  -->  AI generates .svg  -->  Save to src/components/icons/  -->  Export in index.ts  -->  Use in component
```

### 2. Directory Convention

```
src/components/icons/
├── index.ts           # Re-export all icons
└── [kebab-name].svg   # AI-generated SVG source files
```

- SVG filenames: `kebab-case` (e.g., `model-select.svg`, `deep-think.svg`)
- Export names: `PascalCase + Icon` suffix (e.g., `ModelSelectIcon`, `DeepThinkIcon`)

### 3. Registration Pattern

In `src/components/icons/index.ts`:

```ts
export { default as XxxIcon } from './xxx.svg?react';
```

Usage in business component:

```tsx
import { XxxIcon } from '@/components/icons';
<XxxIcon width={24} height={24} />
```

## AI Generation Prompt

When user asks to generate an icon, use this prompt template:

```markdown
Generate an SVG icon with these requirements:

1. Save as: `src/components/icons/{kebab-name}.svg`
2. Dimensions: width="24" height="24" viewBox="0 0 24 24" (standard) or viewBox="0 0 1024 1024" (complex)
3. Color: Use `currentColor` for all strokes/fills. NO hardcoded colors.
4. Attributes: kebab-case (stroke-width, stroke-linecap). Include xmlns.
5. Cleanup: Remove unnecessary id, class, style attributes.
6. Accessibility:
   - Decorative: add `aria-hidden="true"` to svg tag
   - Functional: add `<title>Brief description</title>` as first child

Icon description: {user_description}
```

## UI Framework Integration

### Chakra UI

SVG inherits color from parent:

```tsx
<Box color="teal.400">
  <XxxIcon width={20} height={20} />
</Box>
```

### Generic React

```tsx
<XxxIcon width={24} height={24} className="my-icon" style={{ marginRight: 8 }} />
```

## Reference Materials

- **Detailed SVG specification**: See [references/svg-spec.md](references/svg-spec.md)
- **Starter template**: See [assets/icon-template.svg](assets/icon-template.svg)
