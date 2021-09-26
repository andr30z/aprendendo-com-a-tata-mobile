import React, { useEffect } from "react";
import ActivityGroup from "../../../../Components/ActivityGroup/ActivityGroup.Component";
import { BaseContainer } from "../../../../GlobalStyles/Containers.Style";
import { ActivityListProps } from "../../../../Interfaces";
import { baseApi, baseApiRoutes } from "../../../../Services/BaseApi";
import { GridContainer } from "./Styles";
import { ActivityApiResponse } from "../../../../Interfaces/index";

interface ActivityListOtherProps {
  setScrollPosition: React.Dispatch<React.SetStateAction<number>>;
}

/**
 * Activity module that contain the list of activities from the api.
 * @param activities array of a  ```ActivityGroup```, thats basically the groups of activities
 * @param setScrollPosition React setState function that will be used to discover where the is the actual activities location on the screen
 * @author andr3z0
 **/
const ActivityList: React.FC<ActivityListProps & ActivityListOtherProps> = ({
  activities,
  setScrollPosition,
}) => {
  useEffect(() => {
    baseApi
      .get<ActivityApiResponse>(baseApiRoutes.ACTIVITIES)
      .then((res) => {
        console.log(res.data);
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
        {activities.map((group, index) => (
          <ActivityGroup key={index} activityGroup={group} />
        ))}
      </GridContainer>
    </BaseContainer>
  );
};

export default ActivityList;
