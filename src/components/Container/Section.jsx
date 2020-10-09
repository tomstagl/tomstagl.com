import React from 'react'
import PropTypes from 'prop-types'

const Section = ({ children, className, dark }) => {
  console.log(dark)
  const css = className || ''
  const darkerBackground = dark ? 'bg-gray-100' : ''
  return (
    <section className={`lg:p-8 ${css} ${darkerBackground}`}>
      <div className="p-4 max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto">
        {children}
      </div>
    </section>
  )
}

Section.propTypes = {
  children: PropTypes.object.isRequired,
  className: PropTypes.string,
  dark: PropTypes.bool,
}

Section.defaultProps = {
  children: {},
  className: '',
  dark: false,
}

export default Section
