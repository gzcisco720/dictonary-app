import { ChangeEvent, useEffect, useState } from 'react';
import { useDebounce } from 'usehooks-ts';
import { useAppDispatch } from '../../../store/hooks';
import { fetchWord } from '../../../store/thunks/words.thunk';
import { resetSearchError } from '../../../store/words.slice';

type useWordSearchTuple = [
  string,
  (event: ChangeEvent<HTMLInputElement>) => void,
];

const useWordSearch = (): useWordSearchTuple => {
  const [searchValue, setSearchValue] = useState<string>('');
  const dispatch = useAppDispatch();
  const debounceSearchValue = useDebounce<string>(searchValue, 1000);
  const handleSearchValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(resetSearchError());
    setSearchValue(event.target.value);
  };
  useEffect(() => {
    if (debounceSearchValue) {
      dispatch(fetchWord(debounceSearchValue));
    }
  }, [debounceSearchValue]);
  return [searchValue, handleSearchValueChange];
};

export default useWordSearch;
