import '@testing-library/jest-dom'
import React from 'react'
import { render } from '@testing-library/react'

import BlogCodeBlock from './blogCodeBlock'

describe('BlogCodeBlock', () => {
  it('should render the code block', () => {
    const testData = {
      codeblock: 'This is some code',
      language: 'javascript',
    }

    const { getByTestId } = render(
      <BlogCodeBlock
        codeblock={testData.codeblock}
        language={testData.language}
      />,
    )
    expect(getByTestId('blogCodeBlock-container')).toHaveClass(
      'language-' + testData.language,
    )
    expect(getByTestId('blogCodeBlock-code')).toHaveTextContent(
      testData.codeblock,
    )
  })
})
