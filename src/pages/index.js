import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div>
      <h1 className="text-xl">👋 I'm Tom Stagl</h1>
      <p>
        living and working as a freelance <strong>Agile Coach</strong> in
        Austria.
      </p>
    </div>
    <div>
      <div>
        Besides helping teams to see and feel the benefits of{' '}
        <strong>agile</strong>- and <strong>DevOps</strong> principles, I also
        like to code.
      </div>
    </div>
    <div className="pt-6">
      <h2>&#128640; My main agile competencies</h2>
      <ol className="list-inside list-disc">
        <li>Scrum</li>
        <li>Business Agility</li>
        <li>Agile Transition</li>
      </ol>
    </div>
    <div className="pt-6">
      <h2>My prefered technololgy stack:</h2>
      <ol className="list-inside list-disc">
        <li>NodeJS</li>
        <li>NextJS</li>
        <li>GatsbyJS - Especially for this site</li>
        <li>Gitlab</li>
        <li>Amazon Web Services</li>
      </ol>
    </div>
  </Layout>
)

export default IndexPage
