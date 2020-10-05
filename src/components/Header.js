import PropTypes from 'prop-types'
import React from 'react'
import Avatar from './Avatar/avatar'
import Navigation from './Navigation/navigation'

const Header = ({ siteTitle, children }) => (
  <nav className="bg-white md:bg-gray-800 md:text-gray-400 pt-4">
    <div className="max-w-xl md:max-w-3xl lg:max-w-4xl  mx-auto px-4 pb-3 flex items-center justify-between flex-wrap">
      <Avatar title={siteTitle} />
      <Navigation />
      {children}
    </div>
  </nav>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
  children: PropTypes.node,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
