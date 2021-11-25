import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import ShowActivityResultModal from "../../Components/ShowActivityResultModal/ShowActivityResultModal.Component";
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
import { MaterialIcons } from "@expo/vector-icons";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { Platform, StatusBar } from "react-native";
type NewActivityAnswers = Omit<ActivityAnswers, "_id">;
interface ActivityPlayContextInterface {
  onEndActivity: () => void;
  activityAnswers: NewActivityAnswers[];
  setActivityAnswers: React.Dispatch<
    React.SetStateAction<NewActivityAnswers[]>
  >;
  currentStageIndex: number;
  setCurrentStageIndex: React.Dispatch<React.SetStateAction<number>>;
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
  const [activityAnswers, setActivityAnswers] = useState<
    Array<NewActivityAnswers>
  >([]);
  const { user } = useUserContext();
  const { sheetRef, close } = useModalSheetRef();
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  useBackHandler(false);
  const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
  const [completedActivityResult, setCompletedActivityResult] =
    useState<ActivityResult | null>(null);
  const onEndActivity = useCallback(() => {
    baseApi
      .put<ActivityResult>(
        baseApiRoutes.ACTIVITY_RESULT_USERS + "/" + user?._id,
        {
          activityAnswers,
          activityResultId: activityResult?._id,
          activityId: activityResult?.activity._id,
          finished: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        setCompletedActivityResult(res.data);
        sheetRef.current?.present();
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, [activityResult, activityAnswers]);
  const withModalProps = useMemo(
    () => ({
      modalSheetRef: sheetRef,
      snapPoints: ["5%"],
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
      style: { marginHorizontal: 10 },
      bottomInset: 50,
    }),
    []
  );
  return (
    <ActivityPlayContext.Provider
      value={{
        onEndActivity,
        activityAnswers,
        setActivityAnswers,
        currentStageIndex,
        setCurrentStageIndex,
      }}
    >
      {children}
      <ShowActivityResultModal
        withModalProps={withModalProps}
        routeIndexToReturnOnFinish={routeIndexToReturnOnFinish}
        completedActivityResult={completedActivityResult}
      />
      <BaseContainer
        style={{
          zIndex: 50,
          marginTop: Platform.OS === "ios" ? 20 + 1 : StatusBar.currentHeight,
        }}
        position="absolute"
        top={10}
        right={10}
        flexDirection="row"
      >
        <MaterialIcons name="arrow-back-ios" size={24} color="black" />
        <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
      </BaseContainer>
    </ActivityPlayContext.Provider>
  );
};

export function useActivityPlayContext() {
  return useContext(ActivityPlayContext);
}
