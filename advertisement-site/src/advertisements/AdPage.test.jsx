import { render, screen, act, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AxiosClient from '../AxiosClient';
import AdPage from './AdPage';

jest.mock('../AxiosClient', () => ({
    get: jest.fn(), 
    delete: jest.fn(),
  }));

describe('AdPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the ad details', async () => {
    AxiosClient.get.mockResolvedValueOnce({
        data: { 
          advertisement: JSON.stringify ({
            id: 1,
            title: 'Sample Ad',
            description: 'This is a sample ad',
            location: 'Sample Location',
            category: 'Sample Category',
            user: {
              first_name: 'John',
              last_name: 'Doe',
            },
          }),
          is_curr_user: false,
        },
      });

    render(
      <BrowserRouter>
        <AdPage />
      </BrowserRouter>
    );
    await waitFor(async () => {

        expect(await screen.findByText('Sample Ad')).toBeInTheDocument();
        expect(screen.getByText('This is a sample ad')).toBeInTheDocument();
        expect(screen.getByText('Sample Location')).toBeInTheDocument();
        expect(screen.getByText('Sample Category')).toBeInTheDocument();
        expect(screen.getByText('John Doe')).toBeInTheDocument();

        expect(screen.queryByTestId('delete-button')).not.toBeInTheDocument();
    });
  });
});
