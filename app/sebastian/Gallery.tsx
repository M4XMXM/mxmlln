"use client";

import { useCallback, useEffect, useState } from "react";
import { type Photo, wixImage } from "./data";

export default function Gallery({ photos }: { photos: Photo[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setOpenIndex((i) =>
        i === null ? null : (i + dir + photos.length) % photos.length
      ),
    [photos.length]
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, close, step]);

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {photos.map((photo, i) => (
          <button
            key={`${photo.uri}-${i}`}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="group mb-4 block w-full cursor-zoom-in break-inside-avoid text-left"
          >
            <img
              src={wixImage(photo.uri, 900)}
              alt={photo.title}
              width={photo.w}
              height={photo.h}
              loading="lazy"
              className="w-full transition-opacity duration-300 group-hover:opacity-90"
            />
            {photo.title && !/^[\d_]|^IMG_\d|\.(jpe?g|png)$/i.test(photo.title) && (
              <span className="mt-2 block text-[11px] uppercase tracking-[0.15em] text-neutral-500">
                {photo.title}
              </span>
            )}
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 p-6"
          onClick={close}
        >
          <img
            src={wixImage(photos[openIndex].uri, 2000)}
            alt={photos[openIndex].title}
            className="max-h-[85vh] max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-6 left-0 right-0 text-center text-[11px] uppercase tracking-[0.2em] text-neutral-500">
            {photos[openIndex].title}
          </div>
          <button
            type="button"
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-2xl text-neutral-400 hover:text-neutral-900"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-2xl text-neutral-400 hover:text-neutral-900"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
          >
            →
          </button>
          <button
            type="button"
            aria-label="Close"
            className="absolute right-4 top-4 p-3 text-2xl text-neutral-400 hover:text-neutral-900"
            onClick={close}
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}
