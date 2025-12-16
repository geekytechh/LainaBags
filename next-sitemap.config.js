/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://www.lainabags.com',
    generateRobotsTxt: true,
    generateIndexSitemap: false,
    exclude: ['/seller/*', '/api/*'],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/seller/', '/api/'],
            },
        ],
    },
}
