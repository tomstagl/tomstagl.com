import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const NavItem = (props) => {
  const { to, name } = props

  return (
    <li className="block my-1 text-xl lg:mr-6 lg:my-auto lg:text-base">
      <Link
        className="text-gray-700 md:text-gray-400 hover:text-teal-500"
        activeClassName="text-teal-500 underline"
        to={to}
      >
        {name}
      </Link>
    </li>
  )
}

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

export default NavItem
