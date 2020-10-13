import React, { FunctionComponent } from 'react'
import PropTypes from 'prop-types'

type BlogCodeBlockTypes = {
  language: string
  codeblock: string
}

const BlogCodeBlock: FunctionComponent<BlogCodeBlockTypes> = (props) => {
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
