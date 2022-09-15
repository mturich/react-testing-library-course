import React from 'react'
import {render, act} from '@testing-library/react'
import {useCounter} from '../use-counter'

let result

function callHook({initialCount = 0, step = 1} = {}) {
  function CustomHook() {
    result = useCounter({initialCount, step})
    return null
  }
  return CustomHook
}

test('useCounter to make sure that it works properly', () => {
  const CustomHook = callHook()
  render(<CustomHook />)

  expect(result.count).toBe(0)

  act(() => result.increment())
  expect(result.count).toBe(1)

  act(() => result.decrement())
  expect(result.count).toBe(0)
})

test('allows customization to the initial value', () => {
  const CustomHook = callHook({initialCount: 2})
  render(<CustomHook />)

  expect(result.count).toBe(2)

  act(() => result.increment())
  expect(result.count).toBe(3)

  act(() => result.decrement())
  expect(result.count).toBe(2)
})

test('allows customization to the step', () => {
  const CustomHook = callHook({step: 2})
  render(<CustomHook />)

  expect(result.count).toBe(0)

  act(() => result.increment())
  expect(result.count).toBe(2)

  act(() => result.decrement())
  expect(result.count).toBe(0)
})
