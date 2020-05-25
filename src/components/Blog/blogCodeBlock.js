import React from 'react'

const BlogCodeBlock = (props) => {
  const { language, codeblock } = props
  return (
    <pre>
      <code className={`language-${language}`}>{codeblock}</code>
    </pre>
  )
}

export default BlogCodeBlock
