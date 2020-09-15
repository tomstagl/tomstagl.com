import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import BlogPost from '../components/Blog/BlogList/blogPost'
import SEO from '../components/seo'

const Blog = (data) => {
  const blogData = data.data.allDatoCmsBlogpost.edges
  const firstPost = (
    <BlogPost key="firstPost" post={blogData[0].node} latest={true} />
  )

  const blogPosts = (blogItems) => {
    const items = []
    for (let iter = 1; iter < blogItems.length; iter += 2) {
      items.push(
        <div className="md:flex">
          <BlogPost post={blogItems[iter].node} className="pr-2" />

          {iter + 1 < blogItems.length && (
            <BlogPost post={blogItems[iter + 1].node} className="pl-2" />
          )}
        </div>,
      )
    }
    console.log(items)
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
        </div>
      </div>
      <div className="pt-4">
        <h2>Things I like to write about, when there is time</h2>
        <ul className="list-inside list-disc">
          <li>Performance Reviews and how to do them in an agile world</li>
          <li>
            About expectations and responsibilities in Agile environments.
          </li>
          <li>OKRs work well together with SCRUM. A short how to.</li>
        </ul>
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    allDatoCmsBlogpost(
      filter: { meta: { status: { eq: "published" } } }
      sort: { fields: meta___createdAt, order: DESC }
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
