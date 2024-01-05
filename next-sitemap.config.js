/** @type {import('next-sitemap').IConfig} */
const sitemapConfig = {
  siteUrl: process.env.NEXT_PUBLIC_APP_ROOT_URL,
  generateRobotsTxt: true, // (optional)
  // ...other options
};

module.exports = sitemapConfig;
