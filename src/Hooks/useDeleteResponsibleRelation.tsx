import { useCallback } from "react";
import Toast from "react-native-toast-message";
import { baseApi, baseApiRoutes } from "../Services";
import { showError } from "../Utils";

/**
 *
 * @author andr3z0
 **/
export function useDeleteResponsibleRelation(
  onActionDone: () => void,
  userResponsibleEntityId?: string
) {
  const onDelete = useCallback(async () => {
    return baseApi
      .delete(baseApiRoutes.USER_RESPONSIBLE + "/" + userResponsibleEntityId)
      .then(() => {
        Toast.show({ text1: "Desvinculação feita com sucesso!" });
        onActionDone()
      })
      .catch(showError);
  }, [userResponsibleEntityId, onActionDone]);

  return { onDelete };
}
