import PropTypes from 'prop-types'
import React, { FunctionComponent } from 'react'

export const H1: FunctionComponent = ({ children }) => <h1>{children}</h1>
// TODO: make header for blog list. Original was:h2 {@apply text-2xl;}

export const H2: FunctionComponent = ({ children }) => (
  <h2 className="pb-4 text-3xl lg:text-center uppercase">{children}</h2>
)

export const H3: FunctionComponent = ({ children }) => (
  <h3 className="text-2xl lg:text-center uppercase">{children}</h3>
)

H1.propTypes = {
  children: PropTypes.node,
}

H2.propTypes = H1.propTypes
H3.propTypes = H1.propTypes
