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
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div>
        <main className="p-4 mx-auto md:max-w-lg lg:max-w-3xl">{children}</main>
        <footer className="p-4 mx-auto bg-gray-200 shadow text-xs">
          ©{new Date().getFullYear()}
          <Link to="/imprint" />
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
