import React from 'react'
import PropTypes from 'prop-types'

const BlogTextBlock = (props) => {
  const { sectionTitle, sectionNode } = props
  return (
    <div className="py-4">
      <h2 className="pb-1">{sectionTitle}</h2>
      <div
        className="font-serif"
        dangerouslySetInnerHTML={{
          __html: sectionNode.childMarkdownRemark.html,
        }}
      ></div>
    </div>
  )
}

BlogTextBlock.propTypes = {
  sectionTitle: PropTypes.string,
  sectionNode: PropTypes.object.isRequired,
}

export default BlogTextBlock
