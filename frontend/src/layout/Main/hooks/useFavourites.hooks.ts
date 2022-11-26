import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  createFavourites,
  deleteFavourites,
} from '../../../store/thunks/favourites.thunk';

type useFavouritesTuple = [string[], (word: string) => void];

const useFavourites = (): useFavouritesTuple => {
  const dispatch = useAppDispatch();
  const { loading, data: favourites } = useAppSelector(
    (state) => state.favourites,
  );
  const handleFavouriteBtnClick = (word: string) => {
    if (loading) return;
    const isChecked = favourites.indexOf(word) >= 0;
    if (isChecked) {
      dispatch(deleteFavourites(word));
    } else {
      dispatch(createFavourites(word));
    }
  };
  return [favourites, handleFavouriteBtnClick];
};

export default useFavourites;
