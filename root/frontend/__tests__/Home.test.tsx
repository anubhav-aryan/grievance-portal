import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../src/app/page';
import '@testing-library/jest-dom/extend-expect';


test('renders the home page', () => {
    render(<Home />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
  