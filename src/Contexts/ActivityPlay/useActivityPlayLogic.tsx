import { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { useBackHandler, useModalSheetRef } from "../../Hooks";
import { ActivityAnswers, ActivityResult } from "../../Interfaces";
import { MainStackParamList } from "../../Routes/MainStackNavigation/Interfaces";
import { baseApi, baseApiRoutes } from "../../Services";
import { useUserContext } from "../User/User.Context";
import { ActivityPlayProviderProps } from "./Interfaces";
import { AntDesign } from "@expo/vector-icons";
import { showError } from "../../Utils";
type NewActivityAnswers = Omit<ActivityAnswers, "_id">;

/**
 *
 * @author andr3z0
 **/
export function useActivityPlayLogic({
  activityResult,
  isActivityResultView,
}: ActivityPlayProviderProps) {
  const activityAnswers = useRef<Array<NewActivityAnswers>>(
    isActivityResultView && activityResult
      ? activityResult.activityAnswers
      : []
  );
  const oldStageIndex = useRef<number>(0);
  const { user } = useUserContext();
  const { sheetRef } = useModalSheetRef();
  const { sheetRef: activityModalEndRef } = useModalSheetRef();
  const [hasFinishedActivity, setHasFinishedActivity] = useState(false);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
  useBackHandler(false);
  const [completedActivityResult, setCompletedActivityResult] =
    useState<ActivityResult | null>(null);
  const onEndActivity = useCallback(() => {
    console.log(activityAnswers.current);
    baseApi
      .put<ActivityResult>(
        baseApiRoutes.ACTIVITY_RESULT_USERS + "/" + user?._id,
        {
          activityAnswers: activityAnswers.current,
          activityResultId: activityResult?._id,
          activityId: activityResult?.activity._id,
          finished: true,
        }
      )
      .then((res) => {
        // console.log(res.data, "RESULTADO");
        activityModalEndRef.current?.close();
        setCompletedActivityResult(res.data);
        sheetRef.current?.present();
      })
      .catch(showError);
  }, [completedActivityResult, activityResult]);
  const withModalProps = useMemo(
    () => ({
      modalSheetRef: sheetRef,
      snapPoints: ["75%"],
      backdropComponent: (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          pressBehavior="none"
        />
      ),
      handleComponent: () => (
        <AntDesign
          name="star"
          size={30}
          color="#e5e500"
          style={{ alignSelf: "center", marginVertical: 4 }}
        />
      ),
      children: null,
      enablePanDownToClose: false,
      detached: true,
      style: { marginHorizontal: 10, zIndex: 9999999999 },
      bottomInset: 50,
    }),
    []
  );

  const goForwardOrBackward = (value: number) => {
    oldStageIndex.current = currentStageIndex;
    setCurrentStageIndex((past) => past + value);
  };

  return {
    goForwardOrBackward,
    activityAnswers,
    oldStageIndex,
    user,
    sheetRef,
    activityModalEndRef,
    hasFinishedActivity,
    setHasFinishedActivity,
    navigation,
    onEndActivity,
    withModalProps,
    currentStageIndex,
    completedActivityResult,
    setCurrentStageIndex,
  };
}
