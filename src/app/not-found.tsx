import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <p className="font-display text-5xl font-bold text-brand-deep">404</p>
        <h1 className="mt-3 text-xl font-semibold">Page not found</h1>
        <Link
          href="/en"
          className="btn btn-primary mt-6 inline-flex"
        >
          Go to homepage
        </Link>
      </div>
    </main>
  );
}
