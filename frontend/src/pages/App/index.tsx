import { useEffect } from 'react';
import Favourites from '../../layout/Favourites';
import History from '../../layout/History';
import Main from '../../layout/Main';
import { useAppDispatch } from '../../store/hooks';
import { fetchFavourites } from '../../store/thunks/favourites.thunk';
import './App.scss';

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFavourites());
  }, []);
  return (
    <div className="App">
      <Favourites />
      <Main />
      <History />
    </div>
  );
};

export default App;
