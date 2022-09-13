import React from 'react'
import {screen, render as rtlRender} from '@testing-library/react'
import {Router} from 'react-router-dom'
import {createMemoryHistory} from 'history'
import userEvent from '@testing-library/user-event'
import {Main} from '../main'

//should be in an init file as global
function render(
  ui,
  {
    route = '/',
    history = createMemoryHistory({initialEntries: [route]}),
    ...renderOptions
  } = {},
) {
  function Wrapper({children}) {
    return <Router history={history}>{children}</Router>
  }

  return {...rtlRender(ui, {wrapper: Wrapper, ...renderOptions}), history}
}

test('if the router shows the correct pages', () => {
  render(<Main />)
  const linkHome = screen.getByRole('link', {name: /Home/i})
  const linkAbout = screen.getByRole('link', {name: /about/i})

  //checks if links are in the document
  expect(linkHome).toBeInTheDocument()
  expect(linkAbout).toBeInTheDocument()

  userEvent.click(linkHome)

  //checks if Heading is home
  expect(screen.getByRole('heading')).toHaveTextContent(/home/i)
  expect(screen.getAllByText('Home')).toHaveLength(2)
  expect(screen.getByText(/you are home/i)).toBeInTheDocument()

  userEvent.click(linkAbout)
  // checks if Heading is about
  expect(screen.getByRole('heading')).toHaveTextContent(/about/i)
  expect(screen.getAllByText('About')).toHaveLength(2)
  expect(screen.getByText(/You are on the about page/i)).toBeInTheDocument()
})

test('landing on a bad page shows no match component', () => {
  render(<Main />, {route: '/wrongPath'})

  expect(screen.getByRole('heading')).toHaveTextContent(404)
  expect(screen.getByText(/no match/i)).toBeInTheDocument()
})
