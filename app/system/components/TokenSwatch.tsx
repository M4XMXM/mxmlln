import React from 'react';

/**
 * Doc-only presentational helpers for the design-system page.
 * These render token values from globals.css / blog.css as visual specimens.
 * They are passed into MDXRemote so content/system.mdx can use them as tags.
 * No interactivity -> server components.
 */

export function Swatches({ children }: { children: React.ReactNode }) {
  return <div className="token-grid">{children}</div>;
}

export function Swatch({
  name,
  value,
  color,
  note,
}: {
  name: string;
  value: string;
  color: string;
  note?: string;
}) {
  return (
    <div className="token">
      <div
        className="token-chip"
        style={{ background: color }}
        aria-hidden
      />
      <div className="token-name">{name}</div>
      <code className="token-value">{value}</code>
      {note ? <div className="token-note">{note}</div> : null}
    </div>
  );
}

export function RadiusBox({ name, value }: { name: string; value: string }) {
  return (
    <div className="token">
      <div className="token-radius" style={{ borderRadius: value }} aria-hidden />
      <div className="token-name">{name}</div>
      <code className="token-value">{value}</code>
    </div>
  );
}

export function ShadowBox({ name, value }: { name: string; value: string }) {
  return (
    <div className="token token--wide">
      <div className="token-shadow" style={{ boxShadow: value }} aria-hidden />
      <div className="token-name">{name}</div>
      <code className="token-value token-value--block">{value}</code>
    </div>
  );
}

export function Type({
  name,
  sample = 'Form follows functionality',
  font = 'sans',
  size,
  weight,
  note,
}: {
  name: string;
  sample?: string;
  font?: 'sans' | 'handwritten' | 'mono';
  size?: string;
  weight?: number | string;
  note?: string;
}) {
  const fontFamily =
    font === 'handwritten'
      ? "var(--font-homemade-apple), 'Homemade Apple', cursive"
      : font === 'mono'
        ? "'JetBrains Mono', monospace"
        : "var(--font-archivo), 'Archivo', sans-serif";
  return (
    <div className="type-specimen">
      <div className="type-specimen-meta">
        <span className="type-specimen-name">{name}</span>
        <code className="token-value">
          {[size, weight ? `weight ${weight}` : null, font].filter(Boolean).join(' · ')}
        </code>
        {note ? <span className="token-note">{note}</span> : null}
      </div>
      <div
        className="type-specimen-sample"
        style={{ fontFamily, fontSize: size, fontWeight: weight as number }}
      >
        {sample}
      </div>
    </div>
  );
}
