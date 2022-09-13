import React from 'react'
import {screen, render} from '@testing-library/react'
import {Router} from 'react-router-dom'
import {createMemoryHistory} from 'history'
import userEvent from '@testing-library/user-event'
import {Main} from '../main'

function browserWrapper({children}) {
  const history = createMemoryHistory({initialEntries: ['/']})
  return <Router history={history}>{children}</Router>
}

test('if the router shows the correct pages', () => {
  render(<Main />, {wrapper: browserWrapper})
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
