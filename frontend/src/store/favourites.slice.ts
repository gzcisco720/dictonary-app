import {
  ActionReducerMapBuilder,
  AsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { IAPIError } from '../interfaces/IAPIError.interface';
import {
  createFavourites,
  deleteFavourites,
  fetchFavourites,
} from './thunks/favourites.thunk';

interface IFavouritesState {
  loading: boolean;
  data: string[];
  error: IAPIError | null;
}

export const initialState: IFavouritesState = {
  loading: false,
  data: [],
  error: null,
};

type FavouriteThunkType =
  | AsyncThunk<string[], void, { rejectValue: IAPIError }>
  | AsyncThunk<string[], string, { rejectValue: IAPIError }>;

const handleFavouritesStateChange = (
  builder: ActionReducerMapBuilder<IFavouritesState>,
  thunk: FavouriteThunkType,
) => {
  builder
    .addCase(thunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(thunk.fulfilled, (state, action) => {
      state.loading = false;
      state.data = [...action.payload].reverse();
      state.error = null;
    })
    .addCase(thunk.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      const payload = action.payload as IAPIError;
      state.error = payload;
    });
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleFavouritesStateChange(builder, fetchFavourites);
    handleFavouritesStateChange(builder, createFavourites);
    handleFavouritesStateChange(builder, deleteFavourites);
  },
});

export default favouritesSlice.reducer;
