import React from "react";
import {
  // ComparationBetweenObjects,
  // ShapesAndColors,
  NumberSequence,
} from "../../Activities";
import { numberSequenceProps } from "./ActivityProps";

const ActivityDetails = () => {
  // return <ComparationBetweenObjects activity={activityComparation} />;
  return <NumberSequence activity={numberSequenceProps} />;
};

export default ActivityDetails;
