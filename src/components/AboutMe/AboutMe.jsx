import React from 'react'
import PropTypes from 'prop-types'
import Avatar from '../Avatar/avatar'
import ShareArticle from '../Footer/ShareArticle/shareArticle'
import { H2 } from '../Container/Headers'

const AboutMe = () => {
  return (
    <div className="justify-center md:text-center">
      <H2>About Me</H2>
      <h3>Some details to get to know me a bit better</h3>
      <div className="py-12">
        <Avatar avatarSize="32" className="justify-center" />
      </div>
      <div className="pb-4">
        <ShareArticle />
      </div>
      <div>
        I am a self employed business agility coach dedicated to promote agile
        practices from organisational level up until development best practices.{' '}
        After working as Software Engineer and Program Manager I've got in touch
        with SCRUM in 2004. Since then I've held leadership positions in
        different business areas. With teams spread around the globe. My main
        vision is to make my experience available for your organisation to
        become <strikethrough>agile</strikethrough>successful.
      </div>
    </div>
  )
}

export default AboutMe
