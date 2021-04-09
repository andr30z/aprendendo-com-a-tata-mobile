import React from "react";
import { Text } from "react-native";
import { CONSTANTS } from "../../../../Constants";
import { BaseContainer } from "../../../../GlobalStyles/Containers.Style";
import { Mockup } from "../../ApiMockup.constant";
import { GridContainer } from "./Styles";
Mockup;
interface ActivityListProps {
  activities: Array<{
    level: number;
    name: string;
    description: string;
    activities: Array<{
      name: string;
      level: number;
    }>;
  }>;
}

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
