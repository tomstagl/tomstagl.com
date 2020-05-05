import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import Header from './header'
import Navigation from './navigation'
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
      <Navigation />
      <div>
        <main className="p-4 mx-auto md:max-w-lg lg:max-w-2xl">{children}</main>
        <footer className="p-4 mx-auto bg-gray-200 shadow text-xs">
          ©{new Date().getFullYear()}
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
