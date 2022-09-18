/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.APP_ROOT_URL || "https://muuuuminn.com",
  generateRobotsTxt: true, // (optional)
  // ...other options
};
