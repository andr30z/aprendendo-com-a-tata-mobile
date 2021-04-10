import React from "react";
import { Text } from "react-native";
import ActivityGroup from "../../../../Components/ActivityGroup/ActivityGroup.Component";
import { CONSTANTS } from "../../../../Constants";
import { BaseContainer } from "../../../../GlobalStyles/Containers.Style";
import { ActivityListProps } from "../../../../Interfaces";
import { GridContainer } from "./Styles";

const ActivityList: React.FC<ActivityListProps> = ({ activities }) => {
  return (
    <BaseContainer>
      <GridContainer>
        {activities.map((group, index) => {
          return <ActivityGroup key={index} activityGroup={group} />;
        })}
      </GridContainer>
    </BaseContainer>
  );
};

export default ActivityList;
