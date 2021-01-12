import React from 'react'

import AboutMe from '../components/AboutMe/AboutMe'
import { H2 } from '../components/Container/Headers'
import Section from '../components/Container/Section'
import FaqList from '../components/Faqs/faqList'
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
    <Section dark>
      <FaqList data={data} />
    </Section>
  </Layout>
)

const data = {
  title: 'Frequently asked Questions to',
  colorTitle: 'Agile Coaches',
  items: [
    {
      question: 'What is a Business Agility Coach doing?',
      answer:
        'The role of the business agility coach focuses mainly on a whole organisation and how the whole systems works together. The main goal of this role is, to enable a whole organisation to inspect and adapt to be able to react quickly on our changing market.',
    },
    {
      question:
        'How can an Business Agility Coach help our organisation to become successful?',
      answer:
        'As an agile coach will work with you and your teams so that you can come up with the solutions, which suite best your needs. This is supported by active coaching on team and on one on one level and by providing necessary trainings.',
    },
    {
      question:
        'Is it necessary to have an Agile Coach as a permanent role in the organisation?',
      answer:
        'Yes, at the beginning it is highly recommended to work with a already experienced person, either internal or external. The role of this person should include training and coaching of persons who want to step into the agile coach carreer path..',
    },
  ],
}

export default IndexPage
