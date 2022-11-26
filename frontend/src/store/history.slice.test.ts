import { SEARCH_HISTORY_STORAGE_KEY } from '../config/constants';
import { getTestStore } from '../_mocks_/store.mock';
import { appendHistory, getHistoryFromStorage } from './history.slice';

describe('history slice', () => {
  describe('appendHistory', () => {
    it('should append item to history array', () => {
      const mockStore = getTestStore();
      mockStore.dispatch(appendHistory('test'));
      const state = mockStore.getState();
      expect(state.history.data).toEqual(['test']);
    });

    it('should append item to existing history state', () => {
      const mockStore = getTestStore({
        history: {
          data: ['hello', 'test'],
        },
      });
      mockStore.dispatch(appendHistory('test'));
      const state = mockStore.getState();
      expect(state.history.data).toEqual(['test', 'hello']);
    });

    it('should append item to existing history state', () => {
      global.localStorage.setItem(
        SEARCH_HISTORY_STORAGE_KEY,
        JSON.stringify(['hello']),
      );
      const initialState = getHistoryFromStorage();
      expect(initialState).toEqual(['hello']);
    });
  });
});
