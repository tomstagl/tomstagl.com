import PropTypes from 'prop-types'
import React from 'react'
import Avatar from './avatar'
import Navigation from './Navigation/navigation'

const Header = ({ siteTitle }) => (
  <nav className="mx-auto px-4 flex items-center justify-between flex-wrap lg:max-w-3xl">
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
