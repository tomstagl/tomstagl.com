import React from 'react'
import blogPostStyles from './blogPost.module.css'
import Img from 'gatsby-image'

console.log(blogPostStyles.backgroundGradient)

const BlogPost = (props) => {
  //console.log(props.post)

  const { post } = props
  const contentPreview = post.content.substring(0, 350)

  console.log(post)
  return (
    <article className="p-4 mt-3 rounded-lg border-1 shadow hover:shadow-2xl relative overflow-hidden">
      <header>
        <h3>{post.title}</h3>
        <small className="text-gray-500">Published {post.meta.publishedAt}</small>
      </header>
      <small>{contentPreview}</small>
      <p className={blogPostStyles.backgroundGradient}>
        <a href="#" className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-full">Read More</a>
      </p>
    </article>
  )
}

export default BlogPost
