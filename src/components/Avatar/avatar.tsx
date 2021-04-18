import { graphql, Link, useStaticQuery } from 'gatsby'
import Img, { FluidObject } from 'gatsby-image'
import PropTypes from 'prop-types'
import React, { FunctionComponent } from 'react'

type PureAvatarProps = {
  title?: string
  data: {
    avatarImage: {
      childImageSharp: {
        fluid: FluidObject
      }
    }
  }
  avatarSize?: number
  className?: string
}
type AvatarProps = {
  title?: string
  avatarSize?: number
  className?: string
}
export const PureAvatar: FunctionComponent<PureAvatarProps> = ({
  title,
  data,
  avatarSize = 16,
  className = 'mr-6',
}) => {
  const avatarSizeHeight = `h-${avatarSize}`
  const avatarSizeWidth = `w-${avatarSize}`
  return (
    <div className={avatarSizeHeight}>
      <div
        className={`px-4 flex items-center flex-shrink-0 text-white ${className}`}
      >
        <Link
          to="/"
          className="flex flex-row items-center text-2xl text-gray-400"
        >
          <Img
            className={`${avatarSizeHeight} ${avatarSizeWidth} rounded-full mx-auto border-2 border-teal-400 bg-white`}
            fluid={data.avatarImage.childImageSharp.fluid}
            alt="Portrait of Tom Stagl - Business Agility Coach"
            title="Business Agility Coach, OKR coach, SCRUM master - Tom Stagl"
          />
          {title && (
            <span
              className="font-semibold text-xl tracking-tight ml-4"
              data-testid="avatar-title"
            >
              {title}
            </span>
          )}
        </Link>
      </div>
    </div>
  )
}

const Avatar = (props: AvatarProps): JSX.Element => {
  const { title, ...rest } = props
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
  return <PureAvatar {...rest} title={title} data={data}></PureAvatar>
}

Avatar.propTypes = {
  title: PropTypes.string,
}

PureAvatar.propTypes = {
  title: PropTypes.string,
  avatarSize: PropTypes.number,
  className: PropTypes.string,
  data: PropTypes.object.isRequired,
}
export default Avatar
