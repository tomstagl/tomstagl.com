import React from 'react'
import { render } from '@testing-library/react'

import Avatar from './avatar'

test('renders the correct title', () => {
  const { getByText } = render(<Avatar title="Test" />)
  expect(getByTestId('avatar-title').toHaveTextConten('Test'))
})
