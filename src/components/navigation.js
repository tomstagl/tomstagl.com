import React from 'react'
import NavItem from './navItem'

const links = [
  { to: '/', name: 'Start' },
  { to: '/blog/', name: 'Blog' },
  { to: '/about/', name: 'About' },
  { to: '/impressum/', name: 'Imprint' },
]

const navItems = links.map((item, index) => (
  <NavItem key={index} to={item.to} name={item.name} />
))

const Navigation = () => (
  <div className="absolute right-0">
    <nav className="p-4 my-4">
      <ul className="flex justify-center">{navItems}</ul>
    </nav>
  </div>
)

export default Navigation
