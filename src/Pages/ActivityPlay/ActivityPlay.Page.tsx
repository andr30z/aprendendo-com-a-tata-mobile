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
import { ActivityPlayProvider } from "../../Contexts";
import { MainStackParamList } from "../../Routes/MainStackNavigation/Interfaces";
import { ROUTES_NAME } from "../../Routes/MainStackNavigation/RoutesName";

type Props = NativeStackScreenProps<
  MainStackParamList,
  ROUTES_NAME.ACTIVITY_PLAY
>;

/**
 *
 * @author andr3z0
 **/
const ActivityPlay: React.FC<Props> = ({ route, navigation }) => {
  const { activity, activityResult, routeIndexToReturnOnFinish } = route.params;
  return (
    <ActivityPlayProvider activityResult={activityResult} activity={activity} routeIndexToReturnOnFinish={routeIndexToReturnOnFinish}>
      {(() => {
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
            return (
              <CompleteWordsByImagesAndLetters activity={activity as any} />
            );
          case ACTIVITY_CONSTANTS.ST:
            return <Storytelling activity={activity as any} />;
          case ACTIVITY_CONSTANTS.LCOT:
            return (
              <LearningCharacteristicsOfThings activity={activity as any} />
            );

          default:
            return null;
        }
      })()}
      {/* IIEF TO RENDER SWITCH STATEMENT */}
    </ActivityPlayProvider>
  );
};

export default ActivityPlay;
