import { useAppDispatch } from '../../store/hooks';
import { fetchWord } from '../../store/thunks/words.thunk';
import './WordLinkList.scss';

const WordLinkList = ({ links }: { links: string[] }) => {
  const dispatch = useAppDispatch();
  return (
    <ul className="WordLinkList">
      {links.map((link) => (
        <li
          className="WordLinkList_listItem"
          key={link}
          onClick={() => dispatch(fetchWord(link))}
        >
          <span>{link}</span>
        </li>
      ))}
    </ul>
  );
};

export default WordLinkList;
