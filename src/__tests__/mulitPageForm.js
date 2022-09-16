import React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../app-reach-router'

const DISHES = {
  food: 'Salata Vitamines',
  drink: 'Coke Zero',
}

//import {Router} from 'react-router'

test('should test that the initial page renders', async () => {
  render(<App />)

  expect(screen.getByRole('heading')).toHaveTextContent(/welcome/i)
  userEvent.click(screen.getByRole('link', {name: /fill out/i}))

  expect(
    await screen.findByRole('heading', {name: /page 1/i}),
  ).toBeInTheDocument()
  userEvent.type(screen.getByLabelText(/Favorite Food/i), DISHES.food)
  userEvent.click(screen.getByRole('link', {name: /next/i}))

  expect(
    await screen.findByRole('heading', {name: /page 2/i}),
  ).toBeInTheDocument()
  userEvent.type(screen.getByLabelText(/ Drink/i), DISHES.drink)
  userEvent.click(screen.getByRole('link', {name: /review/i}))

  expect(await screen.findByLabelText(/food/i)).toHaveTextContent(DISHES.food)
  expect(await screen.findByLabelText(/drink/i)).toHaveTextContent(DISHES.drink)
  //const confirm = await screen.findByRole('button', {name: /confirm/i})
  // userEvent.click(confirm)

  //ascreen.debug()
})
