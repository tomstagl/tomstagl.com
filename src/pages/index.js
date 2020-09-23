import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = () => (
  <Layout>
    <SEO title="Engineering Leader" description="I'm an experienced engineering leader and Business Agility Coach focusing on New Work, OKRs and SCRUM, " />
    <div>
      <h1>👋 I&apos;m Tom Stagl, business agility coach</h1>
      <p>
        living and working as a freelance{' '}
        <span className="font-bold text-teal-500">Agile Coach</span> in Austria.
        Focusing on{' '}
        <span className="font-bold text-teal-500">business agility</span> and{' '}
        <span className="font-bold text-teal-500">agile transformation</span>.
      </p>
    </div>
    <div className="-p-4 rounded-t-lg bg-white">
      Besides helping teams and organisations to see and feel the benefits of{' '}
      <strong>Agile</strong>- and <strong>DevOps</strong> principles, I&apos;m
      also an experienced engineering leader who can help organisations to lift
      off an successful agile transition journey.
    </div>
    <div className="pt-6">
      <h2>&#128640; My main agile competences</h2>
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
    </div>
    <div className="pt-6">
      <h2>&#x2B50; My leadership competences</h2>
      <ol className="list-inside list-disc">
        <li>Team composition</li>
        <li>Value stream mapping</li>
        <li>Talent Acquisition</li>
      </ol>
    </div>
  </Layout>
)

export default IndexPage
