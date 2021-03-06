import PropTypes from 'prop-types'
import React, { FunctionComponent } from 'react'

type SectionProps = {
  className?: string
  dark?: boolean
}

const Section: FunctionComponent<SectionProps> = ({
  children,
  className = '',
  dark = false,
}) => {
  const css = className || ''
  const darkerBackground = dark ? 'bg-gray-100 md:border' : ''
  return (
    <section className={`p-4 lg:py-12 ${css} ${darkerBackground}`}>
      <div className="container mx-auto max-w-xl md:max-w-3xl lg:max-w-4xl">
        {children}
      </div>
    </section>
  )
}

Section.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  dark: PropTypes.bool,
}

export default Section
