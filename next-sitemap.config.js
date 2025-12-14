/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.searchbag.in",
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
  autoLastmod: true,
  exclude: ["/seller", "/seller/(.*)", "/api/(.*)"],
  transform: async (config, path) => {
    // You can customize priority & changefreq per route
    return {
      loc: path,
      lastmod: new Date().toISOString(),
      changefreq: "weekly",
      priority: path === "/" ? 1.0 : 0.7,
    };
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/seller", "/api"],
      },
    ],
    additionalSitemaps: ["https://www.searchbag.in/sitemap-0.xml"],
  },
};
