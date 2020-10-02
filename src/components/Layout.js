import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'

import Header from './header'
import './layout.css'
import ShareArticle from './Footer/ShareArticle/shareArticle'

const Layout = ({ children }) => {
  return (
    <div className="mx-auto">
      <Header siteTitle="Tom Stagl" />
      <main className="p-4 max-w-xl md:max-w-3xl lg:max-w-4xl  mx-auto">
        {children}
      </main>
      <footer className="bg-white md:bg-gray-800 md:text-gray-400">
        <div className="flex flex-col-reverse md:flex-row mx-auto max-w-xl md:max-w-3xl lg:max-w-4xl pt-2 p-4">
          <div className="block w-full md:w-1/3 justify-center md:justify-start p-4 md:p-0">
            <address className="text-sm not-italic text-center md:text-left">
              <p className="font-bold">Kontakt</p>
              <p>Thomas Stagl</p>
              <p>Berggasse 2</p>
              <p>2542 Kottingbrunn</p>
              <p>
                Email:{' '}
                <a
                  href="mailto:thomas.stagl@gmail.com"
                  className="md:text-gray-400"
                >
                  thomas.stagl@gmail.com
                </a>
              </p>
              <p>
                Tel:{' '}
                <a href="tel://+436766688722" className="md:text-gray-400">
                  +43 676 6688722
                </a>
              </p>
            </address>
          </div>
          <div className="flex w-full md:w-1/3 justify-center p-4 md:p-0">
            <Link to="/impressum" className="text-xs md:text-gray-400">
              Imprint
            </Link>
          </div>
          <div className="flex w-full md:w-1/3 justify-center md:items-start md:justify-end p-4 md:p-0">
            <ShareArticle />
          </div>
        </div>
      </footer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
