import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'

const BlogReadMoreLink = ({ link, latest }) => {
  const latestPost = latest || false
  return (
    <Link
      className={`text-teal-600 hover:text-teal-500 hover:underline ${
        latestPost ? 'align-text-bottom' : ''
      }`}
      to={link}
    >
      Read more
    </Link>
  )
}

BlogReadMoreLink.propTypes = {
  link: PropTypes.string.isRequired,
  latest: PropTypes.bool,
}

export default BlogReadMoreLink
