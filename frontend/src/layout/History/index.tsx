import { useAppSelector } from '../../store/hooks';
import WordLinkList from '../../components/WordLinkList';
import './History.scss';

const History = () => {
  const historys = useAppSelector((state) => state.history.data);
  return (
    <section className="History">
      <h2 className="History_title">Search History</h2>
      <WordLinkList links={historys} />
    </section>
  );
};

export default History;
