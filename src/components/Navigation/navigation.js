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
      <div className="block lg:hidden " id="mobile-nav-toggle">
        <button
          id="toggle-burger-menu"
          className="flex items-center px-3 py-2 text-teal-600"
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
        } w-full -mx-4 block flex-grow lg:flex lg:items-center lg:w-auto`}
        id="nav-menu"
      >
        <ul className="pt-4 flex flex-grow flex-col items-center lg:flex-row lg:p-0 lg:w-auto lg:justify-end lg:my-2 ">
          {navItems}
        </ul>
      </div>
    </>
  )
}

export default Navigation
