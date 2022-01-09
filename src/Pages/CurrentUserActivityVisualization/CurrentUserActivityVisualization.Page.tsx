import React, { useEffect, useState } from "react";
import { RefreshControl } from "react-native";
import { ActivityResultVisualization } from "../../Components";
import { useUserContext } from "../../Contexts";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { useActivityResultVisualization, useBoolean } from "../../Hooks";
import { ActivityResult, PaginationInterface } from "../../Interfaces";
import { baseApi, baseApiRoutes } from "../../Services";
import { showError } from "../../Utils";

/**
 *
 * @author andr3z0
 **/
const CurrentUserActivityVisualization: React.FC = ({ children }) => {
  const { user } = useUserContext();

  const [activityResults, setActivityResults] =
    useState<Array<ActivityResult>>();
  const { setTrue, setFalse, value } = useBoolean();

  const {
    isLoadingActivity,
    onPressActivityBtn,
    onPressChildCard,
    lastPage,
    setLastPage,
    setPage,
    page,
  } = useActivityResultVisualization({
    activityPlayParamsResolver: (_, activityResult) => {
      return { activityResult };
    },
  });
  const getActivitiesResults = () => {
    if (lastPage && lastPage < page) return;
    setTrue();
    baseApi
      .get<PaginationInterface<ActivityResult>>(
        baseApiRoutes.ACTIVITY_RESULT_USERS +
          "/" +
          user?._id +
          `?page=${page}&limit=20&sort=-1`
      )
      .then((res) => {
        setLastPage(res.data.lastPage);
        setPage(res.data.nextPage);
        setActivityResults((past) => {
          const pastItems = past || [];
          return [...pastItems, ...res.data.results];
        });
      })
      .catch(showError)
      .finally(setFalse);
  };
  useEffect(() => {
    getActivitiesResults();
  }, [user?._id]);
  return (
    <BaseContainer flex={1} paddingVertical="10px">
      {children}
      <ActivityResultVisualization
        onEndReached={getActivitiesResults}
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
