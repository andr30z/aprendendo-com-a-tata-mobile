import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  ActivityResultVisualization
} from "../../Components";
import { useUserContext } from "../../Contexts";
import { useGetActivity } from "../../Hooks";
import {
  ActivityCommonProps,
  ActivityResult, UserInterface
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
const TeacherActivityResult: React.FC<Props> = ({
  route: { params },
  navigation,
}) => {
  const { members, primaryTheme, postActivityResult } = params;

  const { user } = useUserContext();
  const membersArray = [...members, user, user, user, user, user];
  const [selectedChild, setSelectedChild] = useState<UserInterface>();
  const onPressChildCard = useCallback((child: UserInterface) => {
    setSelectedChild(child);
  }, []);
  const userActivities = useMemo(
    () => postActivityResult.find((x) => x.user._id === selectedChild?._id),
    [selectedChild]
  );
  const goToActivityPlay = (activity: ActivityCommonProps<unknown>) => {
    let activityResult: ActivityResult | undefined;
    if (userActivities)
      activityResult = userActivities.activitiesResult.find(
        (x) => x.activity._id === activity._id
      );
    console.log(activityResult, "RESULTADO");
    navigation.navigate(ROUTES_NAME.ACTIVITY_PLAY, {
      routeIndexToReturnOnFinish: 0,
      activity,
      activityResult,
      isActivityResultView: true,
    });
  };

  const activitiesRef = useRef<Array<ActivityCommonProps<unknown>>>([]);
  const { getActivity, isLoadingActivity } = useGetActivity<unknown>(
    (activity) => {
      activitiesRef.current.push(activity);
      goToActivityPlay(activity);
    },
    showError
  );

  const onPressActivityBtn = useCallback(
    (activity: ActivityCommonProps<unknown>) => {
      const currentActivity = activitiesRef.current.find(
        (x) => x._id === activity._id
      );
      if (!currentActivity) return getActivity(activity._id);
      goToActivityPlay(currentActivity);
    },
    [userActivities]
  );
  // console.log(userActivities);
  return (
    <ActivityResultVisualization
      userActivities={userActivities}
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
