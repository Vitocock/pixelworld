/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.pixelworldgc.com',
  generateRobotsTxt: true,
  exclude: ['/admin/*', '/api/*'], 
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
    ],
  },
  additionalPaths: async (config) => [
    await config.transform(config, '/'), 
    await config.transform(config, '/products'),
  ],
}
