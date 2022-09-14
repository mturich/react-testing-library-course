import React from 'react'
import {render, act} from '@testing-library/react'
import {useCounter} from '../use-counter'

function callHook(initialProps) {
  const result = {}
  function CustomHook() {
    result.current = useCounter(initialProps)
    return null
  }
  render(<CustomHook />)
  return result
}

test('useCounter to make sure that it works properly', () => {
  const result = callHook()
  const {increment, decrement} = result.current

  expect(result.current.count).toBe(0)

  act(() => increment())
  expect(result.current.count).toBe(1)

  act(() => decrement())
  expect(result.current.count).toBe(0)
})

test('allows customization to the initial value', () => {
  const result = callHook({initialCount: 2})
  //const result = callHook(2)
  const {increment, decrement} = result.current

  expect(result.current.count).toBe(2)

  act(() => increment())
  expect(result.current.count).toBe(3)

  act(() => decrement())
  expect(result.current.count).toBe(2)
})

test('allows customization to the step', () => {
  const result = callHook({step: 2})
  const {increment, decrement} = result.current

  expect(result.current.count).toBe(0)

  act(() => increment())
  expect(result.current.count).toBe(2)
  act(() => decrement())
  expect(result.current.count).toBe(0)
})
