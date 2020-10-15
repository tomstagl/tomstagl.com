import React, { FunctionComponent } from 'react'

import Avatar from '../Avatar/avatar'
import { H2 } from '../Container/Headers'
import ShareArticle from '../Footer/ShareArticle/shareArticle'

const AboutMe: FunctionComponent = () => {
  return (
    <div className="justify-center md:text-center">
      <H2>Tom Stagl</H2>
      <h3>Business Agility Coach</h3>
      <div className="py-12">
        <Avatar avatarSize={32} className="justify-center" />
      </div>
      <div className="pb-4 md:mx-auto content-center">
        <ShareArticle className="justify-center" />
      </div>
      <div>
        I am a self employed business agility coach dedicated to promote agile
        practices from organisational level up until development best practices.{' '}
        After working as Software Engineer and Program Manager I&apos;ve got in
        touch with SCRUM in 2004. Since then I&apos;ve held leadership positions
        in different business areas. With teams spread around the globe. My main
        vision is to make my experience available for your organisation to
        become <strike className="font-light text-gray-500">agile</strike>{' '}
        successful.
      </div>
    </div>
  )
}

export default AboutMe