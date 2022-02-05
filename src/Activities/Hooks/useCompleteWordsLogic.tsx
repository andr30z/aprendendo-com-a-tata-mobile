import { useState, useEffect } from "react";
import { CompleteWordsByImagesAndLettersActivityStage } from "../Interfaces";

/**
 *
 * @author andr30z
 **/
export function useCompleteWordsLogic(
  currentStageIndex: number,
  currentStage: CompleteWordsByImagesAndLettersActivityStage
) {
  const [completeWords, setCompleteWords] = useState<Array<string>>([]);
  console.log(completeWords)
  useEffect(() => {
    console.log("aokldjakljdklajskdljklasd", completeWords.length)
    if (
      completeWords.length > 0 
    )
      return console.log("ADSASDASD");
    setCompleteWords(
      currentStage.wordsToComplete.map((item) => item.wordToComplete)
    );
  }, [currentStageIndex]);

  return { completeWords, setCompleteWords };
}
