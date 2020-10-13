import React from 'react'

import Card from '../components/Card/card'
import Section from '../components/Container/Section'
import FrequentlyAskedQuestions from '../components/FrequentlyAskedQuestions/FrequentlyAskedQuestions'
import Layout from '../components/layout'
import SEO from '../components/seo'

const RenderCards = () => {
  let cards = []
  const cardContent = [
    {
      heading: 'Business Agility with OKRs',
      text:
        'Objectives and Key Results offer organisations a very lean tool to start setting goals that matter. Introducing this methodology requires support. I can  do that',
      image: 'okrs.jpg',
    },
    {
      heading: 'Agile Product Development',
      text:
        'SCRUM provides a loose framework which allows inspect and adopt feedback loops and increases focus. I worked as SCRUM master for the last 14 years, amongst other things.',
      image: 'scrum.jpg',
    },
    {
      heading: 'Agile Product Development',
      text:
        'SCRUM provides a loose framework which allows inspect and adopt feedback loops and increases focus. I worked as SCRUM master for the last 14 years, amongst other things.',
      image: 'scrum.jpg',
    },
  ]
  for (let iter = 0; iter < cardContent.length; iter += 2) {
    cards.push(
      <div key={`div-${iter}`} className="flex py-2 max-h-48">
        <div className="mr-2 w-1/2">
          <Card
            key={iter}
            image={cardContent[iter].image}
            heading={cardContent[iter].heading}
            text={cardContent[iter].text}
          />
        </div>
        <div className="ml-2 w-1/2 max-h-48">
          {iter + 1 < cardContent.length && (
            <Card
              key={`2-${iter}`}
              image={cardContent[iter + 1].image}
              heading={cardContent[iter + 1].heading}
              text={cardContent[iter + 1].text}
            />
          )}
        </div>
      </div>,
    )
  }
  return cards
}

const About = () => (
  <Layout>
    <SEO title="About" />
    <Section>
      <div className="pt-6">
        <h1>My services</h1>
        {RenderCards()}

        <h2 className="pt-4">Principles</h2>
        <ul className="list-inside list-disc">
          <li>
            If there was a production incident, write a{' '}
            <a
              target="_blank"
              className="underline"
              href="https://landing.google.com/sre/sre-book/chapters/postmortem-culture/"
              rel="noopener noreferrer"
            >
              <strong>proper Post Mortem</strong>
            </a>
          </li>
          <li>
            Meetings start on time, have an agenda - issued days before - and
            meeting minutes are taken and shared afterwards.{' '}
            <strong>Always!</strong>
          </li>
          <li>If not sure, ask the team</li>
          <li>
            Watch the baton, not the runner. Focus on outcome, not on output
          </li>
          <li>
            Metrics are important indicators for business performance and used
            to ask questions. Nothing more!
          </li>
        </ul>
      </div>
    </Section>
    <Section dark>
      <FrequentlyAskedQuestions />
    </Section>
  </Layout>
)

export default About
