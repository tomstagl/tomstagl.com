import React from 'react'
import Img from 'gatsby-image'

const BlogPost = (props) => {
  //console.log(props.post)

  const { post } = props

  return (
    <article className="p-4 mt-3 rounded-lg border-1 shadow ">
      <header>
        <h3>{post.title}</h3>
      </header>
      <small>{post.virtuals.subtitle}</small>
    </article>
  )
}

export default BlogPost
