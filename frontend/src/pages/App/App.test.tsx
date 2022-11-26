import { render, act } from '@testing-library/react';
import axios from 'axios';
import { Provider } from 'react-redux';
import App from '.';
import { FAVOURITES_API_URL } from '../../config/constants';
import { mockFavouritesResponse } from '../../_mocks_/favouriteResponse.mock';
import { getTestStore } from '../../_mocks_/store.mock';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;
describe('App', () => {
  it('should trigger get favourites when app mount', async () => {
    const mockStore = getTestStore();
    mockAxios.get.mockResolvedValue(mockFavouritesResponse);
    // Note: await act(async) for fix 'not wrapped in act' warning
    await act(async () => {
      render(
        <Provider store={mockStore}>
          <App />
        </Provider>,
      );
    });
    expect(mockAxios.get).toBeCalledWith(`${FAVOURITES_API_URL}/favourites`);
  });
});
