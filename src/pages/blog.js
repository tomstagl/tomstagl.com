import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Layout from '../components/layout'
import BlogPost from '../components/blogPost'

const Blog = () => {
  const data = useStaticQuery(graphql`
    query {
      allMediumPost(sort: { fields: [createdAt], order: DESC }) {
        edges {
          node {
            id
            title
            virtuals {
              subtitle
              previewImage {
                imageId
              }
            }
            previewContent2 {
              bodyModel {
                paragraphs {
                  name
                  text
                }
              }
            }
          }
        }
      }
    }
  `)

  const blogData = data.allMediumPost.edges

  const blogPosts = blogData.map((post, index) => (
    <BlogPost key={index} post={post.node} />
  ))

  return (
    <Layout>
      <h1>{blogPosts}</h1>
    </Layout>
  )
}

export default Blog
