exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allDatoCmsBlogpost {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)
  data.allDatoCmsBlogpost.edges.forEach((edge) => {
    const slug = edge.node.slug
    const path = '/blog/' + slug + '/'
    actions.createPage({
      path: path,
      component: require.resolve(`./src/templates/blog-post.js`),
      context: { slug: slug },
    })
  })
}
