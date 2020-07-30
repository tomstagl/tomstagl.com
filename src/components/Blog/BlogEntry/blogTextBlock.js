import React from 'react'
import PropTypes from 'prop-types'

const BlogTextBlock = (props) => {
  const { sectionTitle, sectionNode } = props
  return (
    <div>
      <h2>{sectionTitle}</h2>
      <div
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
