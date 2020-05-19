import React from 'react'

const MobileMenu = (props) => {
  const [burgerMenuVisible, setBurgerMenuVisible] = React.useState(false)
  const { navItems } = props
  return (
    <div className="lg:hidden" id="mobile-menu">
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
      <div
        className={`bg-white w-full absolute ${
          !burgerMenuVisible ? 'hidden' : ''
        }`}
      >
        <ul>{navItems}</ul>
      </div>
    </div>
  )
}

export default MobileMenu
