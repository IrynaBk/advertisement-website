import React from 'react';
import Footer from './Footer';
import { render, screen } from '@testing-library/react';


test('renders Footer component', () => {
  // Render the Footer component
  const { getByText, getByRole } = render(<Footer />);

  // Assert that the About section is rendered
  expect(getByText('About')).toBeInTheDocument();

  // Assert that the Categories section is rendered
  expect(getByText('Categories')).toBeInTheDocument();
  expect(getByText('Food')).toBeInTheDocument();
  expect(getByText('Home')).toBeInTheDocument();
  expect(getByText('Car')).toBeInTheDocument();
  expect(getByText('Cloths')).toBeInTheDocument();
  expect(getByText('Technology')).toBeInTheDocument();

  // Assert that the Quick Links section is rendered
  expect(getByText('Quick Links')).toBeInTheDocument();
  expect(getByText('Sign-Up')).toBeInTheDocument();
  expect(getByText('About Us')).toBeInTheDocument();
  expect(getByText('Contact Us')).toBeInTheDocument();
  expect(getByText('Contribute')).toBeInTheDocument();
  expect(getByText('Privacy Policy')).toBeInTheDocument();

  // Assert that the copyright text is rendered
  expect(getByText(/2023 All Rights Reserved/)).toBeInTheDocument();

  // Assert that the social icons are rendered
  const socials = screen.getAllByRole('link', { name: '' });
  expect(socials.length).toBeGreaterThan(0);

    socials.forEach((social) => {
      expect(social).toBeInTheDocument();
    });
});
