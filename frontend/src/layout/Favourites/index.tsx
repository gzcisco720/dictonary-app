import { useAppSelector } from '../../store/hooks';
import WordLinkList from '../../components/WordLinkList';
import './Favourites.scss';
import { Blocks } from 'react-loader-spinner';

const Favourites = () => {
  const favouritesState = useAppSelector((state) => state.favourites);
  const { loading, data } = favouritesState;
  return (
    <section className="Favourites">
      <div className="Favourites_titleWrapper">
        <h2 className="Favourites_title">Favourites</h2>
        <Blocks
          visible={loading}
          height="25"
          width="25"
        />
      </div>
      <WordLinkList links={data} />
    </section>
  );
};
export default Favourites;
