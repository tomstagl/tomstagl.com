import React from 'react'

const mobileMenu = (props) => {
  const { navItems } = props

  return (
    <div className="hidden" id="desktop-menu">
      <ul className="flex justify-center">{navItems}</ul>
    </div>
  )
}

export default mobileMenu
