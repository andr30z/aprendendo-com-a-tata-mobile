// import { storytellingProps } from "./ActivityProps";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import {
  ComparationBetweenObjects,
  CompleteWordsByImagesAndLetters,
  DragLettersToCompleteWords,
  ImagesByLetters,
  LearningCharacteristicsOfThings,
  NumberOperations,
  NumberSequence,
  ShapesAndColors,
  Storytelling,
} from "../../Activities";
import { ACTIVITY_CONSTANTS } from "../../Constants";
import { StackParamList } from "../../Routes/ActivitiesStack/Interfaces";

type Props = NativeStackScreenProps<StackParamList, "ActivityPlay">;

/**
 *
 * @author andr3z0
 **/
const ActivityPlay: React.FC<Props> = ({ route }) => {
  const activity = route.params.activity;
  //   useEffect(() => {
  //     console.log(route.params[])
  // }, [route.params])
  switch (activity?.type) {
    case ACTIVITY_CONSTANTS.CMP:
      return <ComparationBetweenObjects activity={activity as any} />;
    case ACTIVITY_CONSTANTS.SC:
      return <ShapesAndColors activity={activity as any} />;
    case ACTIVITY_CONSTANTS.NS:
      return <NumberSequence activity={activity as any} />;
    case ACTIVITY_CONSTANTS.NO:
      return <NumberOperations activity={activity as any} />;
    case ACTIVITY_CONSTANTS.LLI:
      return <ImagesByLetters activity={activity as any} />;
    case ACTIVITY_CONSTANTS.LLDCW:
      return <DragLettersToCompleteWords activity={activity as any} />;
    case ACTIVITY_CONSTANTS.LLCW:
      return <CompleteWordsByImagesAndLetters activity={activity as any} />;
    case ACTIVITY_CONSTANTS.ST:
      return <Storytelling activity={activity as any} />;
    case ACTIVITY_CONSTANTS.LCOT:
      return <LearningCharacteristicsOfThings activity={activity as any} />;

    default:
      return null;
  }
};

export default ActivityPlay;
