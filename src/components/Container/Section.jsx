import React from 'react'
import PropTypes from 'prop-types'

const Section = ({ children, className }) => {
  const css = className || ''
  return (
    <section className={css}>
      <div className="p-4 max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto">
        {children}
      </div>
    </section>
  )
}

Section.propTypes = {
  children: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default Section
