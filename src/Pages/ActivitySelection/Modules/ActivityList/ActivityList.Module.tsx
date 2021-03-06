import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback } from "react";
import { ActivityItem } from "../../../../Components";
import { BaseContainer } from "../../../../GlobalStyles/Containers.Style";
import { useActivityList } from "../../../../Hooks";
import { ActivityCommonProps } from "../../../../Interfaces/index";
import { ROUTES_NAME as initialRoutesName } from "../../../../Routes/InitialStack/RoutesName";
import { MainStackParamList } from "../../../../Routes/MainStackNavigation/Interfaces";
import { ROUTES_NAME as activityRoutesName } from "../../../../Routes/MainStackNavigation/RoutesName";
import { GridContainer } from "./Styles";
interface ActivityListOtherProps {
  setScrollPosition: React.Dispatch<React.SetStateAction<number>>;
}

type StackProps = StackNavigationProp<MainStackParamList>;

/**
 * Activity module that contain the list of activities from the api.
 * @param activities array of a  ```ActivityGroup```, thats basically the groups of activities
 * @param setScrollPosition React setState function that will be used to discover where the is the actual activities location on the screen
 * @author andr30z
 **/
const ActivityList: React.FC<ActivityListOtherProps> = ({
  setScrollPosition,
}) => {
  const navigation = useNavigation<StackProps>();
  const { activities } = useActivityList();

  const onPressActivityItem = useCallback(
    (activity: ActivityCommonProps<unknown>) => {
      navigation.navigate(activityRoutesName.DETAILS, {
        activityId: activity._id,
      });
    },
    []
  );

  return (
    <BaseContainer>
      <GridContainer
        onLayout={(e) => {
          setScrollPosition(e.nativeEvent.layout.y);
        }}
      >
        {activities.map((activity, index) => (
          <ActivityItem
            onPress={onPressActivityItem}
            itemIndex={index}
            {...activity}
            key={activity._id}
          />
        ))}
      </GridContainer>
    </BaseContainer>
  );
};

export default ActivityList;
