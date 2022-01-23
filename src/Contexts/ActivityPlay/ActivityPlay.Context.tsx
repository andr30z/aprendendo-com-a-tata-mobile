import { Feather, MaterialIcons } from "@expo/vector-icons";
import React, { createContext, useContext } from "react";
import { Platform, StatusBar } from "react-native";
import OnFinishActivityModal from "../../Components/OnFinishActivityModal/OnFinishActivityModal.Component";
import ShowActivityResultModal from "../../Components/ShowActivityResultModal/ShowActivityResultModal.Component";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import {
  ActivityAnswers
} from "../../Interfaces/index";
import { BackgroundSwitch } from "./Backgrounds";
import { ActivityPlayProviderProps } from "./Interfaces";
import { useActivityPlayLogic } from "./useActivityPlayLogic";
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
  isActivityResultView?: boolean;
}

const ActivityPlayContext = createContext<ActivityPlayContextInterface>(
  {} as ActivityPlayContextInterface
);

export const ActivityPlayProvider: React.FC<ActivityPlayProviderProps> = ({
  children,
  activityResult,
  routeIndexToReturnOnFinish,
  activity,
  isActivityResultView,
}) => {
  const {
    withModalProps,
    activityAnswers,
    activityModalEndRef,
    goForwardOrBackward,
    hasFinishedActivity,
    navigation,
    oldStageIndex,
    onEndActivity,
    setHasFinishedActivity,
    setCurrentStageIndex,
    currentStageIndex,
    completedActivityResult,
  } = useActivityPlayLogic({
    activityResult,
    activity,
    routeIndexToReturnOnFinish,
    isActivityResultView,
  });
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
        isActivityResultView,
        activityStageLength: activity?.stages?.length,
      }}
    >
      <BackgroundSwitch activityType={activity.type} />
      <BaseContainer
        backgroundColor="transparent"
        marginBottom={
          Platform.OS === "ios"
            ? "21px"
            : (StatusBar.currentHeight ? StatusBar.currentHeight : 20) + "px"
        }
      />
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
            marginTop: Platform.OS === "ios" ? 21 : StatusBar.currentHeight,
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
          {currentStageIndex === activity.stages.length - 1 &&
            !isActivityResultView && (
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
        currentStageIndex={currentStageIndex}
        oldStageIndex={oldStageIndex}
      />
    </ActivityPlayContext.Provider>
  );
};

export function useActivityPlayContext() {
  return useContext(ActivityPlayContext);
}
