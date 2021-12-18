import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { UserComposition } from "../../Contexts";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import {
  BaseContainer,
  ScrollContainer
} from "../../GlobalStyles/Containers.Style";
import EmptyMembers from "../../Illustrations/eco-education-bro.svg";
import {
  ActivityCommonProps,
  ActivityResult, UserInterface
} from "../../Interfaces";
import BackdropLoading from "../BackdropLoading/BackdropLoading.Component";
import ChildrenCardItem from "../ChildrenCardItem/ChildrenCardItem.Component";
import { ActivityResultListingItem } from "./Modules";
interface ActivityResultVisualizationProps {
  isLoadingActivity: boolean;
  membersArray: Array<UserComposition>;
  primaryTheme: string;
  secondaryTheme?: string;
  onPressChildCard: (child: UserInterface) => void;
  userActivities?: ActivityResult<unknown>[];
  selectedChild?: UserInterface;
  onPressActivityBtn: (
    activity: ActivityCommonProps<unknown>,
    activityResult: ActivityResult<unknown>
  ) => void;
  isResponsibleVisualization?: boolean;
  childListExtraComponent?: React.ReactNode;
  renderChildHeaderExtraComponent?: (child: UserComposition) => React.ReactNode;
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
    isResponsibleVisualization = false,
    childListExtraComponent,
    renderChildHeaderExtraComponent,
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
              {isResponsibleVisualization ? "Crianças" : "Membros da sala"}
            </BaseText>
          </BaseContainer>
          <BaseContainer flex={1} position="relative">
            {childListExtraComponent}
            <FlatList
              horizontal
              data={membersArray}
              contentContainerStyle={{
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}
              keyExtractor={(item) => item._id.toString()}
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
        </BaseContainer>
        {userActivities && userActivities.length === 0 ? (
          <BaseContainer flexDirection="column" height="500px" width="100%">
            <EmptyMembers style={{ height: 300 }} />
            <BaseText align="center" fontSize="23px" color="black">
              {selectedChild?.name} não fez nenhuma atividade
            </BaseText>
          </BaseContainer>
        ) : !userActivities ? null : (
          <BaseContainer
            paddingHorizontal="2%"
            flexDirection="column"
            width="100%"
          >
            <BaseContainer
              marginVertical="15px"
              flexDirection="column"
              justify="center"
              align="center"
              width="100%"
            >
              <BaseText
                ellipsizeMode="tail"
                numberOfLines={3}
                fontSize="22px"
                align="center"
                color="black"
                marginBottom="5px"
              >
                Atividades de {selectedChild?.name}
              </BaseText>
              {renderChildHeaderExtraComponent &&
                selectedChild &&
                renderChildHeaderExtraComponent(selectedChild)}
            </BaseContainer>
            {userActivities.map((activityResult) => (
              <ActivityResultListingItem
                onPressActivity={(activity) =>
                  onPressActivityBtn(activity, activityResult)
                }
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
