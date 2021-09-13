import React from "react";
import {
  // ComparationBetweenObjects,
  // ShapesAndColors,
  // NumberSequence,
  ImagesByLetters,
} from "../../Activities";
import { learningLettersWithImages } from "./ActivityProps";

const ActivityDetails = () => {
  // return <ComparationBetweenObjects activity={activityComparation} />;
  return <ImagesByLetters activity={learningLettersWithImages} />;
};

export default ActivityDetails;
