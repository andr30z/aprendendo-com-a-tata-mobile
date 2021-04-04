import React from "react";
import { Text } from "react-native";
import { CONSTANTS } from "../../../../Constants";
import { BaseContainer } from "../../../../GlobalStyles/Containers.Style";
import { Mockup } from "../../ApiMockup.constant";
import { GridContainer } from "./Styles";
Mockup;
interface ActivityListProps {
  activity: Array<{
    level: number;
    name: string;
    description: string;
    activities: Array<{
      name: string;
      level: number;
    }>;
  }>;
}

const ActivityList: React.FC<ActivityListProps> = ({ activity }) => {
  return (
    <BaseContainer>
      <GridContainer>
        
      </GridContainer>
    </BaseContainer>
  );
};

export default ActivityList;
