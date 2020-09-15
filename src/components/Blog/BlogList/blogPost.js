import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'
import BlogReadMoreLink from './blogReadMoreLink'

const BlogPost = ({ post, latest, last, className }) => {
  const read_more_link = '/blog/' + post.slug
  const published_since = post.meta.publishedAt
  const abstract = post.abstract
  const blogImage = post.blogimage
  console.log(post.title)

  const isFirstOrLast = (latestPost, lastPost) => {
    const latest = latestPost || false
    const last = lastPost || false
    return latest || last
  }

  return (
    <article
      className={`py-4 relative overflow-hidden ${
        isFirstOrLast(latest, last) ? 'w-full' : 'w-full md:w-1/2'
      } ${className}`}
    >
      {blogImage && (
        <figure>
          <Img fluid={blogImage.fluid} className="rounded shadow" />
          {blogImage.title && <figcaption>{blogImage.title}</figcaption>}
        </figure>
      )}
      <div
        className={isFirstOrLast(latest, last) ? 'block md:flex py-4' : null}
      >
        <header
          className={
            isFirstOrLast(latest, last)
              ? 'pr-0 w-full md:w-1/2 md:pr-2'
              : 'w-full flex-row'
          }
        >
          <Link
            className="text-teal-600 font-bold hover:text-teal-500"
            activeClassName="underline"
            to={read_more_link}
          >
            <h2>{post.title}</h2>
          </Link>
          <p className="flex text-gray-500 text-sm font-light">
            Published {published_since}
          </p>
        </header>
        <div
          className={
            isFirstOrLast(latest, last)
              ? 'md:w-1/2 md:pl-2 pl-0 w-full'
              : 'w-full'
          }
        >
          <p className="text-base">{abstract}</p>

          <BlogReadMoreLink link={read_more_link} />
        </div>
      </div>
      <hr className="w-2/3 mt-2 mx-auto border-1 border-dotted border-gray-300 bg-opacity-75 max-w-sm object-center" />
    </article>
  )
}

BlogPost.propTypes = {
  post: PropTypes.object.isRequired,
  latest: PropTypes.bool,
  last: PropTypes.bool,
  className: PropTypes.string,
}

export default BlogPost
