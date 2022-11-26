import { configureStore } from '@reduxjs/toolkit';
import favouritesReducer from './favourites.slice';
import historyReducer from './history.slice';
import wordsReducer from './words.slice';

export const store = configureStore({
  reducer: {
    favourites: favouritesReducer,
    words: wordsReducer,
    history: historyReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
