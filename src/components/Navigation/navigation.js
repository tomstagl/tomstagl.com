import React from 'react'
import NavItem from './navItem'
import DesktopMenu from './desktopMenu'
import MobileMenu from './mobileMenu'

const links = [
  { to: '/', name: 'Start' },
  { to: '/blog/', name: 'Blog' },
  { to: '/about/', name: 'About' },
  { to: '/impressum/', name: 'Imprint' },
]

const navItems = links.map((item, index) => (
  <NavItem key={index} to={item.to} name={item.name} />
))

const Navigation = () => {
  
  return (
    <div className="absolute right-0">
      <nav className="p-4 my-4">
        <DesktopMenu items={navItems}/>
        <MobileMenu items={navItems}/>
      </nav>
    </div>
  )
}

export default Navigation
