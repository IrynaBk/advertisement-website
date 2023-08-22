import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import AxiosClient from '../AxiosClient';
import UserPage from './UserPage';

jest.mock('../AxiosClient', () => ({
    get: jest.fn(),
  }));


jest.mock('react-router-dom', () => ({
...jest.requireActual('react-router-dom'),
useNavigate: jest.fn(),
}));

describe('UserPage', () => {
  beforeEach(() => {
    useNavigate.mockClear();
    jest.clearAllMocks();
  });

  test('renders loading spinner while fetching user data', () => {
    AxiosClient.get.mockImplementationOnce(() => new Promise(() => {}));

    render(
        <BrowserRouter>
          <UserPage />
        </BrowserRouter>
      );

    expect(screen.getByTestId('loading-animation')).toBeInTheDocument();
  });

  test('renders user profile after successful data fetch', async () => {
    const mockUser = {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      username: 'johndoe',
      image_url: 'profile-image.jpg',
      email: 'john@example.com'
    };
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    AxiosClient.get.mockResolvedValueOnce({ data: { user: JSON.stringify(mockUser), is_curr_user: true } });

    render(
        <BrowserRouter>
          <UserPage />
        </BrowserRouter>
      );

      await waitFor(async () => {
        expect(await screen.findByText(`${mockUser.first_name} ${mockUser.last_name}`)).toBeInTheDocument();
        expect(screen.getByAltText('Profile picture')).toHaveAttribute('src', mockUser.image_url);
        expect(screen.getByText('Edit')).toBeInTheDocument();
        expect(screen.getByText('Delete')).toBeInTheDocument();
        const advertisementsButton = screen.getByText('Advertisements');
        fireEvent.click(advertisementsButton);
        expect(window.location.href).toContain('/advertisements?user_id=1');
    });
  });


});