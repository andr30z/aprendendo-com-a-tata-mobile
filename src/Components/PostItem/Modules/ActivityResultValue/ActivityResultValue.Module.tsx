import React, { useMemo } from "react";
import { BaseContainer } from "../../../../GlobalStyles/Containers.Style";
import { BaseText } from "../../../../GlobalStyles/BaseStyles";
import { ActivityResult } from "../../../../Interfaces";
import ActivityResultStars from "../../../ActivityResultStars/ActivityResultStars.Component";
interface PostActivityResultValueProps {
  userActivityResult?: Array<ActivityResult>;
  activityId: string;
  color?: string;
  marginTop?: string;
}
export const ActivityResultValue: React.FC<PostActivityResultValueProps> = ({
  userActivityResult,
  activityId,
  color = "#fff",
  marginTop,
}) => {
  const userPostActivity = useMemo(
    () => userActivityResult?.find((x) => x.activity._id === activityId),
    [userActivityResult, activityId]
  );

  return !userPostActivity || !userPostActivity?.finished ? null : (
    <BaseContainer
      justify="center"
      align="center"
      flexDirection="column"
      marginTop={marginTop}
    >
      <BaseText color={color} fontSize="13px" align="center">
        Resultado:
      </BaseText>
      <ActivityResultStars result={userPostActivity.result} />
    </BaseContainer>
  );
};
