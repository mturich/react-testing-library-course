import React from 'react'
import {render, act} from '@testing-library/react'
import {Countdown} from '../countdown'

beforeAll(() => jest.spyOn(console, 'error').mockImplementation(() => {}))
afterAll(() => console.error.mockRestore())
//good pratice
afterEach(() => {
  jest.useRealTimers()
  jest.clearAllMocks()
})

test('does not attemp to set sate when unmounted to prevent memory leaks', () => {
  jest.useFakeTimers()

  const {unmount} = render(<Countdown />)
  unmount()
  act(() => jest.runOnlyPendingTimers())
  expect(console.error).not.toHaveBeenCalled()
})
