import React from "react";
import { FlatList, ListRenderItem, RefreshControlProps } from "react-native";
import { UserComposition } from "../../Contexts";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import {
  BaseContainer,
  ScrollContainer,
} from "../../GlobalStyles/Containers.Style";
import EmptyMembers from "../../Illustrations/eco-education-bro.svg";
import {
  ActivityCommonProps,
  ActivityResult,
  UserInterface,
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
  visualizationType?: "teacher" | "responsible" | "current-user";
  childListExtraComponent?: React.ReactNode;
  renderChildHeaderExtraComponent?: (child: UserComposition) => React.ReactNode;
  refreshControl?: React.ReactElement<RefreshControlProps> | undefined;
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
    childListExtraComponent,
    renderChildHeaderExtraComponent,
    visualizationType = "teacher",
    refreshControl,
  }) => {
    const isResponsibleVisualization = visualizationType === "responsible";
    const isCurrentUserVisualization = visualizationType === "current-user";
    return (
      <FlatList
        refreshControl={refreshControl}
        data={userActivities}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={11}
        initialNumToRender={10}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingBottom: 120 }}
        ListHeaderComponent={() => (
          <>
            <BackdropLoading visible={isLoadingActivity} />
            {!isCurrentUserVisualization && (
              <BaseContainer
                paddingHorizontal="2%"
                marginTop="10px"
                height="173px"
                flexDirection="column"
              >
                <BaseContainer>
                  <BaseText marginVertical="5px" fontSize="22px" color="black">
                    {isResponsibleVisualization
                      ? "Crianças"
                      : "Membros da sala"}
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
                    keyExtractor={(item) => item?._id as string}
                    renderItem={({ item }) => (
                      <ChildrenCardItem
                        primaryTheme={primaryTheme}
                        isSelectedChildren={item?._id === selectedChild?._id}
                        onPress={onPressChildCard}
                        child={item as UserInterface}
                      />
                    )}
                  />
                </BaseContainer>
              </BaseContainer>
            )}
            {userActivities && userActivities.length === 0 ? (
              <BaseContainer
                justify={isCurrentUserVisualization ? "center" : undefined}
                flexDirection="column"
                height="500px"
                width="100%"
              >
                <EmptyMembers style={{ height: 300 }} />
                <BaseText align="center" fontSize="23px" color="black">
                  {isCurrentUserVisualization ? "Você" : selectedChild?.name}{" "}
                  não fez nenhuma atividade
                </BaseText>
              </BaseContainer>
            ) : !userActivities ? null : (
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
                  {isCurrentUserVisualization
                    ? "Suas atividades"
                    : `Atividades de ${selectedChild?.name}`}
                </BaseText>
                {renderChildHeaderExtraComponent &&
                  selectedChild &&
                  renderChildHeaderExtraComponent(selectedChild)}
              </BaseContainer>
            )}
          </>
        )}
        renderItem={({ item: activityResult }) => {
          return (
            <BaseContainer
              paddingHorizontal="2%"
              width="100%"
              flex={1}
              marginTop={isCurrentUserVisualization ? "5px" : undefined}
            >
              <ActivityResultListingItem
                onPressActivity={(activity) =>
                  onPressActivityBtn(activity, activityResult)
                }
                activityResult={activityResult}
              />
            </BaseContainer>
          );
        }}
      />
    );
  };

export default ActivityResultVisualization;
