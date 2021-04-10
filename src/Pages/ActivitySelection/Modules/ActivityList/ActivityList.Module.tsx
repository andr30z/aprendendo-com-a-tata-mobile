import React from "react";
import { Text } from "react-native";
import { CONSTANTS } from "../../../../Constants";
import { BaseContainer } from "../../../../GlobalStyles/Containers.Style";
import { ActivityListProps } from "../../../../Interfaces";
import { GridContainer } from "./Styles";

const ActivityList: React.FC<ActivityListProps> = ({ activities }) => {
  return (
    <BaseContainer>
      <GridContainer>
        {activities.map((a, index) => {
          return null;
        })}
      </GridContainer>
    </BaseContainer>
  );
};

export default ActivityList;
