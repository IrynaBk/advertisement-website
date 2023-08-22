import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useNavigate, MemoryRouter } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navigation';
import AxiosClient from '../AxiosClient';

jest.mock('../AxiosClient', () => ({
  delete: jest.fn(), 
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const localStorageMock = {
  getItem: jest.fn(),
  clear: jest.fn(),
  setItem: jest.fn(),
};

describe('Navbar', () => {
  beforeEach(() => {
    // Reset the mock implementations and clear mock data
    AxiosClient.delete.mockClear();
    useNavigate.mockClear();
    localStorageMock.getItem.mockClear();
    localStorageMock.clear.mockClear();
    localStorageMock.setItem.mockClear();
  });

  test('renders login link when there is no user in localStorage', () => {
    // Set up the mock data
    localStorageMock.getItem.mockReturnValue(null);

    // Render the component
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    // Assert that the login link is rendered
    const loginLink = screen.getByRole('link', { name: 'Login' });
    expect(loginLink).toBeInTheDocument();
  });

  test('renders user username with link to profile when there is user in localStorage', async () => {
    // Set up the mock data
    const user = { id: 123, username: 'testuser' };
    // localStorageMock.getItem.mockReturnValue(JSON.stringify(user));
    localStorage.setItem('user', JSON.stringify(user));

    // Render the component
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    // Assert that the user username with link to profile is rendered
    await waitFor(() => {
        const usernameLink = screen.getByText("testuser");
        const profileLink = screen.getByRole('link', { name: user.username });
  
        expect(usernameLink).toBeInTheDocument();
        expect(profileLink).toBeInTheDocument();
        // const usernameLink = screen.getByTestId('username-link');
        // expect(usernameLink).toBeInTheDocument();
        // expect(usernameLink).toHaveAttribute('id', 'username-label');
        // expect(usernameLink).toHaveClass('username-label');
        // expect(usernameLink).toHaveTextContent(/testuser/i);
        // expect(usernameLink.getAttribute('href')).toBe('/users/123');
      });
  });

  test('handles logout correctly', async() => {
    const user = { id: 123, username: 'testuser' };
    localStorageMock.setItem('user', JSON.stringify(user));

  // Mock the delete method to resolve an empty object
    AxiosClient.delete.mockResolvedValue({});

    const clearMock = jest.fn();
    jest.spyOn(window.localStorage.__proto__, 'clear').mockImplementation(clearMock);
  // Render the component
    render(
        <BrowserRouter>
        <Navbar />
        </BrowserRouter>
    );

  // Simulate clicking the logout button
    const logoutButton = screen.getByRole('button', { name: 'Logout' });
    fireEvent.click(logoutButton);

    await waitFor(() => {
        expect(clearMock).toHaveBeenCalled();
        expect(AxiosClient.delete).toHaveBeenCalledWith('/logout');
    });
  });

  test('handles search correctly', () => {

    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
  
    const searchInput = screen.getByPlaceholderText('Search');
  
    fireEvent.change(searchInput, { target: { value: 'example search' } });
  
    const searchButton = screen.getByRole('button', { name: 'Search' });
  
    fireEvent.click(searchButton);
  
    expect(screen.getByLabelText('Search')).toHaveValue('example search');
    expect(navigate).toHaveBeenCalledWith('/advertisements?search=example search');
  });
  
});
