import React from 'react'

const BlogCodeBlock = (props) => {
  const { language, codeblock } = props
  return (
    <pre className={`language-${language} rounded`}>
      <code>{codeblock}</code>
    </pre>
  )
}

export default BlogCodeBlock
