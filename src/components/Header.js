import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import Avatar from './avatar'
import Navigation from './navigation'

const Header = ({ siteTitle }) => (
  <header className="pl-4 mx-auto md:max-w-lg lg:max-w-3xl">
    <div className="relative flex items-center">
      <Avatar />
      <div>
        <div className="font-extrabold text-2xl">
          <Link to="/">{siteTitle}</Link>
        </div>
      </div>
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
