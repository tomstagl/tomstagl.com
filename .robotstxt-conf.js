module.exports = {
  host: 'https://tomstagl.com',
  sitemap: 'https://tomstagl.com/sitemap.xml',
  policy: [{ userAgent: '*' }],
  resolveEnv: () => process.env.GATSBY_ENV,
  env: {
    development: {
      policy: [{ userAgent: '*', disallow: ['/'] }],
    },
    production: {
      policy: [{ userAgent: '*', allow: '/' }],
    },
  },
}
