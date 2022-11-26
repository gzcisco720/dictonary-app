import { configureStore } from '@reduxjs/toolkit';
import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { RootState } from '../store';
import favouritesReducer, {
  initialState as favouritesInitState,
} from '../store/favourites.slice';
import historyReducer, {
  initialState as historyInitState,
} from '../store/history.slice';
import wordsReducer, {
  initialState as wordsInitState,
} from '../store/words.slice';

export const getTestStore = (initState?: Partial<RootState>) => {
  return configureStore({
    reducer: {
      favourites: favouritesReducer,
      words: wordsReducer,
      history: historyReducer,
    },
    preloadedState: {
      favourites: favouritesInitState,
      words: wordsInitState,
      history: historyInitState,
      ...initState,
    },
  });
};

export const getHooksWrapper = (initState?: Partial<RootState>) => {
  const store = getTestStore(initState);
  return ({ children }: { children: ReactElement }) => (
    <Provider store={store}>{children}</Provider>
  );
};
