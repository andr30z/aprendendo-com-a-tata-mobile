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
 * @author andr30z
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
    sendToActivityPlayOnSearchActivity: false,
  });
  const getActivitiesResults = (resetPagination = false) => {
    if (!user?._id) return;
    const isReset =
      typeof resetPagination === "boolean" ? resetPagination : false;
    if (!isReset && lastPage && lastPage < page) return setFalse();
    setTrue();
    baseApi
      .get<PaginationInterface<ActivityResult>>(
        baseApiRoutes.ACTIVITY_RESULT_USERS +
          "/" +
          user?._id +
          `?page=${isReset ? 1 : page}&limit=20&sort=-1`
      )
      .then((res) => {
        setLastPage(res.data.lastPage);
        setPage(res.data.nextPage);
        setActivityResults((past) => {
          const pastItems = past || [];
          if (isReset) return res.data.results;
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
            onRefresh={() => getActivitiesResults(true)}
          />
        }
        userActivities={activityResults}
      />
    </BaseContainer>
  );
};
export default CurrentUserActivityVisualization;
