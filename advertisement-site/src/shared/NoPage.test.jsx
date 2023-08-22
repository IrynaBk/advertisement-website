import React from 'react';
import { render, screen } from '@testing-library/react';
import NoPage from './NoPage';

test('renders 404 message', () => {
  render(<NoPage />);
  const messageElement = screen.getByText('404');
  expect(messageElement).toBeInTheDocument();
});