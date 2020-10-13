import React, { FunctionComponent } from 'react'
import Img, { FluidObject } from 'gatsby-image'
import PropTypes from 'prop-types'

type BlogImageBlockProps = {
  bild: {
    fluid: FluidObject
    alt: string
  }
}

const BlogImageBlock: FunctionComponent<BlogImageBlockProps> = ({ bild }) => {
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
