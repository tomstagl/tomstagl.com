import React from 'react'
import Img from 'gatsby-image'
import { Link } from 'gatsby'

const BlogPost = (props) => {
  const { post } = props
  const read_more_link = '/blog/' + post.slug

  return (
    <article className="pt-4 relative overflow-hidden">
      <header>
        <small className="text-gray-500">
          Published {post.meta.publishedAt}
        </small>
        <h3>{post.title}</h3>
      </header>
      {post.blogimage && <Img fluid={post.blogimage.fluid} className="rounded"/>}
      <p className="text-sm">{post.abstract}</p>
      <p className="mt-2">
        <Link to={read_more_link}>Read more</Link>
      </p>
      <hr />
    </article>
  )
}

export default BlogPost
