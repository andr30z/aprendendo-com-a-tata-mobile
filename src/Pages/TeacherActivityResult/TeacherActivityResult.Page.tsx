import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useMemo, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { ChildrenCardItem } from "../../Components";
import { useUserContext } from "../../Contexts";
import {
  BaseContainer,
  ScrollContainer,
} from "../../GlobalStyles/Containers.Style";
import { UserInterface } from "../../Interfaces/index";
import { MainStackParamList } from "../../Routes/MainStackNavigation/Interfaces";
import { ROUTES_NAME } from "../../Routes/MainStackNavigation/RoutesName";

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
  const membersArray = [...members, user, user, user, user, user];
  const [selectedChild, setSelectedChild] = useState<UserInterface>();
  const onPressChildCard = useCallback((child: UserInterface) => {
    setSelectedChild(child);
  }, []);
  const userActivities = useMemo(
    () => postActivityResult.filter((x) => x.user._id === selectedChild?._id),
    [selectedChild]
  );
  console.log(userActivities);
  return (
    <ScrollContainer style={{ paddingBottom: 80 }}>
      <BaseContainer marginTop="10px" height="150px">
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
    </ScrollContainer>
  );
};

export default TeacherActivityResult;
