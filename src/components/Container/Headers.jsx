import React from 'react'
import PropTypes from 'prop-types'

export const H1 = ({ children }) => <h1>{children}</h1>

export const H2 = ({ children }) => (
  <h2 className="pb-4 text-3xl lg:text-center uppercase">{children}</h2>
)

export const H3 = ({ children }) => (
  <h3 className="text-2xl uppercase">{children}</h3>
)

H1.propTypes = {
  children: PropTypes.node.isRequired,
}
H2.propTypes = H1.propTypes
H3.propTypes = H1.propTypes
