import React from 'react'
import Img from 'gatsby-image'

const BlogPost = (props) => {
  const { post } = props
  const contentPreview = post.content.substring(0, 350)

  let imageUrl = undefined

  if (post && post.blogimage && post.blogimage.fluid) {
    imageUrl = <Img fluid={post.blogimage.fluid} />
  }

  return (
    <article className="pt-4 relative overflow-hidden">
      <header>
        <small className="text-gray-500">
          Published {post.meta.publishedAt}
        </small>
        <h3>{post.title}</h3>
        {imageUrl}
      </header>
      <small>{contentPreview}</small>
      <p className="mt-2">
        <a href="#">Read More</a>
      </p>
      <hr />
    </article>
  )
}

export default BlogPost
