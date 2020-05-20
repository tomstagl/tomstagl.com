import React from 'react'
import NavItem from './navItem'

const links = [
  { to: '/', name: 'Start' },
  { to: '/blog/', name: 'Blog' },
  { to: '/about/', name: 'About' },
]

const navItems = links.map((item, index) => (
  <NavItem key={index} to={item.to} name={item.name} />
))

const Navigation = () => {
  const [burgerMenuVisible, setBurgerMenuVisible] = React.useState(false)
  return (
    <>
      <div className="block lg:hidden relative" id="mobile-nav-toggle">
        <button
          id="toggle-burger-menu"
          className="flex items-center text-teal-600"
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
      <div
        className={`${
          !burgerMenuVisible ? 'hidden' : ''
        } absolute lg:relative lg:flex lg:items-center lg:w-auto lg:mt-0 lg:block`}
        id="nav-menu"
      >
        <ul className="justify-end flex-1 bg-gray-200 shadow lg:bg-white lg:w-auto lg:shadow-none lg:flex lg:flex-row lg:block">
          {navItems}
        </ul>
      </div>
    </>
  )
}

export default Navigation
