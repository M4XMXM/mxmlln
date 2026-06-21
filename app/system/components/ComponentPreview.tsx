'use client';

import { useState } from 'react';

/**
 * shadcn-style preview card: a Preview / Code tab toggle over a single panel.
 * The Preview tab renders the real, interactive component (children); the Code
 * tab shows the corresponding source. Authored in content/system.mdx as:
 *
 *   <ComponentPreview source="app/blog/Minimap.tsx" code={`<Minimap />`}>
 *     <MinimapDemo />
 *   </ComponentPreview>
 */
export function ComponentPreview({
  source,
  code,
  background = 'light',
  tall = false,
  children,
}: {
  /** Where the component lives in the repo, e.g. app/blog/Minimap.tsx */
  source?: string;
  /** Source snippet shown in the Code tab */
  code: string;
  background?: 'light' | 'dark' | 'checker' | 'glass';
  /** Taller, top-aligned canvas — for content that needs vertical room (popovers). */
  tall?: boolean;
  children: React.ReactNode;
}) {
  const [tab, setTab] = useState<'preview' | 'code'>('preview');
  return (
    <div className="component-preview">
      <div className="component-preview-tabs" role="tablist">
        <button
          role="tab"
          aria-selected={tab === 'preview'}
          className={tab === 'preview' ? 'is-active' : ''}
          onClick={() => setTab('preview')}
        >
          Preview
        </button>
        <button
          role="tab"
          aria-selected={tab === 'code'}
          className={tab === 'code' ? 'is-active' : ''}
          onClick={() => setTab('code')}
        >
          Code
        </button>
        {source ? <code className="component-preview-source">{source}</code> : null}
      </div>
      {tab === 'preview' ? (
        <div
          className={`component-preview-canvas component-preview-canvas--${background}${tall ? ' component-preview-canvas--tall' : ''}`}
        >
          {children}
        </div>
      ) : (
        <pre className="component-preview-code">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}
