import PropTypes from 'prop-types'
import React from 'react'
import Avatar from './Avatar/avatar'
import Navigation from './Navigation/navigation'

const Header = ({ siteTitle, renderAvatar, children }) => (
  <nav className="bg-white md:bg-gray-800 md:text-gray-400 pt-4 md:from-gray-800 md:via-gray-700  md:to-gray-800 md:bg-gradient-to-r">
    <div className="max-w-xl md:max-w-3xl lg:max-w-4xl  mx-auto px-4 pb-3 flex items-center justify-between flex-wrap">
      {renderAvatar ? (
        <Avatar title={siteTitle} />
      ) : (
        <Avatar title={siteTitle} className="lg:hidden" />
      )}
      <Navigation />
      {children}
    </div>
  </nav>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
  renderAvatar: PropTypes.bool,
  children: PropTypes.node,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
