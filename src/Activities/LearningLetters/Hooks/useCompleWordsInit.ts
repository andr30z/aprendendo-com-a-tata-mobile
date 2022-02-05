import { useEffect } from "react";
import { useActivityPlayContext } from "../../../Contexts";
import { CompleteWordsByImagesAndLettersActivityStage } from "../../Interfaces";

export function useCompleteWordsInit(
  completeWords: string[],
  setCompleteWords: React.Dispatch<React.SetStateAction<string[]>>,
  currentStage: CompleteWordsByImagesAndLettersActivityStage
) {
  const { currentStageIndex } = useActivityPlayContext();
  useEffect(() => {
    console.log("aokldjakljdklajskdljklasd", completeWords.length);
    if (completeWords.length > 0) return console.log("ADSASDASD");
    setCompleteWords(
      currentStage.wordsToComplete.map((item) => item.wordToComplete)
    );
  }, [currentStageIndex]);
}
