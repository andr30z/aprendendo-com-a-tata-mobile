import React from "react";
import ActivityItem from "../../../../Components/ActivityItem/ActivityItem.Component";
import ActivityResultStars from "../../../../Components/ActivityResultStars/ActivityResultStars.Component";
import { BaseText } from "../../../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../../../GlobalStyles/Containers.Style";
import { useFormatRelativeDate } from "../../../../Hooks";
import {
  ActivityCommonProps,
  ActivityResult,
} from "../../../../Interfaces/index";
import { ActivityBanner } from "./Styles";

interface ActivityResultListingItemProps {
  activityResult: ActivityResult<unknown>;
  onPressActivity: (activity: ActivityCommonProps<unknown>) => void;
}
/**
 *
 * @author andr30z
 **/
const ActivityResultListingItem: React.FC<ActivityResultListingItemProps> = ({
  activityResult,
  onPressActivity,
}) => {
  const date = useFormatRelativeDate(activityResult.createdAt);
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
        boxWidth="40%"
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
        {activityResult.user.email && (
          <BaseText
            ellipsizeMode="tail"
            numberOfLines={2}
            marginVertical="5px"
            fontSize="13px"
            color="black"
          >
            {activityResult.user.email}
          </BaseText>
        )}
        <BaseText
          ellipsizeMode="tail"
          numberOfLines={2}
          marginVertical="5px"
          fontSize="11px"
          color="black"
        >
          {date}
        </BaseText>
        <BaseText
          ellipsizeMode="tail"
          numberOfLines={2}
          marginVertical="5px"
          fontSize="13px"
          color="black"
          style={{ alignSelf: "flex-end", marginRight: 20 }}
        >
          Pontuação:{" "}
          <ActivityResultStars
            withContainer={false}
            result={activityResult.result}
          />
        </BaseText>
      </BaseContainer>
    </ActivityBanner>
  );
};
export default React.memo(ActivityResultListingItem);
