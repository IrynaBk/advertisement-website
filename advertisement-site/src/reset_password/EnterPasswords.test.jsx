import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, useParams, ReactRouterDOM } from 'react-router-dom';
import AxiosClient from '../AxiosClient';
import EnterPasswords from './EnterPasswords';
import {Router, BrowserRouter} from "react-router-dom";

jest.mock('../AxiosClient', () => ({
    put: jest.fn(), 
  }));

  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
  }));


describe('EnterPasswords', () => {
  test('submits password form successfully', async () => {
    useParams.mockReturnValue({ token: 'validToken' });
    const mockResponse = { status: 200, data: {message: 'Password successfully updated"'} };    
    AxiosClient.put.mockResolvedValueOnce(mockResponse);

    render(
        <BrowserRouter>
          <EnterPasswords />
        </BrowserRouter>
      );
    const passwordInput = screen.getByLabelText('Password');
    const passwordConfirmationInput = screen.getByLabelText('Password Confirmation');
    const submitButton = screen.getByRole('button', { name: 'Submit' });

    fireEvent.change(passwordInput, { target: { value: 'newpassword' } });
    fireEvent.change(passwordConfirmationInput, { target: { value: 'newpassword' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
        expect(AxiosClient.put).toHaveBeenCalledWith(
            '/reset_password/validToken',
            JSON.stringify({
              password: 'newpassword',
              password_confirmation: 'newpassword',
            }),
            expect.objectContaining({
              headers: {
                'Content-Type': 'application/json',
              },
            })
          );
      expect(screen.getByText('Successfully changed!')).toBeInTheDocument();
    });
  });


});
