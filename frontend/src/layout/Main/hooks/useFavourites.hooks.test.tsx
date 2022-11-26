import { act, renderHook } from '@testing-library/react';
import axios from 'axios';
import { mockFavouritesResponse } from '../../../_mocks_/favouriteResponse.mock';
import { getHooksWrapper } from '../../../_mocks_/store.mock';
import useFavourites from './useFavourites.hooks';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;
describe('useFavourites.hooks', () => {
  it('should load favourites', () => {
    const { result } = renderHook(() => useFavourites(), {
      wrapper: getHooksWrapper({
        favourites: {
          loading: false,
          data: ['hello'],
          error: null,
        },
      }),
    });
    expect(result.current[0]).toEqual(['hello']);
  });

  it('should not fire api call when loading favourites', async () => {
    const { result } = renderHook(() => useFavourites(), {
      wrapper: getHooksWrapper({
        favourites: {
          loading: true,
          data: [],
          error: null,
        },
      }),
    });
    const handleFavouriteBtnClick = result.current[1];
    // Note: await act(async) for fix 'not wrapped in act' warning
    await act(async () => {
      handleFavouriteBtnClick('hello');
    });
    expect(mockAxios.post).not.toBeCalled();
    expect(mockAxios.delete).not.toBeCalled();
  });

  it('should fire delete api call when word already been added to favourites', async () => {
    const { result } = renderHook(() => useFavourites(), {
      wrapper: getHooksWrapper({
        favourites: {
          loading: false,
          data: ['hello'],
          error: null,
        },
      }),
    });
    mockAxios.delete.mockResolvedValue(mockFavouritesResponse);
    const handleFavouriteBtnClick = result.current[1];
    // Note: await act(async) for fix 'not wrapped in act' warning
    await act(async () => {
      handleFavouriteBtnClick('hello');
    });
    expect(mockAxios.delete).toBeCalled();
  });

  it('should fire a post api call when word has not been added to favourite yet', async () => {
    const { result } = renderHook(() => useFavourites(), {
      wrapper: getHooksWrapper({
        favourites: {
          loading: false,
          data: ['hello'],
          error: null,
        },
      }),
    });
    mockAxios.post.mockResolvedValue(mockFavouritesResponse);
    const handleFavouriteBtnClick = result.current[1];
    // Note: await act(async) for fix 'not wrapped in act' warning
    await act(async () => {
      handleFavouriteBtnClick('word');
    });
    expect(mockAxios.post).toBeCalled();
  });
});
