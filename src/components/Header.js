import PropTypes from 'prop-types'
import React from 'react'
import Avatar from './avatar'
import Navigation from './Navigation/navigation'

const Header = ({ siteTitle }) => (
  <nav className="max-w-2xl mx-auto px-4 pb-3 flex items-center justify-between flex-wrap">
    <Avatar title={siteTitle} />
    <Navigation />
  </nav>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
