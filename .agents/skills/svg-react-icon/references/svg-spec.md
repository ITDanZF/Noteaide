# SVG Specification Reference

## File Naming

| Level | Rule | Example |
|-------|------|---------|
| Filename | `kebab-case`, lowercase | `model-select.svg`, `deep-think.svg` |
| Export name | `PascalCase` + `Icon` suffix | `ModelSelectIcon`, `DeepThinkIcon` |
| Avoid | Abbreviations, generic names | ❌ `set.svg`, `icon1.svg` |

## Dimensions

Standard icon size:

```svg
<svg width="24" height="24" viewBox="0 0 24 24" ...>
```

Complex/large icon size (preserved aspect ratio):

```svg
<svg width="24" height="24" viewBox="0 0 1024 1024" ...>
```

> Display size is always controlled by React component props (`width`, `height`), not the SVG intrinsic size.

## Color Strategy

All icons must use `currentColor` to inherit parent color:

### Stroke-based icons

```svg
<svg fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
```

### Fill-based icons

```svg
<svg fill="none">
  <path d="..." fill="currentColor" />
</svg>
```

**Forbidden**: Hardcoded colors like `#000`, `#fff`, `#FF6B6B`, `rgb(0,0,0)`.

## Code Style

- Attributes: **kebab-case** (`stroke-width`, `stroke-linecap`, not `strokeWidth`)
- Required root attribute: `xmlns="http://www.w3.org/2000/svg"`
- Remove unnecessary: `id`, `class`, inline `style`, `data-*`
- Keep only: `width`, `height`, `viewBox`, `fill`, `stroke`, `stroke-*`, `aria-hidden`, `xmlns`

## Accessibility

| Role | Requirement |
|------|-------------|
| Decorative only | `aria-hidden="true"` on `<svg>` |
| Interactive/functional | `<title>Description</title>` as first child of `<svg>` |

Example with title:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <title>Send message</title>
  <path d="..." fill="currentColor" />
</svg>
```

## TypeScript Integration

Ensure `src/vite-env.d.ts` contains:

```ts
declare module '*.svg?react' {
  import type { FunctionComponent, SVGProps } from 'react';
  const ReactComponent: FunctionComponent<SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
```

## Vite Configuration

Ensure `vite.config.ts` contains:

```ts
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr()],
});
```

## Storage Location Decision Tree

```
Need to import as React component?  -->  src/components/icons/
     |
     No
     v
Used as CSS background / <img> src?  -->  src/assets/ (processed by Vite)
     |
     No
     v
Static resource (favicon, etc.)      -->  public/ (copied as-is)
```
