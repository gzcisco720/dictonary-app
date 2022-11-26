import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { FAVOURITES_API_URL } from '../../config/constants';
import { IAPIError } from '../../interfaces/IAPIError.interface';

export const fetchFavourites = createAsyncThunk<
  string[],
  void,
  { rejectValue: IAPIError }
>('favourites/fetch', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get<string[]>(`${FAVOURITES_API_URL}/favourites`);
    const { data } = res;
    return data;
  } catch (error) {
    const err = error as AxiosError;
    return rejectWithValue({
      code: err.code || '500',
      message: err.message,
    });
  }
});

export const createFavourites = createAsyncThunk<
  string[],
  string,
  { rejectValue: IAPIError }
>('favourites/create', async (word: string, { rejectWithValue }) => {
  try {
    const res = await axios.post<string[]>(`${FAVOURITES_API_URL}/favourites`, {
      word,
    });
    const { data } = res;
    return data;
  } catch (error) {
    const err = error as AxiosError;
    return rejectWithValue({
      code: err.code || '500',
      message: err.message,
    });
  }
});

export const deleteFavourites = createAsyncThunk<
  string[],
  string,
  { rejectValue: IAPIError }
>('favourites/delete', async (word: string, { rejectWithValue }) => {
  try {
    const res = await axios.delete<string[]>(
      `${FAVOURITES_API_URL}/favourites/${word}`,
    );
    const { data } = res;
    return data;
  } catch (error) {
    const err = error as AxiosError;
    return rejectWithValue({
      code: err.code || '500',
      message: err.message,
    });
  }
});
