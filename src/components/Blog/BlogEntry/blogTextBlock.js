import React from 'react'
import PropTypes from 'prop-types'

const BlogTextBlock = (props) => {
  const { section, sectionTitle } = props
  return (
    <div className="py-4">
      <h2 className="pb-1">{sectionTitle}</h2>
      <div className="font-serif">{section}</div>
    </div>
  )
}

BlogTextBlock.propTypes = {
  section: PropTypes.string.isRequired,
  sectionTitle: PropTypes.string,
}

export default BlogTextBlock
