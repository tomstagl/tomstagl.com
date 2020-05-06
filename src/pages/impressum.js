import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'

const Impressum = () => (
  <Layout>
    <SEO title="Impressum" />
    <div>
      <h1>Imprint</h1>
      <div>Thomas Stagl</div>
      <div>Berggasse 2</div>
      <div>2542 Kottingbrunn</div>

      <div>ATU XXX</div>
    </div>
    <div className="pt-4">
      <h1>How to contact</h1>
      <ul>
        <li>Linked In</li>
        <li>Twitter</li>
      </ul>
    </div>
  </Layout>
)

export default Impressum
