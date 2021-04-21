import React, { FunctionComponent } from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
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
      <GatsbyImage image={bild.gatsbyImageData} alt={bild.alt} />
    </figure>
  )
}

BlogImageBlock.propTypes = {
  bild: PropTypes.object.isRequired,
}
export default BlogImageBlock
