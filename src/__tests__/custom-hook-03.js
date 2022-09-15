import {renderHook, act} from '@testing-library/react-hooks'
import {useCounter} from '../use-counter'

test('useCounter to make sure that it works properly', () => {
  const {result} = renderHook(useCounter)
  const {increment, decrement} = result.current

  expect(result.current.count).toBe(0)
  act(() => increment())
  expect(result.current.count).toBe(1)
  act(() => decrement())
  expect(result.current.count).toBe(0)
})

test('allows customization to the initial value', () => {
  const {result} = renderHook(useCounter, {initialProps: {initialCount: 2}})

  const {increment, decrement} = result.current

  expect(result.current.count).toBe(2)
  act(() => increment())
  expect(result.current.count).toBe(3)
  act(() => decrement())
  expect(result.current.count).toBe(2)
})

test('allows customization to the step', () => {
  const {result} = renderHook(useCounter, {initialProps: {step: 2}})
  const {increment, decrement} = result.current

  expect(result.current.count).toBe(0)
  act(() => increment())
  expect(result.current.count).toBe(2)
  act(() => decrement())
  expect(result.current.count).toBe(0)
})

test('step can be changed', () => {
  const {result, rerender} = renderHook(useCounter, {initialProps: {step: 3}})
  // !!! Can not deconstruct increment and decrement in case of a rerender and a change in the steps
  //const { increment, decrement } = result.current

  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(3)

  rerender({step: 1})
  act(() => result.current.decrement())
  expect(result.current.count).toBe(2)
})
