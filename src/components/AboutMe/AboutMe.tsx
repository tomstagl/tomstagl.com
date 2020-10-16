import React, { FunctionComponent } from 'react'

import Avatar from '../Avatar/avatar'
import { H1 } from '../Container/Headers'
import ShareArticle from '../Footer/ShareArticle/shareArticle'

const AboutMe: FunctionComponent = () => {
  return (
    <div className="justify-center md:text-center">
      <H1>Tom Stagl</H1>
      <h3>Business Agility Coach</h3>
      <div className="py-12">
        <Avatar avatarSize={32} className="justify-center" />
      </div>
      <div className="pb-4 md:mx-auto content-center ">
        <ShareArticle className="justify-center" />
      </div>
      <div>
        I am a self employed business agility coach, dedicated to promote agile
        practices from organisational level up until development best practices.{' '}
        After having worked as Software Engineer and Program Manager I got in
        touch with SCRUM in 2004. Since then I&apos;ve held leadership positions
        in different business areas. With teams spread around the globe. My main
        goal is to make my experience available for{' '}
        <span className="text-teal-400">
          your organisation to become and stay{' '}
          <span className="line-through font-light text-gray-500">agile</span>{' '}
          successful.
        </span>
      </div>
    </div>
  )
}

export default AboutMe
