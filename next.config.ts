import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    // Legacy URLs from the old site -> new routes (301).
    // Sources omit the trailing slash because Next normalises it first.
    const legacy: Array<[string, string]> = [
      ["/about", "/en/about"],
      ["/news-events", "/en/news"],
      ["/tc-verification", "/en/tc-verification"],
      ["/tc-class-10th", "/en/tc-verification/class-10"],
      ["/tc-class-12th", "/en/tc-verification/class-12"],
      ["/gallery", "/en/gallery"],
      ["/downloads", "/en/downloads"],
      ["/mandatory-disclouser", "/en/mandatory-disclosure"],
      ["/mandatory-disclosure", "/en/mandatory-disclosure"],
      ["/contact", "/en/contact"],
    ];
    return [
      ...legacy.map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
      // Any other non-locale path -> English locale (307).
      {
        source: "/:path((?!en|hi|api|_next|images|documents|favicon|robots|sitemap|icon|opengraph).+)",
        destination: "/en/:path",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
