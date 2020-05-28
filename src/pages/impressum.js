import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'

const Impressum = () => (
  <Layout>
    <SEO title="Impressum" />
    <h1>Impressum</h1>
    <div className="py-4">
      FYI: Due to Austrian we are legally oblidged to disclose the ownership
      details of this website.
    </div>
    <div>
      <div>Thomas Stagl</div>
      <div>Berggasse 2</div>
      <div>2542 Kottingbrunn</div>
      <div>Austria</div>

      <div className="pt-4">
        Dienstleistungen in der automatischen Datenverarbeitung und
        Informationstechnik
      </div>

      <div className="pt-4">
        Tel: <a href="tel://+436766688722">+43 676 6688722</a>
      </div>

      <div className="pt-4">UID-Nr. XXX</div>

      <div className="pt-4">Mitglieder der WKO..............</div>

      <div className="pt-4">
        <div>Berufsrecht:</div>
        <div>Gewerbeordnung: www.ris.bka.gv.at</div>
      </div>
      <div className="pt-4">
        Verbraucher haben die Möglichkeit, Beschwerden an die
        OnlineStreitbeilegungsplattform der EU zu richten:
        http://ec.europa.eu/odr. Sie können allfällige Beschwerde auch an die
        oben angegebene E-Mail-Adresse richten.
      </div>
    </div>
  </Layout>
)

export default Impressum
