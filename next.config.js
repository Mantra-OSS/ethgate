const withMDX = require("@next/mdx")();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions`` to include MDX files
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  // Optionally, add any other Next.js config below
  poweredByHeader: false,
  i18n: {
    locales: ["en-US", "tr-TR"],
    defaultLocale: "en-US",
    localeDetection: false,
  },
  experimental: {
    // https://nextjs.org/docs/app/building-your-application/configuring/typescript#statically-typed-links
    typedRoutes: true,
  },
};

module.exports = withMDX(nextConfig);
