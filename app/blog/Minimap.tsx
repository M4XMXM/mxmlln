'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface Section {
  id: string;
  text: string;
  level: number;
}

interface MinimapProps {
  selector?: string;
  // Opt-in left-rail variant for /system; the blog keeps its full-TOC popover.
  reverb?: boolean;
}

// On hover, notch width tracks proximity to the cursor rather than heading
// level: the hovered notch peaks and the bonus halves each step out, down to
// the REVERB_BASE floor. At rest, notches keep their hierarchy widths.
const REVERB_BASE = 4;
const REVERB_AMPLITUDE = 30;
const REVERB_FALLOFF = 0.5;

export default function Minimap({
  selector = '.blog-prose h2[id], .blog-prose h3[id]',
  reverb = false,
}: MinimapProps) {
  const [sections, setSections] = useState<Section[]>([]);
  const [hovering, setHovering] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // One persistent label, not one card per notch, so it keeps its last text
  // and position while fading out — leaving the rail shouldn't snap it away.
  const [labelY, setLabelY] = useState(0);
  const [labelText, setLabelText] = useState('');
  const [labelWidth, setLabelWidth] = useState(0);
  const labelTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (hoveredIndex !== null && sections[hoveredIndex]) {
      setLabelText(sections[hoveredIndex].text);
    }
  }, [hoveredIndex, sections]);

  useEffect(() => {
    if (labelTextRef.current) setLabelWidth(labelTextRef.current.scrollWidth);
  }, [labelText]);

  const handleEnter = useCallback(() => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setHovering(true);
  }, []);

  const handleLeave = useCallback(() => {
    leaveTimer.current = setTimeout(() => setHovering(false), 150);
  }, []);

  useEffect(() => {
    const headings = document.querySelectorAll(selector);
    const items: Section[] = Array.from(headings).map((el) => ({
      id: el.id,
      text: el.getAttribute('data-minimap-label') || el.textContent || '',
      level: el.tagName === 'H3' ? 3 : 2,
    }));
    setSections(items);
  }, [selector]);

  useEffect(() => {
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  if (sections.length === 0) return null;

  if (reverb) {
    return (
      <div className="minimap minimap--reverb" onMouseLeave={() => setHoveredIndex(null)}>
        <div className="minimap-notches">
          {sections.map((s, i) => {
            const restWidth = s.level === 3 ? 10 : 16;
            const width =
              hoveredIndex === null
                ? restWidth
                : REVERB_BASE + REVERB_AMPLITUDE * Math.pow(REVERB_FALLOFF, Math.abs(i - hoveredIndex));
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`minimap-notch-row ${activeId === s.id ? 'minimap-notch-row--active' : ''} ${hoveredIndex === i ? 'minimap-notch-row--hovered' : ''}`}
                onMouseEnter={(e) => {
                  setHoveredIndex(i);
                  setLabelY(e.currentTarget.offsetTop + e.currentTarget.offsetHeight / 2);
                }}
                onFocus={(e) => {
                  setHoveredIndex(i);
                  setLabelY(e.currentTarget.offsetTop + e.currentTarget.offsetHeight / 2);
                }}
                onBlur={() => setHoveredIndex(null)}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span
                  className={`minimap-notch ${s.level === 3 ? 'minimap-notch--sub' : ''} ${activeId === s.id ? 'minimap-notch--active' : ''}`}
                  style={{ width: `${width}px` }}
                />
              </a>
            );
          })}
          <div
            className={`minimap-label ${hoveredIndex !== null ? 'minimap-label--visible' : ''}`}
            style={{
              transform: `translateY(${labelY}px) translateY(-50%)`,
              width: labelWidth ? `${labelWidth}px` : undefined,
            }}
            aria-hidden="true"
          >
            <span key={labelText} ref={labelTextRef} className="minimap-label-text">
              {labelText}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="minimap"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className="minimap-notches">
        {sections.map((s) => (
          <div
            key={s.id}
            className={`minimap-notch ${s.level === 3 ? 'minimap-notch--sub' : ''} ${activeId === s.id ? 'minimap-notch--active' : ''}`}
          />
        ))}
      </div>
      {hovering && (
        <div className="minimap-popover" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`minimap-link ${s.level === 3 ? 'minimap-link--sub' : ''} ${activeId === s.id ? 'minimap-link--active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' });
                setHovering(false);
              }}
            >
              {s.text}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
