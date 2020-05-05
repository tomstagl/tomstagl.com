import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

const Avatar = () => {
  const data = useStaticQuery(graphql`
    query {
      avatarImage: file(relativePath: { eq: "avatar.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <div>
      <Img
        className="h-16 w-16 mr-4 rounded-full mx-atuo border-2 border-teal-400"
        fluid={data.avatarImage.childImageSharp.fluid}
        alt="Portrait of Tom Stagl"
      />
    </div>
  )
}

export default Avatar
