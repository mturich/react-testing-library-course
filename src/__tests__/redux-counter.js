/* eslint-disable no-unused-vars */
import React from 'react'
import {screen, render as renderRTL} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {store as appStore} from '../redux-store'
import {reducer} from '../redux-reducer'

import {Counter} from '../redux-counter'

function render(
  ui,
  {
    initialState = 0,
    store = createStore(reducer, {count: initialState}),
    ...rtlOptions
  } = {},
) {
  function Wrapper({children}) {
    return <Provider store={store}>{children}</Provider>
  }

  return {...renderRTL(ui, {wrapper: Wrapper, ...rtlOptions}), store}
}

test('the Counter redux component with defaults', () => {
  render(<Counter />)
  expect(screen.getByRole('heading', {name: /counter/i})).toBeInTheDocument()

  const plus = screen.getByRole('button', {name: '+'})
  const minus = screen.getByRole('button', {name: '-'})

  const count = screen.getByLabelText(/count/)
  expect(count).toHaveTextContent(0)

  userEvent.click(plus)
  userEvent.click(plus)
  expect(count).toHaveTextContent(2)

  userEvent.click(minus)
  userEvent.click(minus)
  expect(count).toHaveTextContent(0)

  userEvent.click(minus)
  userEvent.click(minus)
  expect(count).toHaveTextContent(-2)
})

test('can render redux with custom initial state', () => {
  render(<Counter />, {initialState: 3})

  const count = screen.getByLabelText(/count/)
  expect(count).toHaveTextContent(3)

  const minus = screen.getByRole('button', {name: '-'})
  userEvent.click(minus)
  userEvent.click(minus)
})
