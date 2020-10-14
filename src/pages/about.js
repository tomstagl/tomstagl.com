import React from 'react'
import Card from '../components/Card/card'
import Section from '../components/Container/Section'
import FrequentlyAskedQuestions from '../components/FrequentlyAskedQuestions/FrequentlyAskedQuestions'
import GridList from '../components/GridList/GridList'
import Layout from '../components/layout'
import SEO from '../components/seo'
import TimeLine from '../components/Timeline/Timeline'

const About = () => (
  <Layout>
    <SEO title="About" />
    <Section>
      <GridList />
    </Section>
    <Section dark>
      <TimeLine timeLineData={timeLineData} />
    </Section>
    <Section>
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
          Metrics are important indicators for business performance and used to
          ask questions. Nothing more!
        </li>
      </ul>
    </Section>
    <Section dark>
      <FrequentlyAskedQuestions />
    </Section>
  </Layout>
)

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

const timeLineData = [
  {
    left: {
      header: 'SCRUM',
      text:
        'First time got in touch with SCRUM while I was working as Programm Manager for QPass. Took my first SCRUM master course with Boris Gloger.',
    },
    line: {
      year: 2004,
    },
  },
  {
    line: {
      year: 2004,
    },
    right: {
      header: 'SCRUM Master',
      text:
        "Next to my role as Programm Manager I took over the responsibility as acting SCRUM Master for two teams and I've been working with them until 2007.",
    },
  },
  {
    line: {
      year: 2007,
    },
    left: {
      header: 'Freelancing Software Engineer',
      text:
        "During my freelancing software engineering time I've worked with different frameworks and for different clients where I've also trained teams on using SCRUM and Extreme Programming practices to improve quality and turn around time. One of my clients during this time frame was 'fatfoogoo'. A company focusing on in-game commerce, which I've joined as fulltime employee in 2009.",
    },
  },
  {
    right: {
      header: 'Director Engineering - fatfoogoo / Digital River',
      text:
        "During my time at the in-game commerce market leader, 'fatfoogoo', I've conducted an agile transition. Establishing SCRUM for two partly remote teams. We delivered time critical initiatives for our clients, which included Riot Games, Pokemon, Rockstar Games and arena.net.",
    },
    line: {
      year: 2009,
    },
  },
  {
    line: {
      year: 2018,
    },
    left: {
      header: 'CTO - durchblicker.at',
      text:
        'Started an agile transition together with an external partner where we started off with one SCRUM team and built out a second one after a couple of months. One of my other responsibilities was attracting new talent for our teams.',
    },
  },
  {
    right: {
      header: 'Freelancing Business Agility Coach',
      text:
        'I am now working with small and medium sized commpanies to suppor their agile journey with the main goal to help them become successful.',
    },
    line: {
      year: 2020,
    },
  },
]
export default About
