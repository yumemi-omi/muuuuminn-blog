/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },
  i18n: {
    locales: ["ja", "en"],
    defaultLocale: "ja",
  },
};

module.exports = nextConfig;
