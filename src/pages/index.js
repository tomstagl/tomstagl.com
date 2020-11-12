import React from 'react'

import AboutMe from '../components/AboutMe/AboutMe'
import { H2 } from '../components/Container/Headers'
import Section from '../components/Container/Section'
import GridList from '../components/GridList/GridList'
import Layout from '../components/layout'
import Paragraph from '../components/Paragraph/Paragraph'
import SEO from '../components/seo'
import SmallCard from '../components/SmallCard/SmallCard'

const headerChildren = (
  <Section className="-mt-8 md:m-0">
    <AboutMe />
  </Section>
)

const IndexPage = () => (
  <Layout headerChildren={headerChildren}>
    <SEO
      title="Business Agility Coach"
      description="I'm an experienced Business Agility Coach focusing on New Work, OKRs and SCRUM."
    />

    <Section>
      <H2>Main Agile Competences</H2>
      <div className="md:flex mx-auto">
        <SmallCard
          title="Business Agility"
          text="Guiding organisations from vision, mission and OKR setup to product focused development. Allowing organisations to feel the benefits of true agility."
          className="w-full md:w-1/2 lg:w-1/3"
          image="okrs.jpg"
          imageCredits="asdf"
        />
        <SmallCard
          title="Agile Coaching"
          text="I'm guiding whole organisations or single teams during their agility journey. Getting the best out of everyone."
          image="agile-coaching.jpg"
          imageCredits="Photo by Jamie Street on Unsplash"
          className="w-full md:w-1/2 lg:w-1/3"
        />
        <SmallCard
          title="SCRUM"
          image="scrum.jpg"
          imageCredits="asdf"
          text="A proper trained and guided SCRUM Setup is the foundation for a swift start into an agile transition journey. I contribute over 14 years of experience as acting SCRUM Master."
          className="w-full md:w-1/2 lg:w-1/3"
        />
      </div>
    </Section>
    <Section dark>
      <Paragraph />
    </Section>
    <Section>
      <GridList />
    </Section>
  </Layout>
)

export default IndexPage
