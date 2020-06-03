import React from 'react'
import PropTypes from 'prop-types'

const BlogTextBlock = (props) => {
  const { section, sectionTitle } = props
  console.log(props)
  console.log('Section Title: ', sectionTitle)
  return (
    <section className="py-4">
      <h2 className="pb-1">{sectionTitle}</h2>
      <div className="font-serif">{section}</div>
    </section>
  )
}

BlogTextBlock.propTypes = {
  section: PropTypes.string.isRequired,
  sectionTitle: PropTypes.string,
}

export default BlogTextBlock
