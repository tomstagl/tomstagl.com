import PropTypes from 'prop-types'
import React from 'react'

import { H2 } from '../Container/Headers'

const FaqTitle = ({ title, colorTitle, subtitle, subtitle2, subtitle3 }) => {
  return (
    <div>
      <H2>
        {title}
        {colorTitle && (
          <span className="text-teal-600">&nbsp;{colorTitle}</span>
        )}
      </H2>
      {subtitle && (
        <h3 className="mt-4 max-w-2xl text-xl leading-7 text-gray-500 lg:mx-auto">
          {subtitle}
        </h3>
      )}
      {subtitle2 && (
        <h3 className="leading-7 text-l text-gray-700 mb-2">{subtitle2}</h3>
      )}
      {subtitle3 && <h3 className="text-xs text-gray-600">{subtitle3}</h3>}
    </div>
  )
}

FaqTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  colorTitle: PropTypes.string,
  subtitle2: PropTypes.string,
  subtitle3: PropTypes.string,
}

export default FaqTitle
