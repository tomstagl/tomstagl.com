import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'

const Impressum = () => (
  <Layout>
    <SEO title="Impressum" />
    <div>
      <h1>Impressum</h1>
      <div>Thomas Stagl</div>
      <div>Berggasse 2</div>
      <div>2542 Kottingbrunn</div>
      <div>Austria</div>

      <div className="pt-4">GEWERBE</div>

      <div className="pt-4">Tel <a href="tel://+436766688722">+43 676 6688722</a></div>

      <div className="pt-4">UID-Nr. XXX</div>

      <div className="pt-4">Mitglieder der WKO..............</div>
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
