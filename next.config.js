const withMDX = require('@next/mdx')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  poweredByHeader: false,
  i18n: {
    locales: ['en-US', 'tr-TR'],
    defaultLocale: 'en-US',
    localeDetection: false,
    domains: [{ domain: 'ethgate.com.tr', defaultLocale: 'tr-TR' }],
  },
  experimental: {
    // https://nextjs.org/docs/app/building-your-application/configuring/typescript#statically-typed-links
    typedRoutes: true,
  },
  transpilePackages: ['@mantra-oss/chains'],
};

module.exports = withMDX(nextConfig);
