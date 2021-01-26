import React from 'react'
import { screen, render } from '@testing-library/react'

import NotFound from '../Pages/NotFound'

describe('NotFound', () => {
  it('Displays not found page', () => {
    render(<NotFound />)
    expect(screen.getByText('Page not found')).toBeInTheDocument()
  })
})
