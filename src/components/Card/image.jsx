import React from 'react'
import Img from 'gatsby-image'
import { StaticQuery, graphql } from 'gatsby'

/*
 * warning, does not return anything if an image is defined twice
 */

const Image = ({ imgName, className }) => (
  <StaticQuery
    query={graphql`
      query {
        allImageSharp {
          edges {
            node {
              fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid
                originalName
              }
            }
          }
        }
      }
    `}
    render={(data) => {
      const image = data.allImageSharp.edges.find((edge) => {
        if (edge.node.fluid.originalName === imgName) {
          console.log('hurrra')
          return true
        }
      })
      if (!image) {
        return null
      }
      return <Img className={className} fluid={image.node.fluid} />
    }}
  />
)
export default Image
