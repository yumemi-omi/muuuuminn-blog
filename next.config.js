/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },
  images: {
    domains: ["user-images.githubusercontent.com"],
  },
  i18n: {
    locales: ["ja", "en"],
    defaultLocale: "ja",
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/posts",
        permanent: true,
      },
    ];
  },
  experimental: { scrollRestoration: true },
};

module.exports = nextConfig;
