import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import EditUser from './EditUser';
import AxiosClient from '../AxiosClient';
import { act } from 'react-dom/test-utils';



jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
    useNavigate: jest.fn(),
  }));

jest.mock('../AxiosClient', () => ({
    put: jest.fn(),
    get: jest.fn(),
  }));

describe('EditUser', () => {
  beforeEach(() => {
    jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue('dummy_token');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders edit profile form and updates user profile', async () => {
    useParams.mockReturnValue({ id: '1' });

    const mockUser = {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        username: 'johndoe',
        image_url: 'profile-image.jpg',
        email: 'john@example.com'
      };

    AxiosClient.get.mockResolvedValueOnce({ data: { user: JSON.stringify(mockUser), is_curr_user: true } });

    AxiosClient.put.mockResolvedValueOnce({ status: 200, data: mockUser});

    render(
      <BrowserRouter>
        <EditUser />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByLabelText('Edit First Name:')).toBeInTheDocument();
      expect(screen.getByLabelText('Edit Last Name:')).toBeInTheDocument();
      expect(screen.getByLabelText('Edit Email:')).toBeInTheDocument();
    });

    act(() => {
        fireEvent.change(screen.getByLabelText('Edit First Name:'), { target: { value: 'Jane' } });
        fireEvent.change(screen.getByLabelText('Edit Last Name:'), { target: { value: 'Smith' } });
        fireEvent.change(screen.getByLabelText('Edit Email:'), { target: { value: 'jane.smith@example.com' } });
      });
    
    act(() => {
        fireEvent.submit(screen.getByRole('button', { name: 'Edit Profile' }));
      });

    await waitFor(() => {
      expect(AxiosClient.put).toHaveBeenCalledWith('/users/1', {
        first_name: 'Jane',
        last_name: 'Smith',
        email: 'jane.smith@example.com'
      });
    });

    expect(window.location.pathname).toBe('/');
  });
});
