import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import BlogPost from '../components/Blog/BlogList/blogPost'
import SEO from '../components/seo'

const Blog = (data) => {
  let lastPost
  const blogData = data.data.allDatoCmsBlogpost.edges
  const firstPostData = blogData.shift()
  const firstPost = (
    <BlogPost key="firstPost" post={firstPostData.node} latest={true} />
  )
  if (blogData.length % 2 === 1) {
    const lastPostData = blogData.pop()
    lastPost = (
      <BlogPost
        key="lastPost"
        post={lastPostData.node}
        latest={false}
        last={true}
      />
    )
  }

  const blogPosts = (blogItems) => {
    const items = []
    for (let iter = 0; iter < blogItems.length; iter += 2) {
      items.push(
        <div className="md:flex" key={`blogpostDiv-${iter}`}>
          <BlogPost post={blogItems[iter].node} className="md:pr-2" />
          {iter + 1 < blogItems.length && (
            <BlogPost post={blogItems[iter + 1].node} className="md:pl-2" />
          )}
        </div>,
      )
    }
    return items
  }

  return (
    <Layout>
      <SEO title="Blog" />
      <div>
        <h1>Blog posts about agility and DevOps</h1>
        <div>
          {firstPost}
          <h2>Older Posts</h2>
          {blogPosts(blogData)}
          {lastPost && lastPost}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    allDatoCmsBlogpost(
      filter: { meta: { status: { eq: "published" } } }
      sort: { fields: meta___publishedAt, order: DESC }
    ) {
      edges {
        node {
          abstract
          title
          subtitle
          slug
          meta {
            publishedAt(formatString: "DD. MMM YYYY")
          }
          blogimage {
            fluid(maxWidth: 800, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsFluid
            }
          }
        }
      }
    }
  }
`

export default Blog
