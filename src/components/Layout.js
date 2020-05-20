import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import Header from './header'
import './layout.css'

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div className="mx-auto">
      <Header siteTitle={data.site.siteMetadata.title} />
      <main className="p-4 max-w-2xl mx-auto">{children}</main>
      <footer className="p-4 w-12/12 max-w-none bg-gray-200 shadow text-xs">
        ©{new Date().getFullYear()}
        <Link to="/imprint" />
      </footer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
