import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useUserContext } from "../../Contexts";
import {
  useActivityResultVisualization,
  useBoolean,
  useDeleteResponsibleRelation,
  useModalSheetRef,
} from "../../Hooks";
import {
  ActivityResult,
  PaginationInterface,
  UserResponsible,
} from "../../Interfaces";
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
  const { close, sheetRef, open } = useModalSheetRef();

  const getChildren = useCallback(() => {
    setTrue();
    baseApi
      .get<GetChildrenReturnType>(
        baseApiRoutes.RESPONSIBLE_USER_CHILDREN + "/" + user?._id
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
    setSelectedChild,
    page,
    setLastPage,
    setPage,
    lastPage,
  } = useActivityResultVisualization({
    activityPlayParamsResolver: (_activity, activityResult) => {
      return {
        activityResult,
      };
    },
    sendToActivityPlayOnSearchActivity: false,
    onPressChildCallback() {
      setCurrentActivityResults(undefined);
    },
  });

  const responsibleCurrentUserEntity = useMemo(
    () =>
      userResponsibleChildren.find((x) => x.child._id === selectedChild?._id),
    []
  );
  const { onDelete } = useDeleteResponsibleRelation(() => {
    setSelectedChild(undefined);
    setUserResponsibleChildren((past) =>
      past.filter((x) => x._id !== responsibleCurrentUserEntity?._id)
    );
  }, responsibleCurrentUserEntity?._id);
  const {
    value: isRefreshing,
    setTrue: setIsRefreshingTrue,
    setFalse: setIsRefreshingFalse,
  } = useBoolean();
  const getResults = (isRefreshContext = false) => {
    if (!selectedChild || (lastPage && lastPage < page)) return;

    // const userActivitiesResult = activityResults.current.find(
    //   (child) => selectedChild._id === child.childId
    // );
    // if (userActivitiesResult)
    //   return setCurrentActivityResults(userActivitiesResult.activityResults);

    const responsibleUserEntity = userResponsibleChildren.find(
      (x) => x.child._id === selectedChild._id
    );
    if (isRefreshContext) setIsRefreshingTrue();
    else setTrue();
    baseApi
      .get<PaginationInterface<ActivityResult>>(
        baseApiRoutes.ACTIVITY_RESULT_USER_RESPONSIBLE +
          "/" +
          responsibleUserEntity?._id +
          `?page=${page}&limit=10&sort=-1`
      )
      .then((res) => {
        console.log(res.data.total, res.data.lastPage, "asdasdas")
        setLastPage(res.data.lastPage);
        setPage(res.data.nextPage);
        // activityResults.current = [
        //   ...activityResults.current,
        //   {
        //     activityResults: [...pastItems, ...res.data.results],
        //     childId: selectedChild._id,
        //   },
        // ];
        setCurrentActivityResults((past) => {
          const pastItems = past || [];
          return [...pastItems, ...res.data.results];
        });
      })
      .catch(showError)
      .finally(() => {
        if (isRefreshContext) setIsRefreshingFalse();
        else setFalse();
      });
  };
  useEffect(() => {
    getResults();
  }, [selectedChild]);
  const onRefresh = () => {
    getResults(true);
  };
  return {
    user,
    onRefresh,
    isRefreshing,
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
    getChildren,
    close,
    sheetRef,
    open,
    onDelete,
    getResults,
  };
}
