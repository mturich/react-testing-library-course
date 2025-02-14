import React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
const {FavoriteNumber} = require('../favorite-number')

test('renders a number input with a label "Favorite Number"', () => {
  // eslint-disable-next-line no-unused-vars
  const {getByLabelText, debug} = render(<FavoriteNumber />)
  // eslint-disable-next-line testing-library/prefer-screen-queries
  const input = getByLabelText(/favorite number/i)
  expect(input).toHaveAttribute('type', 'number')
})

test('RTL: renders a number input NEW SCREEN APPROACH with a label "Favorite Number"', () => {
  render(<FavoriteNumber />)

  expect(screen.getByLabelText(/favorite number/i)).toBeInTheDocument()
})

test('NEW USER EVENT: entering an invalid value shows an error mesasge', () => {
  const {rerender} = render(<FavoriteNumber />)
  const input = screen.getByLabelText(/favorite number/i)
  userEvent.type(input, '10')
  //expect(screen.queryByRole(/alert/i)).not.toBeInTheDocument()
  expect(screen.getByRole('alert')).toHaveTextContent(/the number is invalid/i)

  rerender(<FavoriteNumber max={10} />)

  // to check if a element is not rendered
  expect(screen.queryByRole('alert')).not.toBeInTheDocument()
})
