import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';
import Signup from './Signup';
import Form from './Form';
import AxiosClient from '../AxiosClient';

jest.mock('../AxiosClient', () => ({
    post: jest.fn(),
  }));

describe('Signup component', () => {
  
  test('navigates to advertisements after successful signup', async () => {
    const navigateMock = jest.fn();

    render(
      <BrowserRouter>
        <Form navigation={navigateMock} />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('First name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText('Last name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Password Confirmation'), { target: { value: 'password123' } });


    fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));

   
  });

});