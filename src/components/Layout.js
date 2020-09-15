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
      <footer className="p-4 mx-auto max-w-xl md:max-w-3xl lg:max-w-4xl content-start text-center">
        <div className="text-3xl">
          <ShareArticle />
        </div>

        <Link to="/impressum" className="text-xs">
          Imprint
        </Link>
      </footer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
