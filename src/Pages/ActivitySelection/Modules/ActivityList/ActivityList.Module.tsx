import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityItem } from "../../../../Components";
import { BaseContainer } from "../../../../GlobalStyles/Containers.Style";
import {
  ActivityApiResponse,
  ActivityCommonProps,
} from "../../../../Interfaces/index";
import { ROUTES_NAME as activityRoutesName } from "../../../../Routes/ActivitiesStack/RoutesName";
import { ROUTES_NAME as initialRoutesName } from "../../../../Routes/InitialStack/RoutesName";
import { baseApi, baseApiRoutes } from "../../../../Services/BaseApi";
import { GridContainer } from "./Styles";
import { StackParamList } from "../../../../Routes/ActivitiesStack/Interfaces";
interface ActivityListOtherProps {
  setScrollPosition: React.Dispatch<React.SetStateAction<number>>;
}

type StackProps = StackNavigationProp<any>;

/**
 * Activity module that contain the list of activities from the api.
 * @param activities array of a  ```ActivityGroup```, thats basically the groups of activities
 * @param setScrollPosition React setState function that will be used to discover where the is the actual activities location on the screen
 * @author andr3z0
 **/
const ActivityList: React.FC<ActivityListOtherProps> = ({
  setScrollPosition,
}) => {
  const navigation = useNavigation<StackProps>();
  const [activities, setActivities] = useState<
    Array<ActivityCommonProps<unknown>>
  >([]);
  useEffect(() => {
    baseApi
      .get<ActivityApiResponse>(baseApiRoutes.ACTIVITIES)
      .then((res) => {
        // console.log(res.data.activities);
        setActivities(res.data.activities);
      })
      .catch((e) => console.log(e));
  }, []);

  const onPressActivityItem = useCallback(
    (activity: ActivityCommonProps<unknown>) => {
      navigation.navigate(initialRoutesName.ACTIVITIES_STACK, {
        screen: activityRoutesName.ACTIVITYDETAILS,
        params: {
          activity,
        },
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
