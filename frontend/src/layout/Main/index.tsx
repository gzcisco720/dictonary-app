import { useAppSelector } from '../../store/hooks';
import WordCard from '../../components/WordCard';
import useFavourites from './hooks/useFavourites.hooks';
import useWordSearch from './hooks/useWordSearch.hooks';
import './Main.scss';
import { Blocks } from 'react-loader-spinner';

const Main = () => {
  const {
    loading,
    data: words,
    error: searchError,
  } = useAppSelector((state) => state.words);
  const [searchValue, handleSearchValueChange] = useWordSearch();
  const [favourites, handleFavouriteBtnClick] = useFavourites();
  return (
    <section className="Main">
      <div className="Main_searchInputWrapper">
        <input
          className="Main_searchInput"
          type="search"
          placeholder="Search"
          value={searchValue}
          onChange={handleSearchValueChange}
        />
        <div className="Main_searchInputStatus">
          {searchError && (
            <small className="Main_searchInputError">Unknown word</small>
          )}
          <Blocks
            visible={loading}
            height="25"
            width="25"
          />
        </div>
      </div>
      {words.map((word) => (
        <WordCard
          key={word.word}
          word={word}
          favouriteBtn={
            <button
              className={`Main_favouriteBtn ${
                favourites.indexOf(word.word) >= 0
                  ? 'Main_favouriteBtn--checked'
                  : ''
              }`}
              onClick={() => handleFavouriteBtnClick(word.word)}
            />
          }
        />
      ))}
    </section>
  );
};
export default Main;
