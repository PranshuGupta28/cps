"use client";

import { useEffect, useState } from "react";

export function BackToTop({ label }: { label: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={label}
      className="no-print fixed bottom-6 left-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-brand-deep shadow-lg hover:bg-brand-soft"
    >
      <svg
        aria-hidden
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
      >
        <path d="M12 19V5m-7 7 7-7 7 7" />
      </svg>
    </button>
  );
}
