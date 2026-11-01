"use client";

export function WhatsAppFloat({
  number,
  label,
}: {
  /** E.164 digits only, e.g. "919425357853". Null => render nothing. */
  number: string | null;
  label: string;
}) {
  if (!number) return null;
  return (
    <a
      href={`https://wa.me/${number}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="no-print fixed bottom-6 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg transition-transform hover:scale-105"
    >
      <svg aria-hidden width="30" height="30" viewBox="0 0 32 32" fill="currentColor">
        <path d="M16 3C9.4 3 4 8.3 4 14.9c0 2.6.8 5 2.3 7L4.9 28l6.3-1.6c1.9 1 4 1.6 6.2 1.6h.5c6.6 0 12-5.3 12-11.9C29.9 9.5 23.5 3 16.9 3H16zm7.4 16.8c-.3.9-1.8 1.7-2.5 1.8-.7.1-1.5.1-2.4-.1-.6-.2-1.3-.4-2.2-.9-3.9-1.7-6.4-5.6-6.6-5.9-.2-.3-1.6-2.1-1.6-4 0-1.9 1-2.8 1.3-3.2.3-.4.7-.5 1-.5h.7c.2 0 .5-.1.8.6.3.8 1.1 2.7 1.2 2.9.1.2.2.4 0 .7-.1.3-.2.4-.4.7l-.6.7c-.2.2-.4.4-.2.8.2.4 1 1.7 2.2 2.7 1.5 1.3 2.7 1.8 3.1 1.9.4.2.6.1.8-.1.2-.2.9-1 1.1-1.4.2-.4.5-.3.8-.2.3.1 2.1 1 2.5 1.2.4.2.6.3.7.4.1.2.1.9-.2 1.8l.9.2z" />
      </svg>
    </a>
  );
}
