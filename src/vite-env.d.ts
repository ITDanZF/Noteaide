/// <reference types="vite/client" />

// Support for vite-plugin-svgr: import SVG as React components
// Usage: import Icon from './icon.svg?react'
declare module '*.svg?react' {
  import type { FunctionComponent, SVGProps } from 'react';
  const ReactComponent: FunctionComponent<SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
