import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useUserContext } from "../../Contexts";
import { useActivityResultVisualization, useBoolean } from "../../Hooks";
import { ActivityResult, UserResponsible } from "../../Interfaces";
import { baseApi, baseApiRoutes } from "../../Services";
import { showError } from "../../Utils";
interface GetChildrenReturnType {
  children: Array<UserResponsible>;
}
/**
 *
 * @author andr3z0
 **/
export function useResponsibleChildManagerLogic() {
  const { user } = useUserContext();
  const [userResponsibleChildren, setUserResponsibleChildren] = useState<
    Array<UserResponsible>
  >([]);
  const activityResults = useRef<
    Array<{ childId: string; activityResults: Array<ActivityResult<unknown>> }>
  >([]);
  const [currentActivityResults, setCurrentActivityResults] =
    useState<Array<ActivityResult>>();

  const { value: isLoading, setTrue, setFalse } = useBoolean();
  const {
    value: isModalVisible,
    setValue,
    setTrue: setIsModalVisibleTrue,
    setFalse: setIsModalVisibleFalse,
  } = useBoolean();
  const getChildren = useCallback(() => {
    setTrue();
    baseApi
      .get<GetChildrenReturnType>(
        baseApiRoutes.USER_RESPONSIBLE + "/" + user?._id
      )
      .then((res) => {
        console.log(res.data);
        setUserResponsibleChildren(res.data.children);
      })
      .catch(showError)
      .finally(setFalse);
  }, [user]);

  // const getChildrenActivity
  useEffect(() => {
    getChildren();
  }, []);

  const children = useMemo(
    () => userResponsibleChildren.map((user) => user.child),
    [userResponsibleChildren]
  );
  const {
    onPressChildCard,
    onPressActivityBtn,
    isLoadingActivity,
    selectedChild,
  } = useActivityResultVisualization({
    activityPlayParamsResolver: (_activity, activityResult) => {
      console.log(activityResult, "äsdasdasd");
      return {
        activityResult,
      };
    },
    sendToActivityPlayOnSearchActivity: false,
  });

  useEffect(() => {
    if (!selectedChild) return;
    const userActivitiesResult = activityResults.current.find(
      (child) => selectedChild._id === child.childId
    );
    if (userActivitiesResult)
      return setCurrentActivityResults(userActivitiesResult.activityResults);

    const responsibleUserEntity = userResponsibleChildren.find(
      (x) => x.child._id === selectedChild._id
    );
    setTrue();
    baseApi
      .get<{ activitiesResults: Array<ActivityResult> }>(
        baseApiRoutes.ACTIVITY_RESULT_USER_RESPONSIBLE +
          "/" +
          responsibleUserEntity?._id
      )
      .then((res) => {
        activityResults.current = [
          ...activityResults.current,
          {
            activityResults: res.data.activitiesResults,
            childId: selectedChild._id,
          },
        ];
        setCurrentActivityResults(res.data.activitiesResults);
      })
      .catch(showError)
      .finally(setFalse);
  }, [selectedChild]);

  return {
    user,
    userResponsibleChildren,
    setUserResponsibleChildren,
    activityResults,
    currentActivityResults,
    setCurrentActivityResults,
    isLoading,
    setTrue,
    setFalse,
    isModalVisible,
    setIsModalVisibleTrue,
    setIsModalVisibleFalse,
    children,
    onPressChildCard,
    onPressActivityBtn,
    isLoadingActivity,
    selectedChild,
    setValue,
    getChildren
  };
}
