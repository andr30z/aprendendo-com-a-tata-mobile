import React from "react";
import {
  // ComparationBetweenObjects,
  // ShapesAndColors,
  // NumberSequence,
  // ImagesByLetters,
  // CompleteWordsByImagesAndLetters,
  DragLettersToCompleteWords
} from "../../Activities";
import { learningLettersDragCompleteWords } from "./ActivityProps";

const ActivityDetails = () => {
  // return <ComparationBetweenObjects activity={activityComparation} />;
  return <DragLettersToCompleteWords activity={learningLettersDragCompleteWords} />;
};

export default ActivityDetails;
