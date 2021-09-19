import { useState, useEffect } from "react";
import { CompleteWordsByImagesAndLettersActivityStage } from "../Interfaces";

/**
* 
* @author andr3z0
**/
export function useCompleteWordsLogic(
  currentStageIndex: number,
  currentStage: CompleteWordsByImagesAndLettersActivityStage
) {
  const [completeWords, setCompleteWords] = useState<Array<string>>([]);
  useEffect(() => {
    setCompleteWords(
      currentStage.wordsToComplete.map((item) => item.wordToComplete)
    );
  }, [currentStageIndex]);

  return { completeWords, setCompleteWords };
}
