import { useNavigation } from "@react-navigation/core";
import { useCallback } from "react";
import Toast from "react-native-toast-message";
import { useBoolean } from "./useBoolean";
import { ActivityCommonProps } from "../Interfaces/index";
import { baseApi, baseApiRoutes } from "../Services";
import { useCancellablePromise } from "./useCancellablePromise";

/**
 *
 * @author andr30z
 **/
export function useGetActivity<A>(
  onSuccess: (activity: ActivityCommonProps<A>) => void | ActivityCommonProps<A>,
  onError?: (error: any) => void,
  dependencyProp?: any
) {
  const { cancellablePromise } = useCancellablePromise();
  const navigation = useNavigation();
  const { value: isLoadingActivity, setTrue, setFalse } = useBoolean();
  const getActivity = useCallback(
    (id: string) => {
      setTrue();
      return cancellablePromise(
        baseApi.get<ActivityCommonProps<A>>(
          baseApiRoutes.ACTIVITIES + "/" + id
        ),
        false
      )
        .then((res) => {
          onSuccess(res.data);
          setFalse();
          return res.data
        })
        .catch((e) => {
          setFalse();
          if (onError) return onError(e);
          Toast.show({
            type: "error",
            text1: "Não foi possível abrir a atividade!",
          });
          navigation.goBack();
        });
    },
    [cancellablePromise, navigation, onSuccess, onError, dependencyProp]
  );

  return { getActivity, isLoadingActivity };
}
