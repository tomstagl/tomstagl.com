import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import Avatar from './avatar'

const Header = ({ siteTitle }) => (
  <header className="pl-4 mx-auto md:max-w-lg lg:max-w-2xl">
    <div className="flex items-center">
      <Avatar />
      <div>
        <h1 className="font-extrabold">
          <Link to="/">{siteTitle}</Link>
        </h1>
      </div>
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
