import React from "react";
import { ComparationBetweenObjects, ShapesAndColors } from "../../Activities";
import { shapesAndColors } from "./ActivityProps";

const ActivityDetails = () => {
  // return <ComparationBetweenObjects activity={activityComparation} />;
  return (
    <ShapesAndColors
      activity={shapesAndColors}
    />
  );
};

export default ActivityDetails;
