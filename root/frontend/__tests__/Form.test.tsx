import React from 'react';
import { render, screen } from '@testing-library/react';
import Form from '../src/app/section/Form';

test('renders the form UI', () => {
  render(<Form />);
  screen.getByText(/do you want your feedback to be anonymous\?/i)
  screen.getByDisplayValue(/no/i)
  screen.getByText(/name:/i)
  document.querySelector('#sandbox > div > div:nth-child(2) > input')
  screen.getByText(/registration number:/i)
  document.querySelector('#sandbox > div > div:nth-child(3) > input')
  screen.getByText(/email id:/i)
  document.querySelector('#sandbox > div > div:nth-child(4) > input')
  screen.getByText(/year of graduation:/i)
  screen.getByDisplayValue(/2024/i)
  screen.getByText(/problem subject/i)
  screen.getByDisplayValue(/select/i)
  screen.getByText(/describe your issue/i)
  document.querySelector('#sandbox > div > div:nth-child(7) > textarea')
  screen.getByRole('button', {
    name: /submit/i
  })
});
