import React from "react";
import {
  // ComparationBetweenObjects,
  // ShapesAndColors,
  // NumberSequence,
  // ImagesByLetters,
  // CompleteWordsByImagesAndLetters,
  // DragLettersToCompleteWords,
  LearningCharacteristicsOfThings,
} from "../../Activities";
import { learningCharacteristicsOfThingsProps } from "./ActivityProps";

const ActivityDetails = () => {
  // return <ComparationBetweenObjects activity={activityComparation} />;
  return (
    <LearningCharacteristicsOfThings
      activity={learningCharacteristicsOfThingsProps}
    />
  );
};

export default ActivityDetails;
