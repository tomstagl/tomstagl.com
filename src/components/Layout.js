import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { FaTwitter, FaLinkedin } from 'react-icons/fa'

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
      <Header siteTitle="Tom Stagl" />
      <main className="p-4 max-w-2xl mx-auto">{children}</main>
      <footer className="p-4 mx-auto max-w-2xl content-start text-center">
        <div className="flex flex-row">
          <div className="w-1/3"></div>
          <div className="w-1/3">
            <Link to="/impressum" className="text-xs">
              Imprint
            </Link>
          </div>
          <div className="w-1/3 flex flex-row-reverse">
            <a
              className="px-4"
              rel="noopener noreferrer"
              target="_blank"
              href="https://twitter.com/herrstagl"
            >
              <FaTwitter className="text-teal-600" />
            </a>

            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://at.linkedin.com/in/herrstagl"
            >
              <FaLinkedin className="text-teal-600" />
            </a>
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
