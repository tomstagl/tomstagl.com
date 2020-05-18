import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Layout from '../components/layout'
import BlogPost from '../components/blogPost'
import SEO from '../components/seo'

const Blog = () => {
  const data = useStaticQuery(graphql`
    query {
      allDatoCmsBlogpost {
        edges {
          node {
            title
            content
            slug
            meta {
              publishedAt(fromNow: true)
            }
            blogimage {
              fluid(
                maxWidth: 600
                imgixParams: { fm: "jpg", auto: "compress" }
              ) {
                ...GatsbyDatoCmsFluid
              }
            }
          }
        }
      }
    }
  `)

  console.log(data)
  const blogData = data.allDatoCmsBlogpost.edges
  console.log('post:' + blogData)
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
          <li>Metrics, Metrics, Metrics - from top to bottom</li>
          <li>Performance Reviews and how to do them in an agile world</li>
          <li>
            About expectations and responsibilities in Agile environments.
          </li>
        </ul>
      </div>
    </Layout>
  )
}

export default Blog
