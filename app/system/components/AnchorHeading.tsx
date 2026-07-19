'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function CopyIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Section headings double as copyable anchors so a component can be handed to
 * an agent or teammate by URL reference.
 */
export function AnchorHeading({
  as: Tag,
  children,
}: {
  as: 'h2' | 'h3';
  children: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);
  const text = typeof children === 'string' ? children : String(children);
  const id = slugify(text);

  const copy = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // clipboard blocked — still update the hash so the URL is shareable
    }
    history.replaceState(null, '', `#${id}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <Tag id={id} className="anchor-heading">
      {children}
      <button
        type="button"
        className="anchor-heading-link"
        onClick={copy}
        aria-label={`Copy link to “${text}”`}
        title="Copy link to this section"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={copied ? 'check' : 'copy'}
            initial={{ opacity: 0, scale: 0.25, filter: 'blur(4px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.25, filter: 'blur(4px)' }}
            transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
            className="anchor-heading-icon"
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
          </motion.span>
        </AnimatePresence>
      </button>
    </Tag>
  );
}
