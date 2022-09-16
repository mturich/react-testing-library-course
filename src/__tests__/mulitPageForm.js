import React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../app-reach-router'
import {submitForm as mockSubmitForm} from '../api'

jest.mock('../api')

afterEach(() => {
  jest.clearAllMocks()
})
afterAll(() => jest.resetAllMocks())

test('should test that the initial page renders', async () => {
  mockSubmitForm.mockResolvedValueOnce({success: true})
  const testData = {
    food: 'Salata Vitamines',
    drink: 'Coke Zero',
  }
  render(<App />)

  expect(await screen.findByRole('heading')).toHaveTextContent(/welcome/i)
  userEvent.click(await screen.findByRole('link', {name: /fill.*form/i}))

  expect(
    await screen.findByRole('heading', {name: /page 1/i}),
  ).toBeInTheDocument()
  userEvent.type(await screen.findByLabelText(/Favorite Food/i), testData.food)
  userEvent.click(await screen.findByRole('link', {name: /next/i}))

  expect(
    await screen.findByRole('heading', {name: /page 2/i}),
  ).toBeInTheDocument()
  userEvent.type(await screen.findByLabelText(/ Drink/i), testData.drink)
  userEvent.click(await screen.findByRole('link', {name: /review/i}))

  expect(await screen.findByLabelText(/food/i)).toHaveTextContent(testData.food)
  expect(await screen.findByLabelText(/drink/i)).toHaveTextContent(
    testData.drink,
  )

  userEvent.click(await screen.findByRole('button', {name: /confirm/i}))

  /*   expect(mockSubmitForm.mock.calls[0][0]).toMatchInlineSnapshot(`
    Object {
      "drink": "Coke Zero",
      "food": "Salata Vitamines",
    }
  `) */
  expect(mockSubmitForm).toHaveBeenCalledWith(testData)
  expect(mockSubmitForm).toHaveBeenCalledTimes(1)

  expect(await screen.findByText(/home/)).toBeInTheDocument()
  expect(await screen.findByText(/You did it/)).toBeInTheDocument()

  userEvent.click(await screen.findByRole('link', {name: /home/i}))
  expect(await screen.findByText(/welcome home/i)).toBeInTheDocument()
})
