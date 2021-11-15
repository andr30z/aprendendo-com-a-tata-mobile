import React, { createContext, useCallback, useContext, useState } from "react";
import Toast from "react-native-toast-message";
import { ActivityAnswers, ActivityResult } from "../../Interfaces/index";
import { baseApi, baseApiRoutes } from "../../Services";
import { useUserContext } from "../User/User.Context";
type NewActivityAnswers = Omit<ActivityAnswers, "_id">;
interface ActivityPlayContextInterface {
  onEndActivity: () => void;
  activityAnswers: NewActivityAnswers[];
  setActivityAnswers: React.Dispatch<
    React.SetStateAction<NewActivityAnswers[]>
  >;
}

interface ActivityPlayProviderProps {
  activityResult?: ActivityResult;
}

const ActivityPlayContext = createContext<ActivityPlayContextInterface>(
  {} as ActivityPlayContextInterface
);

export const ActivityPlayProvider: React.FC<ActivityPlayProviderProps> = ({
  children,
  activityResult,
}) => {
  const [activityAnswers, setActivityAnswers] = useState<
    Array<NewActivityAnswers>
  >([]);
  const { user } = useUserContext();
  const onEndActivity = useCallback(() => {
    baseApi
      .put(baseApiRoutes.ACTIVITY_RESULT_USERS + "/" + user?._id, {
        activityAnswers,
        activityResultId: activityResult?._id,
        activityId: activityResult?.activity._id,
        finished: true,
      })
      .then((res) => {
        console.log(res.data);
        Toast.show({ text1: "Atividade concluida com sucesso!" });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, [activityResult, activityAnswers]);
  return (
    <ActivityPlayContext.Provider
      value={{ onEndActivity, activityAnswers, setActivityAnswers }}
    >
      {children}
    </ActivityPlayContext.Provider>
  );
};

export function useActivityPlayContext() {
  return useContext(ActivityPlayContext);
}
