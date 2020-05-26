import React from 'react'

const BlogQuoteBlock = (props) => {
  const { quote, author } = props
  return (
    <blockquote className="border-l-4 pl-8 my-4 border-teal-500">
      <p className="italic text-gray-900">&quot;{quote}&quot;</p>
      <p className="text-xs  text-gray-700 text-right">--{author}</p>
    </blockquote>
  )
}

export default BlogQuoteBlock
