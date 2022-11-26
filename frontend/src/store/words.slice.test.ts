import axios from 'axios';
import { DICTIONARY_EN_BASE_URL } from '../config/constants';
import { mock500Error } from '../_mocks_/sliceError.mock';
import { getTestStore } from '../_mocks_/store.mock';
import { wordAPIResponse } from '../_mocks_/wordAPIResponse.mock';
import { fetchWord } from './thunks/words.thunk';
import { resetSearchError } from './words.slice';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;
describe('word slice', () => {
  describe('fetchWord', () => {
    it('should dispatch fetchWord.fulfilled', async () => {
      const mockStore = getTestStore();
      mockAxios.get.mockResolvedValue(wordAPIResponse);
      await mockStore.dispatch(fetchWord('test'));
      expect(mockAxios.get).toBeCalledWith(`${DICTIONARY_EN_BASE_URL}/test`);
      const state = mockStore.getState();
      expect(state.words).toEqual({
        data: wordAPIResponse.data,
        error: null,
        loading: false,
      });
    });

    it('should dispatch fetchWord.reject when failed to fetch word', async () => {
      const mockStore = getTestStore();
      mockAxios.get.mockRejectedValue({ code: '500', message: 'test error' });
      await mockStore.dispatch(fetchWord('test'));
      const state = mockStore.getState();
      expect(state.words).toEqual({
        data: [],
        error: mock500Error,
        loading: false,
      });
    });

    it('should put the latest word on the top, if the word already exists', async () => {
      const mockStore = getTestStore({
        words: {
          loading: false,
          error: null,
          data: [
            {
              word: 'hello',
              phonetics: [],
              meanings: [],
            },
            {
              word: 'test',
              phonetics: [],
              meanings: [],
            },
          ],
        },
      });
      mockAxios.get.mockResolvedValue(wordAPIResponse);
      await mockStore.dispatch(fetchWord('test'));
      expect(mockAxios.get).toBeCalledWith(`${DICTIONARY_EN_BASE_URL}/test`);
      const state = mockStore.getState();
      expect(state.words).toEqual({
        data: [
          {
            word: 'test',
            phonetics: [],
            meanings: [],
          },
          {
            word: 'hello',
            phonetics: [],
            meanings: [],
          },
        ],
        error: null,
        loading: false,
      });
    });

    it('should put the latest word on the top, if the word already exists', () => {
      const mockStore = getTestStore({
        words: {
          loading: false,
          error: {
            code: '500',
            message: 'test',
          },
          data: [],
        },
      });
      mockStore.dispatch(resetSearchError());
      const state = mockStore.getState();
      expect(state.words).toEqual({
        data: [],
        error: null,
        loading: false,
      });
    });
  });
});
