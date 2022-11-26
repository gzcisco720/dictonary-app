import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SEARCH_HISTORY_STORAGE_KEY } from '../config/constants';

export const getHistoryFromStorage = (): string[] => {
  const existingHistory = localStorage.getItem(SEARCH_HISTORY_STORAGE_KEY);
  if (!existingHistory || !Array.isArray(JSON.parse(existingHistory))) {
    localStorage.setItem(SEARCH_HISTORY_STORAGE_KEY, JSON.stringify([]));
    return [];
  } else {
    return JSON.parse(existingHistory);
  }
};

export const initialState = {
  data: getHistoryFromStorage(),
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    appendHistory: (state, action: PayloadAction<string>) => {
      const currentHistory = state.data;
      if (currentHistory.indexOf(action.payload) >= 0) {
        state.data = currentHistory.filter(
          (history) => history !== action.payload,
        );
      }
      state.data.unshift(action.payload);
      localStorage.setItem(
        SEARCH_HISTORY_STORAGE_KEY,
        JSON.stringify(state.data),
      );
    },
  },
});

export const { appendHistory } = historySlice.actions;
export default historySlice.reducer;
