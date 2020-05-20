import PropTypes from 'prop-types'
import React from 'react'
import Avatar from './avatar'
import Navigation from './Navigation/navigation'

const Header = ({ siteTitle }) => (
  <header className="pl-4 mx-auto sm:max-w-l md:max-w-lg lg:max-w-3xl">
    <div className="w-full container mx-auto justify-between iiii relative flex flex-wrap items-center">
      <Avatar title={siteTitle} />
      <Navigation />
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
