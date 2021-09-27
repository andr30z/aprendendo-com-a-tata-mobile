import React from "react";
import { CONSTANTS } from "../../Constants";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { ActivityGroup as ActivityGroupType } from "../../Interfaces";
import ActivityItem from "../ActivityItem/ActivityItem.Component";
import {
  GroupLevelContainer,
  GroupLevelInnerContainer,
  GroupTitle,
} from "./Styles";

interface ActivityGroupProps {
  activityGroup: ActivityGroupType;
}

/**
* Component that represents a group of activities
* @param activityGroup object of type ````ActivityGroupType````.
* @author andr3z0
**/
const ActivityGroup: React.FC<ActivityGroupProps> = ({ activityGroup }) => {
  return (
    <BaseContainer
      style={{
        width: "100%",
        marginTop: 10,
        padding: "5%",
      }}
    >
      <BaseContainer
        justify="space-between"
        align="center"
        style={{
          flexDirection: "row",
          position: "relative",
        }}
      >
        <GroupTitle>{activityGroup.name}</GroupTitle>
        <GroupLevelContainer />
        <GroupLevelInnerContainer>
          <BaseText fontSize="12px" color="#fff">
            Nível
          </BaseText>
          <BaseText color="#fff">{activityGroup.level}</BaseText>
        </GroupLevelInnerContainer>
      </BaseContainer>
      <BaseContainer style={{ marginTop: 40 }}>
        {/* {activityGroup.activities.map((activity, index) => {
          return (
            <ActivityItem
              key={String(index + activity.name)}
              itemIndex={index}
              {...activity}
            />
          );
        })} */}
      </BaseContainer>
    </BaseContainer>
  );
};

export default ActivityGroup;
