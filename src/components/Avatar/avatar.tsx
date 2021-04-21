import { graphql, Link, useStaticQuery } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
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
          <GatsbyImage
            image={data.avatarImage.childImageSharp.gatsbyImageData}
            className={`${avatarSizeHeight} ${avatarSizeWidth} rounded-full mx-auto border-2 border-teal-400 bg-white z-0`}
            alt="Portrait of Tom Stagl - Engineering Leader"
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
    {
      avatarImage: file(relativePath: { eq: "avatar.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 300
            layout: CONSTRAINED
            placeholder: TRACED_SVG
          )
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
