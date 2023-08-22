import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AxiosClient from '../AxiosClient';
import AdvertisementsList from './AdvertisementsList';
import { act } from 'react-dom/test-utils';


jest.mock('../AxiosClient', () => ({
    get: jest.fn(), 
  }));
describe('AdvertisementsList', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders advertisements', async () => {
    const mockAdvertisements = [
      { id: 1, title: 'Ad 1', description: "lala", location: "Lviv", category: "Clothes", user_id: 1 },
      { id: 2, title: 'Ad 2', description: "lalafafa", location: "Lviv", category: "Clothes", user_id: 1 },
    ];

    AxiosClient.get.mockResolvedValueOnce({
      data: mockAdvertisements,
      headers: { 'total-pages': '1' },
    });

    render(
        <BrowserRouter>
          <AdvertisementsList />
        </BrowserRouter>
      );
      
    await waitFor(() => {
      const ad1Element = screen.getByText('Ad 1');
      const ad2Element = screen.getByText('Ad 2');
      expect(ad1Element).toBeInTheDocument();
      expect(ad2Element).toBeInTheDocument();
    });

    const paginationElement = screen.getByRole('navigation');
    expect(paginationElement).toBeInTheDocument();
  });

  test('renders no results while fetching data', async () => {
    AxiosClient.get.mockImplementationOnce(() => new Promise(() => {}));

    render(
        <BrowserRouter>
          <AdvertisementsList />
        </BrowserRouter>
      );

    const noResElement = screen.getByText('No results :(');
    expect(noResElement).toBeInTheDocument();
  });

  test('handles location change', async () => {
    const mockAdvertisements = [{ id: 1, title: 'Ad 1', description: "lala", location: "Lviv", category: "Clothes", user_id: 1 },];

    AxiosClient.get.mockResolvedValueOnce({
      data: mockAdvertisements,
      headers: { 'total-pages': '1' },
    });

    render(
        <BrowserRouter>
          <AdvertisementsList />
        </BrowserRouter>
      );

      const locationSelect = screen.getByTestId('location-select');
      await act(async () => {
        fireEvent.change(locationSelect, { target: { value: 'Lviv' } });
      });

    await waitFor(() => {
      expect(AxiosClient.get).toHaveBeenCalledWith('/advertisements', {
        params: {
          location: 'Lviv',
          category: 'all',
          page: 1,
          search: null,
          user_id: null,
        },
      });
    });
  });

  test('handles category change', async () => {
    const mockAdvertisements = [{ id: 1, title: 'Ad 1', description: "lala", location: "Lviv", category: "Clothes", user_id: 1 },];

    AxiosClient.get.mockResolvedValueOnce({
      data: mockAdvertisements,
      headers: { 'total-pages': '1' },
    });

    render(
        <BrowserRouter>
          <AdvertisementsList />
        </BrowserRouter>
      );

      const categorySelect = screen.getByTestId('category-select');
      await act(async () => {
        fireEvent.change(categorySelect, { target: { value: 'Clothes' } });
      });

    await waitFor(() => {
      expect(AxiosClient.get).toHaveBeenCalledWith('/advertisements', {
        params: {
          location: 'all',
          category: 'Clothes',
          page: 1,
          search: null,
          user_id: null,
        },
      });
    });
  });


});
