import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const titleElement = getByText(/Sign up to tray.io/i);
  expect(titleElement).toBeInTheDocument();
});


test('Form can be submitted', async() => {
  const { findByText, getByTestId } = render(<App />);
  const nameInput = screen.getByLabelText(/name/i)
  await userEvent.type(nameInput, 'Test Name')
  const emailInput = screen.getByLabelText(/email/i)
  await userEvent.type(emailInput, 'test@test.com')
  const passwordInput = screen.getByLabelText(/password/i)
  await userEvent.type(passwordInput, 'TDSFff222ame')


  fireEvent.click(getByTestId('next'))
  const textBox1 = await findByText(/Receive updates about Tray.io product by email/i);
  expect(textBox1).toBeInTheDocument();
  const textBox2 = await findByText(/Receive communication by email for other products created by the Tray.io team/i);
  expect(textBox2).toBeInTheDocument();
  fireEvent.click(getByTestId('submit'))
  const successMessage = await findByText(/Please verify you email address, you should have received an email from us already!/i);
  expect(successMessage).toBeInTheDocument();
});
