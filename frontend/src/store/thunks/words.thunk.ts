import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { DICTIONARY_EN_BASE_URL } from '../../config/constants';
import { IAPIError } from '../../interfaces/IAPIError.interface';
import { IWord } from '../../interfaces/IWord.interface';
import { appendHistory } from '../history.slice';

export const fetchWord = createAsyncThunk<
  IWord[],
  string,
  { rejectValue: IAPIError }
>('words/fetch', async (word: string, { rejectWithValue, dispatch }) => {
  try {
    const res = await axios.get<IWord[]>(`${DICTIONARY_EN_BASE_URL}/${word}`);
    const { data } = res;
    dispatch(appendHistory(data[0].word));
    return data;
  } catch (error) {
    const err = error as AxiosError;
    return rejectWithValue({
      code: err.code || '500',
      message: err.message,
    });
  }
});
