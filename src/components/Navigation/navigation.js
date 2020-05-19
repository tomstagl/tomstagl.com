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

const Navigation = () => {
  const [burgerMenuVisible, setBurgerMenuVisible] = React.useState(false)
  return (
    <div className="absolute right-0">
      <nav className="p-4 my-4">
        <div className="lg:hidden" id="mobile-nav-toggle">
          <button
            id="toggle-burger-menu"
            onClick={() => setBurgerMenuVisible(!burgerMenuVisible)}
          >
            <svg
              className="fill-current h-6 w-6 "
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>

        <div className={`${!burgerMenuVisible ? 'hidden' : ''} lg:block`} id="desktop-menu">
          <ul className="flex justify-center">{navItems}</ul>
        </div>
      </nav>
    </div>
  )
}

export default Navigation
