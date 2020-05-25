import React from 'react'

const BlogQuoteBlock = (props) => {
  const { quote, author } = props
  return (
    <blockquote className="border-l-4 pl-4 m-4 border-teal-500">
      <p className="italic">{quote}</p>
      <small>{author}</small>
    </blockquote>
  )
}

export default BlogQuoteBlock
