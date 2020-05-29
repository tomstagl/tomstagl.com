import React from 'react'
import PropTypes from 'prop-types'

const BlogCodeBlock = (props) => {
  const { language, codeblock } = props
  return (
    <pre
      data-testid="blogCodeBlock-container"
      className={`language-${language} rounded`}
    >
      <code data-testid="blogCodeBlock-code">{codeblock}</code>
    </pre>
  )
}

BlogCodeBlock.propTypes = {
  language: PropTypes.string.isRequired,
  codeblock: PropTypes.string.isRequired,
}

export default BlogCodeBlock
