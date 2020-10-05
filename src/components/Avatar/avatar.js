import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'

export const PureAvatar = ({ title, data, avatarSize, className }) => (
  <div className={`flex items-center flex-shrink-0 text-white ${className}`}>
    <Link
      to="/"
      className="flex flex-row items-center text-2xl md:text-gray-400"
    >
      <Img
        className={`h-${avatarSize} w-${avatarSize} mr-4 rounded-full mx-auto border-2 border-teal-400 bg-white`}
        fluid={data.avatarImage.childImageSharp.fluid}
        alt="Portrait of Tom Stagl"
      />
      {title && (
        <span
          className="font-semibold text-xl tracking-tight"
          data-testid="avatar-title"
        >
          {title}
        </span>
      )}
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
  avatarSize: PropTypes.string,
  className: PropTypes.string,
}

Avatar.propTypes = {
  title: PropTypes.string,
}

PureAvatar.defaultProps = {
  title: '',
  data: {},
  avatarSize: 16,
  className: 'mr-6',
}
export default Avatar
