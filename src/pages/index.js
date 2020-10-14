import React from 'react'

import AboutMe from '../components/AboutMe/AboutMe'
import { H2 } from '../components/Container/Headers'
import Section from '../components/Container/Section'
import Layout from '../components/layout'
import Paragraph from '../components/Paragraph/Paragraph'
import SEO from '../components/seo'
import SmallCard from '../components/SmallCard/SmallCard'
import TimeLine from '../components/Timeline/Timeline'

const headerChildren = (
  <Section className="-mt-8 md:m-0">
    <AboutMe />
  </Section>
)

const IndexPage = () => (
  <Layout headerChildren={headerChildren}>
    <SEO
      title="business agility"
      description="I'm an experienced Business Agility Coach focusing on New Work, OKRs and SCRUM, "
    />

    <Section>
      <H2>&#128640; Main Agile Competences</H2>
      {/* <div className="-p-4 rounded-t-lg bg-white">
        Besides helping teams and organisations to see and feel the benefits of{' '}
        <strong>Agile</strong>- and <strong>DevOps</strong> principles, I&apos;m
        also an experienced business agility by who can help organisations to
        lift off an successful agile transition journey.
      </div> */}
      <div className="md:flex">
        <SmallCard
          title="Business Agility"
          text="Guiding organisations from vision, mission and OKR setup and product focused developement. Allowing organisations to become successful."
          className="w-full md:w-1/2 lg:w-1/3"
          image="okrs.jpg"
          imageCredits="asdf"
        />
        <SmallCard
          title="Agile Coaching"
          text="Supporting whole organisations or single teams during their agility journey. Getting the best out of everyone."
          image="agile-coaching.jpg"
          imageCredits="Photo by Jamie Street on Unsplash"
          className="w-full md:w-1/2 lg:w-1/3"
        />
        <SmallCard
          title="SCRUM"
          image="scrum.jpg"
          imageCredits="asdf"
          text="A proper trained and guides SCRUM Setup is the foundation for a swift start into a agile transition journey. I bring with me over 14 years of experience as acting SCRUM Master."
          className="w-full md:w-1/2 lg:w-1/3"
        />
      </div>
    </Section>
    <Section dark>
      <Paragraph />
    </Section>
    <Section>
      <TimeLine />
    </Section>
    <Section dark>
      <p>
        I support your organisation with my long standing experience about
        applying agile practices. Teaching and guiding the effectiveness of
        agile practices is what I love and what you will start loving soon.
      </p>
      <ol className="list-inside list-disc">
        <li>OKR setup</li>
        <li>Agile Transition</li>
        <li>Scrum</li>
        <li>Business Agility</li>
        <li>Team Lift-off</li>
        <li>Strong techincal skills</li>
      </ol>

      <h2>&#x2B50; My leadership competences</h2>
      <ol className="list-inside list-disc">
        <li>Team composition</li>
        <li>Value stream mapping</li>
        <li>Talent Acquisition</li>
      </ol>
    </Section>
  </Layout>
)

export default IndexPage
