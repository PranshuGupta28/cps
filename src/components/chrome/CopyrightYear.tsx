"use client";

export function CopyrightYear() {
  // Client-side so the year is always current without dynamic SSR.
  return <>{new Date().getFullYear()}</>;
}
