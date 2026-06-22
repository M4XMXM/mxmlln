import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import type { MDXComponents } from 'mdx/types';
import Minimap from '../blog/Minimap';
import {
  Swatches,
  Swatch,
  RadiusBox,
  ShadowBox,
  Type,
} from './components/TokenSwatch';
import { ComponentPreview } from './components/ComponentPreview';
import { LogoDemo, NavDemo, MenuDemo } from './components/ChromeDemos';
import { ButtonDemo, InputDemo } from './components/FormDemos';
import { ChatDemo } from './components/ChatDemos';
import './system.css';

// Unlisted reference page: live at /system, but kept out of search + AI crawlers.
export const metadata: Metadata = {
  title: 'Design System — Maximillian Piras',
  description: 'Internal reference for the tokens, components, and patterns behind maximin.design.',
  robots: { index: false, follow: false },
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function HeadingWithId(Tag: 'h2' | 'h3') {
  return function Heading(props: any) {
    const text =
      typeof props.children === 'string' ? props.children : String(props.children);
    return <Tag id={slugify(text)} {...props} />;
  };
}

const mdxComponents: MDXComponents = {
  h2: HeadingWithId('h2'),
  h3: HeadingWithId('h3'),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  a: ({ href, children, ...rest }: any) => {
    const isExternal = (href || '').startsWith('http') || (href || '').startsWith('//');
    return (
      <a
        href={href}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  },
  // Doc helpers
  Swatches,
  Swatch,
  RadiusBox,
  ShadowBox,
  Type,
  ComponentPreview,
  LogoDemo,
  NavDemo,
  MenuDemo,
  ButtonDemo,
  InputDemo,
  ChatDemo,
};

export default function SystemPage() {
  const filePath = path.join(process.cwd(), 'content', 'system.mdx');
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  return (
    <article className="system-page">
      <Minimap selector=".system-prose h2[id], .system-prose h3[id]" />
      <header className="system-header">
        <div className="system-header-eyebrow">{data.eyebrow ?? 'Design System'}</div>
        <h1>{data.title ?? 'Design System'}</h1>
        {data.description ? <p className="system-header-desc">{data.description}</p> : null}
      </header>
      <div className="system-prose">
        <MDXRemote source={content} components={mdxComponents} />
      </div>
    </article>
  );
}
