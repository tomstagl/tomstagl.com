import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

const Avatar = ({ title }) => {
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
    <>
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link to="/" className="text-2xl">
          <Img
            className="h-16 w-16 mr-4 rounded-full mx-auto border-2 border-teal-400"
            fluid={data.avatarImage.childImageSharp.fluid}
            alt="Portrait of Tom Stagl"
          />
          <div>{title}</div>
        </Link>
      </div>
    </>
  )
}

export default Avatar
