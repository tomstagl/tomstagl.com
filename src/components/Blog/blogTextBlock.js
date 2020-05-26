import React from 'react'

const BlogTextBlock = (props) => {
  const { section } = props
  console.log(section)
  return <div className="font-serif">{section}</div>
}

export default BlogTextBlock
