import axios from 'axios';
import { FAVOURITES_API_URL } from '../config/constants';
import { mockFavouritesResponse } from '../_mocks_/favouriteResponse.mock';
import { mock500Error } from '../_mocks_/sliceError.mock';
import { getTestStore } from '../_mocks_/store.mock';
import {
  fetchFavourites,
  createFavourites,
  deleteFavourites,
} from './thunks/favourites.thunk';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;
describe('favourite slice', () => {
  const mockStore = getTestStore();

  describe('fetch favourites', () => {
    it('should dispatch fetchFavourites.fulfilled and display data in reversed order', async () => {
      mockAxios.get.mockResolvedValue(mockFavouritesResponse);
      await mockStore.dispatch(fetchFavourites());
      expect(mockAxios.get).toBeCalledWith(`${FAVOURITES_API_URL}/favourites`);
      const state = mockStore.getState();
      expect(state.favourites).toEqual({
        data: ['world', 'hello'],
        error: null,
        loading: false,
      });
    });

    it('should dispatch fetchFavourites.reject when failed to fetch favourites', async () => {
      mockAxios.get.mockRejectedValue({ code: '500', message: 'test error' });
      await mockStore.dispatch(fetchFavourites());
      const state = mockStore.getState();
      expect(state.favourites).toEqual({
        data: [],
        error: mock500Error,
        loading: false,
      });
    });

    it('should dispatch fetchFavourites.reject with 500 error when error code is empty', async () => {
      mockAxios.get.mockRejectedValue({ code: '', message: 'test error' });
      await mockStore.dispatch(fetchFavourites());
      const state = mockStore.getState();
      expect(state.favourites).toEqual({
        data: [],
        error: mock500Error,
        loading: false,
      });
    });
  });

  describe('create favourite', () => {
    it('should post createFavourites.fulfilled successfully and display in reversed order', async () => {
      mockAxios.post.mockResolvedValue(mockFavouritesResponse);
      await mockStore.dispatch(createFavourites('hello'));
      expect(mockAxios.post).toBeCalledWith(
        `${FAVOURITES_API_URL}/favourites`,
        {
          word: 'hello',
        },
      );
      const state = mockStore.getState();
      expect(state.favourites).toEqual({
        data: ['world', 'hello'],
        error: null,
        loading: false,
      });
    });

    it('should dispatch createFavourites.reject when failed to create favourites', async () => {
      mockAxios.post.mockRejectedValue({ code: '500', message: 'test error' });
      await mockStore.dispatch(createFavourites('hello'));
      const state = mockStore.getState();
      expect(state.favourites).toEqual({
        data: [],
        error: mock500Error,
        loading: false,
      });
    });
  });

  describe('delete favourite', () => {
    it('should dispatch deleteFavourites.fulfilled favourites successfully and display in reversed order', async () => {
      mockAxios.delete.mockResolvedValue(mockFavouritesResponse);
      await mockStore.dispatch(deleteFavourites('hello'));
      expect(mockAxios.delete).toBeCalledWith(
        `${FAVOURITES_API_URL}/favourites/hello`,
      );
      const state = mockStore.getState();
      expect(state.favourites).toEqual({
        data: ['world', 'hello'],
        error: null,
        loading: false,
      });
    });

    it('should dispatch deleteFavourites.reject when failed to delete favourites', async () => {
      mockAxios.delete.mockRejectedValue({
        code: '500',
        message: 'test error',
      });
      await mockStore.dispatch(deleteFavourites('hello'));
      const state = mockStore.getState();
      expect(state.favourites).toEqual({
        data: [],
        error: mock500Error,
        loading: false,
      });
    });

    it('should dispatch deleteFavourites.reject with 500 error when error code is empty', async () => {
      mockAxios.delete.mockRejectedValue({
        code: '',
        message: 'test error',
      });
      await mockStore.dispatch(deleteFavourites('hello'));
      const state = mockStore.getState();
      expect(state.favourites).toEqual({
        data: [],
        error: mock500Error,
        loading: false,
      });
    });
  });
});
