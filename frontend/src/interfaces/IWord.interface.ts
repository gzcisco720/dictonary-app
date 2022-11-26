export interface IWord {
  word: string;
  phonetic?: string;
  phonetics: IPhonetic[];
  meanings: IMeaning[];
}

export interface IMeaning {
  partOfSpeech: string;
  definitions: IDefinition[];
  synonyms: string[];
  antonyms: string[];
}

export interface IDefinition {
  definition: string;
  synonyms: string[];
  antonyms: string[];
  example?: string;
}

export interface IPhonetic {
  audio: string;
  text?: string;
}
