import React from 'react'
import {render, screen} from '@testing-library/react'
// eslint-disable-next-line import/no-unresolved
import {ErrorBoundary} from 'error-boundary'
import userEvent from '@testing-library/user-event'
//in this case it just mocks the reportError function
//which is named concisely to increase understandability
import {reportError as mockReportError} from '../api'

// replaces all the functions from '../api'
jest.mock('../api')

beforeAll(() => {
  //mocks the console.error function
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterAll(() => {
  //console.error('test')
  //resets the console.error mock
  console.error.mockRestore()
})

afterEach(() => {
  jest.clearAllMocks()
})

function Bomb({shouldTrow}) {
  if (shouldTrow) {
    // console.error('really important')
    throw new Error('💣')
  } else return null
}

test('calls reportError and renders that if there was a problem', () => {
  mockReportError.mockResolvedValueOnce({success: true})

  const {rerender} = render(
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>,
  )

  expect(screen.queryByRole('alert')).not.toBeInTheDocument()

  rerender(
    <ErrorBoundary>
      <Bomb shouldTrow={true} />
    </ErrorBoundary>,
  )
  //to check out what really is error and info
  const error = expect.any(Error)
  //this is complicated
  const info = {componentStack: expect.stringContaining('Bomb')}
  expect(mockReportError).toHaveBeenCalledWith(error, info)
  expect(mockReportError).toHaveBeenCalledTimes(1)
  // to verify that only the 2 expected error (jsdom and react)
  // are surpressed and nothing else
  expect(console.error).toHaveBeenCalledTimes(2)
  expect(screen.getByRole('alert')).toBeInTheDocument()

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // resets the counter for console.error && Report
  console.error.mockClear()
  mockReportError.mockClear()

  rerender(
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>,
  )

  const btn = screen.getByRole('button', {name: /try again/i})
  expect(btn).toBeInTheDocument()
  userEvent.click(btn)

  expect(mockReportError).not.toHaveBeenCalled()
  expect(console.error).not.toHaveBeenCalled()
})
