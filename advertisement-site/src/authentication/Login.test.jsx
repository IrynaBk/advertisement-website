import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';
import AxiosClient from '../AxiosClient';
import { act } from 'react-dom/test-utils';


jest.mock('../AxiosClient', () => ({
  post: jest.fn(),
}));

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));


const localStorageMock = {
    getItem: jest.fn(),
    clear: jest.fn(),
    setItem: jest.fn(),
  };

describe('Login component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('handles form submission successfully', async () => {

    const mockResponse = { data: { token: 'testToken', user: 'testUser' } };
    AxiosClient.post.mockResolvedValue(mockResponse);

    const mockPost = jest.fn().mockResolvedValueOnce({ status: 200, data: { token: 'testToken', user: 'TestUser' } });
    AxiosClient.post.mockImplementation(mockPost);
    const setItemMock = jest.fn();
    jest.spyOn(window.localStorage.__proto__, 'setItem').mockImplementation(setItemMock);

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
  
    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
  
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
  
    const loginButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.click(loginButton);
  
    expect(JSON.stringify(AxiosClient.post.mock.calls[0])).toBe(
        JSON.stringify(['/login', '{"username":"testuser","password":"testpassword"}'])
      );
    await waitFor(() => {
        expect(setItemMock).toHaveBeenCalledWith('token', 'testToken');
        expect(window.location.pathname).toBe('/');
    });

  });

  test('handles form submission with blank data', async () => {

    AxiosClient.post.mockRejectedValueOnce({
        response: {
          status: 401,
          data: {
            error: 
             'Authentication is not successful'
          }
        }
      });
    const setItemMock = jest.fn();
    jest.spyOn(window.localStorage.__proto__, 'setItem').mockImplementation(setItemMock);
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
  
    fireEvent.change(usernameInput, { target: { value: 'blank' } });
    fireEvent.change(passwordInput, { target: { value: 'blank' } });
  
    const loginButton = screen.getByRole('button', { name: 'Login' });
  
    fireEvent.click(loginButton);

    expect(JSON.parse(AxiosClient.post.mock.calls[0][1])).toEqual({
        username: 'blank',
        password: 'blank'
      });
  
    expect(setItemMock).not.toHaveBeenCalled();
  
    expect(mockNavigate).not.toHaveBeenCalled();
    const errorMessage = 'Request failed with status code 401';

    await act(async () => {
        fireEvent.click(loginButton);
        await waitFor(() => {
        });
      });

  });
  
});
