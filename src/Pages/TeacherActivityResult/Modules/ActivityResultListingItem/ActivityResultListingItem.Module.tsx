import React, { useCallback } from "react";
import { ActivityItem } from "../../../../Components";
import { BaseText } from "../../../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../../../GlobalStyles/Containers.Style";
import {
  ActivityResult,
  ActivityCommonProps,
} from "../../../../Interfaces/index";
import { ActivityBanner } from "./Styles";

interface ActivityResultListingItemProps {
  activityResult: ActivityResult<unknown>;
  onPressActivity: (activity:ActivityCommonProps<unknown>)=>void
}
/**
 *
 * @author andr30z
 **/
const ActivityResultListingItem: React.FC<ActivityResultListingItemProps> = ({
  activityResult,
  onPressActivity
}) => {
  return (
    <ActivityBanner
      marginTop="10px"
      flexDirection="row"
      justify="center"
      align="center"
      height="121px"
      width="100%"
    >
      <ActivityItem
        onPress={onPressActivity}
        itemIndex={0}
        buttonContainerStyles={{
          borderTopLeftRadius: 13,
          borderBottomLeftRadius: 13,
        }}
        containerHeight="121"
        boxWidth="34%"
        marginTop="0"
        roundedBorders={false}
        {...(activityResult.activity as ActivityCommonProps<unknown>)}
      />
      <BaseContainer
        flex={1}
        height="100%"
        justify="space-evenly"
        marginLeft="10px"
        flexDirection="column"
      >
        <BaseText
          ellipsizeMode="tail"
          numberOfLines={2}
          marginVertical="5px"
          fontSize="13px"
          color="black"
        >
          {activityResult.activity.name}
        </BaseText>
        <BaseText
          ellipsizeMode="tail"
          numberOfLines={2}
          marginVertical="5px"
          fontSize="13px"
          color="black"
        >
          {activityResult.user.email}
        </BaseText>
        <BaseText
          ellipsizeMode="tail"
          numberOfLines={2}
          marginVertical="5px"
          fontSize="13px"
          color="black"
          style={{ alignSelf: "flex-end", marginRight: 20 }}
        >
          Pontuação: {activityResult.result}/5
        </BaseText>
      </BaseContainer>
    </ActivityBanner>
  );
};

export default ActivityResultListingItem;
