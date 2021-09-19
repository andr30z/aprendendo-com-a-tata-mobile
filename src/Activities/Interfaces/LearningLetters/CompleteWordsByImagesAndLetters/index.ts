import { ActivityCommonProps } from "../../../../Interfaces/ActivityUtilsInterfaces";

export interface WordsToCompleteItem {
  image: any;
  optionLetters: Array<string>;
  wordToComplete: string;
  keyLetter?: string;
  finishedWord?: string;
  _id: string;
}

interface WordsToComplete extends Array<WordsToCompleteItem> {}

export interface CompleteWordsByImagesAndLettersActivityStage {
  wordsToComplete: WordsToComplete;
  _id: string;
}
export interface CompleteWordsByImagesAndLettersActivityStageInterface
  extends ActivityCommonProps<CompleteWordsByImagesAndLettersActivityStage> {}
