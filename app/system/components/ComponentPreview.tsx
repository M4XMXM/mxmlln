import React from 'react';

/**
 * Renders a live example (children) inside a framed canvas, with the
 * corresponding source shown below it. Authored in content/system.mdx as:
 *
 *   <ComponentPreview code={`<BlurFade inView>Hello</BlurFade>`}>
 *     <BlurFade inView>Hello</BlurFade>
 *   </ComponentPreview>
 *
 * The live element and the code string are kept separate on purpose so the
 * preview always reflects real, runnable code from the registry.
 */
export function ComponentPreview({
  title,
  source,
  code,
  background = 'light',
  children,
}: {
  title?: string;
  /** Where the component lives in the repo, e.g. registry/ui/blur-fade.tsx */
  source?: string;
  /** Source snippet shown beneath the canvas */
  code: string;
  background?: 'light' | 'dark' | 'checker';
  children: React.ReactNode;
}) {
  return (
    <div className="component-preview">
      {(title || source) && (
        <div className="component-preview-head">
          {title ? <span className="component-preview-title">{title}</span> : null}
          {source ? <code className="component-preview-source">{source}</code> : null}
        </div>
      )}
      <div className={`component-preview-canvas component-preview-canvas--${background}`}>
        {children}
      </div>
      <pre className="component-preview-code">
        <code>{code}</code>
      </pre>
    </div>
  );
}
