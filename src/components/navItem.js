import React from 'react'
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

export default NavItem
