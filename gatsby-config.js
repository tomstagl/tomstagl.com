module.exports = {
  siteMetadata: {
    title: `Tom Stagl`,
    description: `Scrum Master, Engineering Leader, Agile Coach, Interim CTO - Tom Stagl`,
    author: `@herrstagl`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `tom-stagl-agile-coach`,
        short_name: `tomstagl.com`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-source-medium`,
      options: {
        username: `@posey`,
      },
    },
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: 'tomstagl.com',
      },
    },
    `gatsby-plugin-offline`,
  ],
}
