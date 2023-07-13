import React from 'react';
import { render, screen } from '@testing-library/react';
import Form from '../src/app/section/Form';

test('renders the form UI', () => {
  render(<Form />);
  screen.getByText(/do you want your feedback to be anonymous\?/i)
  screen.getByDisplayValue(/no/i)
  screen.getByText(/name:/i)
  screen.getByText(/registration number:/i)
  screen.getByText(/email id:/i)
  screen.getByText(/year of graduation:/i)
  screen.getByDisplayValue(/2024/i)
  screen.getByText(/problem subject/i)
  screen.getByDisplayValue(/select/i)
  screen.getByText(/describe your issue/i)
  screen.getByText(/year of graduation:/i)
  screen.getByText(/problem subject/i)
  screen.getByText(/describe your issue/i)
  screen.getByRole('button', {
    name: /submit/i
  })
});
