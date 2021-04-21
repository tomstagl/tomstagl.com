import React from 'react'

import { H1 } from '../components/Container/Headers'
import Section from '../components/Container/Section'
import Layout from '../components/layout'
import SEO from '../components/seo'

const Impressum = () => (
  <Layout>
    <SEO title="Impressum" />
    <Section>
      <H1>Impressum</H1>
      <div className="py-4">
        FYI: Due to Austrian law we are legally oblidged to disclose the
        ownership details of this website.
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
          <p>
            Tel: <a href="tel://+436766688722">+43 676 6688722</a>
          </p>
          <p>Email: thomas.stagl@gmail.com</p>
        </div>

        <div className="pt-4">UID-Nr. ATU52936809</div>

        <div className="pt-4">Mitglieder der WKO Nieder&ouml;sterreich</div>

        <div className="pt-4">
          <div>Berufsrecht:</div>
          <div>Gewerbeordnung: www.ris.bka.gv.at</div>
        </div>
        <div className="pt-4">
          Verbraucher haben die Möglichkeit, Beschwerden an die
          Online-Streitbeilegungsplattform der EU zu richten:
          http://ec.europa.eu/odr. Sie können Ihre Beschwerde auch an die oben
          angef&uuml;hrte E-Mail-Adresse richten.
        </div>
      </div>
    </Section>
  </Layout>
)

export default Impressum
