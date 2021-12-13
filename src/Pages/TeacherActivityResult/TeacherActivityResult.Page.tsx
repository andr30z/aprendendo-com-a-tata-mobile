import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { ActivityResultVisualization } from "../../Components";
import { useUserContext } from "../../Contexts";
import { useActivityResultVisualization, useGetActivity } from "../../Hooks";
import {
  ActivityCommonProps,
  ActivityResult,
  UserInterface,
} from "../../Interfaces";
import { MainStackParamList } from "../../Routes/MainStackNavigation/Interfaces";
import { ROUTES_NAME } from "../../Routes/MainStackNavigation/RoutesName";
import { showError } from "../../Utils";
type Props = NativeStackScreenProps<
  MainStackParamList,
  ROUTES_NAME.TEACHER_ACTIVITY_RESULT_LISTING
>;

/**
 *
 * @author andr30z
 **/
const TeacherActivityResult: React.FC<Props> = ({ route: { params } }) => {
  const { members, primaryTheme, postActivityResult } = params;

  const { user } = useUserContext();
  const membersArray = [...members, user];
  
  const getActivityResult = (activity: ActivityCommonProps<unknown>) => {
    let activityResult: ActivityResult | undefined;
    if (postActivity)
    activityResult = postActivity.activitiesResult.find(
      (x) => x.activity._id === activity._id
      );
      return { activityResult };
    };
    const {
      isLoadingActivity,
      onPressActivityBtn,
      onPressChildCard,
      selectedChild,
    } = useActivityResultVisualization({
    activityPlayParamsResolver: getActivityResult,
  });
  const postActivity = useMemo(
    () => postActivityResult.find((x) => x.user._id === selectedChild?._id),
    [selectedChild]
  );
  const activitiesResults = postActivity?.activitiesResult;
  // console.log(activitiesResults,postActivityResult,selectedChild);
  return (
    <ActivityResultVisualization
      userActivities={activitiesResults}
      selectedChild={selectedChild}
      isLoadingActivity={isLoadingActivity}
      membersArray={membersArray}
      onPressActivityBtn={onPressActivityBtn}
      onPressChildCard={onPressChildCard}
      primaryTheme={primaryTheme}
    />
  );
};

export default TeacherActivityResult;
