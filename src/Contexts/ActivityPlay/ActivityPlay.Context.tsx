import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useRef,
} from "react";
import Button from "../../Components/Button/Button.Component";
import { PORTAL_HOSTS } from "../../Constants";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { useBackHandler } from "../../Hooks";
import { ActivityAnswers, ActivityResult } from "../../Interfaces/index";
import {
  ActivityPostParams,
  MainStackParamList,
} from "../../Routes/MainStackNavigation/Interfaces";
import { baseApi, baseApiRoutes } from "../../Services";
import { useUserContext } from "../User/User.Context";
import { AntDesign } from "@expo/vector-icons";
type NewActivityAnswers = Omit<ActivityAnswers, "_id">;
interface ActivityPlayContextInterface {
  onEndActivity: () => void;
  activityAnswers: NewActivityAnswers[];
  setActivityAnswers: React.Dispatch<
    React.SetStateAction<NewActivityAnswers[]>
  >;
}

interface ActivityPlayProviderProps extends ActivityPostParams {
  activityResult?: ActivityResult;
}

const ActivityPlayContext = createContext<ActivityPlayContextInterface>(
  {} as ActivityPlayContextInterface
);

export const ActivityPlayProvider: React.FC<ActivityPlayProviderProps> = ({
  children,
  activityResult,
  routeIndexToReturnOnFinish,
}) => {
  const [activityAnswers, setActivityAnswers] = useState<
    Array<NewActivityAnswers>
  >([]);
  const { user } = useUserContext();
  const sheetRef = useRef<BottomSheetModal>(null);
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
  return (
    <ActivityPlayContext.Provider
      value={{ onEndActivity, activityAnswers, setActivityAnswers }}
    >
      {children}
      <Portal hostName={PORTAL_HOSTS.ROOT_PORTAL}>
        <BottomSheetModalProvider>
          <BottomSheetModal
            ref={sheetRef}
            snapPoints={["85%"]}
            handleComponent={() => (
              <AntDesign
                name="star"
                size={30}
                color="#e5e500"
                style={{ alignSelf: "center", marginVertical: 4 }}
              />
            )}
            enablePanDownToClose={false}
            detached
            style={{ marginHorizontal: 10 }}
            bottomInset={50}
          >
            {completedActivityResult && (
              <BaseContainer
                flex={1}
                align="center"
                justify="center"
                flexDirection="column"
              >
                <BaseText fontSize="15px" color="#000">
                  Atividade concluída com sucesso!
                </BaseText>
                <BaseText marginVertical="9px" fontSize="15px" color="#000">
                  {completedActivityResult.activity.name}
                </BaseText>
                <BaseText marginBottom="9px" fontSize="20px" color="#000">
                  Resultado: {completedActivityResult.result}
                </BaseText>
                <Button
                  buttonTitle="Voltar"
                  buttonHeight="55px"
                  buttonWidth="130px"
                  onPress={() => {
                    navigation.pop(routeIndexToReturnOnFinish || 1);
                  }}
                />
              </BaseContainer>
            )}
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </Portal>
    </ActivityPlayContext.Provider>
  );
};

export function useActivityPlayContext() {
  return useContext(ActivityPlayContext);
}
