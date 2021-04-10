import React from "react";
import { Text, View } from "react-native";
import ActivityGroup from "../../../../Components/ActivityGroup/ActivityGroup.Component";
import { CONSTANTS } from "../../../../Constants";
import { BaseContainer } from "../../../../GlobalStyles/Containers.Style";
import { ActivityListProps } from "../../../../Interfaces";
import { GridContainer } from "./Styles";

interface ActivityListOtherProps {
  setScrollPosition: React.Dispatch<React.SetStateAction<number>>;
}

const ActivityList: React.FC<ActivityListProps & ActivityListOtherProps> = ({
  activities,
  setScrollPosition,
}) => {
  return (
    <BaseContainer>
      <GridContainer
        onLayout={(e) =>{
          console.log(e.nativeEvent.layout)
          setScrollPosition(e.nativeEvent.layout.y)}}
      >
        {activities.map((group, index) => {
          return <ActivityGroup key={index} activityGroup={group} />;
        })}
      </GridContainer>
    </BaseContainer>
  );
};

export default ActivityList;
