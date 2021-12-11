import React from "react";
import BackdropLoading from "../BackdropLoading/BackdropLoading.Component";
import {
  BaseContainer,
  ScrollContainer,
} from "../../GlobalStyles/Containers.Style";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import { FlatList } from "react-native-gesture-handler";
import ChildrenCardItem from "../ChildrenCardItem/ChildrenCardItem.Component";
import EmptyMembers from "../../Illustrations/eco-education-bro.svg";
import {
  ActivityCommonProps,
  PostActivityResult,
  UserInterface,
} from "../../Interfaces";
import { ActivityResultListingItem } from "./Modules";
import { UserComposition } from "../../Contexts";
interface ActivityResultVisualizationProps {
  isLoadingActivity: boolean;
  membersArray: Array<UserComposition>;
  primaryTheme: string;
  secondaryTheme?: string;
  onPressChildCard: (child: UserInterface) => void;
  userActivities?: PostActivityResult;
  selectedChild?: UserInterface;
  onPressActivityBtn: (activity: ActivityCommonProps<unknown>) => void;
}
/**
 *
 * @author andr3z0
 **/
const ActivityResultVisualization: React.FC<ActivityResultVisualizationProps> =
  ({
    isLoadingActivity,
    membersArray,
    primaryTheme,
    onPressChildCard,
    userActivities,
    selectedChild,
    onPressActivityBtn,
  }) => {
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
            contentContainerStyle={{
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
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


export default ActivityResultVisualization;
