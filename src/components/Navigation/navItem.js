import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const NavItem = (props) => {
  const { to, name } = props

  return (
    <li className="mr-6">
      <Link
        className="text-gray-700 hover:text-teal-500"
        activeClassName="text-teal-500 underline "
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
