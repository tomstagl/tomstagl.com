import React from 'react'

import Card from '../components/Card/card'
import { H2, H3 } from '../components/Container/Headers'
import Section from '../components/Container/Section'
import FrequentlyAskedQuestions from '../components/FrequentlyAskedQuestions/FrequentlyAskedQuestions'
import Layout from '../components/layout'
import SEO from '../components/seo'
import TimeLine from '../components/Timeline/Timeline'

const About = () => (
  <Layout>
    <SEO title="About" />
    <Section>
      <H2>About Me</H2>
      <p className="py-4">
        I was born back in 1972 as the youngest of three kids. So I learned very
        early how to inspect and adopt. And that is also what I&apos;ve
        continued doing all the years. During my carreer my main focus was on
        agile practices. Mainly to unlock the potential of each and everyone.
        Helping each person to find the right spot in a team.
      </p>
      <p className="py-4">
        During my professional carreer I&apos;ve had the very early chance to
        get in touch with Scrum. That was back in 2003, where engineers in my
        team wanted to try out this new way of organising work. At this time my
        role was programm manager trying hardly to wire together multiple
        Microsoft Project plans to steer multiple parallel projects. Shortly
        after 2003 I&apos;ve moved also into the SCRUM master role.
      </p>
      <p className="py-4">
        A couple of years ago, I&apos;ve seen the talk &ldquo;Agile is
        dead&rdquo;, at least that&apos;s what Prgramatic Dave said a couple of
        years ago on a conference talk. And I agree. Agile just turned into a
        business, focusing mainly on the tools and processes available. Each one
        promising to be a silver bullet. But the core of talk was to focus on
        your needs, focus on the things which work for your organisation.
        Continue doing them, and stop all the things which are blocking you.
        Acting with agility makes you agile, and most importantly successful.
      </p>
      <p className="py-4">
        I have guided a couple of agile transitions. Most of them successfull
        and there were also the ones which failed, and provided a huge learning
        opportunity for me. Get in touch with me, to learn, how I can help you.
      </p>
      <p className="py-4">Wo bitte get in touch</p>

      <H3 className="pt-4">Some of My Principles</H3>
      <ul className="p-6 list-outside list-disc">
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
        <li>Ask the team, they know better</li>
        <li>
          Watch the baton, not the runner. Focus on outcome, not on output
        </li>
        <li>
          Metrics are important indicators for business performance and used to
          ask questions. Nothing more!
        </li>
        <li>
          If you don&apos;t like the style of your manager or team lead,
          it&apos;s your fault: Provide constructive feedback to your team lead.
          Allow her/him to get better.
        </li>
      </ul>
    </Section>
    <Section dark>
      <TimeLine timeLineData={timeLineData} />
    </Section>
  </Layout>
)

const timeLineData = [
  {
    left: {
      header: 'SCRUM',
      text:
        'First time got in touch with SCRUM in 2003 while I was working as Programm Manager for QPass. Took my first SCRUM master course with Boris Gloger in Manchester 2004.',
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
