import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AxiosClient from '../AxiosClient';
import EnterEmail from './EnterEmail';
import { BrowserRouter } from 'react-router-dom';


jest.mock('../AxiosClient', () => ({
    post: jest.fn(), 
  }));


  describe('EnterEmail', () => {
    test('renders enter email form', () => {
      render(<EnterEmail />);
      const emailLabel = screen.getByLabelText('Email');
      const submitButton = screen.getByRole('button', { name: 'Submit' });
  
      expect(emailLabel).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
    });
  
    test('submits email form successfully', async () => {
        const mockResponse = { status: 200, data: {message: 'Password reset email sent'} };
        AxiosClient.post.mockResolvedValueOnce(mockResponse);
    
        render(
            <BrowserRouter>
              <EnterEmail />
            </BrowserRouter>
          );
        const emailInput = screen.getByLabelText('Email');
        const submitButton = screen.getByRole('button', { name: 'Submit' });
    
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.click(submitButton);
    
        await waitFor(() => {
          expect(AxiosClient.post).toHaveBeenCalledWith('/reset_password', {
            email: 'test@example.com'
          });
          expect(screen.getByText('Email sent! Check your gmail, please')).toBeInTheDocument();
        });
      });


    test('handles submission error', async () => {
        const mockError = new Error();
        mockError.response = {
            data: { code: 'ERR_BAD_REQUEST', error: 'User not foundgkg' },
            status: 404,
            statusText: 'Not Found'
    
          };
        AxiosClient.post.mockRejectedValueOnce(mockError);
    
        render(<EnterEmail />);
        const emailInput = screen.getByLabelText('Email');
        const submitButton = screen.getByRole('button', { name: 'Submit' });
    
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.click(submitButton);
    
        await waitFor(() => {
          expect(AxiosClient.post).toHaveBeenCalledWith('/reset_password', {
            email: 'test@example.com'
          });
          expect(screen.getByText('User not foundgkg')).toBeInTheDocument();
        });
      });
  });