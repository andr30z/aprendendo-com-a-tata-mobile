import React from "react";
import {
  // ComparationBetweenObjects,
  // ShapesAndColors,
  // NumberSequence,
  // ImagesByLetters,
  CompleteWordsByImagesAndLetters,
  
} from "../../Activities";
import { learningLettersCompleteWords } from "./ActivityProps";

const ActivityDetails = () => {
  // return <ComparationBetweenObjects activity={activityComparation} />;
  return (
    <CompleteWordsByImagesAndLetters activity={learningLettersCompleteWords} />
  );
};

export default ActivityDetails;
