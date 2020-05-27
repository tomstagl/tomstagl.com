import React from 'react'
import PropTypes from 'prop-types'

const BlogTextBlock = (props) => {
  const { section } = props
  console.log(section)
  return <div className="font-serif">{section}</div>
}

BlogTextBlock.propTypes = {
  section: PropTypes.string.isRequired,
}

export default BlogTextBlock
