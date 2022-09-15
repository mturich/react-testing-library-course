import React from 'react'
import {render, screen, within} from '@testing-library/react'
import {Modal} from '../modal'

test('should render children of modal', () => {
  render(
    <>
      <div data-testid="foo" />
      <Modal>
        <div data-testid="modal">test </div>
      </Modal>
      ,
    </>,
    //{baseElement: document.getElementById('modal-root')}
  )
  within(document.getElementById('modal-root'))
  expect(screen.getByTestId('modal')).toBeInTheDocument()
  expect(screen.getByTestId('modal')).toHaveTextContent(/test/)
  expect(screen.getByTestId('foo')).toBeInTheDocument()

  const {getByTestId} = within(document.getElementById('modal-root'))
  expect(getByTestId('modal')).toBeInTheDocument()
  expect(getByTestId('modal')).toHaveTextContent(/test/)
  //expect(getByTestId('foo')).toBeInTheDocument()
})
