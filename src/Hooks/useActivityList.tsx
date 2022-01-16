import { useEffect, useState } from "react";
import { useCancellablePromise } from "./useCancellablePromise";
import { ActivityApiResponse, ActivityCommonProps } from "../Interfaces/index";
import { baseApi, baseApiRoutes } from "../Services";
import { showError } from "../Utils";

/**
 * This hook handle the logic for listing activites.
 * @returns object containing activities listing state
 * @author andr30z
 **/
export function useActivityList() {
  const [activities, setActivities] = useState<
    Array<ActivityCommonProps<unknown>>
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const { cancellablePromise } = useCancellablePromise();
  useEffect(() => {
    setIsLoading(true);
    cancellablePromise(
      baseApi.get<ActivityApiResponse>(baseApiRoutes.ACTIVITIES),
      false
    )
      .then((res) => {
        setActivities(res.data.activities);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        showError(e);
      });
  }, []);

  return { activities, setActivities, isLoading, setIsLoading };
}
