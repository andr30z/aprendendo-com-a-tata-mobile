import React from "react";
import {
  // ComparationBetweenObjects,
  // ShapesAndColors,
  // NumberSequence,
  // ImagesByLetters,
  // CompleteWordsByImagesAndLetters,
  // DragLettersToCompleteWords,
  // LearningCharacteristicsOfThings,
  NumberOperations,
} from "../../Activities";
import { numberOperations } from "./ActivityProps";

const ActivityDetails = () => {
  // return <ComparationBetweenObjects activity={activityComparation} />;
  return <NumberOperations activity={numberOperations} />;
};

export default ActivityDetails;
