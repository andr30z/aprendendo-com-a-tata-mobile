import React, { useEffect, useState } from "react";
import ActivityGroup from "../../../../Components/ActivityGroup/ActivityGroup.Component";
import { BaseContainer } from "../../../../GlobalStyles/Containers.Style";
import { ActivityListProps } from "../../../../Interfaces";
import { baseApi, baseApiRoutes } from "../../../../Services/BaseApi";
import { GridContainer } from "./Styles";
import {
  ActivityApiResponse,
  ActivityCommonProps,
} from "../../../../Interfaces/index";
import { ActivityItem } from "../../../../Components";

interface ActivityListOtherProps {
  setScrollPosition: React.Dispatch<React.SetStateAction<number>>;
}

/**
 * Activity module that contain the list of activities from the api.
 * @param activities array of a  ```ActivityGroup```, thats basically the groups of activities
 * @param setScrollPosition React setState function that will be used to discover where the is the actual activities location on the screen
 * @author andr3z0
 **/
const ActivityList: React.FC<ActivityListOtherProps> = ({
  setScrollPosition,
}) => {
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

  return (
    <BaseContainer>
      <GridContainer
        onLayout={(e) => {
          setScrollPosition(e.nativeEvent.layout.y);
        }}
      >
        {activities.map((activity, index) => (
          <ActivityItem itemIndex={index} {...activity} key={activity._id} />
        ))}
      </GridContainer>
    </BaseContainer>
  );
};

export default ActivityList;
