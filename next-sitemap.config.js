/** @type {import('next-sitemap').IConfig} */
const sitemapConfig = {
  siteUrl: process.env.APP_ROOT_URL || "https://muuuuminn.com",
  generateRobotsTxt: true, // (optional)
  // ...other options
};

module.exports = sitemapConfig;
