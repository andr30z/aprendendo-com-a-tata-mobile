import React, { useEffect, useState } from "react";
import { RefreshControl } from "react-native";
import { ActivityResultVisualization } from "../../Components";
import { useUserContext } from "../../Contexts";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { useActivityResultVisualization, useBoolean } from "../../Hooks";
import { ActivityResult } from "../../Interfaces";
import { baseApi, baseApiRoutes } from "../../Services";
import { showError } from "../../Utils";
interface ActivityResultsResponse {
  activitiesResults: Array<ActivityResult>;
}
const CurrentUserActivityVisualization: React.FC = ({ children }) => {
  const { user } = useUserContext();
  const [activityResults, setActivityResults] =
    useState<Array<ActivityResult>>();
  const { setTrue, setFalse, value } = useBoolean();
  const getActivitiesResults = () => {
    baseApi
      .get<ActivityResultsResponse>(
        baseApiRoutes.ACTIVITY_RESULT_USERS + "/" + user?._id
      )
      .then((res) => {
        setActivityResults(res.data.activitiesResults);
      })
      .catch(showError)
      .finally(setFalse);
  };
  useEffect(() => {
    getActivitiesResults();
  }, [user?._id]);

  const { isLoadingActivity, onPressActivityBtn, onPressChildCard } =
    useActivityResultVisualization({
      activityPlayParamsResolver: (_, activityResult) => {
        return { activityResult };
      },
    });

  return (
    <BaseContainer flex={1} paddingVertical="10px">
      {children}
      <ActivityResultVisualization
        visualizationType="current-user"
        isLoadingActivity={isLoadingActivity}
        membersArray={[]}
        onPressActivityBtn={onPressActivityBtn}
        onPressChildCard={onPressChildCard}
        primaryTheme="#fff"
        refreshControl={
          <RefreshControl
            refreshing={value}
            onRefresh={() => {
              setTrue();
              getActivitiesResults();
            }}
          />
        }
        userActivities={activityResults}
      />
    </BaseContainer>
  );
};
export default CurrentUserActivityVisualization;
