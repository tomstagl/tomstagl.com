import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'

export const PureAvatar = ({ title, data }) => (
  <div className="flex items-center flex-shrink-0 text-white mr-6">
    <Link to="/" className="flex flex-row items-center text-2xl">
      <Img
        className="h-16 w-16 mr-4 rounded-full mx-auto border-2 border-teal-400"
        fluid={data.avatarImage.childImageSharp.fluid}
        alt="Portrait of Tom Stagl"
      />
      <span
        className="font-semibold text-xl tracking-tight"
        data-testid="avatar-title"
      >
        {title}
      </span>
    </Link>
  </div>
)

const Avatar = (props) => {
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
  return <PureAvatar {...props} data={data}></PureAvatar>
}

PureAvatar.propTypes = {
  title: PropTypes.string,
  data: PropTypes.object,
}

Avatar.propTypes = {
  title: PropTypes.string,
}

export default Avatar
