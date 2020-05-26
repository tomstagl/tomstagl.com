import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div>
      <h1>👋 I&apos;m Tom Stagl</h1>
      <p>
        living and working as a freelance <strong>Agile Coach</strong> in
        Austria.
      </p>
    </div>
    <div>
      <div>
        Besides helping teams and organisations to see and feel the benefits of{' '}
        <strong>Agile</strong>- and <strong>DevOps</strong> principles, I&apos;m
        also an experienced engineering leader who can help organisations to
        lift off an successful agile transition journey.
      </div>
    </div>
    <div className="pt-6">
      <h2>&#128640; My main agile competencies</h2>
      <ol className="list-inside list-disc">
        <li>Digitalisation</li>
        <li>Agile Transition</li>
        <li>Scrum</li>
        <li>Business Agility</li>
        <li>Team Lift-off</li>
        <li>Product Ownership</li>
      </ol>
    </div>
    <div className="pt-6">
      <h2>&#x2B50; My leadership competencies</h2>
      <ol className="list-inside list-disc">
        <li>Team composition</li>
        <li>Value stream mapping</li>
        <li>Talent Acquisition</li>
      </ol>
    </div>
  </Layout>
)

export default IndexPage
