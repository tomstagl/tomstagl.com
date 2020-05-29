import React from 'react'
import PropTypes from 'prop-types'

const BlogQuoteBlock = ({ quote, author }) => {
  return (
    <blockquote className="font-serif border-l-4 pl-8 my-4 border-teal-500 text-gray-600">
      <p className="italic ">&quot;{quote}&quot;</p>
      <p className="text-xs font-light text-right">--{author}</p>
    </blockquote>
  )
}

BlogQuoteBlock.propTypes = {
  quote: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
}

export default BlogQuoteBlock
