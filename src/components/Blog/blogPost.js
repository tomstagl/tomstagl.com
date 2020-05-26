import React from 'react'
import { Link } from 'gatsby'

const BlogPost = (props) => {
  const { post } = props
  const read_more_link = '/blog/' + post.slug

  return (
    <article className="py-4 relative overflow-hidden">
      <header>
        <Link
          className="text-teal-600 font-bold hover:text-teal-500"
          activeClassName="underline"
          to={read_more_link}
        >
          <h3>{post.title}</h3>
        </Link>
        <small className="text-gray-500">
          Published {post.meta.publishedAt}
        </small>
      </header>
      <p className="text-lg font-serif">{post.abstract}</p>
    </article>
  )
}

export default BlogPost
