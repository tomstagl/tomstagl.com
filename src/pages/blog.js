import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import BlogPost from '../components/Blog/BlogList/blogPost'
import SEO from '../components/seo'
import Section from '../components/Container/Section'

const Blog = (data) => {
  let lastPost
  const rawBlogData = data.data.allDatoCmsBlogpost.edges
  // requires a shallow copy of the array because we shift and pop
  // which results in a smaller array when site is loaded again
  const blogData = [...rawBlogData]
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
      <SEO
        title="Blog posts about agility and DevOps"
        description="Blog Post about all different aspects of agility. Fokusing on easy to follow how to's and best practices."
      />
      <Section>
        <h1>Blog posts about agility and DevOps</h1>
        <div>
          {firstPost}
          <h2>Older Posts</h2>
          {blogPosts(blogData)}
          {lastPost && lastPost}
        </div>
      </Section>
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
            alt
          }
        }
      }
    }
  }
`

export default Blog
