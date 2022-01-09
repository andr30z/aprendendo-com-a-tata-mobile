import React, { useEffect, useMemo, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { MainStackParamList } from "../../Routes/MainStackNavigation/Interfaces";
import { ROUTES_NAME } from "../../Routes/MainStackNavigation/RoutesName";
import { ButtonBeginActivty } from "./Styles";
import { baseApi, baseApiRoutes } from "../../Services";
import { ActivityCommonProps, ActivityResult } from "../../Interfaces/index";
import Toast from "react-native-toast-message";
import { useBackHandler, useBoolean, useCancellablePromise } from "../../Hooks";
import { ActivityIndicator } from "react-native";
import { isFromType } from "../../Utils";
import { useUserContext } from "../../Contexts";
type Props = NativeStackScreenProps<MainStackParamList, ROUTES_NAME.DETAILS>;
interface StartPostActivityResponse {
  activityResult: ActivityResult;
  success: boolean;
  message: string;
}
const ActivityDetails: React.FC<Props> = ({ route, navigation }) => {
  const { activityId, postActivityResult, postId, routeIndexToReturnOnFinish } =
    route.params;
  const [activity, setActivity] = useState<
    ActivityCommonProps<unknown> | undefined
  >(undefined);
  const activityResult = useMemo(
    () =>
      postActivityResult?.activitiesResult.find(
        (activityResult) => activityResult.activity._id === activityId
      ),
    [postActivityResult?.activitiesResult, activityId]
  );
  console.log(activityResult, postActivityResult,"AAAAA")
  const { value: isLoading, setTrue, setFalse } = useBoolean();
  const { user } = useUserContext();
  const { cancellablePromise } = useCancellablePromise();
  useBackHandler(undefined, () => {
    navigation.goBack();
    return true;
  });

  const startActivity = async () => {
    setTrue();
    return cancellablePromise(
      baseApi.post<StartPostActivityResponse>(
        baseApiRoutes.START_POST_ACTIVITY(postId as string),
        {
          activityId: activity?._id,
          finished: false,
          activityAnswers: [],
          userId: user?._id,
        }
      )
    )
      .then((res) => {
        setFalse();
        return res.data.activityResult;
      })
      .catch((e) => {
        console.log(e.response);
        return { error: true };
      });
  };

  useEffect(() => {
    setTrue();
    cancellablePromise(
      baseApi.get<ActivityCommonProps<unknown>>(
        baseApiRoutes.ACTIVITIES + "/" + activityId
      )
    )
      .then((res) => {
        // console.log(res.data);
        setActivity(res.data);
        setFalse();
      })
      .catch(() => {
        Toast.show({
          type: "error",
          text1: "Não foi possível abrir a atividade!",
        });
        navigation.goBack();
      });
  }, []);
  const resolveActivityStart = async () => {
    const activityResult = await startActivity();
    if (!isFromType<ActivityResult>(activityResult, "_id")) {
      Toast.show({
        type: "error",
        text1: "Não foi possível iniciar a atividade!",
      });
      return navigation.goBack();
    }
    navigation.navigate(ROUTES_NAME.ACTIVITY_PLAY, {
      activity: activity as any,
      activityResult,
      routeIndexToReturnOnFinish,
    });
  };
  return (
    <BaseContainer
      flex={1}
      align="center"
      justify="center"
      flexDirection="column"
    >
      {activity && (
        <BaseText
          marginBottom="25px"
          color="black"
          fontSize="25px"
          align="center"
        >
          {activity.name}
        </BaseText>
      )}
      <ButtonBeginActivty
        onPress={async () => {
          if (isLoading || !activity) return;
          if (postActivityResult || postId) return resolveActivityStart();
          navigation.navigate(ROUTES_NAME.ACTIVITY_PLAY, {
            activity,
            routeIndexToReturnOnFinish,
          });
        }}
      >
        {!isLoading ? (
          <>
            <BaseText marginRight="10px" align="center" fontSize="25px">
              COMEÇAR
            </BaseText>
            <AntDesign name="playcircleo" size={30} color="#fff" />
          </>
        ) : (
          <ActivityIndicator size={25} color="#fff" />
        )}
      </ButtonBeginActivty>
      {activityResult && (
        <ButtonBeginActivty style={{ marginTop: 15 }}>
          <BaseText
            onPress={() => {
              if (isLoading || !activity) return;
              navigation.navigate(ROUTES_NAME.ACTIVITY_PLAY, {
                activity,
                routeIndexToReturnOnFinish,
                activityResult,
                isActivityResultView: true,
              });
            }}
            align="center"
            fontSize="17px"
          >
            VER ÚLTIMA TENTATIVA
          </BaseText>
        </ButtonBeginActivty>
      )}
    </BaseContainer>
  );
};

export default ActivityDetails;
