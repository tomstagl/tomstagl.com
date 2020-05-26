import React from 'react'

const BlogQuoteBlock = (props) => {
  const { quote, author } = props
  return (
    <blockquote className="font-serif border-l-4 pl-8 my-4 border-teal-500 text-gray-600">
      <p className="italic ">&quot;{quote}&quot;</p>
      <p className="text-xs font-light text-right">--{author}</p>
    </blockquote>
  )
}

export default BlogQuoteBlock
