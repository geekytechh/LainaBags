import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/seller/', '/api/'],
            },
        ],
        sitemap: 'https://www.lainabags.com/sitemap.xml',
    }
}
