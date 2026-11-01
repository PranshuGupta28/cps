"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Disclosure section: expanded on desktop, collapsible accordion on mobile.
 * The DOM `open` attribute is synced to the media query — no React state, so
 * SSR output (always open) stays consistent.
 */
export function CollapsibleSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const apply = () => {
      if (ref.current) ref.current.open = !mq.matches;
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <details ref={ref} id={id} open className="disclosure-section card p-6">
      <summary className="flex cursor-pointer items-center justify-between font-display text-lg font-bold text-brand-deep lg:pointer-events-none">
        {title}
        <span
          aria-hidden
          className="chev ml-2 inline-block text-brand transition-transform lg:hidden"
        >
          ⌄
        </span>
      </summary>
      <div className="mt-4">{children}</div>
    </details>
  );
}
