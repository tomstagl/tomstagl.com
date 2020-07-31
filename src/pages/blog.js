import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import BlogPost from '../components/Blog/BlogList/blogPost'
import SEO from '../components/seo'

const Blog = (data) => {
  const blogData = data.data.allDatoCmsBlogpost.edges
  const blogPosts = blogData.map((post, index) => (
    <BlogPost key={index} post={post.node} />
  ))

  return (
    <Layout>
      <SEO title="Blog" />
      <div>
        <h1>Blog posts about agility and DevOps</h1>
        <div>{blogPosts}</div>
      </div>
      <div className="pt-4">
        <h2>Things I like to write about, when there is time</h2>
        <ul className="list-inside list-disc">
          <li>Performance Reviews and how to do them in an agile world</li>
          <li>
            About expectations and responsibilities in Agile environments.
          </li>
        </ul>
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    allDatoCmsBlogpost(filter: { meta: { status: { eq: "published" } } }) {
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
            fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsFluid
            }
          }
        }
      }
    }
  }
`

export default Blog
