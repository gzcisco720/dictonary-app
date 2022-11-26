import { createSlice } from '@reduxjs/toolkit';
import { IAPIError } from '../interfaces/IAPIError.interface';
import { IWord } from '../interfaces/IWord.interface';
import { fetchWord } from './thunks/words.thunk';

interface IWordsState {
  loading: boolean;
  data: IWord[];
  error: IAPIError | null;
}

export const initialState: IWordsState = {
  loading: false,
  data: [],
  error: null,
};

const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    resetSearchError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWord.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWord.fulfilled, (state, action) => {
        state.loading = false;
        const currentWords = state.data;
        const firstMatchPayload = action.payload[0];
        const foundSameIndex = currentWords.findIndex(
          (word) => word.word === firstMatchPayload.word,
        );
        if (foundSameIndex >= 0) {
          state.data.splice(foundSameIndex, 1);
        }
        state.data = [action.payload[0], ...state.data];
        state.error = null;
      })
      .addCase(fetchWord.rejected, (state, action) => {
        state.loading = false;
        const payload = action.payload as IAPIError;
        state.error = payload;
      });
  },
});

export const { resetSearchError } = wordsSlice.actions;
export default wordsSlice.reducer;
