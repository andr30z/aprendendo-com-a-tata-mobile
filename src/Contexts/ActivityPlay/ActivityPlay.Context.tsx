import { AntDesign, MaterialIcons, Feather } from "@expo/vector-icons";
import { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { Platform, StatusBar } from "react-native";
import OnFinishActivityModal from "../../Components/OnFinishActivityModal/OnFinishActivityModal.Component";
import ShowActivityResultModal from "../../Components/ShowActivityResultModal/ShowActivityResultModal.Component";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { useBackHandler, useModalSheetRef } from "../../Hooks";
import {
  ActivityAnswers,
  ActivityCommonProps,
  ActivityResult,
} from "../../Interfaces/index";
import {
  ActivityPostParams,
  MainStackParamList,
} from "../../Routes/MainStackNavigation/Interfaces";
import { baseApi, baseApiRoutes } from "../../Services";
import { useUserContext } from "../User/User.Context";
type NewActivityAnswers = Omit<ActivityAnswers, "_id">;
interface ActivityPlayContextInterface {
  activityAnswers: React.MutableRefObject<NewActivityAnswers[]>;
  oldStageIndex: React.MutableRefObject<number>;
  currentStageIndex: number;
  setCurrentStageIndex: React.Dispatch<React.SetStateAction<number>>;
  hasFinishedActivity: boolean;
  activityStageLength?: number;
  onEndActivity: () => void;
  setHasFinishedActivity: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ActivityPlayProviderProps extends ActivityPostParams {
  activityResult?: ActivityResult;
  activity: ActivityCommonProps<unknown>;
}

const ActivityPlayContext = createContext<ActivityPlayContextInterface>(
  {} as ActivityPlayContextInterface
);

export const ActivityPlayProvider: React.FC<ActivityPlayProviderProps> = ({
  children,
  activityResult,
  routeIndexToReturnOnFinish,
  activity,
}) => {
  const activityAnswers = useRef<Array<NewActivityAnswers>>([]);
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
      .catch((error) => {
        console.log(error.response);
      });
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
  return (
    <ActivityPlayContext.Provider
      value={{
        hasFinishedActivity,
        setHasFinishedActivity,
        activityAnswers,
        oldStageIndex,
        currentStageIndex,
        setCurrentStageIndex,
        onEndActivity,
        activityStageLength: activity?.stages?.length,
      }}
    >
      {children}
      <ShowActivityResultModal
        withModalProps={withModalProps}
        routeIndexToReturnOnFinish={routeIndexToReturnOnFinish}
        completedActivityResult={completedActivityResult}
        navigation={navigation}
      />
      {activity.stages && activity.stages.length > 0 && (
        <BaseContainer
          style={{
            zIndex: 50,
            marginTop: Platform.OS === "ios" ? 20 + 1 : StatusBar.currentHeight,
          }}
          position="absolute"
          top={10}
          right={20}
          flexDirection="row"
        >
          {currentStageIndex !== 0 && activity.stages.length >= 1 && (
            <MaterialIcons
              name="arrow-back-ios"
              size={30}
              color={activity.color || "red"}
              onPress={() => goForwardOrBackward(-1)}
            />
          )}
          {currentStageIndex < activity.stages.length - 1 && (
            <MaterialIcons
              name="arrow-forward-ios"
              size={30}
              onPress={() => goForwardOrBackward(+1)}
              color={activity.color || "red"}
            />
          )}
          {currentStageIndex === activity.stages.length - 1 && (
            <Feather
              onPress={() => setHasFinishedActivity(true)}
              name="send"
              size={30}
              color={activity.color || "red"}
            />
          )}
        </BaseContainer>
      )}
      <OnFinishActivityModal
        modalRef={activityModalEndRef}
        finished={hasFinishedActivity}
        setFinished={setHasFinishedActivity}
        onSubmit={onEndActivity}
      />
    </ActivityPlayContext.Provider>
  );
};

export function useActivityPlayContext() {
  return useContext(ActivityPlayContext);
}
