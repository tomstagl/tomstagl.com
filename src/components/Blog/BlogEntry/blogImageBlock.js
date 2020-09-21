import React from 'react'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'

const BlogImageBlock = ({ bild }) => {
  return (
    <figure className="w-full">
      <Img fluid={bild.fluid} alt={bild.alt} />
    </figure>
  )
}

BlogImageBlock.propTypes = {
  bild: PropTypes.object.isRequired,
}
export default BlogImageBlock
