import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { useCallback, useRef, useState } from "react";
import { useGetActivity } from "./useGetActivity";
import {
  ActivityCommonProps,
  ActivityResult,
  UserInterface,
} from "../Interfaces";
import {
  ActivityPlayParamsType,
  MainStackParamList,
} from "../Routes/MainStackNavigation/Interfaces";
import { ROUTES_NAME } from "../Routes/MainStackNavigation/RoutesName";
import { showError } from "../Utils";

interface UseActivityVisualizationProps {
  activityPlayParamsResolver: (
    activity: ActivityCommonProps<unknown>,
    activityResult?: ActivityResult
  ) => Partial<ActivityPlayParamsType>;
  onPressChildCallback?: () => void;
  sendToActivityPlayOnSearchActivity?: boolean;
}

export function useActivityResultVisualization({
  activityPlayParamsResolver,
  sendToActivityPlayOnSearchActivity = true,
  onPressChildCallback,
}: UseActivityVisualizationProps) {
  const [selectedChild, setSelectedChild] = useState<UserInterface>();
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState<number>();

  const onPressChildCard = useCallback(
    (child: UserInterface) => {
      if (child._id !== selectedChild?._id) {
        onPressChildCallback && onPressChildCallback();
        setPage(1);
        setLastPage(undefined);
      }
      setSelectedChild(child);
    },
    [onPressChildCallback, selectedChild]
  );

  const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
  const goToActivityPlay = (
    activity: ActivityCommonProps<unknown>,
    activityResult?: ActivityResult
  ) => {
    navigation.navigate(ROUTES_NAME.ACTIVITY_PLAY, {
      ...activityPlayParamsResolver(activity, activityResult),
      routeIndexToReturnOnFinish: 0,
      activity,
      isActivityResultView: true,
    });
  };
  const activitiesRef = useRef<Array<ActivityCommonProps<unknown>>>([]);
  const { getActivity, isLoadingActivity } = useGetActivity<unknown>(
    (activity) => {
      activitiesRef.current.push(activity);
      return sendToActivityPlayOnSearchActivity
        ? goToActivityPlay(activity)
        : activity;
    },
    showError
  );

  const onPressActivityBtn = useCallback(
    (
      activity: ActivityCommonProps<unknown>,
      activityResult: ActivityResult
    ) => {
      const currentActivity = activitiesRef.current.find(
        (x) => x._id === activity._id
      );
      if (currentActivity)
        return goToActivityPlay(currentActivity, activityResult);

      getActivity(activity._id).then((loadedActivity) => {

        if (!loadedActivity) return;
        goToActivityPlay(loadedActivity, activityResult);
      });
    },
    [activityPlayParamsResolver]
  );

  return {
    onPressActivityBtn,
    goToActivityPlay,
    activitiesRef,
    getActivity,
    isLoadingActivity,
    selectedChild,
    setSelectedChild,
    onPressChildCard,
    lastPage,
    setLastPage,
    page,
    setPage,
  };
}
