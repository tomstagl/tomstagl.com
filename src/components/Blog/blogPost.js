import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'

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
          <h2>{post.title}</h2>
        </Link>
        <p className="text-gray-500 text-sm font-light">
          Published {post.meta.publishedAt}
        </p>
      </header>
      <p className="text-lg font-serif">{post.abstract}</p>
      <hr className="w-2/3 mt-2 mx-auto border-1 border-dotted border-gray-300 bg-opacity-75 max-w-sm object-center" />
    </article>
  )
}

BlogPost.propTypes = {
  post: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,

}
export default BlogPost
