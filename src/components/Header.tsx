import PropTypes from 'prop-types'
import React, { FunctionComponent } from 'react'

import Avatar from './Avatar/avatar'
import Navigation from './Navigation/navigation'

type HeaderProps = {
  siteTitle: string
  renderAvatar?: boolean
}

const Header: FunctionComponent<HeaderProps> = ({
  siteTitle = '',
  renderAvatar = true,
  children,
}) => (
  <div className="bg-white bg-gray-800 text-gray-400 pt-4 md:from-gray-800 md:via-gray-700  md:to-gray-800 md:bg-gradient-to-r">
    <div className="max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto pb-3">
      <nav className="flex items-center justify-between flex-wrap">
        {renderAvatar ? (
          <Avatar title={siteTitle} />
        ) : (
          <Avatar title={siteTitle} className="hidden" />
        )}
        <Navigation />
      </nav>
      {children}
    </div>
  </div>
)

Header.propTypes = {
  children: PropTypes.node,
  siteTitle: PropTypes.string.isRequired,
  renderAvatar: PropTypes.bool,
}
export default Header
