import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'

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
      <h2>I &#x2661; to code with</h2>
      <ol className="list-inside list-disc">
        <li>NextJS</li>
        <li>GatsbyJS - Especially for this site</li>
        <li>NodeJS</li>
        <li>Gitlab</li>
        <li>Amazon Web Services</li>
      </ol>
      <span className="text-xs">
        ... as said. I love to code in my spare time, that&apos;s it.
      </span>
    </div>
  </Layout>
)

export default About
