import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Card from '../components/Card/card'

const About = () => (
  <Layout>
    <SEO title="About" />
    <div>
      <h1>Principles</h1>
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
    </div>

    <div className="pt-6">
      <h2>My services</h2>
      <ol className="list-inside list-disc">
        <li>Business Agility - using OKRs to set goals</li>
        <li>
          Agile Product Development - using SCRUM to build a solid product
          pipeline
        </li>
        <li></li>
      </ol>
      <span className="text-xs">
        ... as said. I love to code in my spare time, that&apos;s it.
      </span>
    </div>

    <div className="flex">
      <div className="mr-2 w-1/2">
        <Card image="okrs.jpg" />
      </div>
      <div className="ml-2 w-1/2">
        <Card image="avatar.png" />
      </div>
    </div>
  </Layout>
)

export default About
