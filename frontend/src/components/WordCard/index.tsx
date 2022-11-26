import { IPhonetic, IWord } from '../../interfaces/IWord.interface';
import './WordCard.scss';

const Phonetics = (props: { phonetics: IPhonetic[] }) => {
  const { phonetics } = props;
  if (phonetics.length == 0) return null;
  if (phonetics.length > 1) {
    return (
      <p className="WordCard_phonetics">
        <span>{phonetics[0].text}</span>
        <span>&nbsp; or &nbsp;</span>
        <span>{phonetics[1].text}</span>
      </p>
    );
  } else {
    return <p className="WordCard_phonetics">{phonetics[0].text}</p>;
  }
};

const WordCard = (props: { word: IWord; favouriteBtn: React.ReactElement }) => {
  const { word, favouriteBtn } = props;
  return (
    <div className="WordCard">
      <div className="WordCard_wordSection">
        <div className="WordCard_word">
          <p className="WordCard_text">{word.word}</p>
          <Phonetics phonetics={word.phonetics} />
        </div>
        {favouriteBtn}
      </div>
      {word.meanings.map((meaning, index) => {
        return (
          <div
            className="WordCard_meaning"
            key={`${meaning.partOfSpeech}-${index}`}
          >
            <p className="WordCard_partOfSpeech">{meaning.partOfSpeech}</p>
            <ol className="WordCard_definitions">
              {meaning.definitions.map((def) => {
                return <li key={def.definition}>{def.definition}</li>;
              })}
            </ol>
          </div>
        );
      })}
    </div>
  );
};

export default WordCard;
