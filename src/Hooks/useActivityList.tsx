import { useEffect, useState } from "react";
import { ActivityApiResponse, ActivityCommonProps } from "../Interfaces/index";
import { baseApi, baseApiRoutes } from "../Services";

/**
 * This hook handle the logic for listing activites.
 * @returns object containing activities listing state
 * @author andr3z0
 **/
export function useActivityList() {
  const [activities, setActivities] = useState<
    Array<ActivityCommonProps<unknown>>
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    baseApi
      .get<ActivityApiResponse>(baseApiRoutes.ACTIVITIES)
      .then((res) => {
        setActivities(res.data.activities);
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  }, []);

  return { activities, setActivities, isLoading, setIsLoading };
}
