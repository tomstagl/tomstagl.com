import React from 'react'
import NavItem from './navItem'

const links = [
  { to: '/', name: 'Start' },
  { to: '/blog/', name: 'Blog' },
  { to: '/about/', name: 'About' },
  { to: '/impressum/', name: 'Imprint' },
]

const navItems = links.map((item, index) => (
  <NavItem to={item.to} name={item.name} />
))

const Navigation = () => (
  <nav className="p-4 my-4 bg-gray-200">
    <ul className="flex justify-center">{navItems}</ul>
  </nav>
)

export default Navigation
