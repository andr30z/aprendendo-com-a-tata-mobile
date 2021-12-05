import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { BackdropLoading, ChildrenCardItem } from "../../Components";
import { useUserContext } from "../../Contexts";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import {
  BaseContainer,
  ScrollContainer,
} from "../../GlobalStyles/Containers.Style";
import {
  UserInterface,
  ActivityCommonProps,
  ActivityResult,
} from "../../Interfaces";
import { MainStackParamList } from "../../Routes/MainStackNavigation/Interfaces";
import { ROUTES_NAME } from "../../Routes/MainStackNavigation/RoutesName";
import { ActivityResultListingItem } from "./Modules";
import EmptyMembers from "../../Illustrations/eco-education-bro.svg";
import { useGetActivity } from "../../Hooks";
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
      console.log(activityResult, "RESULTADO")
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
    <ScrollContainer contentContainerStyle={{ paddingBottom: 80 }}>
      <BackdropLoading visible={isLoadingActivity} />
      <BaseContainer
        paddingHorizontal="2%"
        marginTop="10px"
        height="173px"
        flexDirection="column"
      >
        <BaseContainer>
          <BaseText marginVertical="5px" fontSize="22px" color="black">
            Membros da sala
          </BaseText>
        </BaseContainer>
        <FlatList
          horizontal
          data={membersArray}
          contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 5 }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ChildrenCardItem
              primaryTheme={primaryTheme}
              isSelectedChildren={item._id === selectedChild?._id}
              onPress={onPressChildCard}
              child={item}
            />
          )}
        />
      </BaseContainer>
      {userActivities && userActivities.activitiesResult.length === 0 ? (
        <BaseContainer flexDirection="column" height="500px" width="100%">
          <EmptyMembers style={{ height: 300 }} />
          <BaseText align="center" fontSize="23px" color="black">
            Este aluno não enviou nenhuma atividade
          </BaseText>
        </BaseContainer>
      ) : !userActivities ? null : (
        <BaseContainer
          paddingHorizontal="2%"
          flexDirection="column"
          width="100%"
        >
          <BaseContainer marginVertical="15px">
            <BaseText fontSize="22px" color="black">
              Atividades da criança
            </BaseText>
          </BaseContainer>
          {userActivities?.activitiesResult.map((activityResult) => (
            <ActivityResultListingItem
              onPressActivity={onPressActivityBtn}
              key={activityResult._id}
              activityResult={activityResult}
            />
          ))}
        </BaseContainer>
      )}
    </ScrollContainer>
  );
};

export default TeacherActivityResult;
